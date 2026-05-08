# CONGELAMIENTO — Vertical AI

**Fecha:** 2026-05-08
**Motivo:** El VPS de DigitalOcean donde corre Vertical se reusa para otro proyecto (Cortex). Vertical queda fuera de línea por tiempo indefinido.
**Promesa:** No se borra nada del repo. Se guardan backups completos para poder reactivar sin reconstruir desde cero.

> Este archivo es la guía de "cómo revivir Vertical". Léelo entero antes de tocar nada cuando llegue el momento.

---

## 1. Estado al congelar (2026-05-08)

### Repo
- **Branch productivo:** `main`
- **Último commit:** `df88d012bdc1cfefc0484fa3c03dc8ca4611df02` — *"fix: disable SMTP notifications — DO blocks ports 25/465/587, pending SendGrid migration"*
- **Working tree:** limpio (`git status` → nothing to commit)
- **Remote:** `https://github.com/BlundaBranco/Vertical`

### VPS DigitalOcean
- **Droplet:** `ubuntu-s-1vcpu-1gb-sfo2-01`
- **IP pública:** `157.230.134.177`
- **OS:** Ubuntu 24.04
- **Plan:** $6/mes (1 vCPU, 1 GB RAM, SFO2)
- **SSH:** `ssh -i <ruta-a-clave-privada> root@157.230.134.177`
- **Código:** `/var/www/vertical/`
- **Servicios systemd:** `vertical.service` (uvicorn) — `systemctl status vertical`
- **Servicios activos:** uvicorn (FastAPI), nginx (reverse proxy + TLS termination via Cloudflare Flexible), postgresql-16
- **Logs:** `journalctl -u vertical -f`

### Frontend
- **Hosting:** Vercel — `https://somosvertical.ar`
- **DNS:** Cloudflare (Flexible SSL)
- **Subdominio API:** `api.somosvertical.ar` → CNAME/A a `157.230.134.177`

### Datos en DB (snapshot 2026-05-08)
- **PostgreSQL:** 16.13 corriendo localmente en el VPS. DB única: `vertical_db` (8.2 MB).
- **Tenants:** 2
  - `id=1` "Vertical AI" → template 3 (`vertical_saas_v1`, agente "Verty"), `phone_number_id=980273548511591`
  - `id=2` "Estética Mía" → template 1 (`general_v1`), sin `phone_number_id` asignado (cliente test)
- **Usuarios:** 2 — `contacto@somosvertical.ar` (admin, tenant 1) + `test1@estetica.com` (tenant 2, no admin)
- **Leads:** 7 totales — `ZOMBIE: 5`, `QUALIFIED: 2`. (0 NEW, 0 QUALIFYING, 0 LOST.)
- **Conversaciones (mensajes):** 66
- **Verticales sembradas:** 4 — `general_v1`, `real_estate_v1`, `vertical_saas_v1`, `web_sales_v1` ✅
- **Suscripciones MercadoPago:** 0 (no se activaron pagos)
- **Schema:** 6 tablas — `tenants` (144 KB), `users` (96 KB), `conversations` (88 KB), `leads` (64 KB), `vertical_templates` (64 KB), `subscriptions` (32 KB).
- **Nota schema:** `tenants` no tiene columna `waba_id` directa. El `waba_id` vive dentro del JSON `business_config`.

---

## 2. Inventario de credenciales y servicios externos

### Meta Business / WhatsApp
- **App "Vertical" (tipo Business):** App ID `1901159230524777`, App Secret en `backend/.env` (`FACEBOOK_APP_SECRET`)
- **Business Manager Vertical.AI:** `1424914999327047`
- **WABA producción "Vertical.AI":** `2412689112513021` ← el real (✅ verificado en `.env` del VPS)
- **WABA "Test"** (default Meta sandbox, NO se usa): `1630587688290504`
- **WABA "Vickyy"** (libre, sin tenant asignado): `3436191373204300`
- **PHONE_NUMBER_ID producción:** `980273548511591` → número `+54 9 341 343-6259` (Tenant 1, agente "Verty", vertical_saas_v1)
- **PHONE_NUMBER_ID Vicky disponible:** `969826962888064` → número `+54 9 341 343-6285`
- **Token WhatsApp:** valor en `backend/.env` → `WHATSAPP_TOKEN`. ⚠️ Es **token temporal del panel Meta**, NO un System User Token permanente — caduca. Si pasan meses, regenerá uno nuevo (idealmente System User permanente para evitar este problema otra vez).
- **Webhook verify token:** `WEBHOOK_VERIFY_TOKEN=admin` (en `.env`)
- **Embedded Signup Config ID:** `1683622299468440`
- **Plantillas aprobadas:**
  - ✅ `reactivacion_lead` — APPROVED, en español, con video. La usa `app/services/zombie.py` para leads en QUALIFYING 48h sin respuesta.

