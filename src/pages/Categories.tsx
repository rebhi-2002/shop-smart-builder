
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { productService } from '@/services/productService';
import { ChevronRight } from 'lucide-react';

const categoryImages: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop",
  "Clothing": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  "Accessories": "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=2012&auto=format&fit=crop",
  "Home & Kitchen": "https://images.unsplash.com/photo-1583845112203-29329902332e?q=80&w=1974&auto=format&fit=crop",
  "Fitness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
};

const Categories: React.FC = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories
  });
  
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });
  
  // Count products per category
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop by Category</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Categories</span>
        </div>
      </div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            key={category} 
            to={`/categories/${category}`} 
            className="hover:opacity-95 transition-opacity"
          >
            <Card className="overflow-hidden hover-card-animation">
              <div className="h-52 overflow-hidden">
                <img 
                  src={categoryImages[category] || "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"} 
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl">{category}</h3>
                  <p className="text-muted-foreground">
                    {categoryCount[category]} Products
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
