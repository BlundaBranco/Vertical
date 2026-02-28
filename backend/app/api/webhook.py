import os
from fastapi import APIRouter, Depends, Request
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Tenant, Lead
from app.services.message_handler import process_message
from app.services import whatsapp

router = APIRouter()

VERIFY_TOKEN = os.getenv("WEBHOOK_VERIFY_TOKEN", "admin")


def _log(msg: str) -> None:
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode("ascii", errors="replace").decode("ascii"))


@router.get("/webhook")
async def verify_webhook(request: Request):
    """Verificación de webhook para Meta."""
    try:
        params = request.query_params
        mode = params.get("hub.mode")
        token = (params.get("hub.verify_token") or "").strip()
        challenge = params.get("hub.challenge")
        _log(f"[WEBHOOK GET] mode={mode}, token={token!r}, challenge={challenge!r}")
        if mode == "subscribe" and token == VERIFY_TOKEN and challenge:
            return PlainTextResponse(content=str(challenge), media_type="text/plain")
        _log(f"[WEBHOOK] Verificacion rechazada (token esperado: {VERIFY_TOKEN!r})")
        return PlainTextResponse(content="Error", status_code=403)
    except Exception as e:
        _log(f"[WEBHOOK] Excepcion en GET /webhook: {e}")
        import traceback
        traceback.print_exc()
        return PlainTextResponse(content="Error", status_code=500)


@router.post("/webhook")
async def receive_whatsapp_message(request: Request, db: Session = Depends(get_db)):
    """Recibe mensajes de WhatsApp (JSON de Meta)."""
    try:
        body = await request.json()
        _log("[WEBHOOK] Mensaje recibido desde Meta")
        if "entry" not in body:
            return {"status": "unknown_format"}
        val = body["entry"][0]["changes"][0]["value"]
        if "messages" not in val:
            return {"status": "ok"}
        msg = val["messages"][0]
        num = msg["from"]
        txt = msg.get("text", {}).get("body", "")

        if not txt:
            return {"status": "empty_message"}

        _log(f"[WEBHOOK] De {num}: {txt[:50]}...")

        # Identificar el tenant por phone_number_id (Meta lo manda en el payload)
        phone_number_id = val.get("metadata", {}).get("phone_number_id")
        if phone_number_id:
            tenant = db.query(Tenant).filter_by(phone_number_id=str(phone_number_id)).first()
        else:
            tenant = db.query(Tenant).first()

        if not tenant:
            _log(f"[WEBHOOK] ERROR: No hay tenant para phone_number_id={phone_number_id}. Ejecuta: python scripts/seed.py")
            return {"status": "error", "message": f"No tenant found for phone_number_id={phone_number_id}"}

        lead = db.query(Lead).filter_by(whatsapp_id=num, tenant_id=tenant.id).first()
        if not lead:
            lead = Lead(whatsapp_id=num, tenant_id=tenant.id)
            db.add(lead)
            db.commit()
            db.refresh(lead)

        ai_response = process_message(tenant, lead, txt, db)
        whatsapp.send_whatsapp_message(num, ai_response)

        _log(f"[WEBHOOK] Respuesta enviada a {num}")
        return {"status": "processed"}

    except Exception as e:
        _log(f"[WEBHOOK] Error critico: {e}")
        import traceback
        traceback.print_exc()
        return {"status": "error", "message": str(e)}