### Hosting / DNS
- **Vercel:** proyecto deploya `frontend/` desde GitHub `main`. Env vars en Vercel:
  - `VITE_API_URL=https://api.somosvertical.ar` (sin trailing slash)
  - `VITE_FACEBOOK_APP_ID=1901159230524777`
  - `VITE_FACEBOOK_EMBEDDED_SIGNUP_CONFIG_ID=1683622299468440`
  - `VITE_GOOGLE_CLIENT_ID=<valor en backup: vertical-CREDENCIALES-2026-05-08.txt>`
- **Cloudflare:** zona `somosvertical.ar`, registros A/CNAME para `@`, `www`, `api`. SSL Flexible (no romper cambiando a Full).
- **Dominio:** `somosvertical.ar` (registrar fuera del VPS — el dominio no se pierde al apagar el droplet)

### OpenAI
- API Key en `backend/.env` → `OPENAI_API_KEY`. Sigue activa mientras la cuenta esté al día. Verificar saldo al reactivar.

### Google
- **Client ID + Client Secret:** ver `vertical-CREDENCIALES-2026-05-08.txt` (backup local) o `credentials.md` de Engram. **No** se incluyen en este doc para evitar leaks en el repo.
- **Authorized redirect URIs:** `https://somosvertical.ar/auth/google/callback`, `http://localhost:5173/auth/google/callback`
- **Google Sheets:** sync corre en APScheduler (30 min). Verificar credenciales en `.env` al reactivar.

### Zoho Mail (SMTP — ACTUALMENTE DESHABILITADO)
- Cuenta: `contacto@somosvertical.ar`
- App password: ver `vertical-env-2026-05-08.txt` (campo `SMTP_PASS`) o `vertical-CREDENCIALES-2026-05-08.txt`.
- ⚠️ DigitalOcean bloquea puertos 25/465/587 permanentemente. `notifications.py` tiene early-return. **NO se restablece** apagando/encendiendo. Migrar a **SendGrid REST API** (gratis hasta 100 emails/día) antes de aceptar el primer cliente pagador.

### MercadoPago (implementado, sin activar)
- Endpoints: `/billing/status`, `/billing/create-subscription`, `/billing/webhook`
- Falta: correr `scripts/setup_mp_plans.py` y configurar `MP_ACCESS_TOKEN`, `MP_PLAN_ID_BASE`, `MP_PLAN_ID_PRO` en `.env`

### Cuenta admin de la app
- Usuario único: `contacto@somosvertical.ar` (Tenant 1, `is_admin=true`). Password en `vertical-CREDENCIALES-2026-05-08.txt` (backup) y en `credentials.md` de Engram.
- Usuario cliente test: `test1@estetica.com` (Tenant 2 "Estética Mía", no admin).

### Variables `.env` reales del VPS (claves; valores en el backup)
> Los valores reales viven en `vertical-env-2026-05-08.txt` (backup local). Acá solo el inventario de claves para saber qué necesitás restaurar.

Públicas / no sensibles (estructura):
```
BACKEND_URL=https://api.somosvertical.ar
FRONTEND_URL=https://somosvertical.ar
WHATSAPP_PHONE_ID=980273548511591
WHATSAPP_WABA_ID=2412689112513021
FACEBOOK_APP_ID=1901159230524777
NOTIFY_EMAIL=contacto@somosvertical.ar
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=contacto@somosvertical.ar
MP_CURRENCY_ID=ARS
MP_PLAN_ESSENTIAL_PRICE=49900
MP_PLAN_PRO_PRICE=89900
```

