"""
Migración: agrega facebook_id a users y hace password_hash nullable.
Correr desde backend/ con el venv activado:
    python scripts/migrate_social_auth.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS facebook_id VARCHAR UNIQUE"))
    conn.execute(text("ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL"))
    conn.commit()

print("Migración completada.")
