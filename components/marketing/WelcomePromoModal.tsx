"use client";

import React, { useState, useEffect } from "react";
import { X, Check, ArrowRight, Copy } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function WelcomePromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Only show if user has not dismissed before and after a subtle delay
    const dismissed = localStorage.getItem("bravio_promo_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("bravio_promo_dismissed", "true");
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setIsSubscribed(true);
      localStorage.setItem("bravio_promo_dismissed", "true");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText("BIENVENIDO10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#605246]/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-[#B1C7D4] p-8 shadow-2xl text-center text-[#605246]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-[#849AAD] hover:text-[#605246] transition-colors"
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        <CruzDeHierro size={32} color="#5E1C23" className="mx-auto mb-4" />

        <span className="text-[10px] font-[SpaceGrotesk] uppercase tracking-[0.25em] text-[#849AAD] font-bold block mb-1">
          Beneficio Exclusivo
        </span>

        <h2 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-tight mb-3">
          10% EN TU PRIMER PAR
        </h2>

        {!isSubscribed ? (
          <>
            <p className="font-[SpaceGrotesk] text-xs text-[#849AAD] leading-relaxed mb-6">
              Suscríbete al registro de taller para recibir novedades de producción artesanal y obtén 10% de descuento en tu primera compra en línea.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 font-[SpaceGrotesk]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico..."
                className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-4 py-3 text-xs text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] text-center"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? "Registrando..." : "Obtener mi Código"} <ArrowRight size={14} />
              </button>
            </form>

            <p className="mt-4 text-[10px] font-[SpaceGrotesk] text-[#849AAD]">
              Válido en modelos con construcción Goodyear Welt 360°. Respetamos tu privacidad.
            </p>
          </>
        ) : (
          <div className="space-y-4 pt-2">
            <p className="font-[SpaceGrotesk] text-xs text-[#605246]">
              ¡Estás registrado! Utiliza este código en tu checkout:
            </p>

            <div className="flex items-center justify-between p-3 bg-[#F4F7F9] border border-[#B1C7D4]">
              <span className="font-mono font-bold text-lg text-[#5E1C23] tracking-widest pl-2">
                BIENVENIDO10
              </span>
              <button
                onClick={copyCode}
                className="px-3 py-1.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-[11px] font-[SpaceGrotesk] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copiado" : "Copiar"}</span>
              </button>
            </div>

            <button
              onClick={handleClose}
              className="text-xs font-[SpaceGrotesk] text-[#605246] hover:text-[#5E1C23] underline pt-2 block mx-auto font-bold"
            >
              Comenzar a comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
