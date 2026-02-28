# Prompt maestro — Contexto completo para IA de desarrollo

Usa este documento como contexto fijo cuando una IA te ayude a construir, mantener o extender este producto. Incluye visión de negocio, arquitectura técnica, estado actual y decisiones ya tomadas.

---

## PARTE 1 — VISIÓN Y NEGOCIO

### Qué es el producto
- **Nombre del producto / marca:** Ventra AI (en código y docs puede aparecer así; la app en Meta for Developers se llama **Conversa**).
- **Tipo:** SaaS B2B, "Service-as-Software". No es un constructor de chatbots; son **Empleados Digitales Especializados** (agentes de IA) que operan en WhatsApp.
- **Objetivo 2026:** Ser la plataforma estándar de atención automática para PyMEs en Latam.
- **Filosofía:** "Cero Configuración Técnica". El cliente conecta su WhatsApp y el agente ya sabe vender su rubro.
- **Diferencial comercial:** No se cobra por chat; se vende la **Calificación de Leads**. El sistema separa curiosos de compradores reales.

### Modelo: verticalización
- **Motor único (core horizontal)** que se adapta con **Plantillas Verticales**.
- **Vertical actual (MVP):** Inmobiliarias (Real Estate). Agente: **"Ana"**. Objetivo: conseguir Presupuesto, Zona, Tipo de Propiedad y Nombre.
- **Futuros verticales:** Clínicas (Agente "Sofía"), Concesionarias (Agente "Marcos").

### Lógica de negocio
- **Doble Pase de IA:** (1) **Extracción:** el mensaje se analiza y se extraen datos duros a JSON (precio, zona, etc.). (2) **Respuesta:** se consulta la Knowledge Base del cliente y se responde comercialmente.
- **Estados del lead:** NEW → QUALIFYING → QUALIFIED (éxito; se dispara alerta al humano) o LOST (fracaso). Sub-estados de pérdida: presupuesto_bajo, zona_no_cubierta, ya_compro, desinteres.
- **Knowledge Base:** por ahora el cliente pega inventario/reglas en un textarea; la IA usa ese texto (RAG/retrieval) para responder. Sin integración compleja con CRM al inicio.

### Roadmap
- **Hecho:** Conexión WhatsApp (Meta Cloud API), dashboard React "bandeja de entrada", detección de motivos de rechazo, configuración de identidad del bot.
- **Prioridad alta:** Protocolo Zombie (reactivación a 48 h sin respuesta), Lógica de Resurrección (lead LOST que vuelve con interés), Notificaciones proactivas (Email/WhatsApp al dueño cuando QUALIFIED), Self-Service Onboarding (registro, pago Stripe/MercadoPago).
- **Futuro:** Multimedia (audio con Whisper, fotos), análisis de sentimiento ("termómetro" en dashboard).

### Diseño y UX
- Estilo: "Vercel-like" o "Linear-like". Oscuro, minimalista, bordes sutiles, tipografía Inter. Recurso visual: "Pomelli" si aplica.
- Dashboard: split view — lista de leads a la izquierda, chat + inspector de datos a la derecha. No es un CRM complejo. Debe verse bien en móvil (vendedores en la calle).
- Estrategia de venta: demo rápida tipo "Mystery Shopper"; el dashboard debe permitir mostrar valor en poco tiempo.

---

## PARTE 2 — ARQUITECTURA TÉCNICA

### Flujo de un mensaje (end-to-end)
1. Usuario escribe por WhatsApp → Meta hace POST a `/webhook`.
2. Backend (FastAPI) recibe, parsea número y texto (JSON de Meta), busca/crea **Tenant** y **Lead** en la base de datos.
3. **process_message:** guarda mensaje del usuario en **Conversation**, luego:
   - **PASE 1:** `ai_engine.extract_information()` → OpenAI extrae datos estructurados → se actualiza `lead.extracted_data`.
   - **flows.check_lead_qualification()** → actualiza `lead.status` (QUALIFIED, LOST, etc.).
   - **PASE 2:** `ai_engine.generate_response()` → OpenAI genera respuesta comercial usando config del tenant y knowledge base.
