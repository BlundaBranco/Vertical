import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from app.db.database import SessionLocal
from app.models import VerticalTemplate, Tenant
from verticals.real_estate_v1.prompts import REAL_ESTATE_PROMPT, SCHEMA_INMOBILIARIA


BASE_CONFIG = {
    "agent_name": "Equipo",
    "tone": "cercano",
    "specialty": "Venta de departamentos",
    "catalog_url": ""
}

# Tenants a crear: (phone_number_id, nombre)
# WHATSAPP_PHONE_ID      = número +1 555 (bot principal / "Ventra AI demo")
# WHATSAPP_PHONE_ID_2    = número argentino (simula primer cliente)
TENANTS = [
    (os.getenv("WHATSAPP_PHONE_ID", "123456789"),  "Inmobiliaria Demo (Bot +1)"),
    (os.getenv("WHATSAPP_PHONE_ID_2", ""),         "Inmobiliaria Cliente AR"),
]


def seed_data():
    db = SessionLocal()

    # --- Plantilla ---
    existing_template = db.query(VerticalTemplate).filter_by(name="real_estate_v1").first()
    if not existing_template:
        print("Creando plantilla 'Inmobiliaria V1'...")
        template = VerticalTemplate(
            name="real_estate_v1",
            assistant_name="Ana",
            system_prompt_base=REAL_ESTATE_PROMPT,
            required_fields_schema=SCHEMA_INMOBILIARIA
        )
        db.add(template)
        db.commit()
        db.refresh(template)
        template_id = template.id
        print("  Plantilla creada.")
    else:
        template_id = existing_template.id
        print("  Plantilla ya existia.")

    # --- Tenants ---
    for phone_id, name in TENANTS:
        if not phone_id:
            continue
        existing = db.query(Tenant).filter_by(phone_number_id=phone_id).first()
        if existing:
            print(f"  Tenant '{name}' ya existia (phone_id={phone_id}).")
            continue
        tenant = Tenant(
            name=name,
            phone_number_id=phone_id,
            template_id=template_id,
            business_config=BASE_CONFIG.copy()
        )
        db.add(tenant)
        db.commit()
        print(f"  Tenant '{name}' creado (phone_id={phone_id}).")

    db.close()
    print("Seed completo.")


if __name__ == "__main__":
    seed_data()
