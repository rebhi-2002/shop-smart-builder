
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, TrendingUp } from 'lucide-react';
import { productService } from '@/services/productService';
import { cn } from '@/lib/utils';

interface TrendingProductsProps {
  limit?: number;
  className?: string;
  variant?: 'default' | 'compact';
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({
  limit = 5,
  className,
  variant = 'default'
}) => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  // For demonstration, we'll sort by rating and take the top products
  const trendingProducts = products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);

  if (variant === 'compact') {
    return (
      <div className={cn("bg-muted/30 rounded-lg p-4", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-primary" />
            <h3 className="font-medium">Trending Now</h3>
          </div>
          <Link 
            to="/products?sort=trending" 
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All
          </Link>
        </div>
        
        <div className="space-y-3">
          {trendingProducts.map((product, index) => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`}
              className="flex gap-3 group"
            >
              <div className="flex-shrink-0 w-10 h-10 relative">
                <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <Flame className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/products?sort=trending">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <Link 
              key={product.id}
              to={`/products/${product.id}`} 
              className="group relative block overflow-hidden rounded-lg border hover:shadow-md transition-shadow"
            >
              <Badge 
                className="absolute top-2 left-2 z-10 bg-primary"
              >
                #{index + 1} Trending
              </Badge>
              
              <div className="relative pt-[80%]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="p-4 bg-white">
                <div className="mb-1 text-xs text-muted-foreground">
                  {product.category}
                </div>
                <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  {product.rating && (
                    <div className="flex items-center">
                      <div className="text-amber-400">★</div>
                      <span className="ml-1 text-xs">{product.rating} ({product.reviews || 0})</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
