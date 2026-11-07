import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";
import { sendEmail } from "@/lib/email/send";
import { renderNewsletterHtml, NEWSLETTER_PRESETS, NewsletterContent } from "@/lib/email/newsletter-templates";

export async function GET() {
  try {
    const subscribers = db.getNewsletterSubscribers();
    const customers = db.getCustomers();
    const campaigns = db.getNewsletterCampaigns();

    const allAudience = db.getNewsletterAudience("all");
    const customersAudience = db.getNewsletterAudience("customers");
    const subscribersAudience = db.getNewsletterAudience("subscribers");

    return NextResponse.json({
      success: true,
      stats: {
        totalUnique: allAudience.length,
        totalSubscribers: subscribersAudience.length,
        totalCustomers: customersAudience.length,
        campaignsCount: campaigns.length,
      },
      subscribers,
      campaigns,
      presets: NEWSLETTER_PRESETS,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al consultar datos de newsletter." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    // Acción opcional: Agregar suscriptor manual
    if (action === "add_subscriber") {
      const { email } = body;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { error: "Correo electrónico inválido." },
          { status: 400 }
        );
      }
      const newSub = db.addNewsletterSubscriber(email, "manual");
      return NextResponse.json({ success: true, subscriber: newSub });
    }

    // Acción principal: Envío de Newsletter (Masivo o Prueba)
    const {
      audience = "test", // "all" | "customers" | "subscribers" | "test"
      testEmail,
      subject,
      preheader,
      headline,
      bodyParagraphs,
      imageUrl,
      imageAlt,
      highlightBox,
      buttonText,
      buttonUrl,
      sentBy = "cbarron",
    } = body;

    if (!subject || !headline) {
      return NextResponse.json(
        { error: "El asunto y el titular del boletín son requeridos." },
        { status: 400 }
      );
    }

    const content: NewsletterContent = {
      subject,
      preheader,
      headline,
      bodyParagraphs: Array.isArray(bodyParagraphs)
        ? bodyParagraphs
        : typeof bodyParagraphs === "string"
        ? bodyParagraphs.split("\n\n").filter(Boolean)
        : [],
      imageUrl,
      imageAlt,
      highlightBox: highlightBox?.code ? highlightBox : undefined,
      buttonText,
      buttonUrl,
    };

    const html = renderNewsletterHtml(content);

    // Determinar destinatarios según audiencia
    let recipients: string[] = [];

    if (audience === "test") {
      const emailToTest = (testEmail || "cbarron@ti-boot.com").toLowerCase().trim();
      if (!emailToTest.includes("@")) {
        return NextResponse.json(
          { error: "Correo de prueba inválido." },
          { status: 400 }
        );
      }
      recipients = [emailToTest];
    } else {
      recipients = db.getNewsletterAudience(audience as "all" | "customers" | "subscribers");
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron destinatarios en la audiencia seleccionada." },
        { status: 400 }
      );
    }

    // Enviar correos
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const recipient of recipients) {
      try {
        const result = await sendEmail({
          from: "BRAVÍO Western <hola@braviowestern.com.mx>",
          to: recipient,
          subject: audience === "test" ? `[PRUEBA] ${subject}` : subject,
          html,
        });

        if (result.success) {
          successCount++;
        } else {
          failCount++;
          if (result.error) errors.push(`${recipient}: ${result.error}`);
        }
      } catch (err: any) {
        failCount++;
        errors.push(`${recipient}: ${err.message}`);
      }
    }

    // Registrar campaña en historial si no es solo prueba interna
    let campaignRecord = null;
    if (audience !== "test") {
      campaignRecord = db.recordNewsletterCampaign({
        subject,
        title: headline,
        audience,
        recipientsCount: successCount,
        sentBy,
        status: failCount === 0 ? "sent" : successCount > 0 ? "partial" : "failed",
      });
    }

    return NextResponse.json({
      success: true,
      audience,
      totalTargeted: recipients.length,
      sentCount: successCount,
      failedCount: failCount,
      campaign: campaignRecord,
      errors: errors.slice(0, 5),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al procesar el envío de newsletter." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID o correo requerido." }, { status: 400 });
    }

    const removed = db.deleteNewsletterSubscriber(id);
    if (!removed) {
      return NextResponse.json({ error: "Suscriptor no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Suscriptor dado de baja." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al eliminar suscriptor." },
      { status: 500 }
    );
  }
}
