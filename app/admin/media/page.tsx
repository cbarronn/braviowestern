"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  Folder,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Check,
  Search,
  Plus,
  Eye,
  X,
  FileCheck,
  Link2,
} from "lucide-react";
import { MediaItem, VirtualFolder, MediaType } from "@/lib/types";

const VIRTUAL_FOLDERS: VirtualFolder[] = [
  "Hombre",
  "Mujer",
  "Productos",
  "Colecciones",
  "Campañas",
  "Hero",
  "Historia",
  "Amuleto",
  "Videos",
  "Música",
];

export default function AdminMediaPage() {
  const [activeFolder, setActiveFolder] = useState<VirtualFolder | "ALL">("ALL");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // New item upload form
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newName, setNewName] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newFolder, setNewFolder] = useState<VirtualFolder>("Productos");
  const [newCategory, setNewCategory] = useState<MediaType>("product");
  const [newSku, setNewSku] = useState("");

  const fetchMedia = async () => {
    try {
      const url = activeFolder === "ALL" 
        ? `/api/admin/media` 
        : `/api/admin/media?folder=${activeFolder}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setMediaList(data.items);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [activeFolder]);

  const handleUpdateMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    try {
      const res = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedItem.id,
          updates: {
            name: selectedItem.name,
            altText: selectedItem.altText,
            relatedSku: selectedItem.relatedSku,
            relatedCollection: selectedItem.relatedCollection,
            virtualFolder: selectedItem.virtualFolder,
            category: selectedItem.category,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
        fetchMedia();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchive = async (id: string) => {
    if (!confirm("¿Deseas archivar esta imagen? Dejará de mostrarse públicamente.")) return;
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      setSelectedItem(null);
      fetchMedia();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newFileUrl) {
      alert("Por favor completa los campos requeridos");
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 25;
      });
    }, 150);

    setTimeout(async () => {
      clearInterval(interval);
      setUploadProgress(100);

      await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          url: newFileUrl,
          storagePath: newFileUrl,
          fileType: newFileUrl.endsWith(".mp4") ? "mp4" : "webp",
          mimeType: newFileUrl.endsWith(".mp4") ? "video/mp4" : "image/webp",
          sizeBytes: 350000,
          virtualFolder: newFolder,
          category: newCategory,
          relatedSku: newSku || undefined,
          altText: newAlt,
          sortOrder: mediaList.length + 1,
          status: "published",
          uploadedBy: "Admin Marketing",
        }),
      });

      setIsUploading(false);
      setShowUploadModal(false);
      setUploadProgress(0);
      setNewName("");
      setNewFileUrl("");
      setNewAlt("");
      setNewSku("");
      fetchMedia();
    }, 900);
  };

  const filtered = mediaList.filter((m) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.altText.toLowerCase().includes(q) ||
      m.relatedSku?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-bravio-tsunami font-sans font-bold">
            ALMACENAMIENTO DINÁMICO
          </span>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-volcanic uppercase tracking-wide mt-1">
            BIBLIOTECA MULTIMEDIA BRAVÍO
          </h1>
          <p className="text-xs text-bravio-tsunami mt-1 font-light">
            Sube, clasifica y actualiza todas las imágenes del sitio sin modificar código ni hacer despliegues.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-bravio-granate hover:bg-bravio-granate-light text-white text-xs font-sans tracking-widest uppercase rounded-sm transition-colors shadow-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          <span>Subir Nuevo Archivo</span>
        </button>
      </div>

      {/* Virtual Folders Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#B1C7D4]/40">
        <button
          onClick={() => setActiveFolder("ALL")}
          className={`px-3 py-1.5 rounded-sm text-xs font-sans tracking-wider whitespace-nowrap transition-colors ${
            activeFolder === "ALL"
              ? "bg-bravio-granate text-white font-bold"
              : "bg-white border border-[#B1C7D4]/60 text-bravio-tsunami hover:text-bravio-volcanic"
          }`}
        >
          Todas las Carpetas ({mediaList.length})
        </button>
        {VIRTUAL_FOLDERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFolder(f)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-sans tracking-wider whitespace-nowrap transition-colors ${
              activeFolder === f
                ? "bg-bravio-granate text-white font-bold"
                : "bg-white border border-[#B1C7D4]/60 text-bravio-tsunami hover:text-bravio-volcanic"
            }`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>{f}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-bravio-tsunami absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, SKU o texto alternativo..."
            className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm pl-9 pr-4 py-2 text-xs text-bravio-volcanic focus:outline-none focus:border-bravio-granate shadow-sm"
          />
        </div>
      </div>

      {/* Media Grid & Inspector Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Media Grid (Left 8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setIsEditing(false);
                }}
                className={`group relative aspect-square bg-white border rounded-sm p-1 overflow-hidden cursor-pointer transition-all shadow-sm ${
                  isSelected
                    ? "border-bravio-granate ring-2 ring-bravio-granate scale-[0.98]"
                    : "border-[#B1C7D4]/60 hover:border-bravio-granate/60"
                }`}
              >
                {item.fileType === "mp4" ? (
                  <video src={item.url} className="w-full h-full object-cover rounded-sm" muted />
                ) : (
                  <img
                    src={item.url}
                    alt={item.altText}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                  <span className="text-[10px] text-white font-medium truncate">
                    {item.name}
                  </span>
                  <span className="text-[9px] text-[#B1C7D4] truncate font-mono">
                    {item.virtualFolder}
                  </span>
                </div>

                <span className="absolute top-1.5 left-1.5 bg-black/70 text-[9px] font-mono px-1.5 py-0.5 rounded text-white uppercase">
                  {item.fileType}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Item Metadata Inspector (Right 4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#B1C7D4]/60 rounded-sm shadow-sm p-6">
          {selectedItem ? (
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-[#F8FAFB] rounded-sm overflow-hidden border border-[#B1C7D4]/40 p-2">
                {selectedItem.fileType === "mp4" ? (
                  <video src={selectedItem.url} controls className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.altText}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <h3 className="font-display text-sm text-bravio-volcanic uppercase font-bold">
                      {selectedItem.name}
                    </h3>
                    <p className="text-[11px] text-bravio-tsunami mt-1 font-mono break-all">
                      {selectedItem.url}
                    </p>
                  </div>

                  <div className="space-y-2 py-3 border-y border-[#B1C7D4]/40">
                    <div className="flex justify-between">
                      <span className="text-bravio-tsunami">Carpeta Virtual:</span>
                      <span className="text-bravio-granate font-bold">{selectedItem.virtualFolder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-bravio-tsunami">Categoría:</span>
                      <span className="text-bravio-volcanic font-bold uppercase">{selectedItem.category}</span>
                    </div>
                    {selectedItem.relatedSku && (
                      <div className="flex justify-between">
                        <span className="text-bravio-tsunami">SKU Asociado:</span>
                        <span className="font-mono text-bravio-granate font-bold">{selectedItem.relatedSku}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-bravio-tsunami">Estado:</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200 text-[10px] font-bold uppercase">{selectedItem.status}</span>
                    </div>
                  </div>

                  {/* Usage Reference Tracker */}
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-widest text-bravio-tsunami font-bold block mb-1.5">
                      Dónde se utiliza esta imagen:
                    </span>
                    {selectedItem.usedIn && selectedItem.usedIn.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.usedIn.map((u) => (
                          <span
                            key={u}
                            className="bg-[#F8FAFB] text-bravio-volcanic text-[10px] font-mono px-2 py-0.5 rounded-sm border border-[#B1C7D4]/40 flex items-center gap-1 font-medium"
                          >
                            <Link2 className="w-2.5 h-2.5 text-bravio-granate" />
                            <span>{u}</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] text-bravio-tsunami">
                        Disponible en biblioteca (sin enlaces fijos).
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 py-2 px-3 bg-white hover:bg-[#F8FAFB] border border-[#B1C7D4]/60 text-bravio-volcanic rounded-sm text-xs font-sans tracking-wider flex items-center justify-center gap-1.5 transition-colors font-bold shadow-sm"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Editar Metadatos</span>
                    </button>
                    <button
                      onClick={() => handleArchive(selectedItem.id)}
                      className="p-2 text-bravio-tsunami hover:text-red-500 bg-white border border-[#B1C7D4]/60 rounded-sm transition-colors shadow-sm"
                      title="Archivar archivo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Edit Form */
                <form onSubmit={handleUpdateMetadata} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-bravio-tsunami font-bold mb-1">Nombre Descriptivo</label>
                    <input
                      type="text"
                      value={selectedItem.name}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, name: e.target.value })
                      }
                      className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-2.5 py-1.5 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                    />
                  </div>

                  <div>
                    <label className="block text-bravio-tsunami font-bold mb-1">Texto Alternativo (SEO / Alt)</label>
                    <input
                      type="text"
                      value={selectedItem.altText}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, altText: e.target.value })
                      }
                      className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-2.5 py-1.5 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                    />
                  </div>

                  <div>
                    <label className="block text-bravio-tsunami font-bold mb-1">Carpeta Virtual</label>
                    <select
                      value={selectedItem.virtualFolder}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          virtualFolder: e.target.value as VirtualFolder,
                        })
                      }
                      className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-2.5 py-1.5 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                    >
                      {VIRTUAL_FOLDERS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-bravio-tsunami font-bold mb-1">SKU Relacionado</label>
                    <input
                      type="text"
                      value={selectedItem.relatedSku || ""}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, relatedSku: e.target.value })
                      }
                      placeholder="Ej. BW-SIN-GA-ARE"
                      className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-2.5 py-1.5 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-bravio-granate hover:bg-bravio-granate-light text-white rounded-sm text-xs font-sans tracking-wider uppercase font-bold shadow-sm"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="py-2 px-3 bg-white border border-[#B1C7D4]/60 text-bravio-tsunami hover:text-bravio-volcanic rounded-sm text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="py-16 text-center text-bravio-tsunami text-xs">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-40 text-bravio-tsunami" />
              <span>Selecciona una imagen de la galería para ver o editar sus metadatos.</span>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white border border-[#B1C7D4]/60 rounded-sm shadow-xl max-w-lg w-full p-6 text-xs text-bravio-volcanic space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#B1C7D4]/40">
              <h3 className="font-display text-base uppercase text-bravio-volcanic font-bold">
                Subir Archivo a la Biblioteca
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-bravio-tsunami hover:text-bravio-volcanic"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSimulateUpload} className="space-y-4">
              <div>
                <label className="block text-bravio-tsunami font-bold mb-1">Nombre Descriptivo *</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej. Bota Silao Vista Lateral Campaña"
                  className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                />
              </div>

              <div>
                <label className="block text-bravio-tsunami font-bold mb-1">Ruta o URL del Archivo *</label>
                <input
                  required
                  type="text"
                  value={newFileUrl}
                  onChange={(e) => setNewFileUrl(e.target.value)}
                  placeholder="/products/catalogo/bw-sin-ga-are/BW-SIN-GA-ARE.jpg"
                  className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic font-mono focus:outline-none focus:border-bravio-granate"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-bravio-tsunami font-bold mb-1">Carpeta Virtual</label>
                  <select
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value as VirtualFolder)}
                    className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                  >
                    {VIRTUAL_FOLDERS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-bravio-tsunami font-bold mb-1">Tipo de Contenido</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MediaType)}
                    className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                  >
                    <option value="product">Fotografía de Producto</option>
                    <option value="editorial">Fotografía Editorial</option>
                    <option value="hero">Hero Principal</option>
                    <option value="banner">Banner</option>
                    <option value="women">Imagen Mujer</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-bravio-tsunami font-bold mb-1">SKU Relacionado (Opcional)</label>
                <input
                  type="text"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  placeholder="BW-SIN-GA-ARE"
                  className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                />
              </div>

              <div>
                <label className="block text-bravio-tsunami font-bold mb-1">Texto Alternativo (Alt Text)</label>
                <input
                  type="text"
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  placeholder="Bota vaquera de gamuza arena elaborada en León Gto"
                  className="w-full bg-white border border-[#B1C7D4]/60 rounded-sm px-3 py-2 text-bravio-volcanic focus:outline-none focus:border-bravio-granate"
                />
              </div>

              {isUploading && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-bravio-tsunami font-medium">
                    <span>Subiendo a almacenamiento...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EEF2F6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-bravio-granate transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-[#B1C7D4]/40">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-white border border-[#B1C7D4]/60 rounded-sm text-bravio-tsunami hover:text-bravio-volcanic"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 bg-bravio-granate hover:bg-bravio-granate-light text-white rounded-sm font-sans tracking-wider uppercase font-bold shadow-sm"
                >
                  {isUploading ? "Cargando..." : "Subir Archivo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

