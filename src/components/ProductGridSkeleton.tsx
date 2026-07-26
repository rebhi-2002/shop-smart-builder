import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({ count = 8, className }) => (
  <div
    className={
      className ??
      'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
    }
    aria-busy="true"
    aria-label="Loading products"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-lg border p-3 space-y-3">
        <Skeleton className="aspect-square w-full rounded-md" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    ))}
  </div>
);

export default ProductGridSkeleton;
