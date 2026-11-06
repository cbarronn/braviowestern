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
        <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
          SEGURIDAD & CUMPLIMIENTO
        </span>
        <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone uppercase tracking-wide mt-1">
          BITÁCORA DE AUDITORÍA Y PERMISOS
        </h1>
        <p className="text-xs text-bravio-cloudy mt-1 font-light">
          Registro inmutable de todas las acciones administrativas: cambios de intro, modificaciones en multimedia, publicaciones y asignación de pedidos.
        </p>
      </div>

      {/* Permissions Breakdown Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded text-xs space-y-1">
          <div className="flex items-center gap-2 text-bravio-bone font-medium">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Rol Marketing</span>
          </div>
          <p className="text-[11px] text-bravio-cloudy/80">
            media.read, media.write, media.publish, collections.manage, campaigns.manage.
          </p>
        </div>

        <div className="p-4 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded text-xs space-y-1">
          <div className="flex items-center gap-2 text-bravio-bone font-medium">
            <Lock className="w-4 h-4 text-bravio-gold" />
            <span>Rol Ventas & Logística</span>
          </div>
          <p className="text-[11px] text-bravio-cloudy/80">
            orders.read, orders.manage, payments.read.
          </p>
        </div>

        <div className="p-4 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded text-xs space-y-1">
          <div className="flex items-center gap-2 text-bravio-bone font-medium">
            <ShieldCheck className="w-4 h-4 text-bravio-granate" />
            <span>Superadmin</span>
          </div>
          <p className="text-[11px] text-bravio-cloudy/80">
            settings.manage, security.audit, full access.
          </p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border rounded p-6">
        <h3 className="font-display text-sm uppercase text-bravio-bone mb-4">
          Registros de Eventos ({logs.length})
        </h3>

        <div className="divide-y divide-bravio-volcanic-border">
          {logs.map((log) => (
            <div
              key={log.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-bravio-gold font-bold">[{log.action}]</span>
                  <span className="text-bravio-bone font-medium">{log.entity}</span>
                  <span className="text-bravio-cloudy/50">•</span>
                  <span className="text-bravio-cloudy font-mono">{log.entityId}</span>
                </div>
                <p className="text-bravio-cloudy">{log.details}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[11px] text-bravio-cloudy/60 font-mono block">
                  {new Date(log.timestamp).toLocaleString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="text-[10px] text-bravio-cloudy/40">{log.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
