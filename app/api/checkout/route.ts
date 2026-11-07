import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";
import { MercadoPagoConfig, Preference } from "mercadopago";

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

    let paymentUrl = null;
    let isTestDemo = true;

    // Get payment configuration from database with env fallbacks
    const paymentSettings = db.getPaymentSettings();
    const mpAccessToken = 
      paymentSettings.mercadopago.accessToken || 
      process.env.MERCADOPAGO_ACCESS_TOKEN || 
      process.env.MP_ACCESS_TOKEN;

    if (paymentMethod === "mercadopago") {
      if (mpAccessToken && !mpAccessToken.startsWith("TEST-placeholder")) {
        try {
          const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
          const preference = new Preference(client);

          const origin = req.headers.get("origin") || req.nextUrl.origin || "https://braviowestern.com.mx";

          const preferenceData = await preference.create({
            body: {
              items: items.map((it: any) => ({
                id: it.sku,
                title: `${it.name} (Talla ${it.size} MX)`,
                unit_price: Number(it.price),
                quantity: Number(it.quantity || 1),
                currency_id: "MXN",
              })),
              payer: {
                name: customer.firstName,
                surname: customer.lastName || "",
                email: customer.email,
                phone: {
                  number: customer.phone || "",
                },
                address: {
                  street_name: customer.address || "",
                  zip_code: customer.zipCode || "",
                },
              },
              back_urls: {
                success: `${origin}/pedido/${order.orderNumber}?status=success`,
                failure: `${origin}/pedido/${order.orderNumber}?status=failure`,
                pending: `${origin}/pedido/${order.orderNumber}?status=pending`,
              },
              auto_return: "approved",
              external_reference: order.orderNumber,
              statement_descriptor: paymentSettings.mercadopago.statementDescriptor || "BRAVIO WESTERN",
            },
          });

          paymentUrl = preferenceData.init_point || preferenceData.sandbox_init_point || null;
          isTestDemo = false;
        } catch (mpErr) {
          console.error("MercadoPago preference creation error:", mpErr);
          // Fall back gracefully to test URL if API credentials had an error
          paymentUrl = `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=TEST-${order.orderNumber}`;
        }
      } else {
        paymentUrl = `https://www.mercadopago.com.mx/checkout/v1/redirect?pref_id=TEST-${order.orderNumber}`;
      }
    }

    return NextResponse.json({
      success: true,
      order,
      paymentUrl,
      isTestDemo,
    });
  } catch (err: any) {
    console.error("Error creating order:", err);
    return NextResponse.json({ error: err.message || "Error procesando el pedido" }, { status: 500 });
  }
}
