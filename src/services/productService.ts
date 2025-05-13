
import { Product } from '@/contexts/CartContext';

// Mock product database
const products: Product[] = [
  {
    id: '1',
    name: 'Gaming Laptop',
    description: 'High-performance laptop for gaming enthusiasts.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1500',
    category: 'Electronics',
    discount: 10,
    stock: 50,
    rating: 4.5,
    reviews: 25,
    seller: 'TechStore',
    tags: ['gaming', 'laptop', 'high-performance'],
    specs: {
      'Processor': 'Intel i9-12900K',
      'Graphics': 'NVIDIA RTX 3080',
      'RAM': '32GB DDR5',
      'Storage': '1TB NVMe SSD',
      'Display': '17.3" 4K 144Hz',
      'Battery': '8 hours',
      'Weight': '2.4kg'
    }
  },
  {
    id: '2',
    name: 'Running Shoes',
    description: 'Comfortable and durable shoes for running.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1500',
    category: 'Fashion',
    discount: 15,
    stock: 100,
    rating: 4.2,
    reviews: 30,
    seller: 'FitLife',
    tags: ['running', 'shoes', 'sports'],
    specs: {
      'Material': 'Breathable mesh, synthetic',
      'Sole': 'Rubber with cushioning',
      'Weight': '280g',
      'Closure': 'Lace-up',
      'Features': 'Shock absorption, arch support'
    }
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Automatic coffee maker for home use.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1500',
    category: 'Home',
    discount: 5,
    stock: 75,
    rating: 4.0,
    reviews: 20,
    seller: 'HomeNeeds',
    tags: ['coffee', 'maker', 'kitchen'],
    specs: {
      'Capacity': '12 cups',
      'Functions': 'Brew strength control, timer',
      'Material': 'Stainless steel, glass',
      'Power': '1000W',
      'Dimensions': '25cm x 18cm x 35cm'
    }
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Advanced smart watch with fitness tracking.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1500',
    category: 'Electronics',
    discount: 20,
    stock: 40,
    rating: 4.7,
    reviews: 40,
    seller: 'TechStore',
    tags: ['smartwatch', 'fitness', 'wearable'],
    specs: {
      'Display': '1.4" AMOLED',
      'Battery': '48 hours',
      'Sensors': 'Heart rate, GPS, Accelerometer',
      'Water Resistance': '50m',
      'Compatibility': 'iOS, Android'
    }
  },
  {
    id: '5',
    name: 'Denim Jeans',
    description: 'Classic denim jeans for everyday wear.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1500',
    category: 'Fashion',
    discount: 10,
    stock: 90,
    rating: 4.3,
    reviews: 28,
    seller: 'StyleHub',
    tags: ['denim', 'jeans', 'casual'],
    specs: {
      'Material': '98% Cotton, 2% Elastane',
      'Style': 'Straight leg',
      'Rise': 'Mid-rise',
      'Closure': 'Button and zipper fly',
      'Care': 'Machine wash cold'
    }
  },
  {
    id: '6',
    name: 'Blender',
    description: 'High-speed blender for smoothies and shakes.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=1500',
    category: 'Home',
    discount: 15,
    stock: 60,
    rating: 4.1,
    reviews: 15,
    seller: 'KitchenPro',
    tags: ['blender', 'smoothie', 'kitchen'],
    specs: {
      'Power': '800W',
      'Speed Settings': '5 + Pulse',
      'Capacity': '1.5L',
      'Blades': 'Stainless steel',
      'Functions': 'Blend, crush, puree'
    }
  },
  {
    id: '7',
    name: 'Wireless Headphones',
    description: 'Over-ear wireless headphones with noise cancellation.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1500',
    category: 'Electronics',
    discount: 5,
    stock: 35,
    rating: 4.6,
    reviews: 35,
    seller: 'AudioTech',
    tags: ['headphones', 'wireless', 'audio'],
    specs: {
      'Type': 'Over-ear, Closed-back',
      'Connectivity': 'Bluetooth 5.0, 3.5mm',
      'Battery Life': 'Up to 30 hours',
      'Features': 'Active Noise Cancellation',
      'Microphone': 'Integrated'
    }
  },
  {
    id: '8',
    name: 'Summer Dress',
    description: 'Light and airy summer dress for women.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1500',
    category: 'Fashion',
    discount: 20,
    stock: 80,
    rating: 4.4,
    reviews: 22,
    seller: 'StyleHub',
    tags: ['dress', 'summer', 'women'],
    specs: {
      'Material': '100% Cotton',
      'Length': 'Knee-length',
      'Style': 'A-line',
      'Closure': 'Back zip',
      'Care': 'Machine wash cold'
    }
  },
  {
    id: '9',
    name: 'Toaster Oven',
    description: 'Compact toaster oven for small kitchens.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?q=80&w=1500',
    category: 'Home',
    discount: 10,
    stock: 55,
    rating: 3.9,
    reviews: 18,
    seller: 'HomeNeeds',
    tags: ['toaster', 'oven', 'kitchen'],
    specs: {
      'Capacity': '12L',
      'Power': '1200W',
      'Functions': 'Toast, bake, broil',
      'Timer': '30 minutes',
      'Dimensions': '40cm x 30cm x 25cm'
    }
  },
  {
    id: '10',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with loud sound.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1500',
    category: 'Electronics',
    discount: 15,
    stock: 45,
    rating: 4.8,
    reviews: 45,
    seller: 'AudioTech',
    tags: ['speaker', 'bluetooth', 'portable'],
    specs: {
      'Power': '20W',
      'Battery Life': '12 hours',
      'Connectivity': 'Bluetooth 5.0, Aux',
      'Water Resistance': 'IPX7',
      'Features': 'Built-in mic, voice assistant'
    }
  },
  {
    id: '11',
    name: 'Digital Camera',
    description: 'Professional digital camera with 4K video recording.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1500',
    category: 'Electronics',
    discount: 12,
    stock: 20,
    rating: 4.9,
    reviews: 38,
    seller: 'PhotoTech',
    tags: ['camera', 'photography', '4k'],
    specs: {
      'Sensor': '24.2MP APS-C CMOS',
      'ISO Range': '100-25600',
      'Video': '4K UHD',
      'Lens Mount': 'Standard',
      'Stabilization': '5-axis'
    }
  },
  {
    id: '12',
    name: 'Leather Backpack',
    description: 'Stylish leather backpack for everyday use.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1500',
    category: 'Fashion',
    discount: 8,
    stock: 60,
    rating: 4.3,
    reviews: 27,
    seller: 'BagWorld',
    tags: ['backpack', 'leather', 'accessories'],
    specs: {
      'Material': 'Genuine leather',
      'Capacity': '18L',
      'Compartments': 'Laptop sleeve, 3 pockets',
      'Dimensions': '30cm x 45cm x 15cm',
      'Features': 'Water resistant, padded straps'
    }
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
