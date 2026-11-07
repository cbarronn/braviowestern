"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
  User,
} from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

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
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    fetch("/api/admin/auth/session")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthenticated");
        return res.json();
      })
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        } else {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      router.push("/admin/login");
    }
  };

  // If on login page, render clean canvas without admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#605246] flex flex-col md:flex-row font-[SpaceGrotesk]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#B1C7D4]/50 flex-shrink-0 flex flex-col justify-between shadow-xs">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-[#B1C7D4]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CruzDeHierro size={18} color="#5E1C23" />
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#849AAD] font-bold block uppercase">
                  ADMINISTRACIÓN
                </span>
                <h2 className="font-archivo text-lg text-[#605246] tracking-wider uppercase">
                  BRAVÍO
                </h2>
              </div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Sistema Activo" />
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-xs font-bold tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#5E1C23] text-white shadow-xs"
                      : "text-[#605246] hover:bg-[#F4F7F9] hover:text-[#5E1C23]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User info */}
        <div className="p-4 border-t border-[#B1C7D4]/40 space-y-2">
          {currentUser && (
            <div className="px-2 py-1.5 bg-[#F4F7F9] border border-[#B1C7D4]/40 rounded text-xs">
              <div className="flex items-center gap-2">
                <User size={12} className="text-[#5E1C23]" />
                <span className="font-bold text-[#605246] truncate">{currentUser.name}</span>
              </div>
              <span className="text-[10px] text-[#849AAD] block uppercase tracking-wider pl-5">
                {currentUser.role}
              </span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white hover:bg-[#F4F7F9] border border-[#B1C7D4] text-xs text-[#605246] font-bold rounded transition-colors"
          >
            <span>Ver Tienda Pública</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-red-50 hover:bg-red-100 border border-red-200 text-xs text-red-700 font-bold rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-[#B1C7D4]/40 flex items-center justify-between px-6 shadow-2xs">
          <div className="text-xs text-[#849AAD]">
            Usuario activo:{" "}
            <span className="text-[#605246] font-bold">
              {currentUser ? `${currentUser.name} (${currentUser.role})` : "Superadmin Autenticado"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-[#5E1C23] hover:underline flex items-center gap-1.5"
            >
              <LogOut size={13} />
              <span>Salir</span>
            </button>
            <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-500/30 px-2.5 py-1 rounded font-bold">
              Sesión Segura TLS
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
