"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleSound: () => void;
  startSound: () => void;
  pauseSound: () => void;
  volume: number;
}

const AudioContext = createContext<AudioContextType | null>(null);

const TARGET_VOLUME = 0.35; // Volumen ideal de fondo (35%)
const FADE_STEP = 0.05;
const FADE_INTERVAL_MS = 60;

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false);

  const clearFade = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeIntervalRef.current = setInterval(() => {
          if (!audioRef.current) return;
          if (audioRef.current.volume + FADE_STEP < TARGET_VOLUME) {
            audioRef.current.volume += FADE_STEP;
          } else {
            audioRef.current.volume = TARGET_VOLUME;
            clearFade();
          }
        }, FADE_INTERVAL_MS);
      })
      .catch(() => {
        // Bloqueado temporalmente por política de autoplay del navegador
        setIsPlaying(false);
      });
  }, []);

  const fadeOut = useCallback((onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume - FADE_STEP > 0) {
        audioRef.current.volume -= FADE_STEP;
      } else {
        audioRef.current.volume = 0;
        audioRef.current.pause();
        setIsPlaying(false);
        clearFade();
        if (onComplete) onComplete();
      }
    }, FADE_INTERVAL_MS);
  }, []);

  // Inicializar audio element e intentar reproducir por defecto desde el inicio
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    const canPlayM4a = audio.canPlayType("audio/mp4; codecs=\"mp4a.40.2\"");
    if (canPlayM4a) {
      audio.src = "/audio/bravio-theme.m4a";
    } else {
      audio.src = "/audio/bravio-theme.wav";
    }

    audioRef.current = audio;

    const wasMuted = sessionStorage.getItem("bravio_audio_muted") === "true";

    // Si no ha sido silenciado explícitamente, reproducir por defecto
    if (!wasMuted) {
      fadeIn();

      // Desbloqueo automático ante el primer gesto (si el navegador bloquea autoplay sin click previo)
      const unlockOnFirstGesture = () => {
        if (sessionStorage.getItem("bravio_audio_muted") !== "true") {
          fadeIn();
        }
        ["click", "touchstart", "pointerdown", "keydown"].forEach((evt) => {
          window.removeEventListener(evt, unlockOnFirstGesture);
        });
      };

      ["click", "touchstart", "pointerdown", "keydown"].forEach((evt) => {
        window.addEventListener(evt, unlockOnFirstGesture, { once: true, passive: true });
      });
    }

    // Pausar o reanudar cuando la pestaña pierde visibilidad
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.volume = 0;
        }
      } else {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.volume = TARGET_VOLUME;
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = "";
    };
  }, [fadeIn]);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      sessionStorage.setItem("bravio_audio_muted", "true");
      fadeOut();
    } else {
      sessionStorage.setItem("bravio_audio_muted", "false");
      fadeIn();
    }
  }, [isPlaying, fadeIn, fadeOut]);

  const startSound = useCallback(() => {
    const wasMuted = sessionStorage.getItem("bravio_audio_muted") === "true";
    if (!wasMuted) {
      fadeIn();
    }
  }, [fadeIn]);

  const pauseSound = useCallback(() => {
    if (isPlaying) {
      fadeOut();
    }
  }, [isPlaying, fadeOut]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleSound, startSound, pauseSound, volume: TARGET_VOLUME }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
