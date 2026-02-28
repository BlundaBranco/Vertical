from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import webhook, leads, stats, settings, chat

app = FastAPI(title="Ventra AI - Sistema de Agentes IA para WhatsApp")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(webhook.router)
app.include_router(leads.router)
app.include_router(stats.router)
app.include_router(settings.router)
app.include_router(chat.router)


@app.get("/")
def read_root():
    return {"status": "online", "system": "Ventra AI v2.0"}
