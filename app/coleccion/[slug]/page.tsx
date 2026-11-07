"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { ArrowLeft, Check, Filter } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function CollectionPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "sinaloa";

  const [leatherFilter, setLeatherFilter] = useState<string>("all");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedSku, setAddedSku] = useState<string | null>(null);

  const { addToCart } = useCommerceStore();

  const isWomen = slug === "bravio-mujer";
  const title = isWomen ? "BRAVÍO MUJER — CAMPAÑA 2026" : "COLECCIÓN SINALOA";
  const subtitle = isWomen
    ? "Siluetas Western contemporáneas de caña estilizada y pieles seleccionadas."
    : "La consagración de la bota vaquera artesanal para el asfalto y la vida contemporánea.";

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    // If on women collection, show only women models; otherwise show men/unisex
    if (isWomen) {
      if (p.gender !== "mujer" && p.collectionId !== "bravio-mujer") return false;
    } else {
      if (p.gender === "mujer") return false;
    }

    if (leatherFilter === "all") return true;
    if (leatherFilter === "gamuza") return p.leatherType.toLowerCase().includes("gamuza");
    if (leatherFilter === "res") return p.leatherType.toLowerCase().includes("res") || p.leatherType.toLowerCase().includes("vaqueta") || p.leatherType.toLowerCase().includes("vacuno");
    if (leatherFilter === "exotico") {
      const l = p.leatherType.toLowerCase();
      return l.includes("alligator") || l.includes("avestruz") || l.includes("pitón") || l.includes("caimán");
    }
    return true;
  });

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
    <div className="min-h-screen bg-white text-[#605246] pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] uppercase tracking-widest text-[#849AAD] hover:text-[#605246] transition-colors font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden border border-[#B1C7D4]/50 mb-12 p-8 md:p-14 bg-[#605246] flex flex-col justify-end min-h-[280px] shadow-md">
        <div className="absolute inset-0 z-0">
          <Image
            src={isWomen ? "/campaigns/mujer-escena-01.jpg" : "/campaigns/hombre-hero.jpg"}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-30 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#605246] via-[#605246]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <CruzDeHierro size={14} color="#B1C7D4" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B1C7D4] font-[SpaceGrotesk] font-bold">
              Catálogo Oficial BRAVÍO
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase mt-1">
            {title}
          </h1>
          <p className="text-sm text-[#B1C7D4] mt-3 leading-relaxed font-[SpaceGrotesk]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#B1C7D4]/40">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#849AAD]" />
          <span className="text-xs uppercase font-[SpaceGrotesk] tracking-widest text-[#849AAD] font-bold">
            Filtrar por Piel:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "Todas las Pieles" },
            { id: "gamuza", label: "Gamuza de Res" },
            { id: "res", label: "Piel Vacuno" },
            { id: "exotico", label: "Grabados Exóticos" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setLeatherFilter(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-[SpaceGrotesk] uppercase tracking-wider transition-all font-bold ${
                leatherFilter === tab.id
                  ? "bg-[#5E1C23] text-white shadow-xs"
                  : "bg-[#F4F7F9] text-[#605246] hover:bg-[#B1C7D4]/20 border border-[#B1C7D4]/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products — Pure White Cards for Seamless Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const currentSize = selectedSizes[product.sku] || product.variants[0]?.size || "27 MX";
          const isAdded = addedSku === product.sku;

          return (
            <div
              key={product.sku}
              className="group bg-white border border-[#B1C7D4]/50 hover:border-[#605246]/50 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <Link
                href={`/producto/${product.slug}`}
                className="relative block aspect-[4/5] bg-white overflow-hidden border-b border-[#B1C7D4]/30 p-4"
              >
                <Image
                  src={product.featuredImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#F4F7F9] text-[9px] font-[SpaceGrotesk] font-bold tracking-widest uppercase text-[#605246] px-2.5 py-1 border border-[#B1C7D4]/50">
                  {product.leatherType}
                </span>
              </Link>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD] mb-1 font-bold">
                    SKU: {product.sku}
                  </p>
                  <h3 className="font-archivo text-base uppercase tracking-wider text-[#605246] group-hover:text-[#5E1C23] transition-colors mb-1">
                    <Link href={`/producto/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] line-clamp-1 mb-3">
                    {product.subtitle}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-archivo text-lg text-[#5E1C23] font-bold">
                      ${product.price.toLocaleString("es-MX")} MXN
                    </span>
                  </div>

                  {/* Size Picker */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-[SpaceGrotesk] tracking-widest text-[#849AAD] block mb-1.5 font-bold">
                      Talla Mexicana:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.map((v) => (
                        <button
                          key={v.size}
                          onClick={() => handleSelectSize(product.sku, v.size)}
                          className={`px-2.5 py-1 text-xs font-mono transition-colors border ${
                            currentSize === v.size
                              ? "bg-[#5E1C23] text-white border-[#5E1C23] font-bold"
                              : "bg-white text-[#605246] hover:bg-[#F4F7F9] border-[#B1C7D4]/60"
                          }`}
                        >
                          {v.size.replace(" MX", "")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 px-4 font-[SpaceGrotesk] text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdded
                      ? "bg-emerald-700 text-white"
                      : "bg-[#605246] hover:bg-[#5E1C23] text-white shadow-xs"
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
  );
}
