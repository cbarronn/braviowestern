"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Save,
  HelpCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { PaymentSettings } from "@/lib/types";

export default function AdminPaymentSettingsPage() {
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Form local state
  const [mpEnabled, setMpEnabled] = useState(true);
  const [mpSandbox, setMpSandbox] = useState(true);
  const [mpPublicKey, setMpPublicKey] = useState("");
  const [mpAccessToken, setMpAccessToken] = useState("");
  const [mpClientId, setMpClientId] = useState("");
  const [mpClientSecret, setMpClientSecret] = useState("");
  const [mpInstallmentsEnabled, setMpInstallmentsEnabled] = useState(true);
  const [mpMaxInstallments, setMpMaxInstallments] = useState(12);
  const [mpDescriptor, setMpDescriptor] = useState("BRAVIO WESTERN");

  const [speiEnabled, setSpeiEnabled] = useState(true);
  const [speiBankName, setSpeiBankName] = useState("BBVA México");
  const [speiBeneficiary, setSpeiBeneficiary] = useState("BRAVÍO WESTERN TRADING S.A. DE C.V.");
  const [speiClabe, setSpeiClabe] = useState("012 225 0011 8293 8472");
  const [speiAccountNumber, setSpeiAccountNumber] = useState("1182938472");
  const [speiEmail, setSpeiEmail] = useState("pagos@braviowestern.com.mx");
  const [speiWhatsapp, setSpeiWhatsapp] = useState("+52 (477) 729-6578");
  const [speiInstructions, setSpeiInstructions] = useState(
    "Transfiere el monto exacto vía SPEI. Ingresa tu número de pedido en el concepto/referencia para agilizar la validación automática."
  );
  const [speiExpirationHours, setSpeiExpirationHours] = useState(48);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings/payments");
      const data = await res.json();
      if (data.settings) {
        const s: PaymentSettings = data.settings;
        setSettings(s);
        setMpEnabled(s.mercadopago.enabled);
        setMpSandbox(s.mercadopago.sandboxMode);
        setMpPublicKey(s.mercadopago.publicKey || "");
        setMpAccessToken(s.mercadopago.accessToken || "");
        setMpClientId(s.mercadopago.clientId || "");
        setMpClientSecret(s.mercadopago.clientSecret || "");
        setMpInstallmentsEnabled(s.mercadopago.installmentsEnabled);
        setMpMaxInstallments(s.mercadopago.maxInstallments || 12);
        setMpDescriptor(s.mercadopago.statementDescriptor || "BRAVIO WESTERN");

        setSpeiEnabled(s.spei.enabled);
        setSpeiBankName(s.spei.bankName || "BBVA México");
        setSpeiBeneficiary(s.spei.beneficiary || "BRAVÍO WESTERN TRADING S.A. DE C.V.");
        setSpeiClabe(s.spei.clabe || "012 225 0011 8293 8472");
        setSpeiAccountNumber(s.spei.accountNumber || "");
        setSpeiEmail(s.spei.notificationEmail || "pagos@braviowestern.com.mx");
        setSpeiWhatsapp(s.spei.notificationWhatsapp || "+52 (477) 729-6578");
        setSpeiInstructions(s.spei.instructions || "");
        setSpeiExpirationHours(s.spei.expirationHours || 48);
      }
    } catch (err) {
      console.error(err);
      showToast("Error al cargar configuración", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    showToast(`${keyName} copiado al portapapeles.`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        mercadopago: {
          enabled: mpEnabled,
          sandboxMode: mpSandbox,
          publicKey: mpPublicKey.trim(),
          accessToken: mpAccessToken.trim(),
          clientId: mpClientId.trim(),
          clientSecret: mpClientSecret.trim(),
          installmentsEnabled: mpInstallmentsEnabled,
          maxInstallments: Number(mpMaxInstallments),
          statementDescriptor: mpDescriptor.trim(),
        },
        spei: {
          enabled: speiEnabled,
          bankName: speiBankName.trim(),
          beneficiary: speiBeneficiary.trim(),
          clabe: speiClabe.replace(/\s+/g, ""),
          accountNumber: speiAccountNumber.trim(),
          notificationEmail: speiEmail.trim(),
          notificationWhatsapp: speiWhatsapp.trim(),
          instructions: speiInstructions.trim(),
          expirationHours: Number(speiExpirationHours),
        },
        updatedBy: "cbarron@ti-boot.com",
      };

      const res = await fetch("/api/admin/settings/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        showToast("Configuración de Mercado Pago y SPEI guardada exitosamente.");
      } else {
        throw new Error(data.error || "No se pudo guardar");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Error al guardar cambios.", "error");
    } finally {
      setSaving(false);
    }
  };

  const cleanClabe = speiClabe.replace(/\s+/g, "");
  const isClabeValid = cleanClabe.length === 18 && /^\d+$/.test(cleanClabe);

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 shadow-2xl flex items-center gap-3 font-sans text-xs border-2 ${
            toast.type === "success"
              ? "bg-[#16120E] border-emerald-500 text-emerald-300"
              : "bg-[#16120E] border-red-500 text-red-300"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CreditCard size={16} className="text-[#5E1C23]" />
            <span className="text-[10px] font-sans tracking-widest text-[#849AAD] uppercase font-bold">
              Pasarelas de Cobro & Finanzas
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#605246] tracking-wider uppercase">
            CONFIGURACIÓN DE PAGOS & SPEI
          </h1>
          <p className="text-xs font-sans text-[#849AAD] mt-1">
            Administra credenciales de Mercado Pago, modo Sandbox/Producción y cuentas bancarias oficiales para transferencias directas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSettings}
            disabled={loading || saving}
            className="p-2.5 bg-white border border-[#B1C7D4] hover:bg-[#F4F7F9] text-[#605246] transition-colors rounded-sm shadow-xs"
            title="Recargar configuración"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#5E1C23] hover:bg-[#4a151a] disabled:opacity-50 text-white text-xs font-sans tracking-wider uppercase font-bold transition-all shadow-md rounded-sm"
          >
            <Save size={14} />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Mercado Pago Status */}
        <div className="p-6 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#009EE3]" />
              <h3 className="font-display text-base text-[#605246] uppercase">
                Mercado Pago
              </h3>
            </div>
            <p className="text-xs font-sans text-[#849AAD]">
              Checkout transparente & Pro (Tarjetas de crédito, débito y efectivo en OXXO).
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span
                className={`px-2.5 py-0.5 text-[10px] font-sans uppercase font-bold rounded-sm border ${
                  mpEnabled
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : "bg-neutral-100 text-neutral-600 border-neutral-300"
                }`}
              >
                {mpEnabled ? "Canal Activo" : "Canal Inactivo"}
              </span>
              <span
                className={`px-2.5 py-0.5 text-[10px] font-sans uppercase font-bold rounded-sm border ${
                  mpSandbox
                    ? "bg-amber-50 text-amber-800 border-amber-300"
                    : "bg-blue-50 text-blue-800 border-blue-300"
                }`}
              >
                {mpSandbox ? "Modo Sandbox (Pruebas)" : "Producción Real"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-sans uppercase text-[#849AAD] block">MSI Máximo</span>
            <span className="font-display text-xl text-[#605246] font-bold">
              {mpInstallmentsEnabled ? `${mpMaxInstallments} Meses` : "Sin MSI"}
            </span>
          </div>
        </div>

        {/* Card SPEI Status */}
        <div className="p-6 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#5E1C23]" />
              <h3 className="font-display text-base text-[#605246] uppercase">
                Transferencia SPEI
              </h3>
            </div>
            <p className="text-xs font-sans text-[#849AAD]">
              Transferencia interbancaria directa sin comisión de pasarela.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span
                className={`px-2.5 py-0.5 text-[10px] font-sans uppercase font-bold rounded-sm border ${
                  speiEnabled
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : "bg-neutral-100 text-neutral-600 border-neutral-300"
                }`}
              >
                {speiEnabled ? "Canal Activo" : "Canal Inactivo"}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-sans uppercase font-bold rounded-sm border bg-[#F4F7F9] text-[#605246] border-[#B1C7D4]">
                {speiBankName || "Banco"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-sans uppercase text-[#849AAD] block">Vigencia Pago</span>
            <span className="font-display text-xl text-[#5E1C23] font-bold">
              {speiExpirationHours} Horas
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* SECCIÓN 1: MERCADO PAGO */}
        <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#B1C7D4]/40 bg-[#FAFBFB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#009EE3]/10 flex items-center justify-center text-[#009EE3]">
                <CreditCard size={20} />
              </div>
              <div>
                <h2 className="font-display text-lg text-[#605246] uppercase tracking-wide">
                  Pasarela Mercado Pago
                </h2>
                <p className="text-xs font-sans text-[#849AAD]">
                  Configura tus credenciales API obtenidas desde tu cuenta de Mercado Pago Developers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mpEnabled}
                  onChange={(e) => setMpEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#5E1C23] focus:ring-[#5E1C23] border-[#B1C7D4] rounded"
                />
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#605246]">
                  Activar en Checkout
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={mpSandbox}
                  onChange={(e) => setMpSandbox(e.target.checked)}
                  className="w-4 h-4 text-[#5E1C23] focus:ring-[#5E1C23] border-[#B1C7D4] rounded"
                />
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 border border-amber-300 rounded">
                  Modo Sandbox
                </span>
              </label>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Guide notice */}
            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-sm flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs font-sans text-blue-900 space-y-1">
                <p className="font-bold">¿Dónde encontrar tus credenciales de Mercado Pago?</p>
                <p>
                  Ingresa a{" "}
                  <a
                    href="https://www.mercadopago.com.mx/developers/panel/app"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold inline-flex items-center gap-1 text-blue-700 hover:text-blue-950"
                  >
                    Mercado Pago Developers <ExternalLink size={12} />
                  </a>
                  , crea o selecciona tu aplicación y copia tu <strong>Public Key</strong> y{" "}
                  <strong>Access Token</strong> de la sección de credenciales de Prueba (Sandbox) o Producción.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Access Token */}
              <div className="md:col-span-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                    Mercado Pago Access Token *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAccessToken(!showAccessToken)}
                    className="text-xs text-[#849AAD] hover:text-[#605246] flex items-center gap-1 font-sans"
                  >
                    {showAccessToken ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showAccessToken ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showAccessToken ? "text" : "password"}
                    value={mpAccessToken}
                    onChange={(e) => setMpAccessToken(e.target.value)}
                    placeholder="APP_USR-xxxxxx o TEST-xxxxxx"
                    className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] font-mono focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                  />
                  {mpAccessToken && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(mpAccessToken, "Access Token")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#849AAD] hover:text-[#605246]"
                      title="Copiar token"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
                <p className="text-[10px] font-sans text-[#849AAD]">
                  Utilizado por el servidor para generar preferencias de pago seguras y procesar transacciones.
                </p>
              </div>

              {/* Public Key */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Public Key (Clave Pública) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={mpPublicKey}
                    onChange={(e) => setMpPublicKey(e.target.value)}
                    placeholder="TEST-xxxxxx o APP_USR-xxxxxx"
                    className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] font-mono focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                  />
                  {mpPublicKey && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(mpPublicKey, "Public Key")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#849AAD] hover:text-[#605246]"
                      title="Copiar Public Key"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
                <p className="text-[10px] font-sans text-[#849AAD]">
                  Clave visible para el SDK frontend de Mercado Pago.
                </p>
              </div>

              {/* Statement Descriptor */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Nombre en Estado de Cuenta (Descriptor)
                </label>
                <input
                  type="text"
                  value={mpDescriptor}
                  onChange={(e) => setMpDescriptor(e.target.value)}
                  maxLength={22}
                  placeholder="BRAVIO WESTERN"
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] uppercase focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                />
                <p className="text-[10px] font-sans text-[#849AAD]">
                  Aparece en el estado de cuenta bancario del comprador (máx. 22 caracteres).
                </p>
              </div>

              {/* Installments switch */}
              <div className="p-4 bg-[#FAFBFB] border border-[#B1C7D4]/50 rounded-sm space-y-3">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={mpInstallmentsEnabled}
                    onChange={(e) => setMpInstallmentsEnabled(e.target.checked)}
                    className="w-4 h-4 text-[#5E1C23] focus:ring-[#5E1C23] border-[#B1C7D4] rounded"
                  />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#605246]">
                    Habilitar Meses Sin Intereses (MSI)
                  </span>
                </label>
                <p className="text-[11px] font-sans text-[#849AAD]">
                  Permite a los clientes pagar a plazos si su banco lo admite en Mercado Pago.
                </p>
              </div>

              {/* Max Installments */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Plazo Máximo de Mensualidades
                </label>
                <select
                  value={mpMaxInstallments}
                  onChange={(e) => setMpMaxInstallments(Number(e.target.value))}
                  disabled={!mpInstallmentsEnabled}
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] disabled:opacity-50 focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                >
                  <option value={3}>Hasta 3 Meses</option>
                  <option value={6}>Hasta 6 Meses</option>
                  <option value={9}>Hasta 9 Meses</option>
                  <option value={12}>Hasta 12 Meses</option>
                  <option value={18}>Hasta 18 Meses</option>
                  <option value={24}>Hasta 24 Meses</option>
                </select>
                <p className="text-[10px] font-sans text-[#849AAD]">
                  Límite máximo permitido para la pasarela de pago.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: SPEI / TRANSFERENCIA BANCARIA */}
        <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#B1C7D4]/40 bg-[#FAFBFB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#5E1C23]/10 flex items-center justify-center text-[#5E1C23]">
                <Landmark size={20} />
              </div>
              <div>
                <h2 className="font-display text-lg text-[#605246] uppercase tracking-wide">
                  Cuenta SPEI / Transferencia Bancaria
                </h2>
                <p className="text-xs font-sans text-[#849AAD]">
                  Datos bancarios oficiales presentados al cliente al finalizar su pedido vía SPEI.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={speiEnabled}
                onChange={(e) => setSpeiEnabled(e.target.checked)}
                className="w-4 h-4 text-[#5E1C23] focus:ring-[#5E1C23] border-[#B1C7D4] rounded"
              />
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#605246]">
                Activar SPEI en Checkout
              </span>
            </label>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Banco Receptor */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Institución Bancaria Receptora *
                </label>
                <input
                  type="text"
                  required
                  value={speiBankName}
                  onChange={(e) => setSpeiBankName(e.target.value)}
                  placeholder="Ej. BBVA México, Banorte, Santander"
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                />
              </div>

              {/* Razón Social / Beneficiario */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Beneficiario / Razón Social *
                </label>
                <input
                  type="text"
                  required
                  value={speiBeneficiary}
                  onChange={(e) => setSpeiBeneficiary(e.target.value)}
                  placeholder="BRAVÍO WESTERN TRADING S.A. DE C.V."
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                />
              </div>

              {/* CLABE */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                    CLABE Interbancaria (18 dígitos) *
                  </label>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isClabeValid
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {cleanClabe.length}/18 dígitos {isClabeValid ? "✓ Válida" : "✗ Incompleta"}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={speiClabe}
                    onChange={(e) => setSpeiClabe(e.target.value)}
                    maxLength={22}
                    placeholder="012 180 015894123456"
                    className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] font-mono focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                  />
                  {speiClabe && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cleanClabe, "CLABE")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#849AAD] hover:text-[#605246]"
                      title="Copiar CLABE"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
                <p className="text-[10px] font-sans text-[#849AAD]">
                  Esta CLABE se mostrará en pantalla de confirmación de pedido y en el correo del cliente.
                </p>
              </div>

              {/* Número de Cuenta */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Número de Cuenta (Opcional)
                </label>
                <input
                  type="text"
                  value={speiAccountNumber}
                  onChange={(e) => setSpeiAccountNumber(e.target.value)}
                  placeholder="Ej. 1182938472"
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] font-mono focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                />
              </div>

              {/* Correo de Comprobantes */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Correo Electrónico para Comprobantes *
                </label>
                <input
                  type="email"
                  required
                  value={speiEmail}
                  onChange={(e) => setSpeiEmail(e.target.value)}
                  placeholder="pagos@braviowestern.com.mx"
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                />
              </div>

              {/* WhatsApp de Comprobantes */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  WhatsApp para Envío de Comprobantes
                </label>
                <input
                  type="text"
                  value={speiWhatsapp}
                  onChange={(e) => setSpeiWhatsapp(e.target.value)}
                  placeholder="+52 (477) 729-6578"
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                />
              </div>

              {/* Horas de Vigencia */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Horas de Reserva / Vigencia de Pago
                </label>
                <select
                  value={speiExpirationHours}
                  onChange={(e) => setSpeiExpirationHours(Number(e.target.value))}
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] px-4 py-2.5 text-xs text-[#605246] focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                >
                  <option value={24}>24 Horas (1 día natural)</option>
                  <option value={48}>48 Horas (2 días naturales - Recomendado)</option>
                  <option value={72}>72 Horas (3 días naturales)</option>
                </select>
              </div>

              {/* Instrucciones personalizadas */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[11px] uppercase font-sans font-bold tracking-wider text-[#605246]">
                  Instrucciones de Transferencia para el Cliente
                </label>
                <textarea
                  rows={3}
                  value={speiInstructions}
                  onChange={(e) => setSpeiInstructions(e.target.value)}
                  placeholder="Indica al cliente cómo realizar la transferencia..."
                  className="w-full bg-[#FAFBFB] border border-[#B1C7D4] p-3 text-xs text-[#605246] focus:bg-white focus:outline-none focus:border-[#5E1C23] focus:ring-1 focus:ring-[#5E1C23] transition-colors rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: VISTA PREVIA DEL COMPRADOR (LIVE PREVIEW) */}
        <div className="bg-[#FAFBFB] border border-[#B1C7D4]/60 rounded-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#5E1C23]" />
            <h3 className="font-display text-base text-[#605246] uppercase">
              Vista Previa: Tarjeta SPEI que verá el Comprador al Confirmar Orden
            </h3>
          </div>
          <p className="text-xs font-sans text-[#849AAD]">
            Así es exactamente como se mostrarán los datos bancarios al cliente en su recibo de compra en línea:
          </p>

          <div className="p-6 bg-white border border-[#B1C7D4]/70 rounded-sm shadow-xs max-w-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#B1C7D4]/40 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#5E1C23]" />
                <h4 className="font-display text-sm text-[#605246] uppercase">
                  Datos de Pago por Transferencia SPEI
                </h4>
              </div>
              <span className="text-[10px] font-sans uppercase font-bold px-2 py-0.5 bg-[#F4F7F9] border border-[#B1C7D4] text-[#605246]">
                {speiBankName || "Banco"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
              <div>
                <span className="text-[#849AAD] block uppercase tracking-wider text-[10px] mb-1">
                  Beneficiario:
                </span>
                <span className="text-[#605246] font-bold">
                  {speiBeneficiary || "BRAVÍO WESTERN TRADING S.A. DE C.V."}
                </span>
              </div>

              <div>
                <span className="text-[#849AAD] block uppercase tracking-wider text-[10px] mb-1">
                  CLABE Interbancaria:
                </span>
                <span className="text-[#5E1C23] font-mono font-bold tracking-wider select-all text-sm">
                  {cleanClabe || "012 225 0011 8293 8472"}
                </span>
              </div>

              <div>
                <span className="text-[#849AAD] block uppercase tracking-wider text-[10px] mb-1">
                  Concepto / Referencia:
                </span>
                <span className="text-[#605246] font-bold font-mono">
                  BW-ORD-XXXX
                </span>
              </div>

              <div>
                <span className="text-[#849AAD] block uppercase tracking-wider text-[10px] mb-1">
                  Comprobante a:
                </span>
                <span className="text-[#5E1C23] underline font-bold">
                  {speiEmail || "pagos@braviowestern.com.mx"}
                </span>
              </div>
            </div>

            {speiInstructions && (
              <p className="text-[11px] font-sans text-[#849AAD] pt-2 border-t border-[#B1C7D4]/30">
                {speiInstructions}
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#B1C7D4]/40">
          <div className="text-xs font-sans text-[#849AAD]">
            Última actualización:{" "}
            <span className="font-mono text-[#605246]">
              {settings?.updatedAt ? new Date(settings.updatedAt).toLocaleString("es-MX") : "Hoy"}
            </span>{" "}
            por <span className="font-bold text-[#605246]">{settings?.updatedBy || "cbarron"}</span>
          </div>

          <button
            type="submit"
            disabled={saving || loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-[#5E1C23] hover:bg-[#4a151a] disabled:opacity-50 text-white text-xs font-sans tracking-wider uppercase font-bold transition-all shadow-md rounded-sm"
          >
            <Save size={16} />
            {saving ? "Guardando..." : "Guardar Cambios de Configuración"}
          </button>
        </div>
      </form>
    </div>
  );
}
