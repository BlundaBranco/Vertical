"""
Script para crear el vertical "general_v1" en la DB.
Correr una sola vez: python scripts/add_general_vertical.py
No resetea la DB — solo inserta si no existe.
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from app.db.database import SessionLocal
from app.models import VerticalTemplate

GENERAL_SYSTEM_PROMPT = """Sos {assistant_name}, quien atiende consultas de {business_name} por WhatsApp.
Respondé de forma natural y útil según la especialidad del negocio.
Cuando sepas el nombre del cliente, la conversación ya puede considerarse calificada.
"""

def main():
    db = SessionLocal()
    try:
        existing = db.query(VerticalTemplate).filter(VerticalTemplate.name == "general_v1").first()
        if existing:
            print("[INFO] general_v1 ya existe en DB. No se creó nada.")
            return

        template = VerticalTemplate(
            name="general_v1",
            assistant_name="Asistente",
            system_prompt_base=GENERAL_SYSTEM_PROMPT,
            required_fields_schema=["nombre"],
        )
        db.add(template)
        db.commit()
        print(f"[OK] Vertical 'general_v1' creado con ID: {template.id}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
