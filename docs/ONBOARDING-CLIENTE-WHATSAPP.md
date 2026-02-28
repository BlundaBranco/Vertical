# Cómo registra el cliente su número (API oficial Meta) y Coexistence

Documento interno: flujos de onboarding para que tus clientes conecten su WhatsApp al bot, de la forma más fácil posible. Este proyecto usa **solo API oficial de Meta** (WhatsApp Cloud API). Las menciones a Twilio que puedan quedar en el documento son referencia histórica; el código y el resto de la documentación ya no usan Twilio.

---

## Resumen: Partner, API oficial y Coexistence

### 1) ¿Qué es ser "partner" de Meta?

Meta tiene un **ecosistema de socios** para WhatsApp Business. No es una sola cosa:

| Tipo | Qué es | Qué te permite |
|------|--------|------------------|
| **Proveedor de tecnología (Tech Provider)** | Desarrollador que crea soluciones sobre la plataforma WhatsApp Business. | Acceso directo a la API, administrar cuentas de empresas, **incorporar clientes con registro integrado (Embedded Signup)**. |
| **Socio de tecnología (Tech Partner)** | Tech Provider que sube de nivel (ej. volumen de mensajes, clientes). | Lo mismo + incentivos del programa. |
| **Socio de soluciones (Solution Partner)** | Ofrece solución integral (integración, consultoría, soporte). | Todo lo anterior + **gestionar facturación** (líneas de crédito) en nombre de las empresas. |

**"Ser partner"** = ser **Tech Provider** (o más). Para serlo:

- Crear una **app en Meta for Developers** y asociarla a un **Meta Business Portfolio**.
- Completar **verificación de negocio** en Meta.
- Seguir el proceso de Meta: [Convertirte en proveedor de tecnología](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers).

### 2) Flujo para el cliente con API oficial

- **Si NO sos partner:** El cliente va a **Meta for Developers / Business Suite**, crea WABA, agrega número, verifica (SMS/llamada). Más técnico.
- **Si SOS partner:** El cliente hace todo **dentro de tu app** (popup "Login with Facebook" → Embedded Signup), sin ir a Meta a mano.

### 3) ¿El flujo fácil (Embedded Signup / QR) se puede sin ser partner?

**No.** El registro integrado (Embedded Signup) y el flujo "conectar WhatsApp en un clic / popup / QR" son **solo para partners** (Tech Provider o Solution Partner) de Meta. Sin eso, el cliente tiene que registrar el número a mano en Meta (Business Suite / Developers).

**Con API oficial:** Si vos sos **Tech Provider (o Solution Partner) de Meta**, implementás Embedded Signup (y, si aplica, Coexistence) directo con Meta.

### 4) ¿Para usar Coexistence hay que ser partner de Meta?

**Sí.** Coexistence (usar el mismo número en WhatsApp Business App y en la API) es un **flujo personalizado de Embedded Signup**. Solo está disponible para **Tech Providers** o **Solution Partners** de Meta.

Si no sos partner, **no podés ofrecer Coexistence** a tus clientes. Solo podés flujos donde el número se registra "nuevo" (verificación por SMS/llamada) en Meta.

---

## 1) API oficial de Meta: cómo registra el cliente su número

### Con API oficial de Meta (cliente con su propio número)

- **Quién inicia:** El cliente (o vos, si tenés un flujo propio).
- **Dónde:** 
  - **Opción A (sin ser partner):** Meta for Developers / Business Suite: crear WABA, agregar número, verificar (SMS/llamada). Más técnico.
  - **Opción B (siendo partner):** **Embedded Signup** dentro de tu app: el cliente hace todo desde tu producto (popup de Meta), sin ir a Meta a mano.
- **Qué hace el cliente (idea general):**
  - **Número nuevo:** Crear WABA, agregar número, recibir código por SMS/llamada, verificar.
  - **Número que ya usa en WhatsApp Business App:** Flujo **Coexistence**: conectar esa cuenta a la API (ej. escanear QR y dar permisos) — sigue usando el mismo número en la app y en el bot.
- **Resultado:** WABA ID, Phone Number ID y token; vos usás la Cloud API con esos datos.

