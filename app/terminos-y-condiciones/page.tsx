import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Términos y Condiciones | BRAVÍO Western",
  description: "Términos legales y condiciones de contratación de BRAVÍO Western.",
};

export default function TerminosPage() {
  return (
    <div className="pt-[90px] min-h-screen bg-[#0F0C09] text-[#B1C7D4] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-b border-[#605246]/20">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD]">
              Marco Jurídico
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-5xl text-[#B1C7D4] uppercase tracking-tight mb-4">
            TÉRMINOS Y CONDICIONES.
          </h1>
          <p className="font-[SpaceGrotesk] text-xs text-[#849AAD] uppercase tracking-wider">
            Última actualización: Enero de 2026 · León, Guanajuato, México.
          </p>
        </div>

        <div className="py-12 space-y-10 font-[SpaceGrotesk] text-sm text-[#849AAD] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-archivo text-lg text-[#B1C7D4] uppercase tracking-wide">
              1. Identidad del Titular y Objeto
            </h2>
            <p>
              El presente sitio web (<strong>braviowestern.com.mx</strong>) es operado por la marca comercial <strong>BRAVÍO</strong>, con talleres de producción y operaciones centrales en León, Guanajuato, México.
            </p>
            <p>
              El acceso, navegación y adquisición de productos a través de esta plataforma implica la aceptación plena de los presentes Términos y Condiciones por parte del usuario.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo text-lg text-[#B1C7D4] uppercase tracking-wide">
              2. Precios, Moneda y Facturación
            </h2>
            <p>
              Todos los precios exhibidos en la tienda en línea se encuentran expresados en pesos mexicanos (<strong>MXN</strong>) e incluyen el Impuesto al Valor Agregado (IVA) correspondiente del 16% conforme a la legislación fiscal mexicana aplicable.
            </p>
            <p>
              Cualquier cliente podrá solicitar su Comprobante Fiscal Digital por Internet (CFDI 4.0) dentro del mismo mes calendario en que se perfeccionó la compra, proporcionando constancia de situación fiscal actualizada a través de nuestros canales de atención.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo text-lg text-[#B1C7D4] uppercase tracking-wide">
              3. Métodos de Pago y Seguridad de la Información
            </h2>
            <p>
              Los pagos mediante tarjetas de crédito o débito son procesados a través de pasarelas certificadas bajo el estándar <strong>PCI-DSS Nivel 1</strong> (Mercado Pago). BRAVÍO no almacena, retiene ni tiene acceso a números de tarjeta, fechas de vencimiento o códigos de seguridad CVV.
            </p>
            <p>
              En caso de transferencias interbancarias SPEI, la orden quedará sujeta a validación bancaria automática mediante la referencia alfanumérica única emitida al momento del checkout.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo text-lg text-[#B1C7D4] uppercase tracking-wide">
              4. Garantía de Construcción y Defectos de Fabricación
            </h2>
            <p>
              Cada bota BRAVÍO cuenta con una <strong>garantía de 180 días naturales</strong> contra defectos de fabricación en costuras de cerco Goodyear Welt 360°, despegue estructural o fallas en el alma de acero (cambrillón).
            </p>
            <p>
              Esta garantía no ampara el desgaste natural de la suela de vaqueta o del tacón derivado del uso habitual, ni manchas, raspaduras o resequedad provocadas por falta de mantenimiento adecuado según lo estipulado en nuestra Guía de Cuidados.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo text-lg text-[#B1C7D4] uppercase tracking-wide">
              5. Propiedad Intelectual y Marca Registrada
            </h2>
            <p>
              El nombre comercial <strong>BRAVÍO</strong>, el logotipo oficial, el símbolo registrado de <strong>La Cruz de Hierro</strong>, los textos editoriales, las campañas audiovisuales y la dirección artística son propiedad exclusiva. Queda prohibida su reproducción parcial o total, imitación o explotación no autorizada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-archivo text-lg text-[#B1C7D4] uppercase tracking-wide">
              6. Jurisdicción y Ley Aplicable
            </h2>
            <p>
              Para la resolución de cualquier controversia o controversia judicial que surja con motivo de la interpretación o ejecución de los presentes términos, las partes se someten expresamente a la jurisdicción de los tribunales competentes de la ciudad de <strong>León, Guanajuato</strong>, renunciando a cualquier otro fuero que por razón de domicilio presente o futuro pudiera corresponderles.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-[#605246]/20 flex justify-between items-center text-xs font-[SpaceGrotesk]">
          <Link href="/aviso-de-privacidad" className="text-[#849AAD] hover:text-[#B1C7D4] underline">
            Consultar Aviso de Privacidad
          </Link>
          <Link href="/contacto" className="text-[#849AAD] hover:text-[#B1C7D4] underline">
            Dudas o Aclaraciones
          </Link>
        </div>
      </div>
    </div>
  );
}

