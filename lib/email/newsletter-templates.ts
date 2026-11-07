/**
 * BRAVÍO Western - Machotes de Newsletter & Email Marketing
 * Plantillas HTML profesionales, responsive y con diseño editorial de lujo western.
 */

export interface NewsletterContent {
  subject: string;
  preheader?: string;
  headline: string;
  bodyParagraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  highlightBox?: {
    badge?: string;
    code?: string;
    description?: string;
  };
  buttonText?: string;
  buttonUrl?: string;
}

export interface NewsletterPreset {
  id: string;
  name: string;
  description: string;
  category: "lanzamiento" | "promocion" | "historia" | "comunicado";
  content: NewsletterContent;
}

export const NEWSLETTER_PRESETS: NewsletterPreset[] = [
  {
    id: "lanzamiento-coleccion",
    name: "Lanzamiento & Preventa Exclusiva",
    description: "Para presentar nuevos modelos de botas, preventa de Colección Mujer o ediciones limitadas.",
    category: "lanzamiento",
    content: {
      subject: "Exclusiva para Suscriptores: Nuevo Lanzamiento BRAVÍO Western",
      preheader: "Acceso preferente antes del lanzamiento general al público.",
      headline: "EL RENACER DEL ESTILO WESTERN CONTEMPORÁNEO",
      imageUrl: "https://braviowestern.com.mx/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg",
      imageAlt: "Bota Silao Arena Gamuza - BRAVÍO Western",
      bodyParagraphs: [
        "Te presentamos en primicia nuestra más reciente creación artesanal desde nuestro taller matriz en León, Guanajuato.",
        "Construida con la legendaria costura Goodyear Welt 360°, alma de acero templado y pieles genuinas de primera selección. Diseñada para soportar el paso del tiempo y destacar en cualquier terreno.",
        "Como miembro de nuestra comunidad exclusiva, tienes 48 horas de acceso prioritario antes de que el stock limitado sea liberado al público general.",
      ],
      highlightBox: {
        badge: "ACCESO PREFERENCIAL",
        code: "PREVENTA2026",
        description: "Envío express nacional de cortesía en tu pedido de lanzamiento.",
      },
      buttonText: "EXPLORAR EL LANZAMIENTO",
      buttonUrl: "https://braviowestern.com.mx/coleccion",
    },
  },
  {
    id: "descuento-suscriptores",
    name: "Beneficio Exclusivo / Código 10% OFF",
    description: "Recompensa para suscriptores y clientes frecuentes con cupón de descuento.",
    category: "promocion",
    content: {
      subject: "Tu beneficio exclusivo en BRAVÍO Western — 10% de cortesía",
      preheader: "Aprovecha tu código exclusivo en tu próxima adquisición.",
      headline: "UN PRIVILEGIO PARA QUIENES APRECIAN EL VALOR ARTESANAL",
      imageUrl: "https://braviowestern.com.mx/brand/images/Avatar_BRAVIO_principal_1000px.png",
      imageAlt: "Cruz de Hierro BRAVÍO",
      bodyParagraphs: [
        "Queremos agradecerte por formar parte del círculo exclusivo de BRAVÍO Western.",
        "Sabemos que el verdadero lujo radica en la autenticidad y los detalles hechos a mano. Por eso, hemos habilitado un beneficio especial para que adquieras tu siguiente par de botas o sombrero con un descuento preferencial.",
        "Ingresa el siguiente cupón durante el checkout para aplicarlo de forma inmediata a tu orden:",
      ],
      highlightBox: {
        badge: "CUPÓN EXCLUSIVO",
        code: "BIENVENIDO10",
        description: "Válido en cualquier compra en línea con envío asegurado a todo México.",
      },
      buttonText: "COMPRAR CON MI DESCUENTO",
      buttonUrl: "https://braviowestern.com.mx/coleccion",
    },
  },
  {
    id: "historia-goodyear-welt",
    name: "Storytelling & Legado Goodyear Welt 360°",
    description: "Contenido editorial de prestigio sobre la manufactura artesanal en León, Gto.",
    category: "historia",
    content: {
      subject: "Detrás del taller: La costura que dura generaciones",
      preheader: "Conoce por qué la construcción Goodyear Welt 360° es el estándar dorado.",
      headline: "MÁS QUE UNA BOTA, UN LEGADO QUE PERDURA",
      imageUrl: "https://braviowestern.com.mx/brand/images/Avatar_BRAVIO_principal_1000px.png",
      imageAlt: "Sello de Calidad BRAVÍO",
      bodyParagraphs: [
        "En BRAVÍO Western no creemos en los atajos ni en la producción en masa.",
        "Cada par que sale de nuestro taller en León, Guanajuato es intervenido por más de 30 maestros artesanos a lo largo de 180 operaciones manuales. La clave de nuestra firmeza es la costura Goodyear Welt 360°.",
        "Esta técnica sella herméticamente la plantilla interior con el cerco de cuero y la suela, logrando un calzado impermeable, ergonómico y que permite ser resolado las veces que sea necesario a lo largo de tu vida.",
      ],
      buttonText: "CONOCE NUESTRA HISTORIA",
      buttonUrl: "https://braviowestern.com.mx/nosotros",
    },
  },
  {
    id: "comunicado-general",
    name: "Comunicado Directivo / Noticia General",
    description: "Plantilla libre para avisos de temporada, horarios, agradecimientos o novedades.",
    category: "comunicado",
    content: {
      subject: "Noticias desde el taller matriz de BRAVÍO Western",
      preheader: "Actualización oficial para nuestra comunidad de clientes.",
      headline: "COMUNICADO OFICIAL BRAVÍO WESTERN",
      bodyParagraphs: [
        "Estimado cliente y amigo de la marca,",
        "Compartimos contigo las novedades más recientes sobre nuestras operaciones, envíos y mejoras en la plataforma digital.",
        "Seguimos comprometidos con entregarte la máxima calidad de pieles vacunas y exóticas, respaldados por la garantía total del taller en León.",
      ],
      buttonText: "VISITAR NUESTRA TIENDA",
      buttonUrl: "https://braviowestern.com.mx",
    },
  },
];

