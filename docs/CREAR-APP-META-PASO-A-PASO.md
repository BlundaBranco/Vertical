# Crear la app en Meta for Developers — qué poner en cada pantalla

Guía para crear la app de nuevo, con nombre que sirva para WhatsApp (MVP) y después Facebook e Instagram.

---

## Nombre propuesto para la app: **Conversa**

- Corto, en español, suena a “conversación”.
- Sirve para WhatsApp ahora y para mensajes en Facebook e Instagram después.
- No dice solo “WhatsApp”, así que escala bien a varios canales.

Si preferís otro estilo, alternativas: **Conversa AI**, **Mensajeo**, **Conecta**.

---

## Antes de “Agregar casos de uso”: Detalles de la app (paso 1)

Ahí suelen pedir **nombre de la app**. Usá:

- **Nombre de la app:** `Conversa`  
  (o `Conversa AI` si querés dejar claro que es con IA).

No hace falta que diga “WhatsApp”; después se agrega el producto WhatsApp en los casos de uso.

---

## Pantalla 1 — “Agregar casos de uso” (segunda imagen: lista con íconos)

En **Filtrar por** podés elegir **“Mensajes comerciales (3)”** para ver solo los de mensajería.

**Marcá solo estos (MVP + futuro):**

| Opción | ¿Marcar? | Motivo |
|--------|----------|--------|
| **Conectarte con los clientes a través de WhatsApp** | ✅ Sí | Es el MVP: chatbot por WhatsApp. |
| **Interactuar con los clientes en Messenger from Meta** | ✅ Sí | Para conectar Facebook después. |
| **Administrar mensajes y contenido en Instagram** | ✅ Sí | Para conectar Instagram después. |
| **Autenticar y solicitar datos a usuarios con el inicio de sesión con Facebook** | ✅ Opcional | Útil si más adelante usás “Login with Facebook” (Embedded Signup, etc.). Podés agregarlo después. |
| El resto (anuncios, catálogos, juegos, Threads, etc.) | ❌ No | No hace falta para el MVP ni para mensajes. |

Resumen: **marcar al menos estas 3:**  
1) Conectarte con los clientes a través de WhatsApp  
2) Interactuar con los clientes en Messenger from Meta  
3) Administrar mensajes y contenido en Instagram  

Continuar / Siguiente.

---

## Pantalla 2 — “Crea un portfolio comercial” (tercera imagen: formulario)

Si Meta te pide crear un **portfolio comercial** (business portfolio), completá así:

| Campo | Qué poner |
|--------|-----------|
| **Nombre del portfolio comercial** | `Conversa` (o el nombre público de tu negocio, sin caracteres raros). Debe coincidir con el nombre que querés que se vea en Meta. |
| **Nombre** | Tu nombre de pila (ej. el que usás en el DNI). |
| **Apellido** | Tu apellido. |
| **Correo electrónico del negocio** | Un email que revises (ej. tu Gmail o uno del negocio). Lo usa Meta para contactarte; los clientes no lo ven. |

- Aceptar la política de privacidad si está la casilla.
- **Crear portfolio**.

---

## Después de crear la app

1. En el panel de la app, ir a **WhatsApp** → **Configuración** o **API Setup** y seguir la guía de número + webhook (`docs/GUIA-META-API-PASO-A-PASO.md`).
2. Nombre de la app en el dashboard ya queda como **Conversa** (o el que hayas elegido).

---

## Resumen rápido

- **Nombre de la app:** `Conversa` (o `Conversa AI`).
- **Casos de uso:** marcar **WhatsApp**, **Messenger** y **Instagram** (y opcional Facebook Login).
- **Portfolio:** nombre `Conversa`, tu nombre, apellido y email de contacto.

Con eso la app queda lista para WhatsApp en el MVP y preparada para sumar Facebook e Instagram después.
