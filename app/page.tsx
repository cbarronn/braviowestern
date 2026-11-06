"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Compass, Check } from "lucide-react";
import CinematicIntro from "@/components/intro/CinematicIntro";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import { useCommerceStore } from "@/lib/store/commerce-store";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedSku, setAddedSku] = useState<string | null>(null);

  const { addToCart } = useCommerceStore();

  useEffect(() => {
    // Check if intro has already run in this session
    const seen = sessionStorage.getItem("bravio_intro_seen");
    if (!seen) {
      setShowIntro(true);
    }
  }, []);

  const handleSelectSize = (sku: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [sku]: size }));
  };

  const handleAddToCart = (product: typeof PRODUCTS_CATALOG[0]) => {
    const size = selectedSizes[product.sku] || product.variants[0]?.size || "27 MX";
    addToCart({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      size,
      price: product.price,
      image: product.featuredImage,
    });
    setAddedSku(product.sku);
    setTimeout(() => setAddedSku(null), 2000);
  };

  return (
    <>
      {/* Cinematic Intro Animation */}
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      <div className="relative overflow-hidden">
        {/* =========================================================
            SECTION 1: CINEMATIC HERO
        ========================================================= */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-bravio-volcanic">
          {/* Background Video / Atmosphere */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/brand/posterImage-142.png"
              className="w-full h-full object-cover opacity-40 scale-105 filter brightness-75 contrast-110"
            >
              <source src="/media/video.mp4" type="video/mp4" />
            </video>
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-bravio-volcanic via-bravio-volcanic/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-bravio-volcanic/80 via-transparent to-bravio-volcanic/80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bravio-granate/30 border border-bravio-granate/50 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-bravio-gold animate-pulse" />
              <span className="text-[11px] font-sans tracking-widest text-bravio-cloudy uppercase">
                Edición Limitada 2026 • León, Gto.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-bravio-bone tracking-tight uppercase leading-[0.95] mb-6">
              WESTERN PARA LA VIDA ACTUAL
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto font-sans text-sm sm:text-base md:text-lg text-bravio-cloudy font-light leading-relaxed mb-10">
              Botas concebidas para el ritmo implacable de la ciudad moderna. Construcción artesanal Goodyear Welt con pieles nobles de res, gamuza y grabados exóticos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/coleccion/sinaloa"
                className="w-full sm:w-auto px-8 py-4 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone font-sans text-xs tracking-widest uppercase transition-all duration-300 shadow-xl shadow-bravio-granate/30 flex items-center justify-center gap-2 group"
              >
                <span>EXPLORAR COLECCIÓN SINALOA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/coleccion/bravio-mujer"
                className="w-full sm:w-auto px-8 py-4 bg-bravio-volcanic-card/80 hover:bg-bravio-volcanic-border border border-bravio-volcanic-border hover:border-bravio-cloudy/40 text-bravio-bone font-sans text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-sm"
              >
                LÍNEA MUJER 2026
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: MANIFIESTO DE MARCA
        ========================================================= */}
        <section className="relative py-24 bg-bravio-volcanic border-y border-bravio-volcanic-border overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Brand Cross Icon */}
            <div className="w-10 h-10 mx-auto mb-6 text-bravio-granate">
              <svg viewBox="-280 -280 560 560" className="w-full h-full fill-current">
                <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
              </svg>
            </div>

            <p className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans font-medium mb-4">
              EL MANIFIESTO
            </p>

            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-bravio-bone leading-snug tracking-wide uppercase">
              “No creemos en el disfraz vaquero. Creemos en la bota como instrumento de carácter, elegancia sobria y presencia indeleble.”
            </blockquote>

            <p className="mt-6 text-xs text-bravio-cloudy/60 font-sans tracking-widest uppercase">
              Taller Artesanal BRAVÍO • León, Guanajuato
            </p>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: EL UNIVERSO (HOMBRE / MUJER)
        ========================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
              DIMENSIONES
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-bravio-bone tracking-wider uppercase mt-1">
              EL UNIVERSO BRAVÍO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Hombre */}
            <Link
              href="/hombre"
              className="group relative h-[520px] rounded-sm overflow-hidden border border-bravio-volcanic-border hover:border-bravio-granate/60 transition-all duration-500 shadow-xl flex flex-col justify-end p-8"
            >
              <img
                src="/products/bota-hombre-silao-1.jpg"
                alt="Línea Hombre BRAVÍO"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bravio-volcanic via-bravio-volcanic/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-bravio-cloudy font-sans">
                  Colección Permanente
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase mt-1">
                  HOMBRE SINALOA
                </h3>
                <p className="text-xs text-bravio-cloudy mt-2 max-w-sm font-light">
                  Siluetas robustas y acabados pull-up, gamuzas aperladas y exóticos legendarios con construcción Goodyear Welt.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-sans tracking-widest text-bravio-gold group-hover:translate-x-1 transition-transform">
                  <span>VER CATÁLOGO HOMBRE</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Card Mujer */}
            <Link
              href="/coleccion/bravio-mujer"
              className="group relative h-[520px] rounded-sm overflow-hidden border border-bravio-volcanic-border hover:border-bravio-granate/60 transition-all duration-500 shadow-xl flex flex-col justify-end p-8"
            >
              <img
                src="/brand/image1.png"
                alt="Línea Mujer BRAVÍO 2026"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bravio-volcanic via-bravio-volcanic/40 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-bravio-cloudy font-sans">
                  Campaña Visual 2026
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase mt-1">
                  BRAVÍO MUJER
                </h3>
                <p className="text-xs text-bravio-cloudy mt-2 max-w-sm font-light">
                  Estética desértica contemporánea. Siluetas depuradas y cañas anatómicas de máxima distinción y poder.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-sans tracking-widest text-bravio-gold group-hover:translate-x-1 transition-transform">
                  <span>EXPLORAR CAMPAÑA MUJER</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: CATÁLOGO DE BOTAS DESTACADAS
        ========================================================= */}
        <section className="py-20 bg-bravio-volcanic-card/50 border-t border-bravio-volcanic-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
                  CONSTRUCCIÓN GOODYEAR WELT
                </span>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-bravio-bone tracking-wider uppercase mt-1">
                  MODELOS INSIGNIA
                </h2>
              </div>
              <Link
                href="/coleccion/sinaloa"
                className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bravio-cloudy hover:text-bravio-bone font-sans transition-colors"
              >
                <span>Ver catálogo completo ({PRODUCTS_CATALOG.length} modelos)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS_CATALOG.slice(0, 6).map((product) => {
                const currentSize = selectedSizes[product.sku] || product.variants[0]?.size || "27 MX";
                const isAdded = addedSku === product.sku;

                return (
                  <div
                    key={product.sku}
                    className="group bg-bravio-volcanic border border-bravio-volcanic-border hover:border-bravio-granate/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
                  >
                    {/* Image View */}
                    <Link
                      href={`/producto/${product.slug}`}
                      className="relative block aspect-[4/5] bg-bravio-volcanic-card overflow-hidden"
                    >
                      <img
                        src={product.featuredImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 bg-bravio-volcanic/90 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase text-bravio-cloudy px-2.5 py-1 border border-bravio-volcanic-border">
                        {product.leatherType}
                      </span>
                    </Link>

                    {/* Product Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-display text-sm uppercase tracking-wider text-bravio-bone group-hover:text-bravio-cloudy transition-colors">
                            <Link href={`/producto/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="text-xs text-bravio-cloudy/80 line-clamp-1 mb-3">
                          {product.subtitle}
                        </p>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="font-display text-base text-bravio-bone">
                            ${product.price.toLocaleString("es-MX")} MXN
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-xs text-bravio-cloudy/50 line-through">
                              ${product.compareAtPrice.toLocaleString("es-MX")}
                            </span>
                          )}
                        </div>

                        {/* Size Picker */}
                        <div className="mb-4">
                          <span className="text-[10px] uppercase font-sans tracking-widest text-bravio-cloudy block mb-1.5">
                            Talla Mexicana:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.variants.map((v) => (
                              <button
                                key={v.size}
                                onClick={() => handleSelectSize(product.sku, v.size)}
                                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                                  currentSize === v.size
                                    ? "bg-bravio-granate text-bravio-bone font-bold"
                                    : "bg-bravio-volcanic-card text-bravio-cloudy hover:text-bravio-bone border border-bravio-volcanic-border"
                                }`}
                              >
                                {v.size.replace(" MX", "")}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-2.5 px-4 rounded-sm font-sans text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-bravio-volcanic-card hover:bg-bravio-granate text-bravio-bone border border-bravio-volcanic-border hover:border-bravio-granate"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>AGREGADO AL CARRITO</span>
                          </>
                        ) : (
                          <span>AGREGAR AL CARRITO</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: ORIGEN ARTESANAL EN LEÓN
        ========================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-bravio-volcanic-border shadow-2xl">
              <img
                src="/products/bota-suela-zipper.jpg"
                alt="Detalle de construcción de suela artesanal BRAVÍO"
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bravio-volcanic/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] uppercase tracking-widest text-bravio-gold font-sans block mb-1">
                  Garantía de Por Vida en Construcción
                </span>
                <p className="font-display text-lg text-bravio-bone uppercase tracking-wider">
                  Costura 360° Goodyear Welt
                </p>
              </div>
            </div>

            {/* Narrative Info */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
                HERENCIA DE LEÓN GUANAJUATO
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-bravio-bone tracking-wide uppercase leading-tight">
                MÁS DE 200 PASOS ARTESANALES EN CADA PAR
              </h2>
              <p className="text-sm text-bravio-cloudy leading-relaxed font-light">
                Cada bota BRAVÍO nace en las manos de artesanos con más de cuatro décadas de maestría zapatera. Seleccionamos rigurosamente pieles curtidas con extractos vegetales naturales, asegurando una flexibilidad orgánica y una respirabilidad total.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-bravio-granate pl-4">
                  <h4 className="font-display text-xs text-bravio-bone tracking-wider uppercase mb-1">
                    Goodyear Welt
                  </h4>
                  <p className="text-xs text-bravio-cloudy/80 leading-relaxed">
                    Suela cosida al ribete, permitiendo resolar tus botas indefinidamente conforme pasen los años.
                  </p>
                </div>
                <div className="border-l-2 border-bravio-granate pl-4">
                  <h4 className="font-display text-xs text-bravio-bone tracking-wider uppercase mb-1">
                    Alma de Acero Templado
                  </h4>
                  <p className="text-xs text-bravio-cloudy/80 leading-relaxed">
                    Cambrillón de acero integrado en el puente para mantener la postura anatómica perfecta en cada zancada.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/historia"
                  className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-bravio-gold hover:text-bravio-bone transition-colors"
                >
                  <span>Conocer la historia de nuestro taller</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
