import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email requerido." },
        { status: 400 }
      );
    }

    const resend = getResend();

    // 1. Notificación interna al equipo BRAVÍO
    await resend.emails.send({
      from: "BRAVÍO Newsletter <noreply@braviowestern.com.mx>",
      to: ["cbarron@ti-boot.com", "darrieta@vise.com.mx", "daniela.arrieta.navarro1@gmail.com"],
      subject: `Nuevo suscriptor al Newsletter: ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0F0C09; padding: 2rem; color: #B1C7D4;">
          <h2 style="font-size: 1.5rem; color: #B1C7D4; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
            Nuevo suscriptor
          </h2>
          <p style="color: #849AAD; line-height: 1.6;">
            ¡Felicidades! Tienes un nuevo suscriptor en el Newsletter de BRAVÍO:
          </p>
          <p style="font-size: 1.25rem; color: #FFFFFF; font-weight: bold; margin: 2rem 0;">
            ${email}
          </p>
          <p style="font-size: 11px; color: #3E342D; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3rem;">
            ✦ BRAVÍO Western
          </p>
        </div>
      `,
    });

    // 2. Correo de bienvenida automático para el cliente
    await resend.emails.send({
      from: "BRAVÍO Western <hola@braviowestern.com.mx>",
      to: [email],
      subject: "Bienvenido al Club BRAVÍO",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0F0C09; padding: 2rem; color: #B1C7D4;">
          <img src="https://braviowestern.com.mx/brand/images/Avatar_BRAVIO_principal_1000px.png" alt="BRAVÍO" style="width: 60px; height: auto; margin-bottom: 2rem;" />
          <h2 style="font-size: 1.5rem; color: #B1C7D4; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
            Estás dentro.
          </h2>
          <p style="color: #849AAD; line-height: 1.8; margin-bottom: 1.5rem;">
            Gracias por suscribirte al newsletter de BRAVÍO. A partir de ahora serás el primero en enterarte sobre nuestros nuevos lanzamientos, eventos especiales y promociones exclusivas.
          </p>
          <p style="color: #849AAD; line-height: 1.8; margin-bottom: 1.5rem;">
            Prepárate para caminar con propósito.
          </p>
          <hr style="border: none; border-top: 1px solid #3E342D; margin: 2rem 0;" />
          <p style="font-size: 11px; color: #3E342D; letter-spacing: 0.1em; text-transform: uppercase;">
            ✦ BRAVÍO Western — León, Guanajuato · México
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando newsletter email:", error);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
