/// <reference types="@shopify/oxygen-workers-types" />

declare global {
  interface Env {
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PUBLIC_STOREFRONT_API_VERSION?: string;
    PRIVATE_STOREFRONT_API_TOKEN?: string;
  }
}
