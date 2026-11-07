"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, FastForward, Sparkles } from "lucide-react";
import { useCommerceStore } from "@/lib/store/commerce-store";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

interface CinematicIntroProps {
  onComplete: () => void;
  allowSkip?: boolean;
}

export default function CinematicIntro({
  onComplete,
  allowSkip = true,
}: CinematicIntroProps) {
  // Sequence Steps:
  // 0: Sound Selection Gate (Entrar con música / En silencio)
  // 1: 0–1.6s La Cruz de Hierro (Onda expansiva, aura azul Tsunami y forjado)
  // 2: 1.6–3.6s Logotipo Oficial BRAVÍO con destello anamórfico azul
  // 3: 3.6–4.8s Manifiesto: "WESTERN PARA LA VIDA ACTUAL" · "ENTRA CON CARÁCTER"
  // 4: 4.8–5.8s Disolución cinemática hacia la tienda
  const [step, setStep] = useState<number>(0);
  const [hasInteractedChoice, setHasInteractedChoice] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const { setPlayingAudio, setInteracted, setMuted } = useCommerceStore();

  const finishIntro = () => {
    try {
      sessionStorage.setItem("bravio_intro_seen", "true");
      if (typeof window !== "undefined" && window.history.replaceState) {
        const url = new URL(window.location.href);
        if (url.searchParams.has("intro")) {
          url.searchParams.delete("intro");
          window.history.replaceState(
            {},
            "",
            url.pathname + (url.search ? url.search : "")
          );
        }
      }
    } catch (e) {}
    onComplete();
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
    }

    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const forceIntro = searchParams.get("intro") === "true";
      if (!forceIntro) {
        const seen = sessionStorage.getItem("bravio_intro_seen");
        if (seen === "true") {
          onComplete();
        }
      }
    }
  }, [onComplete]);

  // Handle sequence timer & progress bar
  useEffect(() => {
    if (!hasInteractedChoice) return;

    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        finishIntro();
      }, 700);
      return () => clearTimeout(t);
    }

    const startTime = Date.now();
    const duration = 5600;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressInterval);
    }, 40);

    const t1 = setTimeout(() => setStep(1), 100);
    const t2 = setTimeout(() => setStep(2), 1600);
    const t3 = setTimeout(() => setStep(3), 3500);
    const t4 = setTimeout(() => setStep(4), 4800);
    const t5 = setTimeout(() => {
      finishIntro();
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [hasInteractedChoice, prefersReducedMotion]);

  const handleStart = (withAudio: boolean) => {
    setInteracted();
    if (withAudio) {
      setMuted(false);
      setPlayingAudio(true);
    } else {
      setMuted(true);
      setPlayingAudio(false);
    }
    setHasInteractedChoice(true);
  };

  const handleSkip = () => {
    finishIntro();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070D14] overflow-hidden select-none"
    >
      {/* =========================================================
          ATMÓSFERA CINEMÁTICA EN AZULES OFICIALES DE MARCA
          (Cloudy Valley #B1C7D4, Tsunami #849AAD, Slate #101B2B)
          Sin video de fondo para evitar logos duplicados o empalmados
      ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Midnight Blue Canvas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, #142334 0%, #0A1420 50%, #050B11 100%)",
          }}
        />

        {/* Ambient Aurora Blue Wave 1 (Cloudy Valley) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
            x: ["-5%", "5%", "-5%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/3 -left-1/4 w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,rgba(177,199,212,0.18)_0%,rgba(132,154,173,0.08)_40%,transparent_75%)] mix-blend-screen"
        />

        {/* Ambient Deep Tsunami Blue Pulse 2 */}
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.2, 0.4, 0.2],
            y: ["-4%", "4%", "-4%"],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/3 -right-1/4 w-[140vw] h-[140vh] bg-[radial-gradient(circle_at_center,rgba(132,154,173,0.22)_0%,rgba(94,28,35,0.12)_45%,transparent_80%)] mix-blend-screen"
        />

        {/* Anamorphic Cyan/Blue Horizontal Flare Streak */}
        <motion.div
          animate={{
            x: ["-120%", "220%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
          className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-[#B1C7D4]/25 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Subtle Fine Grid Texture for Editorial Precision */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #B1C7D4 1px, transparent 1px), linear-gradient(to bottom, #B1C7D4 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-85" />
      </div>

      {/* Top Cinematic Bar with Progress & Skip */}
      {hasInteractedChoice && (
        <div className="absolute top-0 inset-x-0 z-40 p-6 flex items-center justify-between pointer-events-auto">
          {/* Brand Mark with Blue Glow */}
          <div className="flex items-center gap-2.5">
            <CruzDeHierro size={15} color="#B1C7D4" />
            <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] text-[#B1C7D4] uppercase font-bold">
              BRAVÍO EXPERIENCIA
            </span>
          </div>

          {/* Skip Button */}
          {allowSkip && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleSkip}
              className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest text-[#B1C7D4] hover:text-white bg-[#101B2B]/70 hover:bg-[#5E1C23] border border-[#849AAD]/40 hover:border-[#5E1C23] transition-all duration-300 font-[SpaceGrotesk] font-bold backdrop-blur-md shadow-lg"
            >
              <span>SALTAR INTRO</span>
              <FastForward className="w-3.5 h-3.5" />
            </motion.button>
          )}

          {/* Progress Line in Brand Blues */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#849AAD]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#849AAD] via-[#B1C7D4] to-[#5E1C23]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Screen 0: Sound Preference Gate */}
      {!hasInteractedChoice ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 flex flex-col items-center text-center px-6 max-w-lg mx-auto"
        >
          {/* Pulsing Cruz de Hierro with Atmospheric Blue Aura */}
          <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
            {/* Concentric Glow Rings in Cloudy Valley & Tsunami */}
            <motion.div
              animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-[#B1C7D4]/50"
            />
            <motion.div
              animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
              className="absolute inset-0 rounded-full border border-[#849AAD]/30"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 text-[#B1C7D4] filter drop-shadow-[0_0_25px_rgba(177,199,212,0.6)]"
            >
              <svg viewBox="-280 -280 560 560" className="w-full h-full fill-current">
                <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
              </svg>
            </motion.div>
          </div>

          <h2 className="font-archivo text-3xl sm:text-4xl text-white tracking-wider uppercase mb-2">
            BRAVÍO
          </h2>
          <p className="font-[SpaceGrotesk] text-xs sm:text-sm text-[#B1C7D4] tracking-[0.25em] mb-8 uppercase font-bold">
            Western para la vida actual · León, Gto.
          </p>

          {/* Sound Visualizer Bars Preview */}
          <div className="flex items-center gap-1.5 mb-8 h-6">
            {[4, 10, 16, 8, 20, 12, 6, 18, 14, 8].map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: [4, h, 4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-[#849AAD] rounded-full opacity-70"
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full font-[SpaceGrotesk]">
            <button
              onClick={() => handleStart(true)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-3 py-4 px-6 bg-[#5E1C23] hover:bg-[#72232b] text-white text-xs font-bold tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#5E1C23]/30 border border-[#5E1C23] group"
            >
              <Volume2 className="w-4 h-4 text-[#B1C7D4] group-hover:scale-125 transition-transform" />
              <span>ENTRAR CON MÚSICA</span>
            </button>

            <button
              onClick={() => handleStart(false)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-3 py-4 px-6 bg-[#101B2B]/80 hover:bg-[#182A3D] border border-[#849AAD]/40 hover:border-[#B1C7D4] text-[#B1C7D4] hover:text-white text-xs font-bold tracking-[0.2em] transition-all duration-300 backdrop-blur-sm"
            >
              <VolumeX className="w-4 h-4" />
              <span>EN SILENCIO</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* Cinematic Dynamic Sequence (One single clean focal element per step) */
        <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* ETAPA 1: Llegada de La Cruz de Hierro con Aura Azul y Resplandor Granate */}
            {step === 1 && (
              <motion.div
                key="cross-arrival"
                initial={{ opacity: 0, scale: 0.35, rotate: -20 }}
                animate={{ opacity: 1, scale: [0.35, 1.1, 1], rotate: 0 }}
                exit={{ opacity: 0, scale: 1.25, filter: "blur(8px)" }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center"
              >
                {/* Expanding Blue Shockwave Rings */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-[#B1C7D4] pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 3.4, opacity: 0 }}
                  transition={{ duration: 1.6, ease: "easeOut", delay: 0.15 }}
                  className="absolute inset-0 rounded-full border border-[#849AAD] pointer-events-none"
                />

                {/* Forged Iron Cross Icon with Blue Glow */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 text-white relative filter drop-shadow-[0_0_35px_rgba(177,199,212,0.85)]">
                  <svg viewBox="-280 -280 560 560" className="w-full h-full fill-current">
                    <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
                  </svg>
                  {/* Glowing center sapphire spark */}
                  <motion.div
                    animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#B1C7D4] blur-[3px]"
                  />
                </div>

                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-6 font-[SpaceGrotesk] text-[11px] uppercase tracking-[0.3em] text-[#B1C7D4] font-bold"
                >
                  EL AMULETO FORJADO
                </motion.span>
              </motion.div>
            )}

            {/* ETAPA 2: Logotipo Oficial BRAVÍO (Sin video detrás — Limpio y Definido) */}
            {step === 2 && (
              <motion.div
                key="logo-arrival"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center"
              >
                {/* Official Vector Logo in Pure White / Silvery Blue */}
                <div className="relative w-[300px] sm:w-[460px] md:w-[620px] text-white mb-6 filter drop-shadow-[0_10px_35px_rgba(132,154,173,0.5)]">
                  <svg viewBox="-110 -1215 4554 1325" className="w-full h-auto fill-current">
                    <g transform="scale(1,-1)">
                      <g transform="translate(0,0)"><path d="M722 519Q722 392 607 359V355Q738 325 738 183Q738 129 711.5 87.5Q685 46 639.0 23.0Q593 0 538 0H74V688H532Q584 688 627.5 666.5Q671 645 696.5 606.0Q722 567 722 519ZM295 420H447Q469 420 483.5 435.5Q498 451 498 474V484Q498 506 483.0 521.5Q468 537 447 537H295ZM295 160H463Q485 160 499.5 175.5Q514 191 514 214V224Q514 247 499.5 262.5Q485 278 463 278H295Z"/></g>
                      <g transform="translate(778,0)"><path d="M594 288 747 0H499L377 251H295V0H74V688H495Q569 688 621.5 659.5Q674 631 700.5 582.5Q727 534 727 477Q727 414 693.0 363.0Q659 312 594 288ZM440 531H295V404H440Q466 404 484.0 422.5Q502 441 502 468Q502 495 484.0 513.0Q466 531 440 531Z"/></g>
                      <g transform="translate(1556,0)"><path d="M535 0 506 97H265L236 0H10L261 688H518L769 0ZM311 251H460L388 496H384Z"/></g>
                      <g transform="translate(2334,0)"><path d="M261 0 17 688H253L391 228H395L534 688H760L517 0Z"/></g>
                      <g transform="translate(3112,0)"><path d="M84 0V688H305V0Z"/></g>
                      <g transform="translate(3501,0)"><path d="M788 344Q788 170 691.0 79.0Q594 -12 416 -12Q238 -12 141.5 78.5Q45 169 45 344Q45 519 141.5 609.5Q238 700 416 700Q594 700 691.0 609.0Q788 518 788 344ZM271 376V312Q271 239 308.0 196.0Q345 153 416 153Q487 153 524.5 196.0Q562 239 562 312V376Q562 449 524.5 492.0Q487 535 416 535Q345 535 308.0 492.0Q271 449 271 376Z"/></g>
                      <g transform="translate(3306.5,940)"><path d="M -46.2 -46.2 L 46.2 -46.2 L 85.8 -165 L -85.8 -165 Z M -46.2 46.2 L 46.2 46.2 L 85.8 165 L -85.8 165 Z M -46.2 -46.2 L -46.2 46.2 L -165 85.8 L -165 -85.8 Z M 46.2 -46.2 L 46.2 46.2 L 165 85.8 L 165 -85.8 Z M -46.2 -46.2 L 46.2 -46.2 L 46.2 46.2 L -46.2 46.2 Z"/></g>
                    </g>
                  </svg>

                  {/* Horizontal Blue Light Ray Shimmer across the logo */}
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{ duration: 1.3, ease: "easeInOut", delay: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B1C7D4]/60 to-transparent skew-x-12 pointer-events-none"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex items-center gap-3 text-xs font-[SpaceGrotesk] uppercase tracking-[0.25em] text-[#B1C7D4]"
                >
                  <span className="w-8 h-[1px] bg-[#849AAD]" />
                  <span>Construcción Tradicional · León Gto</span>
                  <span className="w-8 h-[1px] bg-[#849AAD]" />
                </motion.div>
              </motion.div>
            )}

            {/* ETAPA 3: Frase de Manifiesto en Expansión y Contraste Azul */}
            {step === 3 && (
              <motion.div
                key="phrase-reveal"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <motion.h2
                  initial={{ letterSpacing: "0.15em", filter: "blur(6px)" }}
                  animate={{ letterSpacing: "0.25em", filter: "blur(0px)" }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="font-archivo text-3xl sm:text-5xl md:text-6xl text-white uppercase leading-none tracking-widest drop-shadow-[0_6px_35px_rgba(0,0,0,0.9)]"
                >
                  WESTERN PARA LA VIDA ACTUAL.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="font-[SpaceGrotesk] text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B1C7D4] font-bold"
                >
                  Entra con carácter
                </motion.p>
              </motion.div>
            )}

            {/* ETAPA 4: Transición Final Hacia la Tienda */}
            {step === 4 && (
              <motion.div
                key="enter-store"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 text-[#B1C7D4] filter drop-shadow-[0_0_20px_#B1C7D4]">
                  <CruzDeHierro size={48} color="#B1C7D4" />
                </div>
                <span className="font-archivo text-xs sm:text-sm uppercase tracking-[0.3em] text-white">
                  INGRESANDO A BRAVÍO...
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
