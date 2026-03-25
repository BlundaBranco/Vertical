"""
Limpia usuarios y configura contacto@somosvertical.ar como único usuario del tenant 1.
- Elimina todos los demás usuarios
- Crea o actualiza contacto@somosvertical.ar con la contraseña dada
- Cambia el vertical del tenant 1 a general_v1
- Limpia leads y conversaciones del tenant 1

Uso: python scripts/setup_contacto_user.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from app.db.database import SessionLocal
from app.models.db_models import User, Tenant, Lead, Conversation, VerticalTemplate
from app.services.auth_service import hash_password

TARGET_EMAIL = "contacto@somosvertical.ar"
TARGET_PASSWORD = "Papaleta004!"
TENANT_ID = 1

db = SessionLocal()

try:
    # 1. Verificar que el tenant 1 existe
    tenant = db.query(Tenant).filter(Tenant.id == TENANT_ID).first()
    if not tenant:
        print("[ERROR] Tenant 1 no encontrado.")
        sys.exit(1)
    print(f"[OK] Tenant 1: {tenant.name}")

    # 2. Cambiar vertical a general_v1
    general = db.query(VerticalTemplate).filter(VerticalTemplate.name == "general_v1").first()
    if not general:
        print("[ERROR] Vertical general_v1 no existe en DB. Correr add_general_vertical.py primero.")
        sys.exit(1)
    tenant.template_id = general.id
    db.add(tenant)
    print(f"[OK] Vertical cambiado a general_v1 (id={general.id})")

    # 3. Limpiar leads y conversaciones del tenant 1
    leads = db.query(Lead).filter(Lead.tenant_id == TENANT_ID).all()
    for lead in leads:
        db.query(Conversation).filter(Conversation.lead_id == lead.id).delete()
    deleted_leads = db.query(Lead).filter(Lead.tenant_id == TENANT_ID).delete()
    print(f"[OK] Eliminados {deleted_leads} leads (y sus conversaciones) del tenant 1")

    # 4. Eliminar todos los usuarios excepto el target
    all_users = db.query(User).all()
    for u in all_users:
        if u.email != TARGET_EMAIL:
            db.delete(u)
            print(f"[OK] Usuario eliminado: {u.email}")

    # 5. Crear o actualizar contacto@somosvertical.ar
    target_user = db.query(User).filter(User.email == TARGET_EMAIL).first()
    if target_user:
        target_user.password_hash = hash_password(TARGET_PASSWORD)
        target_user.tenant_id = TENANT_ID
        target_user.google_id = None
        target_user.facebook_id = None
        db.add(target_user)
        print(f"[OK] Usuario {TARGET_EMAIL} actualizado (contraseña reseteada, tenant={TENANT_ID})")
    else:
        new_user = User(
            email=TARGET_EMAIL,
            password_hash=hash_password(TARGET_PASSWORD),
            tenant_id=TENANT_ID
        )
        db.add(new_user)
        print(f"[OK] Usuario {TARGET_EMAIL} creado (tenant={TENANT_ID})")

    db.commit()
    print()
    print("=" * 50)
    print("LISTO.")
    print(f"  Usuario: {TARGET_EMAIL}")
    print(f"  Password: {TARGET_PASSWORD}")
    print(f"  Tenant: {TENANT_ID} (general_v1)")
    print("=" * 50)

except Exception as e:
    db.rollback()
    print(f"[ERROR] {e}")
    raise
finally:
    db.close()
