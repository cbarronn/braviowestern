"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Credenciales incorrectas.");
      }
    } catch (err) {
      setError("Error de conexión al servidor de autenticación.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername("admin@braviowestern.com.mx");
    setPassword("Bravio2026!");
  };

  return (
    <div className="min-h-screen bg-white text-[#605246] flex flex-col items-center justify-center p-4 font-[SpaceGrotesk]">
      <div className="w-full max-w-md">
        {/* Header Card */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#F4F7F9] border border-[#B1C7D4] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <CruzDeHierro size={28} color="#5E1C23" />
          </div>

          <span className="text-[10px] tracking-[0.25em] text-[#849AAD] uppercase font-bold block mb-1">
            Plataforma Administrativa Privada
          </span>
          <h1 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide">
            BRAVÍO CONTROL
          </h1>
          <p className="text-xs text-[#849AAD] mt-2">
            Ingreso restringido para operaciones, catálogo y dirección de marca.
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white border border-[#B1C7D4]/60 p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-500/40 text-red-800 text-xs flex items-center gap-2.5 font-bold">
              <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="admin@braviowestern.com.mx"
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
              className="w-full py-4 px-6 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? "VALIDANDO CREDENCIALES..." : "INICIAR SESIÓN"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick Credential Hint for Superadmin */}
          <div className="mt-6 pt-5 border-t border-[#B1C7D4]/30 text-center">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] text-[#849AAD] hover:text-[#5E1C23] underline transition-colors cursor-pointer"
            >
              ¿Usar credenciales maestras predeterminadas? (Click aquí)
            </button>
          </div>
        </div>

        {/* Security Footer Notice */}
        <div className="mt-8 text-center text-xs text-[#849AAD] space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold">
            <ShieldCheck size={14} className="text-[#5E1C23]" />
            <span>Sesión protegida mediante Cookie HttpOnly y Registro de Auditoría</span>
          </div>
          <p className="text-[11px] text-[#849AAD]/80">
            León, Guanajuato · Sistema de Gestión BRAVÍO
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

