"use client";

import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/data/products";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function HombrePage() {
  const productosHombre = getProductsByCategory("hombre");

  return (
    <div className="pt-[72px] bg-white text-[#605246]">
      {/* Hero Caballero */}
      <section
        className="relative min-h-[75vh] overflow-hidden flex items-end bg-[#605246]"
        aria-labelledby="hombre-hero-heading"
      >
        <Image
          src="/campaigns/hombre-hero.jpg"
          alt="BRAVÍO Hombre Hero"
          fill
          priority
          className="object-cover object-bottom opacity-50"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(96,82,70,0.95) 0%, rgba(96,82,70,0.6) 45%, rgba(96,82,70,0.3) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]" aria-hidden="true">
          <CruzDeHierro size={700} color="#B1C7D4" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 pb-20 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#5E1C23]" />
            <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#B1C7D4]">
              Línea Caballero · León, Guanajuato
            </p>
          </div>

          <h1
            id="hombre-hero-heading"
            className="font-[ArchivoBlack] text-white uppercase"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 7rem)",
              lineHeight: "1.08",
              letterSpacing: "-0.015em",
            }}
          >
            BOTÍN<br />SINALOA.
          </h1>

          <p className="mt-6 font-[SpaceGrotesk] text-base md:text-lg text-[#B1C7D4] max-w-xl leading-relaxed">
            El modelo insignia para caballero. Manufactura artesanal leonesa, horma ovalada y costura Goodyear Welt 360° sobre 100% cuero genuino.
          </p>

          {/* Quick Specs */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-[SpaceGrotesk] text-[#B1C7D4]">
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
              ✦ Horma: Oval
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
              ✦ Tacón: 4 cm 100% Cuero
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
              ✦ Tubo: 25 cm
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
              ✦ Suela: 100% Cuero
            </span>
          </div>
        </div>
      </section>

      {/* CATÁLOGO CLARO — FONDOS BLANCOS LIMPIOS */}
      <section
        className="w-full relative bg-white py-20"
        aria-labelledby="hombre-catalogo-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

          <div className="mb-12">
            <span className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
              Catálogo Oficial Caballero
            </span>
            <h2
              id="hombre-catalogo-heading"
              className="font-[ArchivoBlack] text-[#605246] uppercase text-3xl md:text-5xl tracking-tight leading-[1.12] mt-2"
            >
              MODELOS DISPONIBLES
            </h2>
            <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] mt-3 max-w-xl">
              Fotografías oficiales de estudio en fondo blanco. Cada par está confeccionado en flor de res seleccionada con forro y suela de cuero natural.
            </p>
          </div>

          {/* Grid de 3 cuadros de ancho — 100% Limpio en Fondo Blanco */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {productosHombre.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="group flex flex-col bg-white rounded-xl border border-[#B1C7D4]/50 overflow-hidden hover:border-[#5E1C23] hover:shadow-xl transition-all duration-300"
              >
                {/* Foto limpia en fondo blanco puro */}
                <div className="relative w-full aspect-square bg-white flex items-center justify-center p-6 border-b border-[#B1C7D4]/30">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Info debajo de la foto */}
                <div className="p-7 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase font-bold text-[#5E1C23]">
                        Gamuza de Res
                      </span>
                      {product.sku && (
                        <span className="font-[SpaceGrotesk] text-[10px] tracking-wider uppercase text-[#849AAD]">
                          {product.sku}
                        </span>
                      )}
                    </div>

                    <h3 className="font-[ArchivoBlack] text-[#605246] text-xl uppercase leading-tight mb-2 group-hover:text-[#5E1C23] transition-colors">
                      {product.name}
                    </h3>

                    <p className="font-[SpaceGrotesk] text-xs text-[#849AAD] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <p className="font-[SpaceGrotesk] text-[11px] text-[#849AAD] tracking-wider uppercase">
                      Goodyear Welt · Horma Oval · Tacón 4 cm
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#B1C7D4]/30 flex items-center justify-between">
                    <div>
                      <span className="font-[ArchivoBlack] text-[#5E1C23] text-xl">
                        ${product.price.toLocaleString("es-MX")}
                      </span>
                      <span className="font-[SpaceGrotesk] text-xs text-[#849AAD] ml-1.5 font-medium">
                        MXN
                      </span>
                    </div>

                    <span className="font-[SpaceGrotesk] text-xs tracking-[0.2em] uppercase font-bold text-[#5E1C23] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
                      Ver Ficha ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tabla de 12 Variables */}
          <div className="bg-[#F4F7F9] rounded-2xl border border-[#B1C7D4]/50 p-8 md:p-12 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
                Catálogo de Pieles
              </span>
              <h3 className="font-[ArchivoBlack] text-[#605246] text-2xl md:text-3xl uppercase tracking-tight mt-1 mb-3">
                12 VARIABLES DE BOTÍN SINALOA
              </h3>
              <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] leading-relaxed">
                Cada acabado está disponible para pedido. Las fotos de las variantes restantes se incorporarán tras las sesiones fotográficas en taller.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {SINALOA_LEATHER_VARIABLES.map((v) => (
                <div
                  key={v.sku}
                  className={`p-4 rounded-lg border transition-all ${
                    v.ready
                      ? "bg-white border-[#5E1C23]/40 shadow-xs"
                      : "bg-white/60 border-[#B1C7D4]/40 opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-[SpaceGrotesk] text-[9px] tracking-wider uppercase text-[#849AAD] font-bold">
                      {v.type}
                    </span>
                    {v.ready && (
                      <span className="w-2 h-2 rounded-full bg-[#5E1C23]" title="Disponible con fotos" />
                    )}
                  </div>
                  <p className="font-[ArchivoBlack] text-xs text-[#605246] uppercase truncate">
                    {v.name}
                  </p>
                  <p className="font-[SpaceGrotesk] text-[10px] text-[#849AAD] mt-1 font-bold">
                    {v.ready ? "Disponible en catálogo" : "En confección"}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

const SINALOA_LEATHER_VARIABLES = [
  { name: "Gamuza Sand", sku: "BS-GAM-SND", type: "Gamuza", ready: true },
  { name: "Gamuza Tabaco", sku: "BS-GAM-TAB", type: "Gamuza", ready: true },
  { name: "Gamuza Chocolate", sku: "BS-GAM-CHO", type: "Gamuza", ready: true },
  { name: "Gamuza Carbón", sku: "BS-GAM-CRB", type: "Gamuza", ready: true },
  { name: "Pull-Up Miel", sku: "BS-PUP-MIE", type: "Pull-Up", ready: false },
  { name: "Pull-Up Nogal", sku: "BS-PUP-NOG", type: "Pull-Up", ready: false },
  { name: "Pull-Up Café Graso", sku: "BS-PUP-CFG", type: "Pull-Up", ready: false },
  { name: "Pull-Up Negro", sku: "BS-PUP-NEG", type: "Pull-Up", ready: false },
  { name: "Flor Entera Brandy", sku: "BS-FLR-BRN", type: "Flor Entera", ready: false },
  { name: "Flor Entera Habana", sku: "BS-FLR-HAB", type: "Flor Entera", ready: false },
  { name: "Flor Entera Tinto", sku: "BS-FLR-TIN", type: "Flor Entera", ready: false },
  { name: "Flor Entera Negro Mate", sku: "BS-FLR-NEG", type: "Flor Entera", ready: false },
];
