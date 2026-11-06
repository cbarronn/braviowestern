import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  try {
    const inventory = db.getInventory();
    return NextResponse.json({ success: true, inventory });
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar inventario." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sku, size, newPhysical, reason } = body;

    if (!sku || !size || typeof newPhysical !== "number") {
      return NextResponse.json({ error: "SKU, Talla y nueva cantidad física son requeridos." }, { status: 400 });
    }

    const success = db.updateStock(sku, size, newPhysical, reason || "Ajuste manual desde panel");
    if (!success) {
      return NextResponse.json({ error: "No se pudo actualizar el inventario." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al ajustar inventario." }, { status: 500 });
  }
}
