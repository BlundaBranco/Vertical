from pydantic import BaseModel
from typing import Optional


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
