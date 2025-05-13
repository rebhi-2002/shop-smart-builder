import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { ShoppingCart, Heart, Star, CircleCheck } from 'lucide-react';
import { Product } from '@/contexts/CartContext';
import { useCart, useWishlist } from '@/hooks/useCart';
import { motion } from 'framer-motion';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create cart animation effect
    const button = e.currentTarget;
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
    
    addToCart(product);
    
    toast("Added to Cart", {
      description: `${product.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart"
      },
      icon: <ShoppingCart className="h-4 w-4 text-green-500" />
    });
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      setShowDeleteAlert(true);
    } else {
      addToWishlist(product);
      
      toast("Added to Wishlist", {
        description: `${product.name} has been added to your wishlist.`,
        action: {
          label: "View Wishlist",
          onClick: () => window.location.href = "/wishlist"
        },
        icon: <Heart className="h-4 w-4 text-red-500 fill-red-500" />
      });
    }
  };
  
  const confirmRemoveFromWishlist = () => {
    removeFromWishlist(product.id);
    setShowDeleteAlert(false);
    
    toast("Removed from Wishlist", {
      description: `${product.name} has been removed from your wishlist.`,
      icon: <Heart className="h-4 w-4 text-gray-500" />
    });
  };
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;

  if (variant === 'compact') {
    
    return (
      <Card className="hover-card-animation overflow-hidden h-full">
        <Link to={`/products/${product.id}`} className="flex flex-col h-full">
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            {product.discount && product.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500">
                -{product.discount}%
              </Badge>
            )}
          </div>
          
          <CardContent className="p-3 flex-grow">
            <div className="flex items-center mb-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-3 w-3 fill-current" 
                    fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-xs ml-1">({product.reviews || 0})</span>
            </div>
            
            <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
            
            <div className="mt-1 flex items-center gap-1">
              {discountedPrice ? (
                <>
                  <span className="font-semibold text-sm">${discountedPrice.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-semibold text-sm">${product.price.toFixed(2)}</span>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return (
    <>
      <Card className="hover-card-animation overflow-hidden flex flex-col h-full">
        <div className="flex flex-col h-full">
          <Link to={`/products/${product.id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              
              {product.discount && product.discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500">
                  -{product.discount}%
                </Badge>
              )}
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-2 right-2 rounded-full bg-white hover:bg-white/90"
                  onClick={handleWishlistToggle}
                >
                  <Heart 
                    className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
              </motion.div>
              
              {product.stock && product.stock < 10 && (
                <Badge variant="outline" className="absolute bottom-2 left-2 bg-white text-foreground">
                  Only {product.stock} left
                </Badge>
              )}
            </div>
          </Link>
          
          <CardContent className="pt-4 flex-grow">
            <Link to={`/products/${product.id}`}>
              <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
              
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                {product.seller && (
                  <div className="flex items-center text-xs">
                    <CircleCheck className="h-3 w-3 mr-1 text-green-500" />
                    {product.seller}
                  </div>
                )}
              </div>
              
              <div className="flex items-center mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 fill-current" 
                      fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                <span className="text-sm ml-1">({product.reviews || 0})</span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                {discountedPrice ? (
                  <>
                    <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
            </Link>
          </CardContent>
          
          <CardFooter className="pt-0">
            <motion.div className="w-full" whileTap={{ scale: 0.95 }}>
              <Button 
                variant="default" 
                className="w-full" 
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </motion.div>
          </CardFooter>
        </div>
      </Card>
      
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Wishlist?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{product.name}" from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveFromWishlist} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
