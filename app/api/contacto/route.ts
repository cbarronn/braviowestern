import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos." },
        { status: 400 }
      );
    }

    // Email al equipo BRAVÍO
    const resend = getResend();
    await resend.emails.send({
      from: "BRAVÍO Contacto <noreply@braviowestern.com.mx>",
      to: ["hola@braviowestern.com.mx"],
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0F0C09; padding: 2rem; color: #B1C7D4;">
          <h2 style="font-size: 1.5rem; color: #B1C7D4; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em;">
            Nuevo mensaje de contacto
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3E342D; color: #849AAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; width: 120px;">Nombre</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3E342D; color: #B1C7D4;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3E342D; color: #849AAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em;">Email</td>
              <td style="padding: 0.75rem 0; border-bottom: 1px solid #3E342D; color: #B1C7D4;"><a href="mailto:${email}" style="color: #849AAD;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; color: #849AAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; vertical-align: top;">Mensaje</td>
              <td style="padding: 0.75rem 0; color: #B1C7D4; line-height: 1.6;">${mensaje.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
          <p style="margin-top: 2rem; font-size: 11px; color: #3E342D; letter-spacing: 0.1em; text-transform: uppercase;">
            ✦ BRAVÍO Western — braviowestern.com.mx
          </p>
        </div>
      `,
    });

    // Confirmación automática al usuario
    await resend.emails.send({
      from: "BRAVÍO Western <hola@braviowestern.com.mx>",
      to: [email],
      subject: "Recibimos tu mensaje — BRAVÍO Western",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0F0C09; padding: 2rem; color: #B1C7D4;">
          <h2 style="font-size: 1.5rem; color: #B1C7D4; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">
            Gracias, ${nombre}.
          </h2>
          <p style="color: #849AAD; line-height: 1.8; margin-bottom: 1.5rem;">
            Recibimos tu mensaje. Nos pondremos en contacto contigo a la brevedad.
          </p>
          <p style="color: #605246; line-height: 1.8; font-size: 0.9rem;">
            Si tienes alguna pregunta urgente, puedes escribirnos directamente a
            <a href="mailto:hola@braviowestern.com.mx" style="color: #849AAD;">hola@braviowestern.com.mx</a>
            o al WhatsApp <a href="https://wa.me/524777296578" style="color: #849AAD;">+52 (477) 729-6578</a>.
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
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
