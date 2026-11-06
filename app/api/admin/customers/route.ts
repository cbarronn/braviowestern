import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || undefined;

    const customers = db.getCustomers(query);
    return NextResponse.json({ success: true, customers });
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar clientes." }, { status: 500 });
  }
}
