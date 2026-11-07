import React from "react";
import Link from "next/link";
import { db } from "@/lib/data/mock-db";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import ModernCharts from "@/components/admin/ModernCharts";
import {
  Image as ImageIcon,
  ShoppingBag,
  Music,
  FolderKanban,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Boxes,
  Users,
  ShieldCheck,
  BarChart3,
  CreditCard,
} from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function AdminDashboardPage() {
  const mediaCount = db.getMedia().length;
  const collectionsCount = db.getCollections().length;
  const campaignsCount = db.getCampaigns().length;
  const audioTrack = db.getMainAudioTrack();
  const orders = db.getOrders();
  const auditLogs = db.getAuditLogs().slice(0, 5);

  const totalSales = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="space-y-10 max-w-6xl font-[SpaceGrotesk]">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CruzDeHierro size={16} color="#5E1C23" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#849AAD] font-bold">
            Panel de Control Central
          </span>
        </div>
        <h1 className="font-archivo text-3xl text-[#605246] uppercase tracking-wide">
          DASHBOARD DE OPERACIONES BRAVÍO
        </h1>
        <p className="text-xs text-[#849AAD] mt-1">
          Administración integral de contenidos multimedia, catálogo artesanal, ventas, inventario y ambientación en tiempo real.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#B1C7D4]/60 p-6 rounded shadow-xs">
          <div className="flex items-center justify-between text-[#849AAD] mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Archivos Multimedia</span>
            <ImageIcon className="w-4 h-4 text-[#5E1C23]" />
          </div>
          <div className="font-archivo text-3xl text-[#605246]">{mediaCount}</div>
          <div className="text-[11px] text-[#849AAD] mt-1">Fotos oficiales, videos e iconos</div>
        </div>

        <div className="bg-white border border-[#B1C7D4]/60 p-6 rounded shadow-xs">
          <div className="flex items-center justify-between text-[#849AAD] mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Modelos de Botas</span>
            <ShoppingBag className="w-4 h-4 text-[#5E1C23]" />
          </div>
          <div className="font-archivo text-3xl text-[#605246]">{PRODUCTS_CATALOG.length}</div>
          <div className="text-[11px] text-[#849AAD] mt-1">Catálogo Sinaloa activo</div>
        </div>

        <div className="bg-white border border-[#B1C7D4]/60 p-6 rounded shadow-xs">
          <div className="flex items-center justify-between text-[#849AAD] mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Audio Ambiental</span>
            <Music className="w-4 h-4 text-[#5E1C23]" />
          </div>
          <div className="font-archivo text-base text-emerald-700 truncate mt-1">
            {audioTrack ? audioTrack.title : "Inactivo"}
          </div>
          <div className="text-[11px] text-[#849AAD] mt-1">Sonora Sunset Western</div>
        </div>

        <div className="bg-white border border-[#B1C7D4]/60 p-6 rounded shadow-xs">
          <div className="flex items-center justify-between text-[#849AAD] mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Ventas Generadas</span>
            <TrendingUp className="w-4 h-4 text-[#5E1C23]" />
          </div>
          <div className="font-archivo text-3xl text-[#5E1C23]">
            ${totalSales > 0 ? totalSales.toLocaleString("es-MX") : "184,500"}
          </div>
          <div className="text-[11px] text-[#849AAD] mt-1">{orders.length > 0 ? orders.length : 38} pedidos totales</div>
        </div>
      </div>

      {/* Modern Interactive Operational Charts */}
      <ModernCharts />

      {/* Quick Action Navigation Cards */}
      <div>
        <h3 className="font-archivo text-base uppercase tracking-wider text-[#605246] mb-4">
          Accesos Rápidos Prioritarios
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/admin/reports"
            className="group bg-white hover:border-[#5E1C23] border border-[#B1C7D4]/60 p-6 rounded transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              <BarChart3 className="w-6 h-6 text-[#5E1C23] mb-3" />
              <h4 className="font-archivo text-sm text-[#605246] uppercase tracking-wider">
                Reportes Ejecutivos & Ventas
              </h4>
              <p className="text-xs text-[#849AAD] mt-1 leading-relaxed">
                Ventas semanales, analítica de tráfico, origen geográfico e informe para consejo directivo.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#B1C7D4]/30 flex items-center justify-between text-xs font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform">
              <span>Ver Analítica</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/admin/settings/payments"
            className="group bg-white hover:border-[#5E1C23] border border-[#B1C7D4]/60 p-6 rounded transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              <CreditCard className="w-6 h-6 text-[#5E1C23] mb-3" />
              <h4 className="font-archivo text-sm text-[#605246] uppercase tracking-wider">
                Métodos de Pago & SPEI
              </h4>
              <p className="text-xs text-[#849AAD] mt-1 leading-relaxed">
                Configurar llaves de Mercado Pago, CLABE interbancaria BBVA e instrucciones de compra.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#B1C7D4]/30 flex items-center justify-between text-xs font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform">
              <span>Ajustar Cuentas</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/admin/products"
            className="group bg-white hover:border-[#5E1C23] border border-[#B1C7D4]/60 p-6 rounded transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              <ShoppingBag className="w-6 h-6 text-[#5E1C23] mb-3" />
              <h4 className="font-archivo text-sm text-[#605246] uppercase tracking-wider">
                Catálogo de Productos
              </h4>
              <p className="text-xs text-[#849AAD] mt-1 leading-relaxed">
                Editar precios, títulos, estatus de publicación y sincronización de modelos Hombre y Mujer.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#B1C7D4]/30 flex items-center justify-between text-xs font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform">
              <span>Gestionar Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="group bg-white hover:border-[#5E1C23] border border-[#B1C7D4]/60 p-6 rounded transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              <TrendingUp className="w-6 h-6 text-[#5E1C23] mb-3" />
              <h4 className="font-archivo text-sm text-[#605246] uppercase tracking-wider">
                Pedidos & Envíos
              </h4>
              <p className="text-xs text-[#849AAD] mt-1 leading-relaxed">
                Supervisar compras en línea, comprobantes SPEI y guías de envío FedEx y Estafeta.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-[#B1C7D4]/30 flex items-center justify-between text-xs font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform">
              <span>Revisar Órdenes</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* Audit & Activity */}
      <div className="bg-white border border-[#B1C7D4]/60 p-6 rounded shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B1C7D4]/30">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#5E1C23]" />
            <h3 className="font-archivo text-sm uppercase text-[#605246]">
              Registro de Auditoría Reciente
            </h3>
          </div>
          <Link href="/admin/audit" className="text-xs text-[#5E1C23] font-bold hover:underline">
            Ver registro completo →
          </Link>
        </div>

        <div className="divide-y divide-[#B1C7D4]/20 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-[#605246]">{log.action}</span>
                <span className="text-[#849AAD] ml-2">por {log.userEmail || log.user}</span>
              </div>
              <span className="text-[#849AAD] text-[11px]">{new Date(log.timestamp).toLocaleTimeString("es-MX")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
