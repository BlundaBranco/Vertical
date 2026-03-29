from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler

from app.api import webhook, leads, stats, settings, chat, auth, analytics, whatsapp_connect, templates, billing, admin


def _run_sheets_sync():
    from app.db.database import SessionLocal
    from app.services.sheets_sync import sync_all_tenants
    db = SessionLocal()
    try:
        sync_all_tenants(db)
    finally:
        db.close()


def _run_zombie_check():
    from app.db.database import SessionLocal
    from app.services.zombie import check_zombie_leads
    db = SessionLocal()
    try:
        check_zombie_leads(db)
    finally:
        db.close()


def _seed_verticals():
    """Crea verticales faltantes en DB. Idempotente — no borra ni modifica existentes."""
    from app.db.database import SessionLocal
    from app.models import VerticalTemplate
    db = SessionLocal()
    try:
        if not db.query(VerticalTemplate).filter(VerticalTemplate.name == "real_estate_v1").first():
            db.add(VerticalTemplate(
                name="real_estate_v1",
                assistant_name="Ana",
                system_prompt_base="Sos {assistant_name}, asesora de {business_name}.",
                required_fields_schema=["nombre", "presupuesto", "zona"],
            ))
            db.commit()
            print("[SEED] Vertical 'real_estate_v1' creado.")
        if not db.query(VerticalTemplate).filter(VerticalTemplate.name == "general_v1").first():
            db.add(VerticalTemplate(
                name="general_v1",
                assistant_name="Asistente",
                system_prompt_base="Sos {assistant_name}, quien atiende consultas de {business_name} por WhatsApp.",
                required_fields_schema=["nombre"],
            ))
            db.commit()
            print("[SEED] Vertical 'general_v1' creado.")
    except Exception as e:
        print(f"[SEED] Error al crear verticales: {e}")
    finally:
        db.close()


def _run_migrations():
    """Migraciones incrementales seguras — idempotentes, no destruyen datos."""
    from sqlalchemy import text
    from app.db.database import engine
    with engine.connect() as conn:
        conn.execute(text(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE"
        ))
        conn.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crear tablas nuevas si no existen (seguro en producción — no borra datos)
    from app.db.base import Base
    from app.db.database import engine
    import app.models  # noqa
    Base.metadata.create_all(bind=engine)
    _run_migrations()
    _seed_verticals()

    scheduler = BackgroundScheduler()
    scheduler.add_job(_run_sheets_sync, 'interval', minutes=30)
    scheduler.add_job(_run_zombie_check, 'interval', hours=1)
    scheduler.start()
    yield
    scheduler.shutdown()


app = FastAPI(title="Vertical AI - Sistema de Agentes IA para WhatsApp", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(analytics.router)
app.include_router(webhook.router)
app.include_router(leads.router)
app.include_router(stats.router)
app.include_router(settings.router)
app.include_router(chat.router)
app.include_router(whatsapp_connect.router)
app.include_router(templates.router)
app.include_router(billing.router)
app.include_router(admin.router)


@app.get("/")
def read_root():
    return {"status": "online", "system": "Ventra AI v2.0"}
