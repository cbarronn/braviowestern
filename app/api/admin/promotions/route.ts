import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  try {
    const coupons = db.getCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar promociones." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.code || !body.discountValue) {
      return NextResponse.json({ error: "Código y valor de descuento son requeridos." }, { status: 400 });
    }

    const created = db.createCoupon({
      ...body,
      code: body.code.toUpperCase().trim(),
    });
    return NextResponse.json({ success: true, coupon: created });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear cupón de promoción." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "ID del cupón requerido." }, { status: 400 });
    }

    const updated = db.toggleCoupon(id);
    if (!updated) {
      return NextResponse.json({ error: "Cupón no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ success: true, coupon: updated });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar cupón." }, { status: 500 });
  }
}
