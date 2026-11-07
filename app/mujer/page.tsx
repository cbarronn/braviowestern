"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles, Check, Bell, ShieldCheck, Compass, Gem } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

const CHAPTERS = [
  {
    num: "01",
    territory: "TERRITORIO 01",
    title: "El Horizonte Norte",
    location: "Monterrey, Nuevo León",
    tagline: "El camino cambió. El amuleto sigue.",
    description:
      "Azotea, concreto y la silueta del cerro frente a la inmensidad industrial del norte mexicano. La bota BRAVÍO afirma su presencia con líneas depuradas, suela de cuero genuino y cuero vacuno de curtido vegetal concebido para resistir el paso del tiempo.",
    image: "/campaigns/mujer-escena-01.jpg",
    details: ["Horma estilizada de corte contemporáneo", "Acabado mate de poro abierto", "Construcción con alma de acero templado"],
  },
  {
    num: "02",
    territory: "TERRITORIO 02",
    title: "Asfalto Urbano",
    location: "Metrópoli & Noche",
    tagline: "Hay pasos que cambian todo.",
    description:
      "El dinamismo de la ciudad contemporánea. Movimiento fluido, reflejos sobre el asfalto y una pisada firme que desafía la fragilidad de las modas efímeras. La bota como armadura discreta en el ritmo cotidiano.",
    image: "/campaigns/mujer/editorial-01.jpg",
    details: ["Perfil bajo con caña anatómica", "Flexibilidad inmediata desde el primer día", "Tracción y amortiguación en ciudad"],
  },
  {
    num: "03",
    territory: "TERRITORIO 03",
    title: "Puerta Azul",
    location: "Arquitectura & Luz",
    tagline: "El oeste aparece donde no lo esperas.",
    description:
      "Arquitectura vernácula y modernismo mexicano depurado. El contraste entre los tonos minerales y la textura orgánica de la piel genuina demuestra que el espíritu Western no pertenece al pasado, sino al presente cosmopolita.",
    image: "/campaigns/door-highres.jpg",
    details: ["Gama cromática inspirada en arcilla y basalto", "Silueta limpia sin añadidos artificiales", "Tirador de calce grabado con la Cruz"],
  },
  {
    num: "04",
    territory: "TERRITORIO 04",
    title: "Muro & Presencia",
    location: "Geometría Contemporánea",
    tagline: "El origen del amuleto está en ti.",
    description:
      "Luz cenital, sombras marcadas y carácter sobrio. La Cruz de Hierro grabada a fuego no es mero adorno: es la insignia de quien forja su propio camino con convicción, elegancia y temple silencioso.",
    image: "/campaigns/mujer-escena-03.jpg",
    details: ["Bajo relieve de Cruz de Hierro en talón", "Costuras reforzadas con hilo imputrescible", "Piel flexible con tacto sedoso"],
  },
  {
    num: "05",
    territory: "TERRITORIO 05",
    title: "Umbral & Raíz",
    location: "León, Guanajuato",
    tagline: "Entra en tu propia historia.",
    description:
      "El umbral entre la tradición artesanal centenaria de Guanajuato y la vanguardia del diseño de autor. Cada par es elaborado a mano a través de más de doscientos pasos metódicos por maestros zapateros de tercera generación.",
    image: "/campaigns/mujer-escena-04.jpg",
    details: ["Ensamblado a mano en León, Gto.", "Plantilla de cuero con memoria de pisada", "Certificación de pieles de origen ético"],
  },
];

