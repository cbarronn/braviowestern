"use client";

import React, { useState, useEffect } from "react";
import { Megaphone, Plus, Save, Check, Calendar, ArrowRight } from "lucide-react";
import { CampaignItem } from "@/lib/types";

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [activeCampaignId, setActiveCampaignId] = useState<string>("camp-1");
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/admin/campaigns");
      const data = await res.json();
      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const activeCamp = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];

  const handleUpdate = (updates: Partial<CampaignItem>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === activeCamp.id ? { ...c, ...updates } : c))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/admin/campaigns", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeCamp.id,
          updates: activeCamp,
        }),
      });
      setIsSaving(false);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
      fetchCampaigns();
    } catch (e) {
      console.error(e);
      setIsSaving(false);
    }
  };

  if (!activeCamp) return <div>Cargando campañas...</div>;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-bravio-tsunami font-sans font-bold">
            ESTRATEGIA VISUAL
          </span>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-volcanic uppercase tracking-wide mt-1">
            ADMINISTRADOR DE CAMPAÑAS
          </h1>
          <p className="text-xs text-bravio-tsunami mt-1 font-light">
            Crea y administra lanzamientos audiovisuales como BRAVÍO Mujer 2026 sin tocar código.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light disabled:opacity-50 text-white text-xs font-sans tracking-widest uppercase rounded-sm transition-colors shadow-sm font-medium"
        >
          {savedNotice ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡CAMPAÑA ACTUALIZADA!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Guardando..." : "Guardar & Publicar"}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 cols: Campaign Media & Look */}
        <div className="lg:col-span-5 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6 space-y-4">
          <h3 className="font-display text-sm uppercase text-bravio-volcanic font-bold">
            Portada de Campaña
          </h3>
          <div className="relative aspect-[4/3] bg-[#F8FAFB] rounded-sm overflow-hidden border border-[#B1C7D4]/40">
            <img
              src={activeCamp.coverMedia}
              alt={activeCamp.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pt-2">
            <label className="block text-xs text-bravio-tsunami font-bold mb-1">
              URL Imagen de Portada
            </label>
            <input
              type="text"
              value={activeCamp.coverMedia}
              onChange={(e) => handleUpdate({ coverMedia: e.target.value })}
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-xs text-bravio-volcanic font-mono focus:outline-none focus:border-bravio-granate"
            />
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[11px] uppercase tracking-wider text-bravio-tsunami font-bold block">
              Galería Editorial Asociada ({activeCamp.photos.length} fotos)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {activeCamp.photos.map((p, idx) => (
                <img
                  key={idx}
                  src={p}
                  alt=""
                  className="aspect-square object-cover rounded-sm bg-[#F8FAFB] border border-[#B1C7D4]/40"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 cols: Campaign Content & Landing */}
        <div className="lg:col-span-7 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6 space-y-4 text-xs">
          <h3 className="font-display text-base uppercase text-bravio-volcanic pb-2 border-b border-[#B1C7D4]/40 font-bold">
            Información de Lanzamiento
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-bravio-tsunami font-bold mb-1">Nombre de Campaña</label>
              <input
                type="text"
                value={activeCamp.name}
                onChange={(e) => handleUpdate({ name: e.target.value })}
                className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
              />
            </div>
            <div>
              <label className="block text-bravio-tsunami font-bold mb-1">Subtítulo</label>
              <input
                type="text"
                value={activeCamp.subtitle}
                onChange={(e) => handleUpdate({ subtitle: e.target.value })}
                className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
              />
            </div>
          </div>

          <div>
            <label className="block text-bravio-tsunami font-bold mb-1">Titular de Campaña (Hero Headline)</label>
            <input
              type="text"
              value={activeCamp.headline}
              onChange={(e) => handleUpdate({ headline: e.target.value })}
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic font-display focus:outline-none focus:border-bravio-granate"
            />
          </div>

          <div>
            <label className="block text-bravio-tsunami font-bold mb-1">Texto Descriptivo Principal</label>
            <textarea
              rows={4}
              value={activeCamp.bodyText}
              onChange={(e) => handleUpdate({ bodyText: e.target.value })}
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic leading-relaxed focus:outline-none focus:border-bravio-granate"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-bravio-tsunami font-bold mb-1">Página de Destino (URL)</label>
              <input
                type="text"
                value={activeCamp.destinationUrl}
                onChange={(e) => handleUpdate({ destinationUrl: e.target.value })}
                className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic font-mono focus:outline-none focus:border-bravio-granate"
              />
            </div>
            <div>
              <label className="block text-bravio-tsunami font-bold mb-1">Estado</label>
              <select
                value={activeCamp.status}
                onChange={(e) =>
                  handleUpdate({
                    status: e.target.value as "active" | "draft" | "archived",
                  })
                }
                className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
              >
                <option value="active">Activa en Portada</option>
                <option value="draft">Borrador</option>
                <option value="archived">Archivada</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

