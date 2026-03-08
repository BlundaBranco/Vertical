import os
import requests
from typing import Optional
from dotenv import load_dotenv

load_dotenv(override=True)

META_TOKEN = os.getenv("WHATSAPP_TOKEN")
META_PHONE_ID = os.getenv("WHATSAPP_PHONE_ID")


def download_audio_bytes(media_id: str) -> Optional[bytes]:
    """Descarga el archivo de audio desde Meta y retorna los bytes."""
    if not META_TOKEN:
        print("[ERROR] No se encontró WHATSAPP_TOKEN en el .env")
        return None
    try:
        headers = {"Authorization": f"Bearer {META_TOKEN}"}
        r = requests.get(f"https://graph.facebook.com/v21.0/{media_id}", headers=headers)
        if r.status_code != 200:
            print(f"[ERROR] Meta media URL ({r.status_code}): {r.text}")
            return None
        media_url = r.json().get("url")
        if not media_url:
            return None
        r2 = requests.get(media_url, headers=headers)
        if r2.status_code != 200:
            print(f"[ERROR] Descarga audio ({r2.status_code})")
            return None
        return r2.content
    except Exception as e:
        print(f"[ERROR] download_audio_bytes: {e}")
        return None


def send_whatsapp_template(to_number: str, template_name: str, language: str, components: list, phone_number_id: str = None) -> Optional[dict]:
    """Envía un mensaje de template via WhatsApp Cloud API."""
    pid = phone_number_id or META_PHONE_ID
    if not META_TOKEN or not pid:
        print("[ERROR] No se encontraron WHATSAPP_TOKEN y/o WHATSAPP_PHONE_ID")
        return None
    try:
        clean_number = str(to_number).replace("whatsapp:", "").replace("+", "").replace(" ", "")
        url = f"https://graph.facebook.com/v21.0/{pid}/messages"
        data = {
            "messaging_product": "whatsapp",
            "to": clean_number,
            "type": "template",
            "template": {
                "name": template_name,
                "language": {"code": language},
                "components": components
            }
        }
        response = requests.post(url, headers={"Authorization": f"Bearer {META_TOKEN}", "Content-Type": "application/json"}, json=data)
        if response.status_code == 200:
            print(f"[OK] Template '{template_name}' enviado a {clean_number}")
            return response.json()
        else:
            print(f"[ERROR] Template Meta ({response.status_code}): {response.text}")
            return None
    except Exception as e:
        print(f"[ERROR] send_whatsapp_template: {e}")
        return None


def send_whatsapp_message(to_number: str, message_text: str, phone_number_id: str = None) -> Optional[dict]:
    """Envía mensaje usando Meta WhatsApp Cloud API."""
    pid = phone_number_id or META_PHONE_ID
    if not META_TOKEN or not pid:
        print("[ERROR] No se encontraron WHATSAPP_TOKEN y/o WHATSAPP_PHONE_ID")
        return None

    try:
        url = f"https://graph.facebook.com/v21.0/{pid}/messages"
        headers = {
            "Authorization": f"Bearer {META_TOKEN}",
            "Content-Type": "application/json"
        }
        clean_number = str(to_number).replace("whatsapp:", "").replace("+", "").replace(" ", "")
        data = {
            "messaging_product": "whatsapp",
            "to": clean_number,
            "type": "text",
            "text": {"body": message_text}
        }

        response = requests.post(url, headers=headers, json=data)

        if response.status_code == 200:
            print(f"[OK] Mensaje enviado via Meta a {clean_number}")
            return response.json()
        else:
            print(f"[ERROR] Meta ({response.status_code}): {response.text}")
            return None
    except Exception as e:
        print(f"[ERROR] send_whatsapp_message: {e}")
        return None
