import React, { createContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  stock?: number;
  rating?: number;
  reviews?: number;
  savedForLater?: boolean;
  quantity?: number;
  selectedColor?: string | null;
  selectedSize?: string | null;
  seller?: string;
  tags?: string[];
  // Add missing properties used in ProductDetails
  colors?: string[];
  sizes?: string[];
  additionalImages?: string[];
  longDescription?: string;
  specifications?: Record<string, string | number>;
  specs?: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
  savedForLater?: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  recentlyViewed: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  addToRecentlyViewed: (product: Product) => void;
}

// Create the context
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  wishlistItems: [],
  recentlyViewed: [],
  addToCart: () => {},
  updateCartItemQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  saveForLater: () => {},
  moveToCart: () => {},
  addToRecentlyViewed: () => {},
});

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Failed to load cart items from local storage:", error);
      return [];
    }
  });
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const storedWishlistItems = localStorage.getItem('wishlistItems');
      return storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
    } catch (error) {
      console.error("Failed to load wishlist items from local storage:", error);
      return [];
    }
  });
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
      return storedRecentlyViewed ? JSON.parse(storedRecentlyViewed) : [];
    } catch (error) {
      console.error("Failed to load recently viewed items from local storage:", error);
      return [];
    }
  });
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (productId: string) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const addToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      if (prevItems.find(item => item.id === product.id)) {
        return prevItems;
      } else {
        return [...prevItems, product];
      }
    });
  };
  
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const saveForLater = (productId: string) => {
    const itemToMove = cartItems.find(item => item.id === productId);
    if (itemToMove) {
      // Remove from cart
      removeFromCart(productId);
      
      // Add to cart with savedForLater flag
      setCartItems(prevItems => [...prevItems, { ...itemToMove, savedForLater: true }]);
    }
  };

  const moveToCart = (productId: string) => {
    const itemToMove = cartItems.find(item => item.id === productId);
    if (itemToMove) {
      // Remove from cart
      removeFromCart(productId);
      
      // Add to cart without savedForLater flag
      setCartItems(prevItems => [...prevItems, { ...itemToMove, savedForLater: false }]);
    }
  };
  
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prevItems => {
      const isAlreadyViewed = prevItems.some(item => item.id === product.id);
      
      if (isAlreadyViewed) {
        return prevItems;
      } else {
        return [product, ...prevItems];
      }
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      recentlyViewed,
      addToCart,
      updateCartItemQuantity,
      removeFromCart,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      saveForLater,
      moveToCart,
      addToRecentlyViewed
    }}>
      {children}
    </CartContext.Provider>
  );
};
