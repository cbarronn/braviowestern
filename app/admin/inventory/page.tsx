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
import { CruzDeHierro } from "@/components/ui/BravioLogo";

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

  const filtered = inventory.filter((item) => {
    return (
      item.sku.toLowerCase().includes(query.toLowerCase()) ||
      item.productName.toLowerCase().includes(query.toLowerCase()) ||
      item.leatherType.toLowerCase().includes(query.toLowerCase())
    );
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
              Control de Almacén · León Gto
            </span>
          </div>
          <h1 className="font-archivo text-2xl sm:text-3xl text-[#605246] uppercase tracking-wide">
            MATRIZ DE INVENTARIO
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#849AAD] font-bold">
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
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#849AAD]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por modelo o SKU..."
          className="w-full bg-white border border-[#B1C7D4] pl-10 pr-4 py-2.5 text-xs text-[#605246] placeholder-[#849AAD] focus:outline-none focus:border-[#5E1C23] shadow-xs"
        />
      </div>

      {/* Matrix Table */}
      <div className="bg-white border border-[#B1C7D4]/60 overflow-x-auto shadow-xs rounded">
        <table className="w-full text-center text-xs">
          <thead className="bg-[#F4F7F9] border-b border-[#B1C7D4]/40 text-[#849AAD] uppercase tracking-wider text-[10px] font-bold">
            <tr>
              <th className="p-3 text-left">SKU / Modelo</th>
              <th className="p-3">Total Físico</th>
              {SIZES.map((sz) => (
                <th key={sz} className="p-3 font-mono">{sz} MX</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B1C7D4]/20 text-[#605246]">
            {filtered.map((item) => (
              <tr key={item.sku} className="hover:bg-[#F4F7F9]/50 transition-colors">
                <td className="p-3 text-left">
                  <span className="font-mono text-[#5E1C23] text-[10px] block font-bold">{item.sku}</span>
                  <span className="font-archivo text-xs uppercase text-[#605246] block">{item.productName}</span>
                  <span className="text-[10px] text-[#849AAD]">{item.leatherType}</span>
                </td>
                <td className="p-3 font-archivo text-base text-[#605246] bg-[#F4F7F9]">
                  {item.totalPhysical}
                </td>

                {SIZES.map((sz) => {
                  const sizeData = item.sizes[sz] || { physical: 0, reserved: 0, available: 0 };
                  const isEditing = editingCell?.sku === item.sku && editingCell?.size === sz;
                  const isLow = sizeData.physical > 0 && sizeData.physical < 3;
                  const isZero = sizeData.physical === 0;

                  return (
                    <td key={sz} className="p-2 border-l border-[#B1C7D4]/30">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            min="0"
                            value={editingCell.val}
                            onChange={(e) => setEditingCell({ ...editingCell, val: Number(e.target.value) })}
                            className="w-12 bg-white border border-[#5E1C23] text-center font-mono text-xs text-[#605246] p-1 font-bold"
                            autoFocus
                          />
                          <button onClick={handleSaveStock} className="p-1 text-emerald-700 hover:text-emerald-900">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditingCell(null)} className="p-1 text-red-600 hover:text-red-800">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingCell({ sku: item.sku, size: sz, val: sizeData.physical })}
                          className={`w-full py-1.5 px-1 rounded font-mono text-xs flex flex-col items-center hover:bg-[#5E1C23]/10 transition-colors cursor-pointer ${
                            isZero
                              ? "text-red-500 font-bold"
                              : isLow
                              ? "text-amber-700 font-bold"
                              : "text-[#605246]"
                          }`}
                          title={`Físico: ${sizeData.physical} | Reservado: ${sizeData.reserved} | Click para editar`}
                        >
                          <span className="font-bold">{sizeData.physical}</span>
                          {sizeData.reserved > 0 && (
                            <span className="text-[9px] text-[#849AAD]">(-{sizeData.reserved})</span>
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

      <p className="text-[11px] text-[#849AAD]">
        ✦ <strong>Nota operativa:</strong> Haz click sobre cualquier número de talla para realizar un ajuste de stock inmediato en tiempo real. Todas las modificaciones quedan registradas en la Bitácora de Auditoría.
      </p>
    </div>
  );
}
