"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from "lucide-react";
import { useCommerceStore } from "@/lib/store/commerce-store";

export default function AmbientAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const {
    isPlayingAudio,
    isMuted,
    volume,
    trackName,
    hasInteracted,
    setPlayingAudio,
    toggleAudio,
    setMuted,
    setVolume,
  } = useCommerceStore();

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (!audioRef.current || !hasInteracted) return;

    if (isPlayingAudio) {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio autoplay prevented by policy:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingAudio, hasInteracted]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bravio-theme.wav"
        loop
        preload="metadata"
      />

      {/* Floating Audio Capsule */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        <div className="relative flex items-center bg-bravio-volcanic-card/90 backdrop-blur-md border border-bravio-volcanic-border hover:border-bravio-granate/50 rounded-full px-3 py-2 shadow-2xl transition-all duration-300">
          {/* Pulsing indicator when playing */}
          <div className="flex items-center gap-2 pr-2 border-r border-bravio-volcanic-border/60">
            <button
              onClick={toggleAudio}
              className="text-bravio-cloudy hover:text-bravio-bone p-1 transition-colors"
              title={isPlayingAudio ? "Pausar música" : "Reproducir música ambiental"}
              aria-label={isPlayingAudio ? "Pausar música" : "Reproducir música"}
            >
              {isPlayingAudio ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Pause className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-bravio-cloudy/40" />
                  <Play className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          </div>

          {/* Track name marquee or discrete badge */}
          <div className="px-2.5 hidden sm:flex flex-col">
            <span className="text-[10px] uppercase font-display tracking-wider text-bravio-bone leading-tight">
              BRAVÍO AMBIENT
            </span>
            <span className="text-[9px] text-bravio-cloudy/70 truncate max-w-[120px]">
              {trackName}
            </span>
          </div>

          {/* Mute / Unmute & Volume */}
          <div className="flex items-center gap-1 pl-1">
            <button
              onClick={() => setMuted(!isMuted)}
              className="p-1 text-bravio-cloudy hover:text-bravio-bone transition-colors"
              title={isMuted ? "Activar sonido" : "Silenciar"}
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              className="p-1 text-bravio-cloudy/60 hover:text-bravio-bone transition-colors hidden md:block"
              title="Ajustar volumen"
            >
              <Sliders className="w-3 h-3" />
            </button>
          </div>

          {/* Hover / Toggle Volume Slider */}
          {showVolumeSlider && (
            <div className="absolute bottom-12 right-0 bg-bravio-volcanic-card border border-bravio-volcanic-border p-3 rounded-lg shadow-xl flex items-center gap-2">
              <span className="text-[10px] text-bravio-cloudy">0%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setMuted(false);
                }}
                className="w-24 accent-bravio-granate cursor-pointer h-1.5 bg-bravio-volcanic rounded-lg"
              />
              <span className="text-[10px] text-bravio-cloudy">100%</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
