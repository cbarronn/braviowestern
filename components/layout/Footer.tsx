"use client";

import React from "react";
import Link from "next/link";
import { Play, Shield } from "lucide-react";

export default function Footer() {
  const replayIntro = () => {
    try {
      sessionStorage.removeItem("bravio_intro_seen");
      localStorage.removeItem("bravio_intro_seen");
    } catch (e) {}
    window.location.href = "/?intro=true";
  };

  return (
    <footer className="bg-bravio-volcanic border-t border-bravio-volcanic-border text-bravio-bone pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-bravio-volcanic-border">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="w-48 text-bravio-granate">
              <svg viewBox="-110 -1215 4554 1325" className="w-full h-auto fill-current">
                <g transform="scale(1,-1)">
                  <g transform="translate(0,0)"><path d="M722 519Q722 392 607 359V355Q738 325 738 183Q738 129 711.5 87.5Q685 46 639.0 23.0Q593 0 538 0H74V688H532Q584 688 627.5 666.5Q671 645 696.5 606.0Q722 567 722 519ZM295 420H447Q469 420 483.5 435.5Q498 451 498 474V484Q498 506 483.0 521.5Q468 537 447 537H295ZM295 160H463Q485 160 499.5 175.5Q514 191 514 214V224Q514 247 499.5 262.5Q485 278 463 278H295Z"/></g>
                  <g transform="translate(778,0)"><path d="M594 288 747 0H499L377 251H295V0H74V688H495Q569 688 621.5 659.5Q674 631 700.5 582.5Q727 534 727 477Q727 414 693.0 363.0Q659 312 594 288ZM440 531H295V404H440Q466 404 484.0 422.5Q502 441 502 468Q502 495 484.0 513.0Q466 531 440 531Z"/></g>
                  <g transform="translate(1556,0)"><path d="M535 0 506 97H265L236 0H10L261 688H518L769 0ZM311 251H460L388 496H384Z"/></g>
                  <g transform="translate(2334,0)"><path d="M261 0 17 688H253L391 228H395L534 688H760L517 0Z"/></g>
                  <g transform="translate(3112,0)"><path d="M84 0V688H305V0Z"/></g>
                  <g transform="translate(3501,0)"><path d="M788 344Q788 170 691.0 79.0Q594 -12 416 -12Q238 -12 141.5 78.5Q45 169 45 344Q45 519 141.5 609.5Q238 700 416 700Q594 700 691.0 609.0Q788 518 788 344ZM271 376V312Q271 239 308.0 196.0Q345 153 416 153Q487 153 524.5 196.0Q562 239 562 312V376Q562 449 524.5 492.0Q487 535 416 535Q345 535 308.0 492.0Q271 449 271 376Z"/></g>
                  <g transform="translate(3306.5,940)"><path d="M -46.2 -46.2 L 46.2 -46.2 L 85.8 -165 L -85.8 -165 Z M -46.2 46.2 L 46.2 46.2 L 85.8 165 L -85.8 165 Z M -46.2 -46.2 L -46.2 46.2 L -165 85.8 L -165 -85.8 Z M 46.2 -46.2 L 46.2 46.2 L 165 85.8 L 165 -85.8 Z M -46.2 -46.2 L 46.2 -46.2 L 46.2 46.2 L -46.2 46.2 Z"/></g>
                </g>
              </svg>
            </div>
            <p className="font-sans text-xs tracking-wider text-bravio-cloudy uppercase">
              WESTERN PARA LA VIDA ACTUAL.
            </p>
            <p className="text-xs text-bravio-cloudy/80 max-w-md leading-relaxed font-sans">
              Botas y calzado de piel genuina con construcción Goodyear Welt 360°. Elaboradas por maestros artesanos zapateros en León, Guanajuato, México.
            </p>
            <div className="pt-2 flex flex-col gap-4">
              <div>
                <button
                  onClick={replayIntro}
                  className="inline-flex items-center gap-2 text-[11px] font-sans tracking-widest text-bravio-gold hover:text-bravio-bone border border-bravio-gold/40 hover:border-bravio-bone px-3 py-1.5 transition-all duration-300"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>REPETIR INTRO CINEMATOGRÁFICA</span>
                </button>
              </div>

              {/* Redes Sociales Oficiales */}
              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-bravio-cloudy/80 font-sans font-bold block mb-2.5">
                  Redes Sociales Oficiales
                </span>
                <div className="flex items-center gap-2.5">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/braviowestern"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5E1C23] border border-white/10 hover:border-[#5E1C23] flex items-center justify-center text-bravio-cloudy hover:text-white transition-all duration-300"
                    title="Instagram @braviowestern"
                    aria-label="Instagram de BRAVÍO Western"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com/braviowestern"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5E1C23] border border-white/10 hover:border-[#5E1C23] flex items-center justify-center text-bravio-cloudy hover:text-white transition-all duration-300"
                    title="Facebook BRAVÍO Western"
                    aria-label="Facebook de BRAVÍO Western"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@braviowestern"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#5E1C23] border border-white/10 hover:border-[#5E1C23] flex items-center justify-center text-bravio-cloudy hover:text-white transition-all duration-300"
                    title="TikTok @braviowestern"
                    aria-label="TikTok de BRAVÍO Western"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 6.34 6.31 6.34 6.34 0 0 0 6.34-6.31V9.56a8.16 8.16 0 0 0 4.91 1.64V7.75a4.78 4.78 0 0 1-1-.06z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/524771234567?text=Hola%20BRAV%C3%8DO%2C%20quisiera%20asesor%C3%ADa%20sobre%20sus%20botas%20artesanales"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-emerald-700 border border-white/10 hover:border-emerald-700 flex items-center justify-center text-bravio-cloudy hover:text-white transition-all duration-300"
                    title="WhatsApp Taller León Gto"
                    aria-label="WhatsApp de Atención de Taller en León Gto"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Column 1: Catálogo */}
          <div className="space-y-3">
            <h4 className="font-display text-xs tracking-widest uppercase text-bravio-bone">
              Catálogo & Marca
            </h4>
            <ul className="space-y-2 text-xs text-bravio-cloudy font-sans">
              <li>
                <Link href="/hombre" className="hover:text-bravio-bone transition-colors">
                  Calzado para Hombre
                </Link>
              </li>
              <li>
                <Link href="/coleccion/sinaloa" className="hover:text-bravio-bone transition-colors">
                  Colección Sinaloa
                </Link>
              </li>
              <li>
                <Link href="/mujer" className="hover:text-bravio-bone transition-colors">
                  Línea Mujer 2026
                </Link>
              </li>
              <li>
                <Link href="/buscar" className="hover:text-bravio-bone transition-colors">
                  Buscador de Botas
                </Link>
              </li>
              <li>
                <Link href="/la-cruz-de-hierro" className="hover:text-bravio-bone transition-colors">
                  La Cruz de Hierro
                </Link>
              </li>
              <li>
                <Link href="/historia" className="hover:text-bravio-bone transition-colors">
                  El Taller de León Gto.
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Guías & Servicio */}
          <div className="space-y-3">
            <h4 className="font-display text-xs tracking-widest uppercase text-bravio-bone">
              Guías & Cuidados
            </h4>
            <ul className="space-y-2 text-xs text-bravio-cloudy font-sans">
              <li>
                <Link href="/guia-de-tallas" className="hover:text-bravio-bone transition-colors">
                  Guía de Tallas (MX)
                </Link>
              </li>
              <li>
                <Link href="/cuidados" className="hover:text-bravio-bone transition-colors">
                  Cuidado de Pieles
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-bravio-bone transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-bravio-bone transition-colors">
                  Política de Envíos
                </Link>
              </li>
              <li>
                <Link href="/cambios-y-devoluciones" className="hover:text-bravio-bone transition-colors">
                  Primer Cambio Gratis
                </Link>
              </li>
              <li>
                <Link href="/rastreo" className="hover:text-bravio-bone transition-colors">
                  Rastreo de Pedido
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Administración */}
          <div className="space-y-3">
            <h4 className="font-display text-xs tracking-widest uppercase text-bravio-bone">
              Legal & Privado
            </h4>
            <ul className="space-y-2 text-xs text-bravio-cloudy font-sans">
              <li>
                <Link href="/terminos-y-condiciones" className="hover:text-bravio-bone transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/aviso-de-privacidad" className="hover:text-bravio-bone transition-colors">
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-bravio-bone transition-colors">
                  Contacto de Taller
                </Link>
              </li>
              <li className="pt-3">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-bravio-gold hover:text-bravio-bone transition-colors border border-bravio-gold/40 px-2.5 py-1 text-[11px]"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Panel Privado /admin</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-bravio-cloudy/60 gap-4 font-sans">
          <p>© {new Date().getFullYear()} BRAVÍO Western · Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span>León, Guanajuato · México</span>
            <span>Construcción Goodyear Welt 360°</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
