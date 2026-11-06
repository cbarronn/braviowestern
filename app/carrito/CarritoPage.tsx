"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCommerceStore();
  const { subtotal, shipping, total, count } = getCartTotal();

  return (
    <div className="pt-[100px] min-h-screen bg-[#0F0C09] text-[#B1C7D4] pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-3">
          <CruzDeHierro size={18} color="#5E1C23" />
          <p className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD]">
            Bolsa de Compra · {count} {count === 1 ? "artículo" : "artículos"}
          </p>
        </div>

        <h1 className="font-archivo text-3xl sm:text-5xl text-[#B1C7D4] tracking-tight uppercase mb-10">
          TU CARRITO
        </h1>

        {cart.length === 0 ? (
          <div className="border border-[#605246]/30 bg-[#16120E] p-12 text-center max-w-xl mx-auto my-12">
            <CruzDeHierro size={36} color="#849AAD" className="mx-auto mb-4 opacity-40" />
            <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-sm font-[SpaceGrotesk] text-[#849AAD] mb-6">
              Aún no has agregado ninguna bota a tu orden. Descubre el catálogo de construcción Goodyear Welt.
            </p>
            <Link
              href="/coleccion"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#5E1C23] hover:bg-[#72232b] text-white font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
            >
              Explorar Catálogo <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Products List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.sku}-${item.size}`}
                  className="flex gap-4 sm:gap-6 bg-[#16120E] border border-[#605246]/30 p-4 sm:p-6"
                >
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 bg-[#0F0C09] flex-shrink-0 border border-[#605246]/20">
                    <Image
                      src={item.image || "/brand/image1.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-[SpaceGrotesk] tracking-[0.15em] uppercase text-[#849AAD]">
                            SKU: {item.sku}
                          </p>
                          <h3 className="font-archivo text-base sm:text-lg text-[#B1C7D4] uppercase tracking-wide">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.sku, item.size)}
                          className="text-[#849AAD] hover:text-[#5E1C23] transition-colors p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center gap-4 text-xs font-[SpaceGrotesk] text-[#849AAD]">
                        <span>Talla: <strong className="text-[#B1C7D4]">{item.size}</strong></span>
                        <span>·</span>
                        <span>Goodyear Welt 360°</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#605246]/20 mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#605246]/40">
                        <button
                          onClick={() => updateQuantity(item.sku, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#B1C7D4] hover:bg-[#605246]/20 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-[SpaceGrotesk] text-[#B1C7D4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.sku, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#B1C7D4] hover:bg-[#605246]/20 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-archivo text-base sm:text-lg text-[#B1C7D4]">
                        ${(item.price * item.quantity).toLocaleString("es-MX")} MXN
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-[#16120E]/50 border border-[#605246]/20 flex items-center gap-3 text-xs font-[SpaceGrotesk] text-[#849AAD]">
                <Truck size={16} className="text-[#B1C7D4] flex-shrink-0" />
                <span>
                  {subtotal >= 3500
                    ? "¡Felicidades! Calificas para envío nacional sin costo adicional."
                    : `Agrega $${(3500 - subtotal).toLocaleString("es-MX")} MXN más para envío gratuito a todo México.`}
                </span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#16120E] border border-[#605246]/30 p-6 sticky top-28 space-y-6">
                <h2 className="font-archivo text-lg text-[#B1C7D4] uppercase tracking-wide border-b border-[#605246]/30 pb-3">
                  Resumen de Compra
                </h2>

                <div className="space-y-3 font-[SpaceGrotesk] text-xs">
                  <div className="flex justify-between text-[#849AAD]">
                    <span>Subtotal ({count} {count === 1 ? "par" : "pares"})</span>
                    <span className="text-[#B1C7D4]">${subtotal.toLocaleString("es-MX")} MXN</span>
                  </div>

                  <div className="flex justify-between text-[#849AAD]">
                    <span>Envío Nacional</span>
                    <span className="text-[#B1C7D4]">
                      {shipping === 0 ? "GRATIS" : `$${shipping.toLocaleString("es-MX")} MXN`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#605246]/30 flex justify-between items-baseline">
                    <span className="font-archivo uppercase text-sm text-[#B1C7D4]">Total estimado</span>
                    <span className="font-archivo text-xl text-[#B1C7D4]">
                      ${total.toLocaleString("es-MX")} MXN
                    </span>
                  </div>
                  <p className="text-[10px] text-[#849AAD]">IVA incluido. Facturación inmediata disponible.</p>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#5E1C23] hover:bg-[#72232b] text-white font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
                >
                  Proceder al Pago <ArrowRight size={14} />
                </Link>

                <div className="space-y-2 pt-4 border-t border-[#605246]/20 text-[11px] font-[SpaceGrotesk] text-[#849AAD]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#849AAD]" />
                    <span>Primer cambio de talla gratuito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-[#849AAD]" />
                    <span>Envíos asegurados desde León, Guanajuato</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
