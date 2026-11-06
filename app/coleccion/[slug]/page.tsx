"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { ArrowLeft, Check, Filter } from "lucide-react";

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
    ? "Siluetas Western contemporáneas de caña estilizada y pieles excepcionales."
    : "La consagración de la bota vaquera tradicional para el asfalto contemporáneo.";

  const filteredProducts = PRODUCTS_CATALOG.filter((p) => {
    if (leatherFilter === "all") return true;
    if (leatherFilter === "gamuza") return p.leatherType.toLowerCase().includes("gamuza");
    if (leatherFilter === "res") return p.leatherType.toLowerCase().includes("res");
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
    <div className="min-h-screen bg-bravio-volcanic py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-sm overflow-hidden border border-bravio-volcanic-border mb-12 p-8 md:p-14 bg-bravio-volcanic-card flex flex-col justify-end min-h-[300px]">
        <div className="absolute inset-0 z-0">
          <img
            src={isWomen ? "/brand/image1.png" : "/brand/image10.png"}
            alt={title}
            className="w-full h-full object-cover object-center opacity-30 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bravio-volcanic-card via-bravio-volcanic-card/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
            Catálogo Oficial BRAVÍO
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-bravio-bone tracking-wide uppercase mt-2">
            {title}
          </h1>
          <p className="text-sm text-bravio-cloudy mt-3 leading-relaxed font-light">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-bravio-volcanic-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-bravio-cloudy" />
          <span className="text-xs uppercase font-sans tracking-widest text-bravio-cloudy">
            Filtrar por Piel:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "Todas las Pieles" },
            { id: "gamuza", label: "Gamuza Aperitada" },
            { id: "res", label: "Piel de Res Plena Flor" },
            { id: "exotico", label: "Grabados Exóticos" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setLeatherFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-sans tracking-wider rounded-sm transition-all ${
                leatherFilter === tab.id
                  ? "bg-bravio-granate text-bravio-bone font-medium shadow-md shadow-bravio-granate/30"
                  : "bg-bravio-volcanic-card text-bravio-cloudy hover:text-bravio-bone border border-bravio-volcanic-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const currentSize = selectedSizes[product.sku] || product.variants[0]?.size || "27 MX";
          const isAdded = addedSku === product.sku;

          return (
            <div
              key={product.sku}
              className="group bg-bravio-volcanic border border-bravio-volcanic-border hover:border-bravio-granate/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <Link
                href={`/producto/${product.slug}`}
                className="relative block aspect-[4/5] bg-bravio-volcanic-card overflow-hidden"
              >
                <img
                  src={product.featuredImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-bravio-volcanic/90 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase text-bravio-cloudy px-2.5 py-1 border border-bravio-volcanic-border">
                  {product.leatherType}
                </span>
              </Link>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-bravio-bone group-hover:text-bravio-cloudy transition-colors">
                    <Link href={`/producto/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-bravio-cloudy/80 line-clamp-1 mb-3">
                    {product.subtitle}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display text-base text-bravio-bone">
                      ${product.price.toLocaleString("es-MX")} MXN
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-bravio-cloudy/50 line-through">
                        ${product.compareAtPrice.toLocaleString("es-MX")}
                      </span>
                    )}
                  </div>

                  {/* Size Picker */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-bravio-cloudy block mb-1.5">
                      Talla Mexicana:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.variants.map((v) => (
                        <button
                          key={v.size}
                          onClick={() => handleSelectSize(product.sku, v.size)}
                          className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                            currentSize === v.size
                              ? "bg-bravio-granate text-bravio-bone font-bold"
                              : "bg-bravio-volcanic-card text-bravio-cloudy hover:text-bravio-bone border border-bravio-volcanic-border"
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
                  className={`w-full py-2.5 px-4 rounded-sm font-sans text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-bravio-volcanic-card hover:bg-bravio-granate text-bravio-bone border border-bravio-volcanic-border hover:border-bravio-granate"
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

