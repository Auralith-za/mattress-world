export const SHOPIFY_CONFIG = {
  // Live Shopify Storefront Domain
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'mqrbzt-h4.myshopify.com',
  
  // Live Storefront API Public Access Token
  storefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'a145b6a6b84b45b8fa8b11c57920f539',
  
  // API Version
  apiVersion: '2024-04',
};

export const isShopifyConfigured = () => {
  return (
    SHOPIFY_CONFIG.storefrontToken !== '' &&
    !SHOPIFY_CONFIG.domain.includes('example')
  );
};
