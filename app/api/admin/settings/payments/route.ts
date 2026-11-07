import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  try {
    const settings = db.getPaymentSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener la configuración de pagos." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mercadopago, spei, updatedBy } = body;

    const updated = db.updatePaymentSettings(
      { mercadopago, spei },
      updatedBy || "cbarron@ti-boot.com"
    );

    return NextResponse.json({
      success: true,
      message: "Configuración de pagos guardada con éxito.",
      settings: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al guardar la configuración de pagos." },
      { status: 500 }
    );
  }
}

