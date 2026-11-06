import type { Metadata } from "next";
import Link from "next/link";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Guía de Tallas | BRAVÍO Western",
  description: "Guía de tallas BRAVÍO para botas de mujer y hombre. Calce fiel con horma oval artesanal.",
};

const TALLAS_MUJER = [
  { mx: "22", us: "4", eu: "34", cm: "22.0" },
  { mx: "23", us: "5", eu: "35", cm: "23.0" },
  { mx: "24", us: "6", eu: "36", cm: "24.0" },
  { mx: "25", us: "7", eu: "37", cm: "25.0" },
  { mx: "26", us: "8", eu: "38", cm: "26.0" },
  { mx: "27", us: "9", eu: "39", cm: "27.0" },
  { mx: "28", us: "10", eu: "40", cm: "28.0" },
];

const TALLAS_HOMBRE = [
  { mx: "25", us: "7", eu: "39", cm: "25.0" },
  { mx: "26", us: "8", eu: "40", cm: "26.0" },
  { mx: "27", us: "9", eu: "41", cm: "27.0" },
  { mx: "28", us: "10", eu: "42", cm: "28.0" },
  { mx: "29", us: "11", eu: "43", cm: "29.0" },
  { mx: "30", us: "12", eu: "44", cm: "30.0" },
];

export default function GuiaDeTallasPage() {
  return (
    <div className="pt-[90px] min-h-screen bg-white text-[#605246] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-b border-[#B1C7D4]/40">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={18} color="#5E1C23" />
            <span className="font-[SpaceGrotesk] text-[11px] uppercase tracking-[0.2em] text-[#849AAD] font-bold">
              Calibración de Calce
            </span>
          </div>
          <h1 className="font-archivo text-4xl sm:text-5xl text-[#605246] uppercase tracking-tight mb-4">
            GUÍA DE TALLAS.
          </h1>
          <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] max-w-xl leading-relaxed">
            Nuestras hormas son de calce fiel al calzado formal mexicano. Recomendamos colocar el pie sobre una hoja y medir del talón a la punta en centímetros.
          </p>
        </div>

        <div className="py-12 space-y-12">
          {[{ titulo: "Línea Dama", tallas: TALLAS_MUJER }, { titulo: "Línea Caballero (Botín Sinaloa)", tallas: TALLAS_HOMBRE }].map(({ titulo, tallas }) => (
            <div key={titulo} className="bg-white border border-[#B1C7D4]/60 p-6 sm:p-8 shadow-xs">
              <h2 className="font-archivo text-xl text-[#605246] uppercase tracking-wide mb-6 pb-3 border-b border-[#B1C7D4]/30">
                {titulo}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-[SpaceGrotesk] text-xs">
                  <thead>
                    <tr className="border-b border-[#B1C7D4]/40 text-[#849AAD] font-bold uppercase tracking-wider">
                      <th className="pb-3 pr-6">México (MX)</th>
                      <th className="pb-3 pr-6">Estados Unidos (US)</th>
                      <th className="pb-3 pr-6">Europa (EU)</th>
                      <th className="pb-3">Centímetros (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B1C7D4]/20">
                    {tallas.map((t) => (
                      <tr key={t.mx} className="hover:bg-[#F4F7F9]">
                        <td className="py-3.5 pr-6 font-archivo text-base text-[#605246]">{t.mx} MX</td>
                        <td className="py-3.5 pr-6 text-[#605246]">{t.us} US</td>
                        <td className="py-3.5 pr-6 text-[#605246]">{t.eu} EU</td>
                        <td className="py-3.5 font-mono text-[#5E1C23] font-bold">{t.cm} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border border-[#B1C7D4]/60 bg-[#F4F7F9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
            ¿Dudas sobre empeine alto o entretallas? Recuerda que tu <strong>primer cambio de talla es 100% gratuito</strong>.
          </p>
          <Link
            href="/contacto"
            className="px-6 py-2.5 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-[SpaceGrotesk] font-bold uppercase tracking-wider transition-colors shadow-xs flex-shrink-0"
          >
            Consultar al Taller
          </Link>
        </div>
      </div>
    </div>
  );
}
