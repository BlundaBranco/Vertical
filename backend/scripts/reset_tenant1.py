"""
reset_tenant1.py
Limpia los datos demo del tenant 1 y lo deja en estado neutro.

- Borra todos los leads y conversaciones del tenant 1
- Resetea config a general_v1 / bot inactivo
- NO toca phone_number_id (producción sigue conectada)
- NO toca la cuenta de usuario

Uso:
    source venv/Scripts/activate
    cd backend
    python scripts/reset_tenant1.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.db_models import Tenant, Lead, Conversation, VerticalTemplate

db: Session = SessionLocal()

try:
    tenant = db.query(Tenant).filter(Tenant.id == 1).first()
    if not tenant:
        print("[ERROR] Tenant 1 no encontrado.")
        sys.exit(1)

    # Borrar conversaciones y leads
    leads = db.query(Lead).filter(Lead.tenant_id == 1).all()
    for lead in leads:
        db.query(Conversation).filter(Conversation.lead_id == lead.id).delete()
    deleted = db.query(Lead).filter(Lead.tenant_id == 1).delete()
    db.commit()
    print(f"[OK] Eliminados {deleted} leads y sus conversaciones.")

    # Resetear a general_v1
    template = db.query(VerticalTemplate).filter(VerticalTemplate.name == "general_v1").first()
    if not template:
        print("[WARN] general_v1 no encontrado, template_id no cambiado.")
    else:
        tenant.template_id = template.id

    # Config neutra — mantiene phone_number_id intacto
    current_config = dict(tenant.business_config or {})
    tenant.name = "Vertical AI"
    tenant.business_config = {
        "agent_name": "Ana",
        "tone": "cercano",
        "specialty": "",
        "catalog_url": "",
        "knowledge_base": "",
        "rules": "",
        "nationality": "argentino",
        "communication_style": "estandar",
        "bot_active": False,
        # Preservar datos de WhatsApp
        "waba_id": current_config.get("waba_id", ""),
        "whatsapp_phone": current_config.get("whatsapp_phone", ""),
    }
    db.commit()
    print(f"[OK] Tenant reseteado: '{tenant.name}', vertical: general_v1, bot: inactivo.")
    print(f"[OK] phone_number_id conservado: {tenant.phone_number_id}")

except Exception as e:
    db.rollback()
    print(f"[ERROR] {e}")
    raise
finally:
    db.close()
