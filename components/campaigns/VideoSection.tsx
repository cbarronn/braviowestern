"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/animations/gsap";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Small parallax on the video container
      gsap.fromTo(
        sectionRef.current,
        { backgroundPosition: "50% 0%" },
        {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      // Fade out the text 2 seconds BEFORE the video ends
      const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
      if (timeLeft <= 2.0 && !hideText) {
        setHideText(true);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[#0F0C09] flex items-center justify-center"
      aria-label="Video de campaña BRAVÍO"
    >
      <video
        ref={videoRef}
        src="/campaigns/video-bravio.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      
      {/* Overlay text - fades out BEFORE video ends */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none transition-opacity duration-[1500ms]"
        style={{ opacity: hideText ? 0 : 1 }}
      >
        <h2 className="font-[ArchivoBlack] text-[#B1C7D4] uppercase tracking-tighter" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 0.9 }}>
          EL PASO LO<br />DICE TODO.
        </h2>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,12,9,0.8)_100%)] pointer-events-none" />
    </section>
  );
}
