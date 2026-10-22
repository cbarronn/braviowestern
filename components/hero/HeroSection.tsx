"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { fadeSlideUp, parallax, ScrollTrigger } from "@/lib/animations/gsap";

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
    if (bgRef.current) {
      parallax(bgRef.current, 0.3, { trigger: container.current });
    }

    // Fade up content
    if (contentRef.current) {
      const elements = contentRef.current.children;
      fadeSlideUp(elements, { stagger: 0.1, delay: 0.2 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: container });

  return (
    <section
      ref={container}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
      aria-label="Hero BRAVÍO"
    >
      {/* Background image */}
      <Image
        ref={bgRef}
        src="/campaigns/hero-ai.jpg"
        alt="Botas BRAVÍO"
        fill
        priority
        className="object-cover object-bottom scale-110"
        sizes="100vw"
      />

      {/* Dark gradient overlay — bottom to top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(15,12,9,0.98) 0%, rgba(15,12,9,0.6) 40%, rgba(15,12,9,0.15) 75%, transparent 100%)",
        }}
      />
      {/* Left vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(15,12,9,0.7) 0%, transparent 60%)" }}
      />

      {/* Content Centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div ref={contentRef} className="px-6 md:px-12 max-w-[900px] flex flex-col items-center">
          {/* Eyebrow */}
          <p className="text-[#849AAD] font-[SpaceGrotesk] text-[11px] tracking-[0.25em] uppercase mb-6 invisible">
            <span className="bg-[#0F0C09]/80 px-3 py-1.5 border border-[#5E1C23]/40 rounded-sm">✦ Nueva Colección 2026</span>
          </p>

          {/* Headline con respiro editorial */}
          <h1
            className="font-[ArchivoBlack] text-[#B1C7D4] uppercase leading-[1.08] mb-8 invisible"
            style={{ fontSize: "clamp(3.5rem, 11vw, 8.5rem)", letterSpacing: "0.01em", textShadow: "0px 10px 30px rgba(0,0,0,1)" }}
          >
            BOTAS<br />
            BRAVÍO.
          </h1>

          {/* Sub + CTA */}
          <div className="flex flex-col items-center gap-6 opacity-0">
            <p className="text-[#B1C7D4] font-[SpaceGrotesk] text-sm md:text-base leading-relaxed bg-[#0F0C09]/80 px-5 py-3 border-l-2 border-[#5E1C23] shadow-lg">
              Botas de manufactura artesanal.<br />León, Guanajuato.
            </p>
            <Link
              href="/coleccion"
              id="hero-cta"
              className="inline-flex items-center justify-center gap-3 border border-[#B1C7D4]/40 hover:border-[#5E1C23] hover:bg-[#5E1C23] bg-[#0F0C09]/70 text-[#B1C7D4] hover:text-white px-7 py-3.5 rounded-full transition-all duration-300 font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase font-semibold shadow-xl"
            >
              Explorar Colección
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M7 1l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
