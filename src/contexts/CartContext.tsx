
import React, { createContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  applyPromoCode: (code: string) => boolean;
  promoDiscount: number;
  activePromoCode: string | null;
}

// Export the CartContext so it can be imported by useCart.ts
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Valid promo codes and their discount percentages
const validPromoCodes: Record<string, number> = {
  'WELCOME10': 0.1,  // 10% discount
  'SUMMER20': 0.2,   // 20% discount
  'SPECIAL50': 0.5,  // 50% discount
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [activePromoCode, setActivePromoCode] = useState<string | null>(null);
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        setCartItems([]);
      }
    }
    
    const savedPromo = localStorage.getItem('promoCode');
    if (savedPromo) {
      try {
        const { code, discount } = JSON.parse(savedPromo);
        setActivePromoCode(code);
        setPromoDiscount(discount);
      } catch (error) {
        console.error('Failed to parse promo from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
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
  
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
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
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    applyPromoCode,
    promoDiscount,
    activePromoCode
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