### ¿Es “igual” en Twilio y en API oficial?

- **No es igual** en la interfaz y el lugar:
  - **Twilio:** flujo en consola Twilio (o por Senders API); Twilio abstrae parte de Meta.
  - **API oficial:** flujo en Meta (o en tu app vía Embedded Signup si sos partner).
- **Sí es parecido** en lo que pide Meta: negocio, número, verificación. Para **máxima facilidad** (todo en tu producto, mínimo pasos, posible Coexistence), la opción más fuerte es **API oficial + ser Tech/Solution Partner** y usar **Embedded Signup** (y Coexistence cuando el cliente ya tiene WhatsApp Business).

---

## 2) Coexistence: cómo se vincula el bot a ese número (qué hace el cliente y qué hacés vos)

Con **Coexistence**, el cliente **sigue usando su número en WhatsApp Business** y **a la vez** ese número lo usa tu bot vía API. No tiene que “soltar” la app.

### Qué hace el cliente (pasos típicos, estilo Embedded Signup con Coexistence)

1. En **tu** app/dashboard: “Conectar mi WhatsApp” (o similar).
2. Se abre el flujo de Meta (popup/iframe) y elige **“Conectar mi WhatsApp Business App existente”**.
3. En la pantalla de Meta le aparece un **QR** y una explicación (compartir contacto/chats para la migración).
4. En su **teléfono**, abre **WhatsApp Business** y recibe un mensaje con:
   - Código de confirmación, y
   - Opción **“Escanear código QR”**.
5. Escanea el **QR** desde WhatsApp Business (desde ese mensaje o desde ajustes, según lo que muestre Meta).
6. En la app le pide **permiso para compartir historial de chats** con tu negocio; acepta.
7. Meta termina el enlace: ese número queda conectado a la **Cloud API** y a la vez sigue en la **app**. Tu backend recibe el `code` (y después WABA ID, Phone Number ID, etc.).

Resumen para el cliente: **entra a tu producto → “Conectar WhatsApp” → elige “usar mi número de WhatsApp Business” → escanea QR desde la app → acepta compartir historial → listo.** Sigue usando el número en la app y el bot lo usa por API.

### Qué hacés vos (backend / plataforma)

Esto solo aplica si estás en el programa **Tech Provider** o **Solution Partner** de Meta (o trabajás con un BSP que ya lo tiene). Después de que el cliente completa el flujo de Embedded Signup (con Coexistence), **tu backend** debe:

1. **Intercambiar el `code`** que devuelve el popup por un **business token** del cliente (`GET /oauth/access_token` con `client_id`, `client_secret`, `code`).
2. **Obtener WABA ID y Phone Number ID** del cliente (por sesión de Embedded Signup o por API con ese token).
3. **Suscribir tu app al webhook** de ese WABA (`POST /<WABA_ID>/subscribed_apps`) para recibir mensajes en tu servidor.
4. **Compartir tu línea de crédito** con ese WABA (endpoint de credit line) para que puedan facturar mensajes.
5. **Registrar el número** para Cloud API (`POST /<PHONE_NUMBER_ID>/register` con PIN de 6 dígitos para two-step verification).

Todo esto es **server-to-server**, desde tu backend; el cliente no toca APIs. Para el cliente, la experiencia es: “Conectar WhatsApp” → QR → permisos → listo.

Si **no** sos partner de Meta, no podés ofrecer este flujo “dentro de tu app”; el cliente tendría que ir a Meta (Business Suite / developers) y hacer pasos más manuales, y después pasarte WABA ID, Phone Number ID y token (no ideal para “lo más fácil”).

---

## 3) Cómo hacerlo lo más fácil y rápido para el cliente

Ordenado de más fácil a más engorroso:

