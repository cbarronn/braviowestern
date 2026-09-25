"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { CruzDeHierro, BravioLogoApilado } from "@/components/ui/BravioLogo";
import { getProductsByCategory } from "@/data/products";

// ── Scene component ────────────────────────────────────
function MujerScene({
  id,
  headline,
  subheadline,
  body,
  bgFrom,
  bgTo,
  textColor,
  accentColor,
  imageSrc,
  children,
  reverse = false,
}: {
  id: string;
  headline: string;
  subheadline?: string;
  body?: string;
  bgFrom: string;
  bgTo: string;
  textColor: string;
  accentColor: string;
  imageSrc?: string;
  children?: React.ReactNode;
  reverse?: boolean;
}) {
  const sceneRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
      if (headRef.current) {
        tl.fromTo(headRef.current,
          { opacity: 0, y: 70, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power4.out" }
        );
      }
      if (subRef.current) {
        tl.fromTo(subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        );
      }
      if (bodyRef.current) {
        tl.fromTo(bodyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.85, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      }
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sceneRef}
      id={id}
      className="relative min-h-screen overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${bgFrom} 0%, ${bgTo} 100%)` }}
      aria-labelledby={`${id}-heading`}
    >
      <div className={`relative z-10 h-full grid grid-cols-1 lg:grid-cols-2 min-h-screen ${reverse ? "lg:[&>*:first-child]:order-last" : ""}`}>

        {/* Visual panel */}
        <div className="relative overflow-hidden min-h-[60vh] lg:min-h-screen" style={{ background: `linear-gradient(160deg, ${bgFrom}, ${bgTo} 80%)` }}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={headline.replace(/\n/g, ' ')}
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
              <CruzDeHierro size={600} color={textColor} />
            </div>
          )}
          {children && (
            <div className="absolute inset-0 flex items-end p-10">
              {children}
            </div>
          )}
        </div>

        {/* Text panel */}
        <div
          className="flex flex-col justify-center p-10 md:p-16 lg:p-20"
          style={{ color: textColor }}
        >
          <h2
            ref={headRef}
            id={`${id}-heading`}
            className="font-archivo opacity-0"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.015em",
              textTransform: "uppercase",
              color: textColor,
            }}
          >
            {headline.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h2>

          {subheadline && (
            <p
              ref={subRef}
              className="mt-6 font-archivo opacity-0 text-[#5E1C23]"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", lineHeight: "1", textTransform: "uppercase", letterSpacing: "-0.01em" }}
            >
              {subheadline}
            </p>
          )}

          {body && (
            <p
              ref={bodyRef}
              className="mt-6 font-[SpaceGrotesk] opacity-0 max-w-sm leading-loose"
              style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: accentColor }}
            >
              {body}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Main Mujer Page ────────────────────────────────────
export default function MujerPage() {
  const productosMujer = getProductsByCategory("mujer");

  return (
    <div className="pt-[72px]">

      {/* ── ESCENA 01 — EL CAMINO CAMBIÓ ── */}
      <MujerScene
        id="escena-01"
        headline={"EL CAMINO\nCAMBIÓ."}
        subheadline="El amuleto sigue."
        bgFrom="#C8D8E2"
        bgTo="#849AAD"
        textColor="#605246"
        accentColor="#849AAD"
        imageSrc="/campaigns/mujer-escena-01.jpg"
      />

      {/* ── ESCENA 02 — HAY PASOS QUE CAMBIAN TODO ── */}
      <MujerScene
        id="escena-02"
        headline={"HAY PASOS\nQUE CAMBIAN\nTODO."}

        bgFrom="#3E342D"
        bgTo="#1A1410"
        textColor="#B1C7D4"
        accentColor="#849AAD"
        imageSrc="/campaigns/hero-ai.jpg"
        reverse
      />

      {/* ── ESCENA 03 — EL OESTE APARECE ── */}
      <section
        id="escena-03"
        className="relative min-h-screen overflow-hidden"
        style={{ background: "#B1C7D4" }}
        aria-labelledby="escena-03-heading"
      >
        <SceneThree />
      </section>

      {/* ── ESCENA 04 — EL ORIGEN DEL AMULETO ── */}
      <MujerScene
        id="escena-04"
        headline={"EL ORIGEN\nDEL AMULETO\nESTÁ EN TI."}

        bgFrom="#1A1410"
        bgTo="#605246"
        textColor="#B1C7D4"
        accentColor="#849AAD"
        imageSrc="/campaigns/mujer-escena-04.jpg"
      />

      {/* ── ESCENA 05 — ENTRA EN TU PROPIA HISTORIA ── */}
      <section
        id="escena-05"
        className="relative min-h-screen overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #849AAD 0%, #B1C7D4 100%)" }}
        aria-labelledby="escena-05-heading"
      >
        <div className="relative z-10 text-center px-6 py-24">
          <BravioLogoApilado variant="principal" width={160} height={131} className="mx-auto mb-10" />
          <h2
            id="escena-05-heading"
            className="font-archivo text-[#605246]"
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.015em",
              textTransform: "uppercase",
            }}
          >
            ENTRA EN<br />TU PROPIA<br />HISTORIA.
          </h2>

          <div className="mt-10">
            <Link href="/coleccion" className="btn-primary">
              Explorar Colección Mujer
            </Link>
          </div>
        </div>

        {/* Background cruz pattern */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none" aria-hidden="true">
          <CruzDeHierro size={700} color="#605246" />
        </div>
      </section>

      {/* ── Productos Mujer ── */}
      <section
        id="coleccion-mujer"
        className="bravio-section bg-[#B1C7D4]"
        aria-labelledby="coleccion-mujer-heading"
      >
        <div className="bravio-container">
          <p className="text-label-caps text-[#849AAD] mb-4">La colección</p>
          <h2 id="coleccion-mujer-heading" className="font-archivo text-[#605246] mb-12"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "0.95", letterSpacing: "-0.025em", textTransform: "uppercase" }}>
            BRAVÍO Mujer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {productosMujer.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                aria-label={`Ver ${product.name}`}
                className="group block"
              >
                <div className="aspect-[3/4] mb-4 overflow-hidden relative"
                  style={{ background: "linear-gradient(135deg, #C8D8E2, #849AAD)" }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <CruzDeHierro size={80} color="#605246" />
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

// ── Escena 03 — Azul Dominante ──
function SceneThree() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="h-full min-h-screen flex items-center opacity-0">
      <div className="bravio-container py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="escena-03-heading"
              className="font-archivo text-[#605246]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", lineHeight: "0.95", letterSpacing: "-0.015em", textTransform: "uppercase" }}>
              EL OESTE<br />APARECE<br />DONDE NO<br />LO ESPERAS.
            </h2>
          </div>
          {/* Blue panel — Cloudy Valley territory */}
          <div
            className="aspect-[3/4] flex items-center justify-center relative overflow-hidden"
          >
            <Image
              src="/campaigns/mujer-escena-03.jpg"
              alt="Muro azul"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Animated Cruz for Escena 04 ──
function CruzAnimada() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Shadow effect */}
      <div className="absolute opacity-15 blur-xl scale-110">
        <CruzDeHierro size={300} color="#B1C7D4" />
      </div>
      <div className="opacity-20 animate-[crossSpin_20s_linear_infinite]">
        <CruzDeHierro size={300} color="#B1C7D4" />
      </div>
    </div>
  );
}