/**
 * Genera el HTML enriquecido y responsive compatible con clientes de correo
 */
export function renderNewsletterHtml(content: NewsletterContent): string {
  const {
    preheader = "",
    headline,
    bodyParagraphs,
    imageUrl,
    imageAlt = "BRAVÍO Western",
    highlightBox,
    buttonText,
    buttonUrl,
  } = content;

  const paragraphsHtml = bodyParagraphs
    .map(
      (p) =>
        `<p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.8; color: #3E342D; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${p}</p>`
    )
    .join("");

  const highlightHtml = highlightBox
    ? `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0; background: #F8FAFB; border: 1px dashed #5E1C23; border-radius: 4px;">
      <tr>
        <td style="padding: 20px; text-align: center;">
          ${
            highlightBox.badge
              ? `<span style="display: inline-block; font-size: 10px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; color: #5E1C23; margin-bottom: 8px;">${highlightBox.badge}</span>`
              : ""
          }
          ${
            highlightBox.code
              ? `<div style="font-family: monospace; font-size: 22px; font-weight: bold; letter-spacing: 0.25em; color: #5E1C23; background: #FFFFFF; padding: 10px 16px; display: inline-block; border: 1px solid #B1C7D4; border-radius: 3px; margin: 6px 0;">${highlightBox.code}</div>`
              : ""
          }
          ${
            highlightBox.description
              ? `<p style="margin: 8px 0 0 0; font-size: 12px; color: #849AAD;">${highlightBox.description}</p>`
              : ""
          }
        </td>
      </tr>
    </table>`
    : "";

  const buttonHtml =
    buttonText && buttonUrl
      ? `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0 20px 0;">
      <tr>
        <td align="center" style="background-color: #5E1C23; border-radius: 2px;">
          <a href="${buttonUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: bold; letter-spacing: 0.15em; color: #FFFFFF; text-decoration: none; text-transform: uppercase;">
            ${buttonText} &rarr;
          </a>
        </td>
      </tr>
    </table>`
      : "";

  const imageHtml = imageUrl
    ? `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <img src="${imageUrl}" alt="${imageAlt}" width="560" style="width: 100%; max-width: 560px; height: auto; display: block; border-radius: 4px; border: 1px solid #B1C7D4;" />
        </td>
      </tr>
    </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 16px !important; }
      .hero-title { font-size: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F7F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Preheader oculto para clientes de correo -->
  <div style="display: none; font-size: 1px; color: #F4F7F9; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheader}
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F4F7F9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 1px solid #B1C7D4; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          
          <!-- Top Granate Bar -->
          <tr>
            <td style="height: 4px; background-color: #5E1C23; line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Header / Brand -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; text-align: center; border-bottom: 1px solid #EEF2F6;">
              <span style="font-size: 10px; font-weight: bold; letter-spacing: 0.3em; color: #849AAD; text-transform: uppercase; display: block; margin-bottom: 6px;">
                TALLER MATRIZ · LEÓN, GUANAJUATO
              </span>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.15em; color: #5E1C23; text-transform: uppercase;">
                BRAVÍO WESTERN
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px;">
              ${imageHtml}

              <h2 class="hero-title" style="margin: 0 0 16px 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em; color: #605246; text-transform: uppercase; line-height: 1.3;">
                ${headline}
              </h2>

              <div style="width: 40px; height: 2px; background-color: #5E1C23; margin-bottom: 24px;"></div>

              ${paragraphsHtml}

              ${highlightHtml}

              ${buttonHtml}
            </td>
          </tr>

          <!-- Quality Seal Banner -->
          <tr>
            <td style="background-color: #F8FAFB; border-top: 1px solid #EEF2F6; padding: 20px 32px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; color: #5E1C23; text-transform: uppercase;">
                      ✦ Construcción Goodyear Welt 360° &bull; Pieles 100% Genuinas &bull; Envío Asegurado ✦
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0F0C09; color: #849AAD; padding: 32px; text-align: center; font-size: 11px; line-height: 1.8;">
              <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #FFFFFF; letter-spacing: 0.1em; text-transform: uppercase;">
                BRAVÍO WESTERN &bull; MÉXICO
              </p>
              <p style="margin: 0 0 16px 0; color: #849AAD;">
                Hecho a mano con orgullo en León, Guanajuato.<br />
                Atención al cliente: <a href="mailto:hola@braviowestern.com.mx" style="color: #B1C7D4; text-decoration: underline;">hola@braviowestern.com.mx</a>
              </p>
              <p style="margin: 0 0 16px 0; font-size: 10px; color: #605246;">
                Recibes este correo porque te suscribiste a nuestro boletín o realizaste una compra en <a href="https://braviowestern.com.mx" style="color: #849AAD; text-decoration: underline;">braviowestern.com.mx</a>.
              </p>
              <div style="border-top: 1px solid #241D17; padding-top: 16px; margin-top: 16px;">
                <a href="https://braviowestern.com.mx" style="color: #B1C7D4; text-decoration: none; margin: 0 8px;">Tienda</a> &bull;
                <a href="https://braviowestern.com.mx/coleccion" style="color: #B1C7D4; text-decoration: none; margin: 0 8px;">Catálogo</a> &bull;
                <a href="https://braviowestern.com.mx/aviso-de-privacidad" style="color: #B1C7D4; text-decoration: none; margin: 0 8px;">Privacidad</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