Sensibles (valores en backup, no acá):
```
DATABASE_URL=postgresql://vertical:<password>@localhost:5432/vertical_db
GOOGLE_CLIENT_ID=<valor>
WHATSAPP_TOKEN=<token Meta>
OPENAI_API_KEY=<key OpenAI>
FACEBOOK_APP_SECRET=<secret>
SMTP_PASS=<password Zoho>
SECRET_KEY=<JWT secret>
WEBHOOK_VERIFY_TOKEN=<verify token>
```

### ⚠️ Archivo extra fuera de Git
`/var/www/vertical/CREDENCIALES.txt` (28 líneas, 656 B) — archivo de notas suelto en el VPS, **NO está en el repo de GitHub** (no aparece en `git ls-files`). Se incluye en el backup como `vertical-CREDENCIALES-2026-05-08.txt`. Tratar como secreto. Encabezado dice "VENTRA AI — Credenciales de Producción" (nombre viejo del producto, antes del rename a "Vertical AI").

### Railway — confirmado vacío
La memoria de Engram (`project-context.md`, abr-2026) mencionaba Railway como DB. **Verificación al congelar:** la DB activa es local en el VPS (`postgresql://vertical:<password>@localhost:5432/vertical_db`). Railway no se referencia desde el `.env` actual. Si la cuenta de Railway todavía existe y se sigue cobrando → cancelarla por separado.

---

## 3. Plan de backups (ya ejecutado el 2026-05-08)

Todo se generó **en el VPS** en `/tmp/vertical-backup-2026-05-08/` y se baja a Windows con `scp`. Después: cifrar en disco externo + cloud personal.

Archivos generados (tamaños reales):

1. ✅ `vertical-db-2026-05-08.sql.gz` — 8.2 KB — `pg_dumpall` (roles + DBs + COPY blocks). Integridad verificada (`gunzip -t` OK).
2. ✅ `vertical-code-2026-05-08.tar.gz` — 994 KB — `/var/www/vertical/` sin `venv/`, `__pycache__/`, `node_modules/`, `frontend/dist/`, `.git/objects/pack`.
3. ✅ `vertical-env-2026-05-08.txt` — 1.3 KB — copia íntegra del `backend/.env` (renombrado a `.txt` para evitar gitignores accidentales en destino).
4. ✅ `vertical-nginx-2026-05-08.tar.gz` — 2.2 KB — `/etc/nginx/sites-available/`, `sites-enabled/`, `nginx.conf`.
5. ✅ `vertical-systemd-2026-05-08.txt` — 379 B — output de `systemctl cat vertical.service`.
6. ✅ `vertical-db-stats-2026-05-08.txt` — 1.8 KB — counts y schema de DB.
7. ✅ `vertical-pip-freeze-2026-05-08.txt` — 722 B — `pip freeze` desde `/var/www/vertical/venv/`.
8. ✅ `vertical-cron-2026-05-08.txt` — 2.9 KB — crontab + cron.d + systemd timers.
9. ⚠️ `vertical-CREDENCIALES-2026-05-08.txt` — 656 B — copia del archivo `CREDENCIALES.txt` que vive en el VPS pero NO está en GitHub.

**Total:** 1.1 MB. Backup minúsculo porque la DB tiene poca data y el código es liviano.

**Snapshot extra recomendado (no destructivo):** **DigitalOcean Snapshot** del droplet entero antes de tocarlo. Solo Branco lo puede hacer desde `cloud.digitalocean.com → Droplets → Snapshots → Take Snapshot` (requiere login).

---

## 4. Pasos para reactivar Vertical

Lectura previa obligatoria al reactivar: este archivo + `MEMORY.md` + `whatsapp-client-onboarding.md`.

### 4.1 Infraestructura nueva
1. Crear droplet nuevo en DigitalOcean — Ubuntu 24.04, mínimo 1 vCPU / 1 GB (mismo plan basta).
2. Anotar IP nueva → reemplazará `157.230.134.177` en DNS y webhook Meta.
3. Subir clave SSH pública → `ssh root@<IP-nueva>`.

### 4.2 Dependencias del sistema
```bash
apt update && apt upgrade -y
apt install -y python3.12 python3.12-venv python3-pip postgresql-16 nginx certbot python3-certbot-nginx git
```

