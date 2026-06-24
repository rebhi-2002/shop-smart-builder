
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from 'lucide-react';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    category: string;
    rating?: number;
    discount?: number;
  };
  variant?: 'default' | 'compact';
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'default', onAddToCart }) => {
  const { id, name, price, description, image, category, rating, discount } = product;
  
  const renderRating = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="fill-amber-400 stroke-amber-400 h-4 w-4" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="stroke-amber-400 h-4 w-4" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="fill-amber-400 stroke-amber-400 h-4 w-4" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="stroke-amber-400 h-4 w-4" />);
      }
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="text-xs text-muted-foreground ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Compact variant for carousels and smaller displays
  if (variant === 'compact') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <Link to={`/products/${id}`} className="block overflow-hidden aspect-square relative">
          <img
            src={image || "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop";
            }}
          />
          
          {discount && discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">-{discount}%</Badge>
          )}
        </Link>
        
        <CardContent className="p-3 flex-grow">
          <div className="text-xs text-muted-foreground">{category}</div>
          <Link to={`/products/${id}`} className="block">
            <h3 className="font-semibold text-sm mt-1 hover:text-primary transition-colors line-clamp-2">{name}</h3>
          </Link>
          
          <div className="mt-2">
            {renderRating(rating)}
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2 items-stretch p-3 pt-0">
          <div>
            {discount && discount > 0 ? (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-bold text-sm">${(price * (1 - discount/100)).toFixed(2)}</span>
                <span className="text-xs text-muted-foreground line-through">${price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold text-sm">${price.toFixed(2)}</span>
            )}
          </div>
          <Button onClick={onAddToCart} size="sm" className="w-full text-xs">
            <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Default variant
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <Link to={`/products/${id}`} className="block overflow-hidden aspect-square relative">
        <img
          src={image || "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop";
          }}
        />
        
        {discount && discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">-{discount}%</Badge>
        )}
      </Link>
      
      <CardContent className="pt-4 flex-grow">
        <div className="text-sm text-muted-foreground">{category}</div>
        <Link to={`/products/${id}`} className="block">
          <h3 className="font-semibold text-lg mt-1 hover:text-primary transition-colors">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
        
        <div className="mt-2">
          {renderRating(rating)}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-0 pb-4">
        <div>
          {discount && discount > 0 ? (
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg">${(price * (1 - discount/100)).toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
          )}
        </div>
        <Button onClick={onAddToCart} size="sm">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
