"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Shield, Search, ArrowRight } from "lucide-react";
import { useCommerceStore } from "@/lib/store/commerce-store";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getCartTotal } = useCommerceStore();
  const { count } = getCartTotal();

  return (
    <header className="sticky top-0 z-40 w-full bg-bravio-volcanic/90 backdrop-blur-md border-b border-bravio-volcanic-border">
      {/* Top Banner Notice */}
      <div className="bg-bravio-granate text-bravio-bone text-[11px] font-sans tracking-widest text-center py-1.5 px-4 font-medium uppercase">
        Envíos asegurados a todo México • Confección artesanal en León Gto.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-bravio-cloudy hover:text-bravio-bone transition-colors"
            aria-label="Menú principal"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation Links (Left) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/coleccion/sinaloa"
            className="text-xs uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors font-sans"
          >
            Colección Sinaloa
          </Link>
          <Link
            href="/hombre"
            className="text-xs uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors font-sans"
          >
            Hombre
          </Link>
          <Link
            href="/coleccion/bravio-mujer"
            className="text-xs uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors font-sans"
          >
            Mujer 2026
          </Link>
        </nav>

        {/* Official Brand Logo (Center) */}
        <div className="flex-1 md:flex-initial flex justify-center items-center py-2">
          <Link href="/" className="group flex items-center gap-3">
            {/* Authentic SVG Logo */}
            <div className="w-40 sm:w-48 text-bravio-granate group-hover:text-bravio-granate-light transition-colors">
              <svg viewBox="-110 -1215 4554 1325" className="w-full h-auto fill-current">
                <g transform="scale(1,-1)">
                  <g transform="translate(0,0)"><path d="M722 519Q722 392 607 359V355Q738 325 738 183Q738 129 711.5 87.5Q685 46 639.0 23.0Q593 0 538 0H74V688H532Q584 688 627.5 666.5Q671 645 696.5 606.0Q722 567 722 519ZM295 420H447Q469 420 483.5 435.5Q498 451 498 474V484Q498 506 483.0 521.5Q468 537 447 537H295ZM295 160H463Q485 160 499.5 175.5Q514 191 514 214V224Q514 247 499.5 262.5Q485 278 463 278H295Z"/></g>
                  <g transform="translate(778,0)"><path d="M594 288 747 0H499L377 251H295V0H74V688H495Q569 688 621.5 659.5Q674 631 700.5 582.5Q727 534 727 477Q727 414 693.0 363.0Q659 312 594 288ZM440 531H295V404H440Q466 404 484.0 422.5Q502 441 502 468Q502 495 484.0 513.0Q466 531 440 531Z"/></g>
                  <g transform="translate(1556,0)"><path d="M535 0 506 97H265L236 0H10L261 688H518L769 0ZM311 251H460L388 496H384Z"/></g>
                  <g transform="translate(2334,0)"><path d="M261 0 17 688H253L391 228H395L534 688H760L517 0Z"/></g>
                  <g transform="translate(3112,0)"><path d="M84 0V688H305V0Z"/></g>
                  <g transform="translate(3501,0)"><path d="M788 344Q788 170 691.0 79.0Q594 -12 416 -12Q238 -12 141.5 78.5Q45 169 45 344Q45 519 141.5 609.5Q238 700 416 700Q594 700 691.0 609.0Q788 518 788 344ZM271 376V312Q271 239 308.0 196.0Q345 153 416 153Q487 153 524.5 196.0Q562 239 562 312V376Q562 449 524.5 492.0Q487 535 416 535Q345 535 308.0 492.0Q271 449 271 376Z"/></g>
                  <g transform="translate(3306.5,940)"><path d="M -46.2 -46.2 L 46.2 -46.2 L 85.8 -165 L -85.8 -165 Z M -46.2 46.2 L 46.2 46.2 L 85.8 165 L -85.8 165 Z M -46.2 -46.2 L -46.2 46.2 L -165 85.8 L -165 -85.8 Z M 46.2 -46.2 L 46.2 46.2 L 165 85.8 L 165 -85.8 Z M -46.2 -46.2 L 46.2 -46.2 L 46.2 46.2 L -46.2 46.2 Z"/></g>
                </g>
              </svg>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation (Right) & Cart */}
        <div className="flex items-center gap-6">
          <Link
            href="/historia"
            className="hidden lg:block text-xs uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors font-sans"
          >
            Historia
          </Link>
          <Link
            href="/rastreo"
            className="hidden lg:block text-xs uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors font-sans"
          >
            Rastreo
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-bravio-cloudy/60 hover:text-bravio-gold transition-colors font-sans"
            title="Panel Administrativo"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-bravio-bone hover:text-bravio-cloudy transition-colors flex items-center gap-2"
            aria-label="Abrir carrito de compras"
          >
            <ShoppingBag className="w-5 h-5 text-bravio-bone" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-bravio-granate text-bravio-bone text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-bravio-volcanic">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-bravio-volcanic border-b border-bravio-volcanic-border px-6 py-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="/coleccion/sinaloa"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base uppercase tracking-widest text-bravio-bone hover:text-bravio-granate transition-colors font-sans"
            >
              Colección Sinaloa
            </Link>
            <Link
              href="/hombre"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base uppercase tracking-widest text-bravio-bone hover:text-bravio-granate transition-colors font-sans"
            >
              Hombre
            </Link>
            <Link
              href="/coleccion/bravio-mujer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base uppercase tracking-widest text-bravio-bone hover:text-bravio-granate transition-colors font-sans"
            >
              Mujer 2026
            </Link>
            <Link
              href="/historia"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base uppercase tracking-widest text-bravio-bone hover:text-bravio-granate transition-colors font-sans"
            >
              Historia y Artesanía
            </Link>
            <Link
              href="/rastreo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base uppercase tracking-widest text-bravio-bone hover:text-bravio-granate transition-colors font-sans"
            >
              Rastreo de Pedidos
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base uppercase tracking-widest text-bravio-gold hover:underline transition-colors font-sans pt-4 border-t border-bravio-volcanic-border"
            >
              Acceso a Administración
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
