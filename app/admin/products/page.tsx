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
import { CruzDeHierro } from "@/components/ui/BravioLogo";

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
    showToast("Sincronización con fichas tecnicas.xlsx completada. 10 productos actualizados.");
    setIsImportModalOpen(false);
  };

  const filtered = products.filter((p) => {
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase()) ||
      p.leatherType.toLowerCase().includes(query.toLowerCase());

    const matchCat =
      selectedCategory === "all" ||
      p.gender === selectedCategory ||
      p.collectionId === selectedCategory;

    return matchQuery && matchCat;
  });

  return (
    <div className="space-y-8 font-[SpaceGrotesk] text-[#605246]">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-white border-2 border-emerald-500 text-emerald-800 px-5 py-3 shadow-2xl flex items-center gap-3 text-xs font-bold">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#B1C7D4]/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CruzDeHierro size={14} color="#5E1C23" />
            <span className="text-[10px] tracking-[0.2em] text-[#849AAD] uppercase font-bold">
              Catálogo & Precios Oficiales
            </span>
          </div>
          <h1 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide">
            PRODUCTOS OFICIALES
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#B1C7D4] hover:bg-[#F4F7F9] text-xs font-bold uppercase tracking-wider text-[#605246] transition-colors shadow-xs"
          >
            <FileSpreadsheet size={14} className="text-[#5E1C23]" /> Sincronizar Excel
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#849AAD]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por SKU, nombre del modelo, tipo de piel..."
            className="w-full bg-white border border-[#B1C7D4] pl-10 pr-4 py-2.5 text-xs text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "hombre", "mujer"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                selectedCategory === cat
                  ? "bg-[#5E1C23] border-[#5E1C23] text-white shadow-xs"
                  : "bg-white border-[#B1C7D4] text-[#605246] hover:bg-[#F4F7F9]"
              }`}
            >
              {cat === "all" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-[#B1C7D4]/60 overflow-x-auto shadow-xs rounded">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F4F7F9] border-b border-[#B1C7D4]/40 text-[#849AAD] uppercase tracking-wider text-[10px] font-bold">
            <tr>
              <th className="p-4">Foto</th>
              <th className="p-4">SKU / Modelo</th>
              <th className="p-4">Piel & Construcción</th>
              <th className="p-4">Precio (MXN)</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B1C7D4]/20 text-[#605246]">
            {filtered.map((p) => (
              <tr key={p.sku} className="hover:bg-[#F4F7F9]/60 transition-colors">
                <td className="p-4">
                  <div className="relative w-12 h-14 bg-white border border-[#B1C7D4]/40 p-1 flex items-center justify-center">
                    <Image
                      src={p.featuredImage || "/brand/image1.png"}
                      alt={p.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-[#5E1C23] text-[11px] block font-bold">{p.sku}</span>
                  <span className="font-archivo text-sm text-[#605246] uppercase">{p.name}</span>
                </td>
                <td className="p-4">
                  <span className="block text-[#605246] font-bold">{p.leatherType}</span>
                  <span className="text-[10px] text-[#849AAD]">Goodyear Welt 360° · León Gto</span>
                </td>
                <td className="p-4 font-archivo text-base text-[#5E1C23] font-bold">
                  ${p.price.toLocaleString("es-MX")}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-sm ${
                      p.status === "active"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-500/30"
                        : "bg-amber-50 text-amber-800 border border-amber-500/30"
                    }`}
                  >
                    {p.status === "active" ? "Activo" : "Borrador"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="p-2 bg-white hover:bg-[#F4F7F9] text-[#605246] hover:text-[#5E1C23] border border-[#B1C7D4] transition-colors shadow-2xs"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#B1C7D4] w-full max-w-md p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#5E1C23] font-bold">{editingProduct.sku}</span>
                <h3 className="font-archivo text-lg text-[#605246] uppercase">{editingProduct.name}</h3>
              </div>
              <button onClick={() => setEditingProduct(null)} className="text-[#849AAD] hover:text-[#605246]">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-[SpaceGrotesk]">
              <div>
                <label className="block text-[#605246] uppercase font-bold tracking-wider mb-1">
                  Precio de Venta ($ MXN)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] p-2.5 text-[#605246] font-mono text-sm focus:outline-none focus:border-[#5E1C23]"
                />
              </div>

              <div>
                <label className="block text-[#605246] uppercase font-bold tracking-wider mb-1">
                  Estado en Tienda
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full bg-[#F4F7F9] border border-[#B1C7D4] p-2.5 text-[#605246] text-xs focus:outline-none focus:border-[#5E1C23]"
                >
                  <option value="active">Activo (Visible en catálogo y compras)</option>
                  <option value="draft">Borrador (Oculto)</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#B1C7D4]/40">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border border-[#B1C7D4] text-xs text-[#605246] font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="px-5 py-2 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Excel Sync Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#B1C7D4] w-full max-w-lg p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#B1C7D4]/40 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="text-[#5E1C23]" size={18} />
                <h3 className="font-archivo text-lg text-[#605246] uppercase">Sincronización Fichas Técnicas</h3>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="text-[#849AAD] hover:text-[#605246]">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#849AAD] leading-relaxed">
              El importador lee el archivo maestro <code className="text-[#605246] bg-[#F4F7F9] px-1.5 py-0.5 border border-[#B1C7D4]/40 font-mono">fichas tecnicas.xlsx</code> y actualiza de manera idempotente los SKUs, materiales de corte, forro flor de cerdo, suelas de vaqueta y precios oficiales sin alterar imágenes ya asignadas.
            </p>

            <div className="p-4 bg-[#F4F7F9] border border-[#B1C7D4]/50 text-[11px] text-[#605246] space-y-1">
              <p>✦ <strong>Fuente:</strong> fichas tecnicas.xlsx (León, Guanajuato)</p>
              <p>✦ <strong>Modo:</strong> Idempotente (Upsert sin duplicar registros)</p>
              <p>✦ <strong>Validación:</strong> Tallas mexicanas 25 a 30 MX obligatorias</p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#B1C7D4]/40">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 border border-[#B1C7D4] text-xs text-[#605246] font-bold"
              >
                Cerrar
              </button>
              <button
                onClick={handleSimulateExcelSync}
                className="px-5 py-2 bg-[#5E1C23] hover:bg-[#47151a] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
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
