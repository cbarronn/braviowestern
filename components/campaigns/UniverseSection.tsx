"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function UniverseSection() {
  return (
    <section
      id="universo"
      className="w-full"
      style={{ background: "#B1C7D4", padding: "clamp(4rem, 8vw, 7rem) 0" }}
      aria-labelledby="universe-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "#3E342D" }}>
              La colección
            </p>
            <h2
              id="universe-heading"
              className="font-[ArchivoBlack] uppercase"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
                color: "#605246",
              }}
            >
              EL UNIVERSO<br />BRAVÍO.
            </h2>
          </div>
          <Link
            href="/coleccion"
            className="hidden md:flex items-center gap-2 font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase transition-colors hover:opacity-70"
            style={{ color: "#605246" }}
          >
            Ver todo
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 7h12M7 1l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Two panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

          {/* Mujer */}
          <Link href="/mujer" id="universe-mujer-link" className="group block relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/campaigns/mujer-escena-01.jpg"
              alt="BRAVÍO Mujer"
              fill
              className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Full overlay to hide printed text — gradient from bottom */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.4) 100%)" }}
            />
            <div className="absolute inset-0 bottom-0 flex flex-col justify-end p-6 md:p-10">
              <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#FFFFFF", opacity: 0.7 }}>
                Colección 2026
              </p>
              <h3
                className="font-[ArchivoBlack] uppercase mb-4"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", lineHeight: 0.9, letterSpacing: "-0.025em", color: "#B1C7D4" }}
              >
                BRAVÍO<br />MUJER.
              </h3>
              <span className="inline-flex items-center gap-2 font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase transition-colors group-hover:text-[#5E1C23]" style={{ color: "#FFFFFF" }}>
                Explorar
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M7 1l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Hombre */}
          <Link href="/hombre" id="universe-hombre-link" className="group block relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/campaigns/hombre-hero.jpg"
              alt="BRAVÍO Hombre"
              fill
              className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Full overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.4) 100%)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#FFFFFF", opacity: 0.7 }}>
                Colección 2026
              </p>
              <h3
                className="font-[ArchivoBlack] uppercase mb-4"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", lineHeight: 0.9, letterSpacing: "-0.025em", color: "#B1C7D4" }}
              >
                BRAVÍO<br />HOMBRE.
              </h3>
              <span className="inline-flex items-center gap-2 font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase transition-colors group-hover:text-[#5E1C23]" style={{ color: "#FFFFFF" }}>
                Explorar
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M7 1l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile ver todo */}
        <div className="mt-8 flex md:hidden justify-center">
          <Link
            href="/coleccion"
            className="inline-flex items-center gap-2 font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
            style={{ color: "#605246" }}
          >
            Ver toda la colección
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 7h12M7 1l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