### 4.3 Restaurar PostgreSQL
```bash
# Subir el dump al nuevo VPS:
scp vertical-db-2026-05-08.sql.gz root@<IP-nueva>:/tmp/

# En el VPS:
systemctl start postgresql
gunzip -c /tmp/vertical-db-2026-05-08.sql.gz | sudo -u postgres psql
# Verificar:
sudo -u postgres psql -l   # listar databases — debe aparecer 'vertical_db'
sudo -u postgres psql -d vertical_db -c "SELECT count(*) FROM tenants;"  # esperado: 2
```

> El `pg_dumpall` capturó **roles** (postgres, vertical) **+ DBs**. La password del rol `vertical` queda encriptada con SCRAM-SHA-256 dentro del dump — la app sigue conectándose con la password en claro del `.env` (ver backup) porque ese hash matchea ese valor.

### 4.4 Restaurar código
> **Layout real del VPS al congelar:** venv en `/var/www/vertical/venv/` (no en `backend/venv`). Service systemd usa `/var/www/vertical/venv/bin/uvicorn`.

**Opción A — git clone (preferida, código siempre limpio):**
```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/BlundaBranco/Vertical.git vertical
cd vertical
python3.12 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
```

**Opción B — desde tarball (si git remote está caído o querés bit-by-bit fidelity):**
```bash
mkdir -p /var/www && cd /var/www
tar -xzf vertical-code-2026-05-08.tar.gz   # crea ./vertical
cd vertical
python3.12 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
# (opcional) pip install -r vertical-pip-freeze-2026-05-08.txt si querés versiones exactas
```

**Opcional:** restaurar `CREDENCIALES.txt` de respaldo si te resulta útil:
```bash
cp vertical-CREDENCIALES-2026-05-08.txt /var/www/vertical/CREDENCIALES.txt
```

### 4.5 Restaurar configs
```bash
# .env del backend:
cp vertical-backend-env-2026-05-08.env /var/www/vertical/backend/.env

# nginx:
cp vertical-nginx-2026-05-08.conf /etc/nginx/sites-available/vertical
ln -s /etc/nginx/sites-available/vertical /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# systemd:
cp vertical.service-2026-05-08 /etc/systemd/system/vertical.service
systemctl daemon-reload
systemctl enable --now vertical
```

### 4.6 DNS y webhook Meta
1. Cloudflare → editar A record de `api.somosvertical.ar` → IP nueva.
2. Esperar propagación (~minutos con TTL bajo).
3. Meta for Developers → app "Vertical" → WhatsApp → Configuration → Webhook → cambiar URL a `https://api.somosvertical.ar/webhook` (probablemente igual, pero **re-suscribir y reverificar**).
4. Resuscribir el número al webhook: `POST /{phone_number_id}/subscribed_apps` si se desuscribió.

### 4.7 Token Meta
**Casi seguro va a estar caducado.** Generar uno nuevo:
- **Quick fix (temporal, 24h):** Meta for Dev → app "Vertical" → WhatsApp → API Setup → "Generate access token".
- **Fix definitivo (recomendado):** Business Manager → Configuración del negocio → Usuarios del sistema → crear System User → asignar la app y el WABA → "Generate token" con permisos `whatsapp_business_messaging` + `whatsapp_business_management`. **Sin expiración.**

Después: editar `backend/.env` → `WHATSAPP_TOKEN=<nuevo>` → `systemctl restart vertical`.

### 4.8 Verificación end-to-end
```bash
# 1. Backend respondiendo:
curl https://api.somosvertical.ar/ping

# 2. DB conectada:
journalctl -u vertical -n 50 --no-pager | grep -i error

# 3. Webhook Meta GET (verificación):
curl "https://api.somosvertical.ar/webhook?hub.mode=subscribe&hub.verify_token=admin&hub.challenge=test123"
# → debe responder "test123"

# 4. Mandar un WhatsApp al +54 9 341 343-6259 y ver:
journalctl -u vertical -f
```

### 4.9 Frontend
Si el repo en GitHub no se tocó, **Vercel sigue funcionando** sin hacer nada — apunta a `api.somosvertical.ar` que ya redireccionaste en 4.6. Si Vercel se canceló: re-crear proyecto importando el repo, copiar las env vars de la sección 2.

