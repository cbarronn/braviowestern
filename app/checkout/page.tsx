"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { Shield, ArrowLeft, CheckCircle, CreditCard, Landmark, Truck, ShieldCheck, Lock } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

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
      <div className="min-h-screen bg-white text-[#605246] pt-28 pb-20 px-4 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-[#5E1C23]/10 text-[#5E1C23] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#5E1C23]/30">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
          PEDIDO REGISTRADO EXITOSAMENTE
        </span>
        <h1 className="font-archivo text-3xl sm:text-4xl text-[#605246] uppercase tracking-tight mt-2 mb-4">
          ¡GRACIAS POR TU COMPRA!
        </h1>

        <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed mb-6">
          Hemos recibido tu orden de compra número{" "}
          <span className="font-mono text-[#5E1C23] font-bold">
            #{completedOrder.orderNumber}
          </span>
          . Te enviamos la confirmación y guía de rastreo a{" "}
          <span className="text-[#605246] font-bold">{completedOrder.customer.email}</span>.
        </p>

        <div className="bg-[#F4F7F9] border border-[#B1C7D4]/50 p-6 text-left mb-8 space-y-3 font-[SpaceGrotesk]">
          <div className="flex justify-between text-xs pb-2 border-b border-[#B1C7D4]/40">
            <span className="text-[#849AAD] uppercase">Número de Rastreo:</span>
            <span className="font-mono text-[#5E1C23] font-bold">{completedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between text-xs pb-2 border-b border-[#B1C7D4]/40">
            <span className="text-[#849AAD] uppercase">Destinatario:</span>
            <span className="text-[#605246] font-medium">
              {completedOrder.customer.firstName} {completedOrder.customer.lastName}
            </span>
          </div>
          <div className="flex justify-between text-xs pb-2 border-b border-[#B1C7D4]/40">
            <span className="text-[#849AAD] uppercase">Dirección de Entrega:</span>
            <span className="text-[#605246] text-right max-w-[280px]">
              {completedOrder.customer.address}, {completedOrder.customer.city}, {completedOrder.customer.state}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 font-archivo">
            <span className="text-[#605246] uppercase">Total Pagado:</span>
            <span className="text-[#5E1C23] text-lg font-bold">
              ${completedOrder.total.toLocaleString("es-MX")} MXN
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/pedido/${completedOrder.orderNumber}`}
            className="px-6 py-3.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase transition-colors shadow-sm"
          >
            Ver Detalle del Pedido
          </Link>
          <Link
            href="/"
            className="px-6 py-3.5 bg-white hover:bg-[#F4F7F9] border border-[#B1C7D4] text-[#605246] text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase transition-colors"
          >
            Volver a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white text-[#605246] pt-32 pb-20 px-4 text-center max-w-md mx-auto">
        <CruzDeHierro size={36} color="#849AAD" className="mx-auto mb-4 opacity-40" />
        <h2 className="font-archivo text-2xl text-[#605246] uppercase mb-3">
          Tu carrito está vacío
        </h2>
        <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] mb-8">
          Selecciona algún modelo de bota artesanal antes de proceder al checkout.
        </p>
        <Link
          href="/coleccion"
          className="px-6 py-3.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase inline-block shadow-sm"
        >
          Explorar Botas
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#605246] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link
          href="/carrito"
          className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] uppercase tracking-widest text-[#849AAD] hover:text-[#605246] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al carrito</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CruzDeHierro size={14} color="#5E1C23" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
                Paso 1 de 2 · Envío Asegurado
              </span>
            </div>
            <h1 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-tight">
              Datos de Envío y Contacto
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                  Nombre(s) *
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                  Apellidos *
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                  Correo Electrónico *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                  Teléfono (WhatsApp de Rastreo) *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 dígitos"
                  className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                Calle y Número Exterior / Interior *
              </label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ej. Blvd. Aeropuerto 1024, Int. 5"
                className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                  Colonia *
                </label>
                <input
                  required
                  type="text"
                  name="colonia"
                  value={formData.colonia}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                  Ciudad / Municipio *
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-[SpaceGrotesk] font-bold tracking-wider text-[#605246] mb-1.5">
                  Código Postal *
                </label>
                <input
                  required
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  maxLength={5}
                  placeholder="37000"
                  className="w-full bg-white border border-[#B1C7D4]/70 px-3.5 py-2.5 text-sm text-[#605246] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors font-mono"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-6 border-t border-[#B1C7D4]/40">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold block mb-1">
                Paso 2 de 2 · Método de Pago
              </span>
              <h3 className="font-archivo text-xl text-[#605246] uppercase mb-4">
                Selecciona tu Método de Pago
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMethod("mercadopago")}
                  className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === "mercadopago"
                      ? "bg-[#5E1C23]/5 border-[#5E1C23] ring-1 ring-[#5E1C23]"
                      : "bg-white border-[#B1C7D4]/60 hover:border-[#605246]/40"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#5E1C23] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-archivo text-xs text-[#605246] uppercase">
                      Mercado Pago (Tarjetas & OXXO)
                    </h4>
                    <p className="text-[11px] font-[SpaceGrotesk] text-[#849AAD] mt-1">
                      Hasta 12 meses, débito, crédito o pago en efectivo en OXXO.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("transferencia")}
                  className={`p-4 border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === "transferencia"
                      ? "bg-[#5E1C23]/5 border-[#5E1C23] ring-1 ring-[#5E1C23]"
                      : "bg-white border-[#B1C7D4]/60 hover:border-[#605246]/40"
                  }`}
                >
                  <Landmark className="w-5 h-5 text-[#5E1C23] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-archivo text-xs text-[#605246] uppercase">
                      Transferencia SPEI Directa
                    </h4>
                    <p className="text-[11px] font-[SpaceGrotesk] text-[#849AAD] mt-1">
                      Confirmación vía CLABE BBVA. Sin comisiones de pasarela.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white font-[SpaceGrotesk] text-xs tracking-widest uppercase transition-all duration-300 shadow-md font-bold flex items-center justify-center gap-2"
            >
              <Lock size={14} />
              {isSubmitting ? "PROCESANDO PEDIDO..." : `PAGAR $${total.toLocaleString("es-MX")} MXN`}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 bg-[#F4F7F9] border border-[#B1C7D4]/50 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#B1C7D4]/40">
            <h3 className="font-archivo text-base uppercase tracking-wider text-[#605246]">
              Resumen de Compra ({cart.length})
            </h3>
            <span className="text-[10px] font-[SpaceGrotesk] uppercase tracking-wider text-[#849AAD]">
              Garantía Goodyear Welt
            </span>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={`${item.sku}-${item.size}`} className="flex gap-3 bg-white p-3 border border-[#B1C7D4]/30 shadow-xs">
                <div className="w-16 h-20 bg-white border border-[#B1C7D4]/30 p-1 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-archivo text-[#605246] uppercase line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[#849AAD] font-[SpaceGrotesk] mt-0.5">Talla: <strong className="text-[#605246]">{item.size} MX</strong></p>
                  <p className="text-[#849AAD] font-[SpaceGrotesk]">Cantidad: {item.quantity}</p>
                  <p className="text-[#5E1C23] font-archivo font-bold mt-1">
                    ${(item.price * item.quantity).toLocaleString("es-MX")} MXN
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#B1C7D4]/40 pt-4 space-y-2 text-xs font-[SpaceGrotesk]">
            <div className="flex justify-between text-[#849AAD]">
              <span>Subtotal</span>
              <span className="text-[#605246] font-bold">
                ${subtotal.toLocaleString("es-MX")} MXN
              </span>
            </div>
            <div className="flex justify-between text-[#849AAD]">
              <span>Envío Terrestre Asegurado</span>
              <span className="text-[#5E1C23] font-bold">
                {shipping === 0 ? "GRATIS" : `$${shipping} MXN`}
              </span>
            </div>
            <div className="flex justify-between text-base font-archivo text-[#605246] pt-3 border-t border-[#B1C7D4]/40">
              <span>TOTAL</span>
              <span className="text-[#5E1C23] text-xl font-bold">
                ${total.toLocaleString("es-MX")} MXN
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#B1C7D4]/40 space-y-2 text-[11px] font-[SpaceGrotesk] text-[#849AAD]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#5E1C23]" />
              <span>Transacción encriptada con certificado SSL 256 bits</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-[#5E1C23]" />
              <span>Entrega estimada de 3 a 5 días hábiles vía FedEx / Estafeta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
