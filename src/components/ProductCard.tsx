import React from 'react';
import { Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, getStartingPrice, calculateInstallment, SIZE_LABELS } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isCompared,
  onToggleCompare,
  onSelectProduct,
}) => {
  const startingPrice = getStartingPrice(product);
  const installment = calculateInstallment(startingPrice);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative hover:-translate-y-1">
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Brand Name Tag */}
          <span className="text-[10px] font-bold tracking-widest text-[#B89628] uppercase">
            {product.brand}
          </span>

          {/* Compare Checkbox Button */}
          <button
            onClick={() => onToggleCompare(product)}
            className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
              isCompared
                ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            <span>{isCompared ? 'Compared ✓' : 'Compare'}</span>
          </button>
        </div>

        {/* Product Image Box - Pure White Background */}
        <div
          onClick={() => onSelectProduct(product)}
          className="relative h-52 sm:h-56 rounded-2xl bg-white p-2 flex items-center justify-center overflow-hidden cursor-pointer mb-4 group/img"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
          />

          {/* BRAND LOGO - Small Uniform Badge in Corner of Bed */}
          <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md border border-slate-200 p-1 rounded-lg shadow-sm flex items-center justify-center h-6.5 w-20">
            <img
              src={product.brandLogo}
              alt={product.brand}
              className="h-4 max-h-4 max-w-full object-contain"
            />
          </div>

          {/* Badges - Left Side */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span className="bg-[#1B2845] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
              {product.weightLimitKg}kg / side
            </span>
            {product.isTurnable && (
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                Turnable
              </span>
            )}
          </div>

          {/* Firmness Tag */}
          <div className="absolute bottom-2.5 right-2.5 bg-slate-900/90 text-[#DECB54] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
            {product.feel} ({product.firmnessRating}/10)
          </div>
        </div>

        {/* Title & Range */}
        <div className="space-y-1 mb-3">
          <span className="text-[10px] font-bold text-[#B89628] uppercase tracking-wide">
            {product.range} • {product.category}
          </span>
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-base font-bold font-serif text-[#1B2845] hover:text-[#B89628] cursor-pointer transition-colors line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{product.description}</p>
        </div>

        {/* Size Swatches */}
        <div className="flex items-center gap-1 mb-4 flex-wrap">
          <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Sizes:</span>
          {product.availableSizes.map((sz) => (
            <span
              key={sz}
              className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-mono font-semibold"
            >
              {SIZE_LABELS[sz].name}
            </span>
          ))}
          {product.supportsExtraLength && (
            <span className="text-[10px] bg-[#DECB54]/20 text-[#1B2845] border border-[#DECB54] px-2 py-0.5 rounded font-bold">
              + Extra XL
            </span>
          )}
        </div>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Starting From</span>
            <span className="text-xl font-black text-[#1B2845] tracking-tight">
              {formatPrice(startingPrice)}
            </span>
          </div>
          <div className="text-right flex flex-col items-end">
            {/* Payflex Logo - Small & Blended */}
            <div className="flex items-center gap-1">
              <img
                src="/assets/logos/payflex_logo.webp"
                alt="PayFlex"
                className="h-3.5 max-w-[55px] w-auto object-contain mix-blend-multiply"
              />
            </div>
            <span className="text-xs font-bold text-[#B89628]">
              4x <strong>{formatPrice(installment)}</strong>
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-slate-200"
          >
            <span>Configure</span>
          </button>

          <button
            onClick={() => onSelectProduct(product)}
            className="w-full bg-[#1B2845] hover:bg-[#141E34] text-white font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1 shadow"
          >
            <span>View Specs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
