import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { productService } from '@/services/productService';
import { ChevronRight, Check, X, Filter } from 'lucide-react';

const categoryImages: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop",
  "Clothing": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  "Accessories": "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=2012&auto=format&fit=crop",
  "Home & Kitchen": "https://images.unsplash.com/photo-1583845112203-29329902332e?q=80&w=1974&auto=format&fit=crop",
  "Fitness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
  "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop",
  "Books": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
  "Toys": "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?q=80&w=2070&auto=format&fit=crop",
  "Sports": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop",
  "Automotive": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop"
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
  const [showFilters, setShowFilters] = useState(false);
  
  // Count products per category
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  
  // Toggle category selection using checkbox
  const toggleCategory = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };
  
  // Apply selected categories filter
  const handleApplyFilter = () => {
    if (selectedCategories.length === 0) {
      navigate('/products');
    } else if (selectedCategories.length === 1) {
      navigate(`/categories/${encodeURIComponent(selectedCategories[0])}`);
    } else {
      const queryString = selectedCategories
        .map(c => `category=${encodeURIComponent(c)}`)
        .join('&');
      navigate(`/products?${queryString}`);
    }
  };

  // Get all available categories including the extra ones we added
  const allCategories = [...new Set([
    ...categories,
    "Beauty", 
    "Books", 
    "Toys", 
    "Sports", 
    "Automotive"
  ])].sort();
  
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
      
      {/* Mobile Filter Toggle */}
      <Button 
        variant="outline" 
        className="md:hidden w-full mb-6 flex items-center justify-between"
        onClick={() => setShowFilters(!showFilters)}
      >
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter Categories
        </div>
        <Badge className="ml-2">{selectedCategories.length}</Badge>
      </Button>
      
      {/* Category Filter Section (Mobile) */}
      {showFilters && (
        <div className="md:hidden border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Select Categories</h2>
            {selectedCategories.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedCategories([])}
              >
                Clear All
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`mobile-category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => toggleCategory(category, checked === true)}
                />
                <label 
                  htmlFor={`mobile-category-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category} {categoryCount[category] ? `(${categoryCount[category]})` : ''}
                </label>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </div>
      )}
      
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
                  onClick={() => toggleCategory(category, false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Button className="mt-3" onClick={handleApplyFilter}>
            Apply Filter
          </Button>
        </div>
      )}
      
      {/* Layout with filter sidebar (Desktop) */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="border rounded-lg p-5 sticky top-24">
            <h2 className="font-medium mb-4">Select Categories</h2>
            <div className="space-y-2">
              {allCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`desktop-category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => toggleCategory(category, checked === true)}
                  />
                  <label 
                    htmlFor={`desktop-category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category} {categoryCount[category] ? `(${categoryCount[category]})` : ''}
                  </label>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={handleApplyFilter}>
              Apply Filter
            </Button>
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((category) => (
              <div 
                key={category} 
                className={`hover:opacity-95 transition-opacity cursor-pointer ${
                  selectedCategories.includes(category) ? 'ring-2 ring-primary rounded-lg' : ''
                }`}
                onClick={() => toggleCategory(category, !selectedCategories.includes(category))}
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
                        {categoryCount[category] || 0} Products
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => toggleCategory(category, checked === true)}
                        onClick={(e) => e.stopPropagation()}
                        className="mr-2"
                      />
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {selectedCategories.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button size="lg" onClick={handleApplyFilter}>
                Browse {selectedCategories.length} {selectedCategories.length === 1 ? 'Category' : 'Categories'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
