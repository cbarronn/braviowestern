"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Truck, Check, Edit2, Search } from "lucide-react";
import { Order } from "@/lib/types";

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
    <div className="space-y-8 max-w-6xl">
      <div>
        <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
          LOGÍSTICA & VENTAS
        </span>
        <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone uppercase tracking-wide mt-1">
          GESTIÓN DE PEDIDOS Y ENVÍOS
        </h1>
        <p className="text-xs text-bravio-cloudy mt-1 font-light">
          Supervisa órdenes entrantes, asigna números de guía de paquetería y notifica el seguimiento al cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Orders Table (Left 7 cols) */}
        <div className="lg:col-span-7 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded p-6">
          <h3 className="font-display text-sm uppercase text-bravio-bone mb-4">
            Historial de Órdenes ({orders.length})
          </h3>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-xs text-bravio-cloudy">
              No hay pedidos registrados todavía. Realiza una prueba desde la tienda pública.
            </div>
          ) : (
            <div className="divide-y divide-bravio-volcanic-border">
              {orders.map((order) => {
                const isSelected = selectedOrder?.id === order.id;

                return (
                  <div
                    key={order.id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewStatus(order.status);
                      setCarrier(order.carrier || "Estafeta Express");
                      setTrackingNumber(order.trackingNumber || "");
                    }}
                    className={`py-3 px-3 rounded cursor-pointer transition-colors flex items-center justify-between gap-4 text-xs ${
                      isSelected
                        ? "bg-bravio-granate/20 border border-bravio-granate/60"
                        : "hover:bg-bravio-volcanic"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-bravio-bone font-bold">
                          #{order.orderNumber}
                        </span>
                        <span className="text-bravio-cloudy">
                          {order.customer.firstName} {order.customer.lastName}
                        </span>
                      </div>
                      <span className="text-[11px] text-bravio-cloudy/60">
                        {order.items.length} {order.items.length === 1 ? "par" : "pares"} • {order.paymentMethod.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-bravio-gold font-bold block">
                        ${order.total.toLocaleString("es-MX")} MXN
                      </span>
                      <span
                        className={`text-[9px] uppercase font-sans px-1.5 py-0.5 rounded inline-block mt-0.5 ${
                          order.status === "paid" || order.status === "delivered"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Details & Guide Assignment (Right 5 cols) */}
        <div className="lg:col-span-5 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded p-6 space-y-4 text-xs">
          {selectedOrder ? (
            <div className="space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-bravio-volcanic-border">
                <div>
                  <span className="text-[10px] text-bravio-cloudy uppercase">Detalles del Pedido</span>
                  <h3 className="font-display text-lg text-bravio-bone">
                    #{selectedOrder.orderNumber}
                  </h3>
                </div>
                <span className="text-xs font-mono text-bravio-gold">
                  ${selectedOrder.total.toLocaleString("es-MX")} MXN
                </span>
              </div>

              {/* Customer */}
              <div className="space-y-1">
                <span className="text-bravio-cloudy uppercase text-[10px]">Cliente:</span>
                <p className="text-bravio-bone font-medium">
                  {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                </p>
                <p className="text-bravio-cloudy/80">{selectedOrder.customer.email}</p>
                <p className="text-bravio-cloudy/80">{selectedOrder.customer.phone}</p>
                <p className="text-bravio-cloudy/80">{selectedOrder.customer.address}</p>
              </div>

              {/* Items */}
              <div className="space-y-2 pt-2 border-t border-bravio-volcanic-border">
                <span className="text-bravio-cloudy uppercase text-[10px]">Artículos:</span>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-bravio-bone">
                    <span>
                      {it.name} ({it.size}) × {it.quantity}
                    </span>
                    <span className="font-mono">
                      ${(it.price * it.quantity).toLocaleString("es-MX")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdateStatus} className="pt-3 border-t border-bravio-volcanic-border space-y-3">
                <span className="text-bravio-cloudy uppercase text-[10px] block">
                  Actualizar Despacho & Guía
                </span>

                <div>
                  <label className="block text-bravio-cloudy mb-1">Estado del Pedido</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Order["status"])}
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                  >
                    <option value="pending_payment">Pendiente de Pago</option>
                    <option value="paid">Pago Confirmado</option>
                    <option value="preparing">En Preparación (Taller León)</option>
                    <option value="shipped">Enviado con Paquetería</option>
                    <option value="delivered">Entregado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-bravio-cloudy mb-1">Paquetería Asignada</label>
                  <input
                    type="text"
                    value={carrier}
                    onChange={(e) => setCarrier(e.target.value)}
                    placeholder="Estafeta / DHL / FedEx / Paquetexpress"
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                  />
                </div>

                <div>
                  <label className="block text-bravio-cloudy mb-1">Número de Guía de Rastreo</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Ej. EST-849204918"
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2.5 bg-bravio-granate hover:bg-bravio-granate-light disabled:opacity-50 text-bravio-bone rounded font-sans tracking-widest uppercase font-medium transition-colors"
                >
                  {isUpdating ? "Guardando..." : "Asignar Guía y Guardar"}
                </button>
              </form>
            </div>
          ) : (
            <div className="py-12 text-center text-bravio-cloudy/50">
              Selecciona una orden de la lista para ver su detalle.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
