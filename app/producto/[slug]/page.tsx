"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { ArrowLeft, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "sinaloa-gamuza-arena";

  const product = PRODUCTS_CATALOG.find((p) => p.slug === slug) || PRODUCTS_CATALOG[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || "27 MX");
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart, openCart } = useCommerceStore();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      size: selectedSize,
      price: product.price,
      image: product.images[activeImageIndex] || product.featuredImage,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      sku: product.sku,
      name: product.name,
      size: selectedSize,
      price: product.price,
      image: product.images[activeImageIndex] || product.featuredImage,
    });
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-bravio-volcanic py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/coleccion/sinaloa"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al catálogo</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Gallery */}
        <div className="space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] bg-bravio-volcanic-card rounded-sm overflow-hidden border border-bravio-volcanic-border shadow-2xl">
            <img
              src={product.images[activeImageIndex] || product.featuredImage}
              alt={product.name}
              className="w-full h-full object-cover object-center filter contrast-105"
            />
            <span className="absolute top-4 left-4 bg-bravio-volcanic/90 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase text-bravio-cloudy px-3 py-1 border border-bravio-volcanic-border">
              {product.leatherType}
            </span>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 flex-shrink-0 bg-bravio-volcanic-card rounded overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-bravio-granate scale-95"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
              SKU: {product.sku}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-bravio-bone uppercase tracking-wide mt-1">
              {product.name}
            </h1>
            <p className="text-sm text-bravio-cloudy mt-2 font-light">
              {product.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-display text-2xl sm:text-3xl text-bravio-bone">
                ${product.price.toLocaleString("es-MX")} MXN
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-bravio-cloudy/60 line-through">
                  ${product.compareAtPrice.toLocaleString("es-MX")}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-bravio-volcanic-border pt-6">
            <p className="text-sm text-bravio-cloudy leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Sizing Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans uppercase tracking-widest text-bravio-bone font-medium">
                Selecciona Talla (México)
              </span>
              <span className="text-bravio-gold text-[11px] underline cursor-pointer">
                Guía de hormas
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  onClick={() => setSelectedSize(v.size)}
                  className={`py-3 px-2 rounded text-center transition-all ${
                    selectedSize === v.size
                      ? "bg-bravio-granate text-bravio-bone font-bold ring-2 ring-bravio-granate"
                      : "bg-bravio-volcanic-card text-bravio-cloudy hover:text-bravio-bone border border-bravio-volcanic-border"
                  }`}
                >
                  <span className="block font-mono text-sm">{v.size.replace(" MX", "")}</span>
                  <span className="block text-[9px] text-bravio-cloudy/70 uppercase">
                    {v.stock} disp.
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded-sm font-sans text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone shadow-xl shadow-bravio-granate/30"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>AGREGADO AL CARRITO</span>
                </>
              ) : (
                <span>AGREGAR AL CARRITO</span>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-sm font-sans text-xs tracking-widest uppercase transition-all duration-300 bg-bravio-volcanic-card hover:bg-bravio-volcanic-border border border-bravio-volcanic-border text-bravio-bone"
            >
              COMPRAR AHORA (EXPRÉS)
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-bravio-volcanic-border pt-6 text-xs text-bravio-cloudy">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-bravio-gold flex-shrink-0" />
              <span>Envío Gratis a todo México</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-bravio-gold flex-shrink-0" />
              <span>Construcción Goodyear Welt</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-bravio-gold flex-shrink-0" />
              <span>Primer cambio de talla gratis</span>
            </div>
          </div>

          {/* Technical Specs Details */}
          <div className="border border-bravio-volcanic-border rounded-sm bg-bravio-volcanic-card/50 divide-y divide-bravio-volcanic-border text-xs">
            <div className="p-3 flex justify-between">
              <span className="text-bravio-cloudy/70 uppercase">Horma</span>
              <span className="text-bravio-bone font-medium">{product.details.horma}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-bravio-cloudy/70 uppercase">Suela</span>
              <span className="text-bravio-bone font-medium">{product.details.suela}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-bravio-cloudy/70 uppercase">Tubo</span>
              <span className="text-bravio-bone font-medium">{product.details.tubo}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-bravio-cloudy/70 uppercase">Tacón</span>
              <span className="text-bravio-bone font-medium">{product.details.tacon}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-bravio-cloudy/70 uppercase">Origen</span>
              <span className="text-bravio-bone font-medium">{product.details.origen}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

