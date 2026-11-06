import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Droplets, SunMedium, ShieldAlert, ArrowRight } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Cuidado y Mantenimiento de Pieles | BRAVÍO",
  description: "Guía técnica para preservar la vida útil y la pátina natural de tus botas de piel BRAVÍO.",
};

const LEATHER_GUIDES = [
  {
    type: "Gamuza y Nubuck (Piel de Venado / Res Aterciopelada)",
    tag: "Textura Suave",
    cleaning: "Nunca usar agua directa ni jabones líquidos. Utilizar exclusivamente un cepillo de cerdas de latón suave o crin de caballo en movimientos unidireccionales para levantar el polvo.",
    hydration: "No aplicar ceras, grasas de caballo ni betunes (arruinan el grano aterciopelado). Aplicar spray impermeabilizante hidrofóbico neutro a 20 cm de distancia una vez al mes.",
    emergency: "En caso de mancha por líquido, colocar talco o fécula de maíz de inmediato para absorber la humedad, dejar secar a la sombra y cepillar suavemente.",
  },
  {
    type: "Piel Vacuno Grasa y Pull-Up (Crazy Horse / Aceitada)",
    tag: "Acabado Envejecido",
    cleaning: "Retirar el exceso de tierra con un trapo de algodón seco. Si la piel tiene lodo seco, pasar un trapo ligeramente humedecido con agua tibia sin frotar agresivamente.",
    hydration: "Esta piel vive del aceite. Aplicar crema acondicionadora neutra para piel o bálsamo de cera de abejas cada 3 a 6 meses con movimientos circulares usando los dedos o un paño suave.",
    emergency: "Los raspones superficiales se difuminan frotando con la yema del pulgar; el calor corporal redistribuye los aceites naturales de la flor de piel.",
  },
  {
    type: "Flor Entera y Piel Semibrillante",
    tag: "Clásico y Formal",
    cleaning: "Cepillar con crin de caballo para eliminar residuos. Limpiar con paño húmedo bien escurrido y dejar secar a temperatura ambiente.",
    hydration: "Aplicar crema humectante para calzado de tono correspondiente o neutro. Dejar reposar 15 minutos y lustrar con cepillo o paño de franela para reactivar el lustre natural.",
    emergency: "No utilizar alcohol, acetona ni toallitas desmaquillantes bajo ninguna circunstancia.",
  },
  {
    type: "Pieles Exóticas (Avestruz, Caimán y Lagarto)",
    tag: "Estructura Escamada y Poro Fino",
    cleaning: "Cepillo extra suave en el sentido natural de las escamas o folículos para evitar levantar las uniones dérmicas.",
    hydration: "Utilizar acondicionador formulado específicamente para pieles exóticas (sin base de petróleo ni solventes). La piel exótica tiende a resecarse si no se hidrata con regularidad.",
    emergency: "Mantener siempre alejado de fuentes de calor directo (radiadores, estufas o secadoras de pelo) ya que las escamas se vuelven quebradizas.",
  },
];

