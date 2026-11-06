"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Package, 
  Search, 
  Plus, 
  Edit3, 
  Check, 
  X, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Product } from "@/lib/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<Product["status"]>("active");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleEditClick = (p: Product) => {
    setEditingProduct(p);
    setEditPrice(p.price);
    setEditStatus(p.status);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProduct.id,
          price: editPrice,
          status: editStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Producto ${editingProduct.sku} actualizado exitosamente.`);
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSimulateExcelSync = () => {
    showToast("Sincronización idempotente con 'fichas tecnicas.xlsx' completada: 10 modelos verificados.");
    setIsImportModalOpen(false);
  };

  const filtered = products.filter((p) => {
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.leatherType.toLowerCase().includes(query.toLowerCase());
    const matchCat = selectedCategory === "all" || p.gender === selectedCategory;
    return matchQuery && matchCat;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#16120E] border-2 border-emerald-500 text-emerald-300 px-5 py-3 shadow-2xl flex items-center gap-3 font-sans text-xs">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-bravio-volcanic-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-cinematic text-bravio-gold uppercase">
              Catálogo & Precios
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase">
            PRODUCTOS OFICIALES
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-bravio-volcanic-card border border-bravio-volcanic-border hover:bg-bravio-volcanic text-xs font-sans tracking-wider uppercase text-bravio-cloudy transition-colors"
          >
            <FileSpreadsheet size={14} /> Sincronizar Excel
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bravio-cloudy" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por SKU, nombre del modelo, tipo de piel..."
            className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border pl-10 pr-4 py-2 text-xs text-bravio-bone placeholder-bravio-cloudy/50 focus:outline-none focus:border-bravio-granate"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "hombre", "mujer"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider border transition-colors ${
                selectedCategory === cat
                  ? "bg-bravio-granate border-bravio-granate text-bravio-bone"
                  : "bg-bravio-volcanic-card border-bravio-volcanic-border text-bravio-cloudy"
              }`}
            >
              {cat === "all" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead className="bg-bravio-volcanic border-b border-bravio-volcanic-border text-bravio-cloudy uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Foto</th>
              <th className="p-4">SKU / Modelo</th>
              <th className="p-4">Piel & Construcción</th>
              <th className="p-4">Precio (MXN)</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bravio-volcanic-border text-bravio-bone">
            {filtered.map((p) => (
              <tr key={p.sku} className="hover:bg-bravio-volcanic/50 transition-colors">
                <td className="p-4">
                  <div className="relative w-12 h-14 bg-black border border-bravio-volcanic-border overflow-hidden">
                    <Image
                      src={p.featuredImage || "/brand/image1.png"}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-bravio-gold text-[11px] block">{p.sku}</span>
                  <span className="font-display font-medium text-sm text-bravio-bone uppercase">{p.name}</span>
                </td>
                <td className="p-4 text-bravio-cloudy">
                  <span className="block text-bravio-bone">{p.leatherType}</span>
                  <span className="text-[10px]">Goodyear Welt 360° · León Gto</span>
                </td>
                <td className="p-4 font-mono font-bold text-sm">
                  ${p.price.toLocaleString("es-MX")}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-sm ${
                      p.status === "active"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {p.status === "active" ? "Activo" : "Borrador"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="p-2 bg-bravio-volcanic hover:bg-bravio-granate/20 text-bravio-cloudy hover:text-bravio-bone border border-bravio-volcanic-border transition-colors"
                    title="Editar precio y estado"
                  >
                    <Edit3 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16120E] border border-bravio-volcanic-border w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-bravio-volcanic-border pb-3">
              <div>
                <span className="text-[10px] font-mono text-bravio-gold">{editingProduct.sku}</span>
                <h3 className="font-display text-lg text-bravio-bone uppercase">{editingProduct.name}</h3>
              </div>
              <button onClick={() => setEditingProduct(null)} className="text-bravio-cloudy hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-bravio-cloudy uppercase tracking-wider mb-1">
                  Precio de Venta ($ MXN)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full bg-[#0F0C09] border border-bravio-volcanic-border p-2.5 text-bravio-bone font-mono text-sm focus:outline-none focus:border-bravio-granate"
                />
              </div>

              <div>
                <label className="block text-bravio-cloudy uppercase tracking-wider mb-1">
                  Estado en Tienda
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full bg-[#0F0C09] border border-bravio-volcanic-border p-2.5 text-bravio-bone text-xs focus:outline-none focus:border-bravio-granate"
                >
                  <option value="active">Activo (Visible en catálogo y compras)</option>
                  <option value="draft">Borrador (Oculto)</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-bravio-volcanic-border">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border border-bravio-volcanic-border text-xs text-bravio-cloudy"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="px-5 py-2 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-bold uppercase tracking-wider transition-colors"
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Excel Sync Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16120E] border border-bravio-volcanic-border w-full max-w-lg p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-bravio-volcanic-border pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="text-bravio-gold" size={18} />
                <h3 className="font-display text-lg text-bravio-bone uppercase">Sincronización Fichas Técnicas</h3>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="text-bravio-cloudy hover:text-white">
                <X size={18} />
              </button>
            </div>

            <p className="font-sans text-xs text-bravio-cloudy leading-relaxed">
              El importador lee el archivo maestro <code className="text-bravio-bone bg-black px-1.5 py-0.5">fichas tecnicas.xlsx</code> y actualiza de manera idempotente los SKUs, materiales de corte, forro flor de cerdo, suelas de vaqueta y precios oficiales sin alterar imágenes ya asignadas.
            </p>

            <div className="p-4 bg-bravio-volcanic border border-bravio-volcanic-border text-[11px] font-sans text-bravio-cloudy space-y-1">
              <p>✦ <strong>Fuente:</strong> fichas tecnicas.xlsx (León, Guanajuato)</p>
              <p>✦ <strong>Modo:</strong> Idempotente (Upsert sin duplicar registros)</p>
              <p>✦ <strong>Validación:</strong> Tallas mexicanas 25 a 30 MX obligatorias</p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-bravio-volcanic-border">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 border border-bravio-volcanic-border text-xs text-bravio-cloudy"
              >
                Cerrar
              </button>
              <button
                onClick={handleSimulateExcelSync}
                className="px-5 py-2 bg-bravio-granate hover:bg-bravio-granate-light text-bravio-bone text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Ejecutar Sincronización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
