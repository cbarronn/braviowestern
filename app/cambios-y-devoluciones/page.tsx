import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Cambios y Devoluciones | Primer Cambio Gratis | BRAVÍO",
  description: "Cuentas con 30 días naturales y el primer cambio de talla es 100% gratuito.",
};

const STEPS = [
  {
    step: "01",
    title: "Solicita tu Guía",
    description: "Escríbenos a hola@braviowestern.com.mx o por WhatsApp (+52 477 729-6578) con tu número de pedido 'BW-XXXXXX' indicando la nueva talla que requieres.",
  },
  {
    step: "02",
    title: "Empaca las Botas",
    description: "Coloca las botas limpias con sus fundas protectoras dentro de la caja original de BRAVÍO. Pega la guía prepagada que te enviaremos por correo.",
  },
  {
    step: "03",
    title: "Entrega a Paquetería",
    description: "Deposita el paquete en el centro de recolección de FedEx o DHL más cercano, o programa una recolección a domicilio sin costo.",
  },
  {
    step: "04",
    title: "Inspección y Envío",
    description: "En cuanto el par ingresa a nuestro taller en León y verificamos su estado nuevo, despachamos de inmediato tu par de reemplazo con nueva guía.",
  },
];

export default function CambiosDevolucionesPage() {
  return (
    <div className="pt-[90px] min-h-screen bg-[#0F0C09] text-[#B1C7D4] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 border-b border-[#605246]/20">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD]">
              Garantía de Calce
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-5xl text-[#B1C7D4] uppercase tracking-tight mb-4">
            CAMBIOS Y DEVOLUCIONES.
          </h1>
          <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] max-w-2xl leading-relaxed">
            Queremos que camines con total certidumbre. Por ello, tu primer cambio de talla es <strong className="text-[#B1C7D4]">completamente gratuito</strong> en toda la República Mexicana.
          </p>
        </div>

        {/* Free Exchange Feature Box */}
        <div className="my-10 p-8 bg-[#16120E] border-2 border-[#5E1C23]/60 relative">
          <div className="flex items-start gap-4">
            <RefreshCw size={28} className="text-[#5E1C23] flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide mb-2">
                PRIMER CAMBIO DE TALLA 100% SIN COSTO
              </h2>
              <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] leading-relaxed">
                Si al recibir tus botas notas que te quedan ajustadas o amplias, no te preocupes: cubrimos la guía de devolución al taller de León, Guanajuato y el envío del nuevo par hasta tu puerta.
              </p>
            </div>
          </div>
        </div>

        {/* Step by Step Flow */}
        <div className="py-10 space-y-8">
          <h2 className="font-archivo text-2xl text-[#B1C7D4] uppercase tracking-tight">
            PROCESO PASO A PASO
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STEPS.map((s, idx) => (
              <div key={idx} className="bg-[#16120E] border border-[#605246]/30 p-6 space-y-3">
                <span className="font-archivo text-2xl text-[#5E1C23]">{s.step}</span>
                <h3 className="font-archivo text-base text-[#B1C7D4] uppercase">{s.title}</h3>
                <p className="font-[SpaceGrotesk] text-xs text-[#849AAD] leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions Checklist */}
        <div className="py-10 border-t border-[#605246]/20 space-y-6">
          <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide">
            CONDICIONES OBLIGATORIAS DEL CALZADO
          </h2>

          <div className="space-y-3 font-[SpaceGrotesk] text-xs text-[#849AAD]">
            <div className="flex items-start gap-3 bg-[#16120E] p-4 border border-[#605246]/20">
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Suela limpia e intacta:</strong> La suela de vaqueta no debe presentar rayaduras, suciedad de pavimento ni marcas de flexión profunda. Te sugerimos siempre probarte las botas sobre alfombra o una superficie lisa limpia.
              </span>
            </div>

            <div className="flex items-start gap-3 bg-[#16120E] p-4 border border-[#605246]/20">
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Empaque original completo:</strong> Debe incluirse la caja rígida BRAVÍO, papel vegetal protector y cualquier accesorio original.
              </span>
            </div>

            <div className="flex items-start gap-3 bg-[#16120E] p-4 border border-[#605246]/20">
              <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Plazo de 30 días naturales:</strong> La solicitud debe realizarse dentro de los 30 días posteriores a la fecha de entrega reportada por la paquetería.
              </span>
            </div>

            <div className="flex items-start gap-3 bg-[#16120E] p-4 border border-[#605246]/20">
              <AlertCircle size={16} className="text-[#5E1C23] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Reembolsos:</strong> En caso de preferir una devolución definitiva en vez de cambio de talla, una vez inspeccionado el calzado en taller se reintegrará el monto total a tu método original de pago en un lapso de 5 a 10 días hábiles.
              </span>
            </div>
          </div>
        </div>

        {/* Start Exchange CTA */}
        <div className="p-8 bg-[#16120E] border border-[#605246]/40 text-center">
          <h3 className="font-archivo text-xl text-[#B1C7D4] uppercase mb-2">
            ¿Deseas iniciar un cambio o devolución?
          </h3>
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] max-w-md mx-auto mb-6">
            Escríbenos directamente indicando tu folio de pedido. Nuestro equipo te responderá en menos de 24 horas con tu guía prepagada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#5E1C23] hover:bg-[#72232b] text-white font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
            >
              Iniciar Solicitud <ArrowRight size={14} />
            </Link>
            <Link
              href="/rastreo"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F0C09] hover:bg-[#605246]/20 border border-[#605246]/50 text-xs font-[SpaceGrotesk] font-bold text-[#B1C7D4] uppercase tracking-[0.15em] transition-colors"
            >
              Rastrear Pedido Actual
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
