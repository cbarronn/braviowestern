"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, type Product } from "@/data/products";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

type Filter = "all" | "mujer" | "hombre";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      aria-label={`Ver ${product.name}`}
      className="group flex flex-col bg-white rounded-xl border border-[#E2D9D0] overflow-hidden hover:border-[#5E1C23] hover:shadow-xl transition-all duration-300"
    >
      {/* Contenedor de foto limpio — CERO textos sobre la bota */}
      <div className="relative w-full aspect-square bg-[#FDFBF7] flex items-center justify-center p-8 border-b border-[#EFE8E0]">
        <Image
          src={product.images[0] || "/products/bota-frente.jpg"}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Información ordenada debajo de la imagen */}
      <div className="p-7 flex flex-col flex-grow justify-between bg-white">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase font-bold text-[#5E1C23]">
              {product.category === "mujer" ? "Dama" : "Caballero"}
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
            Goodyear Welt · Horma Oval · Suela de Cuero
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
  );
}

export default function ColeccionPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="pt-[72px] min-h-screen bg-[#F5F0EA]">
      {/* Header */}
      <section
        className="relative overflow-hidden bg-[#1A1410] py-20 md:py-28"
        aria-labelledby="coleccion-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#5E1C23]" />
            <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#849AAD]">
              Toda la colección
            </p>
          </div>
          <h1
            id="coleccion-heading"
            className="font-[ArchivoBlack] text-[#B1C7D4] uppercase"
            style={{
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              lineHeight: "1.08",
              letterSpacing: "-0.015em",
            }}
          >
            LAS BOTAS<br />QUE TE PONES.
          </h1>
          <p className="mt-6 font-[SpaceGrotesk] text-base text-[#849AAD] max-w-lg leading-relaxed">
            Calzado artesanal confeccionado en León, Guanajuato. Piel genuina, costura Goodyear Welt y horma oval.
          </p>
        </div>
        <div className="absolute right-10 bottom-10 opacity-[0.04] pointer-events-none" aria-hidden="true">
          <CruzDeHierro size={400} color="#B1C7D4" />
        </div>
      </section>

      {/* Filter bar */}
      <div
        className="sticky top-[72px] z-40 border-b border-[#E2D9D0] bg-[#F5F0EA]/95 backdrop-blur-md"
        role="group"
        aria-label="Filtros de colección"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-2">
              {(["all", "hombre", "mujer"] as Filter[]).map((f) => (
                <button
                  key={f}
                  id={`filter-${f}`}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-full font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase font-semibold transition-all ${
                    filter === f
                      ? "bg-[#1A1410] text-[#F5F0EA] shadow-sm"
                      : "bg-white text-[#605246] border border-[#E2D9D0] hover:text-[#1A1410]"
                  }`}
                >
                  {f === "all" ? "Todos los Modelos" : f === "mujer" ? "Dama" : "Caballero (Botín Sinaloa)"}
                </button>
              ))}
            </div>
            <span className="font-[SpaceGrotesk] text-xs text-[#849AAD] tracking-wider uppercase hidden sm:inline-block">
              {filtered.length} {filtered.length === 1 ? "modelo" : "modelos"}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Columns Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
