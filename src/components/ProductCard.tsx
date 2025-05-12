
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart, Star, CircleCheck } from 'lucide-react';
import { Product } from '@/contexts/CartContext';
import { useCart, useWishlist } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
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
    <Card className="hover-card-animation overflow-hidden flex flex-col h-full">
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
          
          {product.stock && product.stock < 10 && (
            <Badge variant="outline" className="absolute bottom-2 left-2 bg-white text-foreground">
              Only {product.stock} left
            </Badge>
          )}
        </div>
        
        <CardContent className="pt-4 flex-grow">
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
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            variant="default" 
            className="w-full" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
