"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/commerce/cart";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function CarritoPage() {
  const { state, totalItems, totalPrice, removeItem, updateQuantity } = useCart();

  return (
    <div className="pt-[72px] min-h-screen bg-[#B1C7D4]">
      <div className="bravio-container py-16">
        <div className="flex items-center gap-4 mb-2">
          <CruzDeHierro size={20} color="#5E1C23" />
          <p className="text-label-caps text-[#849AAD]">{totalItems} {totalItems === 1 ? "artículo" : "artículos"}</p>
        </div>
        <h1 className="font-archivo text-[#605246] mb-12"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: "0.9", letterSpacing: "-0.03em", textTransform: "uppercase" }}>
          CARRITO.
        </h1>

        {state.items.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-archivo text-[#605246] text-2xl uppercase tracking-tight mb-4">Tu carrito está vacío</p>
            <p className="text-[#849AAD] font-[SpaceGrotesk] mb-8">Explora la colección y encuentra tu par.</p>
            <Link href="/coleccion" className="btn-primary">Explorar Colección</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-6 border-b border-[#849AAD]/20 pb-6">
                  <div className="w-24 h-28 flex-shrink-0 flex items-center justify-center"
                    style={{ background: item.product.category === "mujer" ? "linear-gradient(135deg, #C8D8E2, #849AAD)" : "linear-gradient(135deg, #7A6858, #3E342D)" }}>
                    <CruzDeHierro size={24} color={item.product.category === "mujer" ? "#605246" : "#B1C7D4"} className="opacity-20" />
                  </div>
                  <div className="flex-1">
                    <p className="text-label-caps text-[#849AAD] text-[10px] mb-1">{item.product.subtitle}</p>
                    <p className="font-archivo text-[#605246] text-xl uppercase tracking-tight">{item.product.name}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-[#849AAD] font-[SpaceGrotesk]">Talla: {item.size}</span>
                      <span className="flex items-center gap-1 text-xs text-[#849AAD] font-[SpaceGrotesk]">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color.hex }} />
                        {item.color.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#849AAD]/40">
                        <button aria-label="Reducir" onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-[#605246] hover:bg-[#849AAD]/20 transition-colors">−</button>
                        <span className="w-9 text-center text-sm font-[SpaceGrotesk] text-[#605246]">{item.quantity}</span>
                        <button aria-label="Aumentar" onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-[#605246] hover:bg-[#849AAD]/20 transition-colors">+</button>
                      </div>
                      <p className="font-[SpaceGrotesk] font-medium text-[#605246]">
                        ${(item.product.price * item.quantity).toLocaleString("es-MX")} MXN
                      </p>
                    </div>
                  </div>
                  <button aria-label={`Eliminar ${item.product.name}`} onClick={() => removeItem(item.id)}
                    className="text-[#849AAD] hover:text-[#5E1C23] transition-colors self-start mt-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-[#849AAD]/10 border border-[#849AAD]/30 p-8 h-fit">
              <h2 className="font-archivo text-[#605246] text-xl uppercase tracking-tight mb-6">Resumen</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-[SpaceGrotesk] text-[#605246]">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString("es-MX")} MXN</span>
                </div>
                <div className="flex justify-between text-sm font-[SpaceGrotesk] text-[#849AAD]">
                  <span>Envío</span>
                  <span>Por calcular</span>
                </div>
              </div>
              <div className="border-t border-[#849AAD]/30 pt-4 mb-6">
                <div className="flex justify-between font-archivo text-[#605246]">
                  <span className="uppercase tracking-tight">Total</span>
                  <span>${totalPrice.toLocaleString("es-MX")} MXN</span>
                </div>
              </div>
              <Link href="/checkout" id="carrito-checkout-link" className="btn-primary w-full justify-center block text-center">
                Ir al Checkout
              </Link>
              <p className="text-center text-xs text-[#849AAD] font-[SpaceGrotesk] mt-3">
                Checkout en configuración — sin pagos reales
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
