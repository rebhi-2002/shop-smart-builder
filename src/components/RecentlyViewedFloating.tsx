
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '@/hooks/useCart';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ArrowRight, 
  X,
  ShoppingCart, 
  Heart,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useCart, useWishlist } from '@/hooks/useCart';

const RecentlyViewedFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { recentlyViewed } = useRecentlyViewed();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [autoOpenTimer, setAutoOpenTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Auto open the component after 30 seconds if there are viewed products
  useEffect(() => {
    if (recentlyViewed.length > 0) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        
        // Auto close after 8 seconds if not hovered
        const closeTimer = setTimeout(() => {
          if (!isHovered) {
            setIsOpen(false);
          }
        }, 8000);
        
        return () => clearTimeout(closeTimer);
      }, 30000);
      
      setAutoOpenTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [recentlyViewed.length]);
  
  // Clear auto-open timer if manually toggled
  useEffect(() => {
    if (autoOpenTimer) {
      clearTimeout(autoOpenTimer);
      setAutoOpenTimer(null);
    }
  }, [isOpen]);
  
  // If no recently viewed products, don't render anything
  if (recentlyViewed.length === 0) return null;
  
  const handleAddToCart = (event: React.MouseEvent, productId: string) => {
    event.preventDefault();
    event.stopPropagation();
    
    const product = recentlyViewed.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };
  
  const handleAddToWishlist = (event: React.MouseEvent, productId: string) => {
    event.preventDefault();
    event.stopPropagation();
    
    const product = recentlyViewed.find(p => p.id === productId);
    if (product) {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };
  
  const displayItems = recentlyViewed.slice(0, 3);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 z-30"
      >
        <Eye className="h-6 w-6" />
      </Button>
      
      {/* Floating Viewed Products Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 bg-background border shadow-lg rounded-lg overflow-hidden z-30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <h3 className="font-medium">Recently Viewed</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-3 max-h-80 overflow-y-auto">
              {displayItems.map(product => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="flex gap-3 p-2 hover:bg-muted/50 rounded-md group transition-colors mb-2"
                >
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">
                          ${product.discount
                            ? (product.price * (1 - product.discount / 100)).toFixed(2)
                            : product.price.toFixed(2)}
                        </span>
                        {product.discount && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => handleAddToWishlist(e, product.id)}
                        >
                          <Heart className={cn(
                            "h-3 w-3",
                            isInWishlist(product.id) && "fill-red-500 text-red-500"
                          )} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => handleAddToCart(e, product.id)}
                        >
                          <ShoppingCart className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {recentlyViewed.length > 3 && (
                <div className="mt-2 text-center">
                  <Button 
                    variant="link" 
                    asChild 
                    className="text-xs"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/products" className="flex items-center justify-center">
                      See all {recentlyViewed.length} products
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecentlyViewedFloating;
