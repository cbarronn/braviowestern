import type { Metadata } from "next";
import Link from "next/link";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Envíos y Devoluciones | BRAVÍO Western",
  description: "Información sobre envíos y devoluciones de BRAVÍO Western.",
};

export default function EnviosPage() {
  return (
    <div className="pt-[90px] min-h-screen bg-white text-[#605246] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-b border-[#B1C7D4]/40">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={18} color="#5E1C23" />
            <span className="font-[SpaceGrotesk] text-[11px] uppercase tracking-[0.2em] text-[#849AAD] font-bold">
              Información de Compra
            </span>
          </div>
          <h1 className="font-archivo text-4xl sm:text-5xl text-[#605246] uppercase tracking-tight mb-4">
            ENVÍOS Y DEVOLUCIONES.
          </h1>
          <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] max-w-xl leading-relaxed">
            Transparencia total en logística y garantía. Despachos directos desde nuestro taller artesanal en León, Guanajuato.
          </p>
        </div>

        <div className="max-w-3xl space-y-16 mt-12 font-[SpaceGrotesk] text-sm text-[#605246]/80 leading-relaxed">
          {/* Envíos */}
          <div className="p-8 bg-[#F4F7F9] border border-[#B1C7D4]/50 shadow-xs space-y-4">
            <h2 className="font-archivo text-xl text-[#605246] uppercase tracking-wide">
              Política de Envíos Nacionales
            </h2>
            <p>
              En <strong>BRAVÍO</strong>, cada par de botas es inspeccionado cuidadosamente antes de abandonar nuestros talleres en León, Guanajuato.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Envíos Nacionales Gratuitos:</strong> En compras superiores a $3,500 MXN a cualquier código postal de la República Mexicana.</li>
              <li><strong>Tiempo de Tránsito:</strong> De 3 a 5 días hábiles mediante FedEx o Estafeta asegurada.</li>
              <li><strong>Despacho Oportuno:</strong> Pedidos realizados antes de las 13:00 hrs se procesan en un lapso de 24 a 48 horas hábiles.</li>
            </ul>
          </div>

          {/* Devoluciones */}
          <div className="p-8 bg-white border border-[#B1C7D4]/60 shadow-xs space-y-4">
            <h2 className="font-archivo text-xl text-[#605246] uppercase tracking-wide">
              Primer Cambio de Talla Gratuito
            </h2>
            <p>
              Queremos que camines con total seguridad. Por ello, tu primer cambio de talla es 100% gratuito.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Plazo:</strong> Cuentas con 30 días naturales a partir de la fecha de entrega para solicitar cambio o devolución.</li>
              <li><strong>Condiciones:</strong> El calzado debe estar sin marcas en la suela de vaqueta y en su caja original completa.</li>
              <li><strong>Guía Prepagada:</strong> Generamos una guía prepagada para que entregues el paquete sin costo en la paquetería.</li>
            </ul>
            <div className="pt-4 border-t border-[#B1C7D4]/30 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider">
              <Link href="/envios" className="text-[#5E1C23] hover:underline">
                Ver Política Completa de Envíos →
              </Link>
              <Link href="/cambios-y-devoluciones" className="text-[#5E1C23] hover:underline">
                Ver Guía de Cambios Paso a Paso →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
