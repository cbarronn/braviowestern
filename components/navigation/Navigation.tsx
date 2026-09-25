"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/commerce/cart";
import CartDrawer from "@/components/commerce/CartDrawer";
import { BravioLogoHorizontal } from "@/components/ui/BravioLogo";

const NAV_LINKS = [
  { href: "/mujer", label: "Mujer" },
  { href: "/hombre", label: "Hombre" },
  { href: "/coleccion", label: "Colección" },
  { href: "/nosotros", label: "Nosotros" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, dispatch } = useCart();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change / escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-[#1A1410]/95 backdrop-blur-md border-b border-[#3E342D]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between relative">
          
          {/* Logo — centered absolutely */}
          <div className="absolute left-1/2 -translate-x-1/2 mt-3">
            <Link href="/" aria-label="BRAVÍO — Página de inicio" className="flex-shrink-0">
              <BravioLogoHorizontal variant="negativo" width={200} height={80} />
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              id="nav-cart-button"
              aria-label={`Carrito — ${totalItems} artículos`}
              onClick={() => dispatch({ type: "OPEN_CART" })}
              className={`relative p-2 transition-colors duration-300 ${
                scrolled || menuOpen ? "text-[#849AAD] hover:text-[#B1C7D4]" : "text-[#B1C7D4]/80 hover:text-[#B1C7D4]"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#5E1C23] text-[#B1C7D4] text-[9px] font-[SpaceGrotesk] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Menu button (visible on all sizes) */}
            <button
              id="nav-menu-button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 transition-colors duration-300 ${
                scrolled || menuOpen ? "text-[#849AAD] hover:text-[#B1C7D4]" : "text-[#B1C7D4]/80 hover:text-[#B1C7D4]"
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? (
                  <path d="M2 2l18 18M20 2L2 20" />
                ) : (
                  <>
                    <line x1="2" y1="5" x2="20" y2="5" />
                    <line x1="2" y1="11" x2="20" y2="11" />
                    <line x1="2" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Fullscreen Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-[-1] w-full h-[100svh] flex flex-col justify-center transition-all duration-700 ease-out ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ background: "#0F0C09" }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
        >
          <nav className="px-8 flex flex-col gap-8 text-center" style={{ transform: menuOpen ? "translateY(0)" : "translateY(40px)", transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-[ArchivoBlack] text-[#B1C7D4] uppercase tracking-tighter leading-none hover:text-[#5E1C23] transition-colors"
                style={{ fontSize: "clamp(3.5rem, 12vw, 6rem)" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 pt-8 flex justify-center">
              <Link href="/contacto" onClick={() => setMenuOpen(false)}
                className="text-[#849AAD] font-[SpaceGrotesk] text-[12px] tracking-[0.3em] uppercase hover:text-[#B1C7D4] transition-colors">
                Contacto
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
