"use client";

import React from "react";
import { useAudio } from "@/lib/audio/AudioContext";

interface AudioToggleProps {
  className?: string;
  variant?: "nav" | "floating";
}

export default function AudioToggle({ className = "", variant = "nav" }: AudioToggleProps) {
  const { isPlaying, toggleSound } = useAudio();

  return (
    <button
      type="button"
      onClick={toggleSound}
      id="audio-toggle-btn"
      aria-label={isPlaying ? "Desactivar sonido ambiental" : "Activar sonido ambiental"}
      title={isPlaying ? "Silenciar música ambiental" : "Reproducir música ambiental"}
      className={`group flex items-center gap-2.5 px-2.5 py-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#849AAD] ${
        isPlaying 
          ? "text-[#B1C7D4] bg-white/[0.04] border border-[#3E342D]/60 hover:border-[#5E1C23]"
          : "text-[#849AAD] hover:text-[#B1C7D4] border border-transparent hover:border-[#3E342D]/40"
      } ${className}`}
    >
      {/* Equalizer Bars */}
      <span className="flex items-end gap-[3px] h-3.5 w-3.5 pb-0.5" aria-hidden="true">
        <span
          className={`w-[2px] rounded-full bg-current transition-all duration-300 ${
            isPlaying ? "animate-eq-1 h-3" : "h-[3px] opacity-60"
          }`}
        />
        <span
          className={`w-[2px] rounded-full bg-current transition-all duration-300 ${
            isPlaying ? "animate-eq-2 h-2" : "h-[5px] opacity-60"
          }`}
        />
        <span
          className={`w-[2px] rounded-full bg-current transition-all duration-300 ${
            isPlaying ? "animate-eq-3 h-3.5" : "h-[3px] opacity-60"
          }`}
        />
        <span
          className={`w-[2px] rounded-full bg-current transition-all duration-300 ${
            isPlaying ? "animate-eq-4 h-2.5" : "h-[4px] opacity-60"
          }`}
        />
      </span>

      {/* Label */}
      <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.22em] uppercase hidden sm:inline-block font-medium">
        {isPlaying ? "Sonido ON" : "Sonido"}
      </span>

      {/* Pulse dot when active */}
      {isPlaying && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#5E1C23] animate-pulse hidden md:inline-block" />
      )}
    </button>
  );
}