| Enfoque | Facilidad para el cliente | Qué necesitás vos |
|--------|---------------------------|--------------------|
| **Embedded Signup + Coexistence** (en tu app) | Máxima: un clic, QR desde su WhatsApp Business, un permiso. | Ser Meta Tech Provider o Solution Partner (o BSP que lo ofrezca). |
| **Embedded Signup** (número nuevo, sin Coexistence) | Muy buena: todo en popup en tu app, sin ir a Meta. | Ser partner Meta (o BSP). |
| **Twilio Self Sign-up** (número del cliente) | Media: flujo en Twilio Console, el cliente (o vos) sigue los pasos de Twilio/Meta. | Cuenta Twilio; el cliente necesita Meta Business y verificación. |
| **Meta directo sin partner** (Business Suite / Developers) | Más técnica: el cliente entra a Meta, crea WABA, agrega número, verificación, y te pasa IDs/token. | Solo app en Meta for Developers; no hace falta ser partner. |

Recomendación para “lo más fácil y rápido”:

- **Objetivo:** Que el cliente registre su número con pocos clics, preferentemente sin salir de tu producto, y si ya usa WhatsApp Business que pueda seguir usándolo (Coexistence).
- **Camino:** Apuntar a **API oficial de WhatsApp** y, cuando puedas, al programa **Tech Provider / Solution Partner** de Meta para usar **Embedded Signup** y, para números ya usados en WhatsApp Business, el flujo **Coexistence** (conectar con QR desde la app).
- Mientras tanto: podés usar **Twilio** para MVP (incluso con número compartido de prueba) y, para clientes que quieran su número, guiarlos con un wizard que explique Twilio Self Sign-up paso a paso; o un flujo manual con Meta (crear WABA, verificar número, pegar en tu dashboard WABA ID, Phone Number ID y token).

Resumen de preguntas directas:

1. **¿Twilio o API oficial cambia cómo registra el cliente?** Sí: con Twilio el flujo es vía Twilio (Consola/API); con API oficial es vía Meta (o vía tu app si sos partner). En ambos casos Meta pide negocio y verificación si el cliente usa su propio número.
2. **¿Cómo se vincula el bot al número con Coexistence?** El cliente: en tu app → “Conectar WhatsApp” → elegir “mi WhatsApp Business” → escanear QR desde la app → aceptar compartir historial. Vos: ser partner y en backend intercambiar `code` por token, suscribir webhooks, compartir crédito, registrar número (todo por API).
3. **¿Cómo que sea lo más fácil?** Usar **API oficial + Embedded Signup (y Coexistence cuando aplique)**, lo que implica ser **Tech/Solution Partner** de Meta (o integrarte con un BSP que ya lo sea).

---

## Verificación Meta y Coexistence (detalle)

### 1) Verificación de negocio en Meta: qué piden y quién aprueba

**Qué te piden exactamente**

- **Datos del negocio** en Meta Business Suite (Centro de seguridad): nombre legal, dirección, teléfono, sitio web. Deben coincidir **exactamente** con la entidad legal.
- **Documentos oficiales** (si no encuentran coincidencia automática): por ejemplo licencia de negocio, acta de constitución / certificado de incorporación, factura de servicios (para dirección/teléfono). Meta recomienda 2–3 documentos.
- **Método de confirmación**: email, teléfono, SMS, mensaje por WhatsApp o **verificación por dominio** (archivo o DNS en tu web).

**Qué debe tener tu negocio para ser aprobado**

- Ser una entidad legal (empresa, autónomo según el país).
- Que los datos en Business Manager coincidan con los documentos.
- Sitio web accesible y, si aplica, HTTPS.
- Control total del Business Portfolio (quien verifica debe ser admin).

**¿Lo aprueba un humano o una IA?**

Meta no lo especifica por producto. En la práctica suelen combinar **revisión automatizada** (datos, documentos, dominio) y **revisión humana** cuando hace falta. La decisión puede tardar **hasta 14 días laborables** (o más según región). Si trabajás con un Solution Partner, existe “Partner-led verification”, que puede ser más rápida.

### 2) Si usás Twilio, ¿el cliente puede poner el bot en su mismo número (Coexistence)?

**Coexistence** = mismo número en WhatsApp Business App y en la API (bot) a la vez. Es una función **de Meta**; Twilio es un BSP que usa la API de Meta.

