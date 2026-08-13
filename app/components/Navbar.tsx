import React, { useState } from 'react';
import { ShoppingBag, Search, Scale, Menu, X, User } from 'lucide-react';
import { CartItem, Product } from '~/types';
import { formatPrice } from '~/utils/formatters';

interface NavbarProps {
  cartItems: CartItem[];
  compareItems: Product[];
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpenQuiz: () => void;
  onSelectCategory: (cat: string) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  compareItems,
  onOpenCart,
  onOpenCompare,
  onOpenQuiz,
  onSelectCategory,
  onSearchChange,
  searchQuery,
  selectedBrand,
  onSelectBrand,
  onNavigateHome,
  onNavigateShop,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-[#1B2845] text-slate-200 font-medium text-xs py-2.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-slate-200">
              Sales Hotline: <strong className="text-white">0800 000 900</strong>
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-200">
              100-Night Risk-Free Sleep Trial
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#DECB54] font-bold">
              FREE Nationwide Delivery
            </span>
            <span className="hidden lg:inline text-slate-400">• PayFlex 0% Interest</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Navigates to Home Page (#/) */}
        <div className="flex items-center gap-4">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="p-1.5 bg-white border border-slate-200 rounded-xl group-hover:border-[#DECB54] transition-all duration-300 shadow-sm flex items-center justify-center h-12 w-36 overflow-hidden">
              <img
                src="/assets/logos/mattress_world_logo.png"
                alt="Mattress World Logo"
                className="max-h-9 max-w-[130px] w-auto object-contain"
              />
            </div>
            <div className="hidden lg:block">
              <span className="text-lg font-bold font-serif tracking-tight text-[#1B2845] block">MATTRESS WORLD</span>
              <span className="text-[10px] tracking-widest text-[#B89628] font-bold uppercase block">
                PREMIER SLEEP STORE
              </span>
            </div>
          </a>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search beds, pocket spring, 150kg weight limit..."
              className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-xs rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1B2845] focus:bg-white focus:ring-1 focus:ring-[#1B2845] transition-all placeholder:text-slate-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-3">
          {/* Shop Direct Link */}
          <a
            href="#/shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigateShop();
            }}
            className="hidden lg:inline-flex items-center text-xs font-bold text-[#1B2845] hover:text-[#B89628] px-3 py-2 transition-colors"
          >
            Shop All Beds
          </a>

          {/* Bed Finder Button */}
          <button
            onClick={onOpenQuiz}
            className="hidden sm:inline-flex items-center justify-center bg-[#DECB54]/20 hover:bg-[#DECB54]/30 border border-[#DECB54] text-[#1B2845] text-xs font-bold px-5 py-2 rounded-full transition-all duration-300 shadow-sm"
          >
            <span>Bed Finder</span>
          </button>

          {/* Shopify Account Link */}
          <a
            href="https://mqrbzt-h4.myshopify.com/account"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-slate-700 hover:text-[#1B2845] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full transition-all"
            title="My Shopify Account"
          >
            <User className="w-4 h-4" />
          </a>

          {/* Compare Drawer Button */}
          <button
            onClick={onOpenCompare}
            className="relative p-2.5 text-slate-700 hover:text-[#1B2845] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full transition-all"
            title="Compare Mattresses"
          >
            <Scale className="w-4 h-4" />
            {compareItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1B2845] text-[#DECB54] font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                {compareItems.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-[#1B2845] hover:bg-[#141E34] text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-md shadow-[#1B2845]/10"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#DECB54]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#DECB54] text-[#1B2845] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">{totalCartValue > 0 ? formatPrice(totalCartValue) : 'Cart'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search mattresses..."
              className="w-full bg-slate-100 border border-slate-200 text-slate-800 text-xs rounded-lg pl-10 pr-4 py-2.5"
            />
          </div>
          <div className="flex flex-col gap-2 text-xs text-slate-700 font-semibold">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-slate-100 text-[#1B2845] font-bold"
            >
              Home Page
            </button>
            <button
              onClick={() => {
                onNavigateShop();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-slate-100 text-[#1B2845] font-bold"
            >
              Full Shop Page (/shop)
            </button>
            <button
              onClick={() => {
                onSelectBrand('Mattress World');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-slate-100 hover:text-[#1B2845]"
            >
              Mattress World (House Brand)
            </button>
            <button
              onClick={() => {
                onSelectBrand('Cloud Nine');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-slate-100 hover:text-[#1B2845]"
            >
              Cloud Nine Range
            </button>
            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#1B2845] font-bold"
            >
              Bed Finder
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
