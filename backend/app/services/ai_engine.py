import io
import os
import json
import importlib
from typing import Optional
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def _get_vertical_schema(template_name: str):
    try:
        module = importlib.import_module(f"verticals.{template_name}.schema")
        return module.ExtractionSchema
    except (ImportError, AttributeError):
        from verticals.real_estate_v1.schema import ExtractionSchema
        return ExtractionSchema


def _get_extraction_prompt(template_name: str) -> Optional[str]:
    try:
        module = importlib.import_module(f"verticals.{template_name}.prompts")
        return getattr(module, "EXTRACTION_PROMPT", None)
    except (ImportError, AttributeError):
        return None


def transcribe_audio(audio_bytes: bytes) -> Optional[str]:
    """Transcribe audio usando Whisper (OpenAI)."""
    try:
        audio_file = io.BytesIO(audio_bytes)
        audio_file.name = "audio.ogg"
        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            language="es"
        )
        return transcript.text
    except Exception as e:
        print(f"[ERROR] transcribe_audio: {e}")
        return None


def extract_information(lead_data_actual: dict, user_message: str, template_name: str = "real_estate_v1"):
    """
    PASE 1: El Analista.
    Extrae datos estructurados y detecta si la venta se cae.
    Carga el schema y prompt dinámicamente según el vertical del tenant.
    """
    ExtractionSchema = _get_vertical_schema(template_name)
    custom_prompt = _get_extraction_prompt(template_name)

    if custom_prompt:
        prompt_extractor = f"{custom_prompt}\n\nDatos que ya tenemos: {json.dumps(lead_data_actual)}"
    else:
        prompt_extractor = f"""
Eres un analista de datos. Tu única tarea es extraer información del mensaje del usuario.
Datos que ya tenemos: {json.dumps(lead_data_actual)}

Extrae si el usuario menciona: nombre, presupuesto, zona, tipo de propiedad.

Para motivo_rechazo — SOLO marcarlo si el usuario lo dice EXPLÍCITAMENTE:
- "presupuesto_bajo": el usuario dice que el precio le parece caro o que no le alcanza el dinero.
- "zona_no_cubierta": el usuario dice que necesita una zona específica y se le confirma que no se trabaja ahí.
- "ya_compro": el usuario dice que ya compró, ya alquiló, o ya resolvió el tema con otro.
- "desinteres": el usuario pide que no lo contacten más, dice que no le interesa, o indica claramente que no quiere continuar.

IMPORTANTE: NO deduzcas motivo_rechazo por tu cuenta. Solo ponlo si el usuario lo dijo textualmente.
Si no hay rechazo explícito, devuelve motivo_rechazo como null.
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
        # motivo_rechazo=None siempre se incluye para poder limpiar un valor previo incorrecto
        return {
            k: v for k, v in nuevos_datos.model_dump().items()
            if v is not None or k == "motivo_rechazo"
        }
    except Exception as e:
        print(f"[ERROR] Extraccion: {e}")
        return {}


def generate_response(tenant, lead, user_message: str, conversations=None):
    """
    PASE 2: El Conversador Dinámico.
    Construye el prompt basado en la configuración del cliente y responde.
    Para vertical_saas_v1 usa un prompt comercial especializado en convertir a reuniones.
    """
    config = tenant.business_config or {}
    template_name = tenant.template.name if tenant.template else ""

    business_name = tenant.name
    assistant_name = tenant.template.assistant_name or "Ana"
    nationality = config.get("nationality", "argentino")
    communication_style = config.get("communication_style", "estandar")

    if nationality == "español":
        nationality_rules = """
- Usas "tú", "tienes", "quieres", "puedes" (nunca "vos")
- Vocabulario peninsular natural: "vale", "claro", "perfecto" (con moderación)
- Hablas como una persona de España, sin exagerar regionalismos"""
    else:
        nationality_rules = """
- Usás "vos", "tenés", "querés", "podés" (nunca "tú"/"tienes")
- Vocabulario argentino natural: "dale", "bárbaro", "perfecto", "genial" (con moderación)
- Sin exagerar regionalismos — una persona normal, no un personaje"""

    if communication_style == "natural":
        style_rules = """
