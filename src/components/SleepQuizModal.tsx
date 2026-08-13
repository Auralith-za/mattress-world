import React, { useState } from 'react';
import { X, Sparkles, Check, RefreshCw } from 'lucide-react';
import { Product, QuizAnswers } from '../types';
import { formatPrice, getStartingPrice } from '../utils/formatters';

interface SleepQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SleepQuizModal: React.FC<SleepQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [recommended, setRecommended] = useState<Product[]>([]);

  if (!isOpen) return null;

  const handleNextStep = (key: keyof QuizAnswers, value: any) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 4) {
      setStep(step + 1);
    } else {
      calculateResults(updated);
      setStep(5);
    }
  };

  const calculateResults = (finalAnswers: QuizAnswers) => {
    const scored = products.map((p) => {
      let score = 50;

      if (finalAnswers.sleepingPosition === 'side' && p.feel.includes('Medium')) score += 20;
      if (finalAnswers.sleepingPosition === 'back' && (p.feel === 'Medium Firm' || p.feel === 'Firm')) score += 20;
      if (finalAnswers.sleepingPosition === 'stomach' && p.feel === 'Firm') score += 25;

      if (finalAnswers.weightRating === '150plus' && p.weightLimitKg >= 150) score += 30;
      if (finalAnswers.weightRating === '130' && p.weightLimitKg >= 130) score += 20;
      if (finalAnswers.weightRating === '120' && p.weightLimitKg >= 120) score += 15;

      if (finalAnswers.hasBackPain && (p.category === 'Orthopedic' || p.range.includes('Ortho'))) score += 25;

      if (finalAnswers.feelPreference === 'firm' && p.feel === 'Firm') score += 20;
      if (finalAnswers.feelPreference === 'mediumFirm' && p.feel === 'Medium Firm') score += 20;
      if (finalAnswers.feelPreference === 'medium' && p.feel === 'Medium') score += 20;

      return { product: p, score };
    });

    scored.sort((a, b) => b.score - a.score);
    setRecommended(scored.slice(0, 3).map((s) => s.product));
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({});
    setRecommended([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1B2845] text-[#DECB54]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-[#1B2845]">Bed Finder Consultant</h3>
              <p className="text-[11px] text-slate-500">Step {step} of 4 • Personalized Mattress Match</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h4 className="text-xl font-bold font-serif text-[#1B2845]">What is your primary sleeping position?</h4>
              <p className="text-xs text-slate-500">Different positions require different posture pressure points.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'side', title: 'Side Sleeper', sub: 'Needs pressure relief for hips & shoulders' },
                { id: 'back', title: 'Back Sleeper', sub: 'Requires lumbar spine alignment' },
                { id: 'stomach', title: 'Stomach Sleeper', sub: 'Needs firm surface to prevent lower back dip' },
                { id: 'combination', title: 'Combination Sleeper', sub: 'Changes position throughout the night' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleNextStep('sleepingPosition', opt.id)}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1B2845] hover:bg-slate-100 text-left transition-all group"
                >
                  <h5 className="text-sm font-bold text-[#1B2845] group-hover:text-[#B89628]">{opt.title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h4 className="text-xl font-bold font-serif text-[#1B2845]">What weight rating do you require per side?</h4>
              <p className="text-xs text-slate-500">Ensures structural longevity without mattress sag.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'under100', title: 'Up to 100kg / person', sub: 'Standard domestic weight capacity' },
                { id: '120', title: 'Up to 120kg / person', sub: 'Heavy-duty daily posture foam/spring' },
                { id: '130', title: 'Up to 130kg / person', sub: 'Hospitality comfort & prestige series' },
                { id: '150plus', title: 'Up to 150kg / person', sub: 'Ultra heavy-duty maximum density core' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleNextStep('weightRating', opt.id)}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1B2845] hover:bg-slate-100 text-left transition-all group"
                >
                  <h5 className="text-sm font-bold text-[#1B2845] group-hover:text-[#B89628]">{opt.title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h4 className="text-xl font-bold font-serif text-[#1B2845]">What comfort feel do you prefer?</h4>
              <p className="text-xs text-slate-500">Based on a 1 to 10 firmness spectrum.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'medium', title: 'Medium (6/10)', sub: 'Balanced plush cushioning' },
                { id: 'mediumFirm', title: 'Medium Firm (7-8/10)', sub: 'Most popular orthopedic balance' },
                { id: 'firm', title: 'Extra Firm (9/10)', sub: 'Maximum chiropractic support' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleNextStep('feelPreference', opt.id)}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1B2845] hover:bg-slate-100 text-left transition-all group"
                >
                  <h5 className="text-xs font-bold text-[#1B2845] group-hover:text-[#B89628]">{opt.title}</h5>
                  <p className="text-[10px] text-slate-500 mt-1">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h4 className="text-xl font-bold font-serif text-[#1B2845]">Do you or your partner experience back pain?</h4>
              <p className="text-xs text-slate-500">Allows us to recommend certified orthopedic ranges.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleNextStep('hasBackPain', true)}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1B2845] hover:bg-slate-100 text-center transition-all group"
              >
                <span className="text-2xl block mb-2">🩹</span>
                <h5 className="text-sm font-bold text-[#1B2845] group-hover:text-[#B89628]">Yes, Need Back Support</h5>
                <p className="text-[11px] text-slate-500 mt-1">Prioritize Orthopedic & Spine Alignment models</p>
              </button>

              <button
                onClick={() => handleNextStep('hasBackPain', false)}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1B2845] hover:bg-slate-100 text-center transition-all group"
              >
                <span className="text-2xl block mb-2">☁️</span>
                <h5 className="text-sm font-bold text-[#1B2845] group-hover:text-[#B89628]">No, General Luxury Comfort</h5>
                <p className="text-[11px] text-slate-500 mt-1">Explore all Cloud Nine & Mattress World sets</p>
              </button>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <Check className="w-3.5 h-3.5" /> 3 Matched Recommendations Ready
              </div>
              <h4 className="text-2xl font-bold font-serif text-[#1B2845]">Your Best Sleep Matches</h4>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {recommended.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-[#1B2845] transition-all flex items-center justify-between gap-4"
                >
                  <img src={prod.image} alt={prod.name} className="w-20 h-16 object-contain rounded-lg bg-white p-1 border border-slate-200" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#B89628] font-bold uppercase">{prod.brand} • Match #{idx + 1}</span>
                    <h5 className="text-xs font-bold text-[#1B2845] truncate">{prod.name}</h5>
                    <p className="text-[11px] text-slate-500">
                      Weight: <strong>{prod.weightLimitKg}kg/side</strong> • Feel: {prod.feel}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">From</span>
                    <span className="text-sm font-bold text-[#1B2845]">{formatPrice(getStartingPrice(prod))}</span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="mt-1 bg-[#1B2845] hover:bg-[#141E34] text-white font-bold text-[10px] px-3 py-1 rounded-lg transition-all shadow"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-500 hover:text-[#1B2845] flex items-center gap-1.5 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2 rounded-xl"
              >
                Close Consultant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
