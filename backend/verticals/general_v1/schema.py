from pydantic import BaseModel
from typing import Optional


class ExtractionSchema(BaseModel):
    nombre: Optional[str] = None
    rubro: Optional[str] = None           # tipo de negocio (inmobiliaria, clínica, ecommerce, etc.)
    volumen_mensajes: Optional[str] = None  # estimación de mensajes/leads por día o mes
    problema_principal: Optional[str] = None  # qué problema quieren resolver
    listo_para_reunion: Optional[bool] = None  # True si acepta explícitamente avanzar o tener una llamada
    motivo_rechazo: Optional[str] = None  # "desinteres" | "presupuesto_bajo"
