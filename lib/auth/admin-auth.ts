import { cookies } from "next/headers";
import { db } from "@/lib/data/mock-db";
import { AdminUser } from "@/lib/types";
import { sendEmail } from "@/lib/email/send";
import crypto from "crypto";

const SESSION_COOKIE = "bravio_admin_session";

export interface SessionData {
  id: string;
  email: string;
  name: string;
  role: AdminUser["role"];
  issuedAt: number;
}

interface TwoFactorChallenge {
  token: string;
  userId: string;
  email: string;
  name: string;
  role: AdminUser["role"];
  code: string;
  expiresAt: number;
  attempts: number;
}

// In-memory 2FA storage (keyed by token)
const twoFactorStore = new Map<string, TwoFactorChallenge>();

export async function verifyAdminCredentials(
  userOrEmail: string,
  pass: string
): Promise<AdminUser | null> {
  const cleanInput = userOrEmail.trim().toLowerCase();
  const cleanPass = pass.trim();

  // Primary Superadmin account as strictly requested
  // Usuario: cbarron | Correo: cbarron@ti-boot.com | Pass: Vis2026$$
  const isSuperadminUser = cleanInput === "cbarron" || cleanInput === "cbarron@ti-boot.com";
  const isSuperadminPass = cleanPass === "Vis2026$$";

  if (isSuperadminUser && isSuperadminPass) {
    return {
      id: "usr-1",
      name: "Carlos Barrón",
      email: "cbarron@ti-boot.com",
      role: "superadmin",
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: "2026-01-01T00:00:00Z",
    };
  }

  // Check against other database users with custom environment password if set
  const envPassword = process.env.ADMIN_PASSWORD;
  if (envPassword && cleanPass === envPassword) {
    const users = db.getAdminUsers();
    const found = users.find(
      (u) => (u.email.toLowerCase() === cleanInput || u.name.toLowerCase() === cleanInput) && u.isActive
    );
    if (found) return found;
  }

  return null;
}

export async function createTwoFactorChallenge(user: AdminUser): Promise<{
  tempToken: string;
  code: string;
  email: string;
}> {
  // Generate 6-digit numeric verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const tempToken = crypto.randomUUID();

  const challenge: TwoFactorChallenge = {
    token: tempToken,
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
  };

  twoFactorStore.set(tempToken, challenge);

  // Send verification code by email
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #B1C7D4; padding: 32px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #5E1C23; font-size: 24px; letter-spacing: 2px; margin: 0; text-transform: uppercase;">BRAVÍO CONTROL</h1>
        <p style="color: #849AAD; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px;">Autenticación de Seguridad de Dos Factores</p>
      </div>

      <p style="color: #605246; font-size: 14px; line-height: 1.6;">Hola <strong>${user.name}</strong>,</p>
      <p style="color: #605246; font-size: 14px; line-height: 1.6;">
        Se ha solicitado un inicio de sesión al panel de administración de BRAVÍO Western. Para continuar, introduce el siguiente código de verificación:
      </p>

      <div style="text-align: center; margin: 28px 0;">
        <div style="display: inline-block; background: #F4F7F9; border: 2px dashed #5E1C23; padding: 14px 28px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #5E1C23;">
          ${code}
        </div>
        <p style="color: #849AAD; font-size: 11px; margin-top: 8px;">Este código expira en 10 minutos.</p>
      </div>

      <p style="color: #849AAD; font-size: 12px; line-height: 1.5;">
        Si tú no solicitaste este código, te recomendamos cambiar tu contraseña de inmediato.
      </p>

      <div style="border-top: 1px solid #B1C7D4; margin-top: 24px; padding-top: 16px; text-align: center;">
        <p style="color: #849AAD; font-size: 10px; margin: 0;">BRAVÍO Western · León, Guanajuato, México</p>
      </div>
    </div>
  `;

  try {
    await sendEmail({
      from: "BRAVÍO Control <seguridad@braviowestern.com.mx>",
      to: user.email,
      subject: `Código de Verificación BRAVÍO: ${code}`,
      html: htmlContent,
    });
  } catch (err) {
    console.error("Error sending 2FA email:", err);
  }

  // Audit log entry
  db.addAudit(
    "AUTH_2FA_CODE_GENERATED",
    "Security",
    user.email,
    `Código 2FA generado y enviado a ${user.email}`
  );

  return { tempToken, code, email: user.email };
}

export async function verifyTwoFactorCode(
  tempToken: string,
  inputCode: string
): Promise<AdminUser | null> {
  const challenge = twoFactorStore.get(tempToken);

  if (!challenge) {
    return null;
  }

  // Check expiration
  if (Date.now() > challenge.expiresAt) {
    twoFactorStore.delete(tempToken);
    return null;
  }

  // Increment attempts
  challenge.attempts += 1;
  if (challenge.attempts > 5) {
    twoFactorStore.delete(tempToken);
    db.addAudit("AUTH_2FA_BLOCKED", "Security", challenge.email, "Excedido límite de intentos 2FA");
    return null;
  }

  const cleanInput = inputCode.trim();
  if (cleanInput === challenge.code) {
    // Validated successfully
    twoFactorStore.delete(tempToken);

    return {
      id: challenge.userId,
      name: challenge.name,
      email: challenge.email,
      role: challenge.role,
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: "2026-01-01T00:00:00Z",
    };
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
