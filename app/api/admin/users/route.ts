import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";

export async function GET() {
  try {
    const users = db.getAdminUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar usuarios administrativos." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, role, toggleStatus } = body;

    if (!id) {
      return NextResponse.json({ error: "ID de usuario requerido." }, { status: 400 });
    }

    if (role) {
      const updated = db.updateUserRole(id, role);
      return NextResponse.json({ success: true, user: updated });
    }

    if (toggleStatus) {
      const updated = db.toggleUserStatus(id);
      return NextResponse.json({ success: true, user: updated });
    }

    return NextResponse.json({ error: "Acción no reconocida." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar usuario." }, { status: 500 });
  }
}
