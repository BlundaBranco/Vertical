import os
import re
import requests
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List

from app.db.database import get_db
from app.models import Tenant
from app.services.auth_service import get_current_user

router = APIRouter()

WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
GRAPH_URL = "https://graph.facebook.com/v20.0"


def _get_waba_id(tenant: Tenant):
    config = tenant.business_config or {}
    waba_id = config.get("waba_id") or os.getenv("WHATSAPP_WABA_ID")
    if not waba_id:
        raise HTTPException(
            status_code=400,
            detail="WABA ID no configurado. Conectá tu WhatsApp desde Configuración primero."
        )
    return waba_id


def _meta_headers():
    return {"Authorization": f"Bearer {WHATSAPP_TOKEN}"}


@router.get("/templates/{tenant_id}")
def get_templates(tenant_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    waba_id = _get_waba_id(tenant)

    res = requests.get(
        f"{GRAPH_URL}/{waba_id}/message_templates",
        params={"fields": "name,category,status,language,components", "limit": 100},
        headers=_meta_headers()
    )
    if not res.ok:
        err = res.json().get("error", {}).get("message", f"Error {res.status_code}")
        raise HTTPException(status_code=res.status_code, detail=err)

    return res.json()


class CreateTemplateRequest(BaseModel):
    name: str
    category: str
    language: str
    body_text: str
    body_example: Optional[List[str]] = None
    header_text: Optional[str] = None
    footer_text: Optional[str] = None


@router.post("/templates/{tenant_id}")
def create_template(
    tenant_id: int,
    payload: CreateTemplateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    waba_id = _get_waba_id(tenant)

    # Sanitize name
    name = re.sub(r'[^a-z0-9_]', '_', payload.name.lower().strip())

    components = []

    if payload.header_text:
        components.append({"type": "HEADER", "format": "TEXT", "text": payload.header_text})

    body_component = {"type": "BODY", "text": payload.body_text}
    # Detect positional vars {{1}}, {{2}}...
    vars_in_body = re.findall(r'\{\{\d+\}\}', payload.body_text)
    if vars_in_body and payload.body_example:
        body_component["example"] = {"body_text": [payload.body_example]}
    components.append(body_component)

    if payload.footer_text:
        components.append({"type": "FOOTER", "text": payload.footer_text})

    body = {
        "name": name,
        "category": payload.category.upper(),
        "language": payload.language,
        "components": components
    }

    res = requests.post(
        f"{GRAPH_URL}/{waba_id}/message_templates",
        json=body,
        headers={**_meta_headers(), "Content-Type": "application/json"}
    )

    data = res.json()
    if not res.ok:
        err = data.get("error", {}).get("message", f"Error {res.status_code}")
        raise HTTPException(status_code=res.status_code, detail=err)

    return data


class SendTemplateRequest(BaseModel):
    to_number: str
    components: Optional[List[dict]] = None


@router.post("/templates/{tenant_id}/{template_name}/send")
def send_template(
    tenant_id: int,
    template_name: str,
    payload: SendTemplateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    pid = tenant.phone_number_id or os.getenv("WHATSAPP_PHONE_ID")
    if not pid:
        raise HTTPException(status_code=400, detail="phone_number_id no configurado")

    # Fetch template to get language
    waba_id = _get_waba_id(tenant)
    res = requests.get(
        f"{GRAPH_URL}/{waba_id}/message_templates",
        params={"fields": "name,language,status", "limit": 100},
        headers=_meta_headers()
    )
    templates = res.json().get("data", []) if res.ok else []
    tmpl = next((t for t in templates if t["name"] == template_name), None)
    language = tmpl["language"] if tmpl else "es"

    import os as _os
    import requests as _req
    meta_token = _os.getenv("WHATSAPP_TOKEN")
    clean_number = str(payload.to_number).replace("+", "").replace(" ", "")
    send_body = {
        "messaging_product": "whatsapp",
        "to": clean_number,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {"code": language},
            "components": payload.components or []
        }
    }
    send_res = _req.post(
        f"https://graph.facebook.com/v21.0/{pid}/messages",
        json=send_body,
        headers={"Authorization": f"Bearer {meta_token}", "Content-Type": "application/json"}
    )
    data = send_res.json()
    if not send_res.ok:
        err = data.get("error", {}).get("message", f"Error {send_res.status_code}")
        raise HTTPException(status_code=400, detail=err)
    return data


@router.delete("/templates/{tenant_id}/{template_name}")
def delete_template(
    tenant_id: int,
    template_name: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Negocio no encontrado")

    waba_id = _get_waba_id(tenant)

    res = requests.delete(
        f"{GRAPH_URL}/{waba_id}/message_templates",
        params={"name": template_name},
        headers=_meta_headers()
    )

    data = res.json()
    if not res.ok:
        err = data.get("error", {}).get("message", f"Error {res.status_code}")
        raise HTTPException(status_code=res.status_code, detail=err)

    return data
