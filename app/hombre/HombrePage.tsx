"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CruzDeHierro } from "@/components/ui/BravioLogo";
import { getProductsByCategory, SINALOA_LEATHER_VARIABLES } from "@/data/products";

export default function HombrePage() {
  const productosHombre = getProductsByCategory("hombre");

  return (
    <div className="pt-[72px] bg-[#0F0C09]">
      {/* Hero Caballero */}
      <section
        className="relative min-h-[80vh] overflow-hidden flex items-end"
        aria-labelledby="hombre-hero-heading"
      >
        <Image
          src="/campaigns/hombre-hero.jpg"
          alt="BRAVÍO Hombre Hero"
          fill
          priority
          className="object-cover object-bottom"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,12,9,0.98) 0%, rgba(15,12,9,0.5) 45%, rgba(15,12,9,0.2) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]" aria-hidden="true">
          <CruzDeHierro size={700} color="#B1C7D4" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 pb-20 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#5E1C23]" />
            <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#849AAD]">
              Línea Caballero · León, Guanajuato
            </p>
          </div>

          <h1
            id="hombre-hero-heading"
            className="font-[ArchivoBlack] text-[#B1C7D4] uppercase"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 7rem)",
              lineHeight: "1.08",
              letterSpacing: "-0.015em",
            }}
          >
            BOTÍN<br />SINALOA.
          </h1>

          <p className="mt-6 font-[SpaceGrotesk] text-base md:text-lg text-[#849AAD] max-w-xl leading-relaxed">
            El modelo insignia para caballero. Manufactura artesanal leonesa, horma ovalada y costura Goodyear Welt sobre 100% cuero genuino.
          </p>

          {/* Quick Specs */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-[SpaceGrotesk] text-[#B1C7D4]">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Horma: Oval
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Tacón: 4 cm 100% Cuero
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Tubo: 25 cm
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Suela: 100% Cuero
            </span>
          </div>
        </div>
      </section>

      {/* CATÁLOGO CLARO — 3 CUADROS DE ANCHO LIMPIOS */}
      <section
        className="w-full relative"
        style={{
          background: "#F5F0EA",
          padding: "clamp(5rem, 8vw, 8rem) 0",
        }}
        aria-labelledby="hombre-catalogo-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

          <div className="mb-12">
            <span className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
              Catálogo Oficial Caballero
            </span>
            <h2
              id="hombre-catalogo-heading"
              className="font-[ArchivoBlack] text-[#1A1410] uppercase text-3xl md:text-5xl tracking-tight leading-[1.12] mt-2"
            >
              MODELOS DISPONIBLES
            </h2>
            <p className="font-[SpaceGrotesk] text-sm text-[#605246] mt-3 max-w-xl">
              Fotografías oficiales de estudio en fondo blanco. Cada par está confeccionado en flor de res seleccionada con forro y suela de cuero natural.
            </p>
          </div>

          {/* Grid de 3 cuadros de ancho — 100% Limpio sin textos sobre las fotos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {productosHombre.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="group flex flex-col bg-white rounded-xl border border-[#E2D9D0] overflow-hidden hover:border-[#5E1C23] hover:shadow-xl transition-all duration-300"
              >
                {/* Foto limpia sin ningún texto encima */}
                <div className="relative w-full aspect-square bg-[#FDFBF7] flex items-center justify-center p-8 border-b border-[#EFE8E0]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Info debajo de la foto */}
                <div className="p-7 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase font-bold text-[#5E1C23]">
                        Gamuza de Res
                      </span>
                      {product.skuBase && (
                        <span className="font-[SpaceGrotesk] text-[10px] tracking-wider uppercase text-[#849AAD]">
                          {product.skuBase}
                        </span>
                      )}
                    </div>

                    <h3 className="font-[ArchivoBlack] text-[#1A1410] text-xl uppercase leading-tight mb-2 group-hover:text-[#5E1C23] transition-colors">
                      {product.name}
                    </h3>

                    <p className="font-[SpaceGrotesk] text-xs text-[#605246] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <p className="font-[SpaceGrotesk] text-[11px] text-[#849AAD] tracking-wider uppercase">
                      Goodyear Welt · Horma Oval · Tacón 4 cm
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#EFE8E0] flex items-center justify-between">
                    <div>
                      <span className="font-[ArchivoBlack] text-[#1A1410] text-xl">
                        ${product.price.toLocaleString("es-MX")}
                      </span>
                      <span className="font-[SpaceGrotesk] text-xs text-[#849AAD] ml-1.5 font-medium">
                        MXN
                      </span>
                    </div>

                    <span className="font-[SpaceGrotesk] text-xs tracking-[0.2em] uppercase font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                      Ver Ficha ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tabla de 12 Variables */}
          <div className="bg-white rounded-2xl border border-[#E2D9D0] p-8 md:p-12 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
                Catálogo de Pieles
              </span>
              <h3 className="font-[ArchivoBlack] text-[#1A1410] text-2xl md:text-3xl uppercase tracking-tight mt-1 mb-3">
                12 VARIABLES DE BOTÍN SINALOA
              </h3>
              <p className="font-[SpaceGrotesk] text-sm text-[#605246] leading-relaxed">
                Cada acabado está disponible para pedido. Las fotos de las variantes restantes se incorporarán tras las sesiones fotográficas en taller.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {SINALOA_LEATHER_VARIABLES.map((v) => (
                <div
                  key={v.sku}
                  className={`p-4 rounded-lg border transition-all ${
                    v.ready
                      ? "bg-[#FAF7F2] border-[#5E1C23]/40 shadow-xs"
                      : "bg-[#FAFAFA] border-[#E8E8E8] opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-[SpaceGrotesk] text-[9px] tracking-wider uppercase text-[#849AAD]">
                      {v.type}
                    </span>
                    {v.ready && (
                      <span className="w-2 h-2 rounded-full bg-[#5E1C23]" title="Disponible con fotos" />
                    )}
                  </div>
                  <p className="font-[ArchivoBlack] text-xs text-[#1A1410] uppercase truncate">
                    {v.name}
                  </p>
                  <p className="font-[SpaceGrotesk] text-[10px] text-[#605246] mt-1">
                    {v.ready ? "Disponible en catálogo" : "En confección"}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