---

## 5. Riesgos y gotchas

1. ⚠️ **Token Meta caduca.** Es token temporal del panel. Si pasaron más de 60 días, está vencido. Regenerar (idealmente como System User Token permanente). Sin token válido → bot no manda ni recibe.
2. ⚠️ **Webhook Meta debe reapuntarse.** Cambia el IP del VPS → DNS apunta al nuevo → Meta sigue mandando al endpoint del dominio, pero hay que **re-verificar** el webhook desde Meta y resuscribir el número con `POST /{phone_number_id}/subscribed_apps`.
3. ⚠️ **El número WhatsApp puede desactivarse por inactividad.** Meta puede marcar el WABA como dormido si pasan meses sin actividad. Si al reactivar `/messages` devuelve error de quality/inactive → escalada con soporte Meta. Plan B: registrar el número Vicky disponible (`969826962888064`) como reemplazo.
4. ⚠️ **Display name del WABA `2412689112513021` quedó DECLINED.** No bloquea funcionamiento (los usuarios ven el número), pero al reactivar conviene reintentar con un display name nuevo. Histórico rechazado: "Vertical", "Vertical.ai", "Somos Vertical", "Vertical Automation Solutions". Probar "SomosVertical".
5. ⚠️ **SMTP sigue bloqueado en cualquier droplet DO nuevo.** Es restricción de toda la red de DigitalOcean, no de este droplet. Migrar a **SendGrid REST API** antes de depender del email de notificaciones.
6. ⚠️ **OAuth Google redirect URIs.** Si el dominio no cambia, no hay que tocar nada. Si cambia → actualizar redirect URIs en Google Cloud Console o el login OAuth rompe en silencio.
7. ⚠️ **Leads históricos pueden tener URLs/datos viejos en `extracted_data`.** El bot puede contestar referenciando catálogos o links que ya no existen. Considerar reset a status `NEW` de leads anteriores a la fecha de reactivación.
8. ⚠️ **APScheduler corre dentro del proceso uvicorn.** No hay cron de sistema. Si en el futuro se escala a múltiples workers de uvicorn → schedulers duplicados. Hoy hay 1 solo proceso, no preocuparse aún.
9. ⚠️ **MercadoPago sandbox vs prod.** Si se activó pagos antes del freeze, verificar que `MP_ACCESS_TOKEN` no haya sido rotado. Webhooks van al endpoint del nuevo VPS.
10. ⚠️ **Railway no se usaba al congelar** (verificado). Si la cuenta sigue abierta y cobrándose, cancelarla por separado.
11. ⚠️ **Backups contienen secrets.** El `.env`, el dump de DB (con password hash bcrypt del admin) y `CREDENCIALES.txt` tienen tokens y contraseñas. **Cifrar en reposo** (disco externo cifrado + zip con password si va a cloud personal). NO subir a GitHub público bajo ninguna circunstancia.
12. ⚠️ **Cuenta admin única.** Solo `contacto@somosvertical.ar` tiene `is_admin=true`. Si se pierde la password (en backup) **y** el dump → reconstruir manualmente con `backend/scripts/set_admin.py`.
13. ⚠️ **Tenant 2 "Estética Mía" tiene cliente test sin `phone_number_id` asignado.** Si querés limpiar antes de reactivar: borrar tenant 2 y user 2 desde DB o desde panel admin.

---

## 6. Backups — ejecución y descarga

### 6.1 Estado actual (ya corrido el 2026-05-08)
Los backups ya están generados en el VPS, en `/tmp/vertical-backup-2026-05-08/`. Ver listado en sección 3.

