"use client";

import React, { useState, useEffect } from "react";
import { LayoutTemplate, Eye, EyeOff, ArrowUp, ArrowDown, Save, Check } from "lucide-react";
import { HomeSectionConfig } from "@/lib/types";

export default function AdminHomeEditorPage() {
  const [sections, setSections] = useState<HomeSectionConfig[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>("sec-hero");
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/admin/content/home");
      const data = await res.json();
      if (data.success) {
        setSections(data.sections);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const activeSec = sections.find((s) => s.id === activeSectionId) || sections[0];

  const handleUpdateActiveData = (key: string, value: any) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSec.id
          ? { ...s, data: { ...s.data, [key]: value } }
          : s
      )
    );
  };

  const handleToggleSectionEnabled = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleMoveSection = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;

    const list = [...sections];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    const reordered = list.map((item, idx) => ({ ...item, sortOrder: idx + 1 }));
    setSections(reordered);
  };

  const handleSaveHome = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/admin/content/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeSec.id,
          updates: activeSec,
        }),
      });
      setIsSaving(false);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
      fetchSections();
    } catch (e) {
      console.error(e);
      setIsSaving(false);
    }
  };

  if (!activeSec) return <div>Cargando editor del Home...</div>;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
            MODULARIDAD VISUAL
          </span>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone uppercase tracking-wide mt-1">
            EDITOR DE PORTADA (HOME)
          </h1>
          <p className="text-xs text-bravio-cloudy mt-1 font-light">
            Reorganiza las secciones, personaliza titulares y actualiza imágenes del Hero en tiempo real.
          </p>
        </div>

        <button
          onClick={handleSaveHome}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light disabled:opacity-50 text-bravio-bone text-xs font-sans tracking-widest uppercase rounded transition-colors shadow-lg shadow-bravio-granate/20 font-medium"
        >
          {savedNotice ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡CAMBIOS PUBLICADOS!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Guardando..." : "Publicar Cambios"}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 cols: Section Reordering & Activation */}
        <div className="lg:col-span-5 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded p-6 space-y-4">
          <h3 className="font-display text-sm uppercase text-bravio-bone pb-2 border-b border-bravio-volcanic-border">
            Estructura de Secciones
          </h3>

          <div className="space-y-2">
            {sections.map((sec, idx) => {
              const isSelected = sec.id === activeSec.id;

              return (
                <div
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-bravio-granate/20 border-bravio-granate text-bravio-bone"
                      : "bg-bravio-volcanic border-bravio-volcanic-border text-bravio-cloudy hover:text-bravio-bone"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-bravio-gold font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-sans tracking-wider uppercase font-medium">
                      {sec.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSectionEnabled(sec.id);
                      }}
                      className="p-1 hover:text-bravio-bone transition-colors"
                      title={sec.enabled ? "Desactivar sección" : "Activar sección"}
                    >
                      {sec.enabled ? (
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-red-400" />
                      )}
                    </button>

                    <button
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveSection(idx, "up");
                      }}
                      className="p-1 hover:text-bravio-bone disabled:opacity-20 transition-colors"
                      title="Subir sección"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      disabled={idx === sections.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveSection(idx, "down");
                      }}
                      className="p-1 hover:text-bravio-bone disabled:opacity-20 transition-colors"
                      title="Bajar sección"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 cols: Section Content Editor */}
        <div className="lg:col-span-7 bg-bravio-volcanic-card border border-bravio-volcanic-border rounded p-6 space-y-4 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-bravio-volcanic-border">
            <h3 className="font-display text-base uppercase text-bravio-bone">
              Editando: {activeSec.title}
            </h3>
            <span
              className={`text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 rounded ${
                activeSec.enabled
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {activeSec.enabled ? "Visible en Producción" : "Oculto"}
            </span>
          </div>

          {activeSec.type === "hero" && (
            <div className="space-y-4">
              <div>
                <label className="block text-bravio-cloudy mb-1">Titular Principal (Headline)</label>
                <input
                  type="text"
                  value={activeSec.data.headline || ""}
                  onChange={(e) => handleUpdateActiveData("headline", e.target.value)}
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-display"
                />
              </div>

              <div>
                <label className="block text-bravio-cloudy mb-1">Subtítulo Descriptivo</label>
                <textarea
                  rows={3}
                  value={activeSec.data.subheadline || ""}
                  onChange={(e) => handleUpdateActiveData("subheadline", e.target.value)}
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-bravio-cloudy mb-1">Texto Botón Primario</label>
                  <input
                    type="text"
                    value={activeSec.data.ctaPrimaryText || ""}
                    onChange={(e) => handleUpdateActiveData("ctaPrimaryText", e.target.value)}
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                  />
                </div>
                <div>
                  <label className="block text-bravio-cloudy mb-1">Enlace Botón Primario</label>
                  <input
                    type="text"
                    value={activeSec.data.ctaPrimaryLink || ""}
                    onChange={(e) => handleUpdateActiveData("ctaPrimaryLink", e.target.value)}
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-bravio-cloudy mb-1">Imagen Escritorio (URL)</label>
                  <input
                    type="text"
                    value={activeSec.data.desktopImage || ""}
                    onChange={(e) => handleUpdateActiveData("desktopImage", e.target.value)}
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-mono"
                  />
                </div>
                <div>
                  <label className="block text-bravio-cloudy mb-1">Video de Fondo (URL)</label>
                  <input
                    type="text"
                    value={activeSec.data.videoUrl || ""}
                    onChange={(e) => handleUpdateActiveData("videoUrl", e.target.value)}
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSec.type === "manifesto" && (
            <div className="space-y-4">
              <div>
                <label className="block text-bravio-cloudy mb-1">Texto del Manifiesto</label>
                <textarea
                  rows={4}
                  value={activeSec.data.quote || ""}
                  onChange={(e) => handleUpdateActiveData("quote", e.target.value)}
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-display leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-bravio-cloudy mb-1">Firma / Autor</label>
                <input
                  type="text"
                  value={activeSec.data.author || ""}
                  onChange={(e) => handleUpdateActiveData("author", e.target.value)}
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                />
              </div>
            </div>
          )}

          {activeSec.type === "craftsmanship" && (
            <div className="space-y-4">
              <div>
                <label className="block text-bravio-cloudy mb-1">Titular de Artesanía</label>
                <input
                  type="text"
                  value={activeSec.data.headline || ""}
                  onChange={(e) => handleUpdateActiveData("headline", e.target.value)}
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                />
              </div>
              <div>
                <label className="block text-bravio-cloudy mb-1">Descripción</label>
                <textarea
                  rows={4}
                  value={activeSec.data.description || ""}
                  onChange={(e) => handleUpdateActiveData("description", e.target.value)}
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

