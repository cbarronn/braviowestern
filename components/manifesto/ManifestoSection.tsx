"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealText, fadeSlideUp } from "@/lib/animations/gsap";

export default function ManifestoSection() {
  const container = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Eyebrow
    fadeSlideUp(eyebrowRef.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
    });

    // 2. Main paragraph
    if (textRef.current) {
      revealText(textRef.current, {
        trigger: textRef.current,
        start: "top 85%",
      });
    }

    // 3. Big quote
    if (quoteRef.current) {
      revealText(quoteRef.current, {
        trigger: quoteRef.current,
        start: "top 85%",
      });
    }

    // 4. Footer line
    fadeSlideUp(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
      },
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      id="manifiesto"
      className="w-full"
      style={{ background: "#1A1410" }}
      aria-labelledby="manifesto-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-40">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-20 opacity-0">
          <div style={{ width: "32px", height: "1px", background: "#5E1C23" }} />
          <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.35em] uppercase" style={{ color: "#5E1C23" }}>
            Manifiesto
          </p>
        </div>

        {/* Body */}
        <p
          ref={textRef}
          id="manifesto-heading"
          className="font-[SpaceGrotesk] leading-loose mb-40 max-w-2xl"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)", color: "#849AAD" }}
        >
          BRAVÍO no es disfraz, no es nostalgia, no es teatro. Es la convicción de los que saben quiénes son y caminan en consecuencia. Una bota hecha en León, Guanajuato. Un amuleto. Una declaración.
        </p>

        {/* Big quote */}
        <blockquote
          ref={quoteRef}
          className="font-[ArchivoBlack] text-[#B1C7D4] uppercase"
          style={{
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          &ldquo;El western no espera al desierto. Aparece donde tú apareces.&rdquo;
        </blockquote>

        {/* Divider + footer line */}
        <div
          ref={footerRef}
          className="mt-36 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-0"
          style={{ borderTop: "1px solid #3E342D" }}
        >
          <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase" style={{ color: "#849AAD" }}>
            León, Guanajuato · Hecho en México
          </p>
          <p className="font-[ArchivoBlack] text-[11px] tracking-[0.3em] uppercase" style={{ color: "#B1C7D4" }}>
            BRAVÍO ✦
          </p>
        </div>
      </div>
    </section>
  );
}
