import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  const tracks = db.getAudioTracks();
  return NextResponse.json({ success: true, tracks });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const track = db.addAudioTrack(body);
    return NextResponse.json({ success: true, track });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    const track = db.updateAudioTrack(id, updates);
    return NextResponse.json({ success: true, track });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

