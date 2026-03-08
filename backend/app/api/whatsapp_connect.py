import os
import requests as http_requests
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from app.db.database import get_db
from app.models.db_models import Tenant
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])

FACEBOOK_APP_ID = os.getenv("FACEBOOK_APP_ID")
FACEBOOK_APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")
GRAPH = "https://graph.facebook.com/v20.0"


class WhatsAppConnectRequest(BaseModel):
    code: str
    waba_id: Optional[str] = None
    phone_number_id: Optional[str] = None


@router.post("/connect")
def connect_whatsapp(
    payload: WhatsAppConnectRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # 1. Intercambiar code por user access token
    token_res = http_requests.get(
        f"{GRAPH}/oauth/access_token",
        params={
            "client_id": FACEBOOK_APP_ID,
            "client_secret": FACEBOOK_APP_SECRET,
            "code": payload.code,
        }
    ).json()

    access_token = token_res.get("access_token")
    if not access_token:
        raise HTTPException(status_code=400, detail="No se pudo obtener el token de Facebook")

    waba_id = payload.waba_id
    phone_number_id = payload.phone_number_id
    phone_display = ""

    # 2. Si el frontend no trajo waba_id, buscarlo en el token
    if not waba_id:
        debug_res = http_requests.get(
            f"{GRAPH}/debug_token",
            params={
                "input_token": access_token,
                "access_token": f"{FACEBOOK_APP_ID}|{FACEBOOK_APP_SECRET}",
            }
        ).json()

        granular_scopes = debug_res.get("data", {}).get("granular_scopes", [])
        waba_ids = []
        for scope in granular_scopes:
            if scope.get("scope") == "whatsapp_business_management":
                waba_ids = scope.get("target_ids", [])
                break

        if not waba_ids:
            raise HTTPException(status_code=400, detail="No se encontró ninguna cuenta de WhatsApp Business")
        waba_id = waba_ids[0]

    # 3. Suscribir la app al WABA
    http_requests.post(
        f"{GRAPH}/{waba_id}/subscribed_apps",
        params={"access_token": access_token}
    )

    # 4. Obtener phone_number_id si el frontend no lo trajo
    if not phone_number_id:
        phones_res = http_requests.get(
            f"{GRAPH}/{waba_id}/phone_numbers",
            params={"access_token": access_token, "fields": "id,display_phone_number,verified_name"}
        ).json()

        phones = phones_res.get("data", [])
        if not phones:
            raise HTTPException(status_code=400, detail="No se encontraron números en la cuenta de WhatsApp Business")

        phone_number_id = phones[0]["id"]
        phone_display = phones[0].get("display_phone_number", "")
    else:
        phone_res = http_requests.get(
            f"{GRAPH}/{phone_number_id}",
            params={"access_token": access_token, "fields": "display_phone_number"}
        ).json()
        phone_display = phone_res.get("display_phone_number", "")

    # 5. Registrar el número para Cloud API (ignorar si ya está registrado)
    http_requests.post(
        f"{GRAPH}/{phone_number_id}/register",
        json={"messaging_product": "whatsapp", "pin": "000000"},
        headers={"Authorization": f"Bearer {access_token}"}
    )

    # 6. Guardar en tenant
    tenant = db.query(Tenant).filter(Tenant.id == current_user.tenant_id).first()
    tenant.phone_number_id = phone_number_id
    config = dict(tenant.business_config or {})
    config["waba_id"] = waba_id
    config["whatsapp_phone"] = phone_display
    tenant.business_config = config
    db.commit()

    return {
        "status": "connected",
        "phone_number_id": phone_number_id,
        "phone": phone_display,
        "waba_id": waba_id,
    }
