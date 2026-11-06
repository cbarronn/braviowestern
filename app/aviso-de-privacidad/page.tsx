import React from "react";
import type { Metadata } from "next";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | BRAVÍO Western",
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
• Envío de información sobre nuevos lotes de calzado, promociones y novedades del taller
• Estudios estadísticos internos de calidad en el servicio`,
  },
  {
    titulo: "Transferencia de datos",
    contenido: `BRAVÍO podrá transferir sus datos personales a terceros en los siguientes casos:

• Empresas de paquetería y logística (FedEx, Estafeta), para gestionar la entrega física de sus pedidos
• Procesadores de pago (Mercado Pago), para procesar transacciones bancarias de forma encriptada
• Autoridades competentes, cuando sea requerido formalmente por mandato judicial

No transferiremos ni venderemos jamás sus datos a terceros con propósitos comerciales.`,
  },
  {
    titulo: "Medios para ejercer derechos ARCO",
    contenido: `Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (derechos ARCO) al tratamiento de sus datos personales. Para ejercerlos, envíe una solicitud a:

Correo: privacidad@braviowestern.com.mx
Asunto: Solicitud de Derechos ARCO

Su solicitud deberá contener: nombre completo, datos de contacto, descripción del derecho que desea ejercer y copia de identificación oficial. Responderemos en un plazo máximo de 20 días hábiles.`,
  },
  {
    titulo: "Contacto",
    contenido: `Si tiene dudas sobre el presente aviso de privacidad o sobre el tratamiento de sus datos, puede contactarnos:

Correo: privacidad@braviowestern.com.mx
WhatsApp de Soporte: +52 (477) 729-6578
Ubicación de Taller y Despacho: León, Guanajuato, México`,
  },
];

export default function AvisoDePrivacidadPage() {
  const fechaActualizacion = "Enero 2026";

  return (
    <div className="pt-[90px] min-h-screen bg-white text-[#605246] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="py-12 border-b border-[#B1C7D4]/40">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD] font-bold">
              Marco Legal y Privacidad
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-5xl text-[#605246] uppercase tracking-tight mb-4">
            AVISO DE PRIVACIDAD.
          </h1>
          <p className="font-[SpaceGrotesk] text-xs text-[#849AAD] uppercase tracking-wider font-bold">
            Última actualización: {fechaActualizacion} · León, Guanajuato, México.
          </p>
        </div>

        {/* Intro */}
        <div className="py-8 border-b border-[#B1C7D4]/30">
          <p className="font-[SpaceGrotesk] text-base text-[#605246] leading-relaxed">
            En <strong>BRAVÍO Western</strong> respetamos su privacidad y nos comprometemos a proteger sus datos personales conforme a la <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP) y demás normatividad aplicable en los Estados Unidos Mexicanos.
          </p>
        </div>

        {/* Sections */}
        <div className="divide-y divide-[#B1C7D4]/30 py-6">
          {SECCIONES.map((seccion, i) => (
            <div key={i} className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase text-[#5E1C23] font-bold block mb-1">
                  SECCIÓN {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-archivo text-base text-[#605246] uppercase">
                  {seccion.titulo}
                </h2>
              </div>
              <div className="md:col-span-2 font-[SpaceGrotesk] text-xs text-[#605246]/80 leading-relaxed space-y-2 whitespace-pre-line">
                {seccion.contenido}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
