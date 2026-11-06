"use client";

import React, { useState, useEffect } from "react";
import { UserCheck, Shield, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import { AdminUser } from "@/lib/types";

const ROLES: { id: AdminUser["role"]; label: string; desc: string }[] = [
  { id: "superadmin", label: "Superadministrador", desc: "Acceso total a configuración, pagos, auditoría y usuarios." },
  { id: "operations", label: "Gerente de Operaciones", desc: "Gestión de pedidos, guías de paquetería e inventario." },
  { id: "content_editor", label: "Editor de Contenido", desc: "Edición de multimedia, audio ambiental, campañas y catálogo." },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRoleChange = async (id: string, newRole: AdminUser["role"]) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Rol de ${data.user.name} actualizado a ${newRole}.`);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, toggleStatus: true }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Estado de ${data.user.name} modificado.`);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#16120E] border-2 border-emerald-500 text-emerald-300 px-5 py-3 shadow-2xl flex items-center gap-3 font-sans text-xs">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-bravio-volcanic-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-cinematic text-bravio-gold uppercase">
              Control de Accesos (RBAC)
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase">
            USUARIOS & PERMISOS
          </h1>
        </div>

        <div className="text-xs font-sans text-bravio-cloudy">
          Seguridad: <strong className="text-emerald-400">Autenticación Multifactor Activada</strong>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-bravio-volcanic border-b border-bravio-volcanic-border text-bravio-cloudy uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Usuario</th>
              <th className="p-4">Correo Corporativo</th>
              <th className="p-4">Rol Asignado</th>
              <th className="p-4">Último Acceso</th>
              <th className="p-4 text-center">Estado</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bravio-volcanic-border text-bravio-bone">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-bravio-volcanic/50 transition-colors">
                <td className="p-4 font-display font-medium text-sm text-bravio-bone uppercase">
                  {u.name}
                </td>
                <td className="p-4 font-mono text-bravio-cloudy">
                  {u.email}
                </td>
                <td className="p-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                    className="bg-bravio-volcanic border border-bravio-volcanic-border p-1.5 text-xs text-bravio-bone focus:outline-none focus:border-bravio-granate uppercase"
                  >
                    {ROLES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 text-bravio-cloudy font-mono text-[11px]">
                  {new Date(u.lastLogin).toLocaleString("es-MX", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-sm ${
                      u.isActive
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-red-950 text-red-400 border border-red-800"
                    }`}
                  >
                    {u.isActive ? "Activo" : "Suspendido"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleToggleStatus(u.id)}
                    className="px-3 py-1 bg-bravio-volcanic hover:bg-bravio-volcanic-border border border-bravio-volcanic-border text-[10px] font-sans uppercase tracking-wider text-bravio-cloudy transition-colors"
                  >
                    {u.isActive ? "Suspender" : "Reactivar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Descriptions Box */}
      <div className="p-6 bg-bravio-volcanic-card border border-bravio-volcanic-border space-y-4">
        <h3 className="font-display text-sm text-bravio-bone uppercase tracking-wider">
          Descripción de Perfiles de Seguridad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          {ROLES.map((r) => (
            <div key={r.id} className="p-4 bg-bravio-volcanic border border-bravio-volcanic-border/60">
              <h4 className="font-bold text-bravio-bone uppercase mb-1">{r.label}</h4>
              <p className="text-bravio-cloudy leading-relaxed text-[11px]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
