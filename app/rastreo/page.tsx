"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

function RastreoContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (id: string) => {
    setHasSearched(true);
    if (id.trim().toUpperCase().startsWith("BW-") || id.trim().length > 3) {
      setOrderResult({
        orderNumber: id.trim().toUpperCase(),
        date: "6 de Noviembre, 2026",
        status: "preparing",
        carrier: "Estafeta Express Asegurado",
        trackingNumber: "EST-" + Math.floor(100000000 + Math.random() * 900000000),
        estimatedDelivery: "9 - 11 de Noviembre, 2026",
        destination: "León, Guanajuato → Destino Nacional",
        steps: [
          { label: "Pedido Confirmado", date: "Hoy, 16:45", completed: true },
          { label: "Inspección de Calidad Goodyear Welt", date: "En proceso en León, Gto.", completed: true },
          { label: "Empaque y Guía Generada", date: "Pendiente", completed: false },
          { label: "En Tránsito con Paquetería", date: "Pendiente", completed: false },
          { label: "Entregado en Domicilio", date: "Estimado 9-11 Nov", completed: false },
        ]
      });
    } else {
      setOrderResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#605246] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CruzDeHierro size={16} color="#5E1C23" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
            Logística & Rastreo Nacional
          </span>
        </div>
        <h1 className="font-archivo text-3xl sm:text-5xl text-[#605246] tracking-tight uppercase mt-2">
          RASTREO DE PEDIDO BRAVÍO
        </h1>
        <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 mt-3 max-w-lg mx-auto">
          Ingresa el número de pedido asignado en tu compra (Ej. BW-102938) para conocer el estado de fabricación y despacho.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-xl mx-auto mb-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(orderQuery);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#849AAD] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Número de pedido (ej. BW-102938)"
              className="w-full bg-white border border-[#B1C7D4] pl-11 pr-4 py-3 text-sm text-[#605246] uppercase font-[SpaceGrotesk] tracking-wider focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#5E1C23] hover:bg-[#47151a] text-white font-[SpaceGrotesk] text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Result Display */}
      {hasSearched && orderResult && (
        <div className="bg-[#F4F7F9] border border-[#B1C7D4]/50 p-8 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#B1C7D4]/40 gap-4">
            <div>
              <span className="text-[10px] uppercase font-[SpaceGrotesk] tracking-widest text-[#849AAD] font-bold">
                Pedido Identificado
              </span>
              <h2 className="font-archivo text-2xl text-[#605246] uppercase">
                #{orderResult.orderNumber}
              </h2>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-[SpaceGrotesk] tracking-widest text-[#849AAD] font-bold block">
                Paquetería Asignada
              </span>
              <span className="font-[SpaceGrotesk] text-sm text-[#5E1C23] font-bold">
                {orderResult.carrier} • Guía: {orderResult.trackingNumber}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-archivo text-xs uppercase tracking-wider text-[#605246] mb-6">
              Etapas del Envío
            </h3>
            <div className="space-y-6">
              {orderResult.steps.map((st: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        st.completed
                          ? "bg-[#5E1C23] text-white"
                          : "bg-white border border-[#B1C7D4] text-[#849AAD]"
                      }`}
                    >
                      {st.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < orderResult.steps.length - 1 && (
                      <div
                        className={`w-0.5 h-10 mt-1 ${
                          st.completed ? "bg-[#5E1C23]" : "bg-[#B1C7D4]/60"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-[SpaceGrotesk] text-sm font-bold ${
                        st.completed ? "text-[#605246]" : "text-[#849AAD]"
                      }`}
                    >
                      {st.label}
                    </h4>
                    <span className="text-xs font-[SpaceGrotesk] text-[#849AAD]">{st.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasSearched && !orderResult && (
        <div className="bg-[#F4F7F9] border border-[#B1C7D4]/50 p-8 text-center shadow-xs">
          <p className="text-sm font-[SpaceGrotesk] text-[#605246]">
            No se encontró información para el pedido ingresado. Verifica tu número de confirmación enviado por correo electrónico o comunícate a soporte@braviowestern.com.mx.
          </p>
        </div>
      )}
    </div>
  );
}

export default function RastreoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-28 text-center text-[#605246]">Cargando rastreador...</div>}>
      <RastreoContent />
    </Suspense>
  );
}
