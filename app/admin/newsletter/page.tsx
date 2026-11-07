"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Users,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Tag,
  FileText,
  Smartphone,
  Monitor,
} from "lucide-react";
import { CruzDeHierro } from "@/components/ui/BravioLogo";
import {
  NEWSLETTER_PRESETS,
  NewsletterPreset,
  renderNewsletterHtml,
} from "@/lib/email/newsletter-templates";

type TabMode = "editor" | "audience" | "history";

export default function AdminNewsletterPage() {
  const [tab, setTab] = useState<TabMode>("editor");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Stats & Lists from API
  const [stats, setStats] = useState({
    totalUnique: 0,
    totalSubscribers: 0,
    totalCustomers: 0,
    campaignsCount: 0,
  });
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  // Selected Preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>("lanzamiento-coleccion");

  // Form State
  const [audience, setAudience] = useState<"all" | "customers" | "subscribers" | "test">("all");
  const [testEmail, setTestEmail] = useState("cbarron@ti-boot.com");
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [headline, setHeadline] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponBadge, setCouponBadge] = useState("");
  const [couponDesc, setCouponDesc] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  // Preview Mode: desktop vs mobile
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Confirmation Modal
  const [confirmSendOpen, setConfirmSendOpen] = useState(false);

  // New Subscriber Modal
  const [newSubEmail, setNewSubEmail] = useState("");
  const [isAddingSub, setIsAddingSub] = useState(false);

  const fetchNewsletterData = async () => {
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setSubscribers(data.subscribers || []);
        setCampaigns(data.campaigns || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletterData();
  }, []);

  // Load preset content
  const loadPreset = (presetId: string) => {
    const preset = NEWSLETTER_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setSelectedPresetId(preset.id);
    setSubject(preset.content.subject);
    setPreheader(preset.content.preheader || "");
    setHeadline(preset.content.headline);
    setBodyText(preset.content.bodyParagraphs.join("\n\n"));
    setImageUrl(preset.content.imageUrl || "");
    setCouponBadge(preset.content.highlightBox?.badge || "");
    setCouponCode(preset.content.highlightBox?.code || "");
    setCouponDesc(preset.content.highlightBox?.description || "");
    setButtonText(preset.content.buttonText || "");
    setButtonUrl(preset.content.buttonUrl || "");
  };

  // Load initial default preset
  useEffect(() => {
    loadPreset("lanzamiento-coleccion");
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Send action (Test or Mass)
  const handleSend = async (targetAudience: "test" | "all" | "customers" | "subscribers") => {
    setSending(true);
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience: targetAudience,
          testEmail: targetAudience === "test" ? testEmail : undefined,
          subject,
          preheader,
          headline,
          bodyParagraphs: bodyText.split("\n\n").filter(Boolean),
          imageUrl: imageUrl || undefined,
          highlightBox: couponCode
            ? {
                badge: couponBadge || "BENEFICIO EXCLUSIVO",
                code: couponCode,
                description: couponDesc || "Válido en la tienda oficial BRAVÍO Western.",
              }
            : undefined,
          buttonText: buttonText || undefined,
          buttonUrl: buttonUrl || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast(data.error || "Error al enviar el boletín.", "error");
        return;
      }

      if (targetAudience === "test") {
        showToast(`Correo de prueba enviado con éxito a ${testEmail}.`);
      } else {
        showToast(
          `¡Campaña enviada con éxito! ${data.sentCount} correos entregados satisfactoriamente.`
        );
        setConfirmSendOpen(false);
        fetchNewsletterData();
      }
    } catch (err: any) {
      showToast("Error de conexión al enviar el correo.", "error");
    } finally {
      setSending(false);
    }
  };

  // Add subscriber manually
  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail) return;

    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add_subscriber", email: newSubEmail }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Suscriptor ${newSubEmail} añadido correctamente.`);
        setNewSubEmail("");
        setIsAddingSub(false);
        fetchNewsletterData();
      } else {
        showToast(data.error || "Error al agregar suscriptor.", "error");
      }
    } catch (err) {
      showToast("Error de red al agregar suscriptor.", "error");
    }
  };

  // Delete subscriber
  const handleDeleteSubscriber = async (id: string, email: string) => {
    if (!confirm(`¿Eliminar al suscriptor ${email}?`)) return;
    try {
      const res = await fetch(`/api/admin/newsletter?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showToast(`Suscriptor ${email} dado de baja.`);
        fetchNewsletterData();
      }
    } catch (err) {
      showToast("Error al dar de baja.", "error");
    }
  };

  // Live preview HTML content
  const previewHtml = renderNewsletterHtml({
    subject,
    preheader,
    headline,
    bodyParagraphs: bodyText ? bodyText.split("\n\n").filter(Boolean) : ["Escribe el contenido..."],
    imageUrl: imageUrl || undefined,
    highlightBox: couponCode
      ? {
          badge: couponBadge || "BENEFICIO EXCLUSIVO",
          code: couponCode,
          description: couponDesc || "Válido en la tienda oficial BRAVÍO Western.",
        }
      : undefined,
    buttonText: buttonText || undefined,
    buttonUrl: buttonUrl || undefined,
  });

  const getAudienceCount = () => {
    if (audience === "all") return stats.totalUnique;
    if (audience === "customers") return stats.totalCustomers;
    if (audience === "subscribers") return stats.totalSubscribers;
    return 1;
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto font-sans">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 bg-white border-2 px-5 py-3 shadow-2xl flex items-center gap-3 font-sans text-xs rounded-sm ${
            toast.type === "success"
              ? "border-emerald-500 text-emerald-800"
              : "border-red-500 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CruzDeHierro size={16} color="#5E1C23" />
            <span className="text-[10px] tracking-widest text-[#849AAD] uppercase font-bold">
              Email Marketing & Relaciones con Clientes
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#605246] tracking-wider uppercase">
            NEWSLETTER & ENVÍOS MASIVOS
          </h1>
          <p className="text-xs text-[#849AAD] mt-1 font-sans">
            Comunica lanzamientos, beneficios de preventa y contenido artesanal a compradores y suscriptores.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-[#849AAD]">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Remitente verificado: <strong className="text-[#5E1C23]">hola@braviowestern.com.mx</strong></span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#849AAD] block">
            Audiencia Total Única
          </span>
          <span className="font-mono text-2xl font-bold text-[#605246] mt-1 block">
            {stats.totalUnique}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">
            Listos para recibir envíos
          </span>
        </div>

        <div className="p-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#849AAD] block">
            Suscriptores Newsletter
          </span>
          <span className="font-mono text-2xl font-bold text-[#605246] mt-1 block">
            {stats.totalSubscribers}
          </span>
          <span className="text-[10px] text-[#849AAD] block mt-1">
            Registrados desde la web o manual
          </span>
        </div>

        <div className="p-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#849AAD] block">
            Clientes Compradores
          </span>
          <span className="font-mono text-2xl font-bold text-[#605246] mt-1 block">
            {stats.totalCustomers}
          </span>
          <span className="text-[10px] text-[#849AAD] block mt-1">
            Han realizado al menos 1 pedido
          </span>
        </div>

        <div className="p-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#849AAD] block">
            Campañas Enviadas
          </span>
          <span className="font-mono text-2xl font-bold text-[#5E1C23] mt-1 block">
            {stats.campaignsCount}
          </span>
          <span className="text-[10px] text-[#849AAD] block mt-1">
            Envíos masivos registrados
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#B1C7D4]/40 gap-2 text-xs">
        <button
          onClick={() => setTab("editor")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
            tab === "editor"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <Mail size={14} /> Redactar & Lanzar Campaña
        </button>

        <button
          onClick={() => setTab("audience")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
            tab === "audience"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <Users size={14} /> Directorio de Audiencia ({stats.totalUnique})
        </button>

        <button
          onClick={() => setTab("history")}
          className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
            tab === "history"
              ? "border-[#5E1C23] text-[#5E1C23] bg-[#5E1C23]/5"
              : "border-transparent text-[#849AAD] hover:text-[#605246]"
          }`}
        >
          <Clock size={14} /> Historial de Campañas ({campaigns.length})
        </button>
      </div>

      {/* TAB 1: EDITOR & LIVE PREVIEW */}
      {tab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Side (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Machotes Selector */}
            <div className="p-5 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#5E1C23]">
                <Sparkles size={16} />
                <h3 className="font-display text-xs uppercase tracking-wider font-bold">
                  Seleccionar Machote Pre-Diseñado
                </h3>
              </div>
              <p className="text-[11px] text-[#849AAD]">
                Haz clic en cualquier machote editorial para cargar su estructura de texto y diseño:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {NEWSLETTER_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => loadPreset(preset.id)}
                    className={`text-left p-3 rounded-sm border transition-all ${
                      selectedPresetId === preset.id
                        ? "border-[#5E1C23] bg-[#5E1C23]/5 text-[#5E1C23] ring-1 ring-[#5E1C23]"
                        : "border-[#B1C7D4]/50 bg-[#F8FAFB] text-[#605246] hover:border-[#5E1C23]/60"
                    }`}
                  >
                    <span className="font-bold text-xs uppercase block">{preset.name}</span>
                    <span className="text-[10px] text-[#849AAD] leading-snug block mt-0.5">
                      {preset.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Audience Target */}
            <div className="p-5 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#605246] block">
                Audiencia Destinataria
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setAudience("all")}
                  className={`p-2.5 rounded-sm border font-bold uppercase tracking-wider text-left transition-colors ${
                    audience === "all"
                      ? "border-[#5E1C23] bg-[#5E1C23] text-white"
                      : "border-[#B1C7D4]/60 bg-white text-[#605246] hover:bg-[#F8FAFB]"
                  }`}
                >
                  <span className="block text-[11px]">Toda la Base</span>
                  <span className="text-[9px] opacity-80 block">{stats.totalUnique} contactos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudience("subscribers")}
                  className={`p-2.5 rounded-sm border font-bold uppercase tracking-wider text-left transition-colors ${
                    audience === "subscribers"
                      ? "border-[#5E1C23] bg-[#5E1C23] text-white"
                      : "border-[#B1C7D4]/60 bg-white text-[#605246] hover:bg-[#F8FAFB]"
                  }`}
                >
                  <span className="block text-[11px]">Solo Suscriptores</span>
                  <span className="text-[9px] opacity-80 block">{stats.totalSubscribers} correos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudience("customers")}
                  className={`p-2.5 rounded-sm border font-bold uppercase tracking-wider text-left transition-colors ${
                    audience === "customers"
                      ? "border-[#5E1C23] bg-[#5E1C23] text-white"
                      : "border-[#B1C7D4]/60 bg-white text-[#605246] hover:bg-[#F8FAFB]"
                  }`}
                >
                  <span className="block text-[11px]">Solo Compradores</span>
                  <span className="text-[9px] opacity-80 block">{stats.totalCustomers} clientes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudience("test")}
                  className={`p-2.5 rounded-sm border font-bold uppercase tracking-wider text-left transition-colors ${
                    audience === "test"
                      ? "border-[#5E1C23] bg-[#5E1C23] text-white"
                      : "border-[#B1C7D4]/60 bg-white text-[#605246] hover:bg-[#F8FAFB]"
                  }`}
                >
                  <span className="block text-[11px]">Prueba Interna</span>
                  <span className="text-[9px] opacity-80 block">Envío individual</span>
                </button>
              </div>

              {audience === "test" && (
                <div className="pt-2">
                  <label className="text-[10px] text-[#849AAD] uppercase font-bold block mb-1">
                    Enviar prueba a:
                  </label>
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="cbarron@ti-boot.com"
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                  />
                </div>
              )}
            </div>

            {/* Custom Content Fields */}
            <div className="p-5 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1">
                  Asunto del Correo (Subject)
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej. Exclusiva para Suscriptores: Nuevo Lanzamiento BRAVÍO"
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1">
                  Texto de Pre-encabezado (Preheader)
                </label>
                <input
                  type="text"
                  value={preheader}
                  onChange={(e) => setPreheader(e.target.value)}
                  placeholder="Vista previa que aparece en la bandeja de entrada..."
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1">
                  Titular Principal (Headline)
                </label>
                <input
                  type="text"
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Ej. EL RENACER DEL ESTILO WESTERN CONTEMPORÁNEO"
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs font-bold text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1">
                  URL de Imagen Destacada (Opcional)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://braviowestern.com.mx/products/..."
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1">
                  Cuerpo del Mensaje (Separa párrafos con doble salto de línea)
                </label>
                <textarea
                  rows={5}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] p-3 text-xs text-[#605246] leading-relaxed focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              {/* Coupon / Highlight Box */}
              <div className="p-3 bg-[#F8FAFB] border border-[#B1C7D4]/50 rounded space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#5E1C23] block">
                  ✦ Recuadro Especial de Código / Beneficio (Opcional)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={couponBadge}
                    onChange={(e) => setCouponBadge(e.target.value)}
                    placeholder="Etiqueta (Ej. CUPÓN EXCLUSIVO)"
                    className="w-full bg-white border border-[#B1C7D4] px-2.5 py-1.5 text-xs text-[#605246]"
                  />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Código (Ej. BIENVENIDO10)"
                    className="w-full bg-white border border-[#B1C7D4] px-2.5 py-1.5 text-xs font-mono font-bold text-[#5E1C23]"
                  />
                </div>
                <input
                  type="text"
                  value={couponDesc}
                  onChange={(e) => setCouponDesc(e.target.value)}
                  placeholder="Descripción (Ej. Válido en cualquier compra en línea)"
                  className="w-full bg-white border border-[#B1C7D4] px-2.5 py-1.5 text-xs text-[#605246]"
                />
              </div>

              {/* CTA Button */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1">
                    Texto del Botón CTA
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Ej. EXPLORAR COLECCIÓN"
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#605246] mb-1">
                    Enlace de Destino (URL)
                  </label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    placeholder="https://braviowestern.com.mx/..."
                    className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs text-[#605246] focus:outline-none focus:border-[#5E1C23]"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                disabled={sending}
                onClick={() => handleSend("test")}
                className="w-full sm:w-auto px-5 py-3 bg-white border border-[#B1C7D4] hover:bg-[#F8FAFB] text-[#605246] font-bold uppercase tracking-wider text-xs rounded-sm shadow-xs flex items-center justify-center gap-2"
              >
                <Eye size={14} />
                <span>Enviar Prueba a Mí ({testEmail})</span>
              </button>

              <button
                type="button"
                disabled={sending || getAudienceCount() === 0}
                onClick={() => {
                  if (audience === "test") {
                    handleSend("test");
                  } else {
                    setConfirmSendOpen(true);
                  }
                }}
                className="w-full sm:w-auto flex-1 px-6 py-3 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>
                  {sending
                    ? "Enviando..."
                    : audience === "test"
                    ? "Enviar Prueba"
                    : `Lanzar Envío Masivo (${getAudienceCount()} destinatarios)`}
                </span>
              </button>
            </div>
          </div>

          {/* Live Preview Side (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#605246]">
                <Eye size={15} className="text-[#5E1C23]" />
                <span>Vista Previa en Vivo</span>
              </div>
              <div className="flex items-center gap-1 bg-[#F8FAFB] border border-[#B1C7D4]/50 p-1 rounded">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1 rounded ${
                    previewDevice === "desktop" ? "bg-white text-[#5E1C23] shadow-xs" : "text-[#849AAD]"
                  }`}
                  title="Vista Escritorio"
                >
                  <Monitor size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1 rounded ${
                    previewDevice === "mobile" ? "bg-white text-[#5E1C23] shadow-xs" : "text-[#849AAD]"
                  }`}
                  title="Vista Móvil"
                >
                  <Smartphone size={14} />
                </button>
              </div>
            </div>

            {/* Email Canvas Preview */}
            <div className="bg-[#E2E8F0] p-4 rounded border border-[#B1C7D4]/60 flex justify-center overflow-auto max-h-[800px]">
              <div
                style={{ width: previewDevice === "mobile" ? "360px" : "100%", maxWidth: "600px" }}
                className="transition-all duration-300 shadow-xl"
              >
                <iframe
                  title="Email Preview"
                  srcDoc={previewHtml}
                  className="w-full h-[720px] bg-white border-0 rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIENCE DIRECTORY */}
      {tab === "audience" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display text-base text-[#605246] uppercase">
                Directorio de Contactos para Envíos
              </h3>
              <p className="text-xs text-[#849AAD]">
                Lista consolidada de suscriptores al newsletter y compradores registrados en la plataforma.
              </p>
            </div>

            <button
              onClick={() => setIsAddingSub(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm"
            >
              <Plus size={14} /> Registrar Correo Manual
            </button>
          </div>

          <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F8FAFB] border-b border-[#B1C7D4]/50 text-[#849AAD] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 font-bold">Correo Electrónico</th>
                  <th className="p-3.5 font-bold">Origen / Canal</th>
                  <th className="p-3.5 font-bold">Fecha de Registro</th>
                  <th className="p-3.5 text-center font-bold">Estado</th>
                  <th className="p-3.5 text-right font-bold">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B1C7D4]/30 text-[#605246]">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#F8FAFB]">
                    <td className="p-3.5 font-mono font-medium">{sub.email}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-[#F4F7F9] border border-[#B1C7D4]/60 rounded text-[#849AAD]">
                        {sub.source === "sitio_web" ? "Suscripción Web" : sub.source === "checkout" ? "Compra en Línea" : "Alta Manual"}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-[#849AAD]">
                      {new Date(sub.createdAt).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-emerald-50 text-emerald-700 border border-emerald-300">
                        {sub.status === "active" ? "Activo" : "Baja"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Eliminar suscriptor"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CAMPAIGN HISTORY */}
      {tab === "history" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-base text-[#605246] uppercase">
              Historial de Boletines Enviados
            </h3>
            <p className="text-xs text-[#849AAD]">
              Registro de todas las campañas de email marketing disparadas desde la plataforma.
            </p>
          </div>

          {campaigns.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#B1C7D4]/60 rounded-sm text-xs text-[#849AAD] space-y-2">
              <Mail size={28} className="text-[#849AAD] mx-auto opacity-40" />
              <p className="font-bold text-[#605246]">No se han registrado envíos masivos aún.</p>
              <p>Utiliza la pestaña "Redactar & Lanzar Campaña" para programar tu primer boletín.</p>
            </div>
          ) : (
            <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#F8FAFB] border-b border-[#B1C7D4]/50 text-[#849AAD] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5 font-bold">Fecha & Hora</th>
                    <th className="p-3.5 font-bold">Asunto del Correo</th>
                    <th className="p-3.5 font-bold">Titular del Machote</th>
                    <th className="p-3.5 font-bold">Audiencia</th>
                    <th className="p-3.5 text-center font-bold">Destinatarios</th>
                    <th className="p-3.5 text-center font-bold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B1C7D4]/30 text-[#605246]">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-[#F8FAFB]">
                      <td className="p-3.5 font-mono text-[11px] text-[#849AAD]">
                        {new Date(camp.sentAt).toLocaleString("es-MX", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="p-3.5 font-bold text-[#605246]">{camp.subject}</td>
                      <td className="p-3.5 text-[11px] text-[#849AAD] uppercase">{camp.title}</td>
                      <td className="p-3.5 uppercase text-[10px] font-bold text-[#5E1C23]">
                        {camp.audience === "all"
                          ? "Toda la base"
                          : camp.audience === "subscribers"
                          ? "Suscriptores"
                          : "Compradores"}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-[#605246]">
                        {camp.recipientsCount}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="px-2 py-0.5 text-[9px] uppercase font-bold rounded bg-emerald-50 text-emerald-700 border border-emerald-300">
                          {camp.status === "sent" ? "Entregado" : camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL: CONFIRMAR ENVÍO MASIVO */}
      {confirmSendOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#B1C7D4] w-full max-w-md rounded-sm shadow-2xl p-6 space-y-5">
            <div className="flex items-center gap-3 text-[#5E1C23]">
              <Send size={22} />
              <h3 className="font-display text-base uppercase text-[#605246]">
                Confirmar Envío Masivo
              </h3>
            </div>

            <div className="p-4 bg-[#F8FAFB] border border-[#B1C7D4]/50 rounded space-y-2 text-xs">
              <p className="text-[#605246]">
                Estás a punto de disparar este boletín vía <strong>Resend</strong> a:
              </p>
              <div className="font-mono text-base font-bold text-[#5E1C23]">
                {getAudienceCount()} destinatarios únicos ({audience.toUpperCase()})
              </div>
              <p className="text-[11px] text-[#849AAD]">
                Remitente: <strong>BRAVÍO Western &lt;hola@braviowestern.com.mx&gt;</strong>
              </p>
              <p className="text-[11px] text-[#849AAD]">
                Asunto: <em>"{subject}"</em>
              </p>
            </div>

            <p className="text-xs text-[#849AAD] leading-relaxed">
              ¿Deseas proceder con el envío masivo en este momento?
            </p>

            <div className="pt-3 flex justify-end gap-3 border-t border-[#B1C7D4]/40 font-sans text-xs">
              <button
                type="button"
                onClick={() => setConfirmSendOpen(false)}
                className="px-4 py-2 bg-white border border-[#B1C7D4] hover:bg-[#F8FAFB] text-[#605246] font-bold uppercase text-[11px] rounded-sm"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={sending}
                onClick={() => handleSend(audience)}
                className="px-5 py-2 bg-[#5E1C23] hover:bg-[#47151a] disabled:opacity-50 text-white font-bold uppercase text-[11px] rounded-sm shadow-sm flex items-center gap-2"
              >
                <Send size={13} />
                <span>{sending ? "Disparando correos..." : "Sí, Disparar Envío Masivo"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRAR CORREO MANUALMENTE */}
      {isAddingSub && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#B1C7D4] w-full max-w-sm rounded-sm shadow-2xl p-6 space-y-4">
            <h3 className="font-display text-sm uppercase text-[#605246]">
              Registrar Suscriptor Manual
            </h3>

            <form onSubmit={handleAddSubscriber} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#849AAD] mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="cliente@ejemplo.com"
                  value={newSubEmail}
                  onChange={(e) => setNewSubEmail(e.target.value)}
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] px-3 py-2 text-xs text-[#605246]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#B1C7D4]/40">
                <button
                  type="button"
                  onClick={() => setIsAddingSub(false)}
                  className="px-3 py-2 bg-white border border-[#B1C7D4] text-[#605246] font-bold uppercase text-[10px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5E1C23] hover:bg-[#47151a] text-white font-bold uppercase text-[10px] shadow-sm"
                >
                  Agregar a la Lista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
