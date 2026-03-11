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


def generate_response(tenant, lead, user_message: str, conversations=None):
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
    if tone not in ("cercano", "formal", "empatico"):
        tone = "cercano"
    specialty = config.get("specialty", "compra, venta y alquiler de propiedades")
    rules = config.get("rules", "atender cordialmente todas las consultas")
    catalog = config.get("catalog_url", "nuestro catálogo web")
    knowledge_base = config.get("knowledge_base", "")
    nationality = config.get("nationality", "argentino")

    datos_extraidos = json.dumps(lead.extracted_data) if lead.extracted_data else "No tenemos datos aún."

    kb_section = ""
    if knowledge_base and knowledge_base.strip():
        kb_section = f"""
BASE DE CONOCIMIENTO (INFORMACIÓN DE PROPIEDADES Y SERVICIOS):
{knowledge_base}

IMPORTANTE: Usá esta información para responder preguntas sobre propiedades, precios, características y disponibilidad.
Si no encontrás información específica en la base de conocimiento, NO inventes datos. Decí que vas a consultar y que te ponés en contacto.
"""

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

    system_prompt = f"""Sos {assistant_name}, quien atiende consultas de {business_name} por WhatsApp.
Tu tono es {tone}.

CONTEXTO DEL NEGOCIO:
- Especialidad: {specialty}
- Regla de oro: {rules}
- Catálogo: {catalog}
- Al cerrar la calificación, avisá que {agent_ref} los va a contactar.
{kb_section}
OBJETIVO:
Obtener de forma natural: nombre, presupuesto, zona y tipo de propiedad.
Datos que ya tenés del lead: {datos_extraidos}

REGLAS:
1. Si el dato ya está en los datos del lead, NO lo volvás a pedir.
2. Si detectás rechazo claro (presupuesto bajo, zona no cubierta, ya compró, desinterés): cerrá amablemente sin insistir.
3. No pidas teléfono — ya lo tenés por WhatsApp.
4. No inventes precios ni disponibilidad. Solo usá la base de conocimiento.

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
- Variá la longitud de los mensajes — no todos del mismo tamaño
{nationality_rules}
"""

    print(f"Ventra AI generando respuesta para: {business_name} (Asistente: {assistant_name}, Tono: {tone}, Nacionalidad: {nationality})")

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
