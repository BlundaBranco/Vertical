"""Agrega columna google_id a la tabla users."""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text("""
        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS google_id VARCHAR UNIQUE
    """))
    conn.commit()
    print("Migración completada: columna google_id agregada a users.")
