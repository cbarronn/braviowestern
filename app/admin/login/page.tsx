"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, KeyRound, RefreshCw, CheckCircle2 } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");

  // Step 1: Credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: 2FA
  const [tempToken, setTempToken] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Handle Step 1 submit (Username + Password)
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor completa tu usuario y contraseña.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setInfoMessage(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.requires2FA) {
        setTempToken(data.tempToken);
        setUserEmail(data.email);
        setStep("2fa");
      } else {
        setError(data.error || "Credenciales incorrectas o usuario no autorizado.");
      }
    } catch (err) {
      setError("Error de conexión al servidor de autenticación.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2 submit (6-digit 2FA Code)
  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = twoFactorCode.trim();
    if (!cleanCode || cleanCode.length < 6) {
      setError("Por favor ingresa el código completo de 6 dígitos.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tempToken, code: cleanCode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Código 2FA incorrecto o expirado.");
      }
    } catch (err) {
      setError("Error al verificar el código de doble factor.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend 2FA code
  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    setInfoMessage(null);

    try {
      const res = await fetch("/api/admin/auth/resend-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTempToken(data.tempToken);
        setInfoMessage("Se ha enviado un nuevo código a tu correo.");
      } else {
        setError(data.error || "No se pudo reenviar el código.");
      }
    } catch (err) {
      setError("Error de red al reenviar el código.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#605246] flex flex-col items-center justify-center p-4 font-[SpaceGrotesk]">
      <div className="w-full max-w-md">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-white border border-[#B1C7D4] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CruzDeHierro size={28} color="#5E1C23" />
          </div>

          <span className="text-[10px] tracking-[0.25em] text-[#849AAD] uppercase font-bold block mb-1">
            Plataforma Administrativa Privada
          </span>
          <h1 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide">
            BRAVÍO CONTROL
          </h1>
          <p className="text-xs text-[#849AAD] mt-2">
            Ingreso con credenciales y autenticación de doble factor obligatoria.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-white border border-[#B1C7D4]/60 p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-500/40 text-red-800 text-xs flex items-center gap-2.5 font-bold">
              <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-500/40 text-emerald-800 text-xs flex items-center gap-2.5 font-bold">
              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {step === "credentials" ? (
            /* STEP 1: Username & Password */
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1.5">
                  Usuario o Correo Electrónico
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#849AAD]" />
                  <input
                    type="text"
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="cbarron o cbarron@ti-boot.com"
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] pl-10 pr-4 py-3 text-xs text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#849AAD]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] pl-10 pr-11 py-3 text-xs text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#849AAD] hover:text-[#605246] p-1"
                    aria-label="Ver contraseña"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors shadow-sm flex items-center justify-center gap-2 mt-4"
              >
                <span>{isLoading ? "VALIDANDO CREDENCIALES..." : "CONTINUAR"}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            /* STEP 2: Two-Factor Authentication */
            <form onSubmit={handle2FASubmit} className="space-y-6">
              <div className="text-center p-4 bg-[#F4F7F9] border border-[#B1C7D4]/60 space-y-2">
                <KeyRound size={28} className="text-[#5E1C23] mx-auto mb-1" />
                <h3 className="font-archivo text-base text-[#605246] uppercase">
                  Doble Factor Requerido
                </h3>
                <p className="text-xs text-[#605246] leading-relaxed">
                  Por tu seguridad, hemos enviado el código de 6 dígitos a tu bandeja de:
                  <br />
                  <strong className="text-[#5E1C23] font-mono text-sm">{userEmail}</strong>
                </p>
                <div className="p-2.5 bg-amber-50 border border-amber-300 rounded text-[11px] text-amber-900 mt-2 text-left">
                  <span className="font-bold">⚠️ Atención:</span> El correo proviene de Resend (<code className="font-mono text-[10px]">onboarding@resend.dev</code>). Si no lo ves en tu bandeja principal en los próximos segundos, <strong>revisa tu carpeta de Spam / Correo no deseado</strong> o la pestaña <strong>Promociones</strong> en Gmail.
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] text-center mb-2">
                  Ingresa el código de 6 dígitos
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full bg-[#F4F7F9] border-2 border-[#5E1C23] py-3.5 text-center font-mono text-2xl tracking-[0.4em] font-bold text-[#605246] focus:outline-none focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || twoFactorCode.length < 6}
                className="w-full py-4 px-6 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "VERIFICANDO CÓDIGO..." : "VERIFICAR E INGRESAR"}</span>
                <ShieldCheck size={16} />
              </button>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#B1C7D4]/40 font-[SpaceGrotesk]">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 text-[#849AAD] hover:text-[#5E1C23] font-bold transition-colors"
                >
                  <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
                  <span>Reenviar código</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setTwoFactorCode("");
                    setError(null);
                  }}
                  className="text-[#849AAD] hover:text-[#605246] underline transition-colors"
                >
                  Cambiar usuario
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Footer Notice */}
        <div className="mt-8 text-center text-xs text-[#849AAD] space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold">
            <ShieldCheck size={14} className="text-[#5E1C23]" />
            <span>Acceso Privado con Autenticación 2FA & Registro de Auditoría</span>
          </div>
          <p className="text-[11px] text-[#849AAD]/80">
            León, Guanajuato · Sistema de Gestión BRAVÍO Western
          </p>
          <div className="pt-2">
            <Link href="/" className="text-xs text-[#605246] hover:text-[#5E1C23] underline font-bold">
              ← Volver a la Tienda Pública
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
