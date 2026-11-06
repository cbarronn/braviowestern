"use client";

import React from "react";
import Link from "next/link";
import { Play, Shield } from "lucide-react";

export default function Footer() {
  const replayIntro = () => {
    sessionStorage.removeItem("bravio_intro_seen");
    window.location.reload();
  };

  return (
    <footer className="bg-bravio-volcanic border-t border-bravio-volcanic-border text-bravio-bone pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-bravio-volcanic-border">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
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
            <p className="text-xs text-bravio-cloudy/80 max-w-md leading-relaxed">
              Botas y accesorios de piel genuina con construcción Goodyear Welt. Elaboradas a mano por maestros artesanos en el corazón zapatero de León, Guanajuato, México.
            </p>
            <div className="pt-2">
              <button
                onClick={replayIntro}
                className="inline-flex items-center gap-2 text-xs font-sans tracking-widest text-bravio-gold hover:text-bravio-bone border border-bravio-gold/40 hover:border-bravio-bone px-3 py-1.5 rounded transition-all duration-300"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>REPETIR INTRO CINEMATOGRÁFICA</span>
              </button>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <h4 className="font-display text-xs tracking-widest uppercase text-bravio-bone">
              Colecciones
            </h4>
            <ul className="space-y-2 text-xs text-bravio-cloudy">
              <li>
                <Link href="/coleccion/sinaloa" className="hover:text-bravio-bone transition-colors">
                  Colección Sinaloa
                </Link>
              </li>
              <li>
                <Link href="/hombre" className="hover:text-bravio-bone transition-colors">
                  Botas para Hombre
                </Link>
              </li>
              <li>
                <Link href="/coleccion/bravio-mujer" className="hover:text-bravio-bone transition-colors">
                  Línea Mujer 2026
                </Link>
              </li>
              <li>
                <Link href="/historia" className="hover:text-bravio-bone transition-colors">
                  Taller y Origen en León
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <h4 className="font-display text-xs tracking-widest uppercase text-bravio-bone">
              Atención & Seguridad
            </h4>
            <ul className="space-y-2 text-xs text-bravio-cloudy">
              <li>
                <Link href="/rastreo" className="hover:text-bravio-bone transition-colors">
                  Rastreo de Guía
                </Link>
              </li>
              <li>
                <span className="text-bravio-cloudy/60">Garantía de Por Vida en Costura</span>
              </li>
              <li>
                <span className="text-bravio-cloudy/60">hola@braviowestern.com.mx</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-bravio-gold/80 hover:text-bravio-gold transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Panel de Administración</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-bravio-cloudy/60 gap-4">
          <p>© {new Date().getFullYear()} BRAVÍO Western S.A. de C.V. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span>León, Gto. México</span>
            <span>Pagos seguros vía Mercado Pago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
