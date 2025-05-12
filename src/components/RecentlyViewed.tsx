
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '@/hooks/useCart';
import ProductCard from './ProductCard';

interface RecentlyViewedProps {
  limit?: number;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ limit = 4 }) => {
  const { recentlyViewed } = useRecentlyViewed();
  
  if (recentlyViewed.length === 0) {
    return null;
  }
  
  const displayProducts = recentlyViewed.slice(0, limit);
  
  return (
    <div className="container mx-auto px-4 py-8 border-t">
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
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayProducts.map(product => (
          <ProductCard key={product.id} product={product} variant="compact" />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
