"""
Script para registrar el chip demo en WhatsApp Cloud API.

Prerrequisitos:
1. El número ya debe estar agregado en WA Manager (business.facebook.com/wa/manage/phone-numbers/)
   bajo el WABA correcto.
2. Anotar el phone_number_id que aparece en WA Manager.

Uso:
    python scripts/register_demo_number.py --phone-number-id <PHONE_NUMBER_ID>

Pasos automáticos:
1. Solicita OTP al número via SMS
2. Pide al usuario ingresar el OTP recibido
3. Verifica el OTP
4. Registra el número en Cloud API (desconecta WA Business App del celular)
5. Suscribe webhooks al WABA
6. Actualiza DB: tenant 1 → nuevo phone_number_id
"""
import sys
import os
import argparse
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

import requests
from app.db.database import SessionLocal
from app.models import Tenant
from sqlalchemy.orm.attributes import flag_modified

GRAPH_URL = "https://graph.facebook.com/v21.0"
WABA_ID = "1630587688290504"  # WABA del tenant admin
TENANT_ID = 1
PIN = "123456"  # PIN de 6 dígitos para Cloud API


def get_token():
    token = os.getenv("WHATSAPP_TOKEN")
    if not token:
        print("[ERROR] WHATSAPP_TOKEN no está configurado en .env")
        sys.exit(1)
    return token.strip()


def request_otp(phone_number_id: str, token: str):
    print(f"\n[1] Solicitando OTP para phone_number_id={phone_number_id}...")
    r = requests.post(
        f"{GRAPH_URL}/{phone_number_id}/request_code",
        json={"code_method": "SMS", "language": "es"},
        headers={"Authorization": f"Bearer {token}"},
    )
    if r.ok:
        print("[OK] OTP enviado por SMS al número.")
    else:
        print(f"[ERROR] request_code falló: {r.status_code} {r.text}")
        sys.exit(1)


def verify_otp(phone_number_id: str, otp: str, token: str):
    print(f"\n[2] Verificando OTP '{otp}'...")
    r = requests.post(
        f"{GRAPH_URL}/{phone_number_id}/verify_code",
        json={"code": otp},
        headers={"Authorization": f"Bearer {token}"},
    )
    if r.ok:
        print("[OK] OTP verificado correctamente.")
    else:
        print(f"[ERROR] verify_code falló: {r.status_code} {r.text}")
        sys.exit(1)


def register_number(phone_number_id: str, token: str):
    print(f"\n[3] Registrando número en Cloud API (PIN: {PIN})...")
    r = requests.post(
        f"{GRAPH_URL}/{phone_number_id}/register",
        json={"messaging_product": "whatsapp", "pin": PIN},
        headers={"Authorization": f"Bearer {token}"},
    )
    if r.ok:
        print("[OK] Número registrado en Cloud API.")
        print("     NOTA: El número ya no funcionará en WA Business App del celular.")
    else:
        print(f"[ERROR] register falló: {r.status_code} {r.text}")
        sys.exit(1)


def subscribe_webhooks(waba_id: str, token: str):
    print(f"\n[4] Suscribiendo webhooks al WABA {waba_id}...")
    r = requests.post(
        f"{GRAPH_URL}/{waba_id}/subscribed_apps",
        headers={"Authorization": f"Bearer {token}"},
    )
    if r.ok:
        print("[OK] Webhooks suscritos.")
    else:
        print(f"[WARN] subscribed_apps falló (puede que ya esté suscrito): {r.status_code} {r.text}")


def update_db(phone_number_id: str):
    print(f"\n[5] Actualizando DB — tenant {TENANT_ID} → phone_number_id={phone_number_id}...")
    db = SessionLocal()
    try:
        tenant = db.query(Tenant).filter(Tenant.id == TENANT_ID).first()
        if not tenant:
            print(f"[ERROR] Tenant {TENANT_ID} no encontrado en DB.")
            sys.exit(1)

        tenant.phone_number_id = phone_number_id
        config = dict(tenant.business_config or {})
        config["waba_id"] = WABA_ID
        tenant.business_config = config
        flag_modified(tenant, "business_config")
        db.commit()
        print(f"[OK] DB actualizada. Tenant {TENANT_ID}: phone_number_id={phone_number_id}, waba_id={WABA_ID}")
    finally:
        db.close()


def main():
    parser = argparse.ArgumentParser(description="Registrar chip demo en WhatsApp Cloud API")
    parser.add_argument("--phone-number-id", required=True, help="phone_number_id del número en WA Manager")
    args = parser.parse_args()

    phone_number_id = args.phone_number_id
    token = get_token()

    print(f"\n=== Registro Demo: {phone_number_id} ===")
    print(f"WABA: {WABA_ID} | Tenant: {TENANT_ID}\n")

    request_otp(phone_number_id, token)

    otp = input("\nIngresá el OTP recibido por SMS: ").strip()
    if not otp:
        print("[ERROR] OTP vacío.")
        sys.exit(1)

    verify_otp(phone_number_id, otp, token)
    register_number(phone_number_id, token)
    subscribe_webhooks(WABA_ID, token)
    update_db(phone_number_id)

    print("\n=== Listo ===")
    print(f"El número {phone_number_id} está registrado en Cloud API.")
    print("Mandá un WhatsApp al número y el bot debería responder desde el dashboard.")


if __name__ == "__main__":
    main()
