"use client";

import { useState } from "react";
import Link from "next/link";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bravio_western?dlrf=MWUwY3Z3NWR6a3duMw==",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@bravio.western?_r=1&_t=ZS-9BDGpu0sTEg",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1CUakum76M/?mibextid=wwXIfr",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/524777296578",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
];

const CONTACT_DETAILS = [
  { label: "Correo Electrónico", value: "hola@braviowestern.com.mx", href: "mailto:hola@braviowestern.com.mx" },
  { label: "WhatsApp de Taller", value: "+52 (477) 729-6578", href: "https://wa.me/524777296578" },
  { label: "Ubicación de Taller", value: "León, Guanajuato, México", href: null },
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [privacidad, setPrivacidad] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.telefono || !form.mensaje || !privacidad) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
        setPrivacidad(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#605246] pt-[90px] pb-24">
      {/* Hero strip */}
      <div className="border-b border-[#B1C7D4]/40 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <CruzDeHierro size={18} color="#5E1C23" />
          <span className="font-[SpaceGrotesk] text-[11px] tracking-[0.25em] uppercase font-bold text-[#849AAD]">
            Atención Directa
          </span>
        </div>
        <h1 className="font-archivo text-4xl sm:text-6xl text-[#605246] uppercase tracking-tight mb-4">
          CONTACTO.
        </h1>
        <p className="font-[SpaceGrotesk] text-base text-[#849AAD] max-w-xl leading-relaxed">
          Nuestros talleres y oficinas centrales operan en León, Guanajuato. Escríbenos para consultas sobre productos, tallas, pedidos o distribución.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left — Social icons + contact details */}
          <div className="space-y-8">
            <div>
              <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.25em] uppercase text-[#5E1C23] font-bold mb-4">
                Redes Oficiales
              </p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-3 border border-[#B1C7D4]/60 bg-[#F4F7F9] text-[#605246] hover:text-[#5E1C23] hover:border-[#5E1C23] transition-colors rounded-none shadow-xs"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="border-t border-[#B1C7D4]/40 pt-6 space-y-6">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="border-b border-[#B1C7D4]/30 pb-4">
                  <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.2em] uppercase text-[#849AAD] font-bold block mb-1">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-[SpaceGrotesk] text-base text-[#605246] hover:text-[#5E1C23] transition-colors font-bold"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-[SpaceGrotesk] text-base text-[#605246] font-bold">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 bg-[#F4F7F9] border border-[#B1C7D4]/50 shadow-xs">
              <h3 className="font-archivo text-sm text-[#605246] uppercase mb-2">Horarios de Taller</h3>
              <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
                Lunes a Viernes: 09:00 - 18:00 hrs (Tiempo del Centro de México).<br />
                Sábados: 09:00 - 14:00 hrs.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white border border-[#B1C7D4]/60 p-8 shadow-sm">
            <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.25em] uppercase text-[#5E1C23] font-bold mb-6">
              Envía un mensaje
            </p>
            <form onSubmit={handleSubmit} className="space-y-5 font-[SpaceGrotesk]">
              <div>
                <label htmlFor="nombre" className="block text-[11px] font-bold tracking-wider uppercase text-[#605246] mb-1.5">
                  Nombre Completo *
                </label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  required
                  placeholder="Tu nombre y apellidos"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4] px-4 py-3 text-sm text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-bold tracking-wider uppercase text-[#605246] mb-1.5">
                  Correo Electrónico *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4] px-4 py-3 text-sm text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23]"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-[11px] font-bold tracking-wider uppercase text-[#605246] mb-1.5">
                  Teléfono (WhatsApp) *
                </label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  required
                  placeholder="10 dígitos"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4] px-4 py-3 text-sm text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23]"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-[11px] font-bold tracking-wider uppercase text-[#605246] mb-1.5">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  placeholder="¿En qué podemos ayudarte?"
                  value={form.mensaje}
                  onChange={handleChange}
                  className="w-full bg-white border border-[#B1C7D4] px-4 py-3 text-sm text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23]"
                />
              </div>

              {/* Aviso de privacidad */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  id="privacidad"
                  type="checkbox"
                  required
                  checked={privacidad}
                  onChange={(e) => setPrivacidad(e.target.checked)}
                  className="mt-1 accent-[#5E1C23] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="privacidad" className="text-xs text-[#849AAD] leading-relaxed cursor-pointer">
                  He leído y acepto el{" "}
                  <Link href="/aviso-de-privacidad" className="underline text-[#605246] hover:text-[#5E1C23]">
                    Aviso de Privacidad
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 px-6 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white font-[SpaceGrotesk] text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
              >
                {status === "sending" ? "Enviando mensaje..." : "Enviar Mensaje al Taller"}
              </button>

              {status === "sent" && (
                <div className="p-3 bg-emerald-50 border border-emerald-500/40 text-emerald-800 text-xs text-center font-bold">
                  ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-red-50 border border-red-500/40 text-red-800 text-xs text-center font-bold">
                  Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
