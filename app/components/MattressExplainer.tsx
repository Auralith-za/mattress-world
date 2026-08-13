import React, { useState } from 'react';
import { BedDouble, Shield, RefreshCw, Scale, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface TechTab {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  pros: string[];
  bestFor: string;
}

const TECH_TABS: TechTab[] = [
  {
    id: 'pocket-spring',
    title: 'Pocket Spring Systems',
    subtitle: 'Individually encased coil technology',
    summary: 'Each spring coil is housed inside its own fabric pocket. This allows every spring to react independently to your weight and pressure, preventing motion transfer across the bed.',
    pros: [
      'Zero partner motion disturbance',
      'Targeted spinal contouring & hip relief',
      'Excellent airflow and temperature regulation',
      'Ideal for couples with different body weights'
    ],
    bestFor: 'Couples, light sleepers, and individuals seeking adaptive contouring.'
  },
  {
    id: 'high-density-foam',
    title: 'Orthopedic High-Density Foam',
    subtitle: 'Solid core posture support technology',
    summary: 'Constructed using compressed high-density rebond foam layers. Provides a resilient, non-sag foundation that distributes weight evenly across the entire surface.',
    pros: [
      'Chiropractor-approved orthopedic alignment',
      'Zero spring squeaks or mechanical failure points',
      'Long-lasting shape retention over 15–20 years',
      'Heavy-duty weight capacities (up to 150kg per side)'
    ],
    bestFor: 'Back pain sufferers, individuals needing heavy-duty support, and commercial lodge owners.'
  },
  {
    id: 'memory-foam',
    title: 'Cooling Blue-Gel Memory Foam',
    subtitle: 'Visco-elastic pressure relief',
    summary: 'Infused with heat-dissipating cooling gel beads. Softens under body temperature to mould perfectly around shoulders, hips, and lower back.',
    pros: [
      'Eliminates painful pressure points on shoulders & hips',
      'Dissipates body heat for cool sleeping nights',
      'Promotes healthy blood circulation during sleep'
    ],
    bestFor: 'Side sleepers, chronic joint pain sufferers, and luxury seekers.'
  },
  {
    id: 'adjustable-motion',
    title: 'Adjustable Motorized Motion Beds',
    subtitle: 'Posture elevation and Zero-Gravity positioning',
    summary: 'Features whisper-quiet electric motors allowing you to elevate head and foot positions effortlessly via remote control.',
    pros: [
      'Reduces snoring, sleep apnea, and acid reflux',
      'Zero-Gravity mode relieves spinal pressure',
      'Allows easy reading, working, and TV watching in bed'
    ],
    bestFor: 'Seniors, individuals recovering from surgery, and ultimate luxury bedrooms.'
  }
];

export const MattressExplainer: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('pocket-spring');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const activeTab = TECH_TABS.find((t) => t.id === activeTabId) || TECH_TABS[0];

  const faqs = [
    {
      q: 'What is the difference between a Guarantee and a Warranty?',
      a: 'A Guarantee covers 100% of replacement or repair costs for manufacturing defects within the initial 1 to 2 years. A Service Warranty is a prorated coverage extending up to 25 years, ensuring long-term factory support.'
    },
    {
      q: 'What does "Turnable Dual-Side Design" mean?',
      a: 'Turnable mattresses feature symmetric comfort layers on both top and bottom sides. Rotating and flipping the mattress every few months extends its lifespan significantly by distributing body weight wear evenly.'
    },
    {
      q: 'Why is the Weight Rating Per Side important?',
      a: 'Weight ratings (e.g. 120kg, 130kg, 150kg per person) indicate the maximum body mass per sleeper before structural fatigue occurs. Choosing a mattress rated above your combined weight ensures zero sag and maximum lifespan.'
    },
    {
      q: 'Should I buy a Mattress Only or a Full Bed Set with Base?',
      a: 'A proper bed base acts as a shock absorber for your mattress. Using an old or sagging base invalidates factory warranties. We strongly recommend purchasing a complete Bed Set for optimal performance.'
    }
  ];

  return (
    <section id="mattress-explainer" className="py-16 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B2845] text-[#DECB54] text-xs font-bold shadow-sm">
            <BedDouble className="w-3.5 h-3.5" />
            <span>Comprehensive Sleep Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1B2845] tracking-tight">
            Understanding <span className="brand-gold-gradient-text">Bed & Mattress Technologies</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Learn how pocket springs, orthopedic high-density foam, and weight capacities impact your sleep quality and spine health.
          </p>
        </div>

        {/* Interactive Tech Tabs */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Tech Menu */}
          <div className="lg:col-span-4 space-y-2.5">
            {TECH_TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    isActive
                      ? 'bg-[#1B2845] text-white border-[#1B2845] shadow-lg'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h4 className={`text-sm font-bold ${isActive ? 'text-[#DECB54]' : 'text-[#1B2845]'}`}>
                    {tab.title}
                  </h4>
                  <p className={`text-[11px] mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tab.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Tech Detail Box */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] text-[#B89628] font-bold uppercase tracking-wider">Technology Breakdown</span>
                <h3 className="text-2xl font-bold font-serif text-[#1B2845]">{activeTab.title}</h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#DECB54]/20 border border-[#DECB54] flex items-center justify-center text-[#1B2845] font-bold">
                <BedDouble className="w-5 h-5" />
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{activeTab.summary}</p>

            {/* Pros Grid */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-[#1B2845] uppercase tracking-wider">Key Advantages</h5>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {activeTab.pros.map((pro, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89628] mt-1.5 shrink-0" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For Banner */}
            <div className="bg-[#1B2845] text-white p-4 rounded-2xl flex items-center gap-3 shadow">
              <Award className="w-5 h-5 text-[#DECB54] shrink-0" />
              <div className="text-xs">
                <strong className="text-[#DECB54] block font-bold">Recommended Sleeping Audience:</strong>
                <span className="text-slate-200">{activeTab.bestFor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 max-w-4xl mx-auto shadow-sm">
          <h3 className="text-xl font-bold font-serif text-[#1B2845] text-center mb-6">
            Frequently Asked Sleep & Bed Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isExp = expandedFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setExpandedFaq(isExp ? null : idx)}
                    className="w-full text-left p-4 text-xs font-bold text-[#1B2845] flex items-center justify-between gap-4 hover:text-[#B89628]"
                  >
                    <span>{faq.q}</span>
                    {isExp ? <ChevronUp className="w-4 h-4 text-[#B89628]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isExp && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
