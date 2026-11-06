"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCommerceStore } from "@/lib/store/commerce-store";

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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-bravio-volcanic-card border-l border-bravio-volcanic-border text-bravio-bone shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-bravio-volcanic-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-bravio-granate" />
              <h2 className="font-display text-lg tracking-wider uppercase">
                Tu Carrito ({count})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-bravio-cloudy hover:text-bravio-bone transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-bravio-volcanic flex items-center justify-center text-bravio-cloudy/40 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display text-base tracking-wider uppercase mb-1">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-bravio-cloudy max-w-[220px] mb-6">
                  Descubre nuestra colección de botas y calzado artesanal.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-sans tracking-widest uppercase transition-colors"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.sku}-${item.size}`}
                  className="flex gap-4 p-3 bg-bravio-volcanic rounded-sm border border-bravio-volcanic-border/60 hover:border-bravio-granate/40 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 bg-bravio-volcanic-card flex-shrink-0 overflow-hidden rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-display text-xs tracking-wider uppercase text-bravio-bone line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.sku, item.size)}
                          className="text-bravio-cloudy/50 hover:text-red-400 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-bravio-cloudy mt-0.5">
                        Talla: <span className="text-bravio-bone font-medium">{item.size}</span>
                      </p>
                      <p className="text-[11px] text-bravio-gold mt-0.5 font-medium">
                        ${item.price.toLocaleString("es-MX")} MXN
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-bravio-volcanic-border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.sku, item.size, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-bravio-cloudy hover:text-bravio-bone hover:bg-bravio-volcanic-border/40"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.sku, item.size, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-bravio-cloudy hover:text-bravio-bone hover:bg-bravio-volcanic-border/40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs text-bravio-bone/80 font-mono ml-auto">
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
            <div className="p-6 border-t border-bravio-volcanic-border bg-bravio-volcanic/95 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-bravio-cloudy">
                  <span>Subtotal</span>
                  <span className="font-mono text-bravio-bone">
                    ${subtotal.toLocaleString("es-MX")} MXN
                  </span>
                </div>
                <div className="flex justify-between text-bravio-cloudy">
                  <span>Envío asegurado</span>
                  <span className="font-mono text-emerald-400">
                    {shipping === 0 ? "GRATIS" : `$${shipping} MXN`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-display text-bravio-bone pt-2 border-t border-bravio-volcanic-border">
                  <span>TOTAL ESTIMADO</span>
                  <span className="font-mono text-bravio-gold">
                    ${total.toLocaleString("es-MX")} MXN
                  </span>
                </div>
              </div>

              {shipping === 0 ? (
                <p className="text-[11px] text-emerald-400/90 text-center font-sans tracking-wide">
                  ✓ Tu pedido califica para envío exprés gratuito a todo México.
                </p>
              ) : (
                <p className="text-[11px] text-bravio-cloudy/80 text-center font-sans">
                  Agrega ${(3500 - subtotal).toLocaleString("es-MX")} MXN más para envío gratis.
                </p>
              )}

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone font-sans text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-bravio-granate/30 group"
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

