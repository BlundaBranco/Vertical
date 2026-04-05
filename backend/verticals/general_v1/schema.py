from pydantic import BaseModel
from typing import Optional


class ExtractionSchema(BaseModel):
    nombre: Optional[str] = None
    motivo_contacto: Optional[str] = None  # resumen de lo que busca el usuario
    email: Optional[str] = None
    telefono: Optional[str] = None
    motivo_rechazo: Optional[str] = None   # "desinteres"