### 6.2 Bajar a Windows (Branco — pegar en PowerShell)
```powershell
scp -r root@157.230.134.177:/tmp/vertical-backup-2026-05-08 $env:USERPROFILE\Desktop\
```
Esto crea `C:\Users\branc\Desktop\vertical-backup-2026-05-08\` con los 9 archivos. Si preferís otra carpeta, cambiá la ruta de destino.

### 6.3 Verificar tras la descarga
```powershell
Get-ChildItem $env:USERPROFILE\Desktop\vertical-backup-2026-05-08 | Format-Table Name, @{N='Size(KB)';E={[math]::Round($_.Length/1KB,1)}}
```
Tamaños esperados (orden de magnitud):
- `vertical-db-...sql.gz` → ~8 KB
- `vertical-code-...tar.gz` → ~1 MB
- el resto → KBs

### 6.4 Re-correr el backup en el futuro (script reusable)
Si por alguna razón hay que regenerar los backups (datos nuevos antes de apagar, etc.), pegar este bloque por SSH:
```bash
ssh root@157.230.134.177 'bash -s' <<'REMOTE'
set -euo pipefail
DATE=$(date +%Y-%m-%d)
OUT=/tmp/vertical-backup-$DATE
mkdir -p "$OUT" && cd "$OUT"

sudo -u postgres pg_dumpall | gzip > "vertical-db-$DATE.sql.gz"
tar --exclude='vertical/venv' --exclude='__pycache__' --exclude='node_modules' \
    --exclude='vertical/frontend/dist' --exclude='.git/objects/pack' \
    -czf "vertical-code-$DATE.tar.gz" -C /var/www vertical
cp /var/www/vertical/backend/.env "vertical-env-$DATE.txt"
cp /var/www/vertical/CREDENCIALES.txt "vertical-CREDENCIALES-$DATE.txt" 2>/dev/null || true
tar -czf "vertical-nginx-$DATE.tar.gz" /etc/nginx/sites-available /etc/nginx/sites-enabled /etc/nginx/nginx.conf
systemctl cat vertical.service > "vertical-systemd-$DATE.txt"
sudo -u postgres psql -d vertical_db -c "SELECT count(*) FROM tenants; SELECT count(*) FROM users; SELECT status, count(*) FROM leads GROUP BY status; SELECT count(*) FROM conversations; SELECT id,name FROM vertical_templates;" > "vertical-db-stats-$DATE.txt"
/var/www/vertical/venv/bin/pip freeze > "vertical-pip-freeze-$DATE.txt"
{ echo "# crontab:"; crontab -l 2>/dev/null; echo "# timers:"; systemctl list-timers --all --no-pager; } > "vertical-cron-$DATE.txt"

ls -lh "$OUT" && du -sh "$OUT"
REMOTE
```

### 6.5 Cleanup en el VPS (sólo cuando confirmes backups bajados y verificados)
```bash
ssh root@157.230.134.177 'systemctl stop vertical && systemctl disable vertical'
# La DB y nginx pueden quedar arriba — Cortex los puede reusar:
# ssh root@157.230.134.177 'systemctl stop postgresql'   # opcional
```

---

## 7. Checklist de cierre (Branco)

1. ✅ Backups generados en VPS (`/tmp/vertical-backup-2026-05-08/`, 1.1 MB total)
2. ✅ Stats de DB recolectadas y pegadas en sección 1
3. ✅ Integridad del dump verificada (`gunzip -t` OK, 6 COPY blocks)
4. ⬜ **DigitalOcean Snapshot del droplet** (UI — solo Branco puede): `cloud.digitalocean.com → Droplets → ubuntu-s-1vcpu-1gb-sfo2-01 → Snapshots → Take Snapshot`
5. ⬜ Backups bajados a Windows (sección 6.2: `scp -r root@157.230.134.177:/tmp/vertical-backup-2026-05-08 $env:USERPROFILE\Desktop\`)
6. ⬜ Tamaños verificados localmente (sección 6.3)
7. ⬜ Backup duplicado a disco externo cifrado + cloud personal
8. ⬜ Vertical detenido en VPS (`systemctl stop vertical && systemctl disable vertical`)
9. ⬜ Cortex empieza a usar el droplet libre

---

## 8. Contacto / referencias internas

- **Repo:** `https://github.com/BlundaBranco/Vertical`
- **Memorias Engram con detalle:** `MEMORY.md` (índice), `credentials.md`, `whatsapp-client-onboarding.md`, `meta-support-chat.md`, `architecture.md`, `billing.md`, `feature-backlog.md`
- **Doc Meta interna:** `docs/Documentacion API Whatsapp Business/` (201 archivos crawleados — leer antes de tocar cualquier cosa de WhatsApp)
- **Marcador Engram del freeze:** topic `vertical/congelamiento-2026-05-08`
