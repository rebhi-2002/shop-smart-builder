import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/useCart';

const CartCrossSell: React.FC = () => {
  const { cartItems } = useCart();
  const cartIds = new Set(cartItems.map((i) => i.id));

  const { data: products, isLoading } = useQuery({
    queryKey: ['cart-cross-sell'],
    queryFn: () => productService.getFeaturedProducts(),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-lg" />
        ))}
      </div>
    );
  }

  const suggestions = (products || []).filter((p) => !cartIds.has(p.id)).slice(0, 4);
  if (suggestions.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">You might also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {suggestions.map((p) => (
          <ProductCard key={p.id} product={p} variant="compact" />
        ))}
      </div>
    </section>
  );
};

export default CartCrossSell;
