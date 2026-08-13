import React, {useState} from 'react';
import {type MetaFunction, useParams, useNavigate} from '@remix-run/react';
import {Navbar} from '~/components/Navbar';
import {MegaMenu} from '~/components/MegaMenu';
import {ProductDetailPage} from '~/components/ProductDetailPage';
import {CartDrawer} from '~/components/CartDrawer';
import {CompareDrawer} from '~/components/CompareDrawer';
import {SleepQuizModal} from '~/components/SleepQuizModal';
import {AiAssistantWidget} from '~/components/AiAssistantWidget';
import {Footer} from '~/components/Footer';
import {PRODUCTS} from '~/data/products';
import {type Product, type CartItem, type BedSize, type BedLength, type ProductType} from '~/types';
import {calculatePrice} from '~/utils/formatters';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const product = data?.product;
  if (!product) {
    return [{title: 'Product Not Found | Mattress World'}];
  }
  return [
    {title: `${product.name} | Mattress World`},
    {name: 'description', content: product.description},
  ];
};

export function loader({params}: {params: {id: string}}) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) {
    throw new Response('Not Found', {status: 404});
  }
  return {product};
}

export default function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === params.id);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1B2845] mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#1B2845] text-white px-6 py-3 rounded-xl font-bold"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (
    prod: Product,
    size: BedSize,
    length: BedLength,
    type: ProductType,
    quantity: number,
  ) => {
    const itemPrice = calculatePrice(prod, size, length, type);
    const cartItemId = `${prod.id}-${size}-${length}-${type}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, {id: cartItemId, product: prod, size, length, type, quantity, price: itemPrice}];
    });
    setIsCartOpen(true);
  };

  const handleToggleCompare = (prod: Product) => {
    setCompareItems((prev) => {
      const exists = prev.some((p) => p.id === prod.id);
      if (exists) return prev.filter((p) => p.id !== prod.id);
      if (prev.length >= 4) return prev;
      return [...prev, prod];
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
        onSelectCategory={(cat) => navigate(`/shop?category=${cat}`)}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) navigate('/shop');
        }}
        searchQuery={searchQuery}
        selectedBrand={selectedBrand}
        onSelectBrand={(b) => navigate(`/shop?brand=${b}`)}
        onNavigateHome={() => navigate('/')}
        onNavigateShop={() => navigate('/shop')}
      />

      <MegaMenu
        onSelectBrand={(b) => navigate(`/shop?brand=${b}`)}
        onSelectCategory={(cat) => navigate(`/shop?category=${cat}`)}
        onSelectSize={(sz) => navigate(`/shop?size=${sz}`)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <ProductDetailPage
        product={product}
        allProducts={PRODUCTS}
        onBack={() => navigate('/shop')}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => navigate(`/products/${p.id}`)}
        compareItems={compareItems}
        onToggleCompare={handleToggleCompare}
      />

      <SleepQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => navigate(`/products/${p.id}`)}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareItems={compareItems}
        onRemoveCompare={(id) => setCompareItems((prev) => prev.filter((p) => p.id !== id))}
        onClearCompare={() => setCompareItems([])}
        onSelectProduct={(p) => navigate(`/products/${p.id}`)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, qty) => {
          if (qty <= 0) {
            setCartItems((prev) => prev.filter((item) => item.id !== id));
          } else {
            setCartItems((prev) =>
              prev.map((item) => (item.id === id ? {...item, quantity: qty} : item)),
            );
          }
        }}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((item) => item.id !== id))}
        onClearCart={() => setCartItems([])}
      />

      <AiAssistantWidget products={PRODUCTS} onSelectProduct={(p) => navigate(`/products/${p.id}`)} />

      <Footer />
    </div>
  );
}
