"use client";

import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/hero/HeroSection";
import ManifestoSection from "@/components/manifesto/ManifestoSection";
import UniverseSection from "@/components/campaigns/UniverseSection";
import ProductShowcase from "@/components/product/ProductShowcase";
import OrigenSection from "@/components/campaigns/OrigenSection";
import VideoSection from "@/components/campaigns/VideoSection";

const IntroAnimation = dynamic(
  () => import("@/components/animations/IntroAnimation"),
  { ssr: false }
);

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Para revisión: Mostramos el intro en cada carga.
    // (En producción podrías volver a activar el sessionStorage)
    setShowIntro(true);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#5E1C23] text-[#B1C7D4] px-4 py-2 z-[999] text-sm font-[SpaceGrotesk]"
      >
        Ir al contenido principal
      </a>

      {/* Cinematic intro */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Page sections — fade in after intro */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* SEQ 01 — Hero */}
        <div className="relative z-10">
          <HeroSection />
        </div>

        {/* SEQ 01.5 — Video Campaña */}
        <div className="relative z-10">
          <VideoSection />
        </div>

        {/* SEQ 02 — Manifiesto */}
        <div className="relative z-20">
          <ManifestoSection />
        </div>

        {/* SEQ 03 — El Universo (Mujer / Hombre) */}
        <div className="relative z-20">
          <UniverseSection />
        </div>

        {/* SEQ 04 — Productos */}
        <div className="relative z-20">
          <ProductShowcase />
        </div>

        {/* SEQ 05 — Hecho en León */}
        <div className="relative z-20">
          <OrigenSection />
        </div>
      </div>
    </>
  );
}
