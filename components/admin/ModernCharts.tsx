"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Layers,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  Sparkles
} from "lucide-react";

// Mock Time Series Data for 7 days, 30 days, Year
const TIMELINE_DATA = {
  "7d": [
    { label: "Lun 1", revenue: 18400, orders: 4, visitors: 280 },
    { label: "Mar 2", revenue: 29500, orders: 7, visitors: 410 },
    { label: "Mié 3", revenue: 21900, orders: 5, visitors: 340 },
    { label: "Jue 4", revenue: 42000, orders: 10, visitors: 580 },
    { label: "Vie 5", revenue: 56800, orders: 14, visitors: 790 },
    { label: "Sáb 6", revenue: 68400, orders: 16, visitors: 920 },
    { label: "Dom 7", revenue: 48600, orders: 11, visitors: 690 },
  ],
  "30d": [
    { label: "Sem 1", revenue: 142000, orders: 34, visitors: 2800 },
    { label: "Sem 2", revenue: 186500, orders: 45, visitors: 3400 },
    { label: "Sem 3", revenue: 224000, orders: 52, visitors: 4100 },
    { label: "Sem 4", revenue: 279500, orders: 68, visitors: 5200 },
  ],
  "2026": [
    { label: "Ene", revenue: 180000, orders: 42, visitors: 3200 },
    { label: "Feb", revenue: 220000, orders: 51, visitors: 3900 },
    { label: "Mar", revenue: 290000, orders: 69, visitors: 4800 },
    { label: "Abr", revenue: 340000, orders: 82, visitors: 5600 },
    { label: "May", revenue: 390000, orders: 94, visitors: 6200 },
    { label: "Jun", revenue: 460000, orders: 110, visitors: 7100 },
  ],
};

const LEATHER_DISTRIBUTION = [
  { name: "Gamuza de Res", percentage: 35, revenue: 148500, color: "#849AAD", models: "Arena / Miel" },
  { name: "Res Flor Entera", percentage: 40, revenue: 169800, color: "#605246", models: "Negro / Café / Marrón" },
  { name: "Exóticos de Lujo", percentage: 25, revenue: 106200, color: "#5E1C23", models: "Alligator / Avestruz / Pitón / Caimán" },
];

const SIZE_STOCK_DATA = [
  { size: "25.0", stock: 12, reserved: 2, status: "optimal" },
  { size: "25.5", stock: 15, reserved: 3, status: "optimal" },
  { size: "26.0", stock: 24, reserved: 5, status: "optimal" },
  { size: "26.5", stock: 32, reserved: 8, status: "optimal" },
  { size: "27.0", stock: 45, reserved: 12, status: "optimal" },
  { size: "27.5", stock: 38, reserved: 9, status: "optimal" },
  { size: "28.0", stock: 29, reserved: 6, status: "optimal" },
  { size: "28.5", stock: 18, reserved: 4, status: "optimal" },
  { size: "29.0", stock: 9, reserved: 3, status: "low" },
  { size: "29.5", stock: 5, reserved: 2, status: "critical" },
  { size: "30.0", stock: 6, reserved: 1, status: "critical" },
];

