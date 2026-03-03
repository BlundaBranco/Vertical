from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Tenant
from app.schemas.settings import SettingsUpdate
from app.services.auth_service import get_current_user

router = APIRouter()


@router.get("/settings/{tenant_id}")
def get_settings(tenant_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    config = tenant.business_config or {}
    return {
        "business_name": tenant.name or "",
        "assistant_name": tenant.template.assistant_name if tenant.template else "Ana",
        "agent_name": config.get("agent_name", "Equipo"),
        "tone": config.get("tone", "cercano"),
        "specialty": config.get("specialty", ""),
        "catalog_url": config.get("catalog_url", ""),
        "knowledge_base": config.get("knowledge_base", ""),
        "knowledge_base_url": config.get("knowledge_base_url", ""),
        "phone_number_id": tenant.phone_number_id or "",
        "whatsapp_phone": config.get("whatsapp_phone", "")
    }


@router.post("/settings/{tenant_id}")
def update_settings(tenant_id: int, payload: SettingsUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    tenant.name = payload.business_name
    config = {
        "agent_name": payload.agent_name,
        "tone": payload.tone,
        "specialty": payload.specialty,
        "catalog_url": payload.catalog_url,
        "knowledge_base": payload.knowledge_base or "",
        "knowledge_base_url": payload.knowledge_base_url or ""
    }

    if payload.whatsapp_phone is not None:
        config["whatsapp_phone"] = payload.whatsapp_phone

    # Si se acaba de setear una URL, sincronizar inmediatamente
    if payload.knowledge_base_url:
        from app.services.sheets_sync import sync_tenant_sheets
        tenant.business_config = config
        db.commit()
        sync_tenant_sheets(tenant, db)
        return {"status": "success", "message": "Configuración guardada y Google Sheets sincronizado"}

    tenant.business_config = config

    if tenant.template:
        tenant.template.assistant_name = payload.assistant_name

    db.commit()
    return {"status": "success", "message": "Configuración actualizada correctamente"}
