# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Identidad del proyecto

- **Repo/carpeta:** Vertical
- **Nombre del producto:** Ventra AI
- **App en Meta for Developers:** Conversa
- **Tipo:** SaaS B2B "Service-as-Software" — no es un constructor de chatbots, son **Empleados Digitales Especializados** que operan en WhatsApp
- **Vertical actual (MVP):** Inmobiliarias — Agente "Ana"
- **Futuros verticales:** Clínicas ("Sofía"), Concesionarias ("Marcos")

---

## Visión y lógica de negocio (respetar siempre)

**Diferencial comercial:** No se cobra por chat; se vende la **Calificación de Leads** (separar curiosos de compradores reales). Filosofía "Cero Configuración Técnica".

**Doble Pase de IA:**
1. **Extracción** — `ai_engine.extract_information()`: analiza el mensaje y extrae datos duros a JSON (nombre, presupuesto, zona, tipo_propiedad, motivo_rechazo, etc.) via OpenAI structured output.
2. **Respuesta** — `ai_engine.generate_response()`: consulta la Knowledge Base del tenant y genera una respuesta comercial conversacional.

**Estados del lead (funnel):**
```
NEW → QUALIFYING → QUALIFIED  (se dispara notificación al dueño)
                 → LOST        (sub-estados: presupuesto_bajo, zona_no_cubierta, ya_compro, desinteres)
```
Reglas de calificación en `flows.py`: si `motivo_rechazo` → LOST; si tiene nombre + presupuesto + zona → QUALIFIED.

**Knowledge Base:** el cliente pega inventario/reglas en un textarea (sin integración CRM). La IA usa ese texto en el prompt para responder.

---

## Roadmap (estado actual)

**Implementado:**
- Conexión WhatsApp vía Meta Cloud API (webhook)
- Dashboard React — "bandeja de entrada inteligente"
- Detección de motivos de rechazo (ventas perdidas)
- Configuración de identidad del bot (nombre, tono, reglas, knowledge base)
- **Protocolo Zombie:** APScheduler 1h, leads QUALIFYING 48h → ZOMBIE + template `reactivacion_lead`
- **Lógica de Resurrección:** lead LOST vuelve a escribir → limpia motivo_rechazo, status → QUALIFYING
- **Notificaciones proactivas:** email Zoho SMTP al dueño cuando lead pasa a QUALIFIED
- **Audio con Whisper:** `ai_engine.transcribe_audio()` — audio de WhatsApp → texto, luego proceso normal
- **Auth completo:** JWT + Google OAuth2 popup + email/password
- **Embedded Signup WhatsApp:** clientes conectan su propio número desde Settings/Onboarding
- **Google Sheets sync:** APScheduler 30min + inmediato al guardar
- **Plantillas WhatsApp:** UI completa lista/crear/borrar/enviar vía Meta Graph API
- **Bot toggle:** activa/pausa el bot sin tocar settings (PATCH /settings/{id}/bot-toggle)
- **Analytics:** conversion funnel, leads por día, motivos de pérdida
- **Onboarding:** flujo de 7 pasos para nuevo cliente
- **Landing completa** con precios ($49/$89 USD/mes)

**Prioridad alta (pendiente):**
- **Self-Service Billing:** MercadoPago ($49/$89 USD/mes ya en landing)
- **Modo producción Meta:** aprobación `whatsapp_business_management` en revisión (video enviado)

**Futuro:**
- Análisis de sentimiento: "termómetro" (Fuego/Hielo) en dashboard
- Análisis de fotos con visión
- Más verticales: Clínicas ("Sofía"), Concesionarias ("Marcos")

---

## Diseño y UX

- Estilo: Vercel-like / Linear-like. Oscuro, minimalista, bordes sutiles, tipografía Inter.
- Dashboard: **split view** — lista de leads a la izquierda, chat + inspector de datos a la derecha.
- **Mobile responsive** (vendedores inmobiliarios usan desde la calle).
- Demo rápida tipo "Mystery Shopper" — el dashboard debe mostrar valor en poco tiempo.

---

## Comandos

**Backend** (activar venv desde raíz, correr desde `backend/`):
```bash
source venv/Scripts/activate                    # Windows (bash) — venv en raíz del proyecto
cd backend
uvicorn app.main:app --reload --port 8000       # Dev server
python scripts/init_db.py && python scripts/seed.py  # Crear tablas + carga inicial
python scripts/reset_db.py                     # Reset DB (destructivo)
python scripts/update_prompt.py                # Actualizar system_prompt en DB
```

**Frontend** (`frontend/`):
```bash
cd frontend
npm run dev       # Vite dev server
npm run build     # Build producción
npm run lint      # ESLint
npm run preview   # Preview del build
```

**Exponer backend a Meta (desarrollo):**
```bash
ngrok http 8000   # URL pública para webhook de Meta
```

---

## Arquitectura

### Flujo end-to-end

```
WhatsApp User → Meta Cloud API → POST /webhook (webhook.py)
  → si audio: transcribe_audio() → Whisper → texto
  → guards: bot_active?, HUMAN_HANDOFF?, LOST/ZOMBIE? (resurrección automática)
  → busca/crea Tenant + Lead en DB por phone_number_id
  → PASE 1: ai_engine.extract_information() → OpenAI extrae JSON → actualiza lead.extracted_data
  → flows.check_lead_qualification() → actualiza lead.status (QUALIFIED/LOST)
  → si QUALIFIED: notifications.send_email_notification()
  → PASE 2: ai_engine.generate_response() → OpenAI genera respuesta conversacional
  → whatsapp.send_whatsapp_message() → Meta entrega al usuario
APScheduler (1h): zombie.py → leads QUALIFYING 48h → ZOMBIE + template reactivacion_lead
APScheduler (30min): sheets_sync.py → leads calificados → Google Sheets
```

