import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata = {
  title: "Aviso de Privacidad | BRAVÍO",
  description: "Aviso de Privacidad de BRAVÍO Western. Conoce cómo protegemos y tratamos tus datos personales conforme a la LFPDPPP.",
};

const SECCIONES = [
  {
    titulo: "Identidad y domicilio del Responsable",
    contenido: `BRAVÍO Western (en adelante "BRAVÍO"), con domicilio en León, Guanajuato, México, es el responsable del tratamiento de sus datos personales conforme a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.`,
  },
  {
    titulo: "Datos personales que recabamos",
    contenido: `BRAVÍO podrá recabar los siguientes datos personales:

• Nombre completo
• Correo electrónico
• Número de teléfono o WhatsApp
• Dirección de entrega (para pedidos)
• Ciudad, estado y código postal
• Información de pago (procesada por terceros certificados; BRAVÍO no almacena datos de tarjeta)

No recabamos datos personales sensibles (salud, origen racial, vida sexual, creencias religiosas o políticas).`,
  },
  {
    titulo: "Finalidades del tratamiento",
    contenido: `Sus datos personales serán utilizados para las siguientes finalidades primarias, necesarias para la relación comercial:

• Procesar y gestionar sus pedidos de calzado y accesorios
• Coordinar la entrega y logística de sus compras
• Enviar confirmaciones de pedido y actualizaciones de envío
• Atender consultas, aclaraciones y solicitudes de devolución
• Dar cumplimiento a obligaciones legales y fiscales

Finalidades secundarias (puede negarse a ellas sin afectar la relación comercial):
• Envío de información sobre nuevas colecciones, promociones y eventos BRAVÍO
• Estudios de mercado e investigación de preferencias de cliente`,
  },
  {
    titulo: "Transferencia de datos",
    contenido: `BRAVÍO podrá transferir sus datos personales a terceros en los siguientes casos:

• Empresas de paquetería y logística, para gestionar la entrega de sus pedidos
• Procesadores de pago (Stripe, MercadoPago u otros), para procesar transacciones de forma segura
• Autoridades competentes, cuando sea requerido por ley

No transferiremos sus datos a terceros para fines comerciales propios de éstos sin su consentimiento previo.`,
  },
  {
    titulo: "Medios para ejercer derechos ARCO",
    contenido: `Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (derechos ARCO) al tratamiento de sus datos personales. Para ejercerlos, envíe una solicitud a:

Correo: hola@braviowestern.com.mx
Asunto: Solicitud ARCO

Su solicitud deberá contener: nombre completo, datos de contacto, descripción del derecho que desea ejercer y copia de identificación oficial. Responderemos en un plazo máximo de 20 días hábiles.`,
  },
  {
    titulo: "Uso de cookies y tecnologías de rastreo",
    contenido: `Nuestro sitio web braviowestern.com.mx puede utilizar cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el tráfico y personalizar contenido. Usted puede deshabilitar las cookies desde la configuración de su navegador, aunque esto podría afectar algunas funcionalidades del sitio.`,
  },
  {
    titulo: "Cambios al aviso de privacidad",
    contenido: `BRAVÍO se reserva el derecho de modificar el presente aviso de privacidad en cualquier momento. Los cambios serán notificados a través de nuestro sitio web braviowestern.com.mx o por correo electrónico cuando la modificación sea significativa. Le recomendamos revisarlo periódicamente.`,
  },
  {
    titulo: "Contacto",
    contenido: `Si tiene dudas sobre el presente aviso de privacidad o sobre el tratamiento de sus datos, puede contactarnos:

Correo: hola@braviowestern.com.mx
WhatsApp: +52 (477) 729-6578
Ubicación: León, Guanajuato, México`,
  },
];

export default function AvisoDePrivacidadPage() {
  const fechaActualizacion = "Septiembre 2026";

  return (
    <div className="min-h-screen" style={{ background: "#F5F0EA", paddingTop: "72px" }}>

      {/* Hero */}
      <div style={{
        background: "#0F0C09",
        borderBottom: "1px solid #3E342D",
        padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 5rem)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <CruzDeHierro size={16} color="#5E1C23" />
            <span style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#849AAD" }}>
              Legal
            </span>
          </div>
          <h1 style={{
            fontFamily: "ArchivoBlack, sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#B1C7D4",
            marginBottom: "1.5rem",
          }}>
            Aviso de<br />Privacidad.
          </h1>
          <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "0.9rem", color: "#849AAD", letterSpacing: "0.05em" }}>
            Última actualización: {fechaActualizacion}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 5rem)" }}>

        {/* Intro */}
        <p style={{
          fontFamily: "SpaceGrotesk, sans-serif",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "#3E342D",
          marginBottom: "4rem",
          paddingBottom: "3rem",
          borderBottom: "2px solid #5E1C23",
        }}>
          En <strong>BRAVÍO Western</strong> respetamos su privacidad y nos comprometemos a proteger sus datos personales conforme a la{" "}
          <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP) y demás normatividad aplicable en México.
        </p>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {SECCIONES.map((seccion, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid #C8B89A",
                padding: "3rem 0",
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "3rem",
              }}
              className="privacy-section"
            >
              <div>
                <span style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD", display: "block", marginBottom: "0.5rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 style={{
                  fontFamily: "ArchivoBlack, sans-serif",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                  color: "#605246",
                  lineHeight: 1.3,
                }}>
                  {seccion.titulo}
                </h2>
              </div>
              <div>
                {seccion.contenido.split("\n").map((linea, j) => (
                  linea.trim() === "" ? (
                    <div key={j} style={{ height: "1rem" }} />
                  ) : (
                    <p key={j} style={{
                      fontFamily: "SpaceGrotesk, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: 1.85,
                      color: "#3E342D",
                    }}>
                      {linea}
                    </p>
                  )
                ))}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #C8B89A" }} />
        </div>

        {/* Footer note */}
        <div style={{ marginTop: "4rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <CruzDeHierro size={24} color="#5E1C23" />
          <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "0.85rem", color: "#849AAD" }}>
            BRAVÍO Western — León, Guanajuato, México · {fechaActualizacion}
          </p>
        </div>
      </div>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 640px) {
          .privacy-section {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
