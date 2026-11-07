import { NextRequest, NextResponse } from "next/server";
import { verifyTwoFactorCode, setAdminSession } from "@/lib/auth/admin-auth";
import { db } from "@/lib/data/mock-db";

export async function POST(req: NextRequest) {
  try {
    const { tempToken, code } = await req.json();

    if (!tempToken || !code) {
      return NextResponse.json(
        { error: "Token de sesión y código 2FA requeridos." },
        { status: 400 }
      );
    }

    const user = await verifyTwoFactorCode(tempToken, code);

    if (!user) {
      return NextResponse.json(
        { error: "Código de verificación inválido o expirado. Por favor intenta de nuevo." },
        { status: 401 }
      );
    }

    // Set official session cookie
    await setAdminSession(user);

    db.addAudit(
      "AUTH_2FA_SUCCESS",
      "Security",
      user.email,
      `Acceso exitoso con doble factor completado para ${user.name} (${user.role})`
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { error: "Error en el servidor al verificar el código 2FA." },
      { status: 500 }
    );
  }
}
