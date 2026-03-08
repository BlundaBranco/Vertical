from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler

from app.api import webhook, leads, stats, settings, chat, auth, analytics, whatsapp_connect


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


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = BackgroundScheduler()
    scheduler.add_job(_run_sheets_sync, 'interval', minutes=30)
    scheduler.add_job(_run_zombie_check, 'interval', hours=1)
    scheduler.start()
    yield
    scheduler.shutdown()


app = FastAPI(title="Ventra AI - Sistema de Agentes IA para WhatsApp", lifespan=lifespan)

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


@app.get("/")
def read_root():
    return {"status": "online", "system": "Ventra AI v2.0"}
