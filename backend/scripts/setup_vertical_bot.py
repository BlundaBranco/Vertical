"""
Configura el Tenant 1 como el bot vendedor oficial de Vertical AI.
Uso: python scripts/setup_vertical_bot.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from sqlalchemy.orm import attributes
from app.db.database import SessionLocal
from app.models.db_models import Tenant, VerticalTemplate

db = SessionLocal()

tenant = db.query(Tenant).filter(Tenant.id == 1).first()
if not tenant:
    print("[ERROR] Tenant 1 no encontrado.")
    db.close()
    sys.exit(1)

template = db.query(VerticalTemplate).filter(VerticalTemplate.name == "general_v1").first()
if not template:
    print("[ERROR] Vertical general_v1 no existe. Corré add_general_vertical.py primero.")
    db.close()
    sys.exit(1)

tenant.template_id = template.id

config = dict(tenant.business_config or {})
config.update({
    "agent_name": "Verty",
    "specialty": "Ventas y Calificación de Leads para Vertical AI",
    "tone": "Profesional, directo, tecnológico pero empático y muy argentino",
    "knowledge_base": (
        "Vertical AI es un servicio de Empleados Digitales con Inteligencia Artificial para WhatsApp. "
        "Apuntamos a PyMEs argentinas. No cobramos por chat, vendemos calificación de leads sin que el cliente "
        "tenga que configurar nada. Tenemos dos planes: Plan Digital a 350.000 ARS/mes (solo el bot) y "
        "Plan Digital + Marketing a 700.000 ARS/mes (bot + campañas). Hay una promo al 50% por lanzamiento "
        "válida hasta el 30 de abril (175k y 350k respectivamente). El objetivo del bot es averiguar de qué "
        "trata el negocio del cliente, cuántos mensajes de WhatsApp reciben por día, y si están listos para "
        "avanzar, derivarlos a un humano o invitarlos a suscribirse."
    ),
    "communication_style": "Natural",
    "nationality": "Argentina",
})
tenant.business_config = config
attributes.flag_modified(tenant, "business_config")

db.commit()
db.close()

print("[OK] Tenant 1 actualizado:")
print(f"     template  → general_v1 (id={template.id})")
print(f"     agent_name → {config['agent_name']}")
print(f"     tone       → {config['tone']}")
print(f"     comm_style → {config['communication_style']}")
print(f"     nationality→ {config['nationality']}")
