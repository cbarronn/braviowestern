"use client";

import React, { useState, useEffect } from "react";
import { Music, Play, Pause, Volume2, ShieldCheck, Plus, Check, Sliders, AlertTriangle } from "lucide-react";
import { AudioTrack } from "@/lib/types";

export default function AdminAudioPage() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [previewTrackId, setPreviewTrackId] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  // New track form
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("BRAVÍO Sound Lab");
  const [genre, setGenre] = useState("Contemporary Instrumental Country Western");
  const [url, setUrl] = useState("/audio/bravio-theme.wav");
  const [initialVolume, setInitialVolume] = useState(0.28);
  const [licenseDetails, setLicenseDetails] = useState("");
  const [loop, setLoop] = useState(true);

  const fetchTracks = async () => {
    try {
      const res = await fetch("/api/admin/audio");
      const data = await res.json();
      if (data.success) {
        setTracks(data.tracks);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleTogglePreview = (track: AudioTrack) => {
    if (previewTrackId === track.id) {
      audioEl?.pause();
      setPreviewTrackId(null);
    } else {
      audioEl?.pause();
      const el = new Audio(track.url);
      el.volume = track.initialVolume;
      el.play();
      setAudioEl(el);
      setPreviewTrackId(track.id);
      el.onended = () => setPreviewTrackId(null);
    }
  };

  const handleSetMain = async (id: string) => {
    await fetch("/api/admin/audio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, updates: { isMain: true, isEnabled: true } }),
    });
    fetchTracks();
  };

  const handleToggleEnabled = async (track: AudioTrack) => {
    await fetch("/api/admin/audio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: track.id, updates: { isEnabled: !track.isEnabled } }),
    });
    fetchTracks();
  };

  const handleAddTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseDetails.trim()) {
      alert("Es obligatorio documentar la licencia y derechos de autor de la pista.");
      return;
    }

    await fetch("/api/admin/audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        artist,
        genre,
        url,
        durationSeconds: 140,
        isMain: tracks.length === 0,
        isEnabled: true,
        initialVolume,
        loop,
        licenseDetails,
      }),
    });

    setShowAddModal(false);
    setTitle("");
    setLicenseDetails("");
    fetchTracks();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-cinematic text-bravio-cloudy font-sans">
            AMBIENTACIÓN SONORA
          </span>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone uppercase tracking-wide mt-1">
            ADMINISTRACIÓN DE AUDIO WESTERN
          </h1>
          <p className="text-xs text-bravio-cloudy mt-1 font-light">
            Gestiona la banda sonora contemporánea (guitarras acústicas y slide) y el cumplimiento de derechos de autor.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-sans tracking-widest uppercase rounded transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Subir Pista Musical</span>
        </button>
      </div>

      {/* Tracks List */}
      <div className="space-y-4">
        {tracks.map((track) => {
          const isPreviewing = previewTrackId === track.id;

          return (
            <div
              key={track.id}
              className={`p-6 rounded-sm border bg-bravio-volcanic-card transition-all ${
                track.isMain
                  ? "border-bravio-granate ring-1 ring-bravio-granate/50"
                  : "border-bravio-volcanic-border"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleTogglePreview(track)}
                    className="w-12 h-12 rounded-full bg-bravio-granate/20 text-bravio-bone hover:bg-bravio-granate flex items-center justify-center transition-colors flex-shrink-0"
                    title={isPreviewing ? "Detener vista previa" : "Escuchar vista previa"}
                  >
                    {isPreviewing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-base text-bravio-bone uppercase">
                        {track.title}
                      </h3>
                      {track.isMain && (
                        <span className="bg-bravio-granate text-bravio-bone text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 rounded">
                          PISTA PRINCIPAL
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-bravio-cloudy mt-0.5">
                      {track.artist} • <span className="text-bravio-gold">{track.genre}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleEnabled(track)}
                    className={`px-3 py-1.5 rounded text-xs font-sans tracking-wider uppercase transition-colors ${
                      track.isEnabled
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-bravio-volcanic text-bravio-cloudy/60 border border-bravio-volcanic-border"
                    }`}
                  >
                    {track.isEnabled ? "Ambientación Activa" : "Deshabilitada"}
                  </button>

                  {!track.isMain && (
                    <button
                      onClick={() => handleSetMain(track.id)}
                      className="px-3 py-1.5 bg-bravio-volcanic hover:bg-bravio-volcanic-border text-bravio-bone border border-bravio-volcanic-border rounded text-xs font-sans tracking-wider uppercase transition-colors"
                    >
                      Asignar como Principal
                    </button>
                  )}
                </div>
              </div>

              {/* License and copyright compliance */}
              <div className="pt-4 border-t border-bravio-volcanic-border text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2 text-bravio-cloudy">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Licencia: <span className="text-bravio-bone">{track.licenseDetails}</span>
                  </span>
                </div>

                <div className="flex items-center gap-4 text-bravio-cloudy text-[11px]">
                  <span>Volumen Inicial: {Math.round(track.initialVolume * 100)}%</span>
                  <span>Bucle: {track.loop ? "Sí" : "No"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border rounded max-w-lg w-full p-6 text-xs text-bravio-bone space-y-4">
            <h3 className="font-display text-base uppercase text-bravio-bone pb-2 border-b border-bravio-volcanic-border">
              Nueva Pista de Audio Autorizada
            </h3>

            <form onSubmit={handleAddTrack} className="space-y-4">
              <div>
                <label className="block text-bravio-cloudy mb-1">Título de la Pieza *</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Desierto de Sonora (Guitarras & Slide)"
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-bravio-cloudy mb-1">Compositor / Artista</label>
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                  />
                </div>
                <div>
                  <label className="block text-bravio-cloudy mb-1">Género</label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-bravio-cloudy mb-1">Ruta del Archivo *</label>
                <input
                  required
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone font-mono"
                />
              </div>

              <div>
                <label className="block text-bravio-cloudy mb-1">
                  Licencia & Documentación de Derechos de Autor *
                </label>
                <textarea
                  required
                  rows={3}
                  value={licenseDetails}
                  onChange={(e) => setLicenseDetails(e.target.value)}
                  placeholder="Describe el contrato, comprobante de compra o autorización comercial de la composición musical para uso en web..."
                  className="w-full bg-bravio-volcanic border border-bravio-volcanic-border rounded px-3 py-2 text-bravio-bone"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="loop"
                  checked={loop}
                  onChange={(e) => setLoop(e.target.checked)}
                  className="accent-bravio-granate"
                />
                <label htmlFor="loop" className="text-bravio-cloudy">
                  Reproducir continuamente en bucle durante la sesión
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-bravio-volcanic-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-bravio-volcanic border border-bravio-volcanic-border rounded text-bravio-cloudy"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone rounded uppercase tracking-wider font-medium"
                >
                  Guardar Pista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
