"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, ArrowRight, X } from "lucide-react";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [selectedLeather, setSelectedLeather] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((p) => {
      const matchQuery =
        !query.trim() ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.leatherType.toLowerCase().includes(query.toLowerCase()) ||
        (p.category ? p.category.toLowerCase().includes(query.toLowerCase()) : false) ||
        p.gender.toLowerCase().includes(query.toLowerCase());

      const matchLeather =
        selectedLeather === "all" ||
        p.leatherType.toLowerCase().includes(selectedLeather.toLowerCase());

      return matchQuery && matchLeather;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [query, selectedLeather, sortBy]);

  return (
    <div className="pt-[100px] min-h-screen bg-[#0F0C09] text-[#B1C7D4] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 border-b border-[#605246]/20">
          <div className="flex items-center gap-2 mb-2">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD]">
              Catálogo Oficial BRAVÍO
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-5xl text-[#B1C7D4] uppercase tracking-tight">
            BUSCAR CALZADO
          </h1>
        </div>

        {/* Search Bar & Filters Bar */}
        <div className="py-8 space-y-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#849AAD]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por modelo, tipo de piel (gamuza, res, avestruz), SKU o color..."
              className="w-full bg-[#16120E] border border-[#605246]/40 pl-12 pr-12 py-4 text-sm font-[SpaceGrotesk] text-[#B1C7D4] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#849AAD] hover:text-[#B1C7D4] p-1"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-[SpaceGrotesk] text-[#849AAD] uppercase tracking-wider mr-2 flex items-center gap-1">
                <SlidersHorizontal size={14} /> Piel:
              </span>
              {[
                { id: "all", label: "Todas" },
                { id: "gamuza", label: "Gamuza / Suede" },
                { id: "res", label: "Piel de Res / Vacuno" },
                { id: "cuello", label: "Cuello de Toro" },
                { id: "avestruz", label: "Exóticos" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedLeather(filter.id)}
                  className={`px-3 py-1.5 text-xs font-[SpaceGrotesk] uppercase tracking-wider transition-colors border ${
                    selectedLeather === filter.id
                      ? "bg-[#5E1C23] border-[#5E1C23] text-white"
                      : "bg-[#16120E] border-[#605246]/40 text-[#849AAD] hover:text-[#B1C7D4]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 text-xs font-[SpaceGrotesk]">
              <span className="text-[#849AAD] uppercase tracking-wider">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#16120E] border border-[#605246]/40 px-3 py-1.5 text-[#B1C7D4] focus:outline-none focus:border-[#5E1C23]"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="pb-6 text-xs font-[SpaceGrotesk] text-[#849AAD] tracking-wider uppercase">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "resultado encontrado" : "resultados encontrados"}
          {query && ` para "${query}"`}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#16120E] border border-[#605246]/30 p-12 text-center my-8">
            <CruzDeHierro size={36} color="#849AAD" className="mx-auto mb-4 opacity-40" />
            <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide mb-2">
              No se encontraron coincidencias
            </h2>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] mb-6">
              Prueba buscando otro término como &ldquo;gamuza&rdquo;, &ldquo;res&rdquo;, o revisa el catálogo completo.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedLeather("all");
              }}
              className="px-6 py-3 bg-[#5E1C23] text-white text-xs font-[SpaceGrotesk] uppercase tracking-wider"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.sku}
                href={`/producto/${product.slug}`}
                className="group bg-[#16120E] border border-[#605246]/30 hover:border-[#B1C7D4]/40 transition-colors flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] bg-[#0F0C09] overflow-hidden border-b border-[#605246]/20">
                  <Image
                    src={product.featuredImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#0F0C09]/80 backdrop-blur-sm px-2 py-0.5 border border-[#605246]/40 text-[9px] font-[SpaceGrotesk] uppercase tracking-[0.15em] text-[#849AAD]">
                    {product.leatherType}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD] mb-1">
                      SKU: {product.sku}
                    </p>
                    <h3 className="font-archivo text-base text-[#B1C7D4] uppercase tracking-wide group-hover:text-white transition-colors mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#605246]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-[SpaceGrotesk] text-[#849AAD] block uppercase tracking-wider">
                        Precio
                      </span>
                      <span className="font-archivo text-base text-[#B1C7D4]">
                        ${product.price.toLocaleString("es-MX")} MXN
                      </span>
                    </div>

                    <span className="w-8 h-8 rounded-full border border-[#605246]/40 flex items-center justify-center text-[#849AAD] group-hover:border-[#5E1C23] group-hover:text-[#B1C7D4] transition-colors">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
