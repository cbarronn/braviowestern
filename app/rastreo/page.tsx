"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";

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
    // Simulated realistic lookup
    if (id.trim().toUpperCase().startsWith("BW-") || id.trim().length > 3) {
      setOrderResult({
        orderNumber: id.trim().toUpperCase(),
        date: "6 de Noviembre, 2026",
        status: "preparing",
        carrier: "Estafeta Express",
        trackingNumber: "EST-" + Math.floor(100000000 + Math.random() * 900000000),
        estimatedDelivery: "9 - 11 de Noviembre, 2026",
        destination: "León, Guanajuato → Destino Nacional",
        steps: [
          { label: "Pedido Confirmado", date: "Hoy, 16:45", completed: true },
          { label: "Inspección de Calidad en Taller", date: "En proceso", completed: true },
          { label: "Empaque y Guía Generada", date: "Pendiente", completed: false },
          { label: "En Tránsito con Paquetería", date: "Pendiente", completed: false },
          { label: "Entregado", date: "Estimado 9-11 Nov", completed: false },
        ]
      });
    } else {
      setOrderResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-bravio-volcanic py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
          LOGÍSTICA & SEGUIMIENTO
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-bravio-bone tracking-wide uppercase mt-2">
          RASTREO DE PEDIDO BRAVÍO
        </h1>
        <p className="text-sm text-bravio-cloudy mt-3 max-w-lg mx-auto font-light">
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
            <Search className="w-5 h-5 text-bravio-cloudy absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Número de pedido (ej. BW-102938)"
              className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded pl-11 pr-4 py-3 text-sm text-bravio-bone uppercase tracking-wider focus:outline-none focus:border-bravio-granate"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone font-sans text-xs tracking-widest uppercase transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Result Display */}
      {hasSearched && orderResult && (
        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-8 rounded-sm space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-bravio-volcanic-border gap-4">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-widest text-bravio-cloudy">
                Pedido Identificado
              </span>
              <h2 className="font-display text-2xl text-bravio-bone uppercase">
                #{orderResult.orderNumber}
              </h2>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-sans tracking-widest text-bravio-cloudy block">
                Paquetería Asignada
              </span>
              <span className="font-sans text-sm text-bravio-gold font-medium">
                {orderResult.carrier} • Guía: {orderResult.trackingNumber}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-wider text-bravio-bone mb-6">
              Etapas del Envío
            </h3>
            <div className="space-y-6">
              {orderResult.steps.map((st: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        st.completed
                          ? "bg-bravio-granate text-bravio-bone"
                          : "bg-bravio-volcanic border border-bravio-volcanic-border text-bravio-cloudy/40"
                      }`}
                    >
                      {st.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < orderResult.steps.length - 1 && (
                      <div
                        className={`w-0.5 h-10 mt-1 ${
                          st.completed ? "bg-bravio-granate/60" : "bg-bravio-volcanic-border"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-sans text-sm font-medium ${
                        st.completed ? "text-bravio-bone" : "text-bravio-cloudy/60"
                      }`}
                    >
                      {st.label}
                    </h4>
                    <span className="text-xs text-bravio-cloudy/70">{st.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {hasSearched && !orderResult && (
        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-8 rounded-sm text-center">
          <p className="text-sm text-bravio-cloudy">
            No se encontró información para el pedido ingresado. Verifica tu número de confirmación enviado por correo electrónico.
          </p>
        </div>
      )}
    </div>
  );
}

export default function RastreoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bravio-volcanic p-12 text-center">Cargando rastreo...</div>}>
      <RastreoContent />
    </Suspense>
  );
}