En la documentación pública del **Tech Provider de Twilio** no aparece explícitamente el flujo “Coexistence”. El flujo que describen es Embedded Signup con verificación por **OTP** (número “nuevo” para la API). Twilio sí tiene una sección en el FAQ sobre **“use an already registered phone number”**; el detalle no está claro en la doc pública.

**Conclusión:** Con Twilio **sí** podés tener un bot en el número del cliente; si ese número ya está en WhatsApp Business App, no está documentado de forma explícita que Twilio ofrezca Coexistence a ISVs. **Preguntar a Twilio** (soporte o cuenta) si soportan Coexistence. BSPs como **360Dialog** sí documentan Coexistence explícitamente.

### 3) Si sos “partner de Twilio” (ISV), ¿ya podés hacer el flujo fácil? ¿Qué te piden?

**“Partner de Twilio”** = entrar al **WhatsApp Tech Provider Program** como **ISV**.

**Sí:** una vez en el programa y con **Embedded Signup** integrado en tu app, tus clientes hacen el **flujo fácil** (botón “Login with Facebook” en tu producto → popup de Meta → crear/elegir WABA, verificar número con OTP si no es número Twilio asignado por vos → listo).

**Qué te piden para entrar (resumen)**

1. **Crear una app en Meta** y que Meta la apruebe (App Review para permisos `whatsapp_business_messaging` y `whatsapp_business_management`).
2. **Crear un Meta Business Portfolio** (business.facebook.com) y tener control total.
3. **Registrar al menos un WhatsApp Sender para tu ISV** con [WhatsApp Self Sign-up](https://www.twilio.com/docs/whatsapp/self-sign-up) (número de tu empresa).
4. **Completar el formulario** de Twilio: [WhatsApp Tech Provider program request form](https://www.twilio.com/whatsapp/tech-provider-program).
5. **Activar 2FA** en Meta Business Manager.
6. **Completar verificación de negocio** en Meta.
7. **Aceptar la “Partner Solution”** que Twilio te envía en el dashboard de Meta.

Los pasos 1 y 2 suelen tardar **3–4 semanas**. Después Twilio te envía la Partner Solution; vos aceptás y desarrollás la integración de Embedded Signup en tu app.

### 4) ¿Podés usar Coexistence si sos partner de Twilio (ISV)?

**En la documentación pública del Tech Provider de Twilio no se menciona Coexistence** para ISVs. El flujo que describen es Embedded Signup estándar (número nuevo o asignado por vos, verificación por OTP).

**Recomendación:** preguntar directamente a Twilio (soporte o Channel Operations una vez en el programa) si ofrecen el flujo de **Coexistence**. Si no, y si Coexistence es clave, valorar API oficial como Tech Provider de Meta o un BSP que documente Coexistence (ej. 360Dialog).

---

## Emprendedor joven / sin empresa formal (Argentina y similar)

### 1) ¿Hay que "registrar el negocio" en algún lado? ¿Impuestos? ¿Dirección de mi casa?

**Para Meta (que te aprueben como partner)**

- **No hace falta tener una sociedad (S.A., S.R.L.)**. Meta acepta **persona física** y **único propietario / freelancer**. Podés usar:
  - **Nombre del “negocio”:** tu nombre y apellido, o un nombre comercial (ej. “Ventra AI”).
  - **Dirección:** la de tu casa sirve como dirección del negocio para muchos emprendedores y freelancers; Meta no exige oficina comercial.
  - **Documentos:** según el caso, Meta puede pedir documentos que **prueben identidad y/o dirección**: DNI, factura de un servicio (luz, gas, internet) a tu nombre y dirección, licencia de conducir, etc. A veces aceptan identificación personal si operás como único propietario.
- **No te piden** que demuestres que pagás impuestos ni que tengas CUIT/CUIL para la verificación de negocio. Eso es aparte (Argentina).

**Para vender en serio en Argentina (tema legal/fiscal)**

- **Sí conviene estar en regla.** Si cobrás por el chatbot, en Argentina lo habitual es:
  - **Monotributo:** régimen simple para facturar hasta cierto monto al año. No es “registrar una empresa”; es inscribirte como monotributista (persona física) en AFIP.
  - **Facturación:** emitir factura por los servicios (podés usar el Facturador de AFIP / ARCA).
- Impuestos los pagás según tu categoría de monotributo (un pago mensual que incluye IVA, ganancias, jubilación, obra social en un solo monto). No es que “Meta o Twilio te cobren impuestos”; es tu obligación fiscal en Argentina.
- Si no sabés por dónde arrancar: un contador o el sitio de AFIP (monotributo, facturación) te orientan en poco tiempo. Para **solo** que Meta/Twilio te aprueben, no te piden comprobantes fiscales.

**Resumen:** Para ser partner en Meta/Twilio podés usar tu nombre, tu casa como dirección y documentos personales/de domicilio. Para vender en Argentina en regla, lo normal es monotributo + facturar; eso es independiente de la aprobación de Meta/Twilio.

### 2) ¿Qué tan complicado es que aprueben? ¿Qué piden exactamente Meta y Twilio?

**Nivel de dificultad**

- **No publican tasas de rechazo.** No es “imposible”, pero tampoco es automático: hay que completar todo bien (app, documentos, políticas).
- **Meta:** rechazan si la app está incompleta, falta política de privacidad, uso incorrecto de logos de Meta/WhatsApp, o si la verificación de negocio no cuadra (datos que no coinciden con los documentos). Si seguís las guías y tenés documentos claros (nombre, dirección, identidad), es factible.
- **Twilio (ISV):** el “filtro” fuerte es el mismo: **Meta tiene que aprobar tu app y tu verificación de negocio**. Twilio después te pide el formulario, 2FA, aceptar la Partner Solution. Es decir: lo más exigente es el lado de Meta; Twilio suma pasos administrativos.

**Qué piden exactamente**

| Quién | Qué piden |
|-------|------------|
| **Meta (verificación de negocio)** | Datos en Business Suite: nombre legal (o tu nombre), dirección, teléfono, web. Documentos que validen nombre y/o dirección (según lo que pidan): DNI, factura de servicio, licencia, etc. Método de confirmación: email, teléfono, SMS, WhatsApp o verificación por dominio. |
| **Meta (App Review)** | App creada en Meta for Developers, producto WhatsApp agregado, política de privacidad accesible (URL pública), ícono sin logos de Meta/WhatsApp. Permisos `whatsapp_business_messaging` y `whatsapp_business_management` con justificación y, a veces, video mostrando envío de mensaje y creación de plantilla. Respuestas a preguntas de uso de datos. |
| **Twilio (Tech Provider / ISV)** | Todo lo de Meta (app aprobada + negocio verificado) + Meta Business Portfolio + al menos un WhatsApp Sender registrado por Self Sign-up (número de “tu empresa”) + formulario de Twilio + 2FA en Meta + aceptar la Partner Solution que Twilio te envía. |

**Orden práctico:** Crear Meta Business Portfolio → crear app en Meta for Developers → agregar WhatsApp y completar pasos de Tech Provider en la app → verificación de negocio en Meta (con tu nombre, domicilio, documentos) → App Review (permisos + videos + políticas) → mientras tanto o después, formulario Twilio → aceptar Partner Solution → integrar Embedded Signup en tu app.

---

## Partner Twilio: Coexistence, “huevo y gallina” con Meta, y Twilio vs Meta

### 1) Si soy partner de Twilio, ¿mis clientes pueden usar el mismo número del bot en su app normal de WhatsApp?

Eso es **Coexistence**: mismo número en WhatsApp Business App (uso normal) y en la API (bot) a la vez.

**En la documentación pública del Tech Provider de Twilio no se dice que los ISVs puedan ofrecer Coexistence a sus clientes.** El flujo que Twilio describe es Embedded Signup con número **nuevo** o asignado por vos, verificación por OTP. No aparece el flujo “conectar número ya usado en WhatsApp Business App”.

Coexistence es una función **de Meta**; los BSP (como Twilio) pueden o no exponerla a sus clientes (ISVs). **Conclusión:** No está documentado que siendo partner de Twilio tus clientes puedan usar el mismo número en la app y en el bot. **Tenés que preguntar a Twilio** (soporte o Channel Operations) si ofrecen Coexistence para ISVs. Si la respuesta es no y eso es clave para vos, habría que mirar API oficial como Tech Provider de Meta o un BSP que sí documente Coexistence (ej. 360Dialog).

### 2) ¿Cómo convenzo a Meta de que me aprueben si para tener el negocio necesito la API? (huevo y gallina)

**No hay huevo y gallina.** Meta no te pide que ya tengas clientes usando la API para aprobarte. Te pide:

- **Verificación de negocio:** que demuestres que el negocio (o vos como persona física) existe: nombre, dirección, documentos. No hace falta que el “negocio” sea “Ventra ya facturando con la API”.
- **App Review:** que demuestres que tu **app puede usar** la API (enviar mensaje, crear plantilla). Para eso **Meta te da un número de prueba** cuando agregás el producto WhatsApp a tu app. Con ese número podés:
  - Desarrollar y probar tu integración.
  - Grabar el **video** que piden para App Review (enviar un mensaje desde tu app o desde Twilio Console, crear una plantilla).
  - Enviar a revisión.

Es decir: **primero** creás la app, agregás WhatsApp, **obtenés número de prueba y acceso de desarrollo**, construís el prototipo y grabás el video; **después** enviás App Review y verificación de negocio. No necesitás “tener el negocio funcionando con la API” para que te aprueben; necesitás mostrar que tu app **sabe usar** la API (con el número de prueba). La aprobación es para que luego **otros** negocios (tus clientes) puedan usar tu solución.

### 3) ¿Si apruebo en Twilio apruebo en Meta? ¿Qué ventaja tiene ser partner de Twilio sobre Meta?

**¿Aprobar en Twilio = aprobar en Meta?**

**Sí, en la práctica.** Para ser partner de Twilio (ISV del Tech Provider program) tenés que:

1. Crear una **app en Meta** y que **Meta la apruebe** (App Review).
2. Completar **verificación de negocio en Meta**.
3. Después Twilio te envía la “Partner Solution” y vos la aceptás.

O sea: **Meta ya te tuvo que aprobar** (app + negocio) para que Twilio te dé el acceso de ISV. Twilio no reemplaza la aprobación de Meta; trabaja **sobre** ella. “Aprobar en Twilio” implica que Meta ya aprobó tu app y tu negocio.

**¿Qué ventaja tiene ser partner de Twilio sobre ser partner directo de Meta?**

| | **Partner Twilio (ISV)** | **Partner Meta (Tech Provider directo)** |
|--|---------------------------|-------------------------------------------|
| **Aprobación** | Meta aprueba tu app y negocio; Twilio suma formulario y Partner Solution. | Meta aprueba tu app y negocio; no hay intermediario. |
| **Facturación / crédito** | Twilio factura a tus clientes (o a vos) y paga a Meta. No tenés que gestionar línea de crédito con Meta. | Si sos Tech Provider directo, en algún momento podés necesitar gestionar crédito/facturación con Meta (o trabajar con un Solution Partner). |
| **API que usás** | API de **Twilio** (Senders, mensajes, etc.). No llamás a la API de Meta directamente para onboarding/mensajes. | Llamás a la **API de Meta** (Graph API, WhatsApp Cloud API) directamente. |
| **Soporte** | Soporte de Twilio para ISVs (Channel Operations, ticket al enviar el formulario). | Soporte de Meta (documentación, negocio, desarrolladores). |
| **Coexistence** | No está documentado que Twilio ofrezca Coexistence a ISVs; hay que preguntar. | Si sos Tech Provider de Meta, podés implementar el flujo Coexistence (Embedded Signup custom) según la doc de Meta. |
| **Costo** | Pagás a Twilio (Twilio paga a Meta); suele haber margen de Twilio sobre el costo de Meta. | Pagás directo a Meta (o a un Solution Partner si delegás facturación); en general sin margen de BSP. |

**Resumen:** La ventaja de Twilio es **simplificación**: facturación y relación con Meta pasan por Twilio; usás la API de Twilio. La ventaja de Meta directo es **control y, si aplica, Coexistence** documentado; en contrapartida, más gestión (app, permisos, posiblemente facturación/crédito).
