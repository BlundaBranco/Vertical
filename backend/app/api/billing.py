"""
Billing — MercadoPago Suscripciones (Preapproval API)

ESTADO: Listo para conectar. Falta configurar las env vars y crear los planes en MP.

SETUP (hacer UNA VEZ antes de activar):
  python scripts/setup_mp_plans.py
  → Crea los planes en MP y muestra los IDs para pegar en Railway.

ENV VARS requeridas:
  MP_ACCESS_TOKEN       → Credenciales de producción → Access Token
  MP_PLAN_ESSENTIAL_ID  → ID del plan Essential (generado por setup_mp_plans.py)
  MP_PLAN_PRO_ID        → ID del plan Pro (generado por setup_mp_plans.py)
  MP_CURRENCY_ID        → ARS (default)
  MP_PLAN_ESSENTIAL_PRICE → precio en ARS, ej: 49900
  MP_PLAN_PRO_PRICE       → precio en ARS, ej: 89900
  FRONTEND_URL          → https://somosvertical.ar
  BACKEND_URL           → https://api.somosvertical.ar
"""

import os
from datetime import datetime, timezone, timedelta

import mercadopago
import requests as http_requests
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.db_models import Subscription, Tenant
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/billing", tags=["billing"])

PLANS = {
    "essential": {
        "name": "Ventra AI Essential",
        "price": float(os.getenv("MP_PLAN_ESSENTIAL_PRICE", "49900")),
        "plan_id_env": "MP_PLAN_ESSENTIAL_ID",
        "description": "Agente IA para WhatsApp · 1 número · hasta 500 leads/mes",
    },
    "pro": {
        "name": "Ventra AI Pro",
        "price": float(os.getenv("MP_PLAN_PRO_PRICE", "89900")),
        "plan_id_env": "MP_PLAN_PRO_ID",
        "description": "Agente IA para WhatsApp · 1 número · leads ilimitados + Google Sheets",
    },
}


def _get_sdk():
    token = os.getenv("MP_ACCESS_TOKEN")
    if not token:
        raise HTTPException(status_code=503, detail="Billing no configurado")
    return mercadopago.SDK(token)


class CreatePaymentRequest(BaseModel):
    plan: str
    payer_email: str


@router.get("/status/{tenant_id}")
def get_billing_status(
    tenant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")

    sub = db.query(Subscription).filter(Subscription.tenant_id == tenant_id).first()
    if not sub:
        return {"status": "none", "plan": None, "period_end": None}

    # Auto-marcar como expirado si venció
    if sub.status == "active" and sub.current_period_end:
        period_end = sub.current_period_end
        if period_end.tzinfo is None:
            period_end = period_end.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) > period_end:
            sub.status = "expired"
            db.commit()

    return {
        "status": sub.status,
        "plan": sub.plan,
        "period_end": sub.current_period_end.isoformat() if sub.current_period_end else None,
        "mp_subscription_id": sub.mp_payment_id,
    }


