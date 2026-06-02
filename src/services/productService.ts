import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock?: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  reviews?: number;
  seller?: string;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  additionalImages?: string[];
  longDescription?: string;
  specifications?: Record<string, string | number>;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop";

type DBProduct = {
  id: string;
  name: string;
  description: string | null;
  long_description: string | null;
  price: number;
  compare_at_price: number | null;
  images: unknown;
  stock: number;
  is_new: boolean;
  is_featured: boolean;
  rating: number | null;
  review_count: number;
  tags: string[] | null;
  sizes: unknown;
  colors: unknown;
  specs: unknown;
  category_id: string | null;
  categories?: { name: string } | null;
};

function toArray<T = string>(v: unknown): T[] {
  if (Array.isArray(v)) return v as T[];
  return [];
}

function mapProduct(p: DBProduct): Product {
  const images = toArray<string>(p.images);
  const compareAt = p.compare_at_price ? Number(p.compare_at_price) : null;
  const price = Number(p.price);
  const discount =
    compareAt && compareAt > price
      ? Math.round(((compareAt - price) / compareAt) * 100)
      : 0;
  return {
    id: p.id,
    name: p.name,
    description: p.description || "",
    longDescription: p.long_description || undefined,
    price,
    image: images[0] || FALLBACK_IMAGE,
    additionalImages: images.slice(1),
    category: p.categories?.name || "Uncategorized",
    rating: p.rating ? Number(p.rating) : 0,
    reviews: p.review_count,
    stock: p.stock,
    discount,
    isNew: p.is_new,
    isFeatured: p.is_featured,
    tags: p.tags || [],
    sizes: toArray<string>(p.sizes),
    colors: toArray<string>(p.colors),
    specifications: (p.specs as Record<string, string | number>) || {},
  };
}

const SELECT = "*, categories(name)";

async function fetchProducts(filter?: (q: any) => any): Promise<Product[]> {
  let query = supabase.from("products").select(SELECT).eq("is_active", true);
  if (filter) query = filter(query);
  const { data, error } = await query;
  if (error) {
    console.error("productService error:", error);
    return [];
  }
  return (data as DBProduct[]).map(mapProduct);
}

export const productService = {
  getProducts: () => fetchProducts(),

  getProductById: async (id: string): Promise<Product | undefined> => {
    const { data, error } = await supabase
      .from("products")
      .select(SELECT)
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return undefined;
    return mapProduct(data as DBProduct);
  },

  getCategories: async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from("categories")
      .select("name")
      .order("display_order");
    if (error || !data) return [];
    return data.map((c: { name: string }) => c.name);
  },

  getFeaturedProducts: () => fetchProducts((q) => q.eq("is_featured", true)),
  getNewArrivals: () => fetchProducts((q) => q.eq("is_new", true)),

  getRelatedProducts: async (productId: string, limit = 4): Promise<Product[]> => {
    const current = await productService.getProductById(productId);
    if (!current) return [];
    const all = await fetchProducts();
    return all
      .filter((p) => p.id !== productId && p.category === current.category)
      .slice(0, limit);
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select(SELECT)
      .eq("is_active", true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    if (error || !data) return [];
    return (data as DBProduct[]).map(mapProduct);
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("name", category)
      .maybeSingle();
    if (!cat) return [];
    return fetchProducts((q) => q.eq("category_id", cat.id));
  },

  getDiscountedProducts: async (): Promise<Product[]> => {
    const all = await fetchProducts();
    return all.filter((p) => (p.discount ?? 0) > 0);
  },

  deleteProduct: async (productId: string): Promise<boolean> => {
    const { error } = await supabase.from("products").delete().eq("id", productId);
    return !error;
  },

  updateProduct: async (product: Product): Promise<Product> => {
    const { error } = await supabase
      .from("products")
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock ?? 0,
        is_featured: !!product.isFeatured,
        is_new: !!product.isNew,
      })
      .eq("id", product.id);
    if (error) throw error;
    return product;
  },

  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: product.name,
        slug: `${slug}-${Date.now()}`,
        description: product.description,
        price: product.price,
        stock: product.stock ?? 0,
        images: product.image ? [product.image] : [],
        is_featured: !!product.isFeatured,
        is_new: !!product.isNew,
      })
      .select(SELECT)
      .single();
    if (error) throw error;
    return mapProduct(data as DBProduct);
  },
};
