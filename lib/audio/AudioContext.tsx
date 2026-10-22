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

  // Inicializar audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    // Soporta múltiples formatos: Si el cliente reemplaza bravio-theme.mp3 o m4a o wav
    // Intentamos cargar la fuente preferida
    const canPlayM4a = audio.canPlayType("audio/mp4; codecs=\"mp4a.40.2\"");
    if (canPlayM4a) {
      audio.src = "/audio/bravio-theme.m4a";
    } else {
      audio.src = "/audio/bravio-theme.wav";
    }

    audioRef.current = audio;

    // Restaurar preferencia previa si el usuario la silenció explícitamente
    const wasMuted = sessionStorage.getItem("bravio_audio_muted") === "true";
    if (wasMuted) {
      setIsPlaying(false);
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
  }, []);

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
    audio.play().then(() => {
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
    }).catch(() => {
      // Si el navegador bloquea autoplay hasta interacción
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
    if (!wasMuted && !isPlaying) {
      fadeIn();
    }
  }, [isPlaying, fadeIn]);

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
