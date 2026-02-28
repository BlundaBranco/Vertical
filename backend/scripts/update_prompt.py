import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import SessionLocal
from app.models import VerticalTemplate


def update_real_estate_prompt():
    db = SessionLocal()
    template = db.query(VerticalTemplate).filter_by(name="real_estate_v1").first()

    if template:
        new_prompt = """
Eres un Asistente Comercial de IA para una Inmobiliaria. Tu nombre es 'Ana'.
TU OBJETIVO: Calificar al cliente obteniendo: Nombre, Presupuesto, Zona de interés y Tipo de propiedad.

REGLAS DE NEGOCIO:
1. NO inventes precios.
2. NO pidas el número de teléfono (ya lo tenemos por WhatsApp).
3. Si el cliente quiere que lo llamen a OTRO número, solo ahí regístralo.
4. Tu prioridad es cerrar la calificación para que un humano intervenga.
5. Sé breve y humana.

ESTADO ACTUAL DE DATOS:
{extracted_data}

Si ya tienes Nombre, Presupuesto y Zona, despídete diciendo: "Perfecto, le paso tu ficha a un agente para que te contacte a este WhatsApp."
"""
        template.system_prompt_base = new_prompt
        db.commit()
        print("Prompt actualizado correctamente.")
    else:
        print("No se encontro la plantilla.")

    db.close()


if __name__ == "__main__":
    update_real_estate_prompt()
