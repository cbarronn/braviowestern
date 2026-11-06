import type { Metadata } from "next";
import Link from "next/link";
import { CruzDeHierro } from "@/components/ui/BravioLogo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | BRAVÍO Western",
  description: "La historia de BRAVÍO: una marca mexicana de botas western contemporáneas nacida en León, Guanajuato.",
};

export default function NosotrosPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-white text-[#605246]">
      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-end overflow-hidden bg-[#605246]"
        aria-labelledby="nosotros-heading"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]" aria-hidden="true">
          <CruzDeHierro size={600} color="#B1C7D4" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 w-full">
          <div className="flex items-center gap-2 mb-4">
            <CruzDeHierro size={16} color="#5E1C23" />
            <p className="font-[SpaceGrotesk] text-[11px] uppercase tracking-[0.25em] text-[#B1C7D4] font-bold">
              Nuestra Historia
            </p>
          </div>
          <h1
            id="nosotros-heading"
            className="font-archivo text-white uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight"
          >
            WESTERN<br />PARA LA<br />VIDA ACTUAL.
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="historia-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-[SpaceGrotesk] text-[10px] tracking-[0.25em] uppercase text-[#5E1C23] font-bold block mb-2">
              León, Guanajuato
            </span>
            <h2
              id="historia-heading"
              className="font-archivo text-[#605246] mb-8 text-3xl sm:text-4xl uppercase tracking-tight"
            >
              BRAVÍO nació<br />en León.
            </h2>
            <div className="space-y-6 font-[SpaceGrotesk] text-[#605246]/80 leading-relaxed text-sm sm:text-base">
              <p>
                León, Guanajuato. Capital mundial del calzado. De ahí viene la piel, el oficio y la historia de BRAVÍO.
              </p>
              <p>
                No somos una marca de disfraces. Somos una marca que toma lo mejor de la tradición western y lo lleva a la vida que ya se vive: activa, urbana, contemporánea y con raíz.
              </p>
              <p>
                Cada par de botas BRAVÍO es una pieza de manufactura artesanal. Construcción verificable mediante más de doscientos pasos y costura Goodyear Welt 360°.
              </p>
              <p>
                El amuleto que nos acompaña es la Cruz de Hierro. No como un elemento decorativo aproximado, sino como una marca de temple y autenticidad.
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/coleccion"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-[SpaceGrotesk] font-bold uppercase tracking-[0.15em] transition-colors shadow-sm"
              >
                Conocer la Colección <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-12 bg-[#F4F7F9] border border-[#B1C7D4]/50 shadow-xs">
            <CruzDeHierro size={140} color="#5E1C23" />
            <p className="mt-6 font-archivo text-[#605246] uppercase text-sm tracking-wider text-center">
              Construcción Tradicional.<br />Presencia Contemporánea.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
