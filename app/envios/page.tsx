import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, MapPin, ArrowRight } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export const metadata: Metadata = {
  title: "Política de Envíos Nacionales | BRAVÍO",
  description: "Envíos asegurados a toda la República Mexicana desde nuestro taller en León, Guanajuato.",
};

export default function EnviosPage() {
  return (
    <div className="pt-[90px] min-h-screen bg-[#0F0C09] text-[#B1C7D4] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 border-b border-[#605246]/20">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD]">
              Logística Nacional
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-5xl text-[#B1C7D4] uppercase tracking-tight mb-4">
            POLÍTICA DE ENVÍOS.
          </h1>
          <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] max-w-2xl leading-relaxed">
            Cada par de botas BRAVÍO es empacado y despachado de forma directa desde nuestros talleres artesanales en León, Guanajuato.
          </p>
        </div>

        {/* 3 Core Highlights */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#605246]/20">
          <div className="bg-[#16120E] p-6 border border-[#605246]/30">
            <Truck size={24} className="text-[#5E1C23] mb-3" />
            <h3 className="font-archivo text-sm text-[#B1C7D4] uppercase mb-1">Envío Gratis</h3>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              En todas las compras superiores a <strong>$3,500 MXN</strong> a cualquier código postal del país.
            </p>
          </div>

          <div className="bg-[#16120E] p-6 border border-[#605246]/30">
            <Clock size={24} className="text-[#5E1C23] mb-3" />
            <h3 className="font-archivo text-sm text-[#B1C7D4] uppercase mb-1">3 a 5 Días Hábiles</h3>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              Tiempo estimado de tránsito terrestre nacional mediante paqueterías líderes aseguradas.
            </p>
          </div>

          <div className="bg-[#16120E] p-6 border border-[#605246]/30">
            <ShieldCheck size={24} className="text-[#5E1C23] mb-3" />
            <h3 className="font-archivo text-sm text-[#B1C7D4] uppercase mb-1">100% Asegurado</h3>
            <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] leading-relaxed">
              Tu paquete viaja con cobertura contra pérdida o daño hasta la puerta de tu domicilio.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="py-12 space-y-10 font-[SpaceGrotesk] text-sm text-[#849AAD] leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide">
              1. Cobertura y Paqueterías Autorizadas
            </h2>
            <p>
              Realizamos envíos a toda la República Mexicana. Operamos con alianzas directas con las principales redes de paquetería del país: <strong>FedEx, DHL Express, Estafeta y Redpack</strong>, seleccionando la opción con el mejor tiempo de tránsito para tu código postal específico.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide">
              2. Costos de Envío
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#B1C7D4]">Pedidos a partir de $3,500 MXN:</strong> Envío estándar nacional sin costo adicional (GRATUITO).
              </li>
              <li>
                <strong className="text-[#B1C7D4]">Pedidos menores a $3,500 MXN:</strong> Tarifa fija nacional de $190 MXN (IVA incluido).
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide">
              3. Tiempos de Preparación y Despacho
            </h2>
            <p>
              Los pedidos completados de lunes a viernes antes de las 13:00 hrs (Tiempo del Centro de México) entran a inspección final de calidad y se despachan en un plazo máximo de 24 a 48 horas hábiles.
            </p>
            <p>
              Los pedidos registrados en fines de semana o días festivos oficiales se preparan el día hábil inmediato siguiente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide">
              4. Notificación y Rastreo en Vivo
            </h2>
            <p>
              Al momento en que la paquetería recolecta tu caja en el taller, nuestro sistema enviará automáticamente a tu correo electrónico el número de rastreo oficial. Podrás consultar el avance de tu entrega en cualquier momento desde nuestra plataforma en{" "}
              <Link href="/rastreo" className="text-[#B1C7D4] underline hover:text-white">
                braviowestern.com.mx/rastreo
              </Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-archivo text-xl text-[#B1C7D4] uppercase tracking-wide">
              5. Intentos de Entrega y Zonas Extendidas
            </h2>
            <p>
              La paquetería realizará hasta 2 o 3 intentos de entrega en tu domicilio. Si el destino corresponde a una zona extendida o de difícil acceso, el plazo de entrega puede prolongarse entre 2 y 4 días adicionales conforme a las frecuencias de la empresa transportista.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-[#605246]/20 flex flex-wrap justify-between items-center gap-4">
          <Link
            href="/cambios-y-devoluciones"
            className="text-xs font-[SpaceGrotesk] uppercase tracking-wider text-[#849AAD] hover:text-[#B1C7D4] flex items-center gap-2"
          >
            <span>Consultar Cambios y Devoluciones</span> <ArrowRight size={12} />
          </Link>
          <Link
            href="/coleccion"
            className="px-6 py-3 bg-[#5E1C23] hover:bg-[#72232b] text-white font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
