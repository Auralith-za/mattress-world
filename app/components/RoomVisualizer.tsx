import React, { useState } from 'react';
import { Bed, Sliders, Check, ChevronRight } from 'lucide-react';
import { Product, BedSize } from '~/types';
import { SIZE_LABELS, formatPrice, getStartingPrice } from '~/utils/formatters';

interface RoomVisualizerProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

interface CategoryPreset {
  id: string;
  name: string;
  subtitle: string;
  imageBg: string;
  description: string;
}

const CATEGORY_PRESETS: CategoryPreset[] = [
  {
    id: 'master-suite',
    name: 'Master Suite Luxury',
    subtitle: 'High-end penthouse aesthetic with rich velvet and metallic accents',
    imageBg: '/assets/rooms/master_suite.jpg',
    description: 'Designed for spacious master bedrooms requiring King or Queen size heavy-duty mattresses with maximum posture support.'
  },
  {
    id: 'minimalist-oasis',
    name: 'Modern Minimalist',
    subtitle: 'Clean lines, monochrome tones, and zero-clutter sleeping space',
    imageBg: '/assets/rooms/minimalist.jpg',
    description: 'Focuses on ergonomic simplicity. Complements high-density foam mattresses like Cloud Nine Camden and Ortho Support.'
  },
  {
    id: 'scandinavian-sanctuary',
    name: 'Scandinavian Sanctuary',
    subtitle: 'Organic warmth, natural timber finishes, and calming sage hues',
    imageBg: '/assets/rooms/scandinavian.jpg',
    description: 'Created for relaxing sanctuary environments. Pair with plush memory foam or hospitality pocket spring mattresses.'
  }
];

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({ products, onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryPreset>(CATEGORY_PRESETS[0]);
  const [selectedSize, setSelectedSize] = useState<BedSize>('queen');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const priceForSize = selectedProduct ? getStartingPrice(selectedProduct) : 0;

  return (
    <section id="room-visualizer" className="py-16 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-[#1B2845] text-xs font-bold shadow-sm">
            <span>Product in Room Visualizer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1B2845] tracking-tight">
            See Your Bed <span className="brand-gold-gradient-text">Inside Real Room Interiors</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select room interior presets and mattress models to see how your bed fits seamlessly into your room.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {CATEGORY_PRESETS.map((cat) => {
            const isActive = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#1B2845] text-white border-[#1B2845] shadow-lg shadow-[#1B2845]/10'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#DECB54]">Room Setting</span>
                  {isActive && <Check className="w-4 h-4 text-[#DECB54]" />}
                </div>
                <h4 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-[#1B2845]'}`}>{cat.name}</h4>
                <p className={`text-[11px] line-clamp-2 mt-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{cat.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Configurator Workspace Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-5">
              <h3 className="text-base font-bold text-[#1B2845] flex items-center gap-2 border-b border-slate-200 pb-3">
                <Sliders className="w-4 h-4 text-[#B89628]" />
                <span>Customize Room & Mattress</span>
              </h3>

              {/* Select Mattress Model */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Select Mattress Model</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-xl p-3 focus:border-[#1B2845] focus:outline-none shadow-sm"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} - {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Size Swatches */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Size ({SIZE_LABELS[selectedSize].dims})
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['single', 'threeQuarter', 'double', 'queen', 'king'] as BedSize[]).map((sz) => {
                    const isAvail = selectedProduct.availableSizes.includes(sz);
                    const isSel = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        disabled={!isAvail}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                          isSel
                            ? 'bg-[#1B2845] text-white border-[#1B2845] shadow'
                            : isAvail
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

              {/* Description Snippet */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1 shadow-sm">
                <span className="text-[10px] text-[#B89628] font-bold block uppercase">Category Overview</span>
                <p className="leading-relaxed">{activeCategory.description}</p>
              </div>
            </div>

            {/* Bottom Configure Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => onSelectProduct(selectedProduct)}
                className="w-full bg-[#1B2845] hover:bg-[#141E34] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Configure & View Spec Sheet</span>
                <ChevronRight className="w-4 h-4 text-[#DECB54]" />
              </button>
            </div>
          </div>

          {/* Real Room Background Canvas - Bed Floats Seamlessly with NO White Border */}
          <div className="lg:col-span-8 relative min-h-[500px] sm:min-h-[550px] rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between p-6 sm:p-8 shadow-xl">
            {/* Real Room Interior Background Image */}
            <img
              src={activeCategory.imageBg}
              alt={activeCategory.name}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Top Room Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#DECB54] uppercase tracking-widest block drop-shadow">
                  Active Room: {activeCategory.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white drop-shadow">{selectedProduct.name}</h3>
              </div>
              <div className="bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-2xl text-right shadow-lg">
                <span className="text-[10px] text-slate-500 block font-semibold">Configured Price</span>
                <span className="text-[#1B2845] font-black text-base">{formatPrice(priceForSize)}</span>
              </div>
            </div>

            {/* Center Bed Placement - Transparent Bed PNG Floats Seamlessly Over Room Floor */}
            <div className="relative z-10 my-auto flex items-center justify-center pt-8 pb-4">
              <div className="relative max-w-lg w-full flex flex-col items-center justify-center">
                {/* Transparent Bed Image with Drop Shadow - NO WHITE CARD CONTAINER OR BORDER */}
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 sm:h-72 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-500"
                />

                {/* Clean Weight Rating Pill */}
                <div className="mt-2 bg-[#1B2845]/90 backdrop-blur-md text-white border border-[#DECB54] px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  Weight Limit: {selectedProduct.weightLimitKg}kg / side
                </div>
              </div>
            </div>

            {/* Bottom Room Specs Bar */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs shadow-lg">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold">Bed Size</span>
                  <span className="text-[#1B2845] font-bold">{SIZE_LABELS[selectedSize].name} ({SIZE_LABELS[selectedSize].dims})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold">Comfort Profile</span>
                  <span className="text-[#B89628] font-bold">{selectedProduct.feel} ({selectedProduct.firmnessRating}/10)</span>
                </div>
              </div>
              <div className="text-[#1B2845] font-bold text-[11px]">
                100-Night Sleep Trial Included
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
