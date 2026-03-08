"""
Migra brancoadrianblunda@gmail.com al tenant 1 (admin) y elimina la cuenta
email/password de admin@ventra.ai.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.db.database import SessionLocal
from app.models.db_models import User, Tenant, Lead, Conversation

GOOGLE_EMAIL = "brancoadrianblunda@gmail.com"
OLD_ADMIN_EMAIL = "admin@ventra.ai"
ADMIN_TENANT_ID = 1

db = SessionLocal()

# 1. Verificar que exista el usuario Google
google_user = db.query(User).filter(User.email == GOOGLE_EMAIL).first()
if not google_user:
    print(f"[ERROR] Usuario {GOOGLE_EMAIL} no encontrado. ¿Ya inició sesión con Google?")
    db.close()
    sys.exit(1)

print(f"[OK] Usuario Google: id={google_user.id}, tenant_id={google_user.tenant_id}")

old_tenant_id = google_user.tenant_id

# 2. Verificar que el tenant admin existe
admin_tenant = db.query(Tenant).filter(Tenant.id == ADMIN_TENANT_ID).first()
if not admin_tenant:
    print(f"[ERROR] Tenant admin (id={ADMIN_TENANT_ID}) no encontrado.")
    db.close()
    sys.exit(1)

print(f"[OK] Tenant admin: id={admin_tenant.id}, name={admin_tenant.name}")

# 3. Mover el usuario Google al tenant admin
google_user.tenant_id = ADMIN_TENANT_ID
db.add(google_user)
db.flush()
print(f"[OK] {GOOGLE_EMAIL} movido a tenant {ADMIN_TENANT_ID}")

# 4. Eliminar la cuenta admin@ventra.ai (si existe)
old_admin = db.query(User).filter(User.email == OLD_ADMIN_EMAIL).first()
if old_admin:
    db.delete(old_admin)
    db.flush()
    print(f"[OK] Cuenta {OLD_ADMIN_EMAIL} eliminada")
else:
    print(f"[INFO] {OLD_ADMIN_EMAIL} no encontrada (ya eliminada o nunca existió)")

# 5. Limpiar el tenant viejo del usuario Google si era distinto al admin y no tiene más usuarios
if old_tenant_id and old_tenant_id != ADMIN_TENANT_ID:
    remaining_users = db.query(User).filter(User.tenant_id == old_tenant_id).count()
    if remaining_users == 0:
        # Eliminar leads/conversaciones del tenant viejo
        old_leads = db.query(Lead).filter(Lead.tenant_id == old_tenant_id).all()
        for lead in old_leads:
            db.query(Conversation).filter(Conversation.lead_id == lead.id).delete()
        db.query(Lead).filter(Lead.tenant_id == old_tenant_id).delete()
        old_tenant = db.query(Tenant).filter(Tenant.id == old_tenant_id).first()
        if old_tenant:
            db.delete(old_tenant)
        print(f"[OK] Tenant viejo (id={old_tenant_id}) eliminado (sin usuarios)")
    else:
        print(f"[INFO] Tenant viejo (id={old_tenant_id}) tiene {remaining_users} usuario(s) más, no se elimina")

db.commit()
print()
print("=" * 50)
print(f"LISTO. {GOOGLE_EMAIL} es ahora el admin del tenant {ADMIN_TENANT_ID}.")
print(f"Credenciales: Google Login con {GOOGLE_EMAIL}")
print("=" * 50)
db.close()
