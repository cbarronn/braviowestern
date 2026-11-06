"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Check, ArrowRight, Copy } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#16120E] border-2 border-[#605246]/50 p-8 shadow-2xl text-center">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-[#849AAD] hover:text-[#B1C7D4] transition-colors"
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        <CruzDeHierro size={32} color="#5E1C23" className="mx-auto mb-4" />

        <span className="text-[10px] font-[SpaceGrotesk] uppercase tracking-[0.25em] text-[#849AAD] block mb-1">
          Beneficio Exclusivo
        </span>

        <h2 className="font-archivo text-2xl sm:text-3xl text-[#B1C7D4] uppercase tracking-tight mb-3">
          10% EN TU PRIMER PAR
        </h2>

        {!isSubscribed ? (
          <>
            <p className="font-[SpaceGrotesk] text-xs text-[#849AAD] leading-relaxed mb-6">
              Suscríbete al registro de taller para recibir noticias de nuevos lotes, eventos privados y obtén 10% de descuento en tu primer pedido.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 font-[SpaceGrotesk]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico..."
                className="w-full bg-[#0F0C09] border border-[#605246]/40 px-4 py-3 text-xs text-[#B1C7D4] placeholder-[#849AAD]/60 focus:outline-none focus:border-[#5E1C23] text-center"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#5E1C23] hover:bg-[#72232b] text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Registrando..." : "Obtener mi Código"} <ArrowRight size={14} />
              </button>
            </form>

            <p className="mt-4 text-[10px] font-[SpaceGrotesk] text-[#849AAD]/70">
              Válido en compras mínimas de $3,000 MXN. Respetamos tu privacidad.
            </p>
          </>
        ) : (
          <div className="space-y-4 pt-2">
            <p className="font-[SpaceGrotesk] text-xs text-[#849AAD]">
              ¡Estás registrado! Utiliza este código en tu checkout:
            </p>

            <div className="flex items-center justify-between p-3 bg-[#0F0C09] border border-[#605246]/50">
              <span className="font-mono font-bold text-lg text-white tracking-widest pl-2">
                BIENVENIDO10
              </span>
              <button
                onClick={copyCode}
                className="px-3 py-1.5 bg-[#5E1C23] hover:bg-[#72232b] text-white text-[11px] font-[SpaceGrotesk] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copiado" : "Copiar"}</span>
              </button>
            </div>

            <button
              onClick={handleClose}
              className="text-xs font-[SpaceGrotesk] text-[#849AAD] hover:text-[#B1C7D4] underline pt-2 block mx-auto"
            >
              Comenzar a comprar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
