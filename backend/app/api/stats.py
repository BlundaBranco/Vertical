from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import get_db
from app.models import Lead, Conversation

router = APIRouter()


@router.get("/stats/{tenant_id}")
def get_stats(tenant_id: int, db: Session = Depends(get_db)):
    """Obtiene estadísticas agregadas del tenant."""
    total_leads = db.query(Lead).filter(Lead.tenant_id == tenant_id).count()
    qualified = db.query(Lead).filter(Lead.tenant_id == tenant_id, Lead.status == "QUALIFIED").count()
    lost = db.query(Lead).filter(Lead.tenant_id == tenant_id, Lead.status == "LOST").count()
    qualifying = db.query(Lead).filter(Lead.tenant_id == tenant_id, Lead.status == "QUALIFYING").count()

    total_conversations = db.query(func.count(Conversation.id)).join(Lead).filter(
        Lead.tenant_id == tenant_id
    ).scalar() or 0

    return {
        "totalLeads": total_leads,
        "qualified": qualified,
        "lost": lost,
        "qualifying": qualifying,
        "totalConversations": total_conversations,
        "conversionRate": round((qualified / total_leads * 100) if total_leads > 0 else 0, 1)
    }
