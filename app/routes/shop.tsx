import React, {useState} from 'react';
import {type MetaFunction, useNavigate, useSearchParams} from '@remix-run/react';
import {Navbar} from '~/components/Navbar';
import {MegaMenu} from '~/components/MegaMenu';
import {ShopPage} from '~/components/ShopPage';
import {CompareDrawer} from '~/components/CompareDrawer';
import {CartDrawer} from '~/components/CartDrawer';
import {SleepQuizModal} from '~/components/SleepQuizModal';
import {AiAssistantWidget} from '~/components/AiAssistantWidget';
import {Footer} from '~/components/Footer';
import {PRODUCTS} from '~/data/products';
import {type Product, type CartItem, type BedSize, type BedLength, type ProductType} from '~/types';
import {calculatePrice} from '~/utils/formatters';
import {Scale, ChevronRight, Trash2} from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Shop All Mattresses & Bed Sets | Mattress World'},
    {
      name: 'description',
      content:
        'Browse all Cloud Nine, Rest Assured, and Mattress World mattresses and bed sets. Filter by brand, size, and feel. Free delivery across South Africa.',
    },
  ];
};

export default function Shop() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All',
  );
  const [selectedSizeFilter, setSelectedSizeFilter] = useState(
    searchParams.get('size') || 'All',
  );

  const navigateToShop = (brand?: string, category?: string, size?: BedSize) => {
    if (brand) setSelectedBrand(brand);
    if (category) setSelectedCategory(category);
    if (size) setSelectedSizeFilter(size);
  };

  const handleSelectProduct = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (
    product: Product,
    size: BedSize,
    length: BedLength,
    type: ProductType,
    quantity: number,
  ) => {
    const itemPrice = calculatePrice(product, size, length, type);
    const cartItemId = `${product.id}-${size}-${length}-${type}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, {id: cartItemId, product, size, length, type, quantity, price: itemPrice}];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? {...item, quantity} : item)),
      );
    }
  };

  const handleToggleCompare = (product: Product) => {
    setCompareItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) {
        alert('You can compare up to 4 mattresses at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-800 flex flex-col font-sans relative">
      <Navbar
        cartItems={cartItems}
        compareItems={compareItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectCategory={(cat) => navigateToShop(undefined, cat)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        selectedBrand={selectedBrand}
        onSelectBrand={(b) => navigateToShop(b)}
        onNavigateHome={() => navigate('/')}
        onNavigateShop={() => navigate('/shop')}
      />

      <MegaMenu
        onSelectBrand={(b) => navigateToShop(b)}
        onSelectCategory={(cat) => navigateToShop(undefined, cat)}
        onSelectSize={(sz) => navigateToShop(undefined, undefined, sz)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <ShopPage
        products={PRODUCTS}
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
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCompareItems([])}
              className="p-1 text-slate-300 hover:text-rose-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <SleepQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={PRODUCTS}
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
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
        onClearCart={() => setCartItems([])}
      />

      <AiAssistantWidget products={PRODUCTS} onSelectProduct={handleSelectProduct} />

      <Footer />
    </div>
  );
}
