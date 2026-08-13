import React, { useState, useMemo } from 'react';
import { Product, BedSize } from '../types';
import { ProductCard } from './ProductCard';
import { Search, Filter, RotateCcw, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { SIZE_LABELS } from '../utils/formatters';

interface ShopPageProps {
  products: Product[];
  compareItems: Product[];
  onToggleCompare: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSizeFilter: string;
  setSelectedSizeFilter: (size: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  compareItems,
  onToggleCompare,
  onSelectProduct,
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  selectedSizeFilter,
  setSelectedSizeFilter,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedFeel, setSelectedFeel] = useState<string>('All');
  const [selectedWeight, setSelectedWeight] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'weight'>('featured');

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Brand filter
      if (selectedBrand !== 'All') {
        if (!p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Size filter
      if (selectedSizeFilter !== 'All' && !p.availableSizes.includes(selectedSizeFilter as BedSize)) return false;

      // Feel filter
      if (selectedFeel !== 'All' && p.feel !== selectedFeel) return false;

      // Weight Rating filter
      if (selectedWeight !== 'All') {
        const targetW = parseInt(selectedWeight, 10);
        if (p.weightLimitKg < targetW) return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesTech = p.technology.toLowerCase().includes(q);
        const matchesRange = p.range.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesTech && !matchesRange && !matchesDesc) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.prices.set.single || 0) - (b.prices.set.single || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.prices.set.single || 0) - (a.prices.set.single || 0));
    } else if (sortBy === 'weight') {
      result.sort((a, b) => b.weightLimitKg - a.weightLimitKg);
    }

    return result;
  }, [products, selectedBrand, selectedCategory, selectedSizeFilter, selectedFeel, selectedWeight, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedBrand('All');
    setSelectedCategory('All');
    setSelectedSizeFilter('All');
    setSelectedFeel('All');
    setSelectedWeight('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Banner Header */}
        <div className="bg-[#1B2845] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#DECB54] uppercase tracking-widest block">
              Official Online Store
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Beds & Mattresses Shop
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Browse our complete catalog of Chiropractor-Approved Orthopedic, Heavy-Duty Hospitality, and Cloud Nine sleep systems with free national delivery.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[160px]">
            <span className="text-2xl font-black text-[#DECB54] block">{filteredProducts.length}</span>
            <span className="text-[11px] text-slate-200 font-bold uppercase">Products Found</span>
          </div>
        </div>

        {/* Shop Grid Workspace: Sidebar Filters + Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter Panel */}
          <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-[#1B2845] text-sm">
                <SlidersHorizontal className="w-4 h-4 text-[#B89628]" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-slate-500 hover:text-[#1B2845] font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* 1. Search Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1B2845] block">Search Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Camden, 150kg..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-[#1B2845]"
                />
              </div>
            </div>

            {/* 2. Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1B2845] block">Brand</label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'All', label: 'All Brands' },
                  { id: 'Mattress World', label: 'Mattress World' },
                  { id: 'Cloud Nine', label: 'Cloud Nine & Strandmattress' },
                  { id: 'Rest Assured', label: 'Rest Assured' },
                  { id: 'Furniture', label: 'Bases & Furniture' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBrand(b.id)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-xl font-medium transition-all ${
                      selectedBrand === b.id
                        ? 'bg-[#1B2845] text-[#DECB54] font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Bed Size Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1B2845] block">Bed Size</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                {[
                  { id: 'All', label: 'All Sizes' },
                  { id: 'single', label: 'Single' },
                  { id: 'threeQuarter', label: 'Three Quarter' },
                  { id: 'double', label: 'Double' },
                  { id: 'queen', label: 'Queen' },
                  { id: 'king', label: 'King' },
                ].map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => setSelectedSizeFilter(sz.id)}
                    className={`py-1.5 px-2 rounded-xl text-center border transition-all ${
                      selectedSizeFilter === sz.id
                        ? 'bg-[#1B2845] text-[#DECB54] border-[#1B2845]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1B2845] block">Technology & Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:border-[#1B2845]"
              >
                <option value="All">All Categories</option>
                <option value="Orthopedic">Orthopedic Spinal Support</option>
                <option value="Hospitality">Hospitality Commercial</option>
                <option value="High Density Foam">High Density Foam</option>
                <option value="Pocket Spring">Pocket Spring (Zero Motion)</option>
                <option value="Adjustable Motion">Motorized Adjustable</option>
              </select>
            </div>

            {/* 5. Weight Rating Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1B2845] block">Min Weight Limit</label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'All', label: 'Any Weight Rating' },
                  { id: '120', label: '120kg+ Per Side' },
                  { id: '130', label: '130kg+ Per Side' },
                  { id: '150', label: '150kg Heavy Duty' },
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWeight(w.id)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-xl font-medium transition-all ${
                      selectedWeight === w.id
                        ? 'bg-[#1B2845] text-[#DECB54] font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Comfort Feel Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1B2845] block">Comfort Profile</label>
              <select
                value={selectedFeel}
                onChange={(e) => setSelectedFeel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:border-[#1B2845]"
              >
                <option value="All">All Profiles</option>
                <option value="Medium">Medium Plush (6/10)</option>
                <option value="Medium Firm">Medium Firm (7-8/10)</option>
                <option value="Firm">Extra Firm (9/10)</option>
              </select>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-slate-600 font-semibold">
                Showing <strong>{filteredProducts.length}</strong> mattresses
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-[#1B2845]"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="weight">Highest Weight Limit</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <Filter className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-[#1B2845]">No Mattresses Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your filters or search keywords to explore more options in our catalog.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="bg-[#1B2845] hover:bg-[#141E34] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isCompared={compareItems.some((c) => c.id === prod.id)}
                    onToggleCompare={onToggleCompare}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
