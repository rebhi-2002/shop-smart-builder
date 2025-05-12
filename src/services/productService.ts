
import { Product } from "@/contexts/CartContext";

// Expanded product data - more like major e-commerce platforms
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 128,
    stock: 50,
    seller: "AudioTech",
    discount: 10,
    tags: ["wireless", "headphones", "audio", "bluetooth"],
    specs: {
      "Brand": "AudioTech",
      "Connectivity": "Bluetooth 5.0",
      "Battery Life": "30 hours",
      "Noise Cancellation": "Yes",
      "Color Options": "Black, Silver, Blue"
    }
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness goals, receive notifications, and more with this advanced smartwatch.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviews: 96,
    stock: 35,
    seller: "TechWear",
    discount: 5,
    tags: ["smartwatch", "wearable", "fitness", "tech"],
    specs: {
      "Brand": "TechWear",
      "Display": "1.4 inch AMOLED",
      "Water Resistance": "5 ATM",
      "Battery Life": "7 days",
      "Sensors": "Heart rate, GPS, Accelerometer"
    }
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable, eco-friendly cotton t-shirt available in multiple colors.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
    category: "Clothing",
    rating: 4.3,
    reviews: 215,
    stock: 150,
    seller: "EcoApparel",
    discount: 0,
    tags: ["tshirt", "cotton", "organic", "clothing"],
    specs: {
      "Material": "100% Organic Cotton",
      "Sizes": "S, M, L, XL, XXL",
      "Colors": "White, Black, Gray, Blue, Green",
      "Care": "Machine wash cold",
      "Origin": "Ethically manufactured"
    }
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop",
    category: "Accessories",
    rating: 4.8,
    reviews: 67,
    stock: 25,
    seller: "LeatherCraft",
    discount: 0,
    tags: ["wallet", "leather", "accessory", "rfid"],
    specs: {
      "Material": "Genuine Leather",
      "RFID Blocking": "Yes",
      "Card Slots": "8",
      "Dimensions": "4.5 x 3.5 inches",
      "Colors": "Brown, Black, Tan"
    }
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Double-insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
    category: "Home & Kitchen",
    rating: 4.6,
    reviews: 124,
    stock: 80,
    seller: "EcoVessel",
    discount: 15,
    tags: ["water bottle", "insulated", "stainless steel", "eco-friendly"],
    specs: {
      "Material": "18/8 Stainless Steel",
      "Capacity": "24 oz",
      "Insulation": "Double-wall vacuum",
      "Lid Type": "Screw top with carry handle",
      "Colors": "Silver, Black, Blue, Green, Red"
    }
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast-charging wireless pad compatible with all Qi-enabled devices.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1974&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 82,
    stock: 65,
    seller: "PowerTech",
    discount: 0,
    tags: ["charger", "wireless", "qi", "phone accessory"],
    specs: {
      "Input": "USB-C, 9V/2A",
      "Output": "10W max",
      "Compatibility": "All Qi devices",
      "LED Indicator": "Yes",
      "Dimensions": "4 inch diameter"
    }
  },
  {
    id: "7",
    name: "Yoga Mat",
    description: "Non-slip, eco-friendly yoga mat with carrying strap.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
    category: "Fitness",
    rating: 4.7,
    reviews: 156,
    stock: 45,
    seller: "ZenFitness",
    discount: 10,
    tags: ["yoga", "fitness", "exercise", "mat"],
    specs: {
      "Material": "TPE Eco-friendly Foam",
      "Thickness": "6mm",
      "Dimensions": "72″ x 24″",
      "Non-slip Surface": "Yes",
      "Includes": "Carrying strap"
    }
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug",
    description: "Handmade ceramic mug with artistic design. Microwave and dishwasher safe.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop",
    category: "Home & Kitchen",
    rating: 4.5,
    reviews: 73,
    stock: 60,
    seller: "ArtisanCraft",
    discount: 0,
    tags: ["mug", "ceramic", "coffee", "kitchen"],
    specs: {
      "Material": "Ceramic",
      "Capacity": "12 oz",
      "Microwave Safe": "Yes",
      "Dishwasher Safe": "Yes",
      "Style": "Handcrafted with unique pattern"
    }
  },
  {
    id: "9",
    name: "Smart LED Light Bulb",
    description: "WiFi-enabled LED bulb that you can control with your smartphone or voice assistant.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1499595684943-1c52ee292904?q=80&w=2078&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.3,
    reviews: 92,
    stock: 120,
    seller: "SmartHome",
    discount: 0,
    tags: ["smart home", "lighting", "led", "wifi"],
    specs: {
      "Wattage": "9W (60W equivalent)",
      "Color": "RGB + White (16M colors)",
      "Connectivity": "WiFi 2.4GHz",
      "Compatibility": "Alexa, Google Home, HomeKit",
      "Lifespan": "25,000 hours"
    }
  },
  {
    id: "10",
    name: "Bluetooth Portable Speaker",
    description: "Compact, waterproof speaker with impressive sound quality and 12-hour battery life.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 187,
    stock: 40,
    seller: "SoundWave",
    discount: 20,
    tags: ["speaker", "bluetooth", "portable", "waterproof"],
    specs: {
      "Connectivity": "Bluetooth 5.0",
      "Battery Life": "12 hours",
      "Waterproof Rating": "IPX7",
      "Power Output": "20W",
      "Features": "Built-in mic, Voice assistant support"
    }
  },
  {
    id: "11",
    name: "Essential Oil Diffuser",
    description: "Ultrasonic aroma diffuser with 7 color LED lights and auto shut-off feature.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2070&auto=format&fit=crop",
    category: "Home & Kitchen",
    rating: 4.4,
    reviews: 152,
    stock: 75,
    seller: "AromaHome",
    discount: 5,
    tags: ["diffuser", "essential oil", "aroma", "home"],
    specs: {
      "Capacity": "300ml",
      "Run Time": "Up to 10 hours",
      "Mist Modes": "Continuous or intermittent",
      "Auto Shut-off": "Yes",
      "Light Options": "7 color changing LED"
    }
  },
  {
    id: "12",
    name: "Running Shoes",
    description: "Lightweight, breathable running shoes with cushioned support for maximum comfort.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    category: "Fitness",
    rating: 4.7,
    reviews: 263,
    stock: 30,
    seller: "ActiveStep",
    discount: 0,
    tags: ["shoes", "running", "fitness", "footwear"],
    specs: {
      "Upper Material": "Knit Mesh",
      "Sole": "Responsive Foam",
      "Weight": "8.5 oz",
      "Sizes": "7-13 (US Men's)",
      "Colors": "Black/Red, Blue/White, All Black"
    }
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
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        product.seller?.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(searchResults), 300);
    });
  },
  
  getCategories: (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(categories), 300);
    });
  },

  getFeaturedProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(
        products.filter(product => product.rating && product.rating >= 4.5).slice(0, 6)
      ), 300);
    });
  },
  
  getDiscountedProducts: (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(
        products.filter(product => product.discount && product.discount > 0).slice(0, 6)
      ), 300);
    });
  },
  
  getRelatedProducts: (productId: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      const product = products.find(p => p.id === productId);
      if (!product) {
        resolve([]);
        return;
      }
      
      const related = products
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, 4);
        
      setTimeout(() => resolve(related), 300);
    });
  }
};
