"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ProcessSlide {
  id: string;
  title: string;
  stage: string;
  description: string;
  image: string;
  tag: string;
}

const TALLER_SLIDES: ProcessSlide[] = [
  {
    id: "pieles",
    stage: "01 / 05",
    tag: "Selección de Piel",
    title: "Pieles 100% Genuinas",
    description:
      "Selección rigurosa de flor de res, gamuzas finas y pieles exóticas. Sin sintéticos ni materiales compuestos: solo textura auténtica con resistencia probada.",
    image: "/campaigns/leather-detail.jpg",
  },
  {
    id: "horma",
    stage: "02 / 05",
    tag: "Modelado & Horma",
    title: "Horma Oval Leonesa",
    description:
      "La silueta insignia del Botín Sinaloa y la bota BRAVÍO nace de hormas ovaladas perfeccionadas en León, Guanajuato para garantizar calce ergonómico y elegancia sobria.",
    image: "/products/sinaloa/sinaloa-gamuza-arena-detail.jpg",
  },
  {
    id: "goodyear",
    stage: "03 / 05",
    tag: "Construcción",
    title: "Costura Goodyear Welt",
    description:
      "La técnica más respetada de la zapatería internacional. La vira cose el corte y la planta a la suela de cuero, permitiendo que la bota sea resolable y dure toda una vida.",
    image: "/products/sinaloa/sinaloa-gamuza-miel-pair.jpg",
  },
  {
    id: "suela",
    stage: "04 / 05",
    tag: "Artesanía de Suela",
    title: "Tacón & Suela 100% Cuero",
    description:
      "Tacón apilado de 4 cm en láminas de cuero legítimo con tapa de hule para tracción. Cerco natural entintado o pulido artesanalmente al canto.",
    image: "/products/sinaloa/sinaloa-gamuza-arena-pair.jpg",
  },
  {
    id: "acabado",
    stage: "05 / 05",
    tag: "Control de Calidad",
    title: "Inspección & Calce Final",
    description:
      "Cada bota se cepilla, hidrata y revisa en nuestro taller de León antes de empacarse como un amuleto y una declaración de estilo.",
    image: "/campaigns/origen-ai.jpg",
  },
];

export default function TallerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TALLER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TALLER_SLIDES.length) % TALLER_SLIDES.length);
  };

  // Auto-play suave (pausable al interactuar)
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const current = TALLER_SLIDES[currentIndex];

  return (
    <div
      className="w-full relative mt-16 lg:mt-24 pt-16 border-t border-[#3E342D]/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Carrusel de procesos del Taller BRAVÍO"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#5E1C23]" />
            <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
              Taller BRAVÍO · Procesos & Oficio
            </p>
          </div>
          <h3 className="font-[ArchivoBlack] text-2xl md:text-4xl text-[#B1C7D4] uppercase tracking-tight">
            DE LA PIEL AL PASO FIRME.
          </h3>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <span className="font-[SpaceGrotesk] text-xs text-[#849AAD] tracking-widest mr-2">
            {current.stage}
          </span>
          <button
            onClick={prevSlide}
            aria-label="Diapositiva anterior"
            className="w-11 h-11 rounded-full border border-[#3E342D] text-[#B1C7D4] hover:border-[#5E1C23] hover:text-white hover:bg-[#5E1C23]/20 flex items-center justify-center transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            aria-label="Siguiente diapositiva"
            className="w-11 h-11 rounded-full border border-[#3E342D] text-[#B1C7D4] hover:border-[#5E1C23] hover:text-white hover:bg-[#5E1C23]/20 flex items-center justify-center transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#15110E] border border-[#3E342D] rounded-xl overflow-hidden p-6 md:p-10 shadow-2xl">
        
        {/* Photo Container — Anclada y con aspecto de estudio */}
        <div className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/10] rounded-lg overflow-hidden bg-[#0A0806] border border-[#3E342D]/60">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover transition-all duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15110E] via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 left-4 z-10">
            <span className="font-[SpaceGrotesk] text-[9px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded bg-[#5E1C23] text-[#F5F0EA]">
              {current.tag}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 z-10">
            <p className="font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase text-[#B1C7D4]/90">
              Hecho en León, Guanajuato
            </p>
          </div>
        </div>

        {/* Content Details */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <span className="font-[SpaceGrotesk] text-xs tracking-[0.25em] uppercase text-[#849AAD] font-semibold">
              Etapa {current.stage}
            </span>
            <h4 className="font-[ArchivoBlack] text-2xl md:text-3xl lg:text-4xl text-[#B1C7D4] uppercase tracking-tight mt-2 mb-4 leading-tight">
              {current.title}
            </h4>
            <p className="font-[SpaceGrotesk] text-sm md:text-base text-[#849AAD] leading-relaxed mb-6">
              {current.description}
            </p>
          </div>

          {/* Dots Indicator */}
          <div className="pt-6 border-t border-[#3E342D]/60 flex items-center gap-2">
            {TALLER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir a etapa ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-[#5E1C23]"
                    : "w-2 bg-[#3E342D] hover:bg-[#849AAD]"
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Mini Thumbnails Strip */}
      <div className="grid grid-cols-5 gap-3 mt-4">
        {TALLER_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`group text-left p-2 rounded border transition-all ${
              currentIndex === idx
                ? "border-[#5E1C23] bg-[#5E1C23]/10"
                : "border-[#3E342D]/50 hover:border-[#849AAD]"
            }`}
          >
            <p className="font-[SpaceGrotesk] text-[9px] tracking-wider uppercase text-[#849AAD] group-hover:text-white truncate">
              {slide.tag}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
