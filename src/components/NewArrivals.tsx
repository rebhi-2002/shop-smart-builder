
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ArrowRight, Clock } from 'lucide-react';
import { productService } from '@/services/productService';
import { cn } from '@/lib/utils';

interface NewArrivalsProps {
  className?: string;
  limit?: number;
  variant?: 'default' | 'modern' | 'simple';
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ 
  className,
  limit = 4,
  variant = 'default'
}) => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  // For demonstration purposes, we'll just show the first few products
  // In a real app, you would filter based on a "new" flag or createdAt date
  const newProducts = products.slice(0, limit);
  
  if (variant === 'simple') {
    return (
      <div className={cn("bg-white border rounded-lg p-4", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">New Arrivals</h3>
          <Link 
            to="/products?new=true" 
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All
          </Link>
        </div>
        
        <div className="space-y-4">
          {newProducts.slice(0, 3).map(product => (
            <Link 
              key={product.id}
              to={`/products/${product.id}`}
              className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
                  <Badge variant="outline" className="text-xs">New</Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
  if (variant === 'modern') {
    return (
      <div className={cn("py-12", className)}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-12 bg-primary rounded-full"></div>
            <div>
              <h2 className="text-3xl font-bold">Just Arrived</h2>
              <p className="text-muted-foreground">Check out our newest products</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newProducts.map(product => (
              <Link 
                key={product.id}
                to={`/products/${product.id}`}
                className="group block overflow-hidden"
              >
                <div className="relative mb-4">
                  <div className="overflow-hidden rounded-xl">
                    <AspectRatio ratio={1 / 1}>
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </AspectRatio>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-primary">New In</Badge>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <Button size="sm" variant="secondary" className="w-full">Quick View</Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Just arrived
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <Button asChild>
              <Link to="/products?new=true">
                View All New Arrivals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={cn("py-8", className)}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Button asChild variant="ghost">
            <Link to="/products?new=true">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newProducts.map(product => (
            <Link 
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden mb-2">
                <AspectRatio ratio={1 / 1}>
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </AspectRatio>
                <Badge className="absolute top-2 right-2 bg-primary">New</Badge>
              </div>
              <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
