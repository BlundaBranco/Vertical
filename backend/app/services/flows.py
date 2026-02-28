from app.services.notifications import send_email_notification


def check_lead_qualification(lead):
    """Analiza los datos extraídos y decide el estado: QUALIFIED o LOST."""
    datos = lead.extracted_data or {}

    # Un lead ya QUALIFIED no retrocede automáticamente — el operador decide manualmente
    if lead.status == "QUALIFIED":
        return "QUALIFIED"

    if datos.get("motivo_rechazo"):
        return "LOST"

    required_fields = ["nombre", "presupuesto", "zona"]
    if all(datos.get(field) for field in required_fields):
        return "QUALIFIED"

    return lead.status


def trigger_notification(tenant, lead):
    """Notifica al dueño del negocio cuando un lead queda QUALIFIED."""
    print(f"\n[NOTIFICACION PARA {tenant.name}]")
    print("[OK] NUEVO LEAD CALIFICADO!")
    print(f"Nombre: {lead.extracted_data.get('nombre')}")
    print(f"Zona: {lead.extracted_data.get('zona')}")
    print(f"Presupuesto: {lead.extracted_data.get('presupuesto')}")
    print(f"WhatsApp: {lead.whatsapp_id}")
    print("--------------------------------------------\n")
    send_email_notification(tenant, lead)
