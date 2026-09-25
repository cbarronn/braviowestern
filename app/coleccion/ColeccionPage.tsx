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
      aria-label={`Ver ${product.name} — ${product.subtitle}`}
      className="group block"
    >
      <div
        className="aspect-[3/4] mb-4 overflow-hidden relative"
        style={{
          background:
            product.category === "mujer"
              ? "linear-gradient(135deg, #C8D8E2, #849AAD)"
              : "linear-gradient(135deg, #7A6858, #3E342D)",
        }}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <CruzDeHierro
              size={70}
              color={product.category === "mujer" ? "#605246" : "#B1C7D4"}
            />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/20 transition-colors duration-500" />
        {/* Demo badge */}
        {product.isDemoData && (
          <span className="absolute top-2 left-2 text-[9px] font-[SpaceGrotesk] tracking-widest uppercase bg-[#849AAD]/70 text-[#1A1410] px-2 py-0.5">
            Demo
          </span>
        )}
        {/* Category badge */}
        <span className="absolute top-2 right-2 text-[9px] font-[SpaceGrotesk] tracking-widest uppercase bg-[#605246]/70 text-[#B1C7D4] px-2 py-0.5">
          {product.category === "mujer" ? "Mujer" : "Hombre"}
        </span>
        {/* Colors */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.slug}
              title={c.name}
              className="w-3 h-3 rounded-full border border-white/30"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-label-caps text-[#849AAD] text-[10px] mb-1">
            {product.subtitle}
          </p>
          <h3 className="font-archivo text-[#605246] text-xl uppercase tracking-tight leading-none group-hover:text-[#5E1C23] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-[#849AAD] font-[SpaceGrotesk] mt-2">
            ${product.price.toLocaleString("es-MX")} MXN
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="#5E1C23"
          strokeWidth="1.5"
          className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        >
          <path d="M1 8h14M8 1l7 7-7 7" />
        </svg>
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
    <div className="pt-[72px] min-h-screen bg-[#B1C7D4]">
      {/* Header */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #B1C7D4, #849AAD)", padding: "clamp(5rem, 10vw, 10rem) 0" }}
        aria-labelledby="coleccion-heading"
      >
        <div className="bravio-container relative z-10">
          <p className="text-label-caps text-[#3E342D] mb-6" style={{ letterSpacing: "0.25em", fontSize: "10px" }}>Toda la colección</p>
          <h1
            id="coleccion-heading"
            className="font-archivo text-[#605246]"
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: "0.9",
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            LAS BOTAS<br />QUE TE PONES.
          </h1>
        </div>
        <div className="absolute right-10 bottom-10 opacity-[0.06]" aria-hidden="true">
          <CruzDeHierro size={300} color="#605246" />
        </div>
      </section>

      {/* Filter bar */}
      <div
        className="sticky top-[72px] z-40 border-b border-[#849AAD]/40 bg-[#B1C7D4]/95 backdrop-blur-sm"
        role="group"
        aria-label="Filtros de colección"
      >
        <div className="bravio-container">
          <div className="flex items-center gap-2 py-5">
            {(["all", "mujer", "hombre"] as Filter[]).map((f) => (
              <button
                key={f}
                id={`filter-${f}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`px-8 py-2.5 text-label-caps transition-all duration-300 ${
                  filter === f
                    ? "bg-[#605246] text-[#B1C7D4]"
                    : "text-[#605246] hover:text-[#3E342D] hover:bg-[#849AAD]/30"
                }`}
                style={{ fontSize: "10px", letterSpacing: "0.25em" }}
              >
                {f === "all" ? "Todos" : f === "mujer" ? "Mujer" : "Hombre"}
              </button>
            ))}
            <span className="ml-auto text-label-caps text-[#849AAD] text-[10px]">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="bravio-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>


      </div>
    </div>
  );
}
