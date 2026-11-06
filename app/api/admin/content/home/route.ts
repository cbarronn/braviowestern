import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  const sections = db.getHomeSections();
  return NextResponse.json({ success: true, sections });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    const sec = db.updateHomeSection(id, updates);
    return NextResponse.json({ success: true, section: sec });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
