"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, SINALOA_LEATHER_VARIABLES, type Product } from "@/data/products";

type FilterTab = "todos" | "hombre" | "mujer";

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<FilterTab>("todos");

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "todos") return true;
    if (activeTab === "hombre") return product.category === "hombre";
    if (activeTab === "mujer") return product.category === "mujer";
    return true;
  });

  return (
    <section
      id="catalogo"
      className="w-full relative"
      style={{
        background: "#F5F0EA", // Fondo claro solicitado para que resalten los modelos
        padding: "clamp(5rem, 8vw, 8rem) 0",
        borderTop: "1px solid #E2D9D0",
        borderBottom: "1px solid #E2D9D0",
      }}
      aria-labelledby="products-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header con aire editorial y amplio margen */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.08 }}
            >
              COLECCIÓN BRAVÍO
            </h2>

            <p className="font-[SpaceGrotesk] text-sm md:text-base text-[#605246] mt-4 max-w-xl leading-relaxed">
              En caballero presentamos el <strong className="text-[#1A1410]">Botín Sinaloa</strong> en horma oval y construcción Goodyear Welt. Calzado de piel legítima hecho a mano en León, Guanajuato.
            </p>
          </div>

          {/* Filtros limpios */}
          <div className="flex items-center gap-2">
            {[
              { id: "todos", label: "Todos" },
              { id: "hombre", label: "Caballero (Botín Sinaloa)" },
              { id: "mujer", label: "Dama" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FilterTab)}
                className={`px-5 py-2.5 rounded-full font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#1A1410] text-[#F5F0EA] shadow-md"
                    : "bg-white text-[#605246] border border-[#E2D9D0] hover:text-[#1A1410] hover:border-[#1A1410]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 CUADROS DE ANCHO — TARJETAS 100% LIMPIAS SIN ELEMENTOS EMPALMADOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/producto/${product.slug}`}
              className="group flex flex-col bg-white rounded-xl border border-[#E2D9D0] overflow-hidden hover:border-[#5E1C23] hover:shadow-xl transition-all duration-300"
              aria-label={`Ver ${product.name}`}
            >
              {/* Contenedor de foto limpio — CERO textos flotando sobre la bota */}
              <div className="relative w-full aspect-square bg-[#FDFBF7] flex items-center justify-center p-8 border-b border-[#EFE8E0]">
                <Image
                  src={product.images[0] || "/products/bota-frente.jpg"}
                  alt={product.name}
                  fill
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Información debajo de la foto — Espaciada y legible */}
              <div className="p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase font-bold text-[#5E1C23]">
                      {product.category === "hombre" ? "Caballero · Botín" : "Dama · Bota"}
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
                    Goodyear Welt · Horma Oval · Suela 100% Cuero
                  </p>
                </div>

                {/* Precio y CTA */}
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
                    Ver Detalles ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sección Informativa de Variables de Piel para Caballero (Sin fotos inventadas) */}
        <div className="bg-white rounded-2xl border border-[#E2D9D0] p-8 md:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
              Manufactura en Taller
            </span>
            <h3 className="font-[ArchivoBlack] text-[#1A1410] text-2xl md:text-3xl uppercase tracking-tight mt-1 mb-3">
              12 VARIABLES DEL BOTÍN SINALOA
            </h3>
            <p className="font-[SpaceGrotesk] text-sm text-[#605246] leading-relaxed">
              El modelo insignia de caballero se confecciona en 12 acabados de piel genuina. Las fotos de cada variante se integrarán conforme concluyan las sesiones de shooting en taller.
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
                    <span className="w-2 h-2 rounded-full bg-[#5E1C23]" title="Disponible en catálogo" />
                  )}
                </div>
                <p className="font-[ArchivoBlack] text-xs text-[#1A1410] uppercase truncate">
                  {v.name}
                </p>
                <p className="font-[SpaceGrotesk] text-[10px] text-[#605246] mt-1">
                  {v.ready ? "Disponible en catálogo" : "En confección de taller"}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
