import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, subtotal, shipping, discount, total, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
    }

    if (!customer?.email || !customer?.firstName || !customer?.address) {
      return NextResponse.json({ error: "Faltan datos de envío requeridos" }, { status: 400 });
    }

    // Save order in Database
    const order = db.createOrder({
      customer,
      items,
      subtotal,
      shipping,
      discount: discount || 0,
      total,
      status: paymentMethod === "mercadopago" ? "pending_payment" : "paid",
      paymentMethod,
    });

    // If Mercado Pago is requested and credentials exist, we can create preference
    let paymentUrl = null;
    if (paymentMethod === "mercadopago") {
      // In production MP SDK generates init_point
      paymentUrl = `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=TEST-${order.orderNumber}`;
    }

    return NextResponse.json({
      success: true,
      order,
      paymentUrl,
    });
  } catch (err: any) {
    console.error("Error creating order:", err);
    return NextResponse.json({ error: err.message || "Error procesando el pedido" }, { status: 500 });
  }
}
