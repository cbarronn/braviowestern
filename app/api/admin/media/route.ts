import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";
import { VirtualFolder } from "@/lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") as VirtualFolder | null;
  const q = searchParams.get("q") || undefined;

  const items = db.getMedia(folder || undefined, q);
  return NextResponse.json({ success: true, items });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const item = db.addMedia(body);
    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    const item = db.updateMedia(id, updates);
    if (!item) return NextResponse.json({ error: "Item no encontrado" }, { status: 404 });
    return NextResponse.json({ success: true, item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    const ok = db.archiveMedia(id);
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