const UPCOMING_MODELS = [
  {
    name: "Bota Silao Dama",
    category: "Línea Dama 2026",
    leather: "Piel Gamuza Arena",
    price: 3499,
    slug: "bota-silao-dama-gamuza-arena",
    highlight: "Caña media anatómica con cerco cosido a mano y tacón cubano biselado.",
    image: "/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg",
    status: "Preventa Oficial",
  },
  {
    name: "Bota Chapala Dama",
    category: "Línea Dama 2026",
    leather: "Piel Gamuza Miel",
    price: 3699,
    slug: "bota-chapala-dama-vacuno-miel",
    highlight: "Silueta estilizada con tiradores reforzados y la Cruz de Hierro grabada en bajo relieve.",
    image: "/products/catalogo/bw-sin-ga-mie/BW-SIN-GA-MIE.jpg",
    status: "Preventa Oficial",
  },
  {
    name: "Bota Monterrey Dama",
    category: "Línea Dama 2026",
    leather: "Vaqueta Res Negro",
    price: 3899,
    slug: "bota-monterrey-dama-res-negro",
    highlight: "Corte estructurado para asfalto con vástago de acero y puntera vaquera suave.",
    image: "/products/catalogo/bw-sin-re-neg/BW-SIN-RE-NEG.jpg",
    status: "Preventa Oficial",
  },
  {
    name: "Bota Guanajuato Dama",
    category: "Línea Dama 2026",
    leather: "Exótico Pitón Marfil",
    price: 3999,
    slug: "bota-guanajuato-dama-piton-marfil",
    highlight: "Grabado exótico de alta gama con costura Goodyear Welt 360° artesanal.",
    image: "/products/catalogo/bw-sin-pit-bla/BW-SIN-PIT-BLA.jpg",
    status: "Preventa Oficial",
  },
];

