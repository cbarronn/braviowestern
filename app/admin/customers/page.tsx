"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
import { Customer } from "@/lib/types";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

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
    <div className="space-y-8 font-[SpaceGrotesk] text-[#605246]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CruzDeHierro size={14} color="#5E1C23" />
            <span className="text-[10px] tracking-[0.2em] text-[#849AAD] uppercase font-bold">
              Directorio Comercial
            </span>
          </div>
          <h1 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide">
            CLIENTES REGISTRADOS
          </h1>
        </div>

        <div className="text-xs text-[#849AAD]">
          Total: <strong className="text-[#605246] font-bold">{customers.length}</strong> clientes registrados
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#849AAD]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, correo o ciudad..."
          className="w-full bg-white border border-[#B1C7D4] pl-10 pr-4 py-2.5 text-xs text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] shadow-xs"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#B1C7D4]/60 overflow-x-auto shadow-xs rounded">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F4F7F9] border-b border-[#B1C7D4]/40 text-[#849AAD] uppercase tracking-wider text-[10px] font-bold">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4">Contacto</th>
              <th className="p-4">Ubicación</th>
              <th className="p-4">Pedidos</th>
              <th className="p-4">Total Comprado (LTV)</th>
              <th className="p-4">Registro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B1C7D4]/20 text-[#605246]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-xs text-[#849AAD]">
                  <Users size={28} className="text-[#849AAD]/40 mx-auto mb-3" />
                  <p className="font-bold text-[#605246]">No hay clientes registrados en este momento.</p>
                  <p className="text-[11px] mt-1">
                    Cada cliente que complete un pedido en la tienda o se registre aparecerá aquí automáticamente con su historial de compras.
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F4F7F9]/50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-sm block">
                      {c.firstName} {c.lastName}
                    </span>
                    <span className="text-[10px] text-[#849AAD]">ID: {c.id}</span>
                  </td>
                  <td className="p-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Mail size={12} className="text-[#5E1C23]" />
                      <span>{c.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#849AAD]">
                      <Phone size={12} />
                      <span>{c.phone}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#849AAD]" />
                      <span>{c.city}, {c.state}</span>
                    </div>
                    {(c.address || c.notes) && (
                      <span className="text-[10px] text-[#849AAD] block pl-4">{c.address || c.notes}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F4F7F9] text-[#605246] border border-[#B1C7D4]/60 text-[11px] font-bold">
                      <ShoppingBag size={11} className="text-[#5E1C23]" />
                      {c.ordersCount} {c.ordersCount === 1 ? "pedido" : "pedidos"}
                    </span>
                  </td>
                  <td className="p-4 font-archivo text-base text-[#5E1C23] font-bold">
                    ${c.totalSpent.toLocaleString("es-MX")} MXN
                  </td>
                  <td className="p-4 text-[11px] text-[#849AAD]">
                    {new Date(c.createdAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
