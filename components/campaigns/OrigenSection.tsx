"use client";

import React from "react";
import Image from "next/image";

const STATS = [
  { value: "León", label: "Capital mundial del calzado" },
  { value: "100%", label: "Piel genuina, sin sintéticos" },
  { value: "Artesanal", label: "Hecho a mano en México" },
];

export default function OrigenSection() {
  return (
    <section
      id="hecho-en-leon"
      className="w-full"
      style={{ background: "#0F0C09" }}
      aria-labelledby="origen-heading"
    >
      {/* Photo banner — boots image, no campaign text */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(260px, 45vw, 520px)" }}>
        <Image
          src="/campaigns/origen-ai.jpg"
          alt="Botas BRAVÍO en León, Guanajuato"
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0F0C09 0%, transparent 50%)" }}
        />
        {/* Caption */}
        <div className="absolute bottom-5 left-6">
          <p className="font-[SpaceGrotesk] text-[9px] tracking-[0.25em] uppercase" style={{ color: "#849AAD" }}>
            Taller de manufactura · León, Gto.
          </p>
        </div>
      </div>

      {/* Text content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-24 md:pt-16 md:pb-36">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-12">
          <div style={{ width: "24px", height: "1px", background: "#5E1C23" }} />
          <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: "#5E1C23" }}>
            Nuestro Origen
          </p>
        </div>

        {/* Heading */}
        <h2
          id="origen-heading"
          className="font-[ArchivoBlack] text-[#B1C7D4] uppercase mb-12"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", lineHeight: 0.95, letterSpacing: "-0.015em" }}
        >
          HECHO<br />EN LEÓN.
        </h2>

        {/* Body */}
        <p
          className="font-[SpaceGrotesk] leading-relaxed max-w-lg mb-24"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)", color: "#849AAD" }}
        >
          León, Guanajuato es la capital mundial del calzado.
          De ahí viene la piel, el oficio y la historia de BRAVÍO.
          No como tendencia — como respuesta a la vida que ya se vive.
        </p>

        <div style={{ borderTop: "1px solid #1A1410" }} className="pt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-12">
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  padding: "2rem 0",
                  borderBottom: i < STATS.length - 1 ? "1px solid #1A1410" : "none",
                }}
                className="sm:border-none sm:py-0"
              >
                <p
                  className="font-[ArchivoBlack] text-[#B1C7D4] uppercase"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </p>
                <p className="font-[SpaceGrotesk] text-sm leading-relaxed" style={{ color: "#849AAD" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
