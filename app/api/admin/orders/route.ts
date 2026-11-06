import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  const orders = db.getOrders();
  return NextResponse.json({ success: true, orders });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status, carrier, trackingNumber } = body;
    const order = db.updateOrderStatus(orderId, status, carrier, trackingNumber);
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

