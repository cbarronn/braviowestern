"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CruzDeHierro, BravioLogoApilado } from "@/components/ui/BravioLogo";
import { getProductsByCategory } from "@/data/products";

export default function HombrePage() {
  const productosHombre = getProductsByCategory("hombre");

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        className="relative min-h-screen overflow-hidden flex items-end"
        aria-labelledby="hombre-hero-heading"
      >
        <Image
          src="/campaigns/hombre-hero.jpg"
          alt="BRAVÍO Hombre Hero"
          fill
          priority
          className="object-cover object-bottom"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(26,20,16,0.95) 0%, rgba(26,20,16,0.5) 40%, rgba(26,20,16,0.2) 100%)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]" aria-hidden="true">
          <CruzDeHierro size={700} color="#B1C7D4" />
        </div>
        <div className="bravio-container relative z-10 pb-20">
          <p className="text-label-caps text-[#849AAD] mb-6">La colección</p>
          <h1
            id="hombre-hero-heading"
            className="font-archivo text-[#B1C7D4]"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.015em",
              textTransform: "uppercase",
            }}
          >
            BRAVÍO<br />HOMBRE.
          </h1>
          <p className="mt-8 font-[SpaceGrotesk] text-[#849AAD] max-w-md leading-relaxed">
            Para el hombre que camina con propósito. Manufactura artesanal en León, Guanajuato.
          </p>
        </div>
      </section>

      {/* Second section — concept */}
      <section
        className="bravio-section"
        style={{ background: "#605246" }}
        aria-labelledby="hombre-concepto-heading"
      >
        <div className="bravio-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                id="hombre-concepto-heading"
                className="font-archivo text-[#B1C7D4]"
                style={{
                  fontSize: "clamp(2rem, 4vw, 4rem)",
                  lineHeight: "0.95",
                  letterSpacing: "-0.015em",
                  textTransform: "uppercase",
                }}
              >
                EL PASO<br />LO DICE TODO.
              </h2>
              <p className="mt-8 font-[SpaceGrotesk] text-[#849AAD] leading-loose max-w-sm">
                La bota de un hombre habla antes que él. BRAVÍO construye cada par con el oficio de León y el carácter del que la porta.
              </p>
            </div>
            <div
              className="aspect-[4/5] flex items-center justify-center relative overflow-hidden"
            >
              <Image
                src="/campaigns/hombre-producto.jpg"
                alt="Botas BRAVÍO Hombre"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        className="bravio-section bg-[#B1C7D4]"
        aria-labelledby="hombre-productos-heading"
      >
        <div className="bravio-container">
          <p className="text-label-caps text-[#849AAD] mb-4">La colección</p>
          <h2
            id="hombre-productos-heading"
            className="font-archivo text-[#605246] mb-12"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.025em",
              textTransform: "uppercase",
            }}
          >
            BRAVÍO Hombre
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {productosHombre.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                aria-label={`Ver ${product.name}`}
                className="group block"
              >
                <div
                  className="aspect-[3/4] mb-4 overflow-hidden relative"
                  style={{ background: "linear-gradient(135deg, #7A6858, #3E342D)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <CruzDeHierro size={80} color="#B1C7D4" />
                  </div>
                  {product.isDemoData && (
                    <span className="absolute top-2 left-2 text-[9px] font-[SpaceGrotesk] tracking-widest uppercase bg-[#849AAD]/70 text-[#1A1410] px-2 py-0.5">
                      Demo
                    </span>
                  )}
                </div>
                <p className="font-archivo text-[#605246] uppercase tracking-tight text-lg group-hover:text-[#5E1C23] transition-colors">
                  {product.name}
                </p>
                <p className="text-sm text-[#849AAD] font-[SpaceGrotesk] mt-1">
                  ${product.price.toLocaleString("es-MX")} MXN
                </p>
              </Link>
            ))}
          </div>


        </div>
      </section>
    </div>
  );
}
