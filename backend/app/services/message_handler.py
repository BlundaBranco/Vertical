from sqlalchemy.orm import Session
from app.models import Conversation
from app.services import ai_engine, flows


def process_message(tenant, lead, user_message: str, db: Session):
    """Orquesta el doble pase de IA: extracción + calificación + respuesta."""
    db.add(Conversation(lead_id=lead.id, role="user", content=user_message))
    db.commit()

    # PASE 1: Extracción
    datos_existentes = lead.extracted_data if lead.extracted_data else {}
    nuevos_datos = ai_engine.extract_information(datos_existentes, user_message)

    if nuevos_datos:
        lead.extracted_data = datos_existentes | nuevos_datos
        db.commit()

    # Calificación
    nuevo_estado = flows.check_lead_qualification(lead)
    if nuevo_estado != lead.status:
        lead.status = nuevo_estado
        db.commit()
        if nuevo_estado == "QUALIFIED":
            flows.trigger_notification(tenant, lead)
        elif nuevo_estado == "LOST":
            print(f"[LEAD] Lead PERDIDO: {lead.extracted_data.get('motivo_rechazo')}")

    # PASE 2: Respuesta (con historial de conversación)
    conversations = db.query(Conversation).filter(
        Conversation.lead_id == lead.id
    ).order_by(Conversation.timestamp).all()
    ai_response_text = ai_engine.generate_response(tenant, lead, user_message, conversations)
    db.add(Conversation(lead_id=lead.id, role="assistant", content=ai_response_text))
    db.commit()

    return ai_response_text
