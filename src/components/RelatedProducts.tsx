
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  // Fetch related products
  const { data: products, isLoading } = useQuery({
    queryKey: ['relatedProducts', category, currentProductId],
    queryFn: () => productService.getRelatedProducts(currentProductId),
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="w-full h-48 rounded-lg" />
              <Skeleton className="w-2/3 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