export default function CuidadosPage() {
  return (
    <div className="pt-[90px] min-h-screen bg-[#0F0C09] text-[#B1C7D4] pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 border-b border-[#605246]/20">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD]">
              Mantenimiento Artesanal
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-5xl lg:text-6xl text-[#B1C7D4] uppercase tracking-tight mb-4">
            CUIDADO DE TUS BOTAS.
          </h1>
          <p className="font-[SpaceGrotesk] text-sm sm:text-base text-[#849AAD] max-w-2xl leading-relaxed">
            Una bota con construcción Goodyear Welt 360° está diseñada para acompañarte por años. Con el mantenimiento adecuado de la piel, la pieza envejecerá desarrollando una pátina única y memorable.
          </p>
        </div>

        {/* 4 Golden Rules */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-[#605246]/20">
          <div className="bg-[#16120E] p-6 border border-[#605246]/30">
            <SunMedium size={24} className="text-[#5E1C23] mb-3" />
            <h3 className="font-archivo text-sm text-[#B1C7D4] uppercase mb-2">Secado a la Sombra</h3>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              Si tus botas se empapan de lluvia, déjalas secar en un lugar ventilado y techado. Jamás las acerques al fuego o al sol directo.
            </p>
          </div>

          <div className="bg-[#16120E] p-6 border border-[#605246]/30">
            <Sparkles size={24} className="text-[#5E1C23] mb-3" />
            <h3 className="font-archivo text-sm text-[#B1C7D4] uppercase mb-2">Hormas de Cedro</h3>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              Usar hormas de madera de cedro al guardarlas absorbe el sudor interno, evita que la puntera se deforme y previene malos olores.
            </p>
          </div>

          <div className="bg-[#16120E] p-6 border border-[#605246]/30">
            <Droplets size={24} className="text-[#5E1C23] mb-3" />
            <h3 className="font-archivo text-sm text-[#B1C7D4] uppercase mb-2">Rotación de Uso</h3>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              Evita usar el mismo par dos días consecutivos si caminas jornadas intensas. La plantilla de piel vegetal necesita 24 horas para respirar.
            </p>
          </div>

          <div className="bg-[#16120E] p-6 border border-[#605246]/30">
            <ShieldAlert size={24} className="text-[#5E1C23] mb-3" />
            <h3 className="font-archivo text-sm text-[#B1C7D4] uppercase mb-2">Resuela Oportuna</h3>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              Al contar con cerco cosido Goodyear, puedes cambiar la suela de vaqueta cuantas veces sea necesario antes de que el desgaste toque el cerco.
            </p>
          </div>
        </div>

        {/* Detailed Guides by Material */}
        <div className="py-12 space-y-8">
          <h2 className="font-archivo text-2xl text-[#B1C7D4] uppercase tracking-tight">
            INSTRUCCIONES ESPECÍFICAS POR TIPO DE PIEL
          </h2>

          <div className="space-y-6">
            {LEATHER_GUIDES.map((g, idx) => (
              <div key={idx} className="bg-[#16120E] border border-[#605246]/30 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#605246]/20">
                  <h3 className="font-archivo text-lg sm:text-xl text-[#B1C7D4] uppercase">
                    {g.type}
                  </h3>
                  <span className="px-3 py-1 bg-[#0F0C09] border border-[#605246]/40 text-[10px] font-[SpaceGrotesk] uppercase tracking-[0.15em] text-[#849AAD]">
                    {g.tag}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-[SpaceGrotesk] text-xs">
                  <div>
                    <h4 className="font-bold text-[#B1C7D4] uppercase tracking-wider mb-2 text-[11px] text-[#5E1C23]">
                      Limpieza Rutinaria
                    </h4>
                    <p className="text-[#849AAD] leading-relaxed">{g.cleaning}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#B1C7D4] uppercase tracking-wider mb-2 text-[11px] text-[#5E1C23]">
                      Hidratación & Cera
                    </h4>
                    <p className="text-[#849AAD] leading-relaxed">{g.hydration}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#B1C7D4] uppercase tracking-wider mb-2 text-[11px] text-[#5E1C23]">
                      Emergencias & Manchas
                    </h4>
                    <p className="text-[#849AAD] leading-relaxed">{g.emergency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assistance CTA */}
        <div className="mt-8 p-8 bg-[#16120E] border border-[#605246]/40 text-center">
          <CruzDeHierro size={28} color="#5E1C23" className="mx-auto mb-3" />
          <h3 className="font-archivo text-xl text-[#B1C7D4] uppercase mb-2">
            ¿Tienes dudas con un par específico?
          </h3>
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] max-w-lg mx-auto mb-6">
            Escríbenos a nuestro equipo de taller en León, Guanajuato. Te asesoramos directamente sobre productos de limpieza recomendados.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F0C09] hover:bg-[#605246]/20 border border-[#605246]/50 text-xs font-[SpaceGrotesk] font-bold text-[#B1C7D4] uppercase tracking-[0.15em] transition-colors"
          >
            Contactar al Taller <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

