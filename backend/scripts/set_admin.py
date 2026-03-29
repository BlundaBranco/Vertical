"""
set_admin.py
Migración: agrega columna is_admin a la tabla users y marca contacto@somosvertical.ar como admin.

IMPORTANTE: Correr este script en producción ANTES de deployar el nuevo código.

Uso:
    source venv/Scripts/activate
    cd backend
    python scripts/set_admin.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from sqlalchemy import text
from app.db.database import engine

ADMIN_EMAIL = "contacto@somosvertical.ar"

with engine.connect() as conn:
    # Agregar columna si no existe (PostgreSQL)
    conn.execute(text("""
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE
    """))
    conn.commit()
    print("[OK] Columna is_admin creada (o ya existía).")

    # Marcar admin
    result = conn.execute(
        text("UPDATE users SET is_admin = TRUE WHERE email = :email"),
        {"email": ADMIN_EMAIL}
    )
    conn.commit()

    if result.rowcount == 0:
        print(f"[WARN] No se encontró usuario con email '{ADMIN_EMAIL}'. Creá el usuario primero.")
    else:
        print(f"[OK] '{ADMIN_EMAIL}' marcado como admin.")
