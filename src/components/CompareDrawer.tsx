import React from 'react';
import { X, Scale, Trash2, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, getStartingPrice } from '../utils/formatters';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  compareItems: Product[];
  onRemoveCompare: (productId: string) => void;
  onClearCompare: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  compareItems,
  onRemoveCompare,
  onClearCompare,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-800">
        {/* Top Header */}
        <div className="bg-[#1B2845] p-4 text-white flex items-center justify-between shadow">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#DECB54]" />
            <h3 className="text-lg font-bold font-serif text-white">Side-by-Side Mattress Comparison</h3>
            <span className="text-xs text-[#DECB54] font-semibold">({compareItems.length} selected)</span>
          </div>
          <div className="flex items-center gap-3">
            {compareItems.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-rose-300 hover:text-white flex items-center gap-1 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button onClick={onClose} className="text-slate-300 hover:text-white p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        {compareItems.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Scale className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-[#1B2845]">No Mattresses Selected for Comparison</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Click the "Compare" button on any product card to compare specs, weight limits, warranties, and prices side-by-side.
            </p>
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="p-3 text-slate-500 font-bold uppercase text-[10px] w-44">Specification</th>
                  {compareItems.map((prod) => (
                    <th key={prod.id} className="p-3 text-center min-w-[200px]">
                      <div className="relative bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                        <button
                          onClick={() => onRemoveCompare(prod.id)}
                          className="absolute top-2 right-2 text-slate-400 hover:text-rose-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img src={prod.image} alt={prod.name} className="w-24 h-16 object-contain mx-auto" />
                        <h5 className="font-bold text-[#1B2845] truncate text-xs">{prod.name}</h5>
                        <span className="text-[10px] text-[#B89628] font-bold block">{prod.brand}</span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(prod);
                          }}
                          className="bg-[#1B2845] hover:bg-[#141E34] text-white font-bold text-[10px] w-full py-1.5 rounded-lg transition-all shadow"
                        >
                          View Full Specs
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-slate-500">Starting Price</td>
                  {compareItems.map((prod) => (
                    <td key={prod.id} className="p-3 text-center font-black text-[#1B2845] text-sm">
                      {formatPrice(getStartingPrice(prod))}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">Weight Capacity</td>
                  {compareItems.map((prod) => (
                    <td key={prod.id} className="p-3 text-center font-bold text-[#1B2845]">
                      {prod.weightLimitKg}kg / side
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">Comfort Feel</td>
                  {compareItems.map((prod) => (
                    <td key={prod.id} className="p-3 text-center">
                      <span className="bg-slate-100 text-[#1B2845] px-2.5 py-1 rounded-full border border-slate-200 font-bold">
                        {prod.feel} ({prod.firmnessRating}/10)
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">Turnable Design</td>
                  {compareItems.map((prod) => (
                    <td key={prod.id} className="p-3 text-center">
                      {prod.isTurnable ? (
                        <span className="text-emerald-700 font-bold">Dual-Side Turnable</span>
                      ) : (
                        <span className="text-slate-500">No-Turn Design</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">Technology Core</td>
                  {compareItems.map((prod) => (
                    <td key={prod.id} className="p-3 text-center text-[11px] font-medium">
                      {prod.category} ({prod.technology})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-500">Guarantee & Warranty</td>
                  {compareItems.map((prod) => (
                    <td key={prod.id} className="p-3 text-center text-[11px] font-medium">
                      {prod.guaranteeYears} Yr Guarantee • {prod.warrantyYears} Yr Warranty
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