export default function MujerPage() {
  const [email, setEmail] = useState("");
  const [sizePreference, setSizePreference] = useState("24.5");
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#605246] pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] uppercase tracking-widest text-[#849AAD] hover:text-[#605246] transition-colors font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Hero Editorial */}
      <div className="relative overflow-hidden border border-[#B1C7D4]/50 mb-16 p-8 md:p-16 bg-[#605246] flex flex-col justify-end min-h-[500px] shadow-lg">
        <div className="absolute inset-0 z-0">
          <Image
            src="/campaigns/mujer-escena-01.jpg"
            alt="Campaña Visual BRAVÍO Mujer 2026 — Azotea Monterrey"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#605246] via-[#605246]/65 to-black/30" />
        </div>

        <div className="relative z-10 max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/40 border border-white/20 rounded-full mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#B1C7D4]" />
            <span className="text-[11px] font-[SpaceGrotesk] font-bold tracking-widest text-[#B1C7D4] uppercase">
              Campaña Visual 2026 • Dirección Creativa
            </span>
          </div>

          <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-5">
            EL CAMINO CAMBIÓ.<br />EL AMULETO SIGUE.
          </h1>

          <p className="text-sm sm:text-base text-[#B1C7D4] leading-relaxed max-w-2xl mb-8 font-[SpaceGrotesk]">
            La interpretación femenina del universo BRAVÍO. No es un disfraz; es una silueta contemporánea de presencia indomable concebida para la mujer que camina con convicción en la ciudad y en el camino.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#territorios"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase transition-colors shadow-sm"
            >
              <span>Explorar los 5 Territorios</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#lista-espera"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase transition-colors backdrop-blur-sm"
            >
              <span>Acceso VIP Anticipado</span>
            </a>
          </div>
        </div>
      </div>

      {/* Manifesto Section */}
      <section className="py-16 text-center max-w-4xl mx-auto border-b border-[#B1C7D4]/40 mb-20">
        <CruzDeHierro size={40} color="#5E1C23" className="mx-auto mb-4" />
        <span className="text-xs uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
          EL AMULETO Y EL ORIGEN FEMENINO
        </span>
        <blockquote className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide mt-3 leading-snug">
          “La Cruz de Hierro no es adorno. Es el vínculo silencioso entre la sabiduría del artesano de León y la mujer que camina sin pedir permiso.”
        </blockquote>
        <p className="mt-4 text-xs font-[SpaceGrotesk] text-[#849AAD] max-w-xl mx-auto">
          Concebida a partir de pieles genuinas seleccionadas por su grano natural, hormas calibradas al milímetro y construcción tradicional pensada para durar décadas.
        </p>
      </section>

      {/* 5 Narrative Territories */}
      <div id="territorios" className="space-y-28 mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#5E1C23] font-bold block mb-2">
            DIRECCIÓN EDITORIAL
          </span>
          <h2 className="font-archivo text-3xl sm:text-4xl text-[#605246] uppercase tracking-tight">
            LOS 5 TERRITORIOS NARRATIVOS
          </h2>
          <div className="w-12 h-0.5 bg-[#5E1C23] mx-auto mt-4" />
        </div>

        {CHAPTERS.map((ch, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={ch.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center"
            >
              {/* Media Block */}
              <div
                className={`lg:col-span-7 relative aspect-[4/3] overflow-hidden border border-[#B1C7D4]/60 shadow-lg ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={ch.image}
                  alt={`${ch.title} — ${ch.tagline}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover filter contrast-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[11px] font-[SpaceGrotesk] font-bold px-3 py-1.5 text-[#5E1C23] border border-[#B1C7D4]/60 tracking-wider">
                  {ch.territory}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-[10px] font-[SpaceGrotesk] font-semibold px-2.5 py-1 text-white border border-white/20 uppercase tracking-widest">
                  {ch.location}
                </div>
              </div>

              {/* Text Block */}
              <div
                className={`lg:col-span-5 space-y-5 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold block">
                  CAPÍTULO {ch.num} • {ch.location}
                </span>
                <h3 className="font-archivo text-3xl sm:text-4xl text-[#605246] uppercase leading-tight">
                  {ch.title}
                </h3>
                <h4 className="text-xs font-[SpaceGrotesk] uppercase tracking-wider text-[#5E1C23] font-bold">
                  {ch.tagline}
                </h4>
                <p className="text-sm font-[SpaceGrotesk] text-[#605246]/85 leading-relaxed">
                  {ch.description}
                </p>

                {/* Craft specs list */}
                <div className="pt-3 border-t border-[#B1C7D4]/40 space-y-2">
                  {ch.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs font-[SpaceGrotesk] text-[#849AAD]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5E1C23]" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Capsule Collection Preview */}
      <section className="mb-24 py-16 bg-[#F4F7F9] border border-[#B1C7D4]/50 px-6 sm:px-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#5E1C23] font-bold block mb-2">
            PRODUCCIÓN ARTESANAL
          </span>
          <h2 className="font-archivo text-2xl sm:text-4xl text-[#605246] uppercase tracking-tight">
            ADELANTO DE COLECCIÓN MUJER 2026
          </h2>
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] mt-3 max-w-xl mx-auto leading-relaxed">
            Siluetas exclusivas esculpidas en el taller matriz de León, Guanajuato. Cada modelo responde a una proporción anatómica depurada sin comprometer la solidez de la bota de trabajo tradicional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {UPCOMING_MODELS.map((model, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#B1C7D4]/60 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group"
            >
              <Link href={`/producto/${model.slug}`} className="relative aspect-[4/5] bg-white overflow-hidden p-4 border-b border-[#B1C7D4]/40 flex items-center justify-center block">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#5E1C23] text-white text-[9px] font-[SpaceGrotesk] font-bold px-2 py-0.5 tracking-wider uppercase">
                  {model.status}
                </span>
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-[SpaceGrotesk] uppercase tracking-widest text-[#849AAD]">
                      {model.category}
                    </span>
                    <span className="font-archivo text-sm text-[#5E1C23] font-bold">
                      ${model.price.toLocaleString("es-MX")} MXN
                    </span>
                  </div>
                  <Link href={`/producto/${model.slug}`}>
                    <h3 className="font-archivo text-base uppercase text-[#605246] hover:text-[#5E1C23] transition-colors mb-1 line-clamp-1">
                      {model.name}
                    </h3>
                  </Link>
                  <p className="text-[11px] font-[SpaceGrotesk] font-bold text-[#605246]/70 mb-2">
                    {model.leather}
                  </p>
                  <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed line-clamp-2">
                    {model.highlight}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#B1C7D4]/30 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-[SpaceGrotesk] text-[#849AAD]">
                    <span>Tallas: 22 - 27 MX</span>
                    <span className="text-[#5E1C23] font-bold">Goodyear Welt</span>
                  </div>
                  <Link
                    href={`/producto/${model.slug}`}
                    className="block w-full py-2 bg-[#F4F7F9] hover:bg-[#5E1C23] text-[#605246] hover:text-white border border-[#B1C7D4]/60 hover:border-[#5E1C23] text-[11px] font-[SpaceGrotesk] font-bold uppercase tracking-wider text-center transition-colors"
                  >
                    Ver Modelo & Comprar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/coleccion/bravio-mujer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#605246] hover:bg-[#4d4138] text-white text-xs font-[SpaceGrotesk] font-bold uppercase tracking-widest transition-colors shadow-xs"
          >
            <span>Explorar Catálogo Completo Mujer 2026</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Craftsmanship Highlights Grid */}
      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-[#B1C7D4]/60 bg-white space-y-4">
          <Gem className="w-7 h-7 text-[#5E1C23]" />
          <h3 className="font-archivo text-lg uppercase text-[#605246]">Pieles Nobles Seleccionadas</h3>
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
            Curadas a mano en León, Guanajuato. Vaquetas de res, nobuck aterciopelado y pieles enceradas que desarrollan una pátina irrepetible con cada kilómetro recorrido.
          </p>
        </div>

        <div className="p-8 border border-[#B1C7D4]/60 bg-white space-y-4">
          <ShieldCheck className="w-7 h-7 text-[#5E1C23]" />
          <h3 className="font-archivo text-lg uppercase text-[#605246]">Horma Anatómica Femenina</h3>
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
            Diseño ergonómico con puente reforzado y caja de puntera cómoda. Ajuste firme al empeine que proporciona estabilidad en asfalto sin fatigar el pie.
          </p>
        </div>

        <div className="p-8 border border-[#B1C7D4]/60 bg-white space-y-4">
          <Compass className="w-7 h-7 text-[#5E1C23]" />
          <h3 className="font-archivo text-lg uppercase text-[#605246]">El Amuleto Grabado</h3>
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
            La Cruz de Hierro sella cada bota en bajorrelieve. Símbolo de constancia, temple y dirección para no desviar el rumbo ante ningún desafío.
          </p>
        </div>
      </section>

      {/* VIP Registration Form (Notice of Launch) */}
      <div id="lista-espera" className="bg-[#605246] text-white p-10 md:p-14 text-center max-w-3xl mx-auto space-y-6 shadow-xl border border-[#B1C7D4]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <CruzDeHierro size={450} color="#FFFFFF" />
        </div>

        <div className="relative z-10 space-y-4">
          <Bell className="w-8 h-8 text-[#B1C7D4] mx-auto" />
          <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#B1C7D4] font-bold block">
            ACCESO VIP PRIORITARIO
          </span>
          <h3 className="font-archivo text-2xl sm:text-3xl uppercase tracking-wider text-white">
            LISTA DE ESPERA — COLECCIÓN MUJER 2026
          </h3>
          <p className="text-xs sm:text-sm font-[SpaceGrotesk] text-[#B1C7D4] max-w-lg mx-auto leading-relaxed">
            La producción del primer lote será estrictamente numerada y artesanal. Regístrate para recibir acceso prioritario 48 horas antes de la apertura pública y asegurar tu par en la talla exacta.
          </p>

          {registered ? (
            <div className="inline-flex items-center gap-2 text-xs text-emerald-200 bg-emerald-950/60 border border-emerald-500/40 px-6 py-3 font-bold font-[SpaceGrotesk]">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Registro confirmado para talla {sizePreference} MX. Te enviaremos tu clave de acceso VIP anticipado a {email}.</span>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-4 font-[SpaceGrotesk]">
              <select
                value={sizePreference}
                onChange={(e) => setSizePreference(e.target.value)}
                className="bg-white/10 border border-white/20 px-3.5 py-3 text-xs text-white focus:outline-none focus:border-white"
                title="Talla de calzado"
              >
                <option value="22" className="text-[#605246]">Talla 22 MX</option>
                <option value="22.5" className="text-[#605246]">Talla 22.5 MX</option>
                <option value="23" className="text-[#605246]">Talla 23 MX</option>
                <option value="23.5" className="text-[#605246]">Talla 23.5 MX</option>
                <option value="24" className="text-[#605246]">Talla 24 MX</option>
                <option value="24.5" className="text-[#605246]">Talla 24.5 MX</option>
                <option value="25" className="text-[#605246]">Talla 25 MX</option>
                <option value="25.5" className="text-[#605246]">Talla 25.5 MX</option>
                <option value="26" className="text-[#605246]">Talla 26 MX</option>
                <option value="26.5" className="text-[#605246]">Talla 26.5 MX</option>
                <option value="27" className="text-[#605246]">Talla 27 MX</option>
              </select>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico..."
                className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-xs text-white placeholder-white/60 focus:outline-none focus:border-white"
              />

              <button
                type="submit"
                className="px-6 py-3 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-bold tracking-widest uppercase transition-colors shadow-md border border-white/10 whitespace-nowrap"
              >
                Registrarme
              </button>
            </form>
          )}

          <p className="text-[10px] font-[SpaceGrotesk] text-white/50 pt-2">
            * Sin cargos preventivos. Garantía de cambio de talla sin costo adicional al recibir tus botas.
          </p>
        </div>
      </div>
    </div>
  );
}
