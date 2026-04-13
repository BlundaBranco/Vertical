from pydantic import BaseModel
from typing import Optional


class WhatsAppProfileUpdate(BaseModel):
    about: Optional[str] = None        # bio visible en WhatsApp, max 139 chars
    description: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None
    address: Optional[str] = None
    vertical: Optional[str] = None     # categoría del negocio (REAL_ESTATE, RETAIL, etc.)


class SettingsUpdate(BaseModel):
    business_name: str
    assistant_name: str
    agent_name: str
    tone: str
    specialty: str
    catalog_url: str
    knowledge_base: Optional[str] = None
    knowledge_base_url: Optional[str] = None
    whatsapp_phone: Optional[str] = None
    nationality: Optional[str] = "argentino"
    vertical: Optional[str] = None
    communication_style: Optional[str] = "estandar"
    calendar_url: Optional[str] = None
