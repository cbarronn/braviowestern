"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BravioLogoApilado, CruzDeHierro } from "@/components/ui/BravioLogo";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "cruz" | "done">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("cruz"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#B1C7D4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
          role="status"
          aria-label="Cargando BRAVÍO"
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
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{ zIndex: 1 }}
              >
                <BravioLogoApilado variant="principal" width={320} height={263} />
              </motion.div>
            )}
            {phase === "cruz" && (
              <motion.div
                key="cruz"
                initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{ zIndex: 1 }}
              >
                <CruzDeHierro size={80} color="#5E1C23" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === "logo" ? 0.5 : 0 }}
            style={{
              fontFamily: "SpaceGrotesk, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#605246",
              zIndex: 1,
            }}
          >
            Western para la vida actual
          </motion.p>

          {/* Saltar — centrado debajo del logo */}
          <button
            onClick={() => { setPhase("done"); onComplete(); }}
            style={{
              position: "absolute",
              bottom: "3rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "SpaceGrotesk, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#605246",
              background: "transparent",
              border: "none",
              cursor: "pointer",
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
