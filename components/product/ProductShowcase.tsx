"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";

export default function ProductShowcase() {
  const featured = getFeaturedProducts();

  return (
    <section
      id="productos-destacados"
      className="w-full"
      style={{ background: "#0F0C09", padding: "clamp(5rem, 10vw, 9rem) 0" }}
      aria-labelledby="products-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#849AAD" }}>
              La colección
            </p>
            <h2
              id="products-heading"
              className="font-[ArchivoBlack] text-[#B1C7D4] uppercase"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", lineHeight: 0.9, letterSpacing: "-0.025em" }}
            >
              LAS BOTAS<br />QUE TE PONES.
            </h2>
          </div>
          <Link
            href="/coleccion"
            className="self-start sm:self-auto inline-flex items-center gap-2 font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase hover:text-[#B1C7D4] transition-colors"
            style={{ color: "#849AAD" }}
          >
            Ver todo
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 7h12M7 1l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Product grid — 2 cols always on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featured.map((product, i) => (
            <Link
              key={product.id}
              href={`/producto/${product.slug}`}
              className="group block"
              aria-label={`Ver ${product.name}`}
            >
              {/* Image Container with strict 3:4 aspect ratio hack for all browsers */}
              <div className="relative w-full pt-[133.33%] mb-4 bg-[#1A1410] overflow-hidden group-hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-shadow duration-500">
                <Image
                  src={product.images[0] || "/campaigns/clean-boots.png"}
                  alt={product.name}
                  fill
                  className="absolute inset-0 object-cover object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(15,12,9,0.8) 0%, transparent 40%)" }}
                />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase px-3 py-1.5"
                    style={{ color: "#1A1410", background: "rgba(177,199,212,0.9)" }}
                  >
                    {product.category === "mujer" ? "Mujer" : "Hombre"}
                  </span>
                </div>
                
                {/* Color swatches */}
                <div className="absolute bottom-4 left-4 flex gap-2 z-10 bg-[#1A1410]/50 p-2 rounded-full backdrop-blur-sm">
                  {product.colors.slice(0, 3).map((c) => (
                    <span
                      key={c.slug}
                      title={c.name}
                      className="rounded-full shadow-sm"
                      style={{ width: "12px", height: "12px", background: c.hex, border: "1px solid rgba(255,255,255,0.3)" }}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div>
                <p
                  className="font-[SpaceGrotesk] text-[9px] tracking-[0.15em] uppercase mb-1"
                  style={{ color: "#849AAD" }}
                >
                  {product.subtitle}
                </p>
                <h3
                  className="font-[ArchivoBlack] text-[#B1C7D4] uppercase leading-none mb-1.5 group-hover:text-[#5E1C23] transition-colors"
                  style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)", letterSpacing: "-0.01em" }}
                >
                  {product.name}
                </h3>
                <p className="font-[SpaceGrotesk] text-sm" style={{ color: "#849AAD" }}>
                  ${product.price.toLocaleString("es-MX")} MXN
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
