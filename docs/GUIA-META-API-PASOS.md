# Guía simple: conectar Meta (WhatsApp Cloud API) y que te lleguen los mensajes

Para hacer el MVP o las pruebas con la API de Meta y después pedir aprobación como partner. Resumido y sin vueltas.

---

## Por qué decía "Enviado" y no te llegaba nada

Las causas más comunes son estas:

1. **Webhook en localhost**  
   Meta tiene que llamar a tu servidor (POST a `/webhook`) cuando alguien te escribe. Si tu URL era `http://localhost:8000/webhook`, Meta no puede entrar a tu PC. Tiene que ser una URL **pública** (ej. con **ngrok**).

2. **Regla de las 24 horas**  
   Para enviar un mensaje de **texto libre** a un usuario, ese usuario **tiene que haberte escrito primero** en las últimas 24 h. Si solo apretaste "Enviar mensaje de prueba" desde el panel de Meta hacia tu número, sin que tu número le hubiera escrito antes al bot, a veces la API responde "enviado" pero Meta no entrega el mensaje (o solo en ciertos modos de prueba). Lo que sí funciona siempre para probar: **vos primero escribís desde tu WhatsApp al número del bot** → se abre la ventana de 24 h → ahí tu backend responde y deberías recibir la respuesta.

3. **Número al que enviás**  
   El número tiene que estar en formato internacional **sin +** (ej. Argentina: `54911XXXXXXXX`). Si faltaba código de país o estaba mal, puede fallar en silencio.

---

## Qué hacer, en orden (resumido)

### 1. App y número en Meta (si ya lo tenés, revisalo)

- Entrá a [developers.facebook.com](https://developers.facebook.com) → **Mis aplicaciones** → tu app.
- **WhatsApp** → **Configuración de API** (o API Setup).
- Ahí tenés (o agregás) el **número de teléfono de negocio** (el que recibe y envía). Si Meta te dio un número de prueba, usá ese.
- Anotá:
  - **ID del número de teléfono** (Phone Number ID) → va en `WHATSAPP_PHONE_ID` en el `.env`.
  - **Token de acceso** (temporal o el que uses) → va en `WHATSAPP_TOKEN`.

### 2. Webhook público (obligatorio para que Meta te llame)

Meta no puede llamar a `localhost`. Tenés que exponer tu backend con una URL pública.

- Opción fácil: **[ngrok](https://ngrok.com)**.  
  - Instalá ngrok.  
  - En una terminal: `ngrok http 8000` (o el puerto donde corre tu FastAPI).  
  - Te da una URL tipo `https://abc123.ngrok.io`.  
- **URL del webhook:**  
  `https://TU_URL_DE_NGROK/webhook`  
  Ejemplo: `https://abc123.ngrok.io/webhook`.

En Meta:

- **WhatsApp** → **Configuración** → **Webhook** (o API Setup → Webhook).
- **URL de callback:** pegá `https://TU_URL_DE_NGROK/webhook`.
- **Token de verificación:** el mismo que en tu código. En tu `main.py` está `VERIFY_TOKEN = "admin"`, entonces en Meta poné `admin`.
- Guardar. Meta hace un GET a esa URL con `hub.verify_token`; si coincide, queda verificado.

### 3. Flujo de prueba que sí funciona

1. **Backend corriendo** (ej. `uvicorn main:app --reload --port 8000`).
2. **ngrok corriendo** apuntando a ese puerto y **webhook configurado en Meta** con la URL de ngrok.
3. Desde **tu WhatsApp personal**, escribile **al número de negocio** (el de Meta). Un mensaje cualquiera, ej: "Hola".
4. Meta hace POST a `https://TU_NGROK/webhook` con el mensaje. Tu código procesa y llama a `send_whatsapp_message(num, ai_response)`.
5. Si todo está bien (token, Phone ID, número en formato correcto), **te tiene que llegar la respuesta del bot** en tu WhatsApp.

Si no llega: mirá la terminal del backend; si ves "📩 Mensaje recibido desde Meta" y "✅ Mensaje enviado vía Meta", el fallo puede ser formato de número o regla de 24 h. Si no ves "Mensaje recibido desde Meta", el webhook no está llegando (revisar URL, ngrok, token de verificación).

### 4. "Enviar mensaje de prueba" en el panel de Meta

Ese botón envía **desde** el número de negocio **hacia** un número que vos ponés. Para que te llegue:

- Número en formato internacional sin + (ej. `54911XXXXXXXX`).
- A veces en desarrollo solo reciben números que previamente **le escribieron al bot** (ventana de 24 h). Por eso el flujo seguro es: **vos primero escribís al bot**, después probás enviar desde el panel si quieres.

### 5. Después: para que te aprueben como partner

- **Verificación de negocio:** nombre, dirección (puede ser tu casa), documentos que pida Meta (DNI, factura de servicio, etc.).
- **App Review:** video mostrando que tu app **envía un mensaje** por WhatsApp y **crea una plantilla**. Podés usar el número de prueba de Meta y tu propio número (después de que vos le escribas al bot) para el video.
- No hace falta tener clientes pagando; hace falta mostrar que la app **usa** la API (envío + plantilla) con el número de prueba.

---

## Checklist rápido

- [ ] App en Meta for Developers con producto WhatsApp.
- [ ] Número de negocio (Phone Number ID) y token en `.env` (`WHATSAPP_PHONE_ID`, `WHATSAPP_TOKEN`).
- [ ] Backend corriendo; ngrok abierto con URL pública.
- [ ] Webhook en Meta: URL = `https://TU_NGROK/webhook`, token de verificación = `admin`.
- [ ] **Vos escribís primero** desde tu WhatsApp al número del bot.
- [ ] Revisar en la terminal que aparezca "Mensaje recibido desde Meta" y "Mensaje enviado vía Meta"; si aparece y no llega, revisar formato del número (código de país sin +).

Con esto deberías poder usar la API de Meta para el MVP y para las pruebas que piden para aprobarte como partner.
