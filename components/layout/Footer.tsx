import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="w-full relative"
      style={{ background: "#080604", borderTop: "1px solid #1A1410" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Top — brand + tagline */}
        <div className="py-20 md:py-48" style={{ borderBottom: "1px solid #1A1410" }}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-32">
            <div>
              <Link href="/" aria-label="BRAVÍO — Inicio" className="inline-block mt-4 md:mt-8 mb-10">
                <Image
                  src="/brand/images/Avatar_BRAVIO_negativo_1000px.png"
                  alt="BRAVÍO"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </Link>
              <p
                className="font-[SpaceGrotesk] text-2xl leading-loose mb-8"
                style={{ color: "#B1C7D4", maxWidth: "320px" }}
              >
                Western para la vida actual.
              </p>
              <p
                className="font-[SpaceGrotesk] text-lg leading-loose"
                style={{ color: "#849AAD", maxWidth: "320px" }}
              >
                Hecho en León, Guanajuato.
              </p>
            </div>

            {/* Middle — links in 2 cols */}
            <div className="grid grid-cols-2 gap-12 md:gap-32">
              {/* Colecciones */}
              <nav aria-label="Colecciones">
                <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase mb-8 font-bold" style={{ color: "#849AAD" }}>
                  Colecciones
                </p>
                <ul className="space-y-8 list-none m-0 p-0">
                  {[
                    { href: "/mujer", label: "Mujer" },
                    { href: "/hombre", label: "Hombre" },
                    { href: "/coleccion", label: "Toda la Colección" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="font-[SpaceGrotesk] text-base transition-colors hover:text-[#FFFFFF]" style={{ color: "#B1C7D4" }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Información y Redes */}
              <div>
                {/* Redes Sociales */}
                <div className="flex gap-8 mb-16 md:mb-20">
                  <a
                    href="https://www.instagram.com/wbravio?stkn=MWUwY3Z3NWR6a3duMw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="transition-colors hover:text-[#FFFFFF]"
                    style={{ color: "#849AAD" }}
                  >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@bravio.western.01?_r=1&_t=ZS-9A2EvLdOPp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="transition-colors hover:text-[#FFFFFF]"
                    style={{ color: "#849AAD" }}
                  >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1DqKq1kg4q/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="transition-colors hover:text-[#FFFFFF]"
                    style={{ color: "#849AAD" }}
                  >
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                </div>

                {/* Información */}
                <nav aria-label="Información">
                <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase mb-8 font-bold" style={{ color: "#849AAD" }}>
                  Información
                </p>
                <ul className="space-y-8 list-none m-0 p-0">
                  {[
                    { href: "/nosotros", label: "Nosotros" },
                    { href: "/guia-de-tallas", label: "Guía de Tallas" },
                    { href: "/envios-y-devoluciones", label: "Envíos" },
                    { href: "/contacto", label: "Contacto" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="font-[SpaceGrotesk] text-base transition-colors hover:text-[#FFFFFF]" style={{ color: "#B1C7D4" }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Contacto — right aligned on desktop */}
          <div className="md:text-right">
              <p className="font-[SpaceGrotesk] text-[11px] tracking-[0.3em] uppercase mb-8 font-bold" style={{ color: "#849AAD" }}>
                Atención al Cliente
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                <a href="https://wa.me/524777296578" target="_blank" rel="noopener noreferrer"
                  className="font-[SpaceGrotesk] text-base transition-colors hover:text-[#FFFFFF]" style={{ color: "#B1C7D4" }}>
                  WhatsApp: +52 (477) 729-6578
                </a>
                <a href="mailto:hola@braviowestern.com.mx"
                  className="font-[SpaceGrotesk] text-base transition-colors hover:text-[#FFFFFF]" style={{ color: "#B1C7D4" }}>
                  hola@braviowestern.com.mx
                </a>
                <p className="font-[SpaceGrotesk] text-base" style={{ color: "#849AAD", marginTop: "0.5rem" }}>
                  León, Guanajuato, México
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[SpaceGrotesk] text-sm tracking-widest uppercase" style={{ color: "#849AAD" }}>
            <span style={{ color: "#5E1C23", marginRight: "8px" }}>✦</span> León, Guanajuato · México
          </p>
          <p className="font-[SpaceGrotesk] text-sm" style={{ color: "#849AAD" }}>
            © {new Date().getFullYear()} BRAVÍO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
