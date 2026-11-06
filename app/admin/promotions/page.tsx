"use client";

import React, { useState, useEffect } from "react";
import { Tag, Plus, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, X } from "lucide-react";
import { Coupon } from "@/lib/types";

export default function AdminPromotionsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newDiscountType, setNewDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [newDiscountValue, setNewDiscountValue] = useState(10);
  const [newMinPurchase, setNewMinPurchase] = useState(3000);
  const [newDescription, setNewDescription] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/promotions");
      const data = await res.json();
      if (data.coupons) setCoupons(data.coupons);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch("/api/admin/promotions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Cupón ${data.coupon.code} actualizado.`);
        fetchCoupons();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newCode,
          discountType: newDiscountType,
          discountValue: newDiscountValue,
          minPurchase: newMinPurchase,
          validFrom: new Date().toISOString(),
          validTo: new Date(Date.now() + 90 * 86400000).toISOString(),
          isActive: true,
          description: newDescription || `Descuento ${newCode}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Cupón ${data.coupon.code} creado exitosamente.`);
        setIsModalOpen(false);
        setNewCode("");
        setNewDescription("");
        fetchCoupons();
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
            <Tag size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-cinematic text-bravio-gold uppercase">
              Conversión & Fidelidad
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase">
            PROMOCIONES & CUPONES
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-sans tracking-wider uppercase transition-colors"
        >
          <Plus size={14} /> Crear Nuevo Cupón
        </button>
      </div>

      {/* 10% Newsletter Banner Rule */}
      <div className="p-6 bg-bravio-volcanic-card border border-bravio-gold/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-sans text-bravio-gold uppercase tracking-wider block mb-1">
            Regla Automática de Bienvenida
          </span>
          <h3 className="font-display text-base text-bravio-bone uppercase">
            10% de descuento en primera compra por suscripción al Newsletter
          </h3>
          <p className="text-xs font-sans text-bravio-cloudy mt-1">
            Se genera y despacha vía correo automático al confirmar suscripción con código único o genérico <strong className="text-bravio-bone">BIENVENIDO10</strong>.
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-sans uppercase tracking-wider font-bold">
          Regla Activa
        </span>
      </div>

      {/* Coupons Table */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-bravio-volcanic border-b border-bravio-volcanic-border text-bravio-cloudy uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Código</th>
              <th className="p-4">Descuento</th>
              <th className="p-4">Compra Mínima</th>
              <th className="p-4 text-center">Usos</th>
              <th className="p-4">Descripción</th>
              <th className="p-4 text-center">Estado</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bravio-volcanic-border text-bravio-bone">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-bravio-volcanic/50 transition-colors">
                <td className="p-4 font-mono font-bold text-sm text-bravio-gold tracking-wider">
                  {c.code}
                </td>
                <td className="p-4 font-sans font-bold">
                  {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `$${c.discountValue} MXN OFF`}
                </td>
                <td className="p-4 font-mono text-bravio-cloudy">
                  ${c.minPurchase.toLocaleString("es-MX")} MXN
                </td>
                <td className="p-4 text-center font-mono font-bold">
                  {c.timesUsed}
                </td>
                <td className="p-4 text-bravio-cloudy max-w-[280px]">
                  {c.description}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-sm ${
                      c.isActive
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-red-950 text-red-400 border border-red-800"
                    }`}
                  >
                    {c.isActive ? "Activo" : "Pausado"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleToggle(c.id)}
                    className="p-1.5 hover:text-bravio-gold text-bravio-cloudy transition-colors"
                    title={c.isActive ? "Pausar cupón" : "Activar cupón"}
                  >
                    {c.isActive ? <ToggleRight size={22} className="text-emerald-400" /> : <ToggleLeft size={22} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateCoupon} className="bg-[#16120E] border border-bravio-volcanic-border w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-bravio-volcanic-border pb-3">
              <h3 className="font-display text-lg text-bravio-bone uppercase">Crear Cupón de Descuento</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-bravio-cloudy hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <label className="block text-bravio-cloudy uppercase tracking-wider mb-1">
                  Código Alfanumérico
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="EJ: VERANO20"
                  className="w-full bg-[#0F0C09] border border-bravio-volcanic-border p-2.5 text-bravio-bone font-mono uppercase focus:outline-none focus:border-bravio-granate"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-bravio-cloudy uppercase tracking-wider mb-1">
                    Tipo
                  </label>
                  <select
                    value={newDiscountType}
                    onChange={(e) => setNewDiscountType(e.target.value as any)}
                    className="w-full bg-[#0F0C09] border border-bravio-volcanic-border p-2.5 text-bravio-bone focus:outline-none focus:border-bravio-granate"
                  >
                    <option value="percentage">Porcentaje (%)</option>
                    <option value="fixed">Monto Fijo ($ MXN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-bravio-cloudy uppercase tracking-wider mb-1">
                    Valor Descuento
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newDiscountValue}
                    onChange={(e) => setNewDiscountValue(Number(e.target.value))}
                    className="w-full bg-[#0F0C09] border border-bravio-volcanic-border p-2.5 text-bravio-bone font-mono focus:outline-none focus:border-bravio-granate"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="block text-bravio-cloudy uppercase tracking-wider mb-1">
                  Compra Mínima ($ MXN)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newMinPurchase}
                  onChange={(e) => setNewMinPurchase(Number(e.target.value))}
                  className="w-full bg-[#0F0C09] border border-bravio-volcanic-border p-2.5 text-bravio-bone font-mono focus:outline-none focus:border-bravio-granate"
                />
              </div>

              <div>
                <label className="block text-bravio-cloudy uppercase tracking-wider mb-1">
                  Descripción / Campaña
                </label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Ej: Descuento especial día del padre"
                  className="w-full bg-[#0F0C09] border border-bravio-volcanic-border p-2.5 text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-bravio-volcanic-border">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-bravio-volcanic-border text-xs text-bravio-cloudy"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Guardar Cupón
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
