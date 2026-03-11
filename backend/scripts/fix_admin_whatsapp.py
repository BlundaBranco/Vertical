"""
Corrige el tenant admin (id=1) para usar el número de prueba
del portafolio comercial de Vertical.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm.attributes import flag_modified
from app.db.database import SessionLocal
from app.models.db_models import Tenant

TENANT_ID     = 1
PHONE_ID      = "1008091949048703"
WABA_ID       = "1630587688290504"

db = SessionLocal()
tenant = db.query(Tenant).filter(Tenant.id == TENANT_ID).first()
if not tenant:
    print("[ERROR] Tenant 1 no encontrado.")
    db.close()
    sys.exit(1)

tenant.phone_number_id = PHONE_ID

config = dict(tenant.business_config or {})
config["waba_id"] = WABA_ID
tenant.business_config = config
flag_modified(tenant, "business_config")

db.commit()
print(f"[OK] Tenant {TENANT_ID} actualizado:")
print(f"     phone_number_id = {PHONE_ID}")
print(f"     waba_id         = {WABA_ID}")
db.close()
