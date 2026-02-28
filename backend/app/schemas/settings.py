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
