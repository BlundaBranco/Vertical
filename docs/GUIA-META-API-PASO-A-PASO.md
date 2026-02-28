# Guía paso a paso (con enlaces): WhatsApp Cloud API de Meta

Para que tu app reciba y envíe mensajes con la API de Meta y no te pase lo de "enviado" y que no llegue nada. Incluye un detalle que suele romper todo: **modo Live vs Desarrollo**.

---

## Por qué podía decir "Enviado" y no llegarte nada (incluso con ngrok y 24 h)

Además de lo que ya vimos (webhook público, 24 h, formato de número), en la documentación de Meta dice algo importante:

> **"Make sure your app is in Live mode; some webhooks will not be sent if your app is in Dev mode."**  
> — [Webhooks - Troubleshooting](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks#troubleshooting)

Es decir: si tu app estaba en **modo Desarrollo (Dev)**, Meta **puede no enviar** los webhooks al servidor. Entonces:

- El botón **"Enviar mensaje de prueba"** del panel envía el mensaje **desde** los servidores de Meta; la API puede devolver 200 (enviado).
- Pero si el **webhook** no se dispara porque la app está en Dev, tu backend nunca recibe el evento y no contesta.
- Y si el mensaje de prueba lo envía **el panel** (no tu backend), a veces Meta solo entrega a números que ya tienen conversación abierta o que cumplen ciertas condiciones en entorno de prueba.

Por eso en esta guía se deja claro: **poner la app en Live** (aunque sigas en pruebas) y **suscribir el campo `messages`** al webhook, y probar **escribiendo vos primero** desde tu WhatsApp al número del bot.

---

## Enlaces oficiales que vas a usar

| Qué | Enlace |
|-----|--------|
| Panel de apps (Meta for Developers) | https://developers.facebook.com/apps |
| Get Started WhatsApp Cloud API | https://developers.facebook.com/docs/whatsapp/cloud-api/get-started |
| Agregar número de teléfono | https://developers.facebook.com/docs/whatsapp/cloud-api/get-started/add-a-phone-number |
| Webhooks (overview) | https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks |
| Crear endpoint de webhook (GET/POST) | https://developers.facebook.com/docs/whatsapp/webhooks/create-webhook-endpoint |
| Enviar mensajes (texto) | https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages |
| Referencia de mensajes (text) | https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages |
| ngrok | https://ngrok.com |

---

## Paso 1: Entrar a tu app y agregar WhatsApp (si no lo tenés)

1. Entrá a **https://developers.facebook.com/apps** e iniciá sesión.
2. Clic en **Mis aplicaciones** y elegí tu app (o creá una nueva: **Crear app** → tipo **Negocio**).
3. En el panel izquierdo, buscá **WhatsApp** y clic en **Configuración** o **API Setup** (según la versión del panel).
   - Si no ves WhatsApp: **Agregar producto** → **WhatsApp** → **Configurar**.
4. Documentación de inicio: [Get Started - WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).

---

## Paso 2: Tener un número de negocio (Phone Number ID) y el token

1. En **WhatsApp** → **Configuración de API** (o **API Setup**).
2. Si Meta te dio un **número de prueba** al configurar WhatsApp, ese número ya tiene un **Phone Number ID**. Anotalo.
3. Si agregaste **tu propio número**: [Add a phone number](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started/add-a-phone-number) — necesitás recibir un código por SMS o llamada para verificarlo.
4. En la misma pantalla suele estar el **Token de acceso temporal**. Para desarrollo podés usarlo; para algo más estable después se genera un token del sistema.
5. En tu proyecto, en el `.env`:
   - `WHATSAPP_PHONE_ID` = **Phone Number ID** (número largo, ej. `106540352242922`).
   - `WHATSAPP_TOKEN` = **el token de acceso**.

---

## Paso 3: Webhook en tu backend (GET y POST)

Tu endpoint tiene que:

- **GET:** responder con `200` y el valor de `hub.challenge` cuando Meta envíe `hub.mode=subscribe` y `hub.verify_token` igual al tuyo.
- **POST:** recibir el JSON del webhook y responder `200` rápido.

En tu código ya tenés algo así (ejemplo):

- **URL del webhook:** `https://TU_NGROK/webhook`
- **Token de verificación:** el que usás en el código (ej. `VERIFY_TOKEN = "admin"`).

Documentación: [Create a webhook endpoint](https://developers.facebook.com/docs/whatsapp/webhooks/create-webhook-endpoint).

---

## Paso 4: Exponer el backend con ngrok

1. Instalá ngrok: https://ngrok.com (descarga o `choco install ngrok` / `brew install ngrok`).
2. En una terminal, ejecutá tu backend (ej. `uvicorn main:app --reload --port 8000`).
3. En **otra** terminal:  
   `ngrok http 8000`  
   (o el puerto donde corra tu app).
4. Copiá la URL **HTTPS** que te da ngrok (ej. `https://abc123.ngrok-free.app`).  
   La URL del webhook será: **`https://TU_URL_NGROK/webhook`**.

---

## Paso 5: Configurar el webhook en Meta (Callback URL y Verify token)

1. En **https://developers.facebook.com/apps** → tu app → **WhatsApp** → **Configuración** (o **Configuration**).
2. En la sección **Webhook**:
   - **Callback URL:** `https://TU_URL_NGROK/webhook` (la de ngrok + `/webhook`).
   - **Verify token:** el mismo que en tu código (ej. `admin`).
3. Clic en **Verificar y guardar** (o **Verify and save**). Meta hace un GET a tu URL; si tu backend responde 200 con el `hub.challenge`, queda verificado.
4. Si falla: revisá que ngrok esté corriendo, que la URL sea HTTPS y que el token coincida exactamente.

Documentación: [Set up webhooks - Configure webhooks](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks#configure-webhooks) (y el enlace interno a [configure webhooks](https://developers.facebook.com/docs/whatsapp/webhooks/create-webhook-endpoint#configure-webhooks)).

---

## Paso 6: Suscribir el campo `messages`

1. En la misma pantalla de **WhatsApp** → **Configuración**, después de verificar el webhook deberían aparecer **Campos** (Fields) para suscribirse.
2. Suscribite al campo **`messages`** (mensajes entrantes y estados de los enviados). Sin esto, Meta no te envía los POST cuando alguien te escribe.
3. Referencia de webhooks: [Webhooks - Fields](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks#fields), [messages](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/reference/messages).

---

## Paso 7: Poner la app en modo Live (importante)

1. En el panel de la app, arriba suele haber un selector **Modo de desarrollo** / **Development** vs **Activo** / **Live**.
2. Pasá la app a **Live** (Activo). Según Meta, **algunos webhooks no se envían si la app está en Dev**.
3. Documentación: [Webhooks - Troubleshooting](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks#troubleshooting).

---

## Paso 8: Probar el flujo completo (vos escribís primero)

1. **Backend** corriendo (ej. `uvicorn main:app --reload --port 8000`).
2. **ngrok** corriendo con la misma URL que configuraste en Meta.
3. Desde **tu WhatsApp personal**, escribile **al número de negocio** (el que muestra Meta en API Setup, con código de país). Ej: "Hola".
4. En la terminal del backend deberías ver algo como: "Mensaje recibido desde Meta" y "Mensaje enviado vía Meta".
5. En tu teléfono deberías recibir la respuesta del bot.

Si **no** ves "Mensaje recibido desde Meta": el webhook no está llegando (URL, token, app en Live, campo `messages` suscrito, ngrok estable).  
Si ves "Mensaje enviado vía Meta" pero **no te llega** el mensaje: revisá formato del número (código de país sin `+`, ej. Argentina `54911XXXXXXXX`) y que el token y el Phone Number ID sean los correctos.

---

## Paso 9: Formato del número para enviar (API y panel)

- En la API, el campo `to` va **sin** el símbolo `+`: solo dígitos con código de país.  
  Ejemplo Argentina: `54911XXXXXXXX`.  
- Referencia: [Text messages](https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages), [Send messages](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages).

Si usás el botón **"Enviar mensaje de prueba"** del panel, usá el mismo formato (número con código de país, sin `+`). Aun así, el flujo más fiable es: **vos primero escribís al bot** y después probás ese botón si querés.

---

## Paso 10: Resumen de comprobaciones si sigue sin llegar

- [ ] App en **Live** (no Development).
- [ ] Webhook **verificado** (Callback URL + Verify token) y URL estable (ngrok corriendo).
- [ ] Campo **`messages`** suscrito en la configuración del webhook.
- [ ] `.env` con credenciales Meta: `WHATSAPP_PHONE_ID`, `WHATSAPP_TOKEN`.
- [ ] **Vos escribís primero** desde tu WhatsApp al número del bot.
- [ ] Número en formato internacional sin `+` (ej. `54911XXXXXXXX`).
- [ ] Backend responde 200 al POST del webhook y no tarda mucho (timeout).

Con esto tenés todo el camino hecho paso a paso y con los enlaces oficiales. Si en algún paso puntual querés profundizar (por ejemplo solo el GET del webhook o solo el POST), se puede bajar al detalle de ese paso solo.
