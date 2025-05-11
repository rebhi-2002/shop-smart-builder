
import { Product } from "@/contexts/CartContext";

// Mock product data - in a real app, this would come from an API
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness goals, receive notifications, and more with this advanced smartwatch.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable, eco-friendly cotton t-shirt available in multiple colors.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
    category: "Clothing"
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Double-insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
    category: "Home & Kitchen"
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast-charging wireless pad compatible with all Qi-enabled devices.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1974&auto=format&fit=crop",
    category: "Electronics"
  },
  {
    id: "7",
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat with carrying strap.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    category: "Fitness"
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug",
    description: "Handmade ceramic mug with artistic design. Microwave and dishwasher safe.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop",
    category: "Home & Kitchen"
  }
];

const categories = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Home & Kitchen",
  "Fitness"
];

export const productService = {
  getProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), 300);
    });
  },
  
  getProductById: (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products.find(product => product.id === id)), 300);
    });
  },
  
  getProductsByCategory: (category: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(
        products.filter(product => product.category === category)
      ), 300);
    });
  },
  
  searchProducts: (query: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(searchResults), 300);
    });
  },
  
  getCategories: (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(categories), 300);
    });
  }
};
