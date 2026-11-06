import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  const collections = db.getCollections();
  return NextResponse.json({ success: true, collections });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    const col = db.updateCollection(id, updates);
    return NextResponse.json({ success: true, collection: col });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

