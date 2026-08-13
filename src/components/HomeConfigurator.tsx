import React, { useState } from 'react';
import { Sliders, ShoppingBag, ChevronRight } from 'lucide-react';
import { Product, BedSize, BedLength, ProductType } from '../types';
import { SIZE_LABELS, formatPrice, calculatePrice, calculateInstallment } from '../utils/formatters';

interface HomeConfiguratorProps {
  products: Product[];
  onAddToCart: (product: Product, size: BedSize, length: BedLength, type: ProductType, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomeConfigurator: React.FC<HomeConfiguratorProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState<BedSize>('queen');
  const [selectedLength, setSelectedLength] = useState<BedLength>('standard');
  const [selectedType, setSelectedType] = useState<ProductType>('set');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const currentPrice = calculatePrice(selectedProduct, selectedSize, selectedLength, selectedType);
  const installment = calculateInstallment(currentPrice);

  const handleAddAndCheckout = () => {
    onAddToCart(selectedProduct, selectedSize, selectedLength, selectedType, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <section id="configurator" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B2845] text-[#DECB54] text-xs font-bold shadow-sm">
            <span>Instant Bed Configurator & Direct Express Checkout</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1B2845] tracking-tight">
            Configure Your Bed <span className="brand-gold-gradient-text">& Buy Direct Online</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your preferred mattress model, size, length, and set options to calculate real-time pricing and proceed directly to express checkout.
          </p>
        </div>

        {/* Configurator Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Product Preview & Image */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-center h-72 sm:h-80 shadow-sm overflow-hidden group">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
              />

              {/* Brand Badge in Corner */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 p-1.5 rounded-lg shadow-sm flex items-center justify-center h-7 w-22">
                <img
                  src={selectedProduct.brandLogo}
                  alt={selectedProduct.brand}
                  className="h-4 max-h-4 max-w-full object-contain"
                />
              </div>

              {/* Weight Limit Badge */}
              <div className="absolute top-3 left-3 bg-[#1B2845] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {selectedProduct.weightLimitKg}kg / Side
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Comfort</span>
                <span className="font-bold text-[#1B2845]">{selectedProduct.feel}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Technology</span>
                <span className="font-bold text-[#1B2845]">{selectedProduct.technology}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Warranty</span>
                <span className="font-bold text-[#1B2845]">{selectedProduct.warrantyYears} Years</span>
              </div>
            </div>
          </div>

          {/* Right Column: Controls & Price Calculation */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* 1. Select Mattress Model */}
              <div>
                <label className="text-xs font-bold text-[#1B2845] block mb-1.5">
                  1. Select Mattress Model
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-xl p-3 font-semibold focus:border-[#1B2845] focus:outline-none shadow-sm"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} - {p.name} ({p.weightLimitKg}kg rating)
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Select Size */}
              <div>
                <label className="text-xs font-bold text-[#1B2845] block mb-1.5">
                  2. Select Size
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['single', 'threeQuarter', 'double', 'queen', 'king'] as BedSize[]).map((sz) => {
                    const isAvailable = selectedProduct.availableSizes.includes(sz);
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845] shadow'
                            : isAvailable
                            ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                        }`}
                      >
                        {SIZE_LABELS[sz].name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Length & Type Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Length */}
                <div>
                  <label className="text-xs font-bold text-[#1B2845] block mb-1.5">Length</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setSelectedLength('standard')}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border ${
                        selectedLength === 'standard'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      Standard (188cm)
                    </button>
                    <button
                      disabled={!selectedProduct.supportsExtraLength}
                      onClick={() => setSelectedLength('extraLength')}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border ${
                        selectedLength === 'extraLength'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : selectedProduct.supportsExtraLength
                          ? 'bg-white text-slate-600 border-slate-200'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Extra (200cm)
                    </button>
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="text-xs font-bold text-[#1B2845] block mb-1.5">Set Option</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setSelectedType('set')}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border ${
                        selectedType === 'set'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      Bed Set
                    </button>
                    <button
                      disabled={!selectedProduct.supportsMattressOnly}
                      onClick={() => setSelectedType('mattressOnly')}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border ${
                        selectedType === 'mattressOnly'
                          ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                          : selectedProduct.supportsMattressOnly
                          ? 'bg-white text-slate-600 border-slate-200'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Mattress Only
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Pricing & Add To Cart CTA */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Configured Price</span>
                  <span className="text-2xl font-black text-[#1B2845] tracking-tight">
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
                    4x <strong>{formatPrice(installment)}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddAndCheckout}
                  className="w-full bg-[#1B2845] hover:bg-[#141E34] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DECB54]" />
                  <span>{addedSuccess ? 'Added To Cart ✓' : 'Add To Cart & Checkout'}</span>
                </button>

                <button
                  onClick={() => onSelectProduct(selectedProduct)}
                  className="w-full bg-white hover:bg-slate-100 text-[#1B2845] font-bold py-3 px-4 rounded-xl text-xs transition-all border border-slate-300 flex items-center justify-center gap-1.5"
                >
                  <span>View Product Page</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