ESTILO DE COMUNICACIÓN — HUMANO:
- Escribís como una persona real, no como un asistente de IA
- Frases cortas cuando toca, largas cuando hace falta. Variá el ritmo.
- Lenguaje simple y directo. Sin jerga corporativa ni tecnicismos.
- PROHIBIDO: "¡", "¿", emojis, guiones largos (—), asteriscos, listas con puntos o números
- PROHIBIDO: "Claro que sí", "Por supuesto", "Entendido", "Genial", "Perfecto", "Excelente", "No dudes en contactarnos", "Estaré encantado/a", "Para poder ayudarte mejor"
- No empieces ningún mensaje con una frase de validación
- No resumas lo que el usuario acaba de decir
- Una sola pregunta por mensaje. Si tenés dos, elegí la más importante.
- No uses formato markdown — sin negritas, sin encabezados, sin guiones como listas
- Si no sabés algo, decilo. No inventes.
- Mensajes cortos: máximo 2-3 oraciones salvo que la situación lo requiera"""
    else:
        style_rules = """
ESTILO DE ESCRITURA — CRÍTICO:
- Escribís como una persona real mandando WhatsApps, no como un sistema automático
- Mensajes cortos: máximo 2-3 oraciones. Si podés decirlo en menos, mejor.
- PROHIBIDO usar "!" y "?" — nadie los usa en WhatsApp
- PROHIBIDO usar estas frases: "Claro que sí", "Por supuesto", "Entendido", "No dudes en contactarnos", "Estaré encantado/a", "Para poder ayudarte mejor", "En ese caso", "Sin problema"
- PROHIBIDO: listas con guiones, asteriscos, números, o cualquier formato markdown
- Una sola pregunta por mensaje. Nunca preguntes dos cosas a la vez.
- No repitas información que ya dijiste antes en la conversación
- No expliques todo — una persona real deja cosas implícitas
- No empieces el mensaje con el nombre del cliente si ya lo usaste recientemente
- Variá la longitud de los mensajes — no todos del mismo tamaño"""

    # ── Prompt especializado para ventas de Vertical AI ──────────────────────
    if template_name == "vertical_saas_v1":
        specialty = config.get("specialty", "empleados digitales especializados para PyMEs en WhatsApp")
        knowledge_base = config.get("knowledge_base", "")
        calendar_url = config.get("calendar_url", "")
        datos_extraidos = lead.extracted_data or {}
        nombre = datos_extraidos.get("nombre", "")
        rubro = datos_extraidos.get("rubro", "")

        product_info = ""
        if knowledge_base and knowledge_base.strip():
            product_info = f"\nINFORMACIÓN DEL PRODUCTO:\n{knowledge_base}\n"
        else:
            product_info = f"""
INFORMACIÓN DEL PRODUCTO:
{business_name} crea empleados digitales especializados que atienden por WhatsApp como si fueran una persona real del equipo.
Especialidad: {specialty}

Capacidades reales del bot:
- Responde en lenguaje natural, adaptado al rubro del cliente (inmobiliaria, clínica, concesionaria, etc.)
- Entiende y procesa mensajes de voz (audios de WhatsApp)
- Califica leads automáticamente — separa compradores reales de curiosos
- Avisa al dueño solo cuando hay una oportunidad real, con todos los datos del cliente
- Funciona 24/7 sin supervisión
- Se configura sin código ni técnicos — el cliente solo usa un panel web
- Integra con Google Sheets para sincronizar inventario o catálogo automáticamente
- Cada bot se entrena con el lenguaje y las reglas específicas de ese negocio
"""

        calendar_section = ""
        if calendar_url:
            calendar_section = f"\nLINK DE AGENDA PARA REUNIÓN: {calendar_url}\nCuando el prospecto acepte reunirse, dáselo directamente en el mensaje.\n"

        context_section = ""
        if nombre:
            context_section += f"Nombre del prospecto: {nombre}\n"
        if rubro:
            context_section += f"Rubro: {rubro}\n"

        calendar_note = "Al aceptar, compartí el link de agenda directamente." if calendar_url else ""
        context_block = f"CONTEXTO DEL PROSPECTO:\n{context_section}" if context_section else ""

        system_prompt = f"""Sos {assistant_name}, parte del equipo comercial de {business_name}.
Atendés consultas de empresas y emprendedores que llegan por WhatsApp.
{product_info}{calendar_section}
OBJETIVO PRINCIPAL: Convertir esta conversación en una reunión agendada.

