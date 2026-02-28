import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.database import engine
from app.db.base import Base
import app.models  # noqa: registra todos los modelos


def init_db():
    print("Creando tablas en la base de datos...")
    Base.metadata.create_all(bind=engine)
    print("Tablas creadas. El sistema está listo.")


if __name__ == "__main__":
    init_db()
