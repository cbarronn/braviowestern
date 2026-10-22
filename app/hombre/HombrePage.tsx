"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CruzDeHierro } from "@/components/ui/BravioLogo";
import { getProductsByCategory, type Product } from "@/data/products";

type HombreFilter = "all" | "res-gamuza" | "exoticos";

export default function HombrePage() {
  const [filter, setFilter] = useState<HombreFilter>("all");
  const todosHombre = getProductsByCategory("hombre");

  const variables = todosHombre.filter((p) => {
    if (filter === "all") return true;
    if (filter === "res-gamuza") return p.leatherType === "res" || p.leatherType === "gamuza";
    if (filter === "exoticos") return p.leatherType === "exotico";
    return true;
  });

  return (
    <div className="pt-[72px] bg-[#0F0C09]">
      {/* Hero Caballero */}
      <section
        className="relative min-h-[85vh] overflow-hidden flex items-end"
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
              "linear-gradient(to top, rgba(15,12,9,0.98) 0%, rgba(15,12,9,0.6) 40%, rgba(15,12,9,0.2) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]" aria-hidden="true">
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
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              lineHeight: "0.92",
              letterSpacing: "-0.02em",
            }}
          >
            BOTÍN<br />SINALOA.
          </h1>

          <p className="mt-6 font-[SpaceGrotesk] text-base md:text-lg text-[#849AAD] max-w-xl leading-relaxed">
            Un solo modelo insignia. <strong className="text-[#B1C7D4]">12 variables de piel</strong> entre res de flor entera, gamuzas finas y pieles exóticas. Construido a mano bajo la rigurosa técnica Goodyear Welt.
          </p>

          {/* Quick Specs Strip */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-[SpaceGrotesk] text-[#B1C7D4]">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Horma: Oval
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Tacón: 4 cm 100% Cuero
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Tubo: 25 cm
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-[#3E342D]">
              ✦ Construcción: Goodyear Welt
            </span>
          </div>
        </div>
      </section>

      {/* ZONA DE CATÁLOGO CLARA — 3 CUADROS DE ANCHO (Requerimiento Gonzalo) */}
      <section
        className="w-full relative transition-colors duration-500"
        style={{
          background: "#F5F0EA",
          padding: "clamp(4rem, 8vw, 7rem) 0",
        }}
        aria-labelledby="hombre-catalogo-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

          {/* Intro header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#5E1C23] mb-2">
                1 Modelo · 12 Variables de Caballero
              </p>
              <h2
                id="hombre-catalogo-heading"
                className="font-[ArchivoBlack] text-[#1A1410] uppercase text-3xl md:text-5xl tracking-tight leading-none"
              >
                LAS 12 VARIABLES.
              </h2>
              <p className="font-[SpaceGrotesk] text-sm text-[#605246] mt-3 max-w-lg">
                Selecciona entre la resistencia del cuero vacuno, la textura táctil de la gamuza o la distinción de las pieles exóticas legítimas.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: "all", label: "Todas las Pieles (12)" },
                { id: "res-gamuza", label: "Res & Gamuza (7)" },
                { id: "exoticos", label: "Pieles Exóticas (5)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id as HombreFilter)}
                  className={`px-4 py-2 rounded-full font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase font-bold transition-all ${
                    filter === btn.id
                      ? "bg-[#1A1410] text-[#F5F0EA] shadow"
                      : "bg-white text-[#605246] border border-[#E2D9D0] hover:border-[#1A1410]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3 COLUMNS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {variables.map((product) => {
              const hasStudioPic = product.images[0]?.startsWith("/products/sinaloa/");
              return (
                <Link
                  key={product.id}
                  href={`/producto/${product.slug}`}
                  className="group flex flex-col bg-white rounded-lg border border-[#E2D9D0] overflow-hidden hover:border-[#5E1C23]/60 hover:shadow-xl transition-all duration-500"
                >
                  {/* Photo container */}
                  <div className="relative w-full aspect-square bg-[#F9F7F4] flex items-center justify-center overflow-hidden border-b border-[#EFE8E0]">
                    <Image
                      src={product.images[0] || "/products/bota-frente.jpg"}
                      alt={product.name}
                      fill
                      className={`object-contain p-6 transition-transform duration-700 group-hover:scale-105 ${
                        hasStudioPic ? "drop-shadow-md" : "object-cover p-0"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Tag badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-[SpaceGrotesk] text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded bg-[#1A1410] text-[#F5F0EA]">
                        {product.leatherType === "exotico" 
                          ? "Piel Exótica" 
                          : product.leatherType === "gamuza" 
                          ? "Gamuza de Res" 
                          : "Piel de Res"}
                      </span>
                    </div>

                    {product.skuBase && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="font-[SpaceGrotesk] text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-white/90 text-[#605246] border border-[#E2D9D0]">
                          {product.skuBase}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="font-[SpaceGrotesk] text-[9px] tracking-wider uppercase px-2 py-0.5 rounded bg-white/95 text-[#605246] border border-[#E2D9D0]">
                        Horma Oval · Goodyear Welt
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase text-[#849AAD] font-semibold mb-1">
                        {product.subtitle}
                      </p>
                      <h3 className="font-[ArchivoBlack] text-[#1A1410] uppercase text-xl leading-tight mb-2 group-hover:text-[#5E1C23] transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-[SpaceGrotesk] text-xs text-[#605246] line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#EFE8E0] flex items-center justify-between mt-auto">
                      <div>
                        <span className="font-[ArchivoBlack] text-[#1A1410] text-lg">
                          ${product.price.toLocaleString("es-MX")}
                        </span>
                        <span className="font-[SpaceGrotesk] text-xs text-[#849AAD] ml-1">
                          MXN
                        </span>
                      </div>
                      <span className="font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Ver Detalles ↗
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Ficha Técnica General Banner */}
          <div className="mt-16 bg-[#1A1410] text-[#F5F0EA] p-8 md:p-12 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase text-[#B1C7D4] font-bold">
                  Especificación de Taller
                </span>
                <h3 className="font-[ArchivoBlack] text-3xl md:text-4xl uppercase mt-2 mb-4">
                  FICHA TÉCNICA BOTÍN SINALOA
                </h3>
                <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] leading-relaxed">
                  Cada par de Botín Sinaloa se manufactura en León, Guanajuato empleando cuero 100% genuino en corte, forro y suela. La construcción Goodyear Welt garantiza que la bota pueda ser resolada y dure décadas.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-[SpaceGrotesk]">
                <div className="p-3 bg-white/5 rounded border border-[#3E342D]">
                  <p className="text-[#849AAD] text-[10px] uppercase">Horma</p>
                  <p className="text-white font-bold mt-1">Oval Leonesa</p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-[#3E342D]">
                  <p className="text-[#849AAD] text-[10px] uppercase">Tacón</p>
                  <p className="text-white font-bold mt-1">4 cm Cuero 100%</p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-[#3E342D]">
                  <p className="text-[#849AAD] text-[10px] uppercase">Altura Tubo</p>
                  <p className="text-white font-bold mt-1">25 cm</p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-[#3E342D]">
                  <p className="text-[#849AAD] text-[10px] uppercase">Construcción</p>
                  <p className="text-white font-bold mt-1">Goodyear Welt</p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-[#3E342D]">
                  <p className="text-[#849AAD] text-[10px] uppercase">Suela</p>
                  <p className="text-white font-bold mt-1">100% Cuero</p>
                </div>
                <div className="p-3 bg-white/5 rounded border border-[#3E342D]">
                  <p className="text-[#849AAD] text-[10px] uppercase">Tallas</p>
                  <p className="text-white font-bold mt-1">25 al 30 (c/medios)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
