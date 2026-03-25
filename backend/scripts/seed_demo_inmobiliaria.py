"""
seed_demo_inmobiliaria.py
Prepara el tenant 1 para una demo de inmobiliaria.

- NO toca tablas de auth (users) ni el phone_number_id del tenant
- Cambia el vertical a real_estate_v1 y el agente a "Ana"
- Limpia leads/conversaciones del tenant 1
- Carga leads de demo realistas con distintos estados

Uso:
    source venv/Scripts/activate
    cd backend
    python scripts/seed_demo_inmobiliaria.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.db_models import Tenant, Lead, Conversation, VerticalTemplate

db: Session = SessionLocal()

def ago(days=0, hours=0, minutes=0):
    return datetime.now(timezone.utc) - timedelta(days=days, hours=hours, minutes=minutes)

def add_conv(lead_id, messages):
    for role, content, ts in messages:
        db.add(Conversation(lead_id=lead_id, role=role, content=content, timestamp=ts))
    db.commit()

try:
    # ----------------------------------------------------------------
    # 1. Verificar tenant
    # ----------------------------------------------------------------
    tenant = db.query(Tenant).filter(Tenant.id == 1).first()
    if not tenant:
        print("[ERROR] Tenant 1 no encontrado.")
        sys.exit(1)
    print(f"[OK] Tenant encontrado: {tenant.name} (ID=1)")

    # ----------------------------------------------------------------
    # 2. Cambiar a vertical real_estate_v1
    # ----------------------------------------------------------------
    template = db.query(VerticalTemplate).filter(VerticalTemplate.name == "real_estate_v1").first()
    if not template:
        print("[ERROR] Vertical real_estate_v1 no existe. Correr init_db.py primero.")
        sys.exit(1)

    tenant.template_id = template.id
    tenant.name = "Inmobiliaria Del Valle"
    tenant.business_config = {
        "agent_name": "Ana",
        "tone": "cercano",
        "specialty": "compra, venta y alquiler de propiedades en CABA y GBA Norte",
        "catalog_url": "https://delvalleinmobiliaria.com.ar/propiedades",
        "knowledge_base": (
            "Trabajamos en Palermo, Belgrano, Recoleta, Núñez, Vicente López y San Isidro.\n"
            "Departamentos desde USD 85.000 (monoambiente) hasta USD 400.000 (PH/piso alto).\n"
            "Casas en GBA Norte desde USD 150.000.\n"
            "Aceptamos permutas. Trabajamos con todos los bancos para crédito hipotecario.\n"
            "Zonas en las que NO operamos: zona sur, La Matanza, Lomas de Zamora.\n"
            "Presupuesto mínimo para CABA: USD 75.000.\n"
            "Comisión: 3% comprador + 3% vendedor.\n"
            "Atención de lunes a sábado de 9 a 18hs."
        ),
        "rules": "No revelar precio final sin consultar con el asesor. Siempre obtener nombre, presupuesto y zona antes de mostrar opciones.",
        "nationality": "argentino",
        "communication_style": "estandar",
        "bot_active": True,
    }
    db.add(tenant)
    db.commit()
    print(f"[OK] Tenant actualizado: {tenant.name}, vertical: real_estate_v1, agente: Ana")

    # ----------------------------------------------------------------
    # 3. Limpiar leads y conversaciones anteriores
    # ----------------------------------------------------------------
    leads_existentes = db.query(Lead).filter(Lead.tenant_id == 1).all()
    for lead in leads_existentes:
        db.query(Conversation).filter(Conversation.lead_id == lead.id).delete()
    deleted = db.query(Lead).filter(Lead.tenant_id == 1).delete()
    db.commit()
    print(f"[OK] Eliminados {deleted} leads anteriores y sus conversaciones.")

    # ----------------------------------------------------------------
    # 4. LEADS DE DEMO
    # ----------------------------------------------------------------

    # --- LEAD 1: QUALIFIED — comprador activo ---
    l1 = Lead(
        whatsapp_id="5491155001122",
        tenant_id=1,
        status="QUALIFIED",
        extracted_data={
            "nombre": "Martín García",
            "presupuesto": "USD 130.000",
            "zona": "Palermo",
            "tipo_propiedad": "departamento 2 ambientes",
            "intencion": "Comprar",
        },
        created_at=ago(days=6),
    )
    db.add(l1); db.commit(); db.refresh(l1)
    add_conv(l1.id, [
        ("user",      "Hola, vi un anuncio de departamentos en Palermo", ago(days=6, hours=4)),
        ("assistant", "Hola. Soy Ana de Del Valle Inmobiliaria. ¿Me decís tu nombre para poder ayudarte mejor?", ago(days=6, hours=3, minutes=59)),
        ("user",      "Martín García", ago(days=6, hours=3, minutes=55)),
        ("assistant", "Buenas Martín. ¿Qué tipo de propiedad estás buscando y en qué zona?", ago(days=6, hours=3, minutes=54)),
        ("user",      "Un 2 ambientes en Palermo, para comprar. Tenemos hasta 130.000 dólares con mi pareja", ago(days=6, hours=3, minutes=48)),
        ("assistant", "Con ese presupuesto tenemos opciones muy buenas en Palermo Hollywood y Soho. Un asesor te va a contactar para mostrarte las unidades disponibles.", ago(days=6, hours=3, minutes=47)),
        ("user",      "Perfecto, gracias", ago(days=6, hours=3, minutes=42)),
    ])
    print("Lead 1: Martín García — QUALIFIED")

    # --- LEAD 2: QUALIFIED — familia buscando casa GBA ---
    l2 = Lead(
        whatsapp_id="5491166112233",
        tenant_id=1,
        status="QUALIFIED",
        extracted_data={
            "nombre": "Valeria Ríos",
            "presupuesto": "USD 210.000",
            "zona": "San Isidro",
            "tipo_propiedad": "casa 3 ambientes",
            "intencion": "Comprar",
        },
        created_at=ago(days=5),
    )
    db.add(l2); db.commit(); db.refresh(l2)
    add_conv(l2.id, [
        ("user",      "Buenos días, busco una casa en San Isidro", ago(days=5, hours=6)),
        ("assistant", "Buenos días. ¿Me decís tu nombre?", ago(days=5, hours=5, minutes=59)),
        ("user",      "Valeria Ríos", ago(days=5, hours=5, minutes=55)),
        ("assistant", "Hola Valeria. ¿Qué tipo de propiedad buscás y con cuánto presupuesto contás?", ago(days=5, hours=5, minutes=54)),
        ("user",      "Una casa de al menos 3 ambientes, zona San Isidro o Vicente López. Tenemos hasta 210 mil dólares", ago(days=5, hours=5, minutes=46)),
        ("assistant", "Perfecto, trabajamos en esa zona y tenemos opciones dentro de ese rango. Te paso con uno de nuestros asesores para armar una selección.", ago(days=5, hours=5, minutes=45)),
        ("user",      "Genial, esperamos el contacto", ago(days=5, hours=5, minutes=40)),
    ])
    print("Lead 2: Valeria Ríos — QUALIFIED")

    # --- LEAD 3: QUALIFIED — inversor departamento ---
    l3 = Lead(
        whatsapp_id="5491177223344",
        tenant_id=1,
        status="QUALIFIED",
        extracted_data={
            "nombre": "Diego Navarro",
            "presupuesto": "USD 95.000",
            "zona": "Belgrano",
            "tipo_propiedad": "monoambiente o 1 ambiente",
            "intencion": "Comprar",
        },
        created_at=ago(days=4),
    )
    db.add(l3); db.commit(); db.refresh(l3)
    add_conv(l3.id, [
        ("user",      "Hola buenas tardes", ago(days=4, hours=7)),
        ("assistant", "Buenas tardes. ¿En qué te puedo ayudar?", ago(days=4, hours=6, minutes=59)),
        ("user",      "Quiero invertir en un departamento para alquilar. Busco algo en Belgrano o Núñez", ago(days=4, hours=6, minutes=55)),
        ("assistant", "Buena zona para inversión. ¿Me decís tu nombre y con qué presupuesto contás?", ago(days=4, hours=6, minutes=54)),
        ("user",      "Diego Navarro, tengo unos 95 mil dólares", ago(days=4, hours=6, minutes=48)),
        ("assistant", "Con ese presupuesto podés entrar bien en un monoambiente o 1 ambiente en Belgrano, con buena renta. Un asesor te contacta para ver las opciones.", ago(days=4, hours=6, minutes=47)),
    ])
    print("Lead 3: Diego Navarro — QUALIFIED")

    # --- LEAD 4: QUALIFIED — reubicación laboral ---
    l4 = Lead(
        whatsapp_id="5491188334455",
        tenant_id=1,
        status="QUALIFIED",
        extracted_data={
            "nombre": "Florencia Méndez",
            "presupuesto": "USD 165.000",
            "zona": "Recoleta",
            "tipo_propiedad": "departamento 3 ambientes",
            "intencion": "Comprar",
        },
        created_at=ago(days=3),
    )
    db.add(l4); db.commit(); db.refresh(l4)
    add_conv(l4.id, [
        ("user",      "Hola, me mudé por trabajo y estoy buscando departamento en Recoleta", ago(days=3, hours=5)),
        ("assistant", "Hola, ¿me decís tu nombre?", ago(days=3, hours=4, minutes=59)),
        ("user",      "Florencia Méndez", ago(days=3, hours=4, minutes=55)),
        ("assistant", "Hola Florencia. ¿Qué tipo de departamento buscás y cuál es tu presupuesto?", ago(days=3, hours=4, minutes=54)),
        ("user",      "Busco 3 ambientes, tengo 165 mil dólares. Quiero Recoleta o Barrio Norte", ago(days=3, hours=4, minutes=46)),
        ("assistant", "Tenemos buenas opciones en esa zona y presupuesto. Te paso con un asesor para coordinar visitas.", ago(days=3, hours=4, minutes=45)),
        ("user",      "Ok perfecto", ago(days=3, hours=4, minutes=40)),
    ])
    print("Lead 4: Florencia Méndez — QUALIFIED")

    # --- LEAD 5: QUALIFYING — todavía sin presupuesto ---
    l5 = Lead(
        whatsapp_id="5491199445566",
        tenant_id=1,
        status="QUALIFYING",
        extracted_data={
            "nombre": "Lucas Pereyra",
            "zona": "Palermo",
            "tipo_propiedad": "departamento 2 o 3 ambientes",
            "intencion": "Comprar",
        },
        created_at=ago(days=2),
    )
    db.add(l5); db.commit(); db.refresh(l5)
    add_conv(l5.id, [
        ("user",      "Hola, busco departamento en Palermo para comprar", ago(days=2, hours=3)),
        ("assistant", "Hola. ¿Cómo te llamás?", ago(days=2, hours=2, minutes=59)),
        ("user",      "Lucas Pereyra", ago(days=2, hours=2, minutes=55)),
        ("assistant", "Hola Lucas. ¿Qué tipo de unidad y cuántos ambientes buscás?", ago(days=2, hours=2, minutes=54)),
        ("user",      "2 o 3 ambientes, zona Palermo Soho o Hollywood si puede ser", ago(days=2, hours=2, minutes=48)),
        ("assistant", "Bien ubicado. ¿Con qué presupuesto contás aproximadamente?", ago(days=2, hours=2, minutes=47)),
        ("user",      "Todavía lo estoy calculando, en unos días te digo", ago(days=2, hours=2, minutes=40)),
        ("assistant", "Sin problema. Cuando tengas el número, avisame y te armo una selección.", ago(days=2, hours=2, minutes=39)),
    ])
    print("Lead 5: Lucas Pereyra — QUALIFYING")

    # --- LEAD 6: QUALIFYING — consulta reciente ---
    l6 = Lead(
        whatsapp_id="5491100556677",
        tenant_id=1,
        status="QUALIFYING",
        extracted_data={
            "nombre": "Camila Ortiz",
            "zona": "Vicente López",
            "intencion": "Alquilar",
        },
        created_at=ago(hours=18),
    )
    db.add(l6); db.commit(); db.refresh(l6)
    add_conv(l6.id, [
        ("user",      "Buen día, quiero alquilar en Vicente López", ago(hours=18)),
        ("assistant", "Buen día. ¿Me decís tu nombre?", ago(hours=17, minutes=59)),
        ("user",      "Camila Ortiz", ago(hours=17, minutes=55)),
        ("assistant", "Hola Camila. ¿Qué tipo de propiedad buscás y cuánto es tu presupuesto mensual?", ago(hours=17, minutes=54)),
        ("user",      "Un departamento de 2 ambientes. Todavía no sé bien el precio, depende de la zona exacta", ago(hours=17, minutes=48)),
        ("assistant", "Te entiendo. En Vicente López nuestros alquileres de 2 ambientes rondan entre $350.000 y $500.000 por mes. ¿Se acerca a lo que tenés pensado?", ago(hours=17, minutes=47)),
    ])
    print("Lead 6: Camila Ortiz — QUALIFYING")

    # --- LEAD 7: QUALIFYING — llegó hace poco ---
    l7 = Lead(
        whatsapp_id="5491111667788",
        tenant_id=1,
        status="QUALIFYING",
        extracted_data={
            "nombre": "Sebastián Cruz",
        },
        created_at=ago(hours=4),
    )
    db.add(l7); db.commit(); db.refresh(l7)
    add_conv(l7.id, [
        ("user",      "Hola buenas tardes, me pasaron el contacto", ago(hours=4)),
        ("assistant", "Buenas tardes. ¿Cómo te llamás?", ago(hours=3, minutes=59)),
        ("user",      "Sebastián Cruz", ago(hours=3, minutes=55)),
        ("assistant", "Hola Sebastián. ¿Qué tipo de propiedad estás buscando y en qué zona?", ago(hours=3, minutes=54)),
        ("user",      "Todavía estoy explorando, quería ver qué tienen", ago(hours=3, minutes=48)),
        ("assistant", "Dale. Trabajamos en Palermo, Belgrano, Recoleta, Núñez y GBA Norte. ¿Querés comprar o alquilar?", ago(hours=3, minutes=47)),
    ])
    print("Lead 7: Sebastián Cruz — QUALIFYING")

    # --- LEAD 8: LOST — presupuesto bajo ---
    l8 = Lead(
        whatsapp_id="5491122778899",
        tenant_id=1,
        status="LOST",
        extracted_data={
            "nombre": "Roberto Fernández",
            "presupuesto": "USD 40.000",
            "zona": "Recoleta",
            "tipo_propiedad": "departamento",
            "motivo_rechazo": "presupuesto_bajo",
        },
        created_at=ago(days=7),
    )
    db.add(l8); db.commit(); db.refresh(l8)
    add_conv(l8.id, [
        ("user",      "Hola, tienen algo en Recoleta por unos 40 mil dólares?", ago(days=7, hours=5)),
        ("assistant", "Hola. ¿Me decís tu nombre?", ago(days=7, hours=4, minutes=59)),
        ("user",      "Roberto Fernández", ago(days=7, hours=4, minutes=55)),
        ("assistant", "Hola Roberto. Lamentablemente nuestras unidades en Recoleta parten de USD 85.000. Con ese presupuesto no tenemos opciones en esa zona por ahora.", ago(days=7, hours=4, minutes=54)),
        ("user",      "Ah ok, demasiado caro para lo que tengo", ago(days=7, hours=4, minutes=48)),
        ("assistant", "Entiendo. Si en algún momento el presupuesto cambia, con gusto te ayudamos. Quedamos a disposición.", ago(days=7, hours=4, minutes=47)),
    ])
    print("Lead 8: Roberto Fernández — LOST (presupuesto_bajo)")

    # --- LEAD 9: LOST — zona no cubierta ---
    l9 = Lead(
        whatsapp_id="5491133889900",
        tenant_id=1,
        status="LOST",
        extracted_data={
            "nombre": "Patricia Gómez",
            "presupuesto": "USD 120.000",
            "zona": "Lomas de Zamora",
            "tipo_propiedad": "casa",
            "motivo_rechazo": "zona_no_cubierta",
        },
        created_at=ago(days=5),
    )
    db.add(l9); db.commit(); db.refresh(l9)
    add_conv(l9.id, [
        ("user",      "Buenas, busco casa en Lomas de Zamora", ago(days=5, hours=8)),
        ("assistant", "Hola. ¿Cómo te llamás?", ago(days=5, hours=7, minutes=59)),
        ("user",      "Patricia Gómez", ago(days=5, hours=7, minutes=55)),
        ("assistant", "Hola Patricia. ¿Cuánto presupuesto tenés y qué tipo de propiedad buscás?", ago(days=5, hours=7, minutes=54)),
        ("user",      "Busco una casa, tengo 120 mil dólares", ago(days=5, hours=7, minutes=48)),
        ("assistant", "Gracias Patricia. Lamentablemente no operamos en zona sur. Trabajamos en Palermo, Belgrano, Recoleta y GBA Norte. Si en algún momento buscás en esas zonas, con gusto te asesoramos.", ago(days=5, hours=7, minutes=47)),
        ("user",      "Ah no, necesito Lomas sí o sí. Gracias igual", ago(days=5, hours=7, minutes=40)),
    ])
    print("Lead 9: Patricia Gómez — LOST (zona_no_cubierta)")

    # --- LEAD 10: LOST — ya compró ---
    l10 = Lead(
        whatsapp_id="5491144990011",
        tenant_id=1,
        status="LOST",
        extracted_data={
            "nombre": "Carlos Ibáñez",
            "presupuesto": "USD 150.000",
            "zona": "Palermo",
            "tipo_propiedad": "departamento 3 ambientes",
            "motivo_rechazo": "ya_compro",
        },
        created_at=ago(days=8),
    )
    db.add(l10); db.commit(); db.refresh(l10)
    add_conv(l10.id, [
        ("user",      "Hola, estaba buscando departamento pero ya compré con otra inmobiliaria", ago(days=8, hours=3)),
        ("assistant", "Hola. ¿Cómo te llamás?", ago(days=8, hours=2, minutes=59)),
        ("user",      "Carlos Ibáñez", ago(days=8, hours=2, minutes=55)),
        ("assistant", "Hola Carlos. Felicitaciones por la compra. Si en el futuro necesitás asesoramiento o conocés a alguien que busque propiedades, acá estamos.", ago(days=8, hours=2, minutes=54)),
        ("user",      "Muchas gracias", ago(days=8, hours=2, minutes=50)),
    ])
    print("Lead 10: Carlos Ibáñez — LOST (ya_compro)")

    # ----------------------------------------------------------------
    print()
    print("=" * 55)
    print("DEMO LISTA")
    print(f"  Tenant:    {tenant.name}")
    print(f"  Agente:    Ana (real_estate_v1)")
    print(f"  Leads:     10 total")
    print(f"  QUALIFIED: 4 (40% conversión)")
    print(f"  QUALIFYING: 3")
    print(f"  LOST:      3")
    print()
    print("  Login: contacto@somosvertical.ar / Papaleta004!")
    print("=" * 55)

except Exception as e:
    db.rollback()
    print(f"[ERROR] {e}")
    raise
finally:
    db.close()
