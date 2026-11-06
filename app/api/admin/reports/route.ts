import { NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  try {
    const reports = db.getCommercialReports();
    return NextResponse.json({ success: true, reports });
  } catch (error) {
    return NextResponse.json({ error: "Error al generar reportes comerciales." }, { status: 500 });
  }
}
