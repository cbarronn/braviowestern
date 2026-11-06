import React from "react";
import Link from "next/link";
import { db } from "@/lib/data/mock-db";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import {
  Image as ImageIcon,
  ShoppingBag,
  Music,
  FolderKanban,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

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
    <div className="space-y-10 max-w-6xl">
      <div>
        <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
          PANEL DE CONTROL CENTRAL
        </span>
        <h1 className="font-display text-3xl text-bravio-bone uppercase tracking-wide mt-1">
          DASHBOARD DE OPERACIONES BRAVÍO
        </h1>
        <p className="text-xs text-bravio-cloudy mt-1 font-light">
          Administración integral de contenidos multimedia, catálogo artesanal, ventas y ambientación sin necesidad de despliegues de código.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 rounded-sm">
          <div className="flex items-center justify-between text-bravio-cloudy mb-2">
            <span className="text-xs uppercase font-sans tracking-wider">Archivos Multimedia</span>
            <ImageIcon className="w-4 h-4 text-bravio-gold" />
          </div>
          <div className="font-display text-2xl text-bravio-bone">{mediaCount}</div>
          <div className="text-[11px] text-bravio-cloudy/70 mt-1">Fotos, videos y vectores</div>
        </div>

        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 rounded-sm">
          <div className="flex items-center justify-between text-bravio-cloudy mb-2">
            <span className="text-xs uppercase font-sans tracking-wider">Modelos de Botas</span>
            <ShoppingBag className="w-4 h-4 text-bravio-gold" />
          </div>
          <div className="font-display text-2xl text-bravio-bone">{PRODUCTS_CATALOG.length}</div>
          <div className="text-[11px] text-bravio-cloudy/70 mt-1">Catálogo Sinaloa activo</div>
        </div>

        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 rounded-sm">
          <div className="flex items-center justify-between text-bravio-cloudy mb-2">
            <span className="text-xs uppercase font-sans tracking-wider">Audio Ambiental</span>
            <Music className="w-4 h-4 text-bravio-gold" />
          </div>
          <div className="font-display text-base text-emerald-400 truncate">
            {audioTrack ? audioTrack.title : "Inactivo"}
          </div>
          <div className="text-[11px] text-bravio-cloudy/70 mt-1">Sonora Sunset Western</div>
        </div>

        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 rounded-sm">
          <div className="flex items-center justify-between text-bravio-cloudy mb-2">
            <span className="text-xs uppercase font-sans tracking-wider">Ventas Generadas</span>
            <TrendingUp className="w-4 h-4 text-bravio-gold" />
          </div>
          <div className="font-display text-2xl text-bravio-bone">
            ${totalSales.toLocaleString("es-MX")}
          </div>
          <div className="text-[11px] text-bravio-cloudy/70 mt-1">{orders.length} pedidos totales</div>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div>
        <h3 className="font-display text-base uppercase tracking-wider text-bravio-bone mb-4">
          Accesos Rápidos Prioritarios
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/media"
            className="group bg-bravio-volcanic-card hover:bg-bravio-volcanic-border border border-bravio-volcanic-border p-6 rounded-sm transition-all flex flex-col justify-between"
          >
            <div>
              <ImageIcon className="w-6 h-6 text-bravio-granate mb-3" />
              <h4 className="font-display text-sm text-bravio-bone uppercase tracking-wider">
                Biblioteca Multimedia
              </h4>
              <p className="text-xs text-bravio-cloudy mt-1">
                Subir fotografías, organizar por carpetas (Hombre, Mujer, Productos), editar alt y asignar SKU.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-sans text-bravio-gold group-hover:translate-x-1 transition-transform">
              <span>Gestionar Fotos</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/admin/content/home"
            className="group bg-bravio-volcanic-card hover:bg-bravio-volcanic-border border border-bravio-volcanic-border p-6 rounded-sm transition-all flex flex-col justify-between"
          >
            <div>
              <Sparkles className="w-6 h-6 text-bravio-granate mb-3" />
              <h4 className="font-display text-sm text-bravio-bone uppercase tracking-wider">
                Editor del Home
              </h4>
              <p className="text-xs text-bravio-cloudy mt-1">
                Reordenar secciones, cambiar titulares, actualizar imagen de hero y botones sin desplegar código.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-sans text-bravio-gold group-hover:translate-x-1 transition-transform">
              <span>Personalizar Portada</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/admin/media/audio"
            className="group bg-bravio-volcanic-card hover:bg-bravio-volcanic-border border border-bravio-volcanic-border p-6 rounded-sm transition-all flex flex-col justify-between"
          >
            <div>
              <Music className="w-6 h-6 text-bravio-granate mb-3" />
              <h4 className="font-display text-sm text-bravio-bone uppercase tracking-wider">
                Control de Música
              </h4>
              <p className="text-xs text-bravio-cloudy mt-1">
                Subir canciones autorizadas de country western instrumental, ajustar volumen y documentar licencias.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-sans text-bravio-gold group-hover:translate-x-1 transition-transform">
              <span>Configurar Audio</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Audit Trail */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border rounded-sm p-6">
        <h3 className="font-display text-sm uppercase tracking-wider text-bravio-bone mb-4">
          Registro de Auditoría Reciente
        </h3>
        <div className="divide-y divide-bravio-volcanic-border">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-mono text-bravio-gold font-bold mr-2">[{log.action}]</span>
                <span className="text-bravio-bone">{log.details}</span>
              </div>
              <span className="text-[11px] text-bravio-cloudy/60 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

