import { NextRequest, NextResponse } from "next/server";
import { createTwoFactorChallenge } from "@/lib/auth/admin-auth";
import { db } from "@/lib/data/mock-db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = {
      id: "usr-1",
      name: "Carlos Barrón",
      email: email || "cbarron@ti-boot.com",
      role: "superadmin" as const,
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: "2026-01-01T00:00:00Z",
    };

    const challenge = await createTwoFactorChallenge(user);

    return NextResponse.json({
      success: true,
      tempToken: challenge.tempToken,
      email: challenge.email,
      devCode: challenge.code,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al reenviar el código de verificación." },
      { status: 500 }
    );
  }
}
