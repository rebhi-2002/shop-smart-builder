
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '@/hooks/useCart';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from './ui/carousel';
import { cn } from '@/lib/utils';

interface RecentlyViewedProps {
  limit?: number;
  variant?: 'standard' | 'floating' | 'minimal';
  className?: string;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ 
  limit = 4, 
  variant = 'standard',
  className
}) => {
  const { recentlyViewed } = useRecentlyViewed();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  if (recentlyViewed.length === 0) {
    return null;
  }
  
  // Determine which products to display
  const displayProducts = recentlyViewed.slice(0, limit);
  
  // Return different variants based on the prop
  
  // Minimal variant (best for sidebar)
  if (variant === 'minimal') {
    return (
      <div className={cn("border-t pt-4", className)}>
        <h3 className="font-medium mb-3">Recently Viewed</h3>
        <div className="space-y-3">
          {displayProducts.map(product => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm truncate group-hover:text-primary transition-colors">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
  // Floating variant (best for sidebar/fixed position)
  if (variant === 'floating') {
    return (
      <div className={cn("rounded-lg border shadow-lg bg-card p-4 max-w-xs", className)}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Recently Viewed</h3>
          {recentlyViewed.length > limit && (
            <Link 
              to="/products" 
              className="text-primary hover:text-primary/80 transition-colors text-xs font-medium flex items-center"
            >
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          )}
        </div>
        
        <div className="space-y-3">
          {displayProducts.map(product => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`}
              className="flex items-center gap-3 group p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {product.name}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.discount && (
                    <Badge variant="outline" className="text-xs bg-red-100 border-red-200 text-red-700 px-1.5 py-0">
                      {product.discount}% OFF
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
  // Standard variant (full width section)
  return (
    <div className={cn("container mx-auto px-4 py-8 border-t", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recently Viewed</h2>
        {recentlyViewed.length > limit && (
          <Link 
            to="/products" 
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            View All
          </Link>
        )}
      </div>
      
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recentlyViewed.map((product, index) => (
            <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div
                className="relative group h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ProductCard product={product} variant="compact" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecentlyViewed;
