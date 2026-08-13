import React from 'react';
import { ShieldCheck, Truck, Award, Clock, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B2845] text-slate-300 text-xs py-14 border-t border-slate-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-slate-700/80 pb-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#DECB54]/20 border border-[#DECB54] text-[#DECB54]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Free Nationwide Delivery</h5>
              <p className="text-[11px] text-slate-400">Shipped direct to your home</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#DECB54]/20 border border-[#DECB54] text-[#DECB54]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">100-Night Sleep Trial</h5>
              <p className="text-[11px] text-slate-400">Risk-free trial in your home</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#DECB54]/20 border border-[#DECB54] text-[#DECB54]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Factory Guarantees</h5>
              <p className="text-[11px] text-slate-400">Up to 25 year service warranties</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#DECB54]/20 border border-[#DECB54] text-[#DECB54]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">0% Interest Financing</h5>
              <p className="text-[11px] text-slate-400">PayFlex & PayJustNow options</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 inline-flex max-w-[150px] justify-center">
              <img src="/assets/logos/mattress_world_logo.png" alt="Mattress World" className="max-h-7 max-w-[120px] w-auto object-contain" />
            </div>
            <p className="text-slate-300 leading-relaxed">
              South Africa’s leading headless sleep specialist. Offering luxury orthopedic mattresses, heavy-duty hospitality beds, Cloud Nine, and Strandmattress collections.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-bold text-[#DECB54] uppercase text-[11px] tracking-wider">Product Ranges</h5>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#/shop" className="hover:text-white transition-colors">Mattress World Ortho Sleep Range</a></li>
              <li><a href="#/shop" className="hover:text-white transition-colors">Hospitality Grade Commercial Range</a></li>
              <li><a href="#/shop" className="hover:text-white transition-colors">Cloud Nine Ultra Premium Collection</a></li>
              <li><a href="#/shop" className="hover:text-white transition-colors">Strandmattress Ergomax</a></li>
              <li><a href="#/shop" className="hover:text-white transition-colors">Cloud Nine Slow Motion Adjustable Beds</a></li>
            </ul>
          </div>

          {/* Sleep Advice */}
          <div className="space-y-3">
            <h5 className="font-bold text-[#DECB54] uppercase text-[11px] tracking-wider">Sleep Resources</h5>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#configurator" className="hover:text-white transition-colors">Instant Bed Configurator</a></li>
              <li><a href="#mattress-explainer" className="hover:text-white transition-colors">Mattress & Bed Type Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">100-Night Sleep Trial Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty & Guarantee Registration</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h5 className="font-bold text-[#DECB54] uppercase text-[11px] tracking-wider">Customer Support</h5>
            <ul className="space-y-2.5 text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DECB54] shrink-0" />
                <span>+27 (0)11 800 9000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DECB54] shrink-0" />
                <span>sales@mattressworld.co.za</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DECB54] shrink-0 mt-0.5" />
                <span>Nationwide Showrooms across Gauteng, Western Cape & KZN</span>
              </li>
              <li>
                <a
                  href="https://mqrbzt-h4.myshopify.com/account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DECB54] font-bold hover:underline block pt-1"
                >
                  → My Shopify Account & Order Tracking
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Payment Badges - NO WHITE CONTAINER BOX */}
        <div className="pt-8 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Mattress World Headless Storefront. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-300 font-semibold">
            <span>Official Payment Partners:</span>
            {/* Payflex Logo - Small without white box */}
            <div className="flex items-center justify-center">
              <img
                src="/assets/logos/payflex_logo.webp"
                alt="PayFlex"
                className="h-4.5 max-w-[65px] w-auto object-contain rounded-full mix-blend-screen filter contrast-125"
              />
            </div>
            <span className="bg-white text-[#1B2845] font-bold px-2 py-0.5 rounded">Ozow</span>
            <span className="bg-[#DECB54] text-[#1B2845] font-bold px-2 py-0.5 rounded">PayJustNow</span>
            <span className="bg-white text-[#1B2845] font-bold px-2 py-0.5 rounded">Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
