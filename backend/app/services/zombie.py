from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session

from app.models import Lead, Conversation
from app.services.whatsapp import send_whatsapp_template

ZOMBIE_HOURS = 48
ZOMBIE_TEMPLATE_NAME = "reactivacion_lead"
ZOMBIE_TEMPLATE_LANG = "es"


def check_zombie_leads(db: Session):
    """Detecta leads QUALIFYING sin actividad 48h, los marca ZOMBIE y envía template de reactivación."""
    cutoff = datetime.now(timezone.utc) - timedelta(hours=ZOMBIE_HOURS)

    qualifying_leads = db.query(Lead).filter(Lead.status == "QUALIFYING").all()
    flagged = 0

    for lead in qualifying_leads:
        last_user_msg = (
            db.query(Conversation)
            .filter(Conversation.lead_id == lead.id, Conversation.role == "user")
            .order_by(Conversation.timestamp.desc())
            .first()
        )
        if not last_user_msg:
            continue

        ts = last_user_msg.timestamp
        if ts.tzinfo is None:
            ts = ts.replace(tzinfo=timezone.utc)

        if ts < cutoff:
            lead.status = "ZOMBIE"
            flagged += 1
            print(f"[ZOMBIE] Lead {lead.id} ({lead.whatsapp_id}) marcado — última actividad: {ts}")

            # Enviar template de reactivación
            tenant = lead.tenant
            business_name = (tenant.name or "el equipo") if tenant else "el equipo"
            phone_number_id = tenant.phone_number_id if tenant else None

            send_whatsapp_template(
                to_number=lead.whatsapp_id,
                template_name=ZOMBIE_TEMPLATE_NAME,
                language=ZOMBIE_TEMPLATE_LANG,
                components=[{
                    "type": "body",
                    "parameters": [{"type": "text", "text": business_name}]
                }],
                phone_number_id=phone_number_id
            )

    if flagged:
        db.commit()

    print(f"[ZOMBIE] Check completado. {flagged} leads marcados como ZOMBIE.")
