from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session

from app.models import Lead, Conversation

ZOMBIE_HOURS = 48


def check_zombie_leads(db: Session):
    """Detecta leads QUALIFYING sin actividad del usuario en 48h y los marca como ZOMBIE."""
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

    if flagged:
        db.commit()

    print(f"[ZOMBIE] Check completado. {flagged} leads marcados como ZOMBIE.")
