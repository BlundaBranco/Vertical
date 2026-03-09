"""
Setup de planes de suscripción en MercadoPago.
Correr UNA VEZ cuando estés listo para activar billing.

Uso:
  source venv/Scripts/activate
  cd backend
  MP_ACCESS_TOKEN=tu_token python scripts/setup_mp_plans.py

Copiá los IDs que muestra y pegálos en Railway como:
  MP_PLAN_ESSENTIAL_ID=...
  MP_PLAN_PRO_ID=...
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import mercadopago

FRONTEND_URL = os.getenv("FRONTEND_URL", "https://somosvertical.ar")
CURRENCY = os.getenv("MP_CURRENCY_ID", "ARS")

PLANS_TO_CREATE = [
    {
        "key": "essential",
        "env_var": "MP_PLAN_ESSENTIAL_ID",
        "reason": "Ventra AI Essential",
        "amount": float(os.getenv("MP_PLAN_ESSENTIAL_PRICE", "49900")),
    },
    {
        "key": "pro",
        "env_var": "MP_PLAN_PRO_ID",
        "reason": "Ventra AI Pro",
        "amount": float(os.getenv("MP_PLAN_PRO_PRICE", "89900")),
    },
]


def main():
    token = os.getenv("MP_ACCESS_TOKEN")
    if not token:
        print("ERROR: MP_ACCESS_TOKEN no configurado.")
        sys.exit(1)

    sdk = mercadopago.SDK(token)
    print(f"Conectado a MercadoPago. Creando planes...\n")

    for plan in PLANS_TO_CREATE:
        data = {
            "reason": plan["reason"],
            "auto_recurring": {
                "frequency": 1,
                "frequency_type": "months",
                "transaction_amount": plan["amount"],
                "currency_id": CURRENCY,
            },
            "back_url": f"{FRONTEND_URL}/billing",
            "status": "active",
        }

        result = sdk.plan().create(data)
        if result["status"] in (200, 201):
            plan_id = result["response"]["id"]
            print(f"✓ {plan['reason']}")
            print(f"  ID: {plan_id}")
            print(f"  Env var: {plan['env_var']}={plan_id}\n")
        else:
            print(f"✗ Error creando {plan['reason']}: {result}")


if __name__ == "__main__":
    main()
