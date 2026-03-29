import os
import requests as http_requests
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.models.db_models import Tenant, User, Lead, Conversation, Subscription, VerticalTemplate
from app.services.auth_service import get_admin_user

router = APIRouter(prefix="/admin", tags=["admin"])

GRAPH = "https://graph.facebook.com/v21.0"
META_TOKEN = os.getenv("WHATSAPP_TOKEN", "")
MAIN_WABA_ID = os.getenv("WHATSAPP_WABA_ID", "2412689112513021")


def _meta_headers():
    return {"Authorization": f"Bearer {META_TOKEN}", "Content-Type": "application/json"}


# ─── Dashboard ────────────────────────────────────────────────────────────────

@router.get("/dashboard")
def admin_dashboard(db: Session = Depends(get_db), _=Depends(get_admin_user)):
    total_tenants = db.query(Tenant).count()
    total_leads = db.query(Lead).count()
    qualified = db.query(Lead).filter(Lead.status == "QUALIFIED").count()
    conversion = round((qualified / total_leads * 100), 1) if total_leads > 0 else 0

    active_bots = db.query(Tenant).filter(
        Tenant.business_config["bot_active"].astext == "true"
    ).count()

    recent_leads = (
        db.query(Lead, Tenant)
        .join(Tenant, Lead.tenant_id == Tenant.id)
        .order_by(Lead.created_at.desc())
        .limit(10)
        .all()
    )

    return {
        "total_tenants": total_tenants,
        "total_leads": total_leads,
        "qualified_leads": qualified,
        "conversion_rate": conversion,
        "active_bots": active_bots,
        "recent_leads": [
            {
                "id": lead.id,
                "tenant_name": tenant.name,
                "status": lead.status,
                "nombre": (lead.extracted_data or {}).get("nombre", "—"),
                "created_at": lead.created_at.isoformat() if lead.created_at else None,
            }
            for lead, tenant in recent_leads
        ],
    }


# ─── Tenants ──────────────────────────────────────────────────────────────────

@router.get("/tenants")
def admin_tenants(db: Session = Depends(get_db), _=Depends(get_admin_user)):
    tenants = db.query(Tenant).all()
    result = []
    for t in tenants:
        cfg = t.business_config or {}
        leads_count = db.query(Lead).filter(Lead.tenant_id == t.id).count()
        qualified_count = db.query(Lead).filter(
            Lead.tenant_id == t.id, Lead.status == "QUALIFIED"
        ).count()
        template_name = t.template.name if t.template else "—"
        result.append({
            "id": t.id,
            "name": t.name or "Sin nombre",
            "template": template_name,
            "agent_name": cfg.get("agent_name", "—"),
            "phone": cfg.get("whatsapp_phone", "—"),
            "phone_number_id": t.phone_number_id,
            "waba_id": cfg.get("waba_id", "—"),
            "bot_active": cfg.get("bot_active", False),
            "leads": leads_count,
            "qualified": qualified_count,
        })
    return result


class TenantUpdateRequest(BaseModel):
    name: Optional[str] = None
    bot_active: Optional[bool] = None
    template_name: Optional[str] = None


@router.patch("/tenants/{tenant_id}")
def admin_update_tenant(
    tenant_id: int,
    payload: TenantUpdateRequest,
    db: Session = Depends(get_db),
    _=Depends(get_admin_user)
):
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant no encontrado")

    if payload.name is not None:
        tenant.name = payload.name

    if payload.template_name is not None:
        tmpl = db.query(VerticalTemplate).filter(VerticalTemplate.name == payload.template_name).first()
        if not tmpl:
            raise HTTPException(status_code=404, detail=f"Template '{payload.template_name}' no existe")
        tenant.template_id = tmpl.id

    if payload.bot_active is not None:
        cfg = dict(tenant.business_config or {})
        cfg["bot_active"] = payload.bot_active
        tenant.business_config = cfg

    from sqlalchemy.orm.attributes import flag_modified
    flag_modified(tenant, "business_config")
    db.commit()
    return {"status": "updated", "tenant_id": tenant_id}


@router.delete("/tenants/{tenant_id}")
def admin_delete_tenant(
    tenant_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_admin_user)
):
    if tenant_id == current_user.tenant_id:
        raise HTTPException(status_code=400, detail="No podés eliminar tu propio tenant")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant no encontrado")
    # Borrar en cascada: conversaciones → leads → suscripción → usuarios → tenant
    leads = db.query(Lead).filter(Lead.tenant_id == tenant_id).all()
    for lead in leads:
        db.query(Conversation).filter(Conversation.lead_id == lead.id).delete()
    db.query(Lead).filter(Lead.tenant_id == tenant_id).delete()
    db.query(Subscription).filter(Subscription.tenant_id == tenant_id).delete()
    db.query(User).filter(User.tenant_id == tenant_id).delete()
    db.delete(tenant)
    db.commit()
    return {"status": "deleted", "tenant_id": tenant_id}


# ─── Users ────────────────────────────────────────────────────────────────────

@router.get("/users")
def admin_users(db: Session = Depends(get_db), _=Depends(get_admin_user)):
    users = db.query(User).all()
    return [
        {
            "id": u.id,
            "email": u.email,
            "tenant_id": u.tenant_id,
            "tenant_name": u.tenant.name if u.tenant else "—",
            "is_admin": u.is_admin,
            "created_at": u.created_at.isoformat() if u.created_at else None,
        }
        for u in users
    ]


