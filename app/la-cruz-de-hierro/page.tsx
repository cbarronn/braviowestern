import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, ShieldCheck, Hammer } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "La Cruz de Hierro | El Amuleto BRAVÍO",
  description: "El símbolo fundacional de BRAVÍO. Tradición, dirección y carácter en cada paso.",
};

export default function CruzDeHierroPage() {
  return (
    <div className="pt-[90px] min-h-screen bg-white text-[#605246]">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-b border-[#B1C7D4]/40">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 border border-[#B1C7D4]/60 bg-[#F4F7F9] mb-8">
          <CruzDeHierro size={16} color="#5E1C23" />
          <span className="text-[11px] font-[SpaceGrotesk] tracking-[0.2em] text-[#849AAD] uppercase font-bold">
            Símbolo Fundacional
          </span>
        </div>

        <h1 className="font-archivo text-4xl sm:text-6xl lg:text-7xl text-[#605246] uppercase tracking-tight leading-none mb-6">
          LA CRUZ DE HIERRO.
        </h1>

        <p className="font-[SpaceGrotesk] text-lg sm:text-xl text-[#849AAD] max-w-2xl mx-auto leading-relaxed">
          No es un adorno. Es un ancla. El recordatorio forjado en metal de quién eres, de dónde vienes y hacia dónde te diriges.
        </p>

        <div className="mt-12 flex justify-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#B1C7D4] bg-[#F4F7F9] flex items-center justify-center p-6 shadow-md relative">
            <CruzDeHierro size={72} color="#5E1C23" />
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] bg-white border border-[#B1C7D4]/60 overflow-hidden shadow-sm">
            <Image
              src="/brand/image1.png"
              alt="La Cruz de Hierro BRAVÍO"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.15em] text-[#B1C7D4]">
                Forjado y ensamble
              </p>
              <p className="font-archivo text-base uppercase">
                León, Guanajuato
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#5E1C23] font-bold">
              01 · EL ORIGEN
            </span>
            <h2 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-tight">
              UN PESO QUE SOSTIENE
            </h2>
            <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed">
              En las rutas históricas del Bajío mexicano, los herreros y talabarteros no creaban objetos para exhibir, sino herramientas capaces de resistir el polvo, el barro y la marcha interminable.
            </p>
            <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed">
              La Cruz de Hierro nació como una marca de taller: la señal de que una pieza había sido revisada al milímetro, remachada con temple y destinada a no rajarse jamás frente a la marcha cotidiana.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#5E1C23] font-bold">
              02 · EL AMULETO URBANO
            </span>
            <h2 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-tight">
              WESTERN PARA LA VIDA ACTUAL
            </h2>
            <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed">
              Hoy no caminamos sobre senderos de terracería todo el día. Pisamos banquetas rotas, concreto pulido, salas de juntas, asfalto lluvioso y hangares de trabajo.
            </p>
            <p className="text-sm font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed">
              La Cruz de Hierro acompaña esa transición: un elemento sobrio y discreto grabado en cada bota BRAVÍO que funciona como un amuleto personal de temple y convicción.
            </p>
          </div>

          <div className="relative aspect-[4/5] bg-white border border-[#B1C7D4]/60 overflow-hidden shadow-sm order-1 md:order-2">
            <Image
              src="/brand/image2.png"
              alt="El amuleto en la vida urbana"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.15em] text-[#B1C7D4]">
                Presencia urbana
              </p>
              <p className="font-archivo text-base uppercase">
                Monterrey / Ciudad de México
              </p>
            </div>
          </div>
        </div>

        {/* The 3 Pillars */}
        <div className="pt-12 border-t border-[#B1C7D4]/40">
          <div className="text-center mb-12">
            <h3 className="font-archivo text-2xl text-[#605246] uppercase tracking-tight">
              LOS TRES PRINCIPIOS DEL SÍMBOLO
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F4F7F9] border border-[#B1C7D4]/50 shadow-xs">
              <Compass size={24} className="text-[#5E1C23] mb-4" />
              <h4 className="font-archivo text-base text-[#605246] uppercase mb-2">Dirección</h4>
              <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
                Cuatro brazos iguales orientados a no perder el norte sin importar lo áspero del terreno.
              </p>
            </div>

            <div className="p-6 bg-[#F4F7F9] border border-[#B1C7D4]/50 shadow-xs">
              <Hammer size={24} className="text-[#5E1C23] mb-4" />
              <h4 className="font-archivo text-base text-[#605246] uppercase mb-2">Construcción</h4>
              <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
                El sello que valida más de doscientos pasos artesanales y costura Goodyear Welt 360°.
              </p>
            </div>

            <div className="p-6 bg-[#F4F7F9] border border-[#B1C7D4]/50 shadow-xs">
              <ShieldCheck size={24} className="text-[#5E1C23] mb-4" />
              <h4 className="font-archivo text-base text-[#605246] uppercase mb-2">Carácter</h4>
              <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
                La certeza de llevar un calzado honesto, firme y hecho para usarse todos los días.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center py-12">
          <Link
            href="/coleccion"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#5E1C23] hover:bg-[#47151a] text-white font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors shadow-sm"
          >
            Ver la Colección <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
