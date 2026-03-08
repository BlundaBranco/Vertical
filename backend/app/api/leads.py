from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from app.db.database import get_db
from app.models import Lead, Conversation
from app.services.auth_service import get_current_user

router = APIRouter()

STATUS_MAP = {
    "NEW": "new",
    "QUALIFYING": "qualifying",
    "QUALIFIED": "qualified",
    "HUMAN_HANDOFF": "human_handoff",
    "LOST": "lost",
    "ZOMBIE": "zombie"
}


def _format_time(dt: datetime) -> str:
    now = datetime.now(timezone.utc)
    diff = now.date() - dt.date()
    if diff.days == 0:
        return dt.strftime("%H:%M")
    elif diff.days == 1:
        return f"Ayer {dt.strftime('%H:%M')}"
    else:
        return dt.strftime("%d/%m %H:%M")


@router.get("/leads/{tenant_id}")
def get_leads(tenant_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    """Obtiene todos los leads de un tenant con su información completa."""
    if current_user.tenant_id != tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    leads_db = db.query(Lead).filter(
        Lead.tenant_id == tenant_id
    ).order_by(Lead.created_at.desc()).all()

    leads_response = []
    for lead in leads_db:
        data = lead.extracted_data or {}
        convs = sorted(lead.conversations, key=lambda x: x.timestamp)
        messages = [
            {
                "id": m.id,
                "sender": "bot" if m.role == "assistant" else "user",
                "text": m.content,
                "time": _format_time(m.timestamp)
            }
            for m in convs
        ]

        last_conv = convs[-1] if convs else None
        leads_response.append({
            "id": lead.id,
            "name": data.get("nombre", f"Lead {lead.whatsapp_id[-4:]}"),
            "status": STATUS_MAP.get(lead.status, "qualifying"),
            "rawStatus": lead.status,
            "lastMessage": last_conv.content if last_conv else "Sin mensajes",
            "time": _format_time(last_conv.timestamp) if last_conv else "",
            "budget": data.get("presupuesto", "N/A"),
            "zone": data.get("zona", "N/A"),
            "propertyType": data.get("tipo_propiedad", "N/A"),
            "rejectionReason": data.get("motivo_rechazo"),
            "whatsappId": lead.whatsapp_id,
            "createdAt": lead.created_at.strftime("%d/%m/%Y"),
            "messages": messages
        })

    return leads_response


@router.post("/leads/{lead_id}/restart")
def restart_lead(lead_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    """Retoma el lead con IA: vuelve a QUALIFYING y borra el motivo de rechazo."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    if lead.tenant_id != current_user.tenant_id:
        raise HTTPException(status_code=403, detail="Acceso denegado")

    lead.status = "QUALIFYING"
    if lead.extracted_data and "motivo_rechazo" in lead.extracted_data:
        data = dict(lead.extracted_data)
        del data["motivo_rechazo"]
        lead.extracted_data = data

    db.commit()
    return {"status": "ok", "lead_status": "QUALIFYING"}
