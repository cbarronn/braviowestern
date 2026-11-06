"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, FastForward } from "lucide-react";
import { useCommerceStore } from "@/lib/store/commerce-store";

interface CinematicIntroProps {
  onComplete: () => void;
  allowSkip?: boolean;
}

export default function CinematicIntro({ onComplete, allowSkip = true }: CinematicIntroProps) {
  // Steps: 
  // 0: Choice gate (if not interacted) / 0-1s: Background light motion
  // 1: 1-2s Iron Cross reveal
  // 2: 2-4s BRAVÍO Logo reveal
  // 3: 4-5s Headline "WESTERN PARA LA VIDA ACTUAL."
  // 4: 5-6s Transition to storefront
  const [step, setStep] = useState<number>(0);
  const [hasInteractedChoice, setHasInteractedChoice] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const { setPlayingAudio, setInteracted, setMuted } = useCommerceStore();

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
    }

    // Auto complete if already seen in this session
    const seen = sessionStorage.getItem("bravio_intro_seen");
    if (seen === "true") {
      onComplete();
    }
  }, [onComplete]);

  // Handle sequence timer once user enters
  useEffect(() => {
    if (!hasInteractedChoice) return;

    if (prefersReducedMotion) {
      sessionStorage.setItem("bravio_intro_seen", "true");
      const t = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(t);
    }

    // 0-1s: Ambient light
    const t1 = setTimeout(() => setStep(1), 1000);
    // 1-2s: Iron Cross
    const t2 = setTimeout(() => setStep(2), 2000);
    // 2-4s: Official Logo
    const t3 = setTimeout(() => setStep(3), 3800);
    // 4-5s: Manifesto Phrase
    const t4 = setTimeout(() => setStep(4), 5000);
    // 5-6s: Complete
    const t5 = setTimeout(() => {
      sessionStorage.setItem("bravio_intro_seen", "true");
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [hasInteractedChoice, prefersReducedMotion, onComplete]);

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
    sessionStorage.setItem("bravio_intro_seen", "true");
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bravio-volcanic overflow-hidden"
    >
      {/* Background Volcanic Island / Cloudy Valley Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,#5E1C23_0%,#181716_45%,#121212_80%)] opacity-35"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#B1C7D4_0%,transparent_60%)] mix-blend-screen opacity-15"
        />
      </div>

      {/* Skip Button */}
      {allowSkip && hasInteractedChoice && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 z-30 flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-bravio-cloudy/80 hover:text-bravio-bone border border-bravio-cloudy/20 hover:border-bravio-cloudy/60 rounded-full transition-all duration-300 font-sans backdrop-blur-sm"
        >
          <span>SALTAR INTRO</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Choice Gate (Audio Options) */}
      {!hasInteractedChoice ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex flex-col items-center text-center px-6 max-w-md mx-auto"
        >
          {/* Authentic Iron Cross Icon */}
          <div className="w-14 h-14 mb-8 text-bravio-granate">
            <svg viewBox="-280 -280 560 560" className="w-full h-full fill-current">
              <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
            </svg>
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-bravio-bone tracking-widest uppercase mb-3">
            BRAVÍO
          </h2>
          <p className="font-sans text-xs md:text-sm text-bravio-cloudy tracking-wide mb-10 uppercase">
            Western para la vida actual
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <button
              onClick={() => handleStart(true)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3.5 px-5 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone rounded-sm font-sans text-xs tracking-widest transition-all duration-300 shadow-lg shadow-bravio-granate/30 group"
            >
              <Volume2 className="w-4 h-4 text-bravio-cloudy group-hover:scale-110 transition-transform" />
              <span>CON MÚSICA</span>
            </button>

            <button
              onClick={() => handleStart(false)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3.5 px-5 bg-bravio-volcanic-card hover:bg-bravio-volcanic-border border border-bravio-volcanic-border text-bravio-cloudy hover:text-bravio-bone rounded-sm font-sans text-xs tracking-widest transition-all duration-300"
            >
              <VolumeX className="w-4 h-4" />
              <span>EN SILENCIO</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* Cinematic Sequence */
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
          <AnimatePresence mode="wait">
            {/* 1–2s: Authentic BRAVÍO Iron Cross reveals */}
            {step === 1 && (
              <motion.div
                key="cross"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-24 md:w-32 md:h-32 text-bravio-granate filter drop-shadow-[0_0_25px_rgba(94,28,35,0.6)]"
              >
                <svg viewBox="-280 -280 560 560" className="w-full h-full fill-current">
                  <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
                </svg>
              </motion.div>
            )}

            {/* 2–4s: Official BRAVÍO Logo reveals */}
            {(step === 2 || step === 3) && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Official Vector Logo */}
                <div className="w-[280px] sm:w-[420px] md:w-[540px] text-bravio-granate mb-6 filter drop-shadow-[0_4px_30px_rgba(94,28,35,0.4)]">
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
                </div>

                {/* 4–5s: Phrase reveal */}
                {step === 3 && (
                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.15em", y: 10 }}
                    animate={{ opacity: 1, letterSpacing: "0.3em", y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="font-sans text-xs sm:text-sm md:text-base text-bravio-cloudy uppercase font-semibold"
                  >
                    WESTERN PARA LA VIDA ACTUAL.
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* 5–6s: Smooth transition pulse */}
            {step === 4 && (
              <motion.div
                key="transition"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.9 }}
                className="text-bravio-bone font-display tracking-widest text-lg"
              >
                ENTRANDO AL UNIVERSO BRAVÍO...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
