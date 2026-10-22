"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ProcessSlide {
  id: string;
  stage: string;
  tag: string;
  title: string;
  description: string;
  image: string;
}

const TALLER_SLIDES: ProcessSlide[] = [
  {
    id: "pieles",
    stage: "01 / 05",
    tag: "Selección de Piel",
    title: "Pieles 100% Genuinas",
    description:
      "Selección rigurosa de flor de res, gamuzas finas y pieles exóticas. Sin materiales sintéticos ni sucedáneos: únicamente textura auténtica, flexibilidad y resistencia probada.",
    image: "/campaigns/leather-detail.jpg",
  },
  {
    id: "horma",
    stage: "02 / 05",
    tag: "Modelado",
    title: "Horma Oval Leonesa",
    description:
      "La silueta insignia del Botín Sinaloa nace de hormas ovaladas tradicionales perfeccionadas en León para garantizar un calce ergonómico y una línea visual limpia.",
    image: "/products/sinaloa/sinaloa-gamuza-arena-detail.jpg",
  },
  {
    id: "goodyear",
    stage: "03 / 05",
    tag: "Construcción",
    title: "Costura Goodyear Welt",
    description:
      "La técnica más respetada de la zapatería tradicional. La vira cose firmemente el corte y la planta a la suela de cuero, permitiendo que la bota sea resolable y dure décadas.",
    image: "/products/sinaloa/sinaloa-gamuza-miel-pair.jpg",
  },
  {
    id: "suela",
    stage: "04 / 05",
    tag: "Suela & Tacón",
    title: "Tacón & Suela 100% Cuero",
    description:
      "Tacón apilado de 4 cm en láminas de cuero legítimo con tapa de hule para tracción. Cerco pulido artesanalmente al canto.",
    image: "/products/sinaloa/sinaloa-gamuza-arena-pair.jpg",
  },
  {
    id: "acabado",
    stage: "05 / 05",
    tag: "Acabado Final",
    title: "Inspección de Taller",
    description:
      "Cada bota se cepilla, hidrata y revisa en nuestro taller de León, Guanajuato antes de salir como una declaración de estilo.",
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

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const current = TALLER_SLIDES[currentIndex];

  return (
    <div
      className="w-full relative mt-24 md:mt-32 pt-16 md:pt-20 border-t border-[#3E342D]/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Procesos del Taller BRAVÍO"
    >
      {/* Encabezado espacioso y sin amontonamiento */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#5E1C23]" />
            <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase font-bold text-[#5E1C23]">
              Taller BRAVÍO · Procesos & Oficio
            </p>
          </div>
          <h3 className="font-[ArchivoBlack] text-3xl md:text-5xl text-[#B1C7D4] uppercase tracking-tight leading-[1.12]">
            DE LA PIEL AL PASO FIRME.
          </h3>
        </div>

        {/* Controles de navegación limpios */}
        <div className="flex items-center gap-3">
          <span className="font-[SpaceGrotesk] text-xs text-[#849AAD] tracking-widest mr-2">
            {current.stage}
          </span>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Proceso anterior"
            className="w-10 h-10 rounded-full border border-[#3E342D] text-[#B1C7D4] hover:border-[#5E1C23] hover:text-white hover:bg-[#5E1C23]/30 flex items-center justify-center transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente proceso"
            className="w-10 h-10 rounded-full border border-[#3E342D] text-[#B1C7D4] hover:border-[#5E1C23] hover:text-white hover:bg-[#5E1C23]/30 flex items-center justify-center transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Tarjeta del Carrusel — 2 columnas sin textos montados sobre la imagen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#15110E] border border-[#3E342D] rounded-2xl p-6 md:p-10 shadow-2xl">
        
        {/* Columna Izquierda: FOTO TOTALMENTE LIMPIA */}
        <div className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden bg-[#0F0C09] border border-[#3E342D]/60">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>

        {/* Columna Derecha: INFORMACIÓN ESPACIADA */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <div className="inline-block px-3 py-1 rounded bg-[#5E1C23]/20 border border-[#5E1C23]/40 text-[#B1C7D4] font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase font-bold mb-4">
              {current.tag}
            </div>

            <h4 className="font-[ArchivoBlack] text-2xl md:text-3xl text-[#B1C7D4] uppercase tracking-tight mb-4 leading-tight">
              {current.title}
            </h4>

            <p className="font-[SpaceGrotesk] text-sm md:text-base text-[#849AAD] leading-relaxed mb-6">
              {current.description}
            </p>

            <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.2em] uppercase text-[#605246]">
              ✦ León, Guanajuato · Hecho a mano
            </p>
          </div>

          {/* Indicadores de diapositiva */}
          <div className="pt-8 mt-6 border-t border-[#3E342D]/60 flex items-center gap-2">
            {TALLER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir a ${slide.title}`}
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
    </div>
  );
}
