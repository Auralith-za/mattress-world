import { SHOPIFY_CONFIG } from '../config/shopify';
import { Product, BedSize } from '../types';

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

/**
 * Execute a GraphQL query against Shopify Storefront API
 */
export async function shopifyQuery<T = any>(query: string, variables = {}): Promise<T> {
  if (!SHOPIFY_CONFIG.storefrontToken) {
    throw new Error('Shopify Storefront Token is missing. Please add VITE_SHOPIFY_STOREFRONT_TOKEN in .env');
  }

  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify GraphQL Errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify API Error');
  }

  return json.data;
}

/**
 * GraphQL Query to fetch products from Shopify
 */
const PRODUCTS_QUERY = `
  query GetProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          vendor
          productType
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          metafields(identifiers: [
            {namespace: "custom", key: "weight_limit_kg"},
            {namespace: "custom", key: "firmness_rating"},
            {namespace: "custom", key: "feel"},
            {namespace: "custom", key: "guarantee_years"},
            {namespace: "custom", key: "warranty_years"},
            {namespace: "custom", key: "is_turnable"}
          ]) {
            key
            value
          }
        }
      }
    }
  }
`;

/**
 * Fetch products from live Shopify Store
 */
export async function getShopifyProducts(): Promise<Product[]> {
  try {
    const data = await shopifyQuery(PRODUCTS_QUERY);
    const shopifyProducts = data.products.edges;

    return shopifyProducts.map((edge: any) => {
      const node = edge.node;
      const metafieldsMap: Record<string, string> = {};
      
      (node.metafields || []).forEach((mf: any) => {
        if (mf) metafieldsMap[mf.key] = mf.value;
      });

      const basePrice = parseFloat(node.priceRange.minVariantPrice.amount);

      return {
        id: node.handle || node.id,
        name: node.title,
        brand: node.vendor?.toLowerCase().includes('cloud') ? 'Cloud Nine' : 'Mattress World',
        category: 'Orthopedic',
        range: 'Hospitality & Orthopedic',
        description: node.description || 'Premium South African sleep system.',
        image: node.featuredImage?.url || '/assets/hero_family_bed.jpg',
        brandLogo: node.vendor?.toLowerCase().includes('cloud')
          ? '/assets/logos/cloud_nine_logo.png'
          : '/assets/logos/mattress_world_logo.png',
        availableSizes: ['single', 'threeQuarter', 'double', 'queen', 'king'] as BedSize[],
        supportsExtraLength: true,
        supportsMattressOnly: true,
        weightLimitKg: parseInt(metafieldsMap.weight_limit_kg || '130', 10),
        feel: (metafieldsMap.feel as any) || 'Medium Firm',
        firmnessRating: parseInt(metafieldsMap.firmness_rating || '8', 10),
        technology: 'Heavy Duty Posture Core',
        isTurnable: metafieldsMap.is_turnable === 'true',
        guaranteeYears: parseInt(metafieldsMap.guarantee_years || '2', 10),
        warrantyYears: parseInt(metafieldsMap.warranty_years || '15', 10),
        prices: {
          set: {
            single: basePrice,
            threeQuarter: Math.round(basePrice * 1.15),
            double: Math.round(basePrice * 1.35),
            queen: Math.round(basePrice * 1.5),
            king: Math.round(basePrice * 1.85),
          },
          mattressOnly: {
            single: Math.round(basePrice * 0.75),
            threeQuarter: Math.round(basePrice * 0.85),
            double: Math.round(basePrice * 1.0),
            queen: Math.round(basePrice * 1.15),
            king: Math.round(basePrice * 1.45),
          },
        },
        features: [
          'Chiropractor Approved Design',
          'Heavy Duty Core Foam',
          'Zero Motion Transfer',
        ],
      } as Product;
    });
  } catch (err) {
    console.warn('Could not fetch products from Shopify. Ensure Storefront API Token is configured.', err);
    return [];
  }
}

/**
 * Create Shopify Live Cart & Generate Checkout URL
 */
const CREATE_CART_MUTATION = `
  mutation createCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createShopifyCheckoutUrl(
  items: Array<{ variantId: string; quantity: number }>
): Promise<string> {
  const lines = items.map((item) => ({
    merchandiseId: item.variantId,
    quantity: item.quantity,
  }));

  const data = await shopifyQuery(CREATE_CART_MUTATION, { lines });

  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart.checkoutUrl;
}
