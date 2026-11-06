import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  const intro = db.getIntroConfig();
  return NextResponse.json({ success: true, intro });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const intro = db.updateIntroConfig(body);
    return NextResponse.json({ success: true, intro });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

