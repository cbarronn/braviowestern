"use client";

import React, { useState, useEffect } from "react";
import { 
  Boxes, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Edit2, 
  Check, 
  X,
  History
} from "lucide-react";
import { InventoryRecord } from "@/lib/types";

const SIZES = ["25", "25.5", "26", "26.5", "27", "27.5", "28", "28.5", "29", "29.5", "30"];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [query, setQuery] = useState("");
  const [editingCell, setEditingCell] = useState<{ sku: string; size: string; val: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchInventory = async () => {
    try {
      const res = await fetch("/api/admin/inventory");
      const data = await res.json();
      if (data.inventory) setInventory(data.inventory);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveStock = async () => {
    if (!editingCell) return;
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sku: editingCell.sku,
          size: editingCell.size,
          newPhysical: editingCell.val,
          reason: "Ajuste manual desde matriz de inventario",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Stock de ${editingCell.sku} (${editingCell.size} MX) ajustado a ${editingCell.val} pares.`);
        setEditingCell(null);
        fetchInventory();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = inventory.filter((item) =>
    !query ||
    item.productName.toLowerCase().includes(query.toLowerCase()) ||
    item.sku.toLowerCase().includes(query.toLowerCase())
  );

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
            <Boxes size={16} className="text-bravio-granate" />
            <span className="text-[10px] font-sans tracking-cinematic text-bravio-gold uppercase">
              Control de Almacén · León Gto
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-bravio-bone tracking-wider uppercase">
            MATRIZ DE INVENTARIO
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs font-sans text-bravio-cloudy">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Stock Bajo (&lt; 3 pares)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Agotado</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bravio-cloudy" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por modelo o SKU..."
          className="w-full bg-bravio-volcanic-card border border-bravio-volcanic-border pl-10 pr-4 py-2 text-xs text-bravio-bone placeholder-bravio-cloudy/50 focus:outline-none focus:border-bravio-granate"
        />
      </div>

      {/* Matrix Table */}
      <div className="bg-bravio-volcanic-card border border-bravio-volcanic-border overflow-x-auto">
        <table className="w-full text-center font-sans text-xs">
          <thead className="bg-bravio-volcanic border-b border-bravio-volcanic-border text-bravio-cloudy uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3 text-left">SKU / Modelo</th>
              <th className="p-3">Total Físico</th>
              {SIZES.map((sz) => (
                <th key={sz} className="p-3 font-mono">{sz} MX</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-bravio-volcanic-border text-bravio-bone">
            {filtered.map((item) => (
              <tr key={item.sku} className="hover:bg-bravio-volcanic/50 transition-colors">
                <td className="p-3 text-left">
                  <span className="font-mono text-bravio-gold text-[10px] block">{item.sku}</span>
                  <span className="font-display font-medium text-xs uppercase text-bravio-bone block">{item.productName}</span>
                  <span className="text-[10px] text-bravio-cloudy">{item.leatherType}</span>
                </td>
                <td className="p-3 font-mono font-bold text-sm bg-bravio-volcanic/30">
                  {item.totalPhysical}
                </td>

                {SIZES.map((sz) => {
                  const sizeData = item.sizes[sz] || { physical: 0, reserved: 0, available: 0 };
                  const isEditing = editingCell?.sku === item.sku && editingCell?.size === sz;
                  const isLow = sizeData.physical > 0 && sizeData.physical < 3;
                  const isZero = sizeData.physical === 0;

                  return (
                    <td key={sz} className="p-2 border-l border-bravio-volcanic-border/40">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            min="0"
                            value={editingCell.val}
                            onChange={(e) => setEditingCell({ ...editingCell, val: Number(e.target.value) })}
                            className="w-12 bg-black border border-bravio-granate text-center font-mono text-xs text-white p-1"
                            autoFocus
                          />
                          <button onClick={handleSaveStock} className="p-1 text-emerald-400 hover:text-emerald-300">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditingCell(null)} className="p-1 text-red-400 hover:text-red-300">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingCell({ sku: item.sku, size: sz, val: sizeData.physical })}
                          className={`w-full py-1.5 px-1 rounded font-mono text-xs flex flex-col items-center hover:bg-bravio-granate/20 transition-colors ${
                            isZero
                              ? "text-red-400/60"
                              : isLow
                              ? "text-amber-400 font-bold"
                              : "text-bravio-bone"
                          }`}
                          title={`Físico: ${sizeData.physical} | Reservado: ${sizeData.reserved} | Click para editar`}
                        >
                          <span>{sizeData.physical}</span>
                          {sizeData.reserved > 0 && (
                            <span className="text-[9px] text-bravio-cloudy">(-{sizeData.reserved})</span>
                          )}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] font-sans text-bravio-cloudy">
        ✦ <strong>Nota operativa:</strong> Haz click sobre cualquier número de talla para realizar un ajuste de stock inmediato en tiempo real. Todas las modificaciones quedan registradas en la Bitácora de Auditoría.
      </p>
    </div>
  );
}
