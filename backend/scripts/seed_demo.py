"""
seed_demo.py — Limpia datos existentes e inserta leads de demo realistas.
NO dropea tablas (Railway sigue corriendo sin crashear).
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from datetime import datetime, timedelta
from app.db.database import SessionLocal
from app.db.base import Base
from app.db.database import engine
import app.models  # noqa
from app.models import VerticalTemplate, Tenant, Lead, Conversation
from verticals.real_estate_v1.prompts import REAL_ESTATE_PROMPT, SCHEMA_INMOBILIARIA

db = SessionLocal()

# ---------------------------------------------------------------------------
# 1. CREAR TABLAS SI NO EXISTEN (safe, no-op si ya existen)
# ---------------------------------------------------------------------------
Base.metadata.create_all(bind=engine)

# ---------------------------------------------------------------------------
# 2. LIMPIAR DATOS (sin dropear tablas)
# ---------------------------------------------------------------------------
print("Limpiando datos existentes...")
db.query(Conversation).delete()
db.query(Lead).delete()
db.query(Tenant).delete()
db.query(VerticalTemplate).delete()
db.commit()
print("Datos borrados.")

# ---------------------------------------------------------------------------
# 3. PLANTILLA
# ---------------------------------------------------------------------------
template = VerticalTemplate(
    name="real_estate_v1",
    assistant_name="Ana",
    system_prompt_base=REAL_ESTATE_PROMPT,
    required_fields_schema=SCHEMA_INMOBILIARIA
)
db.add(template)
db.commit()
db.refresh(template)
print("Plantilla creada.")

# ---------------------------------------------------------------------------
# 4. TENANT
# ---------------------------------------------------------------------------
PHONE_ID = os.getenv("WHATSAPP_PHONE_ID", "1008091949048703")

tenant = Tenant(
    name="Inmobiliaria Palermo & Asociados",
    phone_number_id=PHONE_ID,
    template_id=template.id,
    business_config={
        "agent_name": "Ana",
        "tone": "profesional y cercano",
        "specialty": "Venta de departamentos en CABA",
        "catalog_url": "",
        "knowledge_base": (
            "Disponemos de departamentos en Palermo, Belgrano y Recoleta. "
            "Precios desde USD 90.000 hasta USD 350.000. "
            "Aceptamos permutas y financiación bancaria. "
            "Contacto urgente: ventas@palermoyasociados.com.ar"
        ),
        "rules": "No revelar precios finales sin consultar con el asesor. Siempre pedir nombre y presupuesto."
    }
)
db.add(tenant)
db.commit()
db.refresh(tenant)
print(f"Tenant '{tenant.name}' creado (ID={tenant.id}).")

# ---------------------------------------------------------------------------
def ago(days=0, hours=0, minutes=0):
    return datetime.utcnow() - timedelta(days=days, hours=hours, minutes=minutes)

def add_conv(lead_id, messages):
    for role, content, ts in messages:
        db.add(Conversation(lead_id=lead_id, role=role, content=content, timestamp=ts))
    db.commit()

# ---------------------------------------------------------------------------
# 5. LEADS DE DEMO
# ---------------------------------------------------------------------------

# LEAD 1: QUALIFIED
lead1 = Lead(
    whatsapp_id="5491155223344",
    tenant_id=tenant.id,
    status="QUALIFIED",
    extracted_data={
        "nombre": "Martín García",
        "presupuesto": "USD 120.000",
        "zona": "Palermo",
        "tipo_propiedad": "departamento 2 ambientes",
        "motivo_rechazo": None
    },
    created_at=ago(days=2)
)
db.add(lead1)
db.commit()
db.refresh(lead1)
add_conv(lead1.id, [
    ("user",      "Hola, vi el anuncio de departamentos en Palermo", ago(days=2, hours=3)),
    ("assistant", "¡Hola! Soy Ana, asesora de Palermo & Asociados. Con gusto te ayudo. ¿Me decís tu nombre para poder atenderte mejor?", ago(days=2, hours=2, minutes=59)),
    ("user",      "Martín García", ago(days=2, hours=2, minutes=55)),
    ("assistant", "Mucho gusto, Martín. ¿Qué tipo de propiedad estás buscando y en qué zona?", ago(days=2, hours=2, minutes=54)),
    ("user",      "Busco un 2 ambientes en Palermo, para vivir con mi pareja", ago(days=2, hours=2, minutes=50)),
    ("assistant", "Perfecto, tenemos varias opciones en Palermo Hollywood y Palermo Soho. ¿Contás con un presupuesto estimado?", ago(days=2, hours=2, minutes=49)),
    ("user",      "Tenemos hasta unos USD 120.000 más o menos", ago(days=2, hours=2, minutes=44)),
    ("assistant", "Excelente, Martín. Con ese presupuesto tenemos opciones muy interesantes. Voy a pasar tus datos a uno de nuestros asesores para coordinar una visita. ¿Hay algún horario que te quede mejor?", ago(days=2, hours=2, minutes=43)),
    ("user",      "Cualquier tarde está bien, gracias", ago(days=2, hours=2, minutes=40)),
    ("assistant", "Anotado. Te va a contactar un asesor en las próximas horas. ¡Gracias por comunicarte con nosotros!", ago(days=2, hours=2, minutes=39)),
])
print("Lead 1: Martín García — QUALIFIED")

# LEAD 2: QUALIFYING
lead2 = Lead(
    whatsapp_id="5491166334455",
    tenant_id=tenant.id,
    status="QUALIFYING",
    extracted_data={
        "nombre": "Laura Méndez",
        "presupuesto": None,
        "zona": "Belgrano",
        "tipo_propiedad": "departamento 3 ambientes",
        "motivo_rechazo": None
    },
    created_at=ago(days=1)
)
db.add(lead2)
db.commit()
db.refresh(lead2)
add_conv(lead2.id, [
    ("user",      "Buenos días, quería consultar por departamentos", ago(days=1, hours=5)),
    ("assistant", "Buenos días. Soy Ana de Palermo & Asociados. ¿Me decís tu nombre para empezar?", ago(days=1, hours=4, minutes=59)),
    ("user",      "Laura Méndez", ago(days=1, hours=4, minutes=55)),
    ("assistant", "Hola Laura, ¿qué tipo de propiedad y en qué zona estás buscando?", ago(days=1, hours=4, minutes=54)),
    ("user",      "Un 3 ambientes en Belgrano, preferentemente cerca del colegio ORT", ago(days=1, hours=4, minutes=48)),
    ("assistant", "Perfecto. Tenemos unidades en esa zona. Para mostrarte las opciones más adecuadas, ¿podés contarme con qué presupuesto aproximado contás?", ago(days=1, hours=4, minutes=47)),
    ("user",      "Todavía lo estoy viendo, depende de las opciones que haya", ago(days=1, hours=4, minutes=40)),
    ("assistant", "Entiendo. Te cuento que nuestros 3 ambientes en Belgrano arrancan desde USD 140.000. ¿Se acerca a lo que estás pensando?", ago(days=1, hours=4, minutes=39)),
])
print("Lead 2: Laura Méndez — QUALIFYING")

# LEAD 3: LOST
lead3 = Lead(
    whatsapp_id="5491177445566",
    tenant_id=tenant.id,
    status="LOST",
    extracted_data={
        "nombre": "Roberto Sánchez",
        "presupuesto": "USD 45.000",
        "zona": "Recoleta",
        "tipo_propiedad": "departamento",
        "motivo_rechazo": "presupuesto_bajo"
    },
    created_at=ago(days=3)
)
db.add(lead3)
db.commit()
db.refresh(lead3)
add_conv(lead3.id, [
    ("user",      "Hola buenas, tienen departamentos en Recoleta?", ago(days=3, hours=6)),
    ("assistant", "Hola, soy Ana. Sí, trabajamos en Recoleta. ¿Me decís tu nombre?", ago(days=3, hours=5, minutes=59)),
    ("user",      "Roberto Sánchez", ago(days=3, hours=5, minutes=55)),
    ("assistant", "Mucho gusto Roberto. ¿Qué tipo de unidad buscás y cuál es tu presupuesto aproximado?", ago(days=3, hours=5, minutes=54)),
    ("user",      "Algo chico, tengo unos 45.000 dólares", ago(days=3, hours=5, minutes=50)),
    ("assistant", "Gracias Roberto. Lamentablemente nuestras unidades en Recoleta parten de USD 110.000, por lo que por ahora no tenemos opciones que se ajusten a ese presupuesto. Si en el futuro el contexto cambia, no dudes en escribirnos.", ago(days=3, hours=5, minutes=49)),
    ("user",      "Ok gracias igual", ago(days=3, hours=5, minutes=45)),
])
print("Lead 3: Roberto Sánchez — LOST")

# LEAD 4: HUMAN_HANDOFF
lead4 = Lead(
    whatsapp_id="5491188556677",
    tenant_id=tenant.id,
    status="HUMAN_HANDOFF",
    extracted_data={
        "nombre": "Daniela Torres",
        "presupuesto": "USD 200.000",
        "zona": "Palermo",
        "tipo_propiedad": "PH o departamento piso alto",
        "motivo_rechazo": None
    },
    created_at=ago(hours=5)
)
db.add(lead4)
db.commit()
db.refresh(lead4)
add_conv(lead4.id, [
    ("user",      "Hola, me interesa un PH en Palermo", ago(hours=5)),
    ("assistant", "Hola, soy Ana. Con gusto te asesoro. ¿Me decís tu nombre?", ago(hours=4, minutes=59)),
    ("user",      "Daniela Torres", ago(hours=4, minutes=55)),
    ("assistant", "Hola Daniela, ¿tenés alguna preferencia en cuanto a metraje, ambientes o piso?", ago(hours=4, minutes=54)),
    ("user",      "Quiero algo con terraza, mínimo 3 ambientes. Tengo 200.000 dólares", ago(hours=4, minutes=48)),
    ("assistant", "Perfecto. Con ese presupuesto y esas características tenemos opciones muy interesantes en Palermo Hollywood. ¿Querés que te pase fotos y coordinar una visita?", ago(hours=4, minutes=47)),
    ("user",      "Sí, y si podés mandarme el link de todos los que tienen disponibles sería ideal", ago(hours=4, minutes=40)),
    ("assistant", "Por supuesto. Voy a pasarte la info con nuestro catálogo completo.", ago(hours=4, minutes=39)),
    ("user",      "Hola Daniela, soy Carlos de Palermo & Asociados. Te mando el catálogo ahora mismo y coordinamos la visita para esta semana.", ago(hours=3, minutes=10)),
])
print("Lead 4: Daniela Torres — HUMAN_HANDOFF")

# ---------------------------------------------------------------------------
db.close()
print(f"\nSeed demo completo. Tenant ID={tenant.id}, 4 leads cargados.")
print("Abrí el dashboard — debería mostrar los leads ahora.")
