"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { RotateCw, Play, Pause, ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface Product360ViewerProps {
  images: string[];
  name: string;
  leatherType?: string;
  onActiveIndexChange?: (index: number) => void;
}

export default function Product360Viewer({
  images,
  name,
  leatherType,
  onActiveIndexChange,
}: Product360ViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const dragStartXRef = useRef<number>(0);
  const dragStartIndexRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalFrames = images.length || 1;
  const currentDegree = Math.round((currentIndex / totalFrames) * 360);

  // Preload all frames on mount for butter-smooth scrubbing without flicker
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // Notify parent if callback provided
  const setIndex = useCallback(
    (idx: number) => {
      const normalized = ((idx % totalFrames) + totalFrames) % totalFrames;
      setCurrentIndex(normalized);
      if (onActiveIndexChange) {
        onActiveIndexChange(normalized);
      }
    },
    [totalFrames, onActiveIndexChange]
  );

  // Auto-rotation loop
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateTimerRef.current = setInterval(() => {
        setIndex(currentIndex + 1);
      }, 420);
    } else {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
        autoRotateTimerRef.current = null;
      }
    }

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
        autoRotateTimerRef.current = null;
      }
    };
  }, [isAutoRotating, currentIndex, setIndex]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    setIsAutoRotating(false);
    dragStartXRef.current = e.clientX;
    dragStartIndexRef.current = currentIndex;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartXRef.current;
    // Each 22px of drag switches 1 angle frame
    const frameOffset = Math.floor(diff / 22);
    setIndex(dragStartIndexRef.current - frameOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    setHasInteracted(true);
    setIsAutoRotating(false);
    dragStartXRef.current = e.touches[0].clientX;
    dragStartIndexRef.current = currentIndex;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const diff = e.touches[0].clientX - dragStartXRef.current;
    const frameOffset = Math.floor(diff / 20);
    setIndex(dragStartIndexRef.current - frameOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const nextFrame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasInteracted(true);
    setIsAutoRotating(false);
    setIndex(currentIndex + 1);
  };

  const prevFrame = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasInteracted(true);
    setIsAutoRotating(false);
    setIndex(currentIndex - 1);
  };

  const toggleAutoRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasInteracted(true);
    setIsAutoRotating((prev) => !prev);
  };

  const currentImageSrc = images[currentIndex] || images[0] || "";

  return (
    <div className="space-y-4 select-none">
      {/* Main 360° Interactive Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative aspect-[4/5] bg-white rounded-none overflow-hidden border border-[#B1C7D4]/60 p-6 flex items-center justify-center shadow-xs transition-shadow ${
          isDragging ? "cursor-grabbing shadow-md" : "cursor-grab"
        }`}
      >
        {/* Active Product Frame */}
        <div className="relative w-full h-full pointer-events-none">
          <Image
            src={currentImageSrc}
            alt={`${name} - ángulo ${currentIndex + 1} (${currentDegree}°)`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 select-none"
            priority
          />
        </div>

        {/* Badge: Leather type */}
        {leatherType && (
          <span className="absolute top-4 left-4 bg-[#F4F7F9] text-[10px] font-[SpaceGrotesk] font-bold tracking-widest uppercase text-[#605246] px-3 py-1 border border-[#B1C7D4]/60">
            {leatherType}
          </span>
        )}

        {/* Badge: 360° Degree & Control Status */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-[#B1C7D4]/70 shadow-xs">
          <RotateCw
            className={`w-3 h-3 text-[#5E1C23] ${
              isAutoRotating ? "animate-spin" : ""
            }`}
          />
          <span className="text-[11px] font-[SpaceGrotesk] font-bold tracking-wider text-[#605246]">
            {currentDegree}°
          </span>
          <span className="text-[9px] text-[#849AAD] uppercase font-[SpaceGrotesk] tracking-wider ml-1">
            [{currentIndex + 1}/{totalFrames}]
          </span>
        </div>

        {/* Floating Controls: Steppers & Auto-Spin */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-auto">
          {/* Stepper Left */}
          <button
            onClick={prevFrame}
            aria-label="Ángulo anterior"
            className="p-2 rounded-full bg-white/90 hover:bg-[#5E1C23] hover:text-white text-[#605246] border border-[#B1C7D4]/70 backdrop-blur-md transition-all shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Center: Auto 360 Toggle Pill */}
          <button
            onClick={toggleAutoRotate}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-[SpaceGrotesk] font-bold uppercase tracking-wider transition-all backdrop-blur-md border shadow-xs ${
              isAutoRotating
                ? "bg-[#5E1C23] text-white border-[#5E1C23] ring-2 ring-[#5E1C23]/20"
                : "bg-white/95 hover:bg-[#F4F7F9] text-[#605246] border-[#B1C7D4]/80"
            }`}
          >
            {isAutoRotating ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Pausar 360°</span>
              </>
            ) : (
              <>
                <RotateCw className="w-3 h-3 text-[#5E1C23]" />
                <span>Giro 360° Auto</span>
              </>
            )}
          </button>

          {/* Stepper Right */}
          <button
            onClick={nextFrame}
            aria-label="Siguiente ángulo"
            className="p-2 rounded-full bg-white/90 hover:bg-[#5E1C23] hover:text-white text-[#605246] border border-[#B1C7D4]/70 backdrop-blur-md transition-all shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Drag Hint Overlay (disappears after first interaction) */}
        {!hasInteracted && !isAutoRotating && (
          <div className="absolute inset-x-0 bottom-16 flex justify-center pointer-events-none animate-pulse">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 text-white text-[10px] font-[SpaceGrotesk] uppercase tracking-wider backdrop-blur-sm">
              <Compass className="w-3 h-3 text-[#B1C7D4]" />
              <span>Arrastra con el mouse o dedo para girar 360°</span>
            </div>
          </div>
        )}
      </div>

      {/* Frame Scrubber / Degree Progress Bar */}
      <div className="relative w-full h-1 bg-[#F4F7F9] border border-[#B1C7D4]/40 overflow-hidden">
        <div
          className="h-full bg-[#5E1C23] transition-all duration-150"
          style={{ width: `${((currentIndex + 1) / totalFrames) * 100}%` }}
        />
      </div>

      {/* Thumbnails Angle Selector */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setHasInteracted(true);
                setIsAutoRotating(false);
                setIndex(idx);
              }}
              className={`relative w-20 h-24 flex-shrink-0 bg-white border-2 p-1 transition-all ${
                currentIndex === idx
                  ? "border-[#5E1C23] shadow-xs scale-[1.02]"
                  : "border-[#B1C7D4]/50 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain pointer-events-none" />
              <span className="absolute bottom-1 right-1 text-[9px] font-[SpaceGrotesk] bg-white/90 px-1 border border-[#B1C7D4]/50 text-[#605246]">
                {Math.round((idx / totalFrames) * 360)}°
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
