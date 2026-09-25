"use client";

import { useState } from "react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/wbravio?stkn=MWUwY3Z3NWR6a3duMw==",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@bravio.western.01?_r=1&_t=ZS-9A2EvLdOPp4",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1DqKq1kg4q/?mibextid=wwXIfr",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/524777296578",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
];

const CONTACT_DETAILS = [
  { label: "Correo", value: "hola@braviowestern.com.mx", href: "mailto:hola@braviowestern.com.mx" },
  { label: "WhatsApp", value: "+52 (477) 729-6578", href: "https://wa.me/524777296578" },
  { label: "Ubicación", value: "León, Guanajuato, México", href: null },
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [privacidad, setPrivacidad] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.mensaje || !privacidad) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ nombre: "", email: "", mensaje: "" });
        setPrivacidad(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
  return (
    <div className="min-h-screen" style={{ background: "#0F0C09", paddingTop: "72px" }}>

      {/* Hero strip */}
      <div style={{
        background: "linear-gradient(135deg, #1A1410 0%, #0F0C09 100%)",
        borderBottom: "1px solid #3E342D",
        padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 5rem)",
      }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <CruzDeHierro size={18} color="#5E1C23" />
            <span style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#849AAD" }}>
              Hablemos
            </span>
          </div>
          <h1 style={{
            fontFamily: "ArchivoBlack, sans-serif",
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "#B1C7D4",
            marginBottom: "2rem",
          }}>
            CONTACTO.
          </h1>
          <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "#849AAD", maxWidth: "480px", lineHeight: 1.7 }}>
            Estamos en León, Guanajuato. Escríbenos para consultas sobre productos, tallas, pedidos o colaboraciones.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "5rem" }}>

          {/* Left — Social icons + contact details */}
          <div>
            <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#5E1C23", marginBottom: "2.5rem", fontWeight: 700 }}>
              Síguenos
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "2rem", marginBottom: "4rem" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: "#849AAD", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#B1C7D4")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#849AAD")}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact details */}
            <div style={{ borderTop: "1px solid #3E342D" }}>
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} style={{ borderBottom: "1px solid #3E342D", padding: "1.75rem 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD" }}>
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "1.1rem", color: "#B1C7D4", textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#5E1C23")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#B1C7D4")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "1.1rem", color: "#605246" }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#5E1C23", marginBottom: "2.5rem", fontWeight: 700 }}>
              Envía un mensaje
            </p>
            <form id="contact-form" aria-label="Formulario de contacto BRAVÍO" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label htmlFor="nombre" style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD" }}>
                  Nombre
                </label>
                <input id="nombre" type="text" name="nombre" required placeholder="Tu nombre"
                  value={form.nombre} onChange={handleChange}
                  style={{ width: "100%", background: "transparent", border: "1px solid #3E342D", padding: "1.25rem 1.5rem", color: "#B1C7D4", fontFamily: "SpaceGrotesk, sans-serif", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label htmlFor="email" style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD" }}>
                  Correo electrónico
                </label>
                <input id="email" type="email" name="email" required placeholder="tu@correo.com"
                  value={form.email} onChange={handleChange}
                  style={{ width: "100%", background: "transparent", border: "1px solid #3E342D", padding: "1.25rem 1.5rem", color: "#B1C7D4", fontFamily: "SpaceGrotesk, sans-serif", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label htmlFor="mensaje" style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD" }}>
                  Mensaje
                </label>
                <textarea id="mensaje" name="mensaje" required rows={6} placeholder="¿En qué podemos ayudarte?"
                  value={form.mensaje} onChange={handleChange}
                  style={{ width: "100%", background: "transparent", border: "1px solid #3E342D", padding: "1.25rem 1.5rem", color: "#B1C7D4", fontFamily: "SpaceGrotesk, sans-serif", fontSize: "1rem", outline: "none", resize: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Aviso de privacidad */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <input
                  id="privacidad"
                  type="checkbox"
                  checked={privacidad}
                  onChange={(e) => setPrivacidad(e.target.checked)}
                  style={{ marginTop: "2px", accentColor: "#5E1C23", flexShrink: 0, width: "14px", height: "14px", cursor: "pointer" }}
                />
                <label htmlFor="privacidad" style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "11px", color: "#605246", lineHeight: 1.6, cursor: "pointer" }}>
                  He leído y acepto el{" "}
                  <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer"
                    style={{ color: "#849AAD", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Aviso de Privacidad
                  </a>
                  {" "}de BRAVÍO Western.
                </label>
              </div>

              {/* Mensaje de éxito / error */}
              {status === "sent" && (
                <div style={{ background: "#1A1410", border: "1px solid #605246", padding: "1rem 1.5rem" }}>
                  <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "13px", color: "#849AAD" }}>
                    ✓ Mensaje enviado. Te responderemos pronto.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div style={{ background: "#1A1410", border: "1px solid #5E1C23", padding: "1rem 1.5rem" }}>
                  <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "13px", color: "#5E1C23" }}>
                    Error al enviar. Inténtalo de nuevo o escíbenos directamente.
                  </p>
                </div>
              )}

              <button
                id="contact-submit"
                type="button"
                disabled={status === "sending" || status === "sent"}
                onClick={handleSubmit}
                style={{
                  background: status === "sent" ? "#605246" : "#5E1C23",
                  color: "#B1C7D4",
                  border: "none",
                  padding: "1.25rem 2rem",
                  fontFamily: "SpaceGrotesk, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  cursor: status === "sending" || status === "sent" ? "not-allowed" : "pointer",
                  width: "100%",
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "background 0.3s ease",
                }}
              >
                {status === "sending" ? "Enviando..." : status === "sent" ? "✓ Enviado" : "Enviar mensaje →"}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: "1px solid #3E342D", padding: "4rem clamp(1.5rem, 6vw, 5rem)", display: "flex", justifyContent: "center" }}>
        <CruzDeHierro size={48} color="#3E342D" />
      </div>

    </div>
  );
}