ESTRATEGIA (seguirla en orden según el estado de la conversación):
1. Enganche — preguntá por su negocio. Entendé qué hacen, cuántos mensajes reciben, qué problema tienen con la atención al cliente.
2. Valor — una vez que entendés su problema, explicá cómo el bot lo resuelve específicamente para su rubro. Sé concreto, no genérico.
3. Demostración implícita — explicá las capacidades del bot de forma natural dentro de la conversación (no como lista). Por ejemplo: "de hecho el bot entiende audios, así que si un cliente te manda una nota de voz, lo procesa igual".
4. Objeciones — si preguntan el precio, decí que eso lo ven en la reunión; no revelar nunca precios ni rangos. Si dudan, preguntá qué los frena.
5. Cierre — proponé la reunión como el paso natural: "te muestro cómo quedaría para tu negocio puntual, te va bien esta semana?" {calendar_note}

RESTRICCIONES CRÍTICAS:
- NUNCA mencionar precios, costos, valores ni rangos de precio
- NO inventar funcionalidades que no estén en la información del producto
- NO desviarte del objetivo — cada mensaje debe avanzar hacia la reunión
- Si el prospecto dice que no le interesa o que ya resolvió el tema: cerrá amablemente y no insistás

{context_block}
{style_rules}
{nationality_rules}
"""

    # ── Prompt genérico para todos los demás verticales ──────────────────────
    else:
        agent_ref = config.get("agent_name", "nuestro equipo de especialistas")
        if agent_ref.lower() == "equipo":
            agent_ref = "nuestro equipo de especialistas"

        tone = config.get("tone", "cercano")
        if tone not in ("cercano", "formal", "empatico"):
            tone = "cercano"
        specialty = config.get("specialty", "compra, venta y alquiler de propiedades")
        catalog = config.get("catalog_url", "nuestro catálogo web")
        knowledge_base = config.get("knowledge_base", "")

        datos_extraidos = json.dumps(lead.extracted_data) if lead.extracted_data else "No tenemos datos aún."

        template = lead.tenant.template if lead.tenant else None
        required_fields = (
            template.required_fields_schema
            if template and template.required_fields_schema
            else ["nombre", "presupuesto", "zona"]
        )
        campos_objetivo = ", ".join(required_fields)

        kb_section = ""
        if knowledge_base and knowledge_base.strip():
            kb_section = f"""
BASE DE CONOCIMIENTO (INFORMACIÓN DE PROPIEDADES Y SERVICIOS):
{knowledge_base}

IMPORTANTE: Usá esta información para responder preguntas del cliente.
Si no encontrás información específica en la base de conocimiento, NO inventes datos. Decí que vas a consultar y que te ponés en contacto.
"""

        system_prompt = f"""Sos {assistant_name}, quien atiende consultas de {business_name} por WhatsApp.
Tu tono es {tone}.

CONTEXTO DEL NEGOCIO:
- Especialidad: {specialty}
- Catálogo: {catalog}
- Al cerrar la calificación, avisá que {agent_ref} los va a contactar.
{kb_section}
OBJETIVO:
Obtener de forma natural los siguientes datos del cliente: {campos_objetivo}.
Datos que ya tenés del lead: {datos_extraidos}

REGLAS:
1. Si el dato ya está en los datos del lead, NO lo volvás a pedir.
2. Si el cliente muestra rechazo claro o desinterés explícito: cerrá amablemente sin insistir.
3. No pidas teléfono — ya lo tenés por WhatsApp.
4. No inventes información. Solo usá la base de conocimiento.

{style_rules}
{nationality_rules}
"""

    print(f"Vertical AI generando respuesta para: {business_name} (Asistente: {assistant_name}, Template: {template_name}, Estilo: {communication_style})")

    # Construir historial de conversación (últimos 10 turnos)
    history = []
    if conversations:
        for conv in conversations[-10:]:
            role = "assistant" if conv.role == "assistant" else "user"
            history.append({"role": role, "content": conv.content})
    # El último mensaje del usuario ya está en el historial; evitar duplicarlo
    if not history or history[-1]["content"] != user_message:
        history.append({"role": "user", "content": user_message})

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system_prompt}] + history,
            temperature=0.75,
            max_tokens=300
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"[ERROR] Generacion de respuesta: {e}")
        return "Tuve un problema técnico. Te pido que me repitas lo último."