export default function ModernCharts() {
  const [period, setPeriod] = useState<"7d" | "30d" | "2026">("7d");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const currentData = TIMELINE_DATA[period];
  const maxRevenue = Math.max(...currentData.map((d) => d.revenue));

  // Compute SVG smooth curve coordinates for Area Chart
  const svgWidth = 700;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const points = currentData.map((d, i) => {
    const x = paddingX + (i / (currentData.length - 1)) * chartW;
    const y = paddingY + chartH - (d.revenue / maxRevenue) * chartH;
    return { x, y, ...d };
  });

  // Generate SVG path string with smooth cubic Bezier
  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (p.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (p.x - prev.x) / 2;
    const cp2y = p.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
  }, "");

  // Area path closing down to baseline
  const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingY + chartH} L ${points[0].x} ${paddingY + chartH} Z`;

  return (
    <div className="space-y-8 font-[SpaceGrotesk]">
      {/* =========================================================
          1. MODERN REVENUE & SALES TIMELINE (SVG AREA CHART)
      ========================================================= */}
      <div className="bg-white border border-[#B1C7D4]/60 p-6 sm:p-8 rounded-lg shadow-sm">
        {/* Header with Title and Period Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#B1C7D4]/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#5E1C23]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#849AAD]">
                Rendimiento Comercial en Vivo
              </span>
            </div>
            <h3 className="font-archivo text-xl text-[#605246] uppercase tracking-wide">
              Curva de Facturación & Órdenes
            </h3>
          </div>

          <div className="flex items-center bg-[#F4F7F9] p-1 border border-[#B1C7D4]/50 rounded-sm">
            {(["7d", "30d", "2026"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setPeriod(tab);
                  setHoveredPoint(null);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  period === tab
                    ? "bg-[#5E1C23] text-white shadow-xs"
                    : "text-[#605246] hover:text-[#5E1C23]"
                }`}
              >
                {tab === "7d" ? "7 Días" : tab === "30d" ? "30 Días" : "Año 2026"}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              {/* Modern Gradient for Area */}
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5E1C23" stopOpacity="0.32" />
                <stop offset="50%" stopColor="#849AAD" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#B1C7D4" stopOpacity="0.0" />
              </linearGradient>

              {/* Stroke Gradient */}
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#849AAD" />
                <stop offset="50%" stopColor="#5E1C23" />
                <stop offset="100%" stopColor="#5E1C23" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = paddingY + chartH * ratio;
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={paddingX + chartW}
                    y2={y}
                    stroke="#B1C7D4"
                    strokeOpacity="0.35"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill="#849AAD"
                    className="font-mono font-medium"
                  >
                    ${Math.round(((1 - ratio) * maxRevenue) / 1000)}k
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaD} fill="url(#areaGradient)" />

            {/* Curved Stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#strokeGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Vertical crosshair on hover */}
            {hoveredPoint !== null && (
              <line
                x1={points[hoveredPoint].x}
                y1={paddingY}
                x2={points[hoveredPoint].x}
                y2={paddingY + chartH}
                stroke="#5E1C23"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.8"
              />
            )}

            {/* Interactive Data Dots */}
            {points.map((p, idx) => {
              const isHovered = hoveredPoint === idx;
              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(idx)}
                >
                  {/* Outer Pulsing Ring */}
                  {isHovered && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="10"
                      fill="#5E1C23"
                      fillOpacity="0.2"
                      className="animate-ping"
                    />
                  )}
                  {/* Inner Dot */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? "6" : "4"}
                    fill={isHovered ? "#5E1C23" : "#FFFFFF"}
                    stroke="#5E1C23"
                    strokeWidth={isHovered ? "2.5" : "2"}
                    className="transition-all duration-200"
                  />
                  {/* X Axis Label */}
                  <text
                    x={p.x}
                    y={paddingY + chartH + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isHovered ? "#5E1C23" : "#849AAD"}
                    fontWeight={isHovered ? "bold" : "normal"}
                    className="font-mono"
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Tooltip Card */}
          {hoveredPoint !== null && (
            <div
              className="absolute pointer-events-none bg-[#605246] text-white p-3.5 rounded shadow-xl border border-[#B1C7D4]/40 z-20 transition-all text-xs"
              style={{
                left: `${Math.min(80, Math.max(10, (points[hoveredPoint].x / svgWidth) * 100))}%`,
                top: "10px",
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-1.5 mb-1.5">
                <span className="font-archivo text-white uppercase text-[11px]">
                  {points[hoveredPoint].label}
                </span>
                <span className="text-[10px] text-[#B1C7D4] uppercase">
                  {points[hoveredPoint].orders} pedidos
                </span>
              </div>
              <div className="font-archivo text-base text-[#B1C7D4]">
                ${points[hoveredPoint].revenue.toLocaleString("es-MX")}{" "}
                <span className="text-[10px] text-white/70 font-mono">MXN</span>
              </div>
              <div className="text-[10px] text-white/80 mt-1 flex justify-between gap-4">
                <span>Visitas: {points[hoveredPoint].visitors}</span>
                <span>
                  Ticket: $
                  {Math.round(
                    points[hoveredPoint].revenue / points[hoveredPoint].orders
                  ).toLocaleString("es-MX")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          2. TWO-COLUMN GRID: LEATHER DISTRIBUTION & INVENTORY
      ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown: Interactive Donut & Share */}
        <div className="bg-white border border-[#B1C7D4]/60 p-6 sm:p-8 rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B1C7D4]/30">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-[#5E1C23]" />
                <h4 className="font-archivo text-base text-[#605246] uppercase tracking-wide">
                  Ventas por Tipo de Piel
                </h4>
              </div>
              <span className="text-[10px] text-[#849AAD] uppercase font-bold tracking-widest">
                Catálogo Activo
              </span>
            </div>

            {/* Donut Chart & Legend Row */}
            <div className="flex flex-col sm:flex-row items-center gap-8 my-6">
              {/* Donut SVG */}
              <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#F4F7F9"
                    strokeWidth="14"
                  />
                  {/* Segment 1: Gamuza (35%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#849AAD"
                    strokeWidth="14"
                    strokeDasharray="83.56 155.19"
                    strokeDashoffset="0"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    onMouseEnter={() => setActiveCategory(0)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                  {/* Segment 2: Res Flor Entera (40%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#605246"
                    strokeWidth="14"
                    strokeDasharray="95.5 143.25"
                    strokeDashoffset="-83.56"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    onMouseEnter={() => setActiveCategory(1)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                  {/* Segment 3: Exóticos (25%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#5E1C23"
                    strokeWidth="14"
                    strokeDasharray="59.69 179.06"
                    strokeDashoffset="-179.06"
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    onMouseEnter={() => setActiveCategory(2)}
                    onMouseLeave={() => setActiveCategory(null)}
                  />
                </svg>

                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] text-[#849AAD] uppercase tracking-wider font-bold">
                    Total Pieles
                  </span>
                  <span className="font-archivo text-base text-[#605246]">
                    $424,500
                  </span>
                  <span className="text-[9px] text-[#5E1C23] font-bold">
                    100% Genuina
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 w-full space-y-3.5">
                {LEATHER_DISTRIBUTION.map((item, idx) => (
                  <div
                    key={item.name}
                    onMouseEnter={() => setActiveCategory(idx)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className={`p-2.5 rounded border transition-all cursor-pointer ${
                      activeCategory === idx
                        ? "bg-[#F4F7F9] border-[#605246]"
                        : "border-[#B1C7D4]/40 hover:border-[#605246]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-bold text-[#605246]">{item.name}</span>
                      </div>
                      <span className="font-archivo text-xs text-[#5E1C23]">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#849AAD]">
                      <span>{item.models}</span>
                      <span>${item.revenue.toLocaleString("es-MX")} MXN</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#B1C7D4]/30 text-[11px] text-[#849AAD] flex justify-between">
            <span>León Guanajuato · Curtición Vegetal</span>
            <span className="text-emerald-700 font-bold">14 Modelos Validados</span>
          </div>
        </div>

        {/* Inventory Velocity & Stock Levels by Size */}
        <div className="bg-white border border-[#B1C7D4]/60 p-6 sm:p-8 rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B1C7D4]/30">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#5E1C23]" />
                <h4 className="font-archivo text-base text-[#605246] uppercase tracking-wide">
                  Disponibilidad de Stock por Talla
                </h4>
              </div>
              <span className="text-[10px] text-[#849AAD] uppercase font-bold tracking-widest">
                Matriz 25 - 30 MX
              </span>
            </div>

            <p className="text-xs text-[#849AAD] mb-6">
              Niveles de inventario físico vs. reservado por número. Las tallas 27.0 y 27.5 concentran la mayor rotación comercial.
            </p>

            {/* Vertical Bar Chart */}
            <div className="flex items-end justify-between gap-1.5 h-44 pt-4 border-b border-[#B1C7D4]/40 px-1">
              {SIZE_STOCK_DATA.map((bar) => {
                const maxStock = 50;
                const heightPct = Math.min(100, (bar.stock / maxStock) * 100);
                const isCritical = bar.status === "critical";
                const isLow = bar.status === "low";

                return (
                  <div
                    key={bar.size}
                    className="flex-1 flex flex-col items-center gap-2 group relative"
                  >
                    {/* Hover Tooltip */}
                    <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#605246] text-white text-[10px] py-1 px-2 rounded shadow whitespace-nowrap z-10 font-mono">
                      {bar.stock} pares ({bar.reserved} res.)
                    </div>

                    {/* Bar Cylinder */}
                    <div className="w-full bg-[#F4F7F9] rounded-t-sm h-36 flex items-end overflow-hidden border border-[#B1C7D4]/30">
                      <div
                        className={`w-full transition-all duration-500 rounded-t-xs ${
                          isCritical
                            ? "bg-[#5E1C23]"
                            : isLow
                            ? "bg-[#849AAD]"
                            : "bg-[#605246] group-hover:bg-[#5E1C23]"
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>

                    {/* Size Label */}
                    <span className="text-[10px] font-mono text-[#605246] group-hover:font-bold">
                      {bar.size}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#B1C7D4]/30 flex items-center justify-between text-[11px] text-[#849AAD]">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#605246]" />
                Óptimo
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#849AAD]" />
                Rotación Rápida
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5E1C23]" />
                Reorden Urgente
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
