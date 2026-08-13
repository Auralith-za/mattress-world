/**
 * Google Analytics 4 & Shopify Customer Events Analytics Tracker
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

/**
 * Initialize GA4 tracking script dynamically
 */
export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
  });
}

/**
 * Track Page Views
 */
export function trackPageView(path: string, title?: string) {
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
}

/**
 * Track E-Commerce Add To Cart Event
 */
export function trackAddToCart(item: {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}) {
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', 'add_to_cart', {
      currency: 'ZAR',
      value: item.price * item.quantity,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_brand: item.brand,
          price: item.price,
          quantity: item.quantity,
        },
      ],
    });
  }
}

/**
 * Track Begin Checkout Event
 */
export function trackBeginCheckout(value: number, itemsCount: number) {
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', 'begin_checkout', {
      currency: 'ZAR',
      value,
      num_items: itemsCount,
    });
  }
}
