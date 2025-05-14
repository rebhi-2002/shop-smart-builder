
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import ProductCard from '@/components/ProductCard';
import { productService } from '@/services/productService';
import { cn } from '@/lib/utils';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  filter?: (product: any) => boolean;
  sortBy?: (a: any, b: any) => number;
  limit?: number;
  viewAllLink?: string;
  className?: string;
  variant?: 'default' | 'modern' | 'minimal' | 'grid';
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  subtitle,
  filter = () => true,
  sortBy = () => 0,
  limit = 8,
  viewAllLink = '/products',
  className,
  variant = 'default'
}) => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const filteredProducts = products
    .filter(filter)
    .sort(sortBy)
    .slice(0, limit);

  if (filteredProducts.length === 0 && !isLoading) {
    return null;
  }

  if (variant === 'modern') {
    return (
      <div className={cn("py-12", className)}>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">{title}</h2>
                {subtitle && <p className="text-muted-foreground max-w-2xl">{subtitle}</p>}
              </div>
              {viewAllLink && (
                <Button asChild variant="outline" className="bg-white hover:bg-white/90">
                  <Link to={viewAllLink}>
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
                {filteredProducts.map((product) => (
                  <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <Card className="border-0 bg-transparent">
                      <CardContent className="p-1">
                        <ProductCard product={product} variant="compact" />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'minimal') {
    return (
      <div className={cn("py-8", className)}>
        <div className="container mx-auto px-4">
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{title}</h2>
              {viewAllLink && (
                <Link 
                  to={viewAllLink}
                  className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center"
                >
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredProducts.slice(0, 6).map(product => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-md overflow-hidden mb-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'grid') {
    return (
      <div className={cn("py-12", className)}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">{title}</h2>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            {viewAllLink && (
              <Button asChild variant="ghost">
                <Link to={viewAllLink}>
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <Button asChild variant="ghost">
              <Link to={viewAllLink}>
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        
        {subtitle && <p className="text-muted-foreground mb-6">{subtitle}</p>}
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {filteredProducts.map((product) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <Card>
                  <CardContent className="p-0">
                    <ProductCard product={product} variant="compact" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedProducts;
