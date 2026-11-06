"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import { Customer } from "@/lib/types";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [query, setQuery] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      if (data.customers) setCustomers(data.customers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter((c) =>
    !query ||
    c.firstName.toLowerCase().includes(query.toLowerCase()) ||
    c.lastName.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase()) ||
    c.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-bravio-volcanic-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-cinematic text-bravio-gold uppercase">
              Directorio Comercial
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase">
            CLIENTES REGISTRADOS
          </h1>
        </div>

        <div className="text-xs font-sans text-bravio-cloudy">
          Total: <strong className="text-bravio-bone font-mono">{customers.length}</strong> clientes registrados
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bravio-cloudy" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, correo electrónico o ciudad..."
          className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border pl-10 pr-4 py-2 text-xs text-bravio-bone placeholder-bravio-cloudy/50 focus:outline-none focus:border-bravio-granate"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-bravio-volcanic border-b border-bravio-volcanic-border text-bravio-cloudy uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4">Contacto</th>
              <th className="p-4">Ubicación</th>
              <th className="p-4 text-center">Pedidos</th>
              <th className="p-4">Valor Acumulado (LTV)</th>
              <th className="p-4">Última Compra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bravio-volcanic-border text-bravio-bone">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-bravio-volcanic/50 transition-colors">
                <td className="p-4">
                  <span className="font-display font-medium text-sm text-bravio-bone uppercase block">
                    {c.firstName} {c.lastName}
                  </span>
                  {c.notes && (
                    <span className="text-[10px] text-bravio-gold/80 italic block mt-0.5">
                      {c.notes}
                    </span>
                  )}
                </td>
                <td className="p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-bravio-cloudy">
                    <Mail size={12} />
                    <a href={`mailto:${c.email}`} className="hover:text-bravio-bone underline">
                      {c.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-bravio-cloudy">
                    <Phone size={12} />
                    <span>{c.phone}</span>
                  </div>
                </td>
                <td className="p-4 text-bravio-cloudy">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    <span>{c.city}, {c.state}</span>
                  </div>
                </td>
                <td className="p-4 text-center font-mono font-bold text-sm">
                  {c.ordersCount}
                </td>
                <td className="p-4 font-mono font-bold text-sm text-bravio-bone">
                  ${c.totalSpent.toLocaleString("es-MX")} MXN
                </td>
                <td className="p-4 text-bravio-cloudy text-[11px] font-mono">
                  {new Date(c.lastOrderDate).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

