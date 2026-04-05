from pydantic import BaseModel
from typing import Optional


class ExtractionSchema(BaseModel):
    nombre: Optional[str] = None
    tiene_sitio_web_actual: Optional[bool] = None  # True si ya tiene un sitio web
    nivel_interes: Optional[str] = None            # "alto" | "medio" | "bajo"
    acepta_propuesta: Optional[bool] = None        # True si acepta explícitamente recibir una propuesta o avanzar
    motivo_rechazo: Optional[str] = None           # "caro" | "no_le_interesa" | "ya_tiene"
