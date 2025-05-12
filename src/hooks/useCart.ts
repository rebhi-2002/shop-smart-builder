
import { useContext } from 'react';
import { CartContext, Product } from '@/contexts/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

// Custom hook for managing recently viewed products
export const useRecentlyViewed = () => {
  const { recentlyViewed, addToRecentlyViewed } = useCart();
  
  return {
    recentlyViewed,
    addToRecentlyViewed
  };
};

// Custom hook for managing wishlist
export const useWishlist = () => {
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  
  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };
};

// Helper hook for saved for later items
export const useSavedForLater = () => {
  const { cartItems, saveForLater, moveToCart, removeFromCart } = useCart();
  
  const savedItems = cartItems.filter(item => item.savedForLater);
  
  return {
    savedItems,
    saveForLater,
    moveToCart,
    removeFromCart
  };
};
