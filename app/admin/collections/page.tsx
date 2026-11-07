"use client";

import React, { useState, useEffect } from "react";
import { FolderKanban, Plus, Star, Eye, EyeOff, Trash2, ArrowUp, ArrowDown, Check, Save } from "lucide-react";
import { CollectionItem } from "@/lib/types";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState<string>("col-1");
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const fetchCollections = async () => {
    try {
      const res = await fetch("/api/admin/collections");
      const data = await res.json();
      if (data.success) {
        setCollections(data.collections);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const activeCol = collections.find((c) => c.id === activeCollectionId) || collections[0];

  const handleUpdateActive = (updates: Partial<CollectionItem>) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === activeCol.id ? { ...c, ...updates } : c))
    );
  };

  const handleSetCover = (url: string) => {
    const updatedGallery = activeCol.gallery.map((g) => ({
      ...g,
      isCover: g.url === url,
    }));
    handleUpdateActive({ coverImage: url, gallery: updatedGallery });
  };

  const handleTogglePhotoVisibility = (id: string) => {
    const updatedGallery = activeCol.gallery.map((g) =>
      g.id === id ? { ...g, status: (g.status === "published" ? "hidden" : "published") as "published" | "hidden" } : g
    );
    handleUpdateActive({ gallery: updatedGallery });
  };

  const handleMovePhoto = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= activeCol.gallery.length) return;

    const list = [...activeCol.gallery];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    handleUpdateActive({ gallery: reordered });
  };

  const handleDeletePhoto = (id: string) => {
    if (!confirm("¿Deseas retirar esta imagen de la colección?")) return;
    const updatedGallery = activeCol.gallery.filter((g) => g.id !== id);
    handleUpdateActive({ gallery: updatedGallery });
  };

  const handleSaveCollection = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/admin/collections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeCol.id,
          updates: activeCol,
        }),
      });
      setIsSaving(false);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
      fetchCollections();
    } catch (e) {
      console.error(e);
      setIsSaving(false);
    }
  };

  if (!activeCol) return <div>Cargando colecciones...</div>;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-bravio-tsunami font-sans font-bold">
            CATÁLOGO & CURADURÍA
          </span>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-volcanic uppercase tracking-wide mt-1">
            ADMINISTRACIÓN VISUAL DE COLECCIONES
          </h1>
          <p className="text-xs text-bravio-tsunami mt-1 font-light">
            Edita portadas, arrastra galerías y sincroniza con la tienda pública al instante.
          </p>
        </div>

        <button
          onClick={handleSaveCollection}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light disabled:opacity-50 text-white text-xs font-sans tracking-widest uppercase rounded-sm transition-colors shadow-sm font-medium"
        >
          {savedNotice ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡PUBLICADO EN VIVO!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Guardando..." : "Guardar & Publicar"}</span>
            </>
          )}
        </button>
      </div>

      {/* Collection Selector Tabs */}
      <div className="flex gap-2 border-b border-[#B1C7D4]/40 pb-3">
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() => setActiveCollectionId(col.id)}
            className={`px-4 py-2 rounded-sm text-xs font-sans tracking-wider uppercase transition-colors ${
              activeCol.id === col.id
                ? "bg-bravio-granate text-white font-bold"
                : "bg-white border border-[#B1C7D4]/60 text-bravio-tsunami hover:text-bravio-volcanic"
            }`}
          >
            {col.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Photo Gallery & Reordering */}
        <div className="lg:col-span-7 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-base uppercase text-bravio-volcanic font-bold">
              Fotografías de la Colección ({activeCol.gallery.length})
            </h3>
            <span className="text-[11px] text-bravio-granate font-sans font-bold">
              ★ Estrella = Foto de Portada
            </span>
          </div>

          <div className="space-y-3">
            {activeCol.gallery.map((photo, idx) => {
              const isCover = photo.isCover || photo.url === activeCol.coverImage;

              return (
                <div
                  key={photo.id}
                  className={`flex items-center gap-4 p-3 rounded-sm bg-[#F8FAFB] border transition-all ${
                    isCover
                      ? "border-bravio-granate ring-1 ring-bravio-granate/40"
                      : "border-[#B1C7D4]/40"
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-16 h-16 object-contain rounded-sm bg-white p-1 border border-[#B1C7D4]/30"
                  />

                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-bravio-volcanic truncate">
                        {photo.alt || `Foto #${idx + 1}`}
                      </span>
                      {isCover && (
                        <span className="bg-bravio-granate text-white text-[9px] uppercase px-1.5 py-0.5 rounded font-bold">
                          PORTADA
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-bravio-tsunami font-mono truncate block mt-0.5">
                      {photo.url}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 text-bravio-tsunami">
                    <button
                      onClick={() => handleSetCover(photo.url)}
                      className={`p-1.5 rounded transition-colors ${
                        isCover ? "text-amber-500" : "hover:text-amber-500"
                      }`}
                      title="Elegir como foto de portada"
                    >
                      <Star className={`w-4 h-4 ${isCover ? "fill-amber-500" : ""}`} />
                    </button>

                    <button
                      onClick={() => handleTogglePhotoVisibility(photo.id)}
                      className="p-1.5 hover:text-bravio-volcanic transition-colors"
                      title={photo.status === "published" ? "Ocultar" : "Publicar"}
                    >
                      {photo.status === "published" ? (
                        <Eye className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-red-500" />
                      )}
                    </button>

                    <button
                      disabled={idx === 0}
                      onClick={() => handleMovePhoto(idx, "up")}
                      className="p-1.5 hover:text-bravio-volcanic disabled:opacity-20 transition-colors"
                      title="Mover arriba"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    <button
                      disabled={idx === activeCol.gallery.length - 1}
                      onClick={() => handleMovePhoto(idx, "down")}
                      className="p-1.5 hover:text-bravio-volcanic disabled:opacity-20 transition-colors"
                      title="Mover abajo"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-1.5 hover:text-red-500 transition-colors"
                      title="Eliminar de la colección"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 cols: Collection Metadata & SEO */}
        <div className="lg:col-span-5 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6 space-y-4 text-xs">
          <h3 className="font-display text-base uppercase text-bravio-volcanic pb-2 border-b border-[#B1C7D4]/40 font-bold">
            Configuración General
          </h3>

          <div>
            <label className="block text-bravio-tsunami font-bold mb-1">Nombre de la Colección</label>
            <input
              type="text"
              value={activeCol.name}
              onChange={(e) => handleUpdateActive({ name: e.target.value })}
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
            />
          </div>

          <div>
            <label className="block text-bravio-tsunami font-bold mb-1">Slug URL</label>
            <input
              type="text"
              value={activeCol.slug}
              onChange={(e) => handleUpdateActive({ slug: e.target.value })}
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic font-mono focus:outline-none focus:border-bravio-granate"
            />
          </div>

          <div>
            <label className="block text-bravio-tsunami font-bold mb-1">Lema o Tagline</label>
            <input
              type="text"
              value={activeCol.tagline}
              onChange={(e) => handleUpdateActive({ tagline: e.target.value })}
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
            />
          </div>

          <div>
            <label className="block text-bravio-tsunami font-bold mb-1">Descripción Editorial</label>
            <textarea
              rows={4}
              value={activeCol.description}
              onChange={(e) => handleUpdateActive({ description: e.target.value })}
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic leading-relaxed focus:outline-none focus:border-bravio-granate"
            />
          </div>

          <div>
            <label className="block text-bravio-tsunami font-bold mb-1">Estado de Publicación</label>
            <select
              value={activeCol.status}
              onChange={(e) =>
                handleUpdateActive({
                  status: e.target.value as "published" | "draft" | "archived",
                })
              }
              className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
            >
              <option value="published">Publicado en Tienda</option>
              <option value="draft">Borrador (Oculto)</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

