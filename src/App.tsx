import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MegaMenu } from './components/MegaMenu';
import { Hero } from './components/Hero';
import { HomeConfigurator } from './components/HomeConfigurator';
import { MattressExplainer } from './components/MattressExplainer';
import { SleepQuizModal } from './components/SleepQuizModal';
import { AiAssistantWidget } from './components/AiAssistantWidget';
import { ProductCard } from './components/ProductCard';
import { CompareDrawer } from './components/CompareDrawer';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';

import { PRODUCTS } from './data/products';
import { Product, CartItem, BedSize, BedLength, ProductType } from './types';
import { calculatePrice } from './utils/formatters';
import { Filter, RefreshCcw, Scale, Trash2, ChevronRight } from 'lucide-react';

export function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  // Page Routing State
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'productDetail'>('home');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Filtering States
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [selectedFeel, setSelectedFeel] = useState<string>('All');
  const [selectedWeight, setSelectedWeight] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // URL Hash Sync for Clean Path Routing (#/, #/shop, #/product/id)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/product/')) {
        const productId = hash.replace('#/product/', '');
        const prod = products.find((p) => p.id === productId);
        if (prod) {
          setSelectedProductForDetail(prod);
          setCurrentPage('productDetail');
        } else {
          setCurrentPage('shop');
        }
      } else if (hash.startsWith('#/shop')) {
        setCurrentPage('shop');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [products]);

  // Navigation Handlers
  const navigateToHome = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (brand?: string, category?: string, size?: BedSize) => {
    if (brand) setSelectedBrand(brand);
    if (category) setSelectedCategory(category);
    if (size) setSelectedSizeFilter(size);
    window.location.hash = '#/shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductForDetail(product);
    window.location.hash = `#/product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Brand filter
      if (selectedBrand !== 'All') {
        if (selectedBrand === 'Mattress World' && p.brand !== 'Mattress World') return false;
        if (selectedBrand === 'Cloud Nine' && p.brand !== 'Cloud Nine') return false;
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
  }, [products, selectedBrand, selectedCategory, selectedSizeFilter, selectedFeel, selectedWeight, searchQuery]);

  // Cart Actions
  const handleAddToCart = (
    product: Product,
    size: BedSize,
    length: BedLength,
    type: ProductType,
    quantity: number
  ) => {
    const itemPrice = calculatePrice(product, size, length, type);
    const cartItemId = `${product.id}-${size}-${length}-${type}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            size,
            length,
            type,
            quantity,
            price: itemPrice,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Compare Actions
  const handleToggleCompare = (product: Product) => {
    setCompareItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 mattresses at a time.');
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const resetAllFilters = () => {
    setSelectedBrand('All');
    setSelectedCategory('All');
    setSelectedSizeFilter('All');
    setSelectedFeel('All');
    setSelectedWeight('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-800 flex flex-col font-sans relative">
      {/* Header & Navbar */}
      <Navbar
        cartItems={cartItems}
        compareItems={compareItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectCategory={(cat) => navigateToShop(undefined, cat)}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) navigateToShop();
        }}
        searchQuery={searchQuery}
        selectedBrand={selectedBrand}
        onSelectBrand={(b) => navigateToShop(b)}
        onNavigateHome={navigateToHome}
        onNavigateShop={() => navigateToShop()}
      />

      {/* Mega Menu */}
      <MegaMenu
        onSelectBrand={(b) => navigateToShop(b)}
        onSelectCategory={(cat) => navigateToShop(undefined, cat)}
        onSelectSize={(sz) => navigateToShop(undefined, undefined, sz)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Page Routing Views */}
      {currentPage === 'productDetail' && selectedProductForDetail ? (
        <ProductDetailPage
          product={selectedProductForDetail}
          allProducts={products}
          onBack={() => navigateToShop()}
          onAddToCart={handleAddToCart}
          onSelectProduct={handleSelectProduct}
          compareItems={compareItems}
          onToggleCompare={handleToggleCompare}
        />
      ) : currentPage === 'shop' ? (
        <ShopPage
          products={products}
          compareItems={compareItems}
          onToggleCompare={handleToggleCompare}
          onSelectProduct={handleSelectProduct}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSizeFilter={selectedSizeFilter}
          setSelectedSizeFilter={setSelectedSizeFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      ) : (
        /* Home Page View */
        <>
          {/* Hero Section */}
          <Hero
            onOpenQuiz={() => setIsQuizOpen(true)}
            onSelectBrand={(b) => navigateToShop(b)}
            onSelectCategory={(cat) => navigateToShop(undefined, cat)}
            onSelectSize={(sz) => navigateToShop(undefined, undefined, sz)}
          />

          {/* Home Configurator (Direct Express Checkout on Home Page) */}
          <HomeConfigurator
            products={products}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />

          {/* Home Catalog Feature */}
          <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-10">
              <div>
                <span className="text-[10px] text-[#B89628] font-bold uppercase tracking-widest block">
                  Featured Bed Sets & Mattresses
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2845]">
                  South Africa's Top Rated Collection
                </h2>
              </div>
              <button
                onClick={() => navigateToShop()}
                className="bg-[#1B2845] hover:bg-[#141E34] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow flex items-center gap-1"
              >
                <span>View All In Shop</span>
                <ChevronRight className="w-4 h-4 text-[#DECB54]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isCompared={compareItems.some((c) => c.id === prod.id)}
                  onToggleCompare={handleToggleCompare}
                  onSelectProduct={handleSelectProduct}
                />
              ))}
            </div>
          </section>

          {/* Mattress Explainer */}
          <MattressExplainer />
        </>
      )}

      {/* Sticky Bottom Compare Bar */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1B2845] text-white px-5 py-3 rounded-full shadow-2xl border border-[#DECB54] flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#DECB54]" />
            <span className="font-bold">{compareItems.length} Beds Selected To Compare</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="bg-[#DECB54] hover:bg-yellow-400 text-[#1B2845] font-extrabold px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1 shadow"
            >
              <span>Compare Side-by-Side</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#1B2845]" />
            </button>
            <button
              onClick={() => setCompareItems([])}
              className="p-1 text-slate-300 hover:text-rose-400"
              title="Clear Comparison"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals & Drawers */}
      <SleepQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareItems={compareItems}
        onRemoveCompare={(id) => setCompareItems((prev) => prev.filter((p) => p.id !== id))}
        onClearCompare={() => setCompareItems([])}
        onSelectProduct={handleSelectProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      {/* Sleep Assistant Widget */}
      <AiAssistantWidget
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
