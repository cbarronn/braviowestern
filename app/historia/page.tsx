import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-bravio-volcanic py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-bravio-cloudy hover:text-bravio-bone transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
          HERENCIA & PROPÓSITO
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-bravio-bone uppercase tracking-wide mt-2 leading-tight">
          EL ORIGEN DE BRAVÍO EN LEÓN GUANAJUATO
        </h1>
        <p className="text-base text-bravio-cloudy mt-4 leading-relaxed font-light">
          Rediseñando la bota vaquera para la vida actual, sin olvidar un solo principio de la zapatería artesanal mexicana.
        </p>
      </div>

      {/* Featured Photo */}
      <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-bravio-volcanic-border mb-16 shadow-2xl">
        <img
          src="/products/bota-suela-zipper.jpg"
          alt="Taller de calzado artesanal en León Gto"
          className="w-full h-full object-cover object-center filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bravio-volcanic via-transparent to-transparent" />
      </div>

      {/* Narrative blocks */}
      <div className="prose prose-invert max-w-none space-y-12 text-bravio-cloudy font-sans text-sm sm:text-base leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="font-display text-xl text-bravio-bone uppercase tracking-wide mb-3">
              1. No es un disfraz
            </h2>
            <p>
              Durante generaciones, la bota vaquera quedó encasillada en rodeos, ferias y escenarios folclóricos. BRAVÍO nació con una convicción clara: la bota es la prenda de calzado más noble, protectora y elegante que un ser humano puede calzar. Nuestro objetivo es llevarla al asfalto de las grandes capitales, al estudio, a la oficina y al viaje.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl text-bravio-bone uppercase tracking-wide mb-3">
              2. La capital zapatera de América
            </h2>
            <p>
              León, Guanajuato es el epicentro donde converge la mayor concentración de artesanos zapateros del continente. En nuestro taller no hay prisas ni líneas de producción deshumanizadas: cada par pasa por más de doscientas operaciones manuales ejecutadas por hombres y mujeres que heredaron el oficio de sus padres.
            </p>
          </div>
        </div>

        <div className="p-8 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded-sm">
          <h3 className="font-display text-lg text-bravio-bone uppercase tracking-wider mb-2">
            La Promesa Goodyear Welt
          </h3>
          <p className="text-sm text-bravio-cloudy/90 mb-4">
            A diferencia del calzado industrial pegado que se desecha a los pocos meses, una bota Goodyear Welt une la capellada, el forro y la plantilla mediante una costura continua de hilo encerado. Esto crea una cavidad rellenada con corcho natural que se amolda a la pisada de tu pie y permite resolar la bota las veces que sea necesario.
          </p>
          <div className="flex justify-end">
            <Link
              href="/coleccion/sinaloa"
              className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-bravio-gold hover:text-bravio-bone"
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

