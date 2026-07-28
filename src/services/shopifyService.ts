import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "shop-smart-builder-z5xqk-hmyqbxgv.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "5ba23758f7b7d67c0ef97601583ad9b4";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          } | null;
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface ShopifyProductEdge {
  node: ShopifyProduct["node"];
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: (
        <span>
          Shopify API access requires an active Shopify billing plan. Visit{" "}
          <a
            href="https://admin.shopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://admin.shopify.com
          </a>{" "}
          to upgrade.
        </span>
      ),
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }

  return data;
}

export async function fetchShopifyProducts(first = 100, query?: string): Promise<ShopifyProductEdge[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query: query || null });
  if (!data) return [];
  return data?.data?.products?.edges || [];
}

export async function fetchShopifyProductByHandle(handle: string): Promise<ShopifyProduct["node"] | null> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 1, query: `handle:${handle}` });
  if (!data) return null;
  const edges: ShopifyProductEdge[] = data?.data?.products?.edges || [];
  return edges[0]?.node || null;
}
