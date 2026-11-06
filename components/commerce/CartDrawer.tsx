"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCommerceStore();

  const { subtotal, shipping, total, count } = getCartTotal();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#605246]/40 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#B1C7D4]/60 text-[#605246] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#B1C7D4]/40 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <CruzDeHierro size={18} color="#5E1C23" />
              <h2 className="font-archivo text-base tracking-wider uppercase text-[#605246]">
                Tu Carrito ({count})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#849AAD] hover:text-[#605246] transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F4F7F9] border border-[#B1C7D4]/40 flex items-center justify-center text-[#849AAD] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-archivo text-base tracking-wider uppercase mb-1 text-[#605246]">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] max-w-[240px] mb-6">
                  Descubre nuestra colección de botas artesanales con construcción Goodyear Welt 360°.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.sku}-${item.size}`}
                  className="flex gap-4 p-3 bg-white rounded-none border border-[#B1C7D4]/40 hover:border-[#605246]/50 transition-colors shadow-sm"
                >
                  {/* Thumbnail on white */}
                  <div className="relative w-20 h-24 bg-white flex-shrink-0 border border-[#B1C7D4]/30 p-1 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-archivo text-xs tracking-wider uppercase text-[#605246] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.sku, item.size)}
                          className="text-[#849AAD] hover:text-[#5E1C23] transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-[SpaceGrotesk] text-[#849AAD] mt-0.5">
                        Talla: <span className="text-[#605246] font-bold">{item.size} MX</span>
                      </p>
                      <p className="text-xs font-archivo text-[#5E1C23] mt-1 font-bold">
                        ${item.price.toLocaleString("es-MX")} MXN
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#B1C7D4] bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.sku, item.size, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-[#605246] hover:bg-[#F4F7F9]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-[SpaceGrotesk] font-bold text-[#605246]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.sku, item.size, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-[#605246] hover:bg-[#F4F7F9]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs text-[#605246] font-archivo ml-auto">
                        ${(item.price * item.quantity).toLocaleString("es-MX")} MXN
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#B1C7D4]/40 bg-[#F4F7F9] space-y-4">
              <div className="space-y-1.5 text-xs font-[SpaceGrotesk]">
                <div className="flex justify-between text-[#849AAD]">
                  <span>Subtotal</span>
                  <span className="text-[#605246] font-bold">
                    ${subtotal.toLocaleString("es-MX")} MXN
                  </span>
                </div>
                <div className="flex justify-between text-[#849AAD]">
                  <span>Envío asegurado</span>
                  <span className="font-bold text-[#5E1C23]">
                    {shipping === 0 ? "GRATIS" : `$${shipping} MXN`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-archivo text-[#605246] pt-2 border-t border-[#B1C7D4]/40">
                  <span>TOTAL ESTIMADO</span>
                  <span className="text-[#5E1C23]">
                    ${total.toLocaleString("es-MX")} MXN
                  </span>
                </div>
              </div>

              {shipping === 0 ? (
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#605246] font-[SpaceGrotesk]">
                  <ShieldCheck size={14} className="text-[#5E1C23]" />
                  <span>Tu pedido califica para envío exprés sin costo adicional.</span>
                </div>
              ) : (
                <p className="text-[11px] text-[#849AAD] text-center font-[SpaceGrotesk]">
                  Agrega ${(3500 - subtotal).toLocaleString("es-MX")} MXN más para envío gratis.
                </p>
              )}

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#5E1C23] hover:bg-[#47151a] text-white font-[SpaceGrotesk] text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md group"
              >
                <span>PROCEDER AL PAGO SEGURO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
