"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

      <div className="relative overflow-hidden bg-white text-[#605246]">
        {/* =========================================================
            SECTION 1: CINEMATIC HERO
        ========================================================= */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#16120E] text-white">
          {/* Background Video / Atmosphere */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/brand/posterImage-142.png"
              className="w-full h-full object-cover opacity-45 scale-105 filter brightness-75 contrast-110"
            >
              <source src="/media/video.mp4" type="video/mp4" />
            </video>
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#16120E] via-[#16120E]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#16120E]/80 via-transparent to-[#16120E]/80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/20 rounded-full mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B1C7D4] animate-pulse" />
              <span className="text-[11px] font-[SpaceGrotesk] tracking-[0.2em] text-[#B1C7D4] uppercase font-bold">
                León, Guanajuato · Construcción Tradicional
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-archivo text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.95] mb-6">
              WESTERN PARA LA VIDA ACTUAL
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl mx-auto font-[SpaceGrotesk] text-sm sm:text-base md:text-lg text-[#B1C7D4] leading-relaxed mb-10">
              Botas concebidas para el ritmo cotidiano de la ciudad y el camino. Construcción artesanal Goodyear Welt 360° con pieles nobles de res, gamuza y grabados exóticos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/hombre"
                className="w-full sm:w-auto px-8 py-4 bg-[#5E1C23] hover:bg-[#72232b] text-white font-[SpaceGrotesk] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>EXPLORAR CATÁLOGO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/mujer"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-[SpaceGrotesk] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm"
              >
                LÍNEA MUJER 2026
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: MANIFIESTO DE MARCA
        ========================================================= */}
        <section className="relative py-20 bg-[#F4F7F9] border-y border-[#B1C7D4]/40 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Brand Cross Icon */}
            <div className="w-10 h-10 mx-auto mb-6 text-[#5E1C23]">
              <svg viewBox="-280 -280 560 560" className="w-full h-full fill-current">
                <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
              </svg>
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#849AAD] font-[SpaceGrotesk] font-bold mb-4">
              EL MANIFIESTO
            </p>

            <blockquote className="font-archivo text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#605246] leading-snug tracking-wide uppercase">
              &ldquo;No creemos en el disfraz vaquero. Creemos en la bota como instrumento de carácter, elegancia sobria y presencia cotidiana.&rdquo;
            </blockquote>

            <p className="mt-6 text-xs text-[#849AAD] font-[SpaceGrotesk] tracking-[0.15em] uppercase">
              Taller Artesanal BRAVÍO · León, Guanajuato
            </p>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: EL UNIVERSO (HOMBRE / MUJER)
        ========================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#849AAD] font-[SpaceGrotesk] font-bold block mb-2">
              DOS MUNDOS · UNA SOLA RAÍZ
            </span>
            <h2 className="font-archivo text-2xl sm:text-4xl text-[#605246] tracking-wide uppercase">
              COLECCIONES OFICIALES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Universo Hombre */}
            <Link
              href="/hombre"
              className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-[#B1C7D4]/40 bg-white shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src="/products/bota-hombre-silao-1.jpg"
                alt="Colección Hombre BRAVÍO"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#605246]/90 via-[#605246]/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#B1C7D4] block mb-1">
                  Colección Permanente
                </span>
                <h3 className="font-archivo text-2xl sm:text-3xl uppercase tracking-wide mb-2">
                  BRAVÍO HOMBRE
                </h3>
                <p className="text-xs font-[SpaceGrotesk] text-white/80 max-w-sm mb-4 line-clamp-2">
                  Modelos de corte recto y puntera vaquera construidos con vaqueta vegetal y cerco cosido.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] font-bold uppercase tracking-[0.15em] text-[#B1C7D4] group-hover:text-white transition-colors">
                  <span>Ver Colección Hombre</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Universo Mujer */}
            <Link
              href="/mujer"
              className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border border-[#B1C7D4]/40 bg-white shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Image
                src="/brand/image1.png"
                alt="Campaña Mujer 2026 BRAVÍO"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#605246]/90 via-[#605246]/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#B1C7D4] block mb-1">
                  Campaña Visual 2026
                </span>
                <h3 className="font-archivo text-2xl sm:text-3xl uppercase tracking-wide mb-2">
                  BRAVÍO MUJER
                </h3>
                <p className="text-xs font-[SpaceGrotesk] text-white/80 max-w-sm mb-4 line-clamp-2">
                  Cinco territorios narrativos. Siluetas audaces, amuleto forjado y presencia contemporánea.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] font-bold uppercase tracking-[0.15em] text-[#B1C7D4] group-hover:text-white transition-colors">
                  <span>Explorar Campaña 2026</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: CATÁLOGO DE BOTAS DESTACADAS (FONDO BLANCO LIMPIO)
        ========================================================= */}
        <section className="py-20 bg-white border-t border-[#B1C7D4]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#B1C7D4]/30">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
                  CONSTRUCCIÓN GOODYEAR WELT 360°
                </span>
                <h2 className="font-archivo text-2xl sm:text-4xl text-[#605246] tracking-wider uppercase mt-1">
                  MODELOS INSIGNIA
                </h2>
              </div>
              <Link
                href="/hombre"
                className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#5E1C23] hover:text-[#72232b] font-[SpaceGrotesk] font-bold transition-colors"
              >
                <span>Ver catálogo completo ({PRODUCTS_CATALOG.length} modelos)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Products Grid — Pure White Backgrounds for Seamless Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS_CATALOG.slice(0, 6).map((product) => {
                const currentSize = selectedSizes[product.sku] || product.variants[0]?.size || "27 MX";
                const isAdded = addedSku === product.sku;

                return (
                  <div
                    key={product.sku}
                    className="group bg-white border border-[#B1C7D4]/50 hover:border-[#5E1C23] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
                  >
                    {/* Image View with Pure White Base */}
                    <Link
                      href={`/producto/${product.slug}`}
                      className="relative block aspect-[4/5] bg-white overflow-hidden border-b border-[#B1C7D4]/30"
                    >
                      <Image
                        src={product.featuredImage}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span className="absolute top-3 left-3 bg-[#F4F7F9] text-[10px] font-[SpaceGrotesk] font-bold tracking-widest uppercase text-[#605246] px-2.5 py-1 border border-[#B1C7D4]/50">
                        {product.leatherType}
                      </span>
                    </Link>

                    {/* Product Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD] mb-1">
                          SKU: {product.sku}
                        </p>
                        <h3 className="font-archivo text-base uppercase tracking-wide text-[#605246] group-hover:text-[#5E1C23] transition-colors mb-1">
                          <Link href={`/producto/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] line-clamp-1 mb-3">
                          {product.subtitle}
                        </p>

                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="font-archivo text-lg text-[#5E1C23]">
                            ${product.price.toLocaleString("es-MX")} MXN
                          </span>
                        </div>

                        {/* Size Picker */}
                        <div className="mb-5">
                          <span className="text-[10px] uppercase font-[SpaceGrotesk] tracking-widest text-[#849AAD] block mb-2 font-bold">
                            Talla Mexicana:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.variants.map((v) => (
                              <button
                                key={v.size}
                                onClick={() => handleSelectSize(product.sku, v.size)}
                                className={`px-2.5 py-1 text-xs font-mono transition-colors border ${
                                  currentSize === v.size
                                    ? "bg-[#5E1C23] border-[#5E1C23] text-white font-bold"
                                    : "bg-white text-[#605246] hover:border-[#605246] border-[#B1C7D4]/60"
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
                        className={`w-full py-3 px-4 font-[SpaceGrotesk] text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                          isAdded
                            ? "bg-emerald-700 text-white"
                            : "bg-[#605246] hover:bg-[#5E1C23] text-white"
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
        <section className="py-24 bg-[#F4F7F9] border-t border-[#B1C7D4]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden border border-[#B1C7D4]/50 shadow-xl bg-white">
                <Image
                  src="/products/bota-suela-zipper.jpg"
                  alt="Detalle de construcción de suela artesanal BRAVÍO"
                  fill
                  className="object-cover object-center filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#605246]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-[#B1C7D4] font-[SpaceGrotesk] block mb-1">
                    Garantía de Construcción Artesanal
                  </span>
                  <p className="font-archivo text-lg uppercase tracking-wider">
                    Costura 360° Goodyear Welt
                  </p>
                </div>
              </div>

              {/* Narrative Info */}
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
                  HERENCIA DE LEÓN GUANAJUATO
                </span>
                <h2 className="font-archivo text-3xl sm:text-4xl text-[#605246] tracking-wide uppercase leading-tight">
                  MÁS DE 200 PASOS ARTESANALES EN CADA PAR
                </h2>
                <p className="text-sm font-[SpaceGrotesk] text-[#605246] leading-relaxed">
                  Cada bota BRAVÍO nace en las manos de maestros artesanos zapateros en León, Guanajuato. Seleccionamos rigurosamente pieles curtidas con extractos vegetales naturales, asegurando una flexibilidad orgánica y una respirabilidad total.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="border-l-2 border-[#5E1C23] pl-4">
                    <h4 className="font-archivo text-xs text-[#605246] tracking-wider uppercase mb-1">
                      Goodyear Welt 360°
                    </h4>
                    <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
                      Suela de vaqueta cosida al cerco, permitiendo resolar tus botas cuantas veces sea necesario.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#5E1C23] pl-4">
                    <h4 className="font-archivo text-xs text-[#605246] tracking-wider uppercase mb-1">
                      Cambrillón de Acero
                    </h4>
                    <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
                      Alma de acero templado integrada en el enfranque para garantizar soporte anatómico continuo.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/historia"
                    className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase text-[#5E1C23] hover:text-[#72232b] transition-colors"
                  >
                    <span>Conocer la historia de nuestro taller</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
