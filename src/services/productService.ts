
import { Product } from '@/contexts/CartContext';

// Mock product database
const products: Product[] = [
  {
    id: '1',
    name: 'Gaming Laptop',
    description: 'High-performance laptop for gaming enthusiasts.',
    price: 1200,
    image: 'https://source.unsplash.com/random/300x300?gaminglaptop',
    category: 'Electronics',
    discount: 10,
    stock: 50,
    rating: 4.5,
    reviews: 25,
    seller: 'TechStore',
    tags: ['gaming', 'laptop', 'high-performance'],
  },
  {
    id: '2',
    name: 'Running Shoes',
    description: 'Comfortable and durable shoes for running.',
    price: 80,
    image: 'https://source.unsplash.com/random/300x300?runningshoes',
    category: 'Fashion',
    discount: 15,
    stock: 100,
    rating: 4.2,
    reviews: 30,
    seller: 'FitLife',
    tags: ['running', 'shoes', 'sports'],
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Automatic coffee maker for home use.',
    price: 50,
    image: 'https://source.unsplash.com/random/300x300?coffeemaker',
    category: 'Home',
    discount: 5,
    stock: 75,
    rating: 4.0,
    reviews: 20,
    seller: 'HomeNeeds',
    tags: ['coffee', 'maker', 'kitchen'],
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Advanced smart watch with fitness tracking.',
    price: 250,
    image: 'https://source.unsplash.com/random/300x300?smartwatch',
    category: 'Electronics',
    discount: 20,
    stock: 40,
    rating: 4.7,
    reviews: 40,
    seller: 'TechStore',
    tags: ['smartwatch', 'fitness', 'wearable'],
  },
  {
    id: '5',
    name: 'Denim Jeans',
    description: 'Classic denim jeans for everyday wear.',
    price: 60,
    image: 'https://source.unsplash.com/random/300x300?denimjeans',
    category: 'Fashion',
    discount: 10,
    stock: 90,
    rating: 4.3,
    reviews: 28,
    seller: 'StyleHub',
    tags: ['denim', 'jeans', 'casual'],
  },
  {
    id: '6',
    name: 'Blender',
    description: 'High-speed blender for smoothies and shakes.',
    price: 70,
    image: 'https://source.unsplash.com/random/300x300?blender',
    category: 'Home',
    discount: 15,
    stock: 60,
    rating: 4.1,
    reviews: 15,
    seller: 'KitchenPro',
    tags: ['blender', 'smoothie', 'kitchen'],
  },
  {
    id: '7',
    name: 'Wireless Headphones',
    description: 'Over-ear wireless headphones with noise cancellation.',
    price: 180,
    image: 'https://source.unsplash.com/random/300x300?wirelessheadphones',
    category: 'Electronics',
    discount: 5,
    stock: 35,
    rating: 4.6,
    reviews: 35,
    seller: 'AudioTech',
    tags: ['headphones', 'wireless', 'audio'],
  },
  {
    id: '8',
    name: 'Summer Dress',
    description: 'Light and airy summer dress for women.',
    price: 45,
    image: 'https://source.unsplash.com/random/300x300?summerdress',
    category: 'Fashion',
    discount: 20,
    stock: 80,
    rating: 4.4,
    reviews: 22,
    seller: 'StyleHub',
    tags: ['dress', 'summer', 'women'],
  },
  {
    id: '9',
    name: 'Toaster Oven',
    description: 'Compact toaster oven for small kitchens.',
    price: 65,
    image: 'https://source.unsplash.com/random/300x300?toasteroven',
    category: 'Home',
    discount: 10,
    stock: 55,
    rating: 3.9,
    reviews: 18,
    seller: 'HomeNeeds',
    tags: ['toaster', 'oven', 'kitchen'],
  },
  {
    id: '10',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with loud sound.',
    price: 90,
    image: 'https://source.unsplash.com/random/300x300?bluetoothspeaker',
    category: 'Electronics',
    discount: 15,
    stock: 45,
    rating: 4.8,
    reviews: 45,
    seller: 'AudioTech',
    tags: ['speaker', 'bluetooth', 'portable'],
  },
];

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    return products;
  },

  // Get a single product by ID
  getProduct: async (id: string): Promise<Product | undefined> => {
    return products.find(product => product.id === id);
  },
  
  // Alias for getProduct to maintain compatibility with existing code
  getProductById: async (id: string): Promise<Product | undefined> => {
    return products.find(product => product.id === id);
  },
  
  // Get product categories
  getCategories: async (): Promise<string[]> => {
    return [...new Set(products.map(product => product.category))];
  },
  
  // Get discounted products
  getDiscountedProducts: async (): Promise<Product[]> => {
    return products.filter(product => product.discount && product.discount > 0);
  },
  
  // Create a new product
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct: Product = {
      id: String(products.length + 1),
      ...product,
    };
    products.push(newProduct);
    return newProduct;
  },

  // Update an existing product
  updateProduct: async (updatedProduct: Product): Promise<Product> => {
    const index = products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      return updatedProduct;
    } else {
      throw new Error(`Product with id ${updatedProduct.id} not found`);
    }
  },

  // Delete a product
  deleteProduct: async (id: string): Promise<void> => {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
    } else {
      throw new Error(`Product with id ${id} not found`);
    }
  },
  
  // Get related products based on category
  getRelatedProducts: async (productId: string): Promise<Product[]> => {
    // Find the current product
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return [];
    }
    
    // Find products in the same category, excluding the current product
    return products
      .filter(p => p.category === product.category && p.id !== productId)
      .slice(0, 4); // Return up to 4 related products
  }
};
