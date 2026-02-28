from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Tenant, Lead, Conversation
from app.schemas.chat import MessageInput, ManualMessageInput
from app.services.message_handler import process_message
from app.services import whatsapp

router = APIRouter()


@router.get("/ping")
def ping():
    return {"message": "pong", "status": "ok"}


@router.post("/test-chat")
def test_chat(input: MessageInput, db: Session = Depends(get_db)):
    tenant = db.query(Tenant).filter(Tenant.id == input.tenant_id).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    lead = db.query(Lead).filter(
        Lead.whatsapp_id == input.user_phone,
        Lead.tenant_id == tenant.id
    ).first()

    if not lead:
        lead = Lead(whatsapp_id=input.user_phone, tenant_id=tenant.id)
        db.add(lead)
        db.commit()
        db.refresh(lead)

    ai_response_text = process_message(tenant, lead, input.message, db)

    return {
        "response": ai_response_text,
        "lead_status": lead.status,
        "extracted_data": lead.extracted_data
    }


@router.post("/manual-message")
def manual_message(input: ManualMessageInput, db: Session = Depends(get_db)):
    """El operador humano toma control y envía un mensaje directo al lead via WhatsApp."""
    lead = db.query(Lead).filter(Lead.id == input.lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    # Guardar en historial como mensaje del asistente
    db.add(Conversation(lead_id=lead.id, role="assistant", content=input.message))

    # Marcar como intervención humana
    if lead.status not in ("HUMAN_HANDOFF", "LOST"):
        lead.status = "HUMAN_HANDOFF"

    db.commit()

    # Enviar por WhatsApp
    whatsapp.send_whatsapp_message(lead.whatsapp_id, input.message)

    return {"status": "sent"}
