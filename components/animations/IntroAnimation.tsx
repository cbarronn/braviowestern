"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BravioLogoApilado, CruzDeHierro } from "@/components/ui/BravioLogo";
import { useAudio } from "@/lib/audio/AudioContext";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "cruz" | "done">("logo");
  const { startSound, isPlaying } = useAudio();

  // Intento inicial en segundo plano y ciclo de animación
  useEffect(() => {
    startSound();
    const t1 = setTimeout(() => setPhase("cruz"), 2600);
    const t2 = setTimeout(() => {
      // Si el usuario no ha tocado nada tras 5.5s, avanzar
      setPhase("done");
      onComplete();
    }, 5500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete, startSound]);

  const handleEnter = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    startSound();
    setPhase("done");
    onComplete();
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => handleEnter()}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#B1C7D4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.75rem",
            cursor: "pointer",
          }}
          role="status"
          aria-label="Bienvenido a BRAVÍO"
        >
          {/* Background texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              pointerEvents: "none",
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, #605246 40px, #605246 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, #605246 40px, #605246 41px)`,
            }}
          />

          {/* Logo / Cruz centrados */}
          <AnimatePresence mode="wait">
            {phase === "logo" && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.88, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.08, y: -15 }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                style={{ zIndex: 1 }}
              >
                <BravioLogoApilado variant="principal" width={320} height={263} />
              </motion.div>
            )}
            {phase === "cruz" && (
              <motion.div
                key="cruz"
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                style={{ zIndex: 1 }}
              >
                <CruzDeHierro size={140} color="#5E1C23" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "SpaceGrotesk, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.22em",
              lineHeight: 1.6,
              textTransform: "uppercase",
              color: "#3E342D",
              zIndex: 1,
              marginTop: "2rem",
            }}
          >
            Western para la vida actual
          </motion.p>

          {/* Botón Central Inmersivo + Instrucción con amplio respiro */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.25rem",
              marginTop: "1.75rem",
              zIndex: 2,
            }}
          >
            {/* Botón Principal Amplio y Limpio */}
            <button
              type="button"
              onClick={handleEnter}
              className="group relative inline-flex items-center justify-center gap-4 sm:gap-5 px-9 py-4 sm:px-11 sm:py-4.5 rounded-full bg-[#1A1410] text-[#F5F0EA] border border-[#5E1C23] hover:bg-[#5E1C23] hover:border-[#F5F0EA]/40 transition-all duration-300 shadow-2xl hover:scale-105 cursor-pointer"
            >
              {/* Animated Equalizer Icon — shrink-0 para nunca encimarse */}
              <span className="flex items-end gap-[3px] h-3.5 w-3.5 shrink-0" aria-hidden="true">
                <span className="w-[2px] bg-[#B1C7D4] rounded-full animate-eq-1 h-3" />
                <span className="w-[2px] bg-[#B1C7D4] rounded-full animate-eq-2 h-2" />
                <span className="w-[2px] bg-[#B1C7D4] rounded-full animate-eq-3 h-3.5" />
              </span>

              <span className="font-[SpaceGrotesk] text-[11px] sm:text-xs tracking-[0.16em] uppercase font-bold text-[#F5F0EA] whitespace-nowrap">
                Entrar a la experiencia
              </span>

              <span className="font-[ArchivoBlack] text-xs text-[#B1C7D4] shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                ✦
              </span>
            </button>

            {/* Texto de Toque Libre */}
            <p
              style={{
                fontFamily: "SpaceGrotesk, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                lineHeight: 1.6,
                textTransform: "uppercase",
                color: "#3E342D",
                opacity: 0.8,
              }}
            >
              O toca en cualquier parte para iniciar con audio
            </p>
          </motion.div>

          {/* Saltar — discreto abajo */}
          <button
            type="button"
            onClick={handleEnter}
            style={{
              position: "absolute",
              bottom: "3rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "SpaceGrotesk, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#3E342D",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              opacity: 0.75,
              zIndex: 2,
              padding: "0.5rem 1rem",
            }}
            aria-label="Saltar introducción"
          >
            Saltar ↗
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
