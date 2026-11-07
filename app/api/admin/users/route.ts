import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/data/mock-db";
import { AdminUser } from "@/lib/types";

export async function GET() {
  try {
    const users = db.getAdminUsers();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ error: "Error al consultar usuarios administrativos." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, isActive } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Nombre, correo y rol son requeridos." },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "El formato de correo electrónico es inválido." },
        { status: 400 }
      );
    }

    const newUser = db.createAdminUser({
      name,
      email,
      role: role as AdminUser["role"],
      isActive: isActive ?? true,
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear usuario." },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email, role, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID de usuario requerido." }, { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "El formato de correo electrónico es inválido." },
        { status: 400 }
      );
    }

    const updated = db.updateAdminUser(id, { name, email, role, isActive });
    if (!updated) {
      return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al actualizar usuario." },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, role, toggleStatus, name, email, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID de usuario requerido." }, { status: 400 });
    }

    if (role !== undefined && !toggleStatus && name === undefined && email === undefined) {
      const updated = db.updateUserRole(id, role);
      return NextResponse.json({ success: true, user: updated });
    }

    if (toggleStatus) {
      const updated = db.toggleUserStatus(id);
      return NextResponse.json({ success: true, user: updated });
    }

    // Generic update
    const updated = db.updateAdminUser(id, { name, email, role, isActive });
    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Error al actualizar usuario." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await req.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: "ID de usuario requerido." }, { status: 400 });
    }

    db.deleteAdminUser(id);
    return NextResponse.json({ success: true, message: "Usuario eliminado correctamente." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al eliminar usuario." },
      { status: 400 }
    );
  }
}
