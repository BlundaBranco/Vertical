import os

import requests
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified

from app.db.database import get_db
from app.models import Tenant, VerticalTemplate
from app.schemas.settings import SettingsUpdate, WhatsAppProfileUpdate
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

    # Obtener número y perfil desde Meta si tenemos phone_number_id
    display_phone = config.get("whatsapp_phone", "")
    pid = tenant.phone_number_id
    wa_profile = {}
    if pid:
        try:
            token = os.getenv("WHATSAPP_TOKEN")
            # Número de teléfono
            if not display_phone:
                r = requests.get(
                    f"https://graph.facebook.com/v21.0/{pid}",
                    params={"fields": "display_phone_number,verified_name"},
                    headers={"Authorization": f"Bearer {token}"},
                    timeout=4
                )
                if r.ok:
                    display_phone = r.json().get("display_phone_number", "")
            # Perfil del negocio
            r2 = requests.get(
                f"https://graph.facebook.com/v21.0/{pid}/whatsapp_business_profile",
                params={"fields": "about,description,email,websites,profile_picture_url,address,vertical"},
                headers={"Authorization": f"Bearer {token}"},
                timeout=4
            )
            if r2.ok:
                data = r2.json().get("data", [])
                wa_profile = data[0] if data else {}
        except Exception:
            pass

    return {
        "business_name": tenant.name or "",
        "assistant_name": tenant.template.assistant_name if tenant.template else "Ana",
        "agent_name": config.get("agent_name", "Equipo"),
        "tone": config.get("tone", "cercano"),
        "specialty": config.get("specialty", ""),
        "catalog_url": config.get("catalog_url", ""),
        "knowledge_base": config.get("knowledge_base", ""),
        "knowledge_base_url": config.get("knowledge_base_url", ""),
        "phone_number_id": pid or "",
        "whatsapp_phone": display_phone,
        "bot_active": config.get("bot_active", True),
        "nationality": config.get("nationality", "argentino"),
        "communication_style": config.get("communication_style", "estandar"),
        "calendar_url": config.get("calendar_url", ""),
        "vertical": tenant.template.name if tenant.template else "real_estate_v1",
        "wa_about": config.get("wa_about", wa_profile.get("about", "")),
        "wa_description": config.get("wa_description", wa_profile.get("description", "")),
        "wa_email": config.get("wa_email", wa_profile.get("email", "")),
        "wa_website": config.get("wa_website", (wa_profile.get("websites") or [""])[0]),
        "wa_address": config.get("wa_address", wa_profile.get("address", "")),
        "wa_vertical": config.get("wa_vertical", wa_profile.get("vertical", "")),
        "wa_profile_picture_url": wa_profile.get("profile_picture_url", ""),
    }


