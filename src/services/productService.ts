import { Product } from '@/contexts/CartContext';

// Mock function to simulate fetching products from an API
const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and long battery life.',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      category: 'Electronics',
      rating: 4.5,
      reviews: 120,
      stock: 50,
      seller: 'AudioTech',
      discount: 10,
      tags: ['wireless', 'audio', 'headphones']
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Advanced smartwatch with fitness tracking, notifications, and app support.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf0c',
      category: 'Electronics',
      rating: 4.2,
      reviews: 95,
      stock: 30,
      seller: 'TechGear',
      discount: 5,
      tags: ['smartwatch', 'wearable', 'fitness']
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable and eco-friendly t-shirt made from 100% organic cotton.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
      category: 'Fashion',
      rating: 4.0,
      reviews: 68,
      stock: 100,
      seller: 'EcoThreads',
      discount: 15,
      tags: ['organic', 'cotton', 't-shirt']
    },
    {
      id: '4',
      name: 'Leather Wallet',
      description: 'Genuine leather wallet with multiple card slots and a sleek design.',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
      category: 'Fashion',
      rating: 4.3,
      reviews: 75,
      stock: 40,
      seller: 'LuxuryLeathers',
      discount: 20,
      tags: ['leather', 'wallet', 'accessories']
    },
    {
      id: '5',
      name: 'Stainless Steel Water Bottle',
      description: 'Reusable water bottle made from high-quality stainless steel.',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1549097185-320bbca27645',
      category: 'Home',
      rating: 4.6,
      reviews: 110,
      stock: 60,
      seller: 'AquaPure',
      discount: 0,
      tags: ['stainless steel', 'water bottle', 'eco-friendly']
    },
    {
      id: '6',
      name: 'Ergonomic Office Chair',
      description: 'Ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1560525794-8884c2550f14',
      category: 'Home',
      rating: 4.7,
      reviews: 135,
      stock: 25,
      seller: 'ComfortPlus',
      discount: 25,
      tags: ['ergonomic', 'office chair', 'furniture']
    },
    {
      id: '7',
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat for comfortable and effective workouts.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1581579151994-14044a995a36',
      category: 'Sports',
      rating: 4.4,
      reviews: 88,
      stock: 55,
      seller: 'FitLife',
      discount: 0,
      tags: ['yoga', 'mat', 'fitness']
    },
    {
      id: '8',
      name: 'Ceramic Coffee Mug',
      description: 'Stylish ceramic coffee mug with a comfortable handle and a glossy finish.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8',
      category: 'Home',
      rating: 4.1,
      reviews: 72,
      stock: 80,
      seller: 'ClayCraft',
      discount: 10,
      tags: ['ceramic', 'coffee mug', 'kitchen']
    }
  ];
};

// Mock function to simulate fetching categories from an API
const fetchCategories = async (): Promise<string[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return ['Electronics', 'Fashion', 'Home', 'Sports'];
};

// Mock function to simulate searching products from an API
const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const allProducts = await fetchProducts();
  
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
};

// Mock function to simulate fetching discounted products from an API
const fetchDiscountedProducts = async (): Promise<Product[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const allProducts = await fetchProducts();
  
  return allProducts.filter(product => product.discount && product.discount > 0);
};

// Mock database
let products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    rating: 4.5,
    reviews: 120,
    stock: 50,
    seller: 'AudioTech',
    discount: 10,
    tags: ['wireless', 'audio', 'headphones']
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Advanced smartwatch with fitness tracking, notifications, and app support.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf0c',
    category: 'Electronics',
    rating: 4.2,
    reviews: 95,
    stock: 30,
    seller: 'TechGear',
    discount: 5,
    tags: ['smartwatch', 'wearable', 'fitness']
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly t-shirt made from 100% organic cotton.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
    category: 'Fashion',
    rating: 4.0,
    reviews: 68,
    stock: 100,
    seller: 'EcoThreads',
    discount: 15,
    tags: ['organic', 'cotton', 't-shirt']
  },
  {
    id: '4',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots and a sleek design.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
    category: 'Fashion',
    rating: 4.3,
    reviews: 75,
    stock: 40,
    seller: 'LuxuryLeathers',
    discount: 20,
    tags: ['leather', 'wallet', 'accessories']
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    description: 'Reusable water bottle made from high-quality stainless steel.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1549097185-320bbca27645',
    category: 'Home',
    rating: 4.6,
    reviews: 110,
    stock: 60,
    seller: 'AquaPure',
    discount: 0,
    tags: ['stainless steel', 'water bottle', 'eco-friendly']
  },
  {
    id: '6',
    name: 'Ergonomic Office Chair',
    description: 'Ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1560525794-8884c2550f14',
    category: 'Home',
    rating: 4.7,
    reviews: 135,
    stock: 25,
    seller: 'ComfortPlus',
    discount: 25,
    tags: ['ergonomic', 'office chair', 'furniture']
  },
  {
    id: '7',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for comfortable and effective workouts.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1581579151994-14044a995a36',
    category: 'Sports',
    rating: 4.4,
    reviews: 88,
    stock: 55,
    seller: 'FitLife',
    discount: 0,
    tags: ['yoga', 'mat', 'fitness']
  },
  {
    id: '8',
    name: 'Ceramic Coffee Mug',
    description: 'Stylish ceramic coffee mug with a comfortable handle and a glossy finish.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8',
    category: 'Home',
    rating: 4.1,
    reviews: 72,
    stock: 80,
    seller: 'ClayCraft',
    discount: 10,
    tags: ['ceramic', 'coffee mug', 'kitchen']
  }
];

// Replace with your actual service implementation
export const productService = {
  getProducts: async (): Promise<Product[]> => {
    return fetchProducts();
  },
  
  getProductById: async (id: string): Promise<Product | undefined> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allProducts = await fetchProducts();
    return allProducts.find(product => product.id === id);
  },
  
  getCategories: async (): Promise<string[]> => {
    return fetchCategories();
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    return searchProducts(query);
  },
  
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const allProducts = await fetchProducts();
    return allProducts.filter(product => product.category === category);
  },
  
  getDiscountedProducts: async (): Promise<Product[]> => {
    return fetchDiscountedProducts();
  },

  // Admin functions for managing products
  createProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substring(2, 11), // Generate random ID
    };
    
    products.unshift(newProduct);
    return newProduct;
  },
  
  updateProduct: async (product: Product): Promise<Product> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = { ...product };
      return products[index];
    }
    
    throw new Error('Product not found');
  },
  
  deleteProduct: async (productId: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = products.findIndex(p => p.id === productId);
    if (index >= 0) {
      products.splice(index, 1);
      return;
    }
    
    throw new Error('Product not found');
  }
};
