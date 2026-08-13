import React, { useState } from 'react';
import { Product, BedSize, BedLength, ProductType } from '~/types';
import { SIZE_LABELS, formatPrice, calculatePrice, calculateInstallment } from '~/utils/formatters';
import { ArrowLeft, ShoppingBag, Truck, Check } from 'lucide-react';
import { ProductCard } from '~/components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, size: BedSize, length: BedLength, type: ProductType, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  compareItems: Product[];
  onToggleCompare: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onSelectProduct,
  compareItems,
  onToggleCompare,
}) => {
  const [selectedSize, setSelectedSize] = useState<BedSize>(
    product.availableSizes.includes('queen') ? 'queen' : product.availableSizes[0]
  );
  const [selectedLength, setSelectedLength] = useState<BedLength>('standard');
  const [selectedType, setSelectedType] = useState<ProductType>('set');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'warranty'>('specs');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const currentPrice = calculatePrice(product, selectedSize, selectedLength, selectedType);
  const installment = calculateInstallment(currentPrice);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedLength, selectedType, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumbs & Back Button */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1B2845] hover:text-[#B89628] bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>

          <div className="text-xs text-slate-500 font-semibold hidden sm:block">
            Home / Shop / <span className="text-[#1B2845] font-bold">{product.brand}</span> / {product.name}
          </div>
        </div>

        {/* Main Product Showcase Workspace */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl grid lg:grid-cols-12 gap-10">
          {/* Left Column: Big Product Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-white border border-slate-200 p-8 rounded-2xl flex items-center justify-center min-h-[360px] sm:min-h-[420px] shadow-inner overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full max-h-[380px] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* Brand Logo in Corner */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 p-2 rounded-xl shadow-sm flex items-center justify-center h-8 w-24">
                <img
                  src={product.brandLogo}
                  alt={product.brand}
                  className="h-5 max-h-5 max-w-full object-contain"
                />
              </div>

              {/* Weight Limit Badge */}
              <div className="absolute top-4 left-4 bg-[#1B2845] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {product.weightLimitKg}kg / Side Rating
              </div>
            </div>

            {/* Quick Highlights Bar */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Comfort Feel</span>
                <span className="font-bold text-[#1B2845]">{product.feel} ({product.firmnessRating}/10)</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Turnable</span>
                <span className="font-bold text-[#1B2845]">{product.isTurnable ? 'Dual-Side' : 'No-Turn'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Guarantee</span>
                <span className="font-bold text-[#1B2845]">{product.guaranteeYears} Years</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price, Customizer & Checkout */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-[#B89628] uppercase tracking-widest block">
                  {product.brand} • {product.range}
                </span>
                <h1 className="text-3xl font-bold font-serif text-[#1B2845] mt-1">{product.name}</h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{product.description}</p>
              </div>

              {/* 1. Size Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1B2845] block">
                  1. Select Size ({SIZE_LABELS[selectedSize].dims})
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(['single', 'threeQuarter', 'double', 'queen', 'king'] as BedSize[]).map((sz) => {
                    const isAvailable = product.availableSizes.includes(sz);
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845] shadow'
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

              {/* 2. Length Selection */}
              {product.supportsExtraLength && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1B2845] block">2. Length Option</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedLength('standard')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border ${
                        selectedLength === 'standard'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      Standard (188cm)
                    </button>
                    <button
                      onClick={() => setSelectedLength('extraLength')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border ${
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

              {/* 3. Set Option */}
              {product.supportsMattressOnly && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1B2845] block">3. Configuration Option</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedType('set')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border ${
                        selectedType === 'set'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      Bed Set (Mattress + Base)
                    </button>
                    <button
                      onClick={() => setSelectedType('mattressOnly')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border ${
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

            {/* Price & Checkout Actions */}
            <div className="pt-5 border-t border-slate-200 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Configured Price</span>
                  <span className="text-3xl font-black text-[#1B2845] tracking-tight">
                    {formatPrice(currentPrice)}
                  </span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <img
                      src="/assets/logos/payflex_logo.webp"
                      alt="PayFlex"
                      className="h-4 max-w-[60px] w-auto object-contain mix-blend-multiply"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#B89628]">
                    4x <strong>{formatPrice(installment)}</strong> interest-free
                  </span>
                </div>
              </div>

              {/* Add To Cart & Quantity Row */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-slate-500 hover:text-slate-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1B2845]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-slate-500 hover:text-slate-800 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1B2845] hover:bg-[#141E34] text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DECB54]" />
                  <span>{addedSuccess ? 'Added To Cart ✓' : `Add To Cart • ${formatPrice(currentPrice * quantity)}`}</span>
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#B89628]" /> FREE Express Delivery Nationwide
                </span>
                <span>100-Night Sleep Trial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Technical Specification Sheet */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-6 border-b border-slate-200 pb-3 text-xs font-bold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`hover:text-[#1B2845] pb-2 border-b-2 transition-all ${
                activeTab === 'specs' ? 'text-[#1B2845] border-[#1B2845]' : 'text-slate-400 border-transparent'
              }`}
            >
              Detailed Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`hover:text-[#1B2845] pb-2 border-b-2 transition-all ${
                activeTab === 'features' ? 'text-[#1B2845] border-[#1B2845]' : 'text-slate-400 border-transparent'
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`hover:text-[#1B2845] pb-2 border-b-2 transition-all ${
                activeTab === 'warranty' ? 'text-[#1B2845] border-[#1B2845]' : 'text-slate-400 border-transparent'
              }`}
            >
              Guarantee & Service Warranty
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Weight Limit Rating</span>
                <span className="text-[#1B2845] font-bold text-sm block mt-1">{product.weightLimitKg}kg per person</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Core Technology</span>
                <span className="text-[#1B2845] font-bold text-sm block mt-1">{product.technology}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Factory Guarantee</span>
                <span className="text-[#1B2845] font-bold text-sm block mt-1">{product.guaranteeYears} Year Full Guarantee</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Service Warranty</span>
                <span className="text-[#1B2845] font-bold text-sm block mt-1">{product.warrantyYears} Year Service Warranty</span>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <ul className="grid sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <Check className="w-4 h-4 text-[#B89628] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'warranty' && (
            <div className="text-xs text-slate-600 leading-relaxed space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <p>
                This product is covered by an official factory <strong>{product.guaranteeYears} Year Full Replacement Guarantee</strong> followed by a <strong>{product.warrantyYears} Year Prorated Service Warranty</strong>.
              </p>
              <p className="text-slate-500">
                Supported nationwide across authorized South African service centers.
              </p>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-[#1B2845]">You May Also Consider</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isCompared={compareItems.some((c) => c.id === p.id)}
                  onToggleCompare={onToggleCompare}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
