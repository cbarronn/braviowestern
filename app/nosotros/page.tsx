import type { Metadata } from "next";
import { CruzDeHierro, BravioLogoApilado } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "La historia de BRAVÍO: una marca mexicana de botas western contemporáneas nacida en León, Guanajuato.",
};

export default function NosotrosPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#B1C7D4]">
      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{ background: "linear-gradient(135deg, #605246 0%, #1A1410 100%)" }}
        aria-labelledby="nosotros-heading"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]" aria-hidden="true">
          <CruzDeHierro size={600} color="#B1C7D4" />
        </div>
        <div className="bravio-container relative z-10 pb-20">
          <p className="text-label-caps text-[#849AAD] mb-6">La historia</p>
          <h1
            id="nosotros-heading"
            className="font-archivo text-[#B1C7D4]"
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: "0.9",
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            WESTERN<br />PARA LA<br />VIDA ACTUAL.
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bravio-section" aria-labelledby="historia-heading" style={{ paddingTop: "clamp(4rem, 8vw, 8rem)" }}>
        <div className="bravio-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2
                id="historia-heading"
                className="font-archivo text-[#605246] mb-8"
                style={{
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  lineHeight: "0.95",
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                }}
              >
                BRAVÍO nació<br />en León.
              </h2>
              <div className="space-y-6 font-[SpaceGrotesk] text-[#605246] leading-relaxed">
                <p>
                  León, Guanajuato. Capital mundial del calzado. De ahí viene la piel, el oficio y la historia de BRAVÍO.
                </p>
                <p>
                  No somos una marca de disfraces. Somos una marca que toma lo mejor de la tradición western y lo lleva a la vida que ya se vive: activa, urbana, contemporánea y con raíz.
                </p>
                <p>
                  Cada par de botas BRAVÍO es una pieza de manufactura artesanal. No una promesa de lujo. Una garantía de oficio.
                </p>
                <p>
                  El amuleto que nos acompaña es la Cruz de Hierro. No como un símbolo decorativo: como una marca de identidad.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center py-12">
              <CruzDeHierro size={120} color="#5E1C23" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
