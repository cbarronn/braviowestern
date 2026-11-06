import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || undefined;
    const category = searchParams.get("category") || undefined;

    const products = db.getProducts(query, category);
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar catálogo de productos." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.sku || !body.name || !body.price) {
      return NextResponse.json({ error: "SKU, Nombre y Precio son requeridos." }, { status: 400 });
    }

    const created = db.createProduct(body);
    return NextResponse.json({ success: true, product: created });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear producto." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "ID o SKU del producto requerido." }, { status: 400 });
    }

    const updated = db.updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar producto." }, { status: 500 });
  }
}

