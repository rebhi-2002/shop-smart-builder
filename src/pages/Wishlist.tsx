
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ChevronRight, ShoppingCart, Trash } from 'lucide-react';
import { useWishlist } from '@/hooks/useCart';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast: uiToast } = useToast();
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemNameToDelete, setItemNameToDelete] = useState<string | null>(null);

  const openDeleteDialog = (productId: string, productName: string) => {
    setItemToDelete(productId);
    setItemNameToDelete(productName);
  };
  
  const closeDeleteDialog = () => {
    setItemToDelete(null);
    setItemNameToDelete(null);
  };
  
  const confirmRemove = () => {
    if (itemToDelete && itemNameToDelete) {
      removeFromWishlist(itemToDelete);
      toast("Removed from Wishlist", {
        description: `${itemNameToDelete} has been removed from your wishlist.`,
        icon: <Heart className="h-4 w-4 text-gray-500" />
      });
      closeDeleteDialog();
    }
  };
  
  const handleAddToCart = (productId: string) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      // Create animation effect (similar to ProductCard)
      const buttons = document.querySelectorAll(`[data-product-id="${productId}"]`);
      if (buttons.length > 0) {
        const button = buttons[0];
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create the bubble element
        const bubble = document.createElement('div');
        bubble.className = 'fixed z-50 flex items-center justify-center w-12 h-12 bg-primary rounded-full text-white shadow-lg';
        bubble.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        
        document.body.appendChild(bubble);
        
        // Get cart icon position
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
          const cartRect = cartIcon.getBoundingClientRect();
          const cartX = cartRect.left + cartRect.width / 2;
          const cartY = cartRect.top + cartRect.height / 2;
          
          // Animate bubble to cart
          setTimeout(() => {
            bubble.style.transform = 'scale(0.5)';
            bubble.style.left = `${cartX}px`;
            bubble.style.top = `${cartY}px`;
            
            // Remove bubble after animation
            setTimeout(() => {
              bubble.style.transform = 'scale(0)';
              setTimeout(() => {
                document.body.removeChild(bubble);
              }, 200);
            }, 500);
          }, 10);
        }
      }
        
      addToCart(product);
      removeFromWishlist(productId);
      
      toast("Added to Cart", {
        description: `${product.name} has been moved to your cart.`,
        action: {
          label: "View Cart",
          onClick: () => window.location.href = "/cart"
        },
        icon: <ShoppingCart className="h-4 w-4 text-green-500" />
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Wishlist</span>
        </div>
      </div>
      
      {wishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add items to your wishlist to save them for later.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </Card>
        </motion.div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">{wishlistItems.length} item(s)</p>
          </div>
          
          <AnimatePresence>
            <div className="grid gap-6">
              {wishlistItems.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  <div className="border rounded-lg flex flex-col sm:flex-row overflow-hidden">
                    <div className="w-full sm:w-48 h-48">
                      <Link to={`/products/${item.id}`}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between">
                          <Link to={`/products/${item.id}`}>
                            <h3 className="font-semibold text-lg hover:text-primary">{item.name}</h3>
                          </Link>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openDeleteDialog(item.id, item.name)}
                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mt-1">{item.category}</div>
                        <p className="text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          {item.discount ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">
                                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                              </span>
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <motion.div whileTap={{ scale: 0.95 }}>
                          <Button 
                            onClick={() => handleAddToCart(item.id)}
                            className="ml-auto"
                            data-product-id={item.id}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!itemToDelete} onOpenChange={closeDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Wishlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{itemNameToDelete}" from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Wishlist;
