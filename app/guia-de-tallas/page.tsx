import type { Metadata } from "next";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Guía de Tallas",
  description: "Guía de tallas BRAVÍO para botas de mujer y hombre. Encuentra tu talla perfecta.",
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
    <div className="pt-[72px] min-h-screen bg-[#B1C7D4]">
      <div className="bravio-container py-20">
        <div className="flex items-center gap-4 mb-4">
          <CruzDeHierro size={20} color="#5E1C23" />
          <p className="text-label-caps text-[#849AAD]">Información de compra</p>
        </div>
        <h1 className="font-archivo text-[#605246] mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: "0.9", letterSpacing: "-0.03em", textTransform: "uppercase" }}>
          GUÍA DE<br />TALLAS.
        </h1>
        <p className="font-[SpaceGrotesk] text-[#849AAD] mb-16 max-w-lg">
          Medición recomendada: coloca el pie descalzo sobre una hoja, traza el contorno y mide la distancia del talón a la punta del dedo más largo en centímetros.
        </p>

        <div className="space-y-16">
          {[{ titulo: "Mujer", tallas: TALLAS_MUJER }, { titulo: "Hombre", tallas: TALLAS_HOMBRE }].map(({ titulo, tallas }) => (
            <div key={titulo}>
              <h2 className="font-archivo text-[#605246] text-2xl uppercase tracking-tight mb-6">{titulo}</h2>
              <div className="overflow-x-auto" data-lenis-prevent>
                <table className="w-full min-w-[400px]" aria-label={`Tallas ${titulo}`}>
                  <thead>
                    <tr className="border-b border-[#849AAD]/40">
                      {["México (MX)", "Estados Unidos (US)", "Europa (EU)", "Centímetros (cm)"].map((h) => (
                        <th key={h} className="text-left text-label-caps text-[#849AAD] pb-4 pr-8 font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tallas.map((t, i) => (
                      <tr key={t.mx} className={`border-b ${i % 2 === 0 ? "border-[#849AAD]/20" : "border-transparent bg-[#849AAD]/5"}`}>
                        <td className="py-4 pr-8 font-archivo text-[#605246] text-lg">{t.mx}</td>
                        <td className="py-4 pr-8 font-[SpaceGrotesk] text-[#605246]">{t.us}</td>
                        <td className="py-4 pr-8 font-[SpaceGrotesk] text-[#605246]">{t.eu}</td>
                        <td className="py-4 pr-8 font-[SpaceGrotesk] text-[#605246]">{t.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border border-[#849AAD]/40 bg-[#849AAD]/10">
          <p className="text-sm font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
            Si tienes dudas sobre tu talla, escríbenos a través de la página de{" "}
            <a href="/contacto" className="underline hover:text-[#605246] transition-colors">Contacto</a>{" "}
            y te ayudamos a encontrar el par perfecto.
          </p>
        </div>
      </div>
    </div>
  );
}
