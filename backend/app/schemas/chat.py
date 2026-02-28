from pydantic import BaseModel


class MessageInput(BaseModel):
    tenant_id: int
    user_phone: str
    message: str


class ManualMessageInput(BaseModel):
    lead_id: int
    message: str
