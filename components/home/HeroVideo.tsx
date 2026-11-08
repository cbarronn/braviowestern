"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";

interface HeroVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function HeroVideo({
  src,
  poster = "/brand/posterImage-142.png",
  className = "w-full h-full object-cover",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const attemptPlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        setHasError(false);
      }
    } catch (err) {
      // Autoplay restriction or network buffering
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force inline & muted attributes for iOS Safari & modern Chrome
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    attemptPlay();

    // Event listeners to prevent permanent pausing / stalling
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        attemptPlay();
      }
    };

    const handleWindowFocus = () => {
      attemptPlay();
    };

    const handleWaiting = () => {
      // Browser stalled buffering, re-trigger when ready
    };

    const handleStalled = () => {
      // Attempt gentle recovery
      setTimeout(() => {
        attemptPlay();
      }, 500);
    };

    const handleEnded = () => {
      if (video) {
        video.currentTime = 0;
        attemptPlay();
      }
    };

    const handleCanPlay = () => {
      setIsReady(true);
      attemptPlay();
    };

    const handleError = () => {
      setHasError(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [attemptPlay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      attemptPlay();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleManualReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.load();
    attemptPlay();
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className={`${className} transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-90"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Discretos controles de reproducción flotantes en la esquina inferior */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {hasError ? (
          <button
            onClick={handleManualReload}
            title="Reintentar video"
            className="p-2.5 rounded-full bg-black/60 hover:bg-[#5E1C23] text-white border border-white/20 backdrop-blur-md transition-all shadow-lg text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span className="font-[SpaceGrotesk] uppercase tracking-wider text-[10px]">Reintentar</span>
          </button>
        ) : (
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
