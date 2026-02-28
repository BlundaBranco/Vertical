import os
import requests
from typing import Optional
from dotenv import load_dotenv

load_dotenv(override=True)

META_TOKEN = os.getenv("WHATSAPP_TOKEN")
META_PHONE_ID = os.getenv("WHATSAPP_PHONE_ID")


def send_whatsapp_message(to_number: str, message_text: str) -> Optional[dict]:
    """Envía mensaje usando Meta WhatsApp Cloud API."""
    if not META_TOKEN or not META_PHONE_ID:
        print("[ERROR] No se encontraron WHATSAPP_TOKEN y/o WHATSAPP_PHONE_ID en el .env")
        return None

    try:
        url = f"https://graph.facebook.com/v21.0/{META_PHONE_ID}/messages"
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
