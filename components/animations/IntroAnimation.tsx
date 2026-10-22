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
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "SpaceGrotesk, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#605246",
              zIndex: 1,
            }}
          >
            Western para la vida actual
          </motion.p>

          {/* Botón Central Inmersivo + Instrucción de Toque Libre (Ambas soluciones) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.85rem",
              marginTop: "1rem",
              zIndex: 2,
            }}
          >
            {/* Botón Principal */}
            <button
              type="button"
              onClick={handleEnter}
              className="group relative px-7 py-3 rounded-full bg-[#1A1410] text-[#F5F0EA] border border-[#5E1C23]/60 hover:bg-[#5E1C23] hover:border-[#F5F0EA]/40 transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-3 cursor-pointer"
            >
              {/* Animated Equalizer Icon */}
              <span className="flex items-end gap-[2px] h-3 w-3" aria-hidden="true">
                <span className="w-[2px] bg-[#B1C7D4] rounded-full animate-eq-1 h-3" />
                <span className="w-[2px] bg-[#B1C7D4] rounded-full animate-eq-2 h-2" />
                <span className="w-[2px] bg-[#B1C7D4] rounded-full animate-eq-3 h-3.5" />
              </span>

              <span className="font-[SpaceGrotesk] text-[11px] tracking-[0.25em] uppercase font-bold">
                Entrar a la experiencia
              </span>

              <span className="font-[ArchivoBlack] text-xs text-[#B1C7D4] group-hover:translate-x-0.5 transition-transform">
                ✦
              </span>
            </button>

            {/* Texto de Toque Libre */}
            <p
              style={{
                fontFamily: "SpaceGrotesk, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#605246",
                opacity: 0.75,
              }}
            >
              O toca en cualquier parte para iniciar
            </p>
          </motion.div>

          {/* Saltar — discreto abajo */}
          <button
            type="button"
            onClick={handleEnter}
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "SpaceGrotesk, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#605246",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              opacity: 0.7,
              zIndex: 2,
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
