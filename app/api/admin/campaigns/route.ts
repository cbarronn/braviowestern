import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  const campaigns = db.getCampaigns();
  return NextResponse.json({ success: true, campaigns });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    const camp = db.updateCampaign(id, updates);
    return NextResponse.json({ success: true, campaign: camp });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

