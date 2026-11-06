"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  BarChart3,
  Image as ImageIcon,
  Music,
  LayoutTemplate,
  Video,
  FolderKanban,
  Megaphone,
  Shield,
  ShieldAlert,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Catálogo de Productos", icon: Package },
  { href: "/admin/inventory", label: "Matriz de Inventario", icon: Boxes },
  { href: "/admin/orders", label: "Pedidos & Envíos", icon: ShoppingBag },
  { href: "/admin/customers", label: "Clientes", icon: Users },
  { href: "/admin/promotions", label: "Promociones & Cupones", icon: Tag },
  { href: "/admin/reports", label: "Reportes & Ventas", icon: BarChart3 },
  { href: "/admin/media", label: "Multimedia (Fotos/Videos)", icon: ImageIcon },
  { href: "/admin/media/audio", label: "Audio Ambiental", icon: Music },
  { href: "/admin/content/home", label: "Editor del Home", icon: LayoutTemplate },
  { href: "/admin/content/intro", label: "Intro Cinematográfica", icon: Video },
  { href: "/admin/collections", label: "Colecciones", icon: FolderKanban },
  { href: "/admin/campaigns", label: "Campañas (Mujer 2026)", icon: Megaphone },
  { href: "/admin/users", label: "Usuarios & Roles", icon: Shield },
  { href: "/admin/audit", label: "Seguridad & Auditoría", icon: ShieldAlert },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bravio-volcanic text-bravio-bone flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-bravio-volcanic-card border-r border-bravio-volcanic-border flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-bravio-volcanic-border flex items-center justify-between">
            <div>
              <span className="text-[10px] font-sans tracking-cinematic text-bravio-gold block">
                ADMINISTRACIÓN
              </span>
              <h2 className="font-display text-xl text-bravio-bone tracking-widest uppercase">
                BRAVÍO
              </h2>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Sistema Activo" />
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-xs font-sans tracking-wider transition-colors ${
                    isActive
                      ? "bg-bravio-granate text-bravio-bone font-medium shadow-md shadow-bravio-granate/30"
                      : "text-bravio-cloudy hover:text-bravio-bone hover:bg-bravio-volcanic"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-bravio-bone/70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-bravio-volcanic-border">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-bravio-volcanic hover:bg-bravio-volcanic-border border border-bravio-volcanic-border text-xs text-bravio-cloudy hover:text-bravio-bone rounded transition-colors"
          >
            <span>Ver Tienda Pública</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-bravio-volcanic-card/50 border-b border-bravio-volcanic-border flex items-center justify-between px-6">
          <div className="text-xs font-sans text-bravio-cloudy">
            Rol: <span className="text-bravio-bone font-medium">Director Creativo / Superadmin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded">
              Base de Datos Conectada
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

