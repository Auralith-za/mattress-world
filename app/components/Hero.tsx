import React, { useState } from 'react';
import { BedSize } from '~/types';
import { SIZE_LABELS } from '~/utils/formatters';

interface HeroProps {
  onOpenQuiz: () => void;
  onSelectBrand: (brand: string) => void;
  onSelectCategory: (cat: string) => void;
  onSelectSize: (size: BedSize) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onSelectBrand, onSelectCategory, onSelectSize }) => {
  const [quickSize, setQuickSize] = useState<BedSize>('queen');
  const [quickBrand, setQuickBrand] = useState<string>('All');

  const handleQuickFind = () => {
    onSelectSize(quickSize);
    onSelectBrand(quickBrand);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      {/* Full-Sized Widescreen Hero Banner Image Background */}
      <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden">
        <img
          src="/assets/hero_family_bed.jpg"
          alt="Family relaxing comfortably in luxury bed"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.88] contrast-[1.05]"
        />

        {/* Multi-stage Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B19]/95 via-[#070B19]/80 to-transparent sm:w-3/4 lg:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-transparent to-[#070B19]/30" />

        {/* Content Container Overlaid on Full Banner */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl space-y-6 text-white pt-6">
            {/* Top Badge */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#DECB54] text-[#DECB54] text-xs font-bold shadow-lg">
              <span>South Africa’s Premier Headless Sleep Store</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.12]">
              Every Night Feels Like <br />
              <span className="brand-gold-gradient-text">A Five-Star Resort</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              Invest in your family’s sleep health with official <strong>Mattress World House Brand</strong> (Ortho Sleep & Hospitality) and <strong>Cloud Nine</strong>. Heavy-duty posture support, zero partner disturbance, and up to 25-year service warranties.
            </p>

            {/* Quick Bed Finder Widget Overlay */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-2xl space-y-3 text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-[#1B2845] uppercase tracking-wider">
                  Quick Bed Finder
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Select size & brand</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Select Size */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">1. Bed Size</label>
                  <select
                    value={quickSize}
                    onChange={(e) => setQuickSize(e.target.value as BedSize)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-2 font-semibold focus:outline-none focus:border-[#1B2845]"
                  >
                    {(['single', 'threeQuarter', 'double', 'queen', 'king'] as BedSize[]).map((sz) => (
                      <option key={sz} value={sz}>
                        {SIZE_LABELS[sz].name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Brand */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">2. Select Brand</label>
                  <select
                    value={quickBrand}
                    onChange={(e) => setQuickBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded-xl p-2 font-semibold focus:outline-none focus:border-[#1B2845]"
                  >
                    <option value="All">All Brands</option>
                    <option value="Mattress World">Mattress World (House Brand)</option>
                    <option value="Cloud Nine">Cloud Nine Range</option>
                  </select>
                </div>

                {/* Action Button */}
                <div className="flex items-end">
                  <button
                    onClick={handleQuickFind}
                    className="w-full bg-[#1B2845] hover:bg-[#141E34] text-white font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center shadow"
                  >
                    <span>Search Beds</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenQuiz}
                className="bg-[#DECB54] hover:bg-yellow-400 text-[#1B2845] font-extrabold px-5 py-2.5 rounded-full text-xs transition-all shadow-lg"
              >
                <span>Bed Finder</span>
              </button>

              <a
                href="#configurator"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-full text-xs font-bold transition-all backdrop-blur-md"
              >
                <span>Bed Configurator</span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Right Corner Badge on Hero Banner */}
        <div className="absolute bottom-6 right-6 hidden lg:block bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-2xl shadow-2xl text-slate-800 text-xs font-semibold max-w-xs">
          <strong className="text-[#1B2845] block font-bold">100-Night Sleep Trial</strong>
          <span className="text-[11px] text-slate-500">Free nationwide delivery on all bed sets</span>
        </div>
      </div>

      {/* Brand Logos Bar Below Full Banner - Fixed Small Logo Sizes */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Official Authorized Brands:
            </span>
          </div>

          {/* Clean Small Logos Strip */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="h-7 w-28 flex items-center justify-center p-1 bg-slate-50 border border-slate-200 rounded-lg">
              <img
                src="/assets/logos/mattress_world_logo.png"
                alt="Mattress World"
                className="max-h-5 max-w-[100px] w-auto object-contain"
              />
            </div>
            <div className="h-7 w-24 flex items-center justify-center p-1 bg-slate-50 border border-slate-200 rounded-lg">
              <img
                src="/assets/logos/cloud_nine_logo.png"
                alt="Cloud Nine"
                className="max-h-5 max-w-[85px] w-auto object-contain"
              />
            </div>
            <div className="h-7 w-24 flex items-center justify-center p-1 bg-slate-50 border border-slate-200 rounded-lg">
              <img
                src="/assets/logos/strandmattress_logo.png"
                alt="Strandmattress"
                className="max-h-5 max-w-[85px] w-auto object-contain"
              />
            </div>
            <div className="h-7 w-24 flex items-center justify-center p-1 bg-slate-50 border border-slate-200 rounded-lg hidden sm:flex">
              <img
                src="/assets/logos/ortho_sleep_logo.png"
                alt="Ortho Sleep"
                className="max-h-5 max-w-[85px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
