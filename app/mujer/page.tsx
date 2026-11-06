"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Check, Bell } from "lucide-react";

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
    <div className="min-h-screen bg-bravio-volcanic text-bravio-bone py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Hero Editorial */}
      <div className="relative rounded-sm overflow-hidden border border-bravio-volcanic-border mb-16 p-8 md:p-16 bg-bravio-volcanic-card flex flex-col justify-end min-h-[460px]">
        <div className="absolute inset-0 z-0">
          <img
            src="/brand/image1.png"
            alt="BRAVÍO Mujer 2026"
            className="w-full h-full object-cover object-center brightness-75 filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bravio-volcanic-card via-bravio-volcanic-card/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-bravio-granate/40 border border-bravio-granate rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-bravio-cloudy" />
            <span className="text-[11px] font-sans tracking-widest text-bravio-cloudy uppercase">
              Campaña Visual 2026 • Dirección Creativa
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-bravio-bone uppercase tracking-tight leading-[0.95] mb-4">
            EL CAMINO CAMBIÓ. EL AMULETO SIGUE.
          </h1>

          <p className="text-sm sm:text-base text-bravio-cloudy font-light leading-relaxed max-w-2xl mb-8">
            La interpretación femenina del universo BRAVÍO. No es un disfraz; es una silueta contemporánea de presencia indomable concebida para la mujer que lidera con determinación.
          </p>

          <a
            href="#manifiesto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-sans tracking-widest uppercase transition-colors"
          >
            <span>Explorar los 5 Territorios Narrativos</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Manifesto Section */}
      <section id="manifiesto" className="py-16 text-center max-w-4xl mx-auto border-b border-bravio-volcanic-border mb-20">
        <div className="w-10 h-10 mx-auto mb-6 text-bravio-granate">
          <svg viewBox="-280 -280 560 560" className="w-full h-full fill-current">
            <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
          </svg>
        </div>
        <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
          EL AMULETO Y EL ORIGEN
        </span>
        <blockquote className="font-display text-2xl sm:text-3xl text-bravio-bone uppercase tracking-wide mt-3 leading-snug">
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
                className={`lg:col-span-7 relative aspect-[4/3] rounded-sm overflow-hidden border border-bravio-volcanic-border shadow-2xl ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <img
                  src={ch.image}
                  alt={ch.title}
                  className="w-full h-full object-cover filter contrast-105"
                />
                <span className="absolute top-4 left-4 bg-bravio-volcanic/90 backdrop-blur-md text-xs font-mono px-3 py-1 text-bravio-gold border border-bravio-volcanic-border">
                  TERRITORIO {ch.num}
                </span>
              </div>

              {/* Text Block */}
              <div
                className={`lg:col-span-5 space-y-4 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans block">
                  CAPÍTULO {ch.num}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-bravio-bone uppercase">
                  {ch.title}
                </h2>
                <h3 className="text-sm font-sans uppercase tracking-wider text-bravio-gold font-medium">
                  {ch.tagline}
                </h3>
                <p className="text-sm text-bravio-cloudy leading-relaxed font-light">
                  {ch.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Commercial Compliance Banner (Notice of Launch) */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border p-10 rounded-sm text-center max-w-2xl mx-auto space-y-4 shadow-2xl">
        <Bell className="w-8 h-8 text-bravio-gold mx-auto" />
        <h3 className="font-display text-xl uppercase tracking-wider text-bravio-bone">
          Lanzamiento Comercial Exclusivo 2026
        </h3>
        <p className="text-xs text-bravio-cloudy max-w-md mx-auto leading-relaxed">
          Las piezas de calzado femenino se encuentran en fase final de producción artesanal en León, Guanajuato. Regístrate para ser la primera en adquirir la colección con acceso prioritario.
        </p>

        {registered ? (
          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded">
            <Check className="w-4 h-4" />
            <span>Te has registrado exitosamente. Te notificaremos al liberar la colección.</span>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="flex gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico..."
              className="flex-1 bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-xs text-bravio-bone focus:outline-none focus:border-bravio-granate"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-sans tracking-widest uppercase transition-colors"
            >
              Registrarme
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
