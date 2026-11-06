import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-white text-[#605246] pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] uppercase tracking-widest text-[#849AAD] hover:text-[#605246] transition-colors font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CruzDeHierro size={16} color="#5E1C23" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#849AAD] font-[SpaceGrotesk] font-bold">
            Herencia & Oficio
          </span>
        </div>
        <h1 className="font-archivo text-4xl sm:text-5xl text-[#605246] uppercase tracking-tight mt-2 leading-tight">
          EL ORIGEN DE BRAVÍO EN LEÓN GUANAJUATO
        </h1>
        <p className="text-base font-[SpaceGrotesk] text-[#849AAD] mt-4 leading-relaxed">
          Rediseñando la bota vaquera para la vida actual, sin olvidar un solo principio de la zapatería artesanal mexicana.
        </p>
      </div>

      {/* Featured Photo */}
      <div className="relative aspect-[16/9] overflow-hidden border border-[#B1C7D4]/50 mb-16 shadow-lg bg-white">
        <img
          src="/products/bota-suela-zipper.jpg"
          alt="Taller de calzado artesanal en León Gto"
          className="w-full h-full object-cover object-center filter contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white font-[SpaceGrotesk]">
          <span className="text-xs uppercase tracking-widest text-[#B1C7D4] block mb-1">
            Manufactura de León, Gto.
          </span>
          <p className="font-archivo text-lg uppercase tracking-wider">
            Taller Tradicional Goodyear Welt
          </p>
        </div>
      </div>

      {/* Narrative blocks */}
      <div className="space-y-12 font-[SpaceGrotesk] text-sm sm:text-base text-[#605246]/80 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="p-6 bg-[#F4F7F9] border border-[#B1C7D4]/40 shadow-xs">
            <h2 className="font-archivo text-lg text-[#605246] uppercase tracking-wide mb-3">
              1. No es la bota que guardas, es la que te pones
            </h2>
            <p>
              Durante generaciones, la bota vaquera quedó encasillada en rodeos, ferias y ocasiones aisladas. BRAVÍO nació con una convicción clara: la bota es la prenda de calzado más noble, protectora y con carácter que existe. Nuestro propósito es llevarla al asfalto de las grandes capitales, al estudio, a la oficina y al viaje.
            </p>
          </div>
          <div className="p-6 bg-[#F4F7F9] border border-[#B1C7D4]/40 shadow-xs">
            <h2 className="font-archivo text-lg text-[#605246] uppercase tracking-wide mb-3">
              2. La capital zapatera de América
            </h2>
            <p>
              León, Guanajuato es el epicentro donde converge la mayor concentración de artesanos zapateros del continente. En nuestro taller no hay prisas ni líneas de producción deshumanizadas: cada par pasa por más de doscientas operaciones manuales ejecutadas por hombres y mujeres que heredaron el oficio de sus familias.
            </p>
          </div>
        </div>

        <div className="p-8 bg-white border border-[#B1C7D4]/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <CruzDeHierro size={18} color="#5E1C23" />
            <h3 className="font-archivo text-lg text-[#605246] uppercase tracking-wider">
              La Construcción Goodyear Welt 360°
            </h3>
          </div>
          <p className="text-sm text-[#849AAD]">
            A diferencia del calzado industrial pegado que se desgasta y desecha a los pocos meses, una bota Goodyear Welt une la capellada, el forro y la plantilla mediante una costura perimetral continua de hilo encerado. Esto crea una cavidad rellenada con corcho natural que se amolda a la pisada de tu pie y permite resolar la bota las veces que sea necesario a lo largo de los años.
          </p>
          <div className="flex justify-end pt-2">
            <Link
              href="/coleccion"
              className="inline-flex items-center gap-2 text-xs font-[SpaceGrotesk] font-bold tracking-widest uppercase text-[#5E1C23] hover:text-[#47151a]"
            >
              <span>Ver las botas confeccionadas con esta técnica</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
