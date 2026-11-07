"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  UserPlus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Mail,
  User,
  ShieldAlert,
} from "lucide-react";
import { AdminUser } from "@/lib/types";

const ROLES: { id: AdminUser["role"]; label: string; desc: string }[] = [
  {
    id: "superadmin",
    label: "Superadministrador",
    desc: "Acceso total a configuración, pagos, auditoría, reportes directivos y usuarios.",
  },
  {
    id: "operations",
    label: "Gerente de Operaciones",
    desc: "Gestión de pedidos, guías de paquetería, validación de transferencias e inventario.",
  },
  {
    id: "content_editor",
    label: "Editor de Contenido",
    desc: "Edición de multimedia, audio ambiental, campañas, historias y catálogo.",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  // Form states - Create
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    role: "operations" as AdminUser["role"],
  });

  // Form states - Edit
  const [editForm, setEditForm] = useState<{
    id: string;
    name: string;
    email: string;
    role: AdminUser["role"];
    isActive: boolean;
  } | null>(null);

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

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Crear usuario
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name || !createForm.email) {
      showToast("Por favor completa el nombre y correo corporativo.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        showToast(data.error || "Error al crear el usuario.", "error");
        return;
      }

      showToast(`Usuario ${data.user.name} dado de alta con éxito.`);
      setIsCreateOpen(false);
      setCreateForm({ name: "", email: "", role: "operations" });
      fetchUsers();
    } catch (err) {
      showToast("Error de conexión al crear usuario.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Editar usuario
  const openEditModal = (u: AdminUser) => {
    setEditForm({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      isActive: u.isActive,
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        showToast(data.error || "Error al actualizar el usuario.", "error");
        return;
      }

      showToast(`Datos de ${data.user.name} actualizados correctamente.`);
      setIsEditOpen(false);
      setEditForm(null);
      fetchUsers();
    } catch (err) {
      showToast("Error de red al actualizar usuario.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Cambiar rol rápido directamente en tabla
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

  // Suspender / Activar
  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, toggleStatus: true }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Estado de ${data.user.name} actualizado.`);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar usuario
  const confirmDelete = async () => {
    if (!userToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?id=${userToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        showToast(data.error || "No se pudo eliminar el usuario.", "error");
        return;
      }

      showToast(`Usuario ${userToDelete.name} eliminado del sistema.`);
      setUserToDelete(null);
      fetchUsers();
    } catch (err) {
      showToast("Error al eliminar usuario.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 bg-white border-2 px-5 py-3 shadow-2xl flex items-center gap-3 font-sans text-xs rounded-sm ${
            toast.type === "success"
              ? "border-emerald-500 text-emerald-800"
              : "border-red-500 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-widest text-bravio-tsunami uppercase font-bold">
              Control de Accesos (RBAC)
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-volcanic tracking-wider uppercase">
            USUARIOS & PERMISOS
          </h1>
          <p className="text-xs text-bravio-tsunami mt-1 font-sans">
            Alta, edición de datos corporativos, roles y revocación de permisos de acceso.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-xs font-sans text-bravio-tsunami mr-2">
            Seguridad: <strong className="text-emerald-600">Autenticación Multifactor Activada</strong>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-sans font-bold uppercase tracking-wider transition-colors rounded-sm shadow-sm"
          >
            <UserPlus size={15} />
            <span>Alta de Usuario</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-[#F8FAFB] border-b border-[#B1C7D4]/50 text-bravio-tsunami uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4 font-bold">Usuario</th>
              <th className="p-4 font-bold">Correo Corporativo</th>
              <th className="p-4 font-bold">Rol Asignado</th>
              <th className="p-4 font-bold">Último Acceso</th>
              <th className="p-4 text-center font-bold">Estado</th>
              <th className="p-4 text-right font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B1C7D4]/30 text-bravio-volcanic">
            {users.map((u) => {
              const isPrimary = u.email === "cbarron@ti-boot.com" || u.id === "usr-1";
              return (
                <tr key={u.id} className="hover:bg-[#F8FAFB] transition-colors">
                  <td className="p-4 font-display font-medium text-sm text-bravio-volcanic uppercase">
                    <div className="flex items-center gap-2">
                      <span>{u.name}</span>
                      {isPrimary && (
                        <span className="px-1.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-800 text-[9px] font-sans font-bold uppercase rounded">
                          Principal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-bravio-tsunami">
                    {u.email}
                  </td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                      className="bg-white border border-[#B1C7D4]/60 rounded-sm p-1.5 text-xs text-bravio-volcanic focus:outline-none focus:border-bravio-granate uppercase cursor-pointer"
                    >
                      {ROLES.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-bravio-tsunami font-mono text-[11px]">
                    {new Date(u.lastLogin).toLocaleString("es-MX", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-sm ${
                        u.isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      {u.isActive ? "Activo" : "Suspendido"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(u)}
                        title="Editar usuario"
                        className="p-1.5 bg-white hover:bg-slate-100 border border-[#B1C7D4]/60 text-bravio-volcanic transition-colors rounded-sm shadow-xs"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className="px-2.5 py-1 bg-white hover:bg-[#F8FAFB] border border-[#B1C7D4]/60 text-[10px] font-sans uppercase tracking-wider text-bravio-volcanic transition-colors rounded-sm shadow-xs"
                      >
                        {u.isActive ? "Suspender" : "Reactivar"}
                      </button>

                      {!isPrimary && (
                        <button
                          onClick={() => setUserToDelete(u)}
                          title="Eliminar usuario"
                          className="p-1.5 bg-white hover:bg-red-50 border border-red-200 text-red-600 hover:text-red-700 transition-colors rounded-sm shadow-xs"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Role Descriptions Box */}
      <div className="p-6 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm space-y-4">
        <h3 className="font-display text-sm text-bravio-volcanic uppercase tracking-wider">
          Descripción de Perfiles de Seguridad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          {ROLES.map((r) => (
            <div key={r.id} className="p-4 bg-[#F8FAFB] border border-[#B1C7D4]/40 rounded-sm">
              <h4 className="font-bold text-bravio-volcanic uppercase mb-1">{r.label}</h4>
              <p className="text-bravio-tsunami leading-relaxed text-[11px]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ALTA DE USUARIO */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#B1C7D4] w-full max-w-lg rounded-sm shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-4">
              <div className="flex items-center gap-2">
                <UserPlus size={20} className="text-[#5E1C23]" />
                <h3 className="font-display text-lg text-bravio-volcanic uppercase">
                  Alta de Nuevo Usuario
                </h3>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-bravio-tsunami hover:text-bravio-volcanic p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-bravio-volcanic mb-1.5">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bravio-tsunami" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Daniela Arrieta"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] pl-9 pr-3 py-2.5 text-xs text-bravio-volcanic focus:outline-none focus:border-[#5E1C23]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-bravio-volcanic mb-1.5">
                  Correo Electrónico Corporativo
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bravio-tsunami" />
                  <input
                    type="email"
                    required
                    placeholder="usuario@braviowestern.com.mx"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] pl-9 pr-3 py-2.5 text-xs text-bravio-volcanic focus:outline-none focus:border-[#5E1C23]"
                  />
                </div>
                <p className="text-[10px] text-bravio-tsunami mt-1">
                  A este correo se enviarán los códigos de verificación de doble factor (2FA) para el acceso.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-bravio-volcanic mb-1.5">
                  Rol y Permisos
                </label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm({ ...createForm, role: e.target.value as AdminUser["role"] })}
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2.5 text-xs text-bravio-volcanic focus:outline-none focus:border-[#5E1C23] uppercase"
                >
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#B1C7D4]/40">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 bg-white border border-[#B1C7D4] hover:bg-[#F8FAFB] text-bravio-volcanic font-bold uppercase tracking-wider text-[11px] rounded-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-[11px] rounded-sm shadow-sm flex items-center gap-2"
                >
                  <UserPlus size={14} />
                  <span>{loading ? "Guardando..." : "Dar de Alta"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR USUARIO */}
      {isEditOpen && editForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#B1C7D4] w-full max-w-lg rounded-sm shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-4">
              <div className="flex items-center gap-2">
                <Edit3 size={20} className="text-[#5E1C23]" />
                <h3 className="font-display text-lg text-bravio-volcanic uppercase">
                  Editar Datos del Usuario
                </h3>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-bravio-tsunami hover:text-bravio-volcanic p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-bravio-volcanic mb-1.5">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bravio-tsunami" />
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] pl-9 pr-3 py-2.5 text-xs text-bravio-volcanic focus:outline-none focus:border-[#5E1C23]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-bravio-volcanic mb-1.5">
                  Correo Electrónico Corporativo
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bravio-tsunami" />
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] pl-9 pr-3 py-2.5 text-xs text-bravio-volcanic focus:outline-none focus:border-[#5E1C23]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-bravio-volcanic mb-1.5">
                    Rol Asignado
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as AdminUser["role"] })}
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2.5 text-xs text-bravio-volcanic focus:outline-none focus:border-[#5E1C23] uppercase"
                  >
                    {ROLES.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-bravio-volcanic mb-1.5">
                    Estado de Acceso
                  </label>
                  <select
                    value={editForm.isActive ? "active" : "suspended"}
                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value === "active" })}
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2.5 text-xs text-bravio-volcanic focus:outline-none focus:border-[#5E1C23] uppercase"
                  >
                    <option value="active">Activo</option>
                    <option value="suspended">Suspendido</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#B1C7D4]/40">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2.5 bg-white border border-[#B1C7D4] hover:bg-[#F8FAFB] text-bravio-volcanic font-bold uppercase tracking-wider text-[11px] rounded-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-[11px] rounded-sm shadow-sm flex items-center gap-2"
                >
                  <Edit3 size={14} />
                  <span>{loading ? "Guardando..." : "Guardar Cambios"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAR ELIMINACIÓN */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-red-300 w-full max-w-md rounded-sm shadow-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 text-red-600">
              <ShieldAlert size={24} />
              <h3 className="font-display text-base uppercase text-bravio-volcanic">
                Confirmar Eliminación de Usuario
              </h3>
            </div>

            <p className="font-sans text-xs text-bravio-volcanic leading-relaxed">
              ¿Estás seguro de que deseas eliminar permanentemente al usuario{" "}
              <strong className="text-red-700">{userToDelete.name}</strong> ({userToDelete.email})?
              Esta acción revocará inmediatamente todos sus accesos al panel administrativo.
            </p>

            <div className="pt-3 flex justify-end gap-3 border-t border-[#B1C7D4]/40 font-sans text-xs">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 bg-white border border-[#B1C7D4] hover:bg-[#F8FAFB] text-bravio-volcanic font-bold uppercase text-[11px] rounded-sm"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold uppercase text-[11px] rounded-sm shadow-sm flex items-center gap-1.5"
              >
                <Trash2 size={13} />
                <span>{loading ? "Eliminando..." : "Sí, Eliminar Usuario"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
