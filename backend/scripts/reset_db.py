import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import engine
from app.db.base import Base
import app.models  # noqa: registra todos los modelos

print("BORRANDO BASE DE DATOS ACTUAL...")
Base.metadata.drop_all(bind=engine)
print("Tablas borradas.")

print("Creando tablas nuevas...")
Base.metadata.create_all(bind=engine)
print("Base de datos lista y actualizada.")
