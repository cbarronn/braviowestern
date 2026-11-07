import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, createTwoFactorChallenge } from "@/lib/auth/admin-auth";
import { db } from "@/lib/data/mock-db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuario y contraseña requeridos." },
        { status: 400 }
      );
    }

    const user = await verifyAdminCredentials(username, password);

    if (!user) {
      db.addAudit(
        "AUTH_LOGIN_FAILED",
        "Security",
        username,
        `Intento de acceso fallido para usuario: ${username}`
      );

      return NextResponse.json(
        { error: "Credenciales de acceso incorrectas o usuario no autorizado." },
        { status: 401 }
      );
    }

    // Credentials valid -> generate 2FA challenge code
    const challenge = await createTwoFactorChallenge(user);

    return NextResponse.json({
      success: true,
      requires2FA: true,
      tempToken: challenge.tempToken,
      email: challenge.email,
      // For developer convenience or fallback when local SMTP is offline:
      devCode: challenge.code,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error en el servidor al autenticar." },
      { status: 500 }
    );
  }
}
