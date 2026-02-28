from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from datetime import datetime, timedelta

from app.db.database import get_db
from app.models import Lead
from app.services.auth_service import get_current_user

router = APIRouter()


@router.get("/analytics/{tenant_id}")
def get_analytics(tenant_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    now = datetime.utcnow()
    fourteen_days_ago = now - timedelta(days=14)
    week_ago = now - timedelta(days=7)

    # Leads por día — últimos 14 días
    daily_raw = db.query(
        func.date_trunc('day', Lead.created_at).label('day'),
        func.count(Lead.id).label('total'),
        func.sum(case((Lead.status == 'QUALIFIED', 1), else_=0)).label('qualified')
    ).filter(
        Lead.tenant_id == tenant_id,
        Lead.created_at >= fourteen_days_ago
    ).group_by(func.date_trunc('day', Lead.created_at)).order_by('day').all()

    daily_map = {row.day.date(): {'total': row.total, 'qualified': int(row.qualified or 0)} for row in daily_raw}
    daily = []
    for i in range(13, -1, -1):
        d = (now - timedelta(days=i)).date()
        entry = daily_map.get(d, {'total': 0, 'qualified': 0})
        daily.append({
            'fecha': d.strftime('%d/%m'),
            'leads': entry['total'],
            'calificados': entry['qualified']
        })

    # Distribución por estado actual
    STATUS_LABELS = {
        'NEW': 'Nuevos',
        'QUALIFYING': 'Conversando',
        'QUALIFIED': 'Calificados',
        'LOST': 'Perdidos',
        'HUMAN_HANDOFF': 'En Atención'
    }
    status_raw = db.query(
        Lead.status, func.count(Lead.id).label('count')
    ).filter(Lead.tenant_id == tenant_id).group_by(Lead.status).all()

    distribution = [
        {'name': STATUS_LABELS.get(row.status, row.status), 'value': row.count, 'status': row.status}
        for row in status_raw if row.count > 0
    ]

    # Esta semana vs semana pasada
    this_week_total = db.query(func.count(Lead.id)).filter(
        Lead.tenant_id == tenant_id, Lead.created_at >= week_ago
    ).scalar() or 0

    last_week_total = db.query(func.count(Lead.id)).filter(
        Lead.tenant_id == tenant_id,
        Lead.created_at >= fourteen_days_ago,
        Lead.created_at < week_ago
    ).scalar() or 0

    this_week_qualified = db.query(func.count(Lead.id)).filter(
        Lead.tenant_id == tenant_id,
        Lead.status == 'QUALIFIED',
        Lead.created_at >= week_ago
    ).scalar() or 0

    last_week_qualified = db.query(func.count(Lead.id)).filter(
        Lead.tenant_id == tenant_id,
        Lead.status == 'QUALIFIED',
        Lead.created_at >= fourteen_days_ago,
        Lead.created_at < week_ago
    ).scalar() or 0

    def pct_change(current, previous):
        if previous == 0:
            return None
        return round((current - previous) / previous * 100, 1)

    return {
        'daily': daily,
        'distribution': distribution,
        'this_week': this_week_total,
        'last_week': last_week_total,
        'this_week_qualified': this_week_qualified,
        'last_week_qualified': last_week_qualified,
        'leads_change': pct_change(this_week_total, last_week_total),
        'qualified_change': pct_change(this_week_qualified, last_week_qualified),
        'conversion_rate': round(this_week_qualified / this_week_total * 100, 1) if this_week_total > 0 else 0,
        'avg_per_day': round(this_week_total / 7, 1)
    }
