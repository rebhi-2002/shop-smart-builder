
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { productService } from '@/services/productService';
import { ChevronRight, Check } from 'lucide-react';

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
  
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Count products per category
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Apply selected categories filter
  const handleApplyFilter = () => {
    if (selectedCategories.length === 0) {
      navigate('/products');
    } else if (selectedCategories.length === 1) {
      navigate(`/categories/${selectedCategories[0]}`);
    } else {
      const queryString = selectedCategories.map(c => `category=${encodeURIComponent(c)}`).join('&');
      navigate(`/products?${queryString}`);
    }
  };
  
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
      
      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Selected Categories</h2>
            <Button variant="outline" size="sm" onClick={() => setSelectedCategories([])}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <Badge key={category} className="pl-2 pr-1 py-1 flex items-center gap-1">
                {category}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 rounded-full hover:bg-primary/20" 
                  onClick={() => toggleCategory(category)}
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Button className="mt-3" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </div>
      )}
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category} 
            className={`hover:opacity-95 transition-opacity cursor-pointer ${
              selectedCategories.includes(category) ? 'ring-2 ring-primary rounded-lg' : ''
            }`}
            onClick={() => toggleCategory(category)}
          >
            <Card className="overflow-hidden hover-card-animation relative">
              {selectedCategories.includes(category) && (
                <div className="absolute top-2 right-2 z-10 bg-primary text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