@router.post("/settings/{tenant_id}")
def update_settings(tenant_id: int, payload: SettingsUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    tenant.name = payload.business_name
    existing_config = tenant.business_config or {}
    config = {
        "agent_name": payload.agent_name,
        "tone": payload.tone,
        "specialty": payload.specialty,
        "catalog_url": payload.catalog_url,
        "knowledge_base": payload.knowledge_base or "",
        "knowledge_base_url": payload.knowledge_base_url or "",
        "nationality": payload.nationality or "argentino",
        "communication_style": payload.communication_style or "estandar",
        "calendar_url": payload.calendar_url or "",
        "bot_active": existing_config.get("bot_active", True),
    }

    if payload.whatsapp_phone is not None:
        config["whatsapp_phone"] = payload.whatsapp_phone

    # Si se acaba de setear una URL, sincronizar inmediatamente
    if payload.knowledge_base_url:
        from app.services.sheets_sync import sync_tenant_sheets
        tenant.business_config = config
        flag_modified(tenant, "business_config")
        db.commit()
        sync_tenant_sheets(tenant, db)
        return {"status": "success", "message": "Configuración guardada y Google Sheets sincronizado"}

    tenant.business_config = config
    flag_modified(tenant, "business_config")

    if tenant.template:
        tenant.template.assistant_name = payload.assistant_name

    if payload.vertical:
        new_template = db.query(VerticalTemplate).filter(VerticalTemplate.name == payload.vertical).first()
        if new_template:
            tenant.template_id = new_template.id

    db.commit()
    return {"status": "success", "message": "Configuración actualizada correctamente"}


@router.patch("/settings/{tenant_id}/whatsapp-profile")
def update_whatsapp_profile(tenant_id: int, payload: WhatsAppProfileUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")
    if not tenant.phone_number_id:
        raise HTTPException(status_code=400, detail="No hay número de WhatsApp vinculado")

    token = os.getenv("WHATSAPP_TOKEN")
    body = {"messaging_product": "whatsapp"}
    if payload.about is not None:
        body["about"] = payload.about[:139]
    if payload.description is not None:
        body["description"] = payload.description
    if payload.email is not None:
        body["email"] = payload.email
    if payload.website is not None:
        body["websites"] = [payload.website] if payload.website else []
    if payload.address is not None:
        body["address"] = payload.address
    if payload.vertical is not None:
        body["vertical"] = payload.vertical

    try:
        r = requests.post(
            f"https://graph.facebook.com/v21.0/{tenant.phone_number_id}/whatsapp_business_profile",
            json=body,
            headers={"Authorization": f"Bearer {token}"},
            timeout=8
        )
        if not r.ok:
            err = r.json().get("error", {}).get("message", r.text)
            raise HTTPException(status_code=400, detail=err)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # Cachear en business_config
    config = dict(tenant.business_config or {})
    if payload.about is not None:
        config["wa_about"] = payload.about[:139]
    if payload.description is not None:
        config["wa_description"] = payload.description
    if payload.email is not None:
        config["wa_email"] = payload.email
    if payload.website is not None:
        config["wa_website"] = payload.website
    if payload.address is not None:
        config["wa_address"] = payload.address
    if payload.vertical is not None:
        config["wa_vertical"] = payload.vertical
    tenant.business_config = config
    flag_modified(tenant, "business_config")
    db.commit()

    return {"status": "success", "message": "Perfil de WhatsApp actualizado"}


@router.post("/settings/{tenant_id}/whatsapp-photo")
async def update_whatsapp_photo(
    tenant_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant or not tenant.phone_number_id:
        raise HTTPException(status_code=400, detail="No hay número de WhatsApp vinculado")

    token = os.getenv("WHATSAPP_TOKEN")
    app_id = os.getenv("FACEBOOK_APP_ID")
    pid = tenant.phone_number_id
    content = await file.read()
    file_type = file.content_type or "image/jpeg"

    # Paso 1: iniciar sesión de Resumable Upload
    session_res = requests.post(
        f"https://graph.facebook.com/v21.0/{app_id}/uploads",
        params={
            "file_length": len(content),
            "file_type": file_type,
            "access_token": token,
        },
        timeout=10
    )
    if not session_res.ok:
        err = session_res.json().get("error", {}).get("message", session_res.text)
        raise HTTPException(status_code=400, detail=f"Error al iniciar upload: {err}")

    upload_session_id = session_res.json().get("id")
    if not upload_session_id:
        raise HTTPException(status_code=400, detail="Meta no devolvió ID de sesión de upload")

    # Paso 2: subir el archivo a la sesión
    upload_res = requests.post(
        f"https://graph.facebook.com/v21.0/{upload_session_id}",
        headers={
            "Authorization": f"OAuth {token}",
            "file_offset": "0",
            "Content-Type": "application/octet-stream",
        },
        data=content,
        timeout=30
    )
    if not upload_res.ok:
        err = upload_res.json().get("error", {}).get("message", upload_res.text)
        raise HTTPException(status_code=400, detail=f"Error al subir archivo: {err}")

    handle = upload_res.json().get("h")
    if not handle:
        raise HTTPException(status_code=400, detail="Meta no devolvió handle del archivo")

    # Paso 3: asignar como foto de perfil
    profile_res = requests.post(
        f"https://graph.facebook.com/v21.0/{pid}/whatsapp_business_profile",
        json={"messaging_product": "whatsapp", "profile_picture_handle": handle},
        headers={"Authorization": f"Bearer {token}"},
        timeout=10
    )
    if not profile_res.ok:
        err = profile_res.json().get("error", {}).get("message", profile_res.text)
        raise HTTPException(status_code=400, detail=f"Error al actualizar foto: {err}")

    return {"status": "success", "message": "Foto de perfil actualizada"}


@router.patch("/settings/{tenant_id}/bot-toggle")
def toggle_bot(tenant_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    config = dict(tenant.business_config or {})
    config["bot_active"] = not config.get("bot_active", True)
    tenant.business_config = config
    flag_modified(tenant, "business_config")
    db.commit()
    return {"bot_active": config["bot_active"]}
