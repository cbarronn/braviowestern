import { cookies } from "next/headers";
import { db } from "@/lib/data/mock-db";
import { AdminUser } from "@/lib/types";

const SESSION_COOKIE = "bravio_admin_session";

export interface SessionData {
  id: string;
  email: string;
  name: string;
  role: AdminUser["role"];
  issuedAt: number;
}

// Master password configurable via environment variable or default secure key
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Bravio2026!";
const MASTER_USER = process.env.ADMIN_USER || "admin@braviowestern.com.mx";

export async function verifyAdminCredentials(
  userOrEmail: string,
  pass: string
): Promise<AdminUser | null> {
  const cleanInput = userOrEmail.trim().toLowerCase();
  const cleanPass = pass.trim();

  // Master check
  if (
    (cleanInput === MASTER_USER.toLowerCase() ||
      cleanInput === "admin" ||
      cleanInput === "bravio_admin") &&
    cleanPass === DEFAULT_ADMIN_PASSWORD
  ) {
    return {
      id: "usr-master",
      name: "Administrador General",
      email: "admin@braviowestern.com.mx",
      role: "superadmin",
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: "2026-01-01T00:00:00Z",
    };
  }

  // Check against DB admin users with default or environment password
  const users = db.getAdminUsers();
  const found = users.find(
    (u) => u.email.toLowerCase() === cleanInput && u.isActive
  );

  if (found && cleanPass === DEFAULT_ADMIN_PASSWORD) {
    return found;
  }

  return null;
}

export async function getAdminSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const data: SessionData = JSON.parse(decoded);

    // Session valid for 7 days
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - data.issuedAt > maxAgeMs) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export async function setAdminSession(user: AdminUser) {
  const cookieStore = await cookies();
  const sessionData: SessionData = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    issuedAt: Date.now(),
  };

  const token = Buffer.from(JSON.stringify(sessionData)).toString("base64");

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
