import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Confirmación de Pedido | BRAVÍO Western",
  description: "Detalles y recibo oficial de tu compra en BRAVÍO Western.",
};

interface PageProps {
  params: Promise<{
    referencia: string;
  }>;
}

export default async function PedidoConfirmacionPage({ params }: PageProps) {
  const { referencia } = await params;
  const decodedRef = decodeURIComponent(referencia).toUpperCase();

  return (
    <div className="pt-[100px] min-h-screen bg-white text-[#605246] pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="text-center py-10 border-b border-[#B1C7D4]/40">
          <div className="w-16 h-16 rounded-full bg-[#5E1C23]/10 border border-[#5E1C23]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} className="text-[#5E1C23]" />
          </div>

          <p className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD] font-bold mb-2">
            Orden Registrada con Éxito
          </p>

          <h1 className="font-archivo text-3xl sm:text-5xl text-[#605246] uppercase tracking-tight mb-4">
            ¡GRACIAS POR TU COMPRA!
          </h1>

          <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 max-w-lg mx-auto leading-relaxed">
            Hemos recibido tu orden. Tu calzado artesanal entrará a inspección y empaque en nuestros talleres de León, Guanajuato.
          </p>

          {/* Reference Card */}
          <div className="mt-8 inline-flex items-center gap-3 bg-[#F4F7F9] border border-[#B1C7D4]/60 px-6 py-3 shadow-xs">
            <span className="text-xs font-[SpaceGrotesk] text-[#849AAD] font-bold uppercase tracking-wider">
              Folio de Pedido:
            </span>
            <span className="font-archivo text-xl text-[#5E1C23] tracking-widest">
              {decodedRef}
            </span>
          </div>
        </div>

        {/* SPEI Instructions Box */}
        <div className="my-8 p-6 bg-[#F4F7F9] border border-[#B1C7D4]/50 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#B1C7D4]/40 pb-3">
            <div className="flex items-center gap-2">
              <CruzDeHierro size={16} color="#5E1C23" />
              <h2 className="font-archivo text-base text-[#605246] uppercase">
                Datos de Pago (Si seleccionaste Transferencia SPEI)
              </h2>
            </div>
            <span className="text-[10px] font-[SpaceGrotesk] uppercase tracking-wider px-2 py-0.5 bg-white border border-[#B1C7D4]/60 text-[#605246] font-bold">
              Banco BBVA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-[SpaceGrotesk] text-xs">
            <div>
              <span className="text-[#849AAD] block uppercase tracking-wider mb-1">Beneficiario:</span>
              <span className="text-[#605246] font-bold">BRAVÍO WESTERN TRADING S.A. DE C.V.</span>
            </div>

            <div>
              <span className="text-[#849AAD] block uppercase tracking-wider mb-1">CLABE Interbancaria:</span>
              <span className="text-[#5E1C23] font-mono font-bold tracking-wider select-all text-sm">
                012 225 0011 8293 8472
              </span>
            </div>

            <div>
              <span className="text-[#849AAD] block uppercase tracking-wider mb-1">Concepto / Referencia:</span>
              <span className="text-[#605246] font-bold font-mono">{decodedRef}</span>
            </div>

            <div>
              <span className="text-[#849AAD] block uppercase tracking-wider mb-1">Comprobante a:</span>
              <a href="mailto:pagos@braviowestern.com.mx" className="text-[#5E1C23] underline font-bold">
                pagos@braviowestern.com.mx
              </a>
            </div>
          </div>
        </div>

        {/* Steps to Delivery */}
        <div className="my-8 p-6 bg-white border border-[#B1C7D4]/50 space-y-4 shadow-sm">
          <h2 className="font-archivo text-base text-[#605246] uppercase tracking-wide">
            Próximos Pasos
          </h2>

          <div className="space-y-3 font-[SpaceGrotesk] text-xs text-[#605246]">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#5E1C23] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                1
              </span>
              <span>
                <strong>Confirmación por Correo:</strong> Te enviamos un desglose detallado a la dirección de email que ingresaste.
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#5E1C23] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                2
              </span>
              <span>
                <strong>Inspección de Taller:</strong> Los maestros zapateros revisan el lustre, simetría y costura Goodyear Welt 360° en León, Guanajuato.
              </span>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#5E1C23] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                3
              </span>
              <span>
                <strong>Guía de Rastreo:</strong> En cuanto el mensajero recolecte el paquete, recibirás el enlace con la guía de FedEx o Estafeta asegurada.
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href={`/rastreo?orderId=${decodedRef}`}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#5E1C23] hover:bg-[#47151a] text-white font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors shadow-sm"
          >
            <Truck size={16} /> Rastrear este Pedido
          </Link>

          <Link
            href="/coleccion"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white hover:bg-[#F4F7F9] border border-[#B1C7D4] text-[#605246] font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
          >
            Volver a la Tienda <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
