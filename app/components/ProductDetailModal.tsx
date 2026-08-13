import React, { useState } from 'react';
import { X, Check, ShieldCheck, RefreshCw, Scale, ShoppingBag, Truck, ExternalLink, Info, Award } from 'lucide-react';
import { Product, BedSize, BedLength, ProductType } from '~/types';
import { SIZE_LABELS, formatPrice, calculatePrice, calculateInstallment } from '~/utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: BedSize, length: BedLength, type: ProductType, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<BedSize>(
    product.availableSizes.includes('queen') ? 'queen' : product.availableSizes[0]
  );
  const [selectedLength, setSelectedLength] = useState<BedLength>('standard');
  const [selectedType, setSelectedType] = useState<ProductType>('set');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty'>('specs');

  const currentPrice = calculatePrice(product, selectedSize, selectedLength, selectedType);
  const installment = calculateInstallment(currentPrice);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedLength, selectedType, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-800">
        {/* Top Header */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-bold">{product.brand} • {product.range}</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body Grid */}
        <div className="grid md:grid-cols-12 gap-8 p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Image Gallery & Badges */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-center h-72 sm:h-80 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-md"
              />
              
              {/* BRAND LOGO - Small Corner Badge */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 p-1.5 rounded-lg shadow-sm flex items-center justify-center h-8 w-24">
                <img
                  src={product.brandLogo}
                  alt={product.brand}
                  className="h-5 max-h-5 max-w-full object-contain"
                />
              </div>

              <div className="absolute top-3 left-3 bg-[#1B2845] text-[#DECB54] text-xs font-bold px-3 py-1 rounded-full shadow">
                💪 {product.weightLimitKg}kg / Side
              </div>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Comfort Profile</span>
                <span className="text-[#1B2845] font-bold block">{product.feel} ({product.firmnessRating}/10)</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Design Type</span>
                <span className="text-slate-800 font-bold block">
                  {product.isTurnable ? 'Turnable Dual-Side' : 'No-Turn Pillow-Top'}
                </span>
              </div>
            </div>

            {/* External Guideline Link if available */}
            {product.externalLink && (
              <a
                href={product.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#B89628] hover:underline font-semibold pt-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Official Brand Documentation</span>
              </a>
            )}
          </div>

          {/* Right Column: Variant Selectors & Pricing */}
          <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#1B2845]">{product.name}</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{product.description}</p>
              </div>

              {/* 1. Size Swatches */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1B2845] block">
                  1. Select Size ({SIZE_LABELS[selectedSize].dims})
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['single', 'threeQuarter', 'double', 'queen', 'king'] as BedSize[]).map((sz) => {
                    const isAvailable = product.availableSizes.includes(sz);
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845] shadow-md'
                            : isAvailable
                            ? 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                        }`}
                      >
                        {SIZE_LABELS[sz].name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Length Selector */}
              {product.supportsExtraLength && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1B2845] block">2. Select Length</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedLength('standard')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                        selectedLength === 'standard'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      Standard (188cm)
                    </button>
                    <button
                      onClick={() => setSelectedLength('extraLength')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                        selectedLength === 'extraLength'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      Extra Length (200cm)
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Product Type */}
              {product.supportsMattressOnly && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1B2845] block">3. Select Configuration</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedType('set')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                        selectedType === 'set'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      Bed Set (Mattress + Base)
                    </button>
                    <button
                      onClick={() => setSelectedType('mattressOnly')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                        selectedType === 'mattressOnly'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      Mattress Only
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Checkout Bar */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Total Configured Price</span>
                  <span className="text-2xl font-black text-[#1B2845] tracking-tight">
                    {formatPrice(currentPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block font-semibold">PayFlex Installments</span>
                  <span className="text-xs font-bold text-[#B89628]">
                    4x <strong>{formatPrice(installment)}</strong> interest-free
                  </span>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-500 hover:text-slate-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1B2845]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-500 hover:text-slate-800 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#1B2845] hover:bg-[#141E34] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DECB54]" />
                  <span>Add To Cart • {formatPrice(currentPrice * quantity)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Accordion Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 space-y-4">
          <div className="flex items-center gap-6 border-b border-slate-200 pb-3 text-xs font-bold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`hover:text-[#1B2845] pb-1 border-b-2 transition-all ${
                activeTab === 'specs' ? 'text-[#1B2845] border-[#1B2845]' : 'text-slate-400 border-transparent'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`hover:text-[#1B2845] pb-1 border-b-2 transition-all ${
                activeTab === 'features' ? 'text-[#1B2845] border-[#1B2845]' : 'text-slate-400 border-transparent'
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`hover:text-[#1B2845] pb-1 border-b-2 transition-all ${
                activeTab === 'warranty' ? 'text-[#1B2845] border-[#1B2845]' : 'text-slate-400 border-transparent'
              }`}
            >
              Guarantee & Warranty
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Weight Limit</span>
                <span className="text-[#1B2845] font-bold">{product.weightLimitKg}kg per person per side</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Technology</span>
                <span className="text-[#1B2845] font-bold">{product.technology}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Factory Guarantee</span>
                <span className="text-[#1B2845] font-bold">{product.guaranteeYears} Year Full Guarantee</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Service Warranty</span>
                <span className="text-[#1B2845] font-bold">{product.warrantyYears} Year Service Warranty</span>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B89628] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'warranty' && (
            <div className="text-xs text-slate-600 leading-relaxed space-y-1">
              <p>
                Includes <strong>{product.guaranteeYears} Year Full Replacement Guarantee</strong> followed by a <strong>{product.warrantyYears} Year Prorated Service Warranty</strong>.
              </p>
              <p className="text-[11px] text-slate-500">
                Supported nationwide across official South African service centers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
