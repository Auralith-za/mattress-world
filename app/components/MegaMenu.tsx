import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BedSize } from '~/types';
import { SIZE_LABELS } from '~/utils/formatters';

interface MegaMenuProps {
  onSelectBrand: (brand: string) => void;
  onSelectCategory: (cat: string) => void;
  onSelectSize: (size: BedSize) => void;
  onOpenQuiz: () => void;
  onOpenCompare: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  onSelectBrand,
  onSelectCategory,
  onSelectSize,
  onOpenQuiz,
  onOpenCompare,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-[#1B2845] border-t border-slate-700/60 text-xs font-semibold relative z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2 py-1">
          {/* 1. Beds & Mattresses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('beds')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3.5 py-2.5 text-white hover:text-[#DECB54] font-bold transition-colors">
              <span>Beds & Mattresses</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </button>

            {/* Mega Dropdown Panel - Clean Light Theme */}
            {activeDropdown === 'beds' && (
              <div className="absolute top-full left-0 w-[640px] bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl grid grid-cols-3 gap-6 text-xs text-slate-700 z-50">
                {/* Col 1: Shop By Size */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold text-[#1B2845] uppercase tracking-wider border-b border-slate-100 pb-1.5">
                    Shop By Size
                  </h4>
                  <ul className="space-y-1.5">
                    {(['single', 'threeQuarter', 'double', 'queen', 'king'] as BedSize[]).map((sz) => (
                      <li key={sz}>
                        <button
                          onClick={() => {
                            onSelectSize(sz);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-slate-100 hover:text-[#1B2845] transition-colors font-medium text-slate-800"
                        >
                          {SIZE_LABELS[sz].name}
                        </button>
                      </li>
                    ))}
                    <li className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          onSelectCategory('All');
                          setActiveDropdown(null);
                        }}
                        className="text-[#B89628] font-bold hover:underline block py-1"
                      >
                        + Extra Length (200cm)
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Col 2: Shop By Technology */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold text-[#1B2845] uppercase tracking-wider border-b border-slate-100 pb-1.5">
                    Technology & Support
                  </h4>
                  <ul className="space-y-1.5">
                    <li>
                      <button
                        onClick={() => {
                          onSelectCategory('Pocket Spring');
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left py-1 px-2 rounded-lg hover:bg-slate-100 hover:text-[#1B2845] transition-colors"
                      >
                        Pocket Spring (Zero Motion)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onSelectCategory('Orthopedic');
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left py-1 px-2 rounded-lg hover:bg-slate-100 hover:text-[#1B2845] transition-colors"
                      >
                        Orthopedic Spine Alignment
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onSelectCategory('Hospitality');
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left py-1 px-2 rounded-lg hover:bg-slate-100 hover:text-[#1B2845] transition-colors"
                      >
                        Hospitality Commercial Grade
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onSelectCategory('High Density Foam');
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left py-1 px-2 rounded-lg hover:bg-slate-100 hover:text-[#1B2845] transition-colors"
                      >
                        High-Density Smart Foam Core
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onSelectCategory('Adjustable Motion');
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left py-1 px-2 rounded-lg hover:bg-slate-100 text-[#1B2845] font-bold transition-colors"
                      >
                        Motorized Adjustable Motion
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Col 3: Banner Feature */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] bg-[#DECB54] text-[#1B2845] px-2 py-0.5 rounded font-bold uppercase">
                      Risk Free
                    </span>
                    <h5 className="font-serif font-bold text-[#1B2845] text-sm mt-2">100-Night Sleep Guarantee</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      Test your bed at home with peace of mind. Free national delivery included.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onOpenQuiz();
                      setActiveDropdown(null);
                    }}
                    className="w-full bg-[#1B2845] hover:bg-[#141E34] text-white font-bold py-2 rounded-lg text-center transition-all shadow"
                  >
                    Bed Finder
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Shop By Brand Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('brands')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3.5 py-2.5 text-white hover:text-[#DECB54] font-bold transition-colors">
              <span>Shop By Brand</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </button>

            {activeDropdown === 'brands' && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl space-y-2.5 text-xs z-50">
                <button
                  onClick={() => {
                    onSelectBrand('Mattress World');
                    setActiveDropdown(null);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all flex items-center gap-3 group"
                >
                  <img src="/assets/logos/mattress_world_logo.png" alt="MW" className="h-6 w-auto object-contain" />
                  <div>
                    <h5 className="font-bold text-[#1B2845] group-hover:text-[#B89628]">Mattress World (House Brand)</h5>
                    <span className="text-[10px] text-slate-500">Ortho Sleep & Hospitality Ranges</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectBrand('Cloud Nine');
                    setActiveDropdown(null);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all flex items-center gap-3 group"
                >
                  <img src="/assets/logos/cloud_nine_logo.png" alt="Cloud Nine" className="h-5 w-auto object-contain" />
                  <div>
                    <h5 className="font-bold text-[#1B2845] group-hover:text-[#B89628]">Cloud Nine Range</h5>
                    <span className="text-[10px] text-slate-500">Premium, Ultra Premium & Slow Motion</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectBrand('Strandmattress');
                    setActiveDropdown(null);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all flex items-center gap-3 group"
                >
                  <img src="/assets/logos/strandmattress_logo.png" alt="Strandmattress" className="h-5 w-auto object-contain" />
                  <div>
                    <h5 className="font-bold text-[#1B2845] group-hover:text-[#B89628]">Strandmattress</h5>
                    <span className="text-[10px] text-slate-500">Ergomax High Density Series</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectBrand('Rest Assured');
                    setActiveDropdown(null);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-all flex items-center gap-3 group"
                >
                  <img src="/assets/logos/rest_assured_logo.png" alt="Rest Assured" className="h-5 w-auto object-contain" />
                  <div>
                    <h5 className="font-bold text-[#1B2845] group-hover:text-[#B89628]">Rest Assured Collection</h5>
                    <span className="text-[10px] text-slate-500">Evolution Pocket & Heritage Bonnel Series</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 3. Bed Types Guide */}
          <a
            href="#mattress-explainer"
            className="px-3.5 py-2.5 text-white hover:text-[#DECB54] font-bold transition-colors block"
          >
            <span>Bed Types & Specs Guide</span>
          </a>

          {/* 4. Compare Tool */}
          <button
            onClick={onOpenCompare}
            className="px-3.5 py-2.5 text-white hover:text-[#DECB54] font-bold transition-colors block"
          >
            <span>Compare Tool</span>
          </button>
        </div>

        {/* Right Call To Action Badge */}
        <div className="hidden lg:flex items-center gap-3 py-1">
          <button
            onClick={onOpenQuiz}
            className="inline-flex items-center justify-center bg-[#DECB54] text-[#1B2845] px-4 py-1.5 rounded-full text-xs font-extrabold hover:bg-yellow-400 transition-all shadow-sm"
          >
            <span>Bed Finder</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
