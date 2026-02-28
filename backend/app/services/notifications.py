import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
DASHBOARD_URL = os.getenv("DASHBOARD_URL", "https://somosvertical.ar/dashboard")


def send_email_notification(tenant, lead):
    """Envía un email al dueño del negocio cuando un lead pasa a QUALIFIED."""
    if not all([NOTIFY_EMAIL, SMTP_USER, SMTP_PASS]):
        print("[NOTIF] Variables de email no configuradas — saltando envío.")
        return

    datos = lead.extracted_data or {}
    nombre = datos.get("nombre", "Sin nombre")
    clean_number = str(lead.whatsapp_id).replace("whatsapp:", "").replace("+", "").replace(" ", "")
    wa_link = f"https://wa.me/{clean_number}"

    subject = f"[Ventra AI] Lead calificado: {nombre} — {tenant.name}"

    # Construir sección de datos de forma genérica — funciona para cualquier vertical
    CAMPOS_IGNORAR = {"motivo_rechazo"}
    datos_lines = "\n".join(
        f"{k.replace('_', ' ').capitalize():<16}{v}"
        for k, v in datos.items()
        if k not in CAMPOS_IGNORAR and v
    ) or "Sin datos extraídos."

    body = f"""Nuevo lead calificado para {tenant.name}

DATOS DEL LEAD
--------------
{datos_lines}
WhatsApp:       +{clean_number}

ACCIONES
--------
Abrir chat en WhatsApp:  {wa_link}
Ver en dashboard:        {DASHBOARD_URL}

---
Ventra AI — Sistema de Agentes IA para WhatsApp
"""

    try:
        msg = MIMEMultipart()
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = NOTIFY_EMAIL
        msg.attach(MIMEText(body, "plain", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
            smtp.starttls()
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.sendmail(SMTP_USER, NOTIFY_EMAIL, msg.as_string())

        print(f"[NOTIF] Email enviado a {NOTIFY_EMAIL} — Lead: {nombre}")
    except Exception as e:
        print(f"[NOTIF] Error enviando email: {e}")
