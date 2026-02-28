import React from 'react';

export default function Privacy() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#e5e5e5', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>

        <div style={{ marginBottom: 48 }}>
          <a href="/" style={{ color: '#888', fontSize: 14, textDecoration: 'none' }}>← Vertical</a>
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Política de Privacidad</h1>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 48 }}>Última actualización: febrero 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>1. Quiénes somos</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7 }}>
              Vertical es una plataforma de automatización de comunicación empresarial vía WhatsApp. Operamos asistentes de inteligencia artificial en nombre de empresas (nuestros clientes) para atender consultas de sus usuarios finales.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>2. Datos que recopilamos</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7, marginBottom: 12 }}>
              Cuando un usuario final interactúa con un asistente de Vertical a través de WhatsApp, recopilamos:
            </p>
            <ul style={{ color: '#aaa', lineHeight: 2, paddingLeft: 24 }}>
              <li>Número de teléfono de WhatsApp</li>
              <li>Contenido de los mensajes enviados al asistente</li>
              <li>Información proporcionada voluntariamente durante la conversación (nombre, preferencias, consultas)</li>
              <li>Fecha y hora de las interacciones</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>3. Cómo usamos los datos</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7 }}>
              Los datos recopilados se utilizan exclusivamente para: operar y mejorar el asistente de IA, permitir a la empresa cliente gestionar y dar seguimiento a las consultas recibidas, y generar análisis agregados y anónimos sobre el uso del servicio. No vendemos ni compartimos datos personales con terceros para fines de marketing.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>4. Servicios de terceros</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7 }}>
              Nuestra plataforma utiliza la API de WhatsApp Business de Meta Platforms, Inc. para la entrega de mensajes, y modelos de lenguaje de OpenAI para el procesamiento de consultas. Estos servicios cuentan con sus propias políticas de privacidad y tratamiento de datos.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>5. Retención de datos</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7 }}>
              Los datos de conversación se conservan mientras la relación comercial con el cliente esté activa. Ante solicitud expresa, procedemos a la eliminación de los datos del usuario final en un plazo de 30 días hábiles.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>6. Derechos del usuario</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7 }}>
              Los usuarios finales tienen derecho a acceder, rectificar o solicitar la eliminación de sus datos personales. Para ejercer estos derechos, pueden contactarnos en la dirección de correo indicada a continuación.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>7. Seguridad</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7 }}>
              Implementamos medidas técnicas y organizativas para proteger los datos contra acceso no autorizado, pérdida o alteración. El acceso a los datos está restringido al personal autorizado y a los clientes propietarios de cada cuenta.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 12 }}>8. Contacto</h2>
            <p style={{ color: '#aaa', lineHeight: 1.7 }}>
              Para consultas sobre esta política o el tratamiento de datos personales, escribinos a{' '}
              <a href="mailto:hola@somosvertical.ar" style={{ color: '#888', textDecoration: 'underline' }}>
                hola@somosvertical.ar
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