@router.post("/create-subscription/{tenant_id}")
def create_subscription(
    tenant_id: int,
    body: CreatePaymentRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Crea una suscripción recurrente en MP para el tenant.
    Retorna init_point — redirigir al usuario a esa URL.
    """
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    if body.plan not in PLANS:
        raise HTTPException(status_code=400, detail="Plan inválido")

    plan = PLANS[body.plan]
    plan_id = os.getenv(plan["plan_id_env"])
    if not plan_id:
        raise HTTPException(
            status_code=503,
            detail=f"Plan MP no configurado. Correr setup_mp_plans.py y setear {plan['plan_id_env']}",
        )

    sdk = _get_sdk()
    frontend_url = os.getenv("FRONTEND_URL", "https://somosvertical.ar")
    backend_url = os.getenv("BACKEND_URL", "https://api.somosvertical.ar")
    currency = os.getenv("MP_CURRENCY_ID", "ARS")

    preapproval_data = {
        "preapproval_plan_id": plan_id,
        "reason": plan["name"],
        "payer_email": body.payer_email,
        "back_url": f"{frontend_url}/billing",
        "notification_url": f"{backend_url}/billing/webhook",
        "external_reference": f"{tenant_id}:{body.plan}",
        "auto_recurring": {
            "frequency": 1,
            "frequency_type": "months",
            "transaction_amount": plan["price"],
            "currency_id": currency,
        },
        "status": "pending",
    }

    result = sdk.subscription().create(preapproval_data)
    if result["status"] not in (200, 201):
        print(f"[BILLING] Error MP Suscripción: {result}")
        raise HTTPException(status_code=500, detail="Error al crear suscripción en MercadoPago")

    data = result["response"]
    init_point = data.get("init_point")
    subscription_id = data.get("id")

    # Guardar suscripción como pendiente
    sub = db.query(Subscription).filter(Subscription.tenant_id == tenant_id).first()
    if not sub:
        sub = Subscription(
            tenant_id=tenant_id,
            plan=body.plan,
            status="pending",
            mp_preference_id=subscription_id,
        )
        db.add(sub)
    else:
        sub.plan = body.plan
        sub.status = "pending"
        sub.mp_preference_id = subscription_id

    db.commit()
    return {"init_point": init_point, "subscription_id": subscription_id}


@router.post("/webhook")
async def mp_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Webhook de MercadoPago — sin auth JWT.
    Registrar esta URL en el Dashboard de MP: {BACKEND_URL}/billing/webhook
    """
    try:
        body = await request.json()
    except Exception:
        return {"status": "ok"}

    print(f"[BILLING] Webhook MP: {body}")

    # MP envía type "subscription_authorized_payment" para cobros de suscripción
    event_type = body.get("type", "")

    # --- Cancelaciones / pausas de suscripción ---
    if event_type == "subscription_preapproval":
        preapproval_id = body.get("data", {}).get("id")
        if not preapproval_id:
            return {"status": "ok"}
        token = os.getenv("MP_ACCESS_TOKEN")
        if not token:
            return {"status": "ok"}
        try:
            res = http_requests.get(
                f"https://api.mercadopago.com/preapproval/{preapproval_id}",
                headers={"Authorization": f"Bearer {token}"},
                timeout=10,
            )
            if res.status_code != 200:
                return {"status": "ok"}
            preapproval = res.json()
        except Exception as e:
            print(f"[BILLING] Error consultando preapproval {preapproval_id}: {e}")
            return {"status": "ok"}

        preapproval_status = preapproval.get("status")
        if preapproval_status not in ("cancelled", "paused"):
            return {"status": "ok"}

        external_ref = preapproval.get("external_reference", "")
        if ":" not in external_ref:
            return {"status": "ok"}
        tenant_id_str, _ = external_ref.split(":", 1)
        try:
            tenant_id = int(tenant_id_str)
        except ValueError:
            return {"status": "ok"}

        sub = db.query(Subscription).filter(Subscription.tenant_id == tenant_id).first()
        if sub:
            sub.status = preapproval_status  # "cancelled" o "paused"
            sub.updated_at = datetime.now(timezone.utc)
            db.commit()
            print(f"[BILLING] Suscripción {preapproval_status} — tenant {tenant_id}")
        return {"status": "ok"}

    # --- Cobros de suscripción y pagos regulares ---
    if event_type not in ("subscription_authorized_payment", "payment"):
        return {"status": "ok"}

    payment_id = body.get("data", {}).get("id")
    if not payment_id:
        return {"status": "ok"}

    token = os.getenv("MP_ACCESS_TOKEN")
    if not token:
        return {"status": "ok"}

    try:
        if event_type == "subscription_authorized_payment":
            # Los authorized_payments tienen su propio endpoint — sdk.payment().get() no funciona aquí
            res = http_requests.get(
                f"https://api.mercadopago.com/authorized_payments/{payment_id}",
                headers={"Authorization": f"Bearer {token}"},
                timeout=10,
            )
            if res.status_code != 200:
                print(f"[BILLING] authorized_payment {payment_id} no encontrado: {res.status_code}")
                return {"status": "ok"}
            payment = res.json()
        else:
            # Pago regular (primer cobro en algunos flujos)
            sdk = mercadopago.SDK(token)
            result = sdk.payment().get(payment_id)
            if result["status"] != 200:
                return {"status": "ok"}
            payment = result["response"]
    except Exception as e:
        print(f"[BILLING] Error consultando pago {payment_id}: {e}")
        return {"status": "ok"}

    if payment.get("status") != "approved":
        return {"status": "ok"}

    external_ref = payment.get("external_reference", "")
    if ":" not in external_ref:
        return {"status": "ok"}

    tenant_id_str, plan = external_ref.split(":", 1)
    try:
        tenant_id = int(tenant_id_str)
    except ValueError:
        return {"status": "ok"}

    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        print(f"[BILLING] Webhook: tenant {tenant_id} no existe — ignorando")
        return {"status": "ok"}

    sub = db.query(Subscription).filter(Subscription.tenant_id == tenant_id).first()
    if not sub:
        sub = Subscription(tenant_id=tenant_id, plan=plan)
        db.add(sub)

    sub.status = "active"
    sub.plan = plan
    sub.mp_payment_id = str(payment_id)
    sub.current_period_start = datetime.now(timezone.utc)
    sub.current_period_end = datetime.now(timezone.utc) + timedelta(days=30)
    sub.updated_at = datetime.now(timezone.utc)
    db.commit()

    print(f"[BILLING] Suscripción activada — tenant {tenant_id} plan {plan}")
    return {"status": "ok"}
