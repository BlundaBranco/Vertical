import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")


def send_email_notification(tenant, lead):
    """Envía un email al dueño del negocio cuando un lead pasa a QUALIFIED."""
    if not all([NOTIFY_EMAIL, SMTP_USER, SMTP_PASS]):
        print("[NOTIF] Variables de email no configuradas — saltando envío.")
        return

    datos = lead.extracted_data or {}
    subject = f"[Ventra AI] Nuevo lead calificado — {tenant.name}"
    body = f"""Nuevo lead calificado para {tenant.name}

Nombre: {datos.get('nombre', 'N/A')}
WhatsApp: {lead.whatsapp_id}
Zona: {datos.get('zona', 'N/A')}
Presupuesto: {datos.get('presupuesto', 'N/A')}
Tipo de propiedad: {datos.get('tipo_propiedad', 'N/A')}
"""

    try:
        msg = MIMEText(body, "plain", "utf-8")
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = NOTIFY_EMAIL

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as smtp:
            smtp.starttls()
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.sendmail(SMTP_USER, NOTIFY_EMAIL, msg.as_string())

        print(f"[NOTIF] Email enviado a {NOTIFY_EMAIL}")
    except Exception as e:
        print(f"[NOTIF] Error enviando email: {e}")
