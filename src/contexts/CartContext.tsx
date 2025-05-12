import React, { createContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  seller?: string;
  discount?: number;
  tags?: string[];
  specs?: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
  savedForLater?: boolean;
}

export interface WishlistItem extends Product {
  dateAdded: Date;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  applyPromoCode: (code: string) => boolean;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  promoDiscount: number;
  activePromoCode: string | null;
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
}

// Export the CartContext so it can be imported by useCart.ts
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Valid promo codes and their discount percentages
const validPromoCodes: Record<string, number> = {
  'WELCOME10': 0.1,  // 10% discount
  'SUMMER20': 0.2,   // 20% discount
  'SPECIAL50': 0.5,  // 50% discount
  'FREESHIP': 0.15,  // 15% discount
  'FLASH25': 0.25,   // 25% discount
};

const MAX_RECENTLY_VIEWED = 10;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [activePromoCode, setActivePromoCode] = useState<string | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  
  // Load data from localStorage on initial load
  useEffect(() => {
    const loadStoredData = () => {
      try {
        // Load cart
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
        
        // Load wishlist
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        }
        
        // Load promo code
        const savedPromo = localStorage.getItem('promoCode');
        if (savedPromo) {
          const { code, discount } = JSON.parse(savedPromo);
          setActivePromoCode(code);
          setPromoDiscount(discount);
        }
        
        // Load recently viewed
        const savedRecentlyViewed = localStorage.getItem('recentlyViewed');
        if (savedRecentlyViewed) {
          setRecentlyViewed(JSON.parse(savedRecentlyViewed));
        }
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    };
    
    loadStoredData();
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  // Save promo code to localStorage whenever it changes
  useEffect(() => {
    if (activePromoCode && promoDiscount > 0) {
      localStorage.setItem('promoCode', JSON.stringify({
        code: activePromoCode,
        discount: promoDiscount
      }));
    } else {
      localStorage.removeItem('promoCode');
    }
  }, [activePromoCode, promoDiscount]);
  
  // Save recently viewed to localStorage
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);
  
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const existingItem = prevItems[existingItemIndex];
        
        // If item was saved for later, move it back to active cart
        if (existingItem.savedForLater) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: quantity,
            savedForLater: false
          };
          return updatedItems;
        } else {
          // Otherwise just update quantity
          return prevItems.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
        }
      } else {
        return [...prevItems, { ...product, quantity, savedForLater: false }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    setPromoDiscount(0);
    setActivePromoCode(null);
  };
  
  const getTotalItems = () => {
    return cartItems
      .filter(item => !item.savedForLater)
      .reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    const subtotal = cartItems
      .filter(item => !item.savedForLater)
      .reduce((total, item) => {
        const discountedPrice = item.discount 
          ? item.price * (1 - item.discount / 100) 
          : item.price;
        return total + discountedPrice * item.quantity;
      }, 0);
    
    return subtotal * (1 - promoDiscount);
  };
  
  const applyPromoCode = (code: string): boolean => {
    const normalizedCode = code.trim().toUpperCase();
    
    if (validPromoCodes[normalizedCode]) {
      setPromoDiscount(validPromoCodes[normalizedCode]);
      setActivePromoCode(normalizedCode);
      return true;
    }
    
    return false;
  };
  
  // Save for later functionality
  const saveForLater = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, savedForLater: true } : item
      )
    );
  };
  
  const moveToCart = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, savedForLater: false } : item
      )
    );
  };
  
  // Wishlist functionality
  const addToWishlist = (product: Product) => {
    if (!wishlistItems.some(item => item.id === product.id)) {
      setWishlistItems(prevItems => [
        ...prevItems,
        { ...product, dateAdded: new Date() }
      ]);
    }
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };
  
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };
  
  // Recently viewed functionality
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      // Remove product if it already exists
      const filtered = prev.filter(p => p.id !== product.id);
      // Add to start of array and limit length
      return [product, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
    });
  };
  
  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    applyPromoCode,
    saveForLater,
    moveToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    promoDiscount,
    activePromoCode,
    recentlyViewed,
    addToRecentlyViewed
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
