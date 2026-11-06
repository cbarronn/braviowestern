"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

const FAQ_CATEGORIES = [
  {
    category: "Tallas y Calce",
    questions: [
      {
        q: "¿Cómo vienen las tallas de las botas BRAVÍO?",
        a: "Nuestras botas están calibradas con horma mexicana estándar (MX). Al ser construcción tradicional de piel vacuno con forro de flor de cerdo, el calce es fiel a la talla. Si normalmente calzas 27 MX en zapato formal o de vestir, esa misma talla es la recomendada en BRAVÍO.",
      },
      {
        q: "¿Qué talla debo elegir si calzo número medio (ejemplo 27.5 MX)?",
        a: "Si estás entre dos tallas o tienes el empeine ancho/alto, te recomendamos elegir el número superior (28 MX). La piel cederá ligeramente con los primeros días de uso amoldándose a la anatomía de tu pie.",
      },
      {
        q: "¿Las botas se aflojan con el tiempo?",
        a: "La piel natural tiene memoria elástica: no aumentará de longitud pero sí se adaptará a la anchura del metatarso y la curva del empeine después de 3 a 5 puestas.",
      },
    ],
  },
  {
    category: "Envíos y Entregas",
    questions: [
      {
        q: "¿Cuánto tarda en llegar mi pedido?",
        a: "Los envíos se procesan directamente desde nuestro taller en León, Guanajuato. El tiempo de tránsito habitual es de 3 a 5 días hábiles a cualquier código postal con cobertura terrestre en la República Mexicana.",
      },
      {
        q: "¿El envío tiene costo?",
        a: "El envío es completamente GRATUITO en compras a partir de $3,500 MXN. Para pedidos por debajo de este monto, la tarifa estándar nacional es de $190 MXN a través de FedEx, DHL o Estafeta asegurada.",
      },
      {
        q: "¿Cómo puedo rastrear mi paquete?",
        a: "Una vez que tu par es empacado y la guía se genera en León Gto, recibirás un correo electrónico con tu número de guía. También puedes ingresar tu folio 'BW-XXXXXX' y correo en nuestra sección de /rastreo para ver las 5 etapas del envío en tiempo real.",
      },
    ],
  },
  {
    category: "Cambios y Garantías",
    questions: [
      {
        q: "¿Qué pasa si no me queda la talla que ordené?",
        a: "Tu primer cambio de talla es 100% GRATUITO. Nosotros te proporcionamos la guía de retorno prepagada para devolver el par a nuestro taller y te enviamos la nueva talla sin costo extra.",
      },
      {
        q: "¿Cuál es el plazo para solicitar un cambio o devolución?",
        a: "Cuentas con 30 días naturales a partir del momento en que la paquetería entrega el paquete en tu domicilio para solicitar un cambio o devolución.",
      },
      {
        q: "¿Cuáles son las condiciones para que aplique el cambio?",
        a: "La bota debe encontrarse en estado nuevo, sin marcas de desgaste en la suela de vaqueta (te sugerimos probártelas sobre alfombra o cartón liso) y con su caja y empaques originales completos.",
      },
    ],
  },
  {
    category: "Construcción y Materiales",
    questions: [
      {
        q: "¿Qué significa construcción Goodyear Welt 360°?",
        a: "Es el método más riguroso de fabricación de calzado en el mundo. La parte superior de la bota (corte) y la plantilla se cosen a una tira perimetral de cuero (cerco) mediante un hilo encerado resistente, y luego la suela se une a ese cerco. Esto hace a la bota impermeable por la base, sumamente resistente y resolable infinidad de veces sin alterar la estructura superior.",
      },
      {
        q: "¿Dónde se producen las botas BRAVÍO?",
        a: "Todas las botas BRAVÍO se construyen en León, Guanajuato, capital histórica del calzado en México, por maestros artesanos zapateros con décadas de tradición en el oficio.",
      },
      {
        q: "¿Las pieles son auténticas?",
        a: "Absolutamente sí. Empleamos pieles vacunas de primera selección, gamuzas genuinas y pieles exóticas con certificados CITES de procedencia legal y sustentable.",
      },
    ],
  },
  {
    category: "Pagos y Facturación",
    questions: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) procesadas de manera encriptada con Mercado Pago, así como transferencia directa SPEI con confirmación automática bancaria.",
      },
      {
        q: "¿Puedo solicitar factura fiscal mexicana (CFDI)?",
        a: "Sí. Todos nuestros precios incluyen IVA. Al completar tu pedido o en tu correo de confirmación encontrarás el enlace para generar tu CFDI 4.0 ingresando tus datos fiscales y RFC.",
      },
    ],
  },
];

export default function PreguntasFrecuentesPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-[90px] min-h-screen bg-[#0F0C09] text-[#B1C7D4] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 border-b border-[#605246]/20">
          <div className="flex items-center gap-2 mb-3">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[11px] font-[SpaceGrotesk] uppercase tracking-[0.2em] text-[#849AAD]">
              Centro de Ayuda
            </span>
          </div>
          <h1 className="font-archivo text-3xl sm:text-5xl text-[#B1C7D4] uppercase tracking-tight mb-4">
            PREGUNTAS FRECUENTES.
          </h1>
          <p className="font-[SpaceGrotesk] text-sm text-[#849AAD] max-w-2xl leading-relaxed">
            Resolvemos con claridad y transparencia cualquier duda sobre procesos de compra, calce, construcción artesanal y envíos.
          </p>
        </div>

        {/* Categories */}
        <div className="py-12 space-y-12">
          {FAQ_CATEGORIES.map((cat, cIdx) => (
            <div key={cIdx} className="space-y-4">
              <h2 className="font-archivo text-lg sm:text-xl text-[#B1C7D4] uppercase tracking-wide flex items-center gap-2 border-b border-[#605246]/30 pb-3">
                <span className="text-[#5E1C23] font-bold">✦</span> {cat.category}
              </h2>

              <div className="space-y-3">
                {cat.questions.map((qItem, qIdx) => {
                  const key = `${cIdx}-${qIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div
                      key={key}
                      className="bg-[#16120E] border border-[#605246]/30 transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-archivo text-sm text-[#B1C7D4] uppercase tracking-wide hover:text-white transition-colors"
                      >
                        <span>{qItem.q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-[#849AAD] transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? "rotate-180 text-[#5E1C23]" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-[#605246]/20 font-[SpaceGrotesk] text-xs text-[#849AAD] leading-relaxed">
                          {qItem.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Contact Banner */}
        <div className="p-8 bg-[#16120E] border border-[#605246]/40 text-center">
          <HelpCircle size={28} className="text-[#5E1C23] mx-auto mb-3" />
          <h3 className="font-archivo text-lg text-[#B1C7D4] uppercase mb-2">
            ¿No encontraste lo que buscabas?
          </h3>
          <p className="text-xs font-[SpaceGrotesk] text-[#849AAD] max-w-md mx-auto mb-6">
            Nuestro equipo de atención al cliente en León, Guanajuato está listo para resolver tus dudas directamente.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E1C23] hover:bg-[#72232b] text-white font-[SpaceGrotesk] text-xs font-bold uppercase tracking-[0.15em] transition-colors"
            >
              Formulario de Contacto <ArrowRight size={14} />
            </Link>
            <a
              href="https://wa.me/524777296578"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F0C09] hover:bg-[#605246]/20 border border-[#605246]/50 text-xs font-[SpaceGrotesk] font-bold text-[#B1C7D4] uppercase tracking-[0.15em] transition-colors"
            >
              WhatsApp Directo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
