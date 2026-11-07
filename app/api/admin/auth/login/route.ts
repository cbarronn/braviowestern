import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, setAdminSession } from "@/lib/auth/admin-auth";
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
      return NextResponse.json(
        { error: "Credenciales de acceso incorrectas o usuario inactivo." },
        { status: 401 }
      );
    }

    await setAdminSession(user);

    db.addAudit(
      "AUTH_LOGIN_SUCCESS",
      "Security",
      user.email,
      `Inicio de sesión exitoso de ${user.name} (${user.role})`
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error en el servidor al autenticar." },
      { status: 500 }
    );
  }
}
