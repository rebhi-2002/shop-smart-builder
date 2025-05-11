
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/contexts/CartContext';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="hover-card-animation overflow-hidden flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <CardContent className="pt-4 flex-grow">
          <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <div className="font-bold text-lg">${product.price.toFixed(2)}</div>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{product.description}</p>
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
