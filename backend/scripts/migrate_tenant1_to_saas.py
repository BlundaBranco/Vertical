"""
Migra el Tenant 1 de general_v1 a vertical_saas_v1.
Uso: python scripts/migrate_tenant1_to_saas.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from dotenv import load_dotenv
load_dotenv()

from app.db.database import SessionLocal
from app.models.db_models import Tenant, VerticalTemplate

db = SessionLocal()

template = db.query(VerticalTemplate).filter(VerticalTemplate.name == "vertical_saas_v1").first()
if not template:
    print("[ERROR] vertical_saas_v1 no existe en DB. Reiniciá el servidor para que _seed_verticals() lo cree.")
    db.close()
    sys.exit(1)

tenant = db.query(Tenant).filter(Tenant.id == 1).first()
if not tenant:
    print("[ERROR] Tenant 1 no encontrado.")
    db.close()
    sys.exit(1)

old_template_id = tenant.template_id
new_template_id = template.id
tenant.template_id = new_template_id
db.commit()
db.close()

print(f"[OK] Tenant 1 migrado: template_id {old_template_id} → {new_template_id} (vertical_saas_v1)")
