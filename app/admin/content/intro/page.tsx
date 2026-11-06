"use client";

import React, { useState, useEffect } from "react";
import { Video, Save, Check, Play, ShieldAlert } from "lucide-react";
import { IntroConfig } from "@/lib/types";

export default function AdminIntroPage() {
  const [config, setConfig] = useState<IntroConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const fetchIntro = async () => {
    try {
      const res = await fetch("/api/admin/content/intro");
      const data = await res.json();
      if (data.success) {
        setConfig(data.intro);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchIntro();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setIsSaving(true);
    try {
      await fetch("/api/admin/content/intro", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setIsSaving(false);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
      fetchIntro();
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  if (!config) return <div>Cargando configuración de intro...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
            EXPERIENCIA CINEMATOGRÁFICA
          </span>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone uppercase tracking-wide mt-1">
            ADMINISTRACIÓN DE LA INTRO
          </h1>
          <p className="text-xs text-bravio-cloudy mt-1 font-light">
            Sustituye el video de apertura, define su frecuencia y personaliza el comportamiento de omisión.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light disabled:opacity-50 text-bravio-bone text-xs font-sans tracking-widest uppercase rounded transition-colors shadow-lg shadow-bravio-granate/20 font-medium"
        >
          {savedNotice ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡ACTUALIZADO EN VIVO!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Guardando..." : "Guardar Cambios"}</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Video Preview */}
        <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border rounded p-6 space-y-4">
          <h3 className="font-display text-sm uppercase text-bravio-bone">
            Vista Previa de la Secuencia
          </h3>
          <div className="relative aspect-[16/9] bg-bravio-volcanic rounded overflow-hidden border border-bravio-volcanic-border">
            <video
              src={config.videoUrl}
              poster={config.posterUrl}
              controls
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[11px] text-bravio-cloudy/70">
            Resolución recomendada: 1920x1080 (horizontal) y 1080x1920 (móvil progresivo). Formato MP4 H.264 o WebM.
          </p>
        </div>

        {/* Right: Controls Form */}
        <form onSubmit={handleSave} className="bg-bravio-volcanic-card border border-bravio-volcanic-border rounded p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-bravio-volcanic-border">
            <span className="font-sans uppercase text-bravio-bone font-medium">
              Estado de la Intro
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-bravio-volcanic peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bravio-granate"></div>
            </label>
          </div>

          <div>
            <label className="block text-bravio-cloudy mb-1">Ruta del Video MP4 / WebM</label>
            <input
              type="text"
              value={config.videoUrl}
              onChange={(e) => setConfig({ ...config, videoUrl: e.target.value })}
              className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-mono"
            />
          </div>

          <div>
            <label className="block text-bravio-cloudy mb-1">Imagen Poster (Fallback)</label>
            <input
              type="text"
              value={config.posterUrl}
              onChange={(e) => setConfig({ ...config, posterUrl: e.target.value })}
              className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-bravio-cloudy mb-1">Duración Objetivo</label>
              <select
                value={config.durationSeconds}
                onChange={(e) =>
                  setConfig({ ...config, durationSeconds: parseInt(e.target.value) })
                }
                className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
              >
                <option value={4}>4 Segundos</option>
                <option value={5}>5 Segundos (Recomendado)</option>
                <option value={6}>6 Segundos</option>
              </select>
            </div>

            <div>
              <label className="block text-bravio-cloudy mb-1">Frecuencia</label>
              <select
                value={config.frequency}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    frequency: e.target.value as "once_per_session" | "always",
                  })
                }
                className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
              >
                <option value="once_per_session">Una vez por sesión</option>
                <option value="always">Siempre en cada recarga</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="skip"
                checked={config.allowSkip}
                onChange={(e) => setConfig({ ...config, allowSkip: e.target.checked })}
                className="accent-bravio-granate"
              />
              <label htmlFor="skip" className="text-bravio-cloudy">
                Mostrar botón visible "Saltar Intro"
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="reduced"
                checked={config.respectReducedMotion}
                onChange={(e) =>
                  setConfig({ ...config, respectReducedMotion: e.target.checked })
                }
                className="accent-bravio-granate"
              />
              <label htmlFor="reduced" className="text-bravio-cloudy">
                Respetar preferencia de usuario "Movimiento reducido"
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
