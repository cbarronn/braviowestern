import { NextResponse } from "next/server";
import { clearAdminSession, getAdminSession } from "@/lib/auth/admin-auth";
import { db } from "@/lib/data/mock-db";

export async function POST() {
  try {
    const session = await getAdminSession();
    if (session) {
      db.addAudit(
        "AUTH_LOGOUT",
        "Security",
        session.email,
        `Cierre de sesión de ${session.name}`
      );
    }
    await clearAdminSession();
    return NextResponse.json({ success: true, message: "Sesión cerrada correctamente." });
  } catch (error) {
    return NextResponse.json({ error: "Error al cerrar sesión." }, { status: 500 });
  }
}

