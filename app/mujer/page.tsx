"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Check, Bell } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

const CHAPTERS = [
  {
    num: "01",
    title: "Monterrey",
    tagline: "El camino cambió. El amuleto sigue.",
    description: "Azotea, ciudad y cerro. La silueta contemporánea se alza frente a la inmensidad industrial del norte mexicano.",
    image: "/brand/image1.png",
  },
  {
    num: "02",
    title: "Ciudad de noche",
    tagline: "Hay pasos que cambian todo.",
    description: "Movimiento, asfalto mojado y destellos urbanos. La bota como protagonista implacable de la vida nocturna.",
    image: "/brand/image2.png",
  },
  {
    num: "03",
    title: "Puerta azul",
    tagline: "El oeste aparece donde no lo esperas.",
    description: "Arquitectura mexicana depurada. El contraste entre la geometría limpia y la textura orgánica de la piel genuina.",
    image: "/brand/image15.png",
  },
  {
    num: "04",
    title: "Muro y sombra",
    tagline: "El origen del amuleto está en ti.",
    description: "Luz cenital y carácter sobrio. La Cruz de Hierro como símbolo de continuidad entre herencia y presente.",
    image: "/brand/image10.png",
  },
  {
    num: "05",
    title: "Umbral de concreto",
    tagline: "Entra en tu propia historia.",
    description: "El paso decisivo hacia nuevos espacios sin perder la raíz ni el arraigo a la tierra.",
    image: "/brand/image18-22.png",
  },
];

export default function MujerPage() {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#605246] pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] uppercase tracking-widest text-[#849AAD] hover:text-[#605246] transition-colors font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Hero Editorial */}
      <div className="relative overflow-hidden border border-[#B1C7D4]/50 mb-16 p-8 md:p-16 bg-[#605246] flex flex-col justify-end min-h-[460px] shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            src="/brand/image1.png"
            alt="BRAVÍO Mujer 2026"
            className="w-full h-full object-cover object-center opacity-45 filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#605246] via-[#605246]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#B1C7D4]" />
            <span className="text-[11px] font-[SpaceGrotesk] font-bold tracking-widest text-[#B1C7D4] uppercase">
              Campaña Visual 2026 • Dirección Creativa
            </span>
          </div>

          <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-4">
            EL CAMINO CAMBIÓ. EL AMULETO SIGUE.
          </h1>

          <p className="text-sm sm:text-base text-[#B1C7D4] leading-relaxed max-w-2xl mb-8 font-[SpaceGrotesk]">
            La interpretación femenina del universo BRAVÍO. No es un disfraz; es una silueta contemporánea de presencia indomable concebida para la mujer que camina con carácter.
          </p>

          <a
            href="#manifiesto"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase transition-colors shadow-sm"
          >
            <span>Explorar los 5 Territorios Narrativos</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Manifesto Section */}
      <section id="manifiesto" className="py-16 text-center max-w-4xl mx-auto border-b border-[#B1C7D4]/40 mb-20">
        <CruzDeHierro size={36} color="#5E1C23" className="mx-auto mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
          EL AMULETO Y EL ORIGEN
        </span>
        <blockquote className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide mt-3 leading-snug">
          “La Cruz de Hierro no es adorno. Es el vínculo silencioso entre la sabiduría del artesano de León y la mujer que camina sin pedir permiso.”
        </blockquote>
      </section>

      {/* 5 Narrative Territories */}
      <div className="space-y-24 mb-24">
        {CHAPTERS.map((ch, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={ch.num}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Media Block */}
              <div
                className={`lg:col-span-7 relative aspect-[4/3] overflow-hidden border border-[#B1C7D4]/50 shadow-md ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <img
                  src={ch.image}
                  alt={ch.title}
                  className="w-full h-full object-cover filter contrast-105"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-[SpaceGrotesk] font-bold px-3 py-1 text-[#5E1C23] border border-[#B1C7D4]/60">
                  TERRITORIO {ch.num}
                </span>
              </div>

              {/* Text Block */}
              <div
                className={`lg:col-span-5 space-y-4 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold block">
                  CAPÍTULO {ch.num}
                </span>
                <h2 className="font-archivo text-3xl sm:text-4xl text-[#605246] uppercase">
                  {ch.title}
                </h2>
                <h3 className="text-xs font-[SpaceGrotesk] uppercase tracking-wider text-[#5E1C23] font-bold">
                  {ch.tagline}
                </h3>
                <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed">
                  {ch.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Commercial Compliance Banner (Notice of Launch) */}
      <div className="bg-[#F4F7F9] border border-[#B1C7D4]/60 p-10 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
        <Bell className="w-8 h-8 text-[#5E1C23] mx-auto" />
        <h3 className="font-archivo text-xl uppercase tracking-wider text-[#605246]">
          Lanzamiento Comercial Exclusivo 2026
        </h3>
        <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] max-w-md mx-auto leading-relaxed">
          Las piezas de calzado femenino se encuentran en fase de producción artesanal en León, Guanajuato. Regístrate para ser la primera en adquirir la colección con acceso prioritario.
        </p>

        {registered ? (
          <div className="inline-flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-500/30 px-4 py-2 font-bold font-[SpaceGrotesk]">
            <Check className="w-4 h-4" />
            <span>Te has registrado exitosamente. Te notificaremos al liberar la colección.</span>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="flex gap-2 max-w-md mx-auto pt-2 font-[SpaceGrotesk]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico..."
              className="flex-1 bg-white border border-[#B1C7D4] px-3.5 py-2.5 text-xs text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-bold tracking-widest uppercase transition-colors shadow-xs"
            >
              Registrarme
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
