"use client";

import React, { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ background: "#1A1410", border: "1px solid #605246", padding: "1.25rem" }}>
        <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "13px", color: "#849AAD", margin: 0 }}>
          ✓ ¡Gracias por unirte! Revisa tu correo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "14px", color: "#B1C7D4", lineHeight: 1.6, margin: 0 }}>
        Suscríbete y entérate antes que nadie sobre promociones, nuevos productos y noticias de la marca.
      </p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="email"
          required
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          style={{
            flex: 1,
            background: "transparent",
            border: "1px solid #3E342D",
            padding: "1rem 1.25rem",
            color: "#B1C7D4",
            fontFamily: "SpaceGrotesk, sans-serif",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            background: "#5E1C23",
            color: "#B1C7D4",
            border: "none",
            padding: "0 1.5rem",
            fontFamily: "SpaceGrotesk, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: status === "loading" ? "default" : "pointer",
            fontWeight: 700,
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "..." : "Suscribir"}
        </button>
      </div>
      {status === "error" && (
        <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "12px", color: "#5E1C23", margin: 0 }}>
          Ocurrió un error. Por favor inténtalo más tarde.
        </p>
      )}
    </form>
  );
}
