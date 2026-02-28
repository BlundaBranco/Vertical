"""
Script para crear el primer usuario admin manualmente.
Uso: python scripts/create_user.py <email> <password> <tenant_id>
"""
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from dotenv import load_dotenv
load_dotenv()

from app.db.database import SessionLocal
from app.models.db_models import User
from app.services.auth_service import hash_password


def create_user(email: str, password: str, tenant_id: int):
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            print(f"Error: ya existe un usuario con el email {email}")
            return

        user = User(
            email=email,
            password_hash=hash_password(password),
            tenant_id=tenant_id
        )
        db.add(user)
        db.commit()
        print(f"Usuario creado: {email} (tenant_id={tenant_id})")
    finally:
        db.close()


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Uso: python scripts/create_user.py <email> <password> <tenant_id>")
        sys.exit(1)

    create_user(sys.argv[1], sys.argv[2], int(sys.argv[3]))
