"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Truck, Check, Edit2, Search } from "lucide-react";
import { Order } from "@/lib/types";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order["status"]>("preparing");
  const [carrier, setCarrier] = useState("Estafeta Express");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
        if (data.orders.length > 0 && !selectedOrder) {
          setSelectedOrder(data.orders[0]);
          setNewStatus(data.orders[0].status);
          setCarrier(data.orders[0].carrier || "Estafeta Express");
          setTrackingNumber(data.orders[0].trackingNumber || "");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setIsUpdating(true);
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          status: newStatus,
          carrier,
          trackingNumber,
        }),
      });
      setIsUpdating(false);
      fetchOrders();
      alert("Pedido actualizado correctamente con número de guía.");
    } catch (err) {
      console.error(err);
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl font-[SpaceGrotesk] text-[#605246]">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CruzDeHierro size={14} color="#5E1C23" />
          <span className="text-[10px] tracking-[0.2em] text-[#849AAD] uppercase font-bold">
            Logística & Ventas en Línea
          </span>
        </div>
        <h1 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide">
          GESTIÓN DE PEDIDOS Y ENVÍOS
        </h1>
        <p className="text-xs text-[#849AAD] mt-1">
          Supervisa órdenes entrantes, asigna números de guía de paquetería y notifica el seguimiento al cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Orders Table (Left 7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#B1C7D4]/60 rounded p-6 shadow-xs">
          <h3 className="font-archivo text-sm uppercase text-[#605246] mb-4">
            Historial de Órdenes ({orders.length})
          </h3>

          <div className="space-y-3">
            {orders.map((o) => (
              <div
                key={o.id}
                onClick={() => {
                  setSelectedOrder(o);
                  setNewStatus(o.status);
                  setCarrier(o.carrier || "Estafeta Express");
                  setTrackingNumber(o.trackingNumber || "");
                }}
                className={`p-4 rounded border cursor-pointer transition-all ${
                  selectedOrder?.id === o.id
                    ? "bg-[#5E1C23]/5 border-[#5E1C23] ring-1 ring-[#5E1C23]"
                    : "bg-[#F4F7F9] border-[#B1C7D4]/40 hover:border-[#605246]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#5E1C23]">
                    #{o.orderNumber}
                  </span>
                  <span
                    className={`text-[9px] uppercase px-2 py-0.5 rounded font-bold ${
                      o.status === "delivered"
                        ? "bg-emerald-100 text-emerald-800"
                        : o.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>

                <div className="text-xs text-[#605246] font-bold mt-2">
                  {o.customer.firstName} {o.customer.lastName}
                </div>
                <div className="text-[11px] text-[#849AAD]">
                  {o.items.length} {o.items.length === 1 ? "par" : "pares"} · ${o.total.toLocaleString("es-MX")} MXN
                </div>
                <div className="text-[10px] text-[#849AAD] mt-1">
                  {new Date(o.createdAt).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Inspector / Manager (Right 5 cols) */}
        {selectedOrder ? (
          <div className="lg:col-span-5 bg-white border border-[#B1C7D4]/60 rounded p-6 shadow-xs space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#849AAD] block">
                Detalle del Pedido
              </span>
              <h3 className="font-archivo text-xl text-[#605246] uppercase mt-0.5">
                #{selectedOrder.orderNumber}
              </h3>
            </div>

            <div className="space-y-3 text-xs border-y border-[#B1C7D4]/30 py-4">
              <div>
                <span className="text-[#849AAD] block text-[10px] uppercase font-bold">Cliente:</span>
                <span className="text-[#605246] font-bold">
                  {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                </span>
                <span className="text-[#849AAD] block text-[11px]">
                  {selectedOrder.customer.email} · Tel: {selectedOrder.customer.phone}
                </span>
              </div>

              <div>
                <span className="text-[#849AAD] block text-[10px] uppercase font-bold">Dirección:</span>
                <span className="text-[#605246]">
                  {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state}
                </span>
              </div>

              <div>
                <span className="text-[#849AAD] block text-[10px] uppercase font-bold">Método de Pago:</span>
                <span className="text-[#5E1C23] font-bold uppercase">
                  {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus || selectedOrder.status})
                </span>
              </div>
            </div>

            {/* Items */}
            <div>
              <span className="text-[10px] uppercase font-bold text-[#849AAD] block mb-2">
                Productos ({selectedOrder.items.length})
              </span>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-[#F4F7F9] p-2.5 rounded border border-[#B1C7D4]/40">
                    <div>
                      <span className="font-bold text-[#605246] block">{item.name}</span>
                      <span className="text-[10px] text-[#849AAD]">Talla: {item.size} · Cant: {item.quantity}</span>
                    </div>
                    <span className="font-archivo text-sm text-[#5E1C23] font-bold">
                      ${(item.price * item.quantity).toLocaleString("es-MX")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-4 border-t border-[#B1C7D4]/30">
              <span className="text-[10px] uppercase font-bold text-[#849AAD] block">
                Actualizar Estado de Envío
              </span>

              <div>
                <label className="block text-[11px] text-[#605246] font-bold uppercase mb-1">
                  Estatus del Pedido
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] rounded p-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                >
                  <option value="pending_payment">Pendiente de Pago</option>
                  <option value="confirmed">Confirmado / En Taller</option>
                  <option value="preparing">Inspección de Calidad</option>
                  <option value="shipped">En Tránsito (Con Guía)</option>
                  <option value="delivered">Entregado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#605246] font-bold uppercase mb-1">
                  Paquetería
                </label>
                <input
                  type="text"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] rounded p-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#605246] font-bold uppercase mb-1">
                  Número de Guía de Rastreo
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Ej. EST-918237492"
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] rounded p-2 text-xs text-[#605246] font-mono focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-3 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                {isUpdating ? "Actualizando..." : "Guardar & Notificar Rastreo"}
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-5 bg-white border border-[#B1C7D4]/60 rounded p-12 text-center text-[#849AAD] text-xs">
            Selecciona un pedido para inspeccionar sus detalles y actualizar su guía de rastreo.
          </div>
        )}
      </div>
    </div>
  );
}