Dashboard React consume la misma API: `GET /leads/{tenant_id}`, `GET /stats/{tenant_id}`, `GET/POST /settings/{tenant_id}`.

### Archivos clave — Backend (`backend/`)

| Archivo | Responsabilidad |
|---------|----------------|
| `app/main.py` | FastAPI app + CORS + include_router() |
| `app/api/webhook.py` | GET/POST /webhook — verificación Meta y procesamiento de mensajes |
| `app/api/leads.py` | GET /leads/{tenant_id} |
| `app/api/stats.py` | GET /stats/{tenant_id} |
| `app/api/settings.py` | GET/POST /settings/{tenant_id} |
| `app/api/chat.py` | GET /ping, POST /test-chat |
| `app/services/ai_engine.py` | Extracción (structured output) + generación de respuesta |
| `app/services/flows.py` | check_lead_qualification() + trigger_notification() |
| `app/services/message_handler.py` | process_message() — orquesta el doble pase |
| `app/services/whatsapp.py` | send_whatsapp_message() → Meta Graph API |
| `app/services/notifications.py` | send_email_notification() — smtplib |
| `app/models/db_models.py` | ORM SQLAlchemy: 4 tablas |
| `app/db/base.py` | declarative_base() |
| `app/db/database.py` | engine, SessionLocal, get_db() |
| `app/schemas/chat.py` | MessageInput |
| `app/schemas/settings.py` | SettingsUpdate |
| `verticals/real_estate_v1/schema.py` | ExtractionSchema (Pydantic) |
| `verticals/real_estate_v1/prompts.py` | REAL_ESTATE_PROMPT, SCHEMA_INMOBILIARIA |
| `scripts/` | init_db.py, reset_db.py, seed.py, update_prompt.py |

### Modelo de datos

| Tabla | Campos clave |
|-------|-------------|
| `vertical_templates` | `name`, `assistant_name`, `system_prompt_base`, `required_fields_schema` (JSON) |
| `tenants` | `phone_number_id`, `template_id` (FK), `business_config` (JSON: agent_name, tone, specialty, catalog_url, knowledge_base, rules) |
| `leads` | `whatsapp_id`, `tenant_id` (FK), `status`, `extracted_data` (JSON), `created_at` |
| `conversations` | `lead_id` (FK), `role` (user\|assistant), `content`, `timestamp` |

### Archivos clave — Frontend (`frontend/src/`)

| Archivo | Qué hace |
|---------|---------|
| `App.jsx` | Rutas: `/` (Landing), `/dashboard`, `/settings` |
| `api/client.js` | Base URL desde VITE_API_URL, wrappers de fetch |
| `pages/Dashboard.jsx` | Split view: lista de leads + chat + datos extraídos |
| `pages/Settings.jsx` | Config del agente: nombre, tono, especialidad, knowledge base |
| `components/Layout.jsx` | Sidebar con logo Ventra AI y estado "Bot Activo" |

---

## Variables de entorno (`backend/.env`)

```
DATABASE_URL=             # PostgreSQL connection string
OPENAI_API_KEY=           # OpenAI
WHATSAPP_TOKEN=           # Meta WhatsApp Cloud API token
WHATSAPP_PHONE_ID=        # Meta phone number ID
WEBHOOK_VERIFY_TOKEN=     # Token verificación webhook Meta (default: "admin")
NOTIFY_EMAIL=             # Email destino para notificaciones de leads QUALIFIED
SMTP_HOST=                # smtp.gmail.com
SMTP_PORT=                # 587
SMTP_USER=                # Tu cuenta SMTP
SMTP_PASS=                # App password
```

`frontend/.env`:
```
VITE_API_URL=http://localhost:8000
```

---

## WhatsApp / Meta — notas importantes

- En **desarrollo**: el número de prueba de Meta solo puede enviar a números en la "lista de destinatarios permitidos" (agregarlos en "Enviar y recibir mensajes" → "Para", no en "número de negocio").
- El webhook necesita URL pública (ngrok o Cloudflare Tunnel). `localhost` no funciona.
- **Error 131030** ("Recipient not in allowed list"): el número destino no está en la lista de prueba.
- Para producción y para que clientes conecten su propio WhatsApp: hace falta ser **Tech Provider** de Meta (verificación de negocio).
- App en Meta for Developers se llama **Conversa** — no cambiar ese nombre.

---

## Documentación interna adicional

- `ARCHITECTURE.md` — diagrama Mermaid actualizado, modelo de datos, mapa de archivos real
- `docs/ONBOARDING-CLIENTE-WHATSAPP.md` — API oficial Meta, partner, Coexistence
- `docs/GUIA-META-API-PASO-A-PASO.md` — webhook, ngrok, modo Live
- `docs/CREAR-APP-META-PASO-A-PASO.md` — crear app Conversa en Meta
- `docs/Documentacion API Whatsapp Business/` — 201 archivos .md oficiales de Meta (leer antes de implementar cualquier cosa de WhatsApp)