4. Respuesta se guarda en **Conversation** y se envía por **whatsapp_client** (Meta WhatsApp Cloud API).
5. Dashboard React consume `GET /leads`, `GET /stats`, `GET/POST /settings` para mostrar conversaciones, KPIs y configurar el agente.

### Base de datos (PostgreSQL + SQLAlchemy)
- **vertical_templates:** id, name, assistant_name, system_prompt_base, required_fields_schema (JSON). Una plantilla por vertical (ej. real_estate_v1, Ana).
- **tenants:** id, name, phone_number_id, template_id (FK), business_config (JSON: agent_name, tone, specialty, catalog_url, knowledge_base, rules). Un tenant = un negocio cliente.
- **leads:** id, whatsapp_id, tenant_id (FK), status (NEW, QUALIFYING, QUALIFIED, HUMAN_HANDOFF, LOST), extracted_data (JSON), created_at.
- **conversations:** id, lead_id (FK), role (user|assistant), content, timestamp.

Relaciones: Tenant → muchos Leads; Lead → muchas Conversations; Tenant → una VerticalTemplate.

### Backend (raíz del proyecto)
- **main.py:** FastAPI, webhook GET (verificación Meta) y POST (mensajes), endpoints para dashboard (leads, stats, settings). Webhook recibe JSON de Meta. Token de verificación para GET: `VERIFY_TOKEN = "admin"`.
- **ai_engine.py:** Extracción con `client.beta.chat.completions.parse` (GPT-4o-mini, ExtractionSchema); generación de respuesta con prompt dinámico (tenant.business_config, knowledge_base).
- **flows.py:** `check_lead_qualification(lead)` — si hay motivo_rechazo → LOST; si tiene nombre, presupuesto, zona → QUALIFIED. `trigger_notification(tenant, lead)` — hoy por consola; luego Email/WhatsApp.
- **whatsapp_client.py:** Envío vía Meta WhatsApp Cloud API. Credenciales: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`. POST a `https://graph.facebook.com/v17.0/{PHONE_ID}/messages`, body JSON con `to` (número sin +), `type: text`, `text.body`.
- **database.py:** Engine SQLAlchemy, SessionLocal, get_db.
- **models.py:** Definición ORM de las cuatro tablas.
- **init_db.py / reset_db.py / seed.py:** Crear tablas, reset, carga inicial (plantilla Inmobiliaria V1, tenant de prueba).

### Frontend (ventra-web)
- React, Vite, react-router-dom, Tailwind, lucide-react.
- Rutas: / (Landing), /dashboard, /settings. Layout con sidebar (Dashboard, Configuración).
- Dashboard: lista de leads, chat por lead, datos extraídos (presupuesto, zona, tipo de propiedad). Consume GET /leads, GET /stats.
- Settings: nombre del negocio, asistente, tono, especialidad, catálogo, base de conocimiento. GET/POST /settings.

### Variables de entorno (.env)
- `DATABASE_URL` (PostgreSQL), `OPENAI_API_KEY`, `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID` (Meta WhatsApp Cloud API).

---

## PARTE 3 — WHATSAPP: META Y ONBOARDING

### Canal
- Se usa **Meta WhatsApp Cloud API** (app en Meta for Developers llamada **Conversa**). Número de prueba de Meta: solo se puede **enviar** a números que estén en la "lista de destinatarios permitidos" del número de prueba (no confundir con "agregar número de negocio": eso es para el "De", no para el "Para").

