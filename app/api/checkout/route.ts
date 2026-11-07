import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { sendEmail } from "@/lib/email/send";

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

    // Send Order Confirmation Email asynchronously
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "BRAVÍO Western <onboarding@resend.dev>";
      const speiInfo = paymentSettings.spei;

      const itemsListHtml = items
        .map(
          (it: any) => `
          <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 10px 0; font-weight: bold; color: #605246;">${it.name} (Talla ${it.size} MX)</td>
            <td style="padding: 10px 0; text-align: center; color: #849AAD;">x${it.quantity || 1}</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #5E1C23;">$${(Number(it.price) * Number(it.quantity || 1)).toLocaleString("es-MX")} MXN</td>
          </tr>`
        )
        .join("");

      const speiBlockHtml =
        paymentMethod === "transferencia"
          ? `
          <div style="background-color: #F8FAFB; border: 1px solid #B1C7D4; padding: 18px; margin: 24px 0; border-radius: 4px;">
            <h3 style="color: #5E1C23; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase;">
              Instrucciones de Transferencia SPEI (${speiInfo.bankName})
            </h3>
            <table style="width: 100%; font-size: 12px; color: #605246;">
              <tr><td style="color: #849AAD; padding: 4px 0;">Beneficiario:</td><td style="font-weight: bold;">${speiInfo.beneficiary}</td></tr>
              <tr><td style="color: #849AAD; padding: 4px 0;">CLABE Interbancaria:</td><td style="font-weight: bold; font-family: monospace; color: #5E1C23; font-size: 14px;">${speiInfo.clabe}</td></tr>
              <tr><td style="color: #849AAD; padding: 4px 0;">Concepto / Referencia:</td><td style="font-weight: bold; font-family: monospace;">${order.orderNumber}</td></tr>
              <tr><td style="color: #849AAD; padding: 4px 0;">Monto Exacto:</td><td style="font-weight: bold; color: #5E1C23;">$${Number(total).toLocaleString("es-MX")} MXN</td></tr>
            </table>
            <p style="font-size: 11px; color: #849AAD; margin: 12px 0 0 0;">
              Por favor envía tu comprobante a <strong>${speiInfo.notificationEmail}</strong> indicando tu folio <strong>${order.orderNumber}</strong>.
            </p>
          </div>`
          : "";

      const emailHtml = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border: 1px solid #B1C7D4;">
          <div style="text-align: center; border-bottom: 2px solid #5E1C23; padding-bottom: 20px;">
            <h1 style="color: #605246; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">BRAVÍO WESTERN</h1>
            <p style="color: #849AAD; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin: 6px 0 0 0;">León, Guanajuato · Hecho a Mano</p>
          </div>

          <div style="padding: 24px 0;">
            <p style="font-size: 14px; color: #605246; margin: 0 0 10px 0;">Hola <strong>${customer.firstName}</strong>,</p>
            <p style="font-size: 13px; color: #605246; line-height: 1.5; margin: 0 0 20px 0;">
              ¡Gracias por tu compra! Hemos registrado tu pedido número <strong style="color: #5E1C23;">${order.orderNumber}</strong>.
              Nuestros maestros artesanos comenzarán la inspección y preparación en nuestro taller.
            </p>

            ${speiBlockHtml}

            <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 20px 0;">
              <thead>
                <tr style="border-bottom: 2px solid #B1C7D4; text-transform: uppercase; font-size: 10px; color: #849AAD;">
                  <th style="text-align: left; padding-bottom: 8px;">Producto</th>
                  <th style="text-align: center; padding-bottom: 8px;">Cant.</th>
                  <th style="text-align: right; padding-bottom: 8px;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${itemsListHtml}
              </tbody>
            </table>

            <div style="text-align: right; border-top: 1px solid #E5E7EB; padding-top: 12px; font-size: 14px; color: #605246;">
              <p style="margin: 4px 0;">Subtotal: <strong>$${Number(subtotal).toLocaleString("es-MX")} MXN</strong></p>
              <p style="margin: 4px 0;">Envío: <strong>${shipping === 0 ? "GRATIS" : `$${shipping} MXN`}</strong></p>
              <p style="margin: 8px 0; font-size: 18px; color: #5E1C23; font-weight: bold;">Total: $${Number(total).toLocaleString("es-MX")} MXN</p>
            </div>
          </div>

          <div style="border-top: 1px solid #B1C7D4; padding-top: 18px; text-align: center; font-size: 11px; color: #849AAD;">
            <p style="margin: 0 0 6px 0;">BRAVÍO Western · Tradición Artesanal & Construcción Goodyear Welt 360°</p>
            <p style="margin: 0;">¿Tienes dudas? Escríbenos a <a href="mailto:hola@braviowestern.com.mx" style="color: #5E1C23;">hola@braviowestern.com.mx</a></p>
          </div>
        </div>
      `;

      // Non-blocking email delivery
      sendEmail({
        from: fromEmail,
        to: customer.email,
        subject: `Confirmación de Pedido ${order.orderNumber} | BRAVÍO Western`,
        html: emailHtml,
      }).catch((e) => console.error("Error sending order email:", e));
    } catch (emailErr) {
      console.error("Order confirmation email error:", emailErr);
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
