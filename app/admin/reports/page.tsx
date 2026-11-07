"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Percent, 
  Download, 
  Printer,
  Calendar,
  Globe2,
  Search,
  Users,
  Eye,
  Smartphone,
  CreditCard,
  Landmark,
  ShieldCheck,
  Sparkles,
  MapPin,
  ArrowUpRight,
  FileText,
  CheckCircle2
} from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

type TabType = "ejecutivo" | "semanal" | "trafico" | "geografia" | "busquedas" | "consejo";

export default function AdminReportsPage() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>("ejecutivo");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((r) => r.json())
      .then((res) => {
        if (res.reports) setData(res.reports);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleExportCSV = () => {
    if (!data) return;
    const rows = [
      ["REPORTE EJECUTIVO COMERCIAL BRAVIO WESTERN"],
      ["Fecha de emision", new Date().toLocaleString("es-MX")],
      [""],
      ["--- VENTAS SEMANALES ---"],
      ["Semana", "Ventas MXN", "Ordenes", "Crecimiento"],
      ...data.weeklySales.weeks.map((w: any) => [w.weekLabel, w.sales, w.orders, w.growth]),
      [""],
      ["--- ORIGEN GEOGRAFICO DE VISITAS ---"],
      ["Region", "Porcentaje", "Visitantes", "Ventas MXN"],
      ...data.geographicOrigins.national.map((g: any) => [g.region, `${g.share}%`, g.visitors, g.revenue]),
      ...data.geographicOrigins.international.map((g: any) => [g.region, `${g.share}%`, g.visitors, g.revenue]),
      [""],
      ["--- QUE BUSCAN LOS CLIENTES ---"],
      ["Termino de busqueda", "Consultas", "Tasa de Conversion", "Tendencia", "Intencion"],
      ...data.searchQueries.map((q: any) => [q.query, q.count, q.conversion, q.trend, q.intent]),
      [""],
      ["--- TOP PRODUCTOS VENDIDOS ---"],
      ["SKU", "Modelo", "Piel", "Pares Vendidos", "Ingresos Totales MXN"],
      ...data.topProducts.map((p: any) => [p.sku, p.name, p.leather, p.unitsSold, p.revenue]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bravio_reporte_directivo_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !data) {
    return (
      <div className="p-12 text-center font-sans text-xs text-[#849AAD]">
        Cargando inteligencia comercial y analítica directiva...
      </div>
    );
  }

  const { kpis, weeklySales, trafficAnalytics, geographicOrigins, searchQueries, executiveSummary } = data;

  return (
    <div className="p-4 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto font-sans print:p-0 print:max-w-full">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#B1C7D4]/40 pb-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[10px] tracking-[0.2em] text-[#849AAD] uppercase font-bold">
              Business Intelligence & Dirección General
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#605246] tracking-wider uppercase">
            REPORTES EJECUTIVOS & ANALÍTICA DIRECTIVA
          </h1>
          <p className="text-xs text-[#849AAD] mt-1">
            Ventas semanales, tráfico web, origen geográfico de visitas, consultas de clientes e informe para el consejo directivo.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#B1C7D4] hover:bg-[#F8FAFB] text-xs font-sans tracking-wider uppercase text-[#605246] transition-colors rounded-sm shadow-xs font-bold"
          >
            <Printer size={14} /> Imprimir / PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-sans tracking-wider uppercase transition-colors rounded-sm shadow-sm font-bold"
          >
            <Download size={14} /> Exportar Excel / CSV
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#B1C7D4]/40 gap-2 overflow-x-auto pb-1 text-xs print:hidden">
        <button
          onClick={() => setActiveTab("ejecutivo")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === "ejecutivo"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <BarChart3 size={14} /> Resumen Ejecutivo
        </button>
        <button
          onClick={() => setActiveTab("semanal")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === "semanal"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <Calendar size={14} /> Ventas Semanales
        </button>
        <button
          onClick={() => setActiveTab("trafico")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === "trafico"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <Eye size={14} /> Tráfico & Consultas Web
        </button>
        <button
          onClick={() => setActiveTab("geografia")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === "geografia"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <Globe2 size={14} /> De Dónde Nos Visitan
        </button>
        <button
          onClick={() => setActiveTab("busquedas")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === "busquedas"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <Search size={14} /> Qué Buscan los Clientes
        </button>
        <button
          onClick={() => setActiveTab("consejo")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${
            activeTab === "consejo"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <FileText size={14} /> Informe para Consejo
        </button>
      </div>

      {/* KPI Directivos Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Ventas Semanales Actuales */}
        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#849AAD] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold">Venta Semana Actual</span>
            <DollarSign size={16} className="text-[#5E1C23]" />
          </div>
          <div className="font-mono text-2xl text-[#605246] font-bold">
            ${weeklySales.currentWeekTotal.toLocaleString("es-MX")} MXN
          </div>
          <div className="text-[10px] text-emerald-600 mt-2 flex items-center gap-1 font-bold">
            <TrendingUp size={12} /> {weeklySales.growthVsLastWeek} vs semana previa
          </div>
        </div>

        {/* Card 2: Margen Bruto Directivo */}
        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#849AAD] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold">Margen Bruto</span>
            <Percent size={16} className="text-[#5E1C23]" />
          </div>
          <div className="font-mono text-2xl text-[#605246] font-bold">
            {kpis.grossMargin}%
          </div>
          <div className="text-[10px] text-[#849AAD] mt-2">
            Rentabilidad sobre costo directo en taller
          </div>
        </div>

        {/* Card 3: Ticket Promedio */}
        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#849AAD] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold">Ticket Promedio</span>
            <ShoppingBag size={16} className="text-[#5E1C23]" />
          </div>
          <div className="font-mono text-2xl text-[#605246] font-bold">
            ${Math.round(kpis.averageTicket).toLocaleString("es-MX")} MXN
          </div>
          <div className="text-[10px] text-[#849AAD] mt-2">
            Construcción Goodyear Welt 360°
          </div>
        </div>

        {/* Card 4: Retorno Publicitario ROAS */}
        <div className="bg-white border border-[#B1C7D4]/60 p-5 rounded-sm shadow-xs">
          <div className="flex justify-between items-center text-[#849AAD] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold">Eficiencia ROAS</span>
            <Sparkles size={16} className="text-[#5E1C23]" />
          </div>
          <div className="font-mono text-2xl text-[#605246] font-bold">
            {kpis.roas}x
          </div>
          <div className="text-[10px] text-emerald-600 mt-2 font-bold">
            $4.80 MXN generados por cada $1 invertido
          </div>
        </div>
      </div>

      {/* CONTENIDO SEGÚN PESTAÑA */}

      {/* TAB 1 & 2: VENTAS SEMANALES */}
      {(activeTab === "ejecutivo" || activeTab === "semanal") && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Histórico Semanal (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#5E1C23]" />
                  <h2 className="font-display text-base text-[#605246] uppercase">
                    Evolución de Ventas Semana a Semana
                  </h2>
                </div>
                <span className="text-[10px] uppercase bg-emerald-50 text-emerald-700 border border-emerald-300 px-2 py-0.5 font-bold rounded">
                  Tendencia Alcista
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {weeklySales.weeks.map((w: any, idx: number) => {
                  const maxSale = 75000;
                  const pct = Math.round((w.sales / maxSale) * 100);
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#605246]">{w.weekLabel}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[#849AAD] text-[11px]">{w.orders} órdenes</span>
                          <span className="font-mono font-bold text-[#5E1C23]">${w.sales.toLocaleString("es-MX")} MXN</span>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {w.growth}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-[#EEF2F6] rounded-sm overflow-hidden">
                        <div
                          className="h-full bg-[#5E1C23] rounded-sm transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day of Week Breakdown */}
              <div className="pt-4 border-t border-[#B1C7D4]/30 space-y-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#849AAD] block">
                  Distribución Diaria de Ventas (Semana Actual)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {weeklySales.dailyBreakdown.map((d: any, idx: number) => (
                    <div key={idx} className="bg-[#F8FAFB] border border-[#B1C7D4]/40 p-2.5 rounded text-center">
                      <span className="text-[10px] uppercase font-bold text-[#849AAD] block">{d.day}</span>
                      <span className="font-mono font-bold text-xs text-[#605246] block mt-1">
                        ${d.sales.toLocaleString("es-MX")}
                      </span>
                      <span className="text-[9px] text-[#849AAD] block mt-0.5">
                        {d.visitors.toLocaleString("es-MX")} visitas
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Métodos de Pago & Resumen de Conversión (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs p-6 space-y-4">
                <h3 className="font-display text-base text-[#605246] uppercase border-b border-[#B1C7D4]/40 pb-3">
                  Preferencia de Canales de Cobro
                </h3>

                <div className="space-y-4">
                  <div className="p-3 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#009EE3]/10 text-[#009EE3] flex items-center justify-center">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[#605246] block">Mercado Pago</span>
                        <span className="text-[10px] text-[#849AAD]">Tarjetas de Crédito, Débito & MSI</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#605246]">{kpis.preferredPayment.mercadopago}%</span>
                  </div>

                  <div className="p-3 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#5E1C23]/10 text-[#5E1C23] flex items-center justify-center">
                        <Landmark size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[#605246] block">Transferencia SPEI Directa</span>
                        <span className="text-[10px] text-[#849AAD]">Cero comisión de pasarela bancaria</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-sm text-[#5E1C23]">{kpis.preferredPayment.spei}%</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded text-xs text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-700" /> Ahorro Operativo por SPEI:
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Al procesar el 42% del volumen vía SPEI directo, el taller retiene un 3.5% adicional de margen neto que se hubiera ido en comisiones de pasarela.
                  </p>
                </div>
              </div>

              {/* Funnel Conversión */}
              <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs p-6 space-y-3">
                <h3 className="font-display text-base text-[#605246] uppercase border-b border-[#B1C7D4]/40 pb-3">
                  Embudo de Conversión & Carritos
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded text-center">
                    <span className="text-[10px] text-[#849AAD] uppercase font-bold block">Tasa de Conversión</span>
                    <span className="font-mono font-bold text-lg text-[#605246] mt-0.5 block">{kpis.conversionRate}%</span>
                    <span className="text-[9px] text-emerald-600 font-bold">+0.75% sobre promedio</span>
                  </div>
                  <div className="p-3 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded text-center">
                    <span className="text-[10px] text-[#849AAD] uppercase font-bold block">Recuperación Carritos</span>
                    <span className="font-mono font-bold text-lg text-[#5E1C23] mt-0.5 block">{kpis.cartRecoveryRate}%</span>
                    <span className="text-[9px] text-[#849AAD]">Vía email automático</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TRÁFICO WEB & CONSULTAS EN LA PÁGINA */}
      {(activeTab === "ejecutivo" || activeTab === "trafico") && (
        <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#B1C7D4]/40 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-[#5E1C23]" />
                <h2 className="font-display text-base sm:text-lg text-[#605246] uppercase">
                  Tráfico Web & Consultas en la Plataforma
                </h2>
              </div>
              <p className="text-xs text-[#849AAD] mt-0.5">
                Métricas de visitas, páginas consultadas, retención de usuarios y dispositivos.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-[#605246]"><strong>{trafficAnalytics.weeklySessions.toLocaleString("es-MX")}</strong> sesiones</span>
              <span className="text-[#849AAD]">|</span>
              <span className="text-[#605246]"><strong>{trafficAnalytics.pageViews.toLocaleString("es-MX")}</strong> páginas vistas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded">
              <span className="text-[10px] uppercase font-bold text-[#849AAD] block">Visitantes Únicos</span>
              <span className="font-mono font-bold text-xl text-[#605246] block mt-1">
                {trafficAnalytics.uniqueVisitors.toLocaleString("es-MX")}
              </span>
              <span className="text-[10px] text-emerald-600 mt-1 block font-bold">+16.2% usuarios nuevos</span>
            </div>

            <div className="p-4 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded">
              <span className="text-[10px] uppercase font-bold text-[#849AAD] block">Duración Promedio de Sesión</span>
              <span className="font-mono font-bold text-xl text-[#605246] block mt-1">
                {trafficAnalytics.avgDuration}
              </span>
              <span className="text-[10px] text-[#849AAD] mt-1 block">Alta interacción con galería y video</span>
            </div>

            <div className="p-4 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded">
              <span className="text-[10px] uppercase font-bold text-[#849AAD] block">Tasa de Rebote (Bounce Rate)</span>
              <span className="font-mono font-bold text-xl text-[#605246] block mt-1">
                {trafficAnalytics.bounceRate}
              </span>
              <span className="text-[10px] text-emerald-600 mt-1 block font-bold">Saludable (por debajo de 40%)</span>
            </div>
          </div>

          {/* Top Pages Table */}
          <div className="space-y-3 pt-2">
            <h3 className="font-display text-sm text-[#605246] uppercase">
              Páginas y Secciones Más Consultadas por los Usuarios
            </h3>
            <div className="border border-[#B1C7D4]/50 rounded overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBFB] border-b border-[#B1C7D4]/50 text-[#849AAD] uppercase text-[10px]">
                  <tr>
                    <th className="p-3 font-bold">Sección / Ruta</th>
                    <th className="p-3 font-bold text-right">Vistas</th>
                    <th className="p-3 font-bold text-right">% Tráfico Total</th>
                    <th className="p-3 font-bold">Barra de Proporción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B1C7D4]/30">
                  {trafficAnalytics.topPages.map((page: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#F8FAFB]">
                      <td className="p-3">
                        <span className="font-bold text-[#605246] block">{page.label}</span>
                        <span className="font-mono text-[10px] text-[#849AAD]">{page.path}</span>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[#605246]">
                        {page.views.toLocaleString("es-MX")}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-[#5E1C23]">
                        {page.share}%
                      </td>
                      <td className="p-3 w-1/3">
                        <div className="w-full h-2 bg-[#EEF2F6] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#5E1C23]"
                            style={{ width: `${page.share * 2}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DE DÓNDE NOS VISITAN (GEOGRAFÍA) */}
      {(activeTab === "ejecutivo" || activeTab === "geografia") && (
        <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-[#5E1C23]" />
                <h2 className="font-display text-base sm:text-lg text-[#605246] uppercase">
                  De Dónde Nos Visitan (Origen Geográfico & Ventas)
                </h2>
              </div>
              <p className="text-xs text-[#849AAD] mt-0.5">
                Distribución territorial de clientes potenciales y pedidos generados a nivel nacional e internacional.
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-1 text-[#605246] rounded">
              México 91% · USA 9%
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Nacional */}
            <div className="space-y-3">
              <h3 className="font-display text-xs text-[#605246] uppercase tracking-wider font-bold">
                Mercado Nacional (Principales Plazas de Demanda)
              </h3>
              <div className="space-y-2.5">
                {geographicOrigins.national.map((geo: any, idx: number) => (
                  <div key={idx} className="p-3.5 bg-[#FAFBFB] border border-[#B1C7D4]/40 rounded-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{geo.flag}</span>
                        <span className="font-bold text-xs text-[#605246]">{geo.region}</span>
                      </div>
                      <span className="text-[10px] text-[#849AAD] block mt-0.5">
                        {geo.visitors.toLocaleString("es-MX")} visitantes · {geo.share}% del tráfico
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-[#5E1C23] block">
                        ${geo.revenue.toLocaleString("es-MX")} MXN
                      </span>
                      <span className="text-[9px] text-[#849AAD]">Ventas estimadas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internacional / Estados Unidos */}
            <div className="space-y-3">
              <h3 className="font-display text-xs text-[#605246] uppercase tracking-wider font-bold">
                Mercado Internacional (Interés Orgánico en EE.UU.)
              </h3>
              <div className="space-y-2.5">
                {geographicOrigins.international.map((geo: any, idx: number) => (
                  <div key={idx} className="p-3.5 bg-[#FAFBFB] border border-[#B1C7D4]/40 rounded-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{geo.flag}</span>
                        <span className="font-bold text-xs text-[#605246]">{geo.region}</span>
                      </div>
                      <span className="text-[10px] text-[#849AAD] block mt-0.5">
                        {geo.visitors.toLocaleString("es-MX")} visitantes · {geo.share}% del tráfico
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-[#5E1C23] block">
                        ${geo.revenue.toLocaleString("es-MX")} MXN
                      </span>
                      <span className="text-[9px] text-emerald-600 font-bold">Alta oportunidad</span>
                    </div>
                  </div>
                ))}

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded text-xs text-amber-900 space-y-1 mt-4">
                  <p className="font-bold">💡 Oportunidad Estratégica Detectada:</p>
                  <p className="text-[11px] leading-relaxed">
                    Existe una demanda espontánea constante desde Texas (San Antonio, Houston, Dallas). Se sugiere evaluar habilitar envíos internacionales asegurados vía DHL Express para capturar tickets en dólares con alto margen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUÉ BUSCAN LOS CLIENTES */}
      {(activeTab === "ejecutivo" || activeTab === "busquedas") && (
        <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Search size={16} className="text-[#5E1C23]" />
                <h2 className="font-display text-base sm:text-lg text-[#605246] uppercase">
                  Qué Buscan los Clientes (Términos e Intención de Compra)
                </h2>
              </div>
              <p className="text-xs text-[#849AAD] mt-0.5">
                Búsquedas tecleadas en el sitio web, consultas de catálogo y palabras clave de mayor aceleración.
              </p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300 px-3 py-1 rounded">
              Demanda en Tiempo Real
            </span>
          </div>

          <div className="border border-[#B1C7D4]/50 rounded overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBFB] border-b border-[#B1C7D4]/50 text-[#849AAD] uppercase text-[10px]">
                <tr>
                  <th className="p-3 font-bold">Término Buscado</th>
                  <th className="p-3 font-bold text-center">Consultas</th>
                  <th className="p-3 font-bold text-center">Tendencia</th>
                  <th className="p-3 font-bold text-center">Tasa Conversión</th>
                  <th className="p-3 font-bold">Clasificación de Intención</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B1C7D4]/30">
                {searchQueries.map((q: any, idx: number) => (
                  <tr key={idx} className="hover:bg-[#F8FAFB]">
                    <td className="p-3 font-bold text-[#605246]">
                      "{q.query}"
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-[#605246]">
                      {q.count.toLocaleString("es-MX")}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded">
                        {q.trend}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-[#5E1C23]">
                      {q.conversion}
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#849AAD]">
                        {q.intent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: INFORME EJECUTIVO PARA CONSEJO DE ADMINISTRACIÓN */}
      {(activeTab === "ejecutivo" || activeTab === "consejo") && (
        <div className="bg-white border-2 border-[#5E1C23]/20 rounded-sm shadow-md p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Header Membretado */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-[#5E1C23] pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CruzDeHierro size={20} color="#5E1C23" />
                <span className="font-display text-xl text-[#605246] tracking-wider uppercase font-bold">
                  BRAVÍO WESTERN
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#849AAD] font-bold">
                Taller Matriz · León, Guanajuato, México
              </p>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#5E1C23] block">
                INFORME EJECUTIVO DIRECTIVO
              </span>
              <span className="font-bold text-[#605246] block">{executiveSummary.period}</span>
              <span className="text-[10px] text-[#849AAD]">Emisión: {new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>

          {/* Destinatarios */}
          <div className="p-4 bg-[#F8FAFB] border border-[#B1C7D4]/50 rounded-sm text-xs space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#849AAD] block">
              Destinatarios Oficiales:
            </span>
            <p className="text-[#605246] font-bold">
              {executiveSummary.preparedFor}
            </p>
          </div>

          {/* Puntos Clave / Highlights */}
          <div className="space-y-3">
            <h3 className="font-display text-sm text-[#605246] uppercase tracking-wider border-b border-[#B1C7D4]/40 pb-2">
              1. Conclusiones y Logros Clave del Período
            </h3>
            <ul className="space-y-2 text-xs text-[#605246] leading-relaxed">
              {executiveSummary.highlights.map((h: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E1C23] mt-1.5 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recomendaciones Estratégicas */}
          <div className="space-y-3">
            <h3 className="font-display text-sm text-[#605246] uppercase tracking-wider border-b border-[#B1C7D4]/40 pb-2">
              2. Recomendaciones Estratégicas para Dirección
            </h3>
            <ul className="space-y-2 text-xs text-[#605246] leading-relaxed">
              {executiveSummary.strategicRecommendations.map((r: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Firma institucional */}
          <div className="pt-8 border-t border-[#B1C7D4]/40 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="w-48 border-b border-[#605246] mx-auto mb-2" />
              <p className="font-bold text-[#605246]">Carlos Barrón</p>
              <p className="text-[10px] text-[#849AAD] uppercase">Dirección General & Tecnología</p>
            </div>
            <div>
              <div className="w-48 border-b border-[#605246] mx-auto mb-2" />
              <p className="font-bold text-[#605246]">Gonzalo Arrieta Navarro</p>
              <p className="text-[10px] text-[#849AAD] uppercase">Dirección Comercial & Alianzas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
