from pydantic import BaseModel
from typing import Optional


class ExtractionSchema(BaseModel):
    nombre: Optional[str] = None
    motivo_rechazo: Optional[str] = None  # solo "desinteres"
