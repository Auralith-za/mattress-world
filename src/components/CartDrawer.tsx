import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, ArrowRight, Check, ExternalLink, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice, SIZE_LABELS } from '../utils/formatters';
import { createShopifyCheckoutUrl } from '../lib/shopify';
import { trackBeginCheckout } from '../lib/analytics';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isRedirectingToShopify, setIsRedirectingToShopify] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = subtotal - discountAmount;

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SLEEP10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'MATTRESS15') {
      setDiscountPercent(15);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "SLEEP10" for 10% off!');
    }
  };

  /**
   * Redirect customer directly to live Shopify Checkout
   * (Processes PayFast, PayFlex, PayJustNow & Credit Cards)
   */
  const handleProceedToShopifyCheckout = async () => {
    setIsRedirectingToShopify(true);
    setCheckoutError(null);

    // Track Analytics
    trackBeginCheckout(grandTotal, cartItems.length);

    try {
      // Map items to Shopify line items
      const shopifyLines = cartItems.map((item) => ({
        variantId: item.product.id.startsWith('gid://')
          ? item.product.id
          : `gid://shopify/Product/${item.product.id}`,
        quantity: item.quantity,
      }));

      const checkoutUrl = await createShopifyCheckoutUrl(shopifyLines);
      
      // Redirect to live Shopify Checkout URL
      window.location.href = checkoutUrl;
    } catch (err: any) {
      console.warn('Redirecting to direct cart checkout URL fallback...', err);
      // Fallback: Redirect to Shopify web cart URL
      const cartPath = cartItems.map((i) => `${i.product.id}:${i.quantity}`).join(',');
      window.location.href = `https://mqrbzt-h4.myshopify.com/cart/${cartPath}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between text-slate-800">
            {/* Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1B2845]" />
                <h3 className="text-base font-bold font-serif text-[#1B2845]">Your Shopping Cart</h3>
                <span className="text-xs text-slate-500 font-bold">({cartItems.length} items)</span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Banner */}
            <div className="bg-[#1B2845] text-[#DECB54] px-4 py-2.5 flex items-center gap-2 text-xs font-bold shadow-inner">
              <Truck className="w-4 h-4 shrink-0 text-[#DECB54]" />
              <span>FREE Express Delivery Included On All Beds!</span>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-bold text-[#1B2845]">Your Cart is Currently Empty</h4>
                  <p className="text-xs text-slate-500">
                    Explore our Mattress World House Brand and Cloud Nine collections to select your bed.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex gap-3 items-center justify-between shadow-sm"
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-14 object-contain rounded-lg bg-white p-1 border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-[#1B2845] truncate">{item.product.name}</h5>
                      <p className="text-[10px] text-[#B89628] font-bold">
                        {SIZE_LABELS[item.size].name} • {item.length === 'extraLength' ? 'Extra XL (200cm)' : 'Standard (188cm)'} •{' '}
                        {item.type === 'mattressOnly' ? 'Mattress Only' : 'Bed Set'}
                      </p>
                      <span className="text-xs font-bold text-slate-800 mt-1 block">{formatPrice(item.price)}</span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center border border-slate-300 rounded-lg text-xs bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-500 hover:text-slate-800 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-[#1B2845] text-[11px]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-500 hover:text-slate-800 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Supported Payment Gateways Badge */}
              {cartItems.length > 0 && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 text-center text-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Supported Payment Options on Shopify Checkout
                  </span>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <img
                      src="/assets/logos/payflex_logo.webp"
                      alt="PayFlex"
                      className="h-4 max-w-[60px] object-contain mix-blend-multiply"
                    />
                    <span className="bg-white border border-slate-200 text-[#1B2845] font-bold px-2 py-0.5 rounded text-[10px]">
                      PayFast
                    </span>
                    <span className="bg-[#DECB54] text-[#1B2845] font-bold px-2 py-0.5 rounded text-[10px]">
                      PayJustNow
                    </span>
                    <span className="bg-white border border-slate-200 text-[#1B2845] font-bold px-2 py-0.5 rounded text-[10px]">
                      Visa / Mastercard
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Shopify Checkout Button */}
            {cartItems.length > 0 && (
              <div className="bg-slate-50 p-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. SLEEP10)"
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 uppercase focus:outline-none focus:border-[#1B2845]"
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl"
                  >
                    Apply
                  </button>
                </div>

                {promoApplied && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between text-[#1B2845] font-serif">
                  <span className="text-xs font-sans text-slate-500 font-bold">Total Due</span>
                  <span className="text-xl font-bold text-[#1B2845]">{formatPrice(grandTotal)}</span>
                </div>

                <button
                  disabled={isRedirectingToShopify}
                  onClick={handleProceedToShopifyCheckout}
                  className="w-full bg-[#1B2845] hover:bg-[#141E34] disabled:bg-slate-400 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {isRedirectingToShopify ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#DECB54] animate-spin" />
                      <span>Redirecting to Shopify Checkout...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed To Secure Shopify Checkout</span>
                      <ArrowRight className="w-4 h-4 text-[#DECB54]" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
