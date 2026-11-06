"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { Shield, ArrowLeft, CheckCircle, CreditCard, Landmark, Truck } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCommerceStore();
  const { subtotal, shipping, total } = getCartTotal();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    colonia: "",
    city: "",
    state: "Guanajuato",
    zipCode: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"mercadopago" | "transferencia">("mercadopago");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            ...formData,
            address: `${formData.address}, Col. ${formData.colonia}`,
          },
          items: cart,
          subtotal,
          shipping,
          total,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        clearCart();
        setCompletedOrder(data.order);
      } else {
        alert(data.error || "Hubo un error al procesar tu pedido");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al procesar el pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-bravio-volcanic py-16 px-4 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/40">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
          PEDIDO REGISTRADO EXITOSAMENTE
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-bravio-bone uppercase tracking-wider mt-2 mb-4">
          ¡GRACIAS POR TU COMPRA!
        </h1>

        <p className="text-sm text-bravio-cloudy leading-relaxed mb-6">
          Hemos recibido tu solicitud para el pedido número{" "}
          <span className="font-mono text-bravio-bone font-bold">
            #{completedOrder.orderNumber}
          </span>
          . Te hemos enviado un correo de confirmación a{" "}
          <span className="text-bravio-bone font-medium">{completedOrder.customer.email}</span>.
        </p>

        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 rounded-sm text-left mb-8 space-y-3">
          <div className="flex justify-between text-xs pb-2 border-b border-bravio-volcanic-border">
            <span className="text-bravio-cloudy uppercase">Número de Rastreo:</span>
            <span className="font-mono text-bravio-gold font-bold">{completedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between text-xs pb-2 border-b border-bravio-volcanic-border">
            <span className="text-bravio-cloudy uppercase">Destinatario:</span>
            <span className="text-bravio-bone">
              {completedOrder.customer.firstName} {completedOrder.customer.lastName}
            </span>
          </div>
          <div className="flex justify-between text-xs pb-2 border-b border-bravio-volcanic-border">
            <span className="text-bravio-cloudy uppercase">Dirección de Entrega:</span>
            <span className="text-bravio-bone text-right max-w-[280px]">
              {completedOrder.customer.address}, {completedOrder.customer.city}, {completedOrder.customer.state}
            </span>
          </div>
          <div className="flex justify-between text-xs pt-1 font-display">
            <span className="text-bravio-cloudy uppercase">Total Pagado:</span>
            <span className="text-bravio-bone font-mono text-sm">
              ${completedOrder.total.toLocaleString("es-MX")} MXN
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/rastreo?orderId=${completedOrder.orderNumber}`}
            className="px-6 py-3 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-sans tracking-widest uppercase transition-colors"
          >
            Rastrear Mi Envío
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-bravio-volcanic-card hover:bg-bravio-volcanic-border border border-bravio-volcanic-border text-bravio-cloudy text-xs font-sans tracking-widest uppercase transition-colors"
          >
            Volver a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bravio-volcanic py-20 px-4 text-center max-w-md mx-auto">
        <h2 className="font-display text-2xl text-bravio-bone uppercase mb-4">
          Tu carrito está vacío
        </h2>
        <p className="text-xs text-bravio-cloudy mb-8">
          Selecciona algún modelo de bota artesanal antes de proceder al checkout.
        </p>
        <Link
          href="/coleccion/sinaloa"
          className="px-6 py-3 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-sans tracking-widest uppercase"
        >
          Explorar Botas
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bravio-volcanic py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a la tienda</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
              Paso 1 de 2
            </span>
            <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone uppercase tracking-wide mt-1">
              Datos de Envío y Facturación
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                  Nombre(s) *
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                  Apellidos *
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                  Correo Electrónico *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                  Teléfono (WhatsApp de Rastreo) *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 dígitos"
                  className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                Calle y Número Exterior / Interior *
              </label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej. Av. León Poniente 1450 Int 4"
                className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                  Colonia *
                </label>
                <input
                  required
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={handleChange}
                  className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                  Ciudad / Municipio *
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-sans tracking-wider text-bravio-cloudy mb-1.5">
                  Código Postal *
                </label>
                <input
                  required
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  maxLength={5}
                  className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border rounded px-3 py-2 text-sm text-bravio-bone focus:outline-none focus:border-bravio-granate"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-6 border-t border-bravio-volcanic-border">
              <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans block mb-1">
                Paso 2 de 2
              </span>
              <h3 className="font-display text-lg text-bravio-bone uppercase mb-4">
                Método de Pago Seguro
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMethod("mercadopago")}
                  className={`p-4 rounded border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === "mercadopago"
                      ? "bg-bravio-granate/20 border-bravio-granate ring-1 ring-bravio-granate"
                      : "bg-bravio-volcanic-card border-bravio-volcanic-border hover:border-bravio-cloudy/40"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-bravio-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-xs text-bravio-bone uppercase">
                      Mercado Pago (Tarjetas & OXXO)
                    </h4>
                    <p className="text-[11px] text-bravio-cloudy/80 mt-1">
                      Hasta 12 meses, débito, crédito o pago en efectivo en OXXO.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("transferencia")}
                  className={`p-4 rounded border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === "transferencia"
                      ? "bg-bravio-granate/20 border-bravio-granate ring-1 ring-bravio-granate"
                      : "bg-bravio-volcanic-card border-bravio-volcanic-border hover:border-bravio-cloudy/40"
                  }`}
                >
                  <Landmark className="w-5 h-5 text-bravio-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-xs text-bravio-bone uppercase">
                      Transferencia SPEI Directa
                    </h4>
                    <p className="text-[11px] text-bravio-cloudy/80 mt-1">
                      Confirmación automática vía CLABE interbancaria.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-bravio-granate hover:bg-bravio-granate-light disabled:opacity-50 text-bravio-bone font-sans text-xs tracking-widest uppercase transition-all duration-300 shadow-xl shadow-bravio-granate/30 font-medium"
            >
              {isSubmitting ? "PROCESANDO PEDIDO..." : `PAGAR $${total.toLocaleString("es-MX")} MXN`}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 bg-bravio-volcanic-card border border-bravio-volcanic-border p-6 rounded-sm space-y-6">
          <h3 className="font-display text-base uppercase tracking-wider text-bravio-bone pb-4 border-b border-bravio-volcanic-border">
            Resumen de tu Compra ({cart.length})
          </h3>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={`${item.sku}-${item.size}`} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded bg-bravio-volcanic"
                />
                <div className="flex-1 text-xs">
                  <h4 className="font-display text-bravio-bone uppercase line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-bravio-cloudy mt-0.5">Talla: {item.size}</p>
                  <p className="text-bravio-cloudy">Cant: {item.quantity}</p>
                  <p className="text-bravio-gold font-mono font-medium mt-1">
                    ${(item.price * item.quantity).toLocaleString("es-MX")} MXN
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-bravio-volcanic-border pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-bravio-cloudy">
              <span>Subtotal</span>
              <span className="font-mono text-bravio-bone">
                ${subtotal.toLocaleString("es-MX")} MXN
              </span>
            </div>
            <div className="flex justify-between text-bravio-cloudy">
              <span>Envío Terrestre Asegurado</span>
              <span className="font-mono text-emerald-400">
                {shipping === 0 ? "GRATIS" : `$${shipping} MXN`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-display text-bravio-bone pt-2 border-t border-bravio-volcanic-border">
              <span>TOTAL</span>
              <span className="font-mono text-bravio-gold">
                ${total.toLocaleString("es-MX")} MXN
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
