"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, History, UserCheck, Lock } from "lucide-react";
import { AuditLog } from "@/lib/types";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/audit");
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs uppercase tracking-widest text-bravio-tsunami font-sans font-bold">
          SEGURIDAD & CUMPLIMIENTO
        </span>
        <h1 className="font-display text-2xl sm:text-3xl text-bravio-volcanic uppercase tracking-wide mt-1">
          BITÁCORA DE AUDITORÍA Y PERMISOS
        </h1>
        <p className="text-xs text-bravio-tsunami mt-1 font-light">
          Registro inmutable de todas las acciones administrativas: cambios de intro, modificaciones en multimedia, publicaciones y asignación de pedidos.
        </p>
      </div>

      {/* Permissions Breakdown Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2 text-bravio-volcanic font-medium">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">Rol Marketing</span>
          </div>
          <p className="text-[11px] text-bravio-tsunami">
            media.read, media.write, media.publish, collections.manage, campaigns.manage.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2 text-bravio-volcanic font-medium">
            <Lock className="w-4 h-4 text-bravio-granate" />
            <span className="font-bold">Rol Ventas & Logística</span>
          </div>
          <p className="text-[11px] text-bravio-tsunami">
            orders.read, orders.manage, payments.read.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2 text-bravio-volcanic font-medium">
            <ShieldCheck className="w-4 h-4 text-bravio-granate" />
            <span className="font-bold">Superadmin</span>
          </div>
          <p className="text-[11px] text-bravio-tsunami">
            settings.manage, security.audit, full access.
          </p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6">
        <h3 className="font-display text-sm uppercase text-bravio-volcanic mb-4">
          Registros de Eventos ({logs.length})
        </h3>

        <div className="divide-y divide-[#B1C7D4]/30">
          {logs.map((log) => (
            <div
              key={log.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#F8FAFB] px-2 rounded-sm transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-bravio-granate font-bold">[{log.action}]</span>
                  <span className="text-bravio-volcanic font-medium">{log.entity}</span>
                  <span className="text-[#B1C7D4]">•</span>
                  <span className="text-bravio-tsunami font-mono">{log.entityId}</span>
                </div>
                <p className="text-bravio-tsunami">{log.details}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[11px] text-bravio-tsunami font-mono block">
                  {new Date(log.timestamp).toLocaleString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-[10px] text-bravio-tsunami/70 font-medium">{log.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

