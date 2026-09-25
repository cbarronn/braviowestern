import type { Metadata } from "next";
import { CruzDeHierro, BravioLogoApilado } from "@/components/ui/BravioLogo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finaliza tu compra en BRAVÍO.",
};

export default function CheckoutPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#B1C7D4]">
      <div className="bravio-container py-20">
        <div className="max-w-lg mx-auto text-center">
          <BravioLogoApilado variant="principal" width={120} height={98} className="mx-auto mb-8" />
          <div className="mb-6">
            <CruzDeHierro size={32} color="#5E1C23" className="mx-auto" />
          </div>
          <h1 className="font-archivo text-[#605246] mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: "0.95", letterSpacing: "-0.025em", textTransform: "uppercase" }}>
            CHECKOUT
          </h1>
          <div className="p-8 border border-[#849AAD]/40 bg-[#849AAD]/10 mb-8">
            <p className="font-[SpaceGrotesk] text-[#605246] leading-relaxed mb-4">
              El proceso de pago está en configuración.
            </p>
            <p className="text-sm font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              BRAVÍO está preparando su integración con pasarela de pagos. Cuando esté lista, podrás completar tu compra de forma segura aquí. Por ahora, no se procesarán transacciones reales.
            </p>
          </div>
          <p className="text-sm font-[SpaceGrotesk] text-[#849AAD] mb-8">
            ¿Tienes urgencia? Escríbenos directamente por WhatsApp o Instagram y te atendemos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/524770000000" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Escribir por WhatsApp
            </a>
            <Link href="/carrito" className="btn-outline text-[#605246] border-[#605246]">
              ← Regresar al Carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
