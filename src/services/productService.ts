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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.5,
    stock: 100,
    discount: 15,
    isNew: false,
    isFeatured: true
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this advanced smartwatch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.2,
    stock: 75,
    discount: 0,
    isNew: true,
    isFeatured: true
  },
  {
    id: "3",
    name: "Designer Handbag",
    description: "Elegant designer handbag with premium materials",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.8,
    stock: 30,
    discount: 0,
    isNew: false,
    isFeatured: true
  },
  {
    id: "4",
    name: "Coffee Maker",
    description: "Premium coffee maker with multiple brewing options",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1522125123931-9304d91a42ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    rating: 4.0,
    stock: 60,
    discount: 10,
    isNew: false,
    isFeatured: false
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Comfortable and durable running shoes for all terrains",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.3,
    stock: 50,
    discount: 0,
    isNew: true,
    isFeatured: false
  },
  {
    id: "6",
    name: "Smartphone",
    description: "Latest model smartphone with advanced camera system",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.7,
    stock: 85,
    discount: 100,
    isNew: true,
    isFeatured: true
  },
  {
    id: "7",
    name: "Kitchen Mixer",
    description: "Professional grade kitchen mixer for all your baking needs",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1659681344894-91c657ef9898?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    rating: 4.9,
    stock: 25,
    discount: 50,
    isNew: false,
    isFeatured: true
  },
  {
    id: "8",
    name: "Fitness Tracker",
    description: "Track steps, heart rate, and sleep with this waterproof fitness band",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.1,
    stock: 120,
    discount: 0,
    isNew: false,
    isFeatured: false
  },
  {
    id: "9",
    name: "Portable Speaker",
    description: "Waterproof portable speaker with 24-hour battery life",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.4,
    stock: 90,
    discount: 0,
    isNew: true,
    isFeatured: false
  },
  {
    id: "10",
    name: "Premium Blender",
    description: "High-speed blender for smoothies and food preparation",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1570222094714-d504fbe46a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    rating: 4.6,
    stock: 40,
    discount: 25,
    isNew: false,
    isFeatured: false
  },
  // Adding products for all categories
  {
    id: "11",
    name: "Luxury Face Cream",
    description: "Premium anti-aging face cream with natural ingredients",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    rating: 4.7,
    stock: 35,
    discount: 0,
    isNew: true,
    isFeatured: true
  },
  {
    id: "12",
    name: "Organic Shampoo",
    description: "Chemical-free shampoo for all hair types",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    rating: 4.3,
    stock: 80,
    discount: 10,
    isNew: false,
    isFeatured: false
  },
  {
    id: "13",
    name: "Premium Makeup Kit",
    description: "Complete makeup kit with brushes and palette",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    rating: 4.8,
    stock: 25,
    discount: 15,
    isNew: true,
    isFeatured: true
  },
  {
    id: "14",
    name: "Best-selling Novel",
    description: "Award-winning fiction novel by renowned author",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1000&q=80",
    category: "Books",
    rating: 4.9,
    stock: 100,
    discount: 0,
    isNew: false,
    isFeatured: true
  },
  {
    id: "15",
    name: "Cookbook Collection",
    description: "Set of gourmet cookbooks featuring international cuisine",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=1000&q=80",
    category: "Books",
    rating: 4.5,
    stock: 40,
    discount: 20,
    isNew: false,
    isFeatured: false
  },
  {
    id: "16",
    name: "Children's Book Set",
    description: "Illustrated children's books for early readers",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
    category: "Books",
    rating: 4.7,
    stock: 60,
    discount: 0,
    isNew: true,
    isFeatured: false
  },
  {
    id: "17",
    name: "Remote Control Car",
    description: "High-speed remote control car with off-road capabilities",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1000&q=80",
    category: "Toys",
    rating: 4.3,
    stock: 45,
    discount: 20,
    isNew: false,
    isFeatured: true
  },
  {
    id: "18",
    name: "Educational Building Blocks",
    description: "Creative building blocks for children's development",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80",
    category: "Toys",
    rating: 4.6,
    stock: 70,
    discount: 0,
    isNew: true,
    isFeatured: false
  },
  {
    id: "19",
    name: "Interactive Robot Toy",
    description: "Programmable robot toy for learning coding basics",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1000&q=80",
    category: "Toys",
    rating: 4.8,
    stock: 30,
    discount: 10,
    isNew: true,
    isFeatured: true
  },
  {
    id: "20",
    name: "Professional Basketball",
    description: "Official size and weight basketball for indoor/outdoor use",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.5,
    stock: 85,
    discount: 0,
    isNew: false,
    isFeatured: false
  },
  {
    id: "21",
    name: "Yoga Mat Set",
    description: "Premium yoga mat with blocks and strap",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.6,
    stock: 50,
    discount: 15,
    isNew: true,
    isFeatured: true
  },
  {
    id: "22",
    name: "Mountain Bike",
    description: "All-terrain mountain bike with 21 speeds",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.7,
    stock: 20,
    discount: 50,
    isNew: false,
    isFeatured: true
  },
  {
    id: "23",
    name: "Car Audio System",
    description: "High-performance car stereo system with Bluetooth",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1632098953531-4f7486abe6f9?auto=format&fit=crop&w=1000&q=80",
    category: "Automotive",
    rating: 4.4,
    stock: 25,
    discount: 0,
    isNew: true,
    isFeatured: false
  },
  {
    id: "24",
    name: "Luxury Car Seat Covers",
    description: "Premium leather seat covers for sedans and SUVs",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1566985724615-a71321aed8be?auto=format&fit=crop&w=1000&q=80",
    category: "Automotive",
    rating: 4.3,
    stock: 40,
    discount: 10,
    isNew: false,
    isFeatured: true
  },
  {
    id: "25",
    name: "Car Dash Camera",
    description: "4K resolution dashboard camera with night vision",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1617470702892-e01504693bd7?auto=format&fit=crop&w=1000&q=80",
    category: "Automotive",
    rating: 4.5,
    stock: 60,
    discount: 15,
    isNew: true,
    isFeatured: false
  }
];

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 500);
    });
  },
  
  getProductById: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === id);
        resolve(product);
      }, 300);
    });
  },
  
  getCategories: async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = [...new Set(mockProducts.map(p => p.category))];
        resolve(categories);
      }, 200);
    });
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = mockProducts.filter(p => p.isFeatured);
        resolve(featured);
      }, 300);
    });
  },
  
  getNewArrivals: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newArrivals = mockProducts.filter(p => p.isNew);
        resolve(newArrivals);
      }, 300);
    });
  },
  
  getRelatedProducts: async (productId: string, limit = 4): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === productId);
        if (!product) {
          resolve([]);
          return;
        }
        
        const related = mockProducts
          .filter(p => p.id !== productId && p.category === product.category)
          .slice(0, limit);
          
        resolve(related);
      }, 300);
    });
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockProducts.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) || 
          p.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockProducts.filter(p => p.category === category);
        resolve(results);
      }, 300);
    });
  },
  
  getDiscountedProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const discounted = mockProducts.filter(p => p.discount && p.discount > 0);
        resolve(discounted);
      }, 300);
    });
  },
  
  deleteProduct: async (productId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would actually delete from the database
        // For now we'll just pretend it succeeded
        resolve(true);
      }, 300);
    });
  },
  
  updateProduct: async (product: Product): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would actually update the database
        resolve(product);
      }, 300);
    });
  },
  
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would actually insert into the database
        // For now we'll just pretend and assign a random ID
        const newProduct = {
          ...product,
          id: Math.random().toString(36).substring(2, 11) // Generate random ID
        };
        resolve(newProduct as Product);
      }, 300);
    });
  }
};