### Webhook
- URL pública obligatoria (ej. ngrok: `ngrok http 8000`). Meta no puede llamar a localhost.
- **GET /webhook:** Meta envía `hub.mode=subscribe`, `hub.challenge`, `hub.verify_token`. Responder 200 con body = `hub.challenge` si `hub.verify_token` coincide con `VERIFY_TOKEN` ("admin").
- **POST /webhook:** Meta envía JSON (`Content-Type: application/json`). Cuerpo tiene `entry[0].changes[0].value`; si hay `messages`, el mensaje está en `value.messages[0]`, `from` = número, `text.body` = texto. Responder 200 rápido; luego procesar y enviar respuesta con whatsapp_client.
- En Meta hay que suscribir el campo **messages** y, para que lleguen webhooks en producción, la app debe estar en modo **Live** (no solo Development).

### Partner / Coexistence (para más adelante)
- Para que los **clientes** conecten su WhatsApp con flujo fácil (Embedded Signup, "Login with Facebook", QR), hace falta ser **Tech Provider** de Meta. Verificación de negocio en Meta: documentos, dirección (puede ser domicilio), etc.
- **Coexistence:** mismo número en WhatsApp Business App y en la API a la vez. Es un flujo de Meta. Para MVP no es obligatorio.

### Errores frecuentes
- "Recipient phone number not in allowed list" (131030): el número al que se envía no está en la lista de destinatarios permitidos del número de prueba. Agregar el número como **destinatario de prueba** (en "Enviar y recibir mensajes" / "Para"), no como "número de negocio".
- "No se pudo validar la URL de devolución de llamada": backend y ngrok deben estar corriendo; token en Meta debe ser exactamente "admin"; si ngrok muestra página "Visit Site", puede fallar la verificación (alternativa: Cloudflare Tunnel).

---

## PARTE 4 — ESTADO ACTUAL Y CONVENCIONES

- **Entorno:** Python 3.10, venv en la raíz del proyecto (ruta correcta: `.../v-core/venv`). Si el venv se movió de carpeta, recrear venv e instalar `requirements.txt`.
- **Ejecución backend:** `uvicorn main:app --reload --port 8000` (con venv activado). Base de datos PostgreSQL con tablas creadas (init_db / seed).
- **Nombres en código:** Ventra AI en comentarios y mensajes al usuario; app en Meta = Conversa. Tenant de prueba en seed: "Inmobiliariarda" (o similar), asistente Ana.
- **Documentación interna:** `ARCHITECTURE.md` (flujo, modelos, archivos, stack), `docs/ONBOARDING-CLIENTE-WHATSAPP.md` (API oficial Meta, partner, Coexistence), `docs/GUIA-META-API-PASO-A-PASO.md` (webhook, ngrok, Live, messages), `docs/CREAR-APP-META-PASO-A-PASO.md` (crear app Conversa, casos de uso WhatsApp/Messenger/Instagram).

---

## INSTRUCCIONES PARA LA IA

Al ayudarme con este proyecto:

1. **Respeta la visión y la lógica de negocio** descritas arriba (doble pase, estados del lead, verticalización, Knowledge Base como texto).
2. **Mantén la arquitectura** existente: FastAPI + PostgreSQL + SQLAlchemy, webhook para Meta (JSON), ai_engine con extracción + generación, flows para calificación y notificaciones.
3. **No cambies nombres de producto/marca** sin que yo lo pida; en Meta la app se llama Conversa.
4. **Si tocas WhatsApp:** formato de número para Meta (sin +); en desarrollo con número de prueba de Meta solo se puede enviar a números en la lista de destinatarios permitidos.
5. **Si implementas algo del roadmap** (Protocolo Zombie, Resurrección, Notificaciones proactivas, Onboarding, etc.), alinea el diseño con el estilo y la UX indicados (dashboard split view, móvil, minimalista).
6. **Referencias:** usa `ARCHITECTURE.md` y los archivos en `docs/` para detalles de flujos y pasos operativos cuando haga falta.

Este documento es la fuente de verdad del contexto del proyecto. Actualízalo si tomamos decisiones de producto o arquitectura que deban quedar fijas para futuras sesiones con la IA.
