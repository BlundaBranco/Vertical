import os
import json
from openai import OpenAI
from dotenv import load_dotenv

from verticals.real_estate_v1.schema import ExtractionSchema

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def extract_information(lead_data_actual: dict, user_message: str):
    """
    PASE 1: El Analista.
    Extrae datos estructurados y detecta si la venta se cae.
    """
    prompt_extractor = f"""
    Eres un analista de datos experto en Real Estate. Tu única tarea es extraer información del mensaje del usuario.
    Datos que ya tenemos: {json.dumps(lead_data_actual)}

    Instrucciones para extracción:
    - Si el usuario menciona un dato nuevo, extráelo.
    - Si el usuario corrige un dato existente, actualízalo.

    Instrucciones para 'motivo_rechazo':
    - Si el usuario dice que es muy caro -> "presupuesto_bajo"
    - Si busca en una zona que no trabajamos -> "zona_no_cubierta"
    - Si ya compró/alquiló con otro -> "ya_compro"
    - Si muestra desinterés explícito o pide no molestar -> "desinteres"

    Mantén el formato JSON limpio.
    """

    try:
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": prompt_extractor},
                {"role": "user", "content": user_message},
            ],
            response_format=ExtractionSchema,
        )
        nuevos_datos = completion.choices[0].message.parsed
        return {k: v for k, v in nuevos_datos.model_dump().items() if v is not None}
    except Exception as e:
        print(f"[ERROR] Extraccion: {e}")
        return {}


def generate_response(tenant, lead, user_message: str):
    """
    PASE 2: El Conversador Dinámico.
    Construye el prompt basado en la configuración del cliente y responde.
    """
    config = tenant.business_config or {}

    business_name = tenant.name
    assistant_name = tenant.template.assistant_name or "Ana"

    agent_ref = config.get("agent_name", "nuestro equipo de especialistas")
    if agent_ref.lower() == "equipo":
        agent_ref = "nuestro equipo de especialistas"

    tone = config.get("tone", "cercano")
    specialty = config.get("specialty", "compra, venta y alquiler de propiedades")
    rules = config.get("rules", "atender cordialmente todas las consultas")
    catalog = config.get("catalog_url", "nuestro catálogo web")
    knowledge_base = config.get("knowledge_base", "")

    datos_extraidos = json.dumps(lead.extracted_data) if lead.extracted_data else "No tenemos datos aún."

    kb_section = ""
    if knowledge_base and knowledge_base.strip():
        kb_section = f"""
    BASE DE CONOCIMIENTO (INFORMACIÓN DE PROPIEDADES Y SERVICIOS):
    {knowledge_base}

    IMPORTANTE: Usa esta información para responder preguntas sobre propiedades, precios, características y disponibilidad.
    Si no encuentras información específica en la base de conocimiento, NO inventes datos. Di que consultarás y te pondrás en contacto.
    """

    system_prompt = f"""
    Eres {assistant_name}, la asistente virtual inteligente de {business_name}.
    Tu personalidad es {tone}. Tu objetivo es calificar al cliente de forma natural.

    CONTEXTO DEL NEGOCIO:
    - Especialidad: {specialty}.
    - Regla de Oro: {rules}.
    - Si preguntan por catálogo, diles que pueden verlo en: {catalog}.
    - Al finalizar la calificación, menciona que {agent_ref} los contactará.
    {kb_section}
    OBJETIVO DE CALIFICACIÓN:
    Debes obtener: Nombre, Presupuesto, Zona y Tipo de propiedad.
    Datos actuales del lead: {datos_extraidos}

    REGLAS DE COMPORTAMIENTO:
    1. Si el dato ya está en 'Datos actuales', NO lo vuelvas a preguntar.
    2. Si detectas un RECHAZO (ej: presupuesto muy bajo o zona que no cubren), sé amable, agradece y cierra la charla profesionalmente sin insistir.
    3. No pidas el teléfono (ya lo tienes por WhatsApp), a menos que pidan ser llamados a otro número.
    4. No inventes precios ni disponibilidad específica. Usa SOLO la información de la base de conocimiento si está disponible.
    5. Sé breve (máximo 2-3 oraciones). No uses emojis, ni abuses de signos de exclamación "¡" o interrogación "¿".
    6. NO DEBES HABLAR COMO UNA INTELIGENCIA ARTIFICIAL. DEBES HABLAR DE FORMA HUMANA, PROFESIONAL, CERCANA, NATURAL, DIRECTA Y RESUMIDA.
    """

    print(f"Ventra AI generando respuesta para: {business_name} (Asistente: {assistant_name})")

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=200
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"[ERROR] Generacion de respuesta: {e}")
        return "Disculpa, estoy teniendo un problema técnico. ¿Podrías repetirme lo último?"
