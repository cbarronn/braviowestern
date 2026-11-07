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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-widest text-bravio-tsunami uppercase font-bold">
              Inteligencia Comercial
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-volcanic tracking-wider uppercase">
            REPORTES DE VENTAS & DEMANDA
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#B1C7D4]/60 hover:bg-[#F8FAFB] text-xs font-sans tracking-wider uppercase text-bravio-volcanic transition-colors rounded-sm shadow-sm font-bold"
        >
          <Download size={14} /> Exportar CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-sm">
          <div className="flex justify-between items-center text-bravio-tsunami mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider font-bold">Ventas Netas</span>
            <DollarSign size={16} className="text-bravio-granate" />
          </div>
          <div className="font-mono text-2xl text-bravio-volcanic font-bold">
            ${data.kpis.totalSales.toLocaleString("es-MX")} MXN
          </div>
          <div className="text-[10px] text-emerald-600 mt-2 flex items-center gap-1 font-bold">
            <TrendingUp size={12} /> +18.4% vs mes anterior
          </div>
        </div>

        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-sm">
          <div className="flex justify-between items-center text-bravio-tsunami mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider font-bold">Órdenes Procesadas</span>
            <ShoppingBag size={16} className="text-bravio-granate" />
          </div>
          <div className="font-mono text-2xl text-bravio-volcanic font-bold">
            {data.kpis.totalOrders}
          </div>
          <div className="text-[10px] text-bravio-tsunami mt-2">
            Tasa de entrega efectiva 100%
          </div>
        </div>

        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-sm">
          <div className="flex justify-between items-center text-bravio-tsunami mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider font-bold">Ticket Promedio</span>
            <DollarSign size={16} className="text-bravio-granate" />
          </div>
          <div className="font-mono text-2xl text-bravio-volcanic font-bold">
            ${Math.round(data.kpis.averageTicket).toLocaleString("es-MX")} MXN
          </div>
          <div className="text-[10px] text-bravio-tsunami mt-2">
            Construcción Goodyear Welt
          </div>
        </div>

        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-sm">
          <div className="flex justify-between items-center text-bravio-tsunami mb-2">
            <span className="text-[10px] font-sans uppercase tracking-wider font-bold">Conversión Tienda</span>
            <Percent size={16} className="text-bravio-granate" />
          </div>
          <div className="font-mono text-2xl text-bravio-volcanic font-bold">
            {data.kpis.conversionRate}%
          </div>
          <div className="text-[10px] text-bravio-tsunami mt-2">
            Benchmark industria moda: 2.1%
          </div>
        </div>
      </div>

      {/* Grid of breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Models */}
        <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="font-display text-base text-bravio-volcanic uppercase tracking-wider border-b border-[#B1C7D4]/40 pb-3">
            Top 5 Modelos Más Vendidos
          </h2>

          <div className="space-y-3 font-sans text-xs">
            {data.topProducts.map((p: any) => (
              <div key={p.sku} className="flex justify-between items-center p-3 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded-sm">
                <div>
                  <span className="font-mono text-bravio-granate font-bold text-[10px] block">{p.sku}</span>
                  <span className="font-display text-sm text-bravio-volcanic uppercase">{p.name}</span>
                  <span className="text-[10px] text-bravio-tsunami block">{p.leather}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-sm text-bravio-volcanic block">
                    ${p.revenue.toLocaleString("es-MX")}
                  </span>
                  <span className="text-[10px] text-bravio-tsunami">{p.unitsSold} pares vendidos</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Leather & Size Breakdown */}
        <div className="space-y-6">
          {/* By Leather */}
          <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6 space-y-4">
            <h2 className="font-display text-base text-bravio-volcanic uppercase tracking-wider border-b border-[#B1C7D4]/40 pb-3">
              Distribución por Tipo de Piel
            </h2>

            <div className="space-y-3 font-sans text-xs">
              {data.salesByLeather.map((l: any) => (
                <div key={l.type} className="space-y-1">
                  <div className="flex justify-between text-bravio-volcanic">
                    <span className="font-medium">{l.type}</span>
                    <span className="font-mono text-bravio-tsunami font-bold">${l.revenue.toLocaleString("es-MX")} ({l.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#EEF2F6] rounded-full overflow-hidden">
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
          <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6 space-y-4">
            <h2 className="font-display text-base text-bravio-volcanic uppercase tracking-wider border-b border-[#B1C7D4]/40 pb-3">
              Demanda de Tallas Más Solicitadas (MX)
            </h2>

            <div className="flex flex-wrap gap-3 font-sans text-xs">
              {data.salesBySize.map((s: any) => (
                <div key={s.size} className="p-3 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded-sm flex-1 min-w-[80px] text-center">
                  <span className="font-mono text-bravio-granate font-bold text-[11px] block">{s.size}</span>
                  <span className="font-mono font-bold text-base text-bravio-volcanic block mt-1">{s.units}</span>
                  <span className="text-[9px] text-bravio-tsunami uppercase">Pares</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

