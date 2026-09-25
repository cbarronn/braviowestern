import type { Metadata } from "next";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Envíos y Devoluciones",
  description: "Información sobre envíos y devoluciones de BRAVÍO.",
};

export default function EnviosPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-[#B1C7D4]">
      <div className="bravio-container py-20">
        <div className="flex items-center gap-4 mb-4">
          <CruzDeHierro size={20} color="#5E1C23" />
          <p className="text-label-caps text-[#849AAD]">Información de compra</p>
        </div>
        <h1 className="font-archivo text-[#605246] mb-12"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: "0.9", letterSpacing: "-0.03em", textTransform: "uppercase" }}>
          ENVÍOS Y<br />DEVOLUCIONES.
        </h1>

        <div className="max-w-3xl space-y-20 mt-16">
          {/* Envíos */}
          <div className="border-t border-[#849AAD]/40 pt-12">
            <h2 className="font-[ArchivoBlack] text-[#605246] text-3xl uppercase tracking-tighter mb-8">Política de Envíos</h2>
            <div className="space-y-8 font-[SpaceGrotesk] text-[#605246] text-lg leading-[2.2] max-w-2xl">
              <p>
                En <strong>BRAVÍO</strong>, cada par de botas es inspeccionado cuidadosamente antes de abandonar nuestros talleres en León, Guanajuato. Nuestro compromiso es asegurar que recibas un producto de la más alta calidad en el menor tiempo posible.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Envíos Nacionales:</strong> Ofrecemos envío estándar gratuito a toda la República Mexicana en pedidos superiores a $2,500 MXN. El tiempo estimado de entrega es de 3 a 5 días hábiles.</li>
                <li><strong>Envíos Express:</strong> Disponible con un costo adicional calculado al momento del pago. El tiempo de entrega es de 1 a 2 días hábiles.</li>
                <li><strong>Procesamiento:</strong> Los pedidos realizados antes de las 13:00 hrs (Tiempo del Centro de México) se procesan el mismo día hábil.</li>
              </ul>
            </div>
          </div>

          {/* Devoluciones */}
          <div className="border-t border-[#849AAD]/40 pt-12">
            <h2 className="font-[ArchivoBlack] text-[#605246] text-3xl uppercase tracking-tighter mb-8">Política de Devoluciones</h2>
            <div className="space-y-8 font-[SpaceGrotesk] text-[#605246] text-lg leading-[2.2] max-w-2xl">
              <p>
                Queremos que camines con total seguridad. Si tu producto <strong>BRAVÍO</strong> no cumple con tus expectativas o requieres un cambio de talla, te ofrecemos un proceso de devolución sencillo y transparente.
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Plazo:</strong> Tienes 30 días naturales a partir de la fecha de entrega para solicitar una devolución o cambio de talla sin costo adicional.</li>
                <li><strong>Condiciones:</strong> El producto debe estar en su estado original, sin marcas de uso en la suela o el cuero, y en su empaque original completo.</li>
                <li><strong>Proceso:</strong> Inicia tu solicitud contactando a nuestro equipo de atención a clientes. Te generaremos una guía prepagada para que puedas entregar el paquete en la sucursal de paquetería más cercana.</li>
                <li><strong>Reembolsos:</strong> Una vez recibido e inspeccionado el producto, el reembolso se procesará a tu método de pago original en un plazo de 5 a 10 días hábiles.</li>
              </ul>
              <p className="mt-8 text-sm uppercase tracking-widest text-[#849AAD]">
                ¿Dudas adicionales? Escríbenos a <a href="mailto:hola@braviowestern.com.mx" className="underline hover:text-[#5E1C23] transition-colors">hola@braviowestern.com.mx</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
