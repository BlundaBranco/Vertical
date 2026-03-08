"""
Vincula el usuario de Google (brancoadrianblunda@gmail.com) con el número
de prueba de WhatsApp y carga datos de prueba en su tenant.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from datetime import datetime, timezone, timedelta
from app.db.database import SessionLocal
from app.models.db_models import User, Tenant, Lead, Conversation

EMAIL = "brancoadrianblunda@gmail.com"
PHONE_NUMBER_ID = "990134687517618"
WABA_ID = "1630587688290504"

db = SessionLocal()

user = db.query(User).filter(User.email == EMAIL).first()
if not user:
    print(f"[ERROR] Usuario {EMAIL} no encontrado. ¿Ya inició sesión con Google?")
    db.close()
    sys.exit(1)

print(f"[OK] Usuario encontrado: id={user.id}, tenant_id={user.tenant_id}")

tenant = db.query(Tenant).filter(Tenant.id == user.tenant_id).first()
if not tenant:
    print("[ERROR] Tenant no encontrado")
    db.close()
    sys.exit(1)

# Vincular número de WhatsApp
tenant.phone_number_id = PHONE_NUMBER_ID
config = tenant.business_config or {}
config.update({
    "waba_id": WABA_ID,
    "agent_name": "Ana",
    "tone": "profesional",
    "specialty": "Inmobiliaria",
    "knowledge_base": "Propiedades en venta:\n- Depto 2 amb en Palermo $120.000 USD\n- Casa 3 amb en Belgrano $280.000 USD\n- PH 3 amb en Villa Urquiza $195.000 USD\n\nZonas: Palermo, Belgrano, Villa Urquiza, Recoleta.",
    "rules": "Siempre saludar por el nombre. No dar precios sin antes conocer el presupuesto.",
})
tenant.business_config = config
db.add(tenant)
db.flush()

# Limpiar leads viejos de este tenant
db.query(Conversation).filter(
    Conversation.lead_id.in_(
        db.query(Lead.id).filter(Lead.tenant_id == tenant.id)
    )
).delete(synchronize_session=False)
db.query(Lead).filter(Lead.tenant_id == tenant.id).delete()

now = datetime.now(timezone.utc)

leads_data = [
    {
        "whatsapp_id": "5491134567890",
        "status": "QUALIFIED",
        "extracted_data": {"nombre": "Martín Sosa", "presupuesto": "$150.000 USD", "zona": "Palermo", "tipo_propiedad": "departamento"},
        "messages": [
            ("user", "Hola! Vi que tienen deptos en Palermo", -120),
            ("assistant", "¡Hola! Soy Ana. Sí, tenemos opciones en Palermo. ¿Qué presupuesto manejás?", -119),
            ("user", "Tengo hasta 150.000 dolares", -118),
            ("assistant", "Perfecto, tenemos un depto de 2 ambientes en Palermo justo en ese rango. ¿Buscás para vivir o invertir?", -117),
            ("user", "Para vivir, somos dos personas", -116),
            ("assistant", "Ideal. ¿Podemos coordinar una visita esta semana?", -115),
            ("user", "Si, el jueves estaría bien", -114),
        ]
    },
    {
        "whatsapp_id": "5491198765432",
        "status": "QUALIFYING",
        "extracted_data": {"nombre": "Laura Gómez", "zona": "Belgrano"},
        "messages": [
            ("user", "Buenos días, busco algo en Belgrano", -60),
            ("assistant", "Hola Laura! Tenemos buenas opciones en Belgrano. ¿Qué tipo de propiedad buscás?", -59),
            ("user", "Una casa, somos familia con 2 chicos", -58),
            ("assistant", "Entendido. ¿Cuál es tu presupuesto aproximado?", -57),
        ]
    },
    {
        "whatsapp_id": "5491145678901",
        "status": "LOST",
        "extracted_data": {"nombre": "Carlos Ruiz", "motivo_rechazo": "presupuesto_bajo", "presupuesto": "$60.000 USD"},
        "messages": [
            ("user", "Hola quiero comprar en Recoleta", -180),
            ("assistant", "Hola Carlos! Recoleta es una zona premium. ¿Qué presupuesto tenés?", -179),
            ("user", "60 mil dolares", -178),
            ("assistant", "Entiendo. Con ese presupuesto Recoleta sería difícil, pero puedo mostrarte opciones en zonas cercanas como Villa Urquiza. ¿Te interesa?", -177),
            ("user", "No gracias, solo me interesa Recoleta", -176),
        ]
    },
    {
        "whatsapp_id": "5491167890123",
        "status": "NEW",
        "extracted_data": {},
        "messages": [
            ("user", "Hola buenas tardes", -5),
        ]
    },
]

for ld in leads_data:
    lead = Lead(
        whatsapp_id=ld["whatsapp_id"],
        tenant_id=tenant.id,
        status=ld["status"],
        extracted_data=ld["extracted_data"],
        created_at=now + timedelta(minutes=ld["messages"][0][2])
    )
    db.add(lead)
    db.flush()

    for role, content, delta in ld["messages"]:
        conv = Conversation(
            lead_id=lead.id,
            role=role,
            content=content,
            timestamp=now + timedelta(minutes=delta)
        )
        db.add(conv)

db.commit()
print(f"[OK] Tenant {tenant.id} configurado con WhatsApp {PHONE_NUMBER_ID}")
print(f"[OK] {len(leads_data)} leads de prueba creados")
print("Listo. Recargá el dashboard.")
db.close()