@router.delete("/users/{user_id}")
def admin_delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_admin_user)
):
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="No podés eliminarte a vos mismo")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(user)
    db.commit()
    return {"status": "deleted", "user_id": user_id}


# ─── WhatsApp Linking ─────────────────────────────────────────────────────────

class RequestOTPPayload(BaseModel):
    phone_number: str       # solo dígitos sin código de país, e.g. "9341343628"
    country_code: str       # e.g. "54"
    waba_id: Optional[str] = None


class VerifyOTPPayload(BaseModel):
    phone_number_id: str
    code: str


class RegisterNumberPayload(BaseModel):
    phone_number_id: str
    waba_id: str
    tenant_id: int
    pin: str = "000000"


@router.post("/whatsapp/request-otp")
def request_otp(payload: RequestOTPPayload, _=Depends(get_admin_user)):
    """
    Paso 1: Agrega el número al WABA y envía OTP por SMS.
    Devuelve phone_number_id para usar en los pasos siguientes.
    """
    waba_id = payload.waba_id or MAIN_WABA_ID

    # Agregar número al WABA
    add_res = http_requests.post(
        f"{GRAPH}/{waba_id}/phone_numbers",
        json={
            "cc": payload.country_code,
            "phone_number": payload.phone_number,
            "migrate_phone_number": False,
        },
        headers=_meta_headers(),
        timeout=15,
    )
    add_data = add_res.json()

    if not add_res.ok or "id" not in add_data:
        error = add_data.get("error", {}).get("message", add_res.text)
        raise HTTPException(status_code=400, detail=f"Meta API error al agregar número: {error}")

    phone_number_id = add_data["id"]

    # Solicitar OTP por SMS
    otp_res = http_requests.post(
        f"{GRAPH}/{phone_number_id}/request_code",
        json={"code_method": "SMS", "language": "es"},
        headers=_meta_headers(),
        timeout=15,
    )
    otp_data = otp_res.json()

    if not otp_res.ok:
        error = otp_data.get("error", {}).get("message", otp_res.text)
        raise HTTPException(status_code=400, detail=f"Meta API error al solicitar OTP: {error}")

    return {
        "phone_number_id": phone_number_id,
        "waba_id": waba_id,
        "status": "otp_sent",
    }


@router.post("/whatsapp/verify-otp")
def verify_otp(payload: VerifyOTPPayload, _=Depends(get_admin_user)):
    """Paso 2: Verifica el OTP recibido por SMS."""
    res = http_requests.post(
        f"{GRAPH}/{payload.phone_number_id}/verify_code",
        json={"code": payload.code},
        headers=_meta_headers(),
        timeout=15,
    )
    data = res.json()

    if not res.ok:
        error = data.get("error", {}).get("message", res.text)
        raise HTTPException(status_code=400, detail=f"Meta API error al verificar OTP: {error}")

    return {"status": "verified", "phone_number_id": payload.phone_number_id}


@router.post("/whatsapp/register")
def register_number(
    payload: RegisterNumberPayload,
    db: Session = Depends(get_db),
    _=Depends(get_admin_user)
):
    """
    Paso 3: Registra el número en Cloud API, suscribe la app al WABA
    y asigna el número al tenant indicado.
    """
    tenant = db.query(Tenant).filter(Tenant.id == payload.tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant no encontrado")

    # Registrar número en Cloud API
    reg_res = http_requests.post(
        f"{GRAPH}/{payload.phone_number_id}/register",
        json={"messaging_product": "whatsapp", "pin": payload.pin},
        headers=_meta_headers(),
        timeout=15,
    )
    reg_data = reg_res.json()
    if not reg_res.ok:
        error = reg_data.get("error", {}).get("message", reg_res.text)
        raise HTTPException(status_code=400, detail=f"Meta API error al registrar: {error}")

    # Suscribir app al WABA
    http_requests.post(
        f"{GRAPH}/{payload.waba_id}/subscribed_apps",
        headers=_meta_headers(),
        timeout=10,
    )

    # Obtener display phone number
    phone_res = http_requests.get(
        f"{GRAPH}/{payload.phone_number_id}",
        params={"fields": "display_phone_number"},
        headers=_meta_headers(),
        timeout=10,
    )
    display_phone = phone_res.json().get("display_phone_number", "")

    # Asignar al tenant
    from sqlalchemy.orm.attributes import flag_modified
    tenant.phone_number_id = payload.phone_number_id
    cfg = dict(tenant.business_config or {})
    cfg["waba_id"] = payload.waba_id
    cfg["whatsapp_phone"] = display_phone
    tenant.business_config = cfg
    flag_modified(tenant, "business_config")
    db.commit()

    return {
        "status": "connected",
        "phone_number_id": payload.phone_number_id,
        "phone": display_phone,
        "waba_id": payload.waba_id,
        "tenant_id": payload.tenant_id,
    }


# ─── Templates disponibles ────────────────────────────────────────────────────

@router.get("/templates")
def admin_templates(db: Session = Depends(get_db), _=Depends(get_admin_user)):
    templates = db.query(VerticalTemplate).all()
    return [{"id": t.id, "name": t.name, "assistant_name": t.assistant_name} for t in templates]
