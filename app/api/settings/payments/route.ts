import { NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  try {
    const settings = db.getPaymentSettings();

    // Sanitize to omit private tokens for client safety
    const publicSettings = {
      mercadopago: {
        enabled: settings.mercadopago.enabled,
        sandboxMode: settings.mercadopago.sandboxMode,
        publicKey: settings.mercadopago.publicKey,
        installmentsEnabled: settings.mercadopago.installmentsEnabled,
        maxInstallments: settings.mercadopago.maxInstallments,
      },
      spei: {
        enabled: settings.spei.enabled,
        bankName: settings.spei.bankName,
        beneficiary: settings.spei.beneficiary,
        clabe: settings.spei.clabe,
        accountNumber: settings.spei.accountNumber,
        notificationEmail: settings.spei.notificationEmail,
        notificationWhatsapp: settings.spei.notificationWhatsapp,
        instructions: settings.spei.instructions,
        expirationHours: settings.spei.expirationHours,
      },
      updatedAt: settings.updatedAt,
    };

    return NextResponse.json({ success: true, settings: publicSettings });
  } catch (error: any) {
    console.error("Error in /api/settings/payments:", error);
    return NextResponse.json(
      { error: error?.message || "Error al consultar métodos de pago disponibles." },
      { status: 500 }
    );
  }
}
