"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS_CATALOG } from "@/lib/data/products";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { ArrowLeft, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "bota-sinaloa-gamuza-arena";

  const product = PRODUCTS_CATALOG.find(
    (p) => p.slug === slug || p.id === slug || p.sku.toLowerCase() === slug.toLowerCase()
  ) || PRODUCTS_CATALOG[0];

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
    <div className="min-h-screen bg-white text-[#605246] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/hombre"
          className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] uppercase tracking-widest text-[#849AAD] hover:text-[#605246] transition-colors font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al catálogo</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Gallery with pure white backdrop for seamless white-background photos */}
        <div className="space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] bg-white rounded-none overflow-hidden border border-[#B1C7D4]/60 p-6 flex items-center justify-center shadow-xs">
            <Image
              src={product.images[activeImageIndex] || product.featuredImage}
              alt={product.name}
              fill
              className="object-contain p-6"
              priority
            />
            <span className="absolute top-4 left-4 bg-[#F4F7F9] text-[10px] font-[SpaceGrotesk] font-bold tracking-widest uppercase text-[#605246] px-3 py-1 border border-[#B1C7D4]/60">
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
                  className={`relative w-20 h-24 flex-shrink-0 bg-white border-2 p-1 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#5E1C23] shadow-xs"
                      : "border-[#B1C7D4]/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CruzDeHierro size={14} color="#5E1C23" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
                SKU: {product.sku} · Hecho a mano en León, Gto.
              </span>
            </div>
            <h1 className="font-archivo text-3xl sm:text-4xl text-[#605246] uppercase tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm font-[SpaceGrotesk] text-[#849AAD] mt-2">
              {product.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-archivo text-3xl text-[#5E1C23] font-bold">
                ${product.price.toLocaleString("es-MX")} MXN
              </span>
              {product.compareAtPrice && (
                <span className="text-sm font-[SpaceGrotesk] text-[#849AAD]/70 line-through">
                  ${product.compareAtPrice.toLocaleString("es-MX")} MXN
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-[#B1C7D4]/40 pt-6">
            <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Sizing Grid */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-[SpaceGrotesk]">
              <span className="uppercase tracking-widest text-[#605246] font-bold">
                Selecciona Talla (México)
              </span>
              <Link href="/guia-de-tallas" className="text-[#5E1C23] text-[11px] font-bold underline">
                Guía de tallas
              </Link>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  onClick={() => setSelectedSize(v.size)}
                  className={`py-3 px-2 text-center transition-all border ${
                    selectedSize === v.size
                      ? "bg-[#5E1C23] text-white border-[#5E1C23] font-bold shadow-xs"
                      : "bg-white text-[#605246] hover:bg-[#F4F7F9] border-[#B1C7D4]"
                  }`}
                >
                  <span className="block font-mono text-sm">{v.size.replace(" MX", "")}</span>
                  <span className="block text-[9px] font-[SpaceGrotesk] opacity-75 uppercase">
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
              className={`w-full py-4 px-6 font-[SpaceGrotesk] text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                isAdded
                  ? "bg-emerald-700 text-white"
                  : "bg-[#5E1C23] hover:bg-[#47151a] text-white"
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
              className="w-full py-3.5 px-6 font-[SpaceGrotesk] text-xs font-bold tracking-widest uppercase transition-all duration-300 bg-white hover:bg-[#F4F7F9] border border-[#B1C7D4] text-[#605246]"
            >
              COMPRAR AHORA (CHECKOUT RÁPIDO)
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#B1C7D4]/40 pt-6 text-xs font-[SpaceGrotesk] text-[#849AAD]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#5E1C23] flex-shrink-0" />
              <span>Envío Gratis a todo México</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#5E1C23] flex-shrink-0" />
              <span>Primer cambio de talla gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5E1C23] flex-shrink-0" />
              <span>Garantía Goodyear Welt 360°</span>
            </div>
          </div>

          {/* Technical Specs List */}
          <div className="border border-[#B1C7D4]/50 bg-[#F4F7F9] divide-y divide-[#B1C7D4]/30 text-xs font-[SpaceGrotesk]">
            <div className="p-3 flex justify-between">
              <span className="text-[#849AAD] uppercase">Construcción:</span>
              <span className="text-[#605246] font-bold">{product.construction}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#849AAD] uppercase">Tipo de Piel:</span>
              <span className="text-[#605246] font-bold">{product.leatherType}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-[#849AAD] uppercase">Color Oficial:</span>
              <span className="text-[#605246] font-bold">{product.color}</span>
            </div>
            {product.details?.suela && (
              <div className="p-3 flex justify-between">
                <span className="text-[#849AAD] uppercase">Suela:</span>
                <span className="text-[#605246] font-bold">{product.details.suela}</span>
              </div>
            )}
            {product.details?.horma && (
              <div className="p-3 flex justify-between">
                <span className="text-[#849AAD] uppercase">Horma:</span>
                <span className="text-[#605246] font-bold">{product.details.horma}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
