from pydantic import BaseModel
from typing import Optional


class ExtractionSchema(BaseModel):
    nombre: Optional[str] = None
    presupuesto: Optional[str] = None
    zona: Optional[str] = None
    tipo_propiedad: Optional[str] = None
    intencion: Optional[str] = None  # Comprar / Alquilar / Tasar
    telefono_alternativo: Optional[str] = None
    motivo_rechazo: Optional[str] = None  # presupuesto_bajo, zona_no_cubierta, ya_compro, desinteres
