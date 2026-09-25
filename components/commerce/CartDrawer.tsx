"use client";

import React from "react";
import { useCart } from "@/lib/commerce/cart";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const isOpen = state.isOpen;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#1A1410]/50 backdrop-blur-sm z-[150]"
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras BRAVÍO"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#B1C7D4] z-[160] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#849AAD]/30">
              <div>
                <h2 className="font-archivo text-[#605246] text-xl tracking-tight uppercase">
                  Carrito
                </h2>
                <p className="text-label-caps text-[#849AAD] text-[10px] mt-0.5">
                  {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
                </p>
              </div>
              <button
                id="cart-close-button"
                aria-label="Cerrar carrito"
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="text-[#605246] hover:text-[#5E1C23] transition-colors p-1"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l18 18M19 1L1 19" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6" data-lenis-prevent>
              {state.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
                  <svg viewBox="-280 -280 560 560" width="40" height="40" className="opacity-20">
                    <g fill="#605246">
                      <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
                    </g>
                  </svg>
                  <div>
                    <p className="font-archivo text-[#605246] text-lg uppercase tracking-tight">
                      Tu carrito está vacío
                    </p>
                    <p className="text-sm text-[#849AAD] mt-2 font-[SpaceGrotesk]">
                      Explora la colección y encuentra tu par.
                    </p>
                  </div>
                  <Link
                    href="/coleccion"
                    onClick={() => dispatch({ type: "CLOSE_CART" })}
                    className="btn-primary"
                    id="cart-explore-link"
                  >
                    Explorar Colección
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-6" role="list">
                  {state.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 border-b border-[#849AAD]/20 pb-6"
                    >
                      {/* Product thumb */}
                      <div
                        className="w-20 h-24 flex-shrink-0 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #C8D8E2, #849AAD)" }}
                      >
                        <svg viewBox="-280 -280 560 560" width="24" height="24" className="opacity-30">
                          <g fill="#605246">
                            <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
                          </g>
                        </svg>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-archivo text-[#605246] text-base uppercase tracking-tight leading-none">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-[#849AAD] font-[SpaceGrotesk] mt-1">
                          {item.product.subtitle}
                        </p>
                        <div className="flex gap-3 mt-2">
                          <span className="text-label-caps text-[10px] text-[#849AAD]">
                            Talla: {item.size}
                          </span>
                          <span className="flex items-center gap-1 text-label-caps text-[10px] text-[#849AAD]">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            {item.color.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          {/* Qty */}
                          <div className="flex items-center border border-[#849AAD]/40">
                            <button
                              aria-label="Reducir cantidad"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#605246] hover:bg-[#849AAD]/20 transition-colors"
                            >−</button>
                            <span className="w-8 text-center text-sm font-[SpaceGrotesk] text-[#605246]">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Aumentar cantidad"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#605246] hover:bg-[#849AAD]/20 transition-colors"
                            >+</button>
                          </div>
                          <p className="font-[SpaceGrotesk] font-medium text-[#605246]">
                            ${(item.product.price * item.quantity).toLocaleString("es-MX")}
                          </p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        aria-label={`Eliminar ${item.product.name} del carrito`}
                        onClick={() => removeItem(item.id)}
                        className="text-[#849AAD] hover:text-[#5E1C23] transition-colors self-start mt-0.5"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M1 1l12 12M13 1L1 13" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="px-8 py-6 border-t border-[#849AAD]/30 bg-[#B1C7D4]">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-label-caps text-[#605246]">Total</p>
                  <p className="font-archivo text-[#605246] text-2xl tracking-tight">
                    ${totalPrice.toLocaleString("es-MX")} MXN
                  </p>
                </div>
                <Link
                  href="/checkout"
                  id="cart-checkout-link"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="btn-primary w-full justify-center"
                >
                  Continuar al Checkout
                </Link>
                <p className="text-center text-xs text-[#849AAD] mt-3 font-[SpaceGrotesk]">
                  Checkout en configuración — no se procesarán pagos
                </p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
