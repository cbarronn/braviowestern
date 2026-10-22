"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, type Product } from "@/data/products";

type FilterTab = "todos" | "hombre" | "res-gamuza" | "exoticos" | "mujer";

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<FilterTab>("todos");

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "todos") return true;
    if (activeTab === "hombre") return product.category === "hombre";
    if (activeTab === "mujer") return product.category === "mujer";
    if (activeTab === "res-gamuza") {
      return product.category === "hombre" && (product.leatherType === "res" || product.leatherType === "gamuza");
    }
    if (activeTab === "exoticos") {
      return product.category === "hombre" && product.leatherType === "exotico";
    }
    return true;
  });

  return (
    <section
      id="catalogo"
      className="w-full relative transition-colors duration-500"
      style={{
        background: "#F5F0EA", // Zona clara solicitada por el cliente para resaltar los modelos
        padding: "clamp(5rem, 9vw, 8rem) 0",
        borderTop: "1px solid #E2D9D0",
        borderBottom: "1px solid #E2D9D0",
      }}
      aria-labelledby="products-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#5E1C23]" />
              <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
                Catálogo Oficial · León, Gto.
              </p>
            </div>
            
            <h2
              id="products-heading"
              className="font-[ArchivoBlack] text-[#1A1410] uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", lineHeight: 0.95 }}
            >
              EL PASO LO<br />DICE TODO.
            </h2>

            <p className="font-[SpaceGrotesk] text-sm md:text-base text-[#605246] mt-4 max-w-xl leading-relaxed">
              En caballero presentamos el <strong className="text-[#1A1410]">Botín Sinaloa</strong>: un modelo insignia con 12 variables en piel de res, gamuza y exóticos. Construcción artesanal Goodyear Welt sobre horma oval.
            </p>
          </div>

          {/* Promo pill */}
          <div className="self-start lg:self-auto bg-[#FFFFFF] border border-[#E2D9D0] p-4 rounded-lg shadow-sm flex items-center gap-4">
            <span className="w-10 h-10 rounded-full bg-[#5E1C23]/10 text-[#5E1C23] flex items-center justify-center font-[ArchivoBlack] text-sm">
              10%
            </span>
            <div>
              <p className="font-[ArchivoBlack] text-[#1A1410] text-xs uppercase tracking-wide">
                Descuento de Bienvenida
              </p>
              <p className="font-[SpaceGrotesk] text-[11px] text-[#605246]">
                10% OFF en tu primera compra en todos los modelos
              </p>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-[#E2D9D0]">
          {[
            { id: "todos", label: "Todos los Modelos", count: PRODUCTS.length },
            { id: "hombre", label: "Caballero: Botín Sinaloa", count: 12 },
            { id: "res-gamuza", label: "Res & Gamuza", count: 7 },
            { id: "exoticos", label: "Pieles Exóticas", count: 5 },
            { id: "mujer", label: "Dama", count: 2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FilterTab)}
              className={`px-5 py-2.5 rounded-full font-[SpaceGrotesk] text-[11px] tracking-[0.18em] uppercase transition-all duration-300 flex-shrink-0 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-[#1A1410] text-[#F5F0EA] shadow-md"
                  : "bg-white/80 text-[#605246] hover:bg-white hover:text-[#1A1410] border border-[#E2D9D0]"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? "bg-[#5E1C23] text-white" : "bg-[#E2D9D0] text-[#605246]"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* 3 COLUMNS PRODUCT GRID (Como lo solicitó Gonzalo: 3 cuadros de ancho) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const hasStudioPic = product.images[0]?.startsWith("/products/sinaloa/");
            return (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="group flex flex-col bg-white rounded-lg border border-[#E2D9D0] overflow-hidden hover:border-[#5E1C23]/60 hover:shadow-xl transition-all duration-500"
                aria-label={`Ver ${product.name}`}
              >
                {/* Image Container — Anclada y con aspecto cuadrado/3:4 fijo y fondo neutro limpio */}
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

                  {/* Badges superiores */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="font-[SpaceGrotesk] text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded bg-[#1A1410] text-[#F5F0EA] shadow-sm">
                      {product.leatherType === "exotico" 
                        ? "Exótico" 
                        : product.leatherType === "gamuza" 
                        ? "Gamuza" 
                        : "Piel de Res"}
                    </span>

                    {product.skuBase && (
                      <span className="font-[SpaceGrotesk] text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-white/90 text-[#605246] border border-[#E2D9D0]">
                        {product.skuBase}
                      </span>
                    )}
                  </div>

                  {/* Goodyear Welt Badge */}
                  <div className="absolute bottom-3 left-3 pointer-events-none z-10">
                    <span className="font-[SpaceGrotesk] text-[9px] tracking-wider uppercase px-2 py-0.5 rounded bg-white/95 text-[#605246] border border-[#E2D9D0] shadow-xs">
                      Goodyear Welt · 4cm
                    </span>
                  </div>

                  {/* Color swatches */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10 bg-white/90 px-2 py-1 rounded-full border border-[#E2D9D0] shadow-xs">
                    {product.colors.map((c) => (
                      <span
                        key={c.slug}
                        title={c.name}
                        className="w-2.5 h-2.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.22em] uppercase text-[#849AAD] font-semibold mb-1.5">
                      {product.subtitle}
                    </p>

                    <h3 className="font-[ArchivoBlack] text-[#1A1410] uppercase text-lg lg:text-xl leading-tight tracking-tight mb-2 group-hover:text-[#5E1C23] transition-colors">
                      {product.name}
                    </h3>

                    <p className="font-[SpaceGrotesk] text-xs text-[#605246] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-[#EFE8E0] flex items-center justify-between mt-auto">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-[ArchivoBlack] text-[#1A1410] text-lg">
                          ${product.price.toLocaleString("es-MX")}
                        </span>
                        <span className="font-[SpaceGrotesk] text-xs text-[#849AAD]">
                          MXN
                        </span>
                      </div>
                      {product.originalPrice && (
                        <p className="font-[SpaceGrotesk] text-[10px] text-[#849AAD] line-through">
                          ${product.originalPrice.toLocaleString("es-MX")} MXN
                        </p>
                      )}
                    </div>

                    <span className="font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Ver Ficha ↗
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-8 rounded-xl bg-white border border-[#E2D9D0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-[#5E1C23] text-[#F5F0EA] flex items-center justify-center font-[ArchivoBlack] text-xl flex-shrink-0">
              ✦
            </div>
            <div>
              <h4 className="font-[ArchivoBlack] text-[#1A1410] text-base uppercase">
                ¿Buscas una medida o acabado especial?
              </h4>
              <p className="font-[SpaceGrotesk] text-xs text-[#605246] mt-0.5">
                Fabricamos en León, Guanajuato sobre pedido en tallas del 25 al 30 con medias tallas.
              </p>
            </div>
          </div>

          <Link
            href="/contacto"
            className="px-6 py-3 rounded-full bg-[#1A1410] text-[#F5F0EA] font-[SpaceGrotesk] text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#5E1C23] transition-colors whitespace-nowrap"
          >
            Atención Personalizada ↗
          </Link>
        </div>

      </div>
    </section>
  );
}
