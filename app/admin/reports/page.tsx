"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Percent, 
  Download, 
  Calendar 
} from "lucide-react";

export default function AdminReportsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((r) => r.json())
      .then((res) => {
        if (res.reports) setData(res.reports);
      })
      .catch(console.error);
  }, []);

  const handleExportCSV = () => {
    if (!data) return;
    const rows = [
      ["SKU", "Modelo", "Piel", "Unidades Vendidas", "Ingresos Totales (MXN)"],
      ...data.topProducts.map((p: any) => [
        p.sku,
        p.name,
        p.leather,
        p.unitsSold,
        p.revenue,
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bravio_ventas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data) {
    return (
      <div className="p-10 text-center font-sans text-xs text-bravio-cloudy">
        Cargando analítica comercial...
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-bravio-volcanic-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-cinematic text-bravio-gold uppercase">
              Inteligencia Comercial
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase">
            REPORTES DE VENTAS & DEMANDA
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-bravio-volcanic-card border border-bravio-volcanic-border hover:bg-bravio-volcanic text-xs font-sans tracking-wider uppercase text-bravio-bone transition-colors"
        >
          <Download size={14} /> Exportar CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-5">
          <div className="flex justify-between items-center text-bravio-cloudy mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider">Ventas Netas</span>
            <DollarSign size={16} className="text-bravio-gold" />
          </div>
          <div className="font-mono text-2xl text-bravio-bone font-bold">
            ${data.kpis.totalSales.toLocaleString("es-MX")} MXN
          </div>
          <div className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +18.4% vs mes anterior
          </div>
        </div>

        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-5">
          <div className="flex justify-between items-center text-bravio-cloudy mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider">Órdenes Procesadas</span>
            <ShoppingBag size={16} className="text-bravio-gold" />
          </div>
          <div className="font-mono text-2xl text-bravio-bone font-bold">
            {data.kpis.totalOrders}
          </div>
          <div className="text-[10px] text-bravio-cloudy mt-2">
            Tasa de entrega efectiva 100%
          </div>
        </div>

        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-5">
          <div className="flex justify-between items-center text-bravio-cloudy mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider">Ticket Promedio</span>
            <DollarSign size={16} className="text-bravio-gold" />
          </div>
          <div className="font-mono text-2xl text-bravio-bone font-bold">
            ${Math.round(data.kpis.averageTicket).toLocaleString("es-MX")} MXN
          </div>
          <div className="text-[10px] text-bravio-cloudy mt-2">
            Construcción Goodyear Welt
          </div>
        </div>

        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-5">
          <div className="flex justify-between items-center text-bravio-cloudy mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider">Conversión Tienda</span>
            <Percent size={16} className="text-bravio-gold" />
          </div>
          <div className="font-mono text-2xl text-bravio-bone font-bold">
            {data.kpis.conversionRate}%
          </div>
          <div className="text-[10px] text-bravio-cloudy mt-2">
            Benchmark industria moda: 2.1%
          </div>
        </div>
      </div>

      {/* Grid of breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Models */}
        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 space-y-4">
          <h2 className="font-display text-base text-bravio-bone uppercase tracking-wider border-b border-bravio-volcanic-border pb-3">
            Top 5 Modelos Más Vendidos
          </h2>

          <div className="space-y-3 font-sans text-xs">
            {data.topProducts.map((p: any) => (
              <div key={p.sku} className="flex justify-between items-center p-3 bg-bravio-volcanic border border-bravio-volcanic-border/50">
                <div>
                  <span className="font-mono text-bravio-gold text-[10px] block">{p.sku}</span>
                  <span className="font-display text-sm text-bravio-bone uppercase">{p.name}</span>
                  <span className="text-[10px] text-bravio-cloudy block">{p.leather}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-bravio-bone block">
                    ${p.revenue.toLocaleString("es-MX")}
                  </span>
                  <span className="text-[10px] text-bravio-cloudy">{p.unitsSold} pares vendidos</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Leather & Size Breakdown */}
        <div className="space-y-6">
          {/* By Leather */}
          <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 space-y-4">
            <h2 className="font-display text-base text-bravio-bone uppercase tracking-wider border-b border-bravio-volcanic-border pb-3">
              Distribución por Tipo de Piel
            </h2>

            <div className="space-y-3 font-sans text-xs">
              {data.salesByLeather.map((l: any) => (
                <div key={l.type} className="space-y-1">
                  <div className="flex justify-between text-bravio-bone">
                    <span>{l.type}</span>
                    <span className="font-mono">${l.revenue.toLocaleString("es-MX")} ({l.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                    <div
                      className="h-full bg-bravio-granate"
                      style={{ width: `${l.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By Mexican Size */}
          <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 space-y-4">
            <h2 className="font-display text-base text-bravio-bone uppercase tracking-wider border-b border-bravio-volcanic-border pb-3">
              Demanda de Tallas Más Solicitadas (MX)
            </h2>

            <div className="flex flex-wrap gap-3 font-sans text-xs">
              {data.salesBySize.map((s: any) => (
                <div key={s.size} className="p-3 bg-bravio-volcanic border border-bravio-volcanic-border flex-1 min-w-[80px] text-center">
                  <span className="font-mono text-bravio-gold text-[11px] block">{s.size}</span>
                  <span className="font-mono font-bold text-base text-bravio-bone block mt-1">{s.units}</span>
                  <span className="text-[9px] text-bravio-cloudy uppercase">Pares</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
