
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { 
  Filter, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  LayoutGrid, 
  LayoutList, 
  X, 
  Check,
  GridIcon,
  LayoutIcon,
  Percent
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { productService } from '@/services/productService';
import { toast } from "@/components/ui/sonner";
import { Product } from '@/contexts/CartContext';

const PAGE_SIZE = 8;

const categoryImages: Record<string, string> = {
  "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop",
  "Clothing": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  "Accessories": "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=2012&auto=format&fit=crop",
  "Home & Kitchen": "https://images.unsplash.com/photo-1583845112203-29329902332e?q=80&w=1974&auto=format&fit=crop",
  "Fashion": "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop",
  "Fitness": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
  "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop",
  "Books": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
  "Toys": "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?q=80&w=2070&auto=format&fit=crop",
  "Sports": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop",
  "Automotive": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070&auto=format&fit=crop",
  "Home": "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2080&auto=format&fit=crop"
};

// Promotional deals data
const promotionalDeals = [
  { name: "Summer Sale", discount: "20% OFF", code: "SUMMER20", color: "bg-gradient-to-r from-orange-500 to-amber-500" },
  { name: "New Customer", discount: "15% OFF", code: "WELCOME15", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { name: "Weekend Special", discount: "10% OFF", code: "WEEKEND10", color: "bg-gradient-to-r from-purple-500 to-pink-500" }
];

const Shop = () => {
  const location = useLocation();
  const { category: categoryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePromotion, setActivePromotion] = useState(0);
  
  // Initialize selected categories from URL params or category route param
  const categoryParams = searchParams.getAll('category');
  const { category: categoryParam } = useParams();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [decodeURIComponent(categoryParam)] : 
    categoryParams.map(param => decodeURIComponent(param))
  );

  // Fetch data
  const { data: allProducts = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  const { data: fetchedCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
  
  // Add some additional categories that might not be in the API
  const allCategories = [...new Set([
    ...fetchedCategories,
    "Electronics",
    "Clothing",
    "Fashion",
    "Accessories",
    "Home & Kitchen",
    "Home",
    "Beauty", 
    "Books", 
    "Toys", 
    "Sports", 
    "Automotive"
  ])].sort();
  
  // Count products per category
  const categoryCount = allCategories.reduce((acc, category) => {
    acc[category] = allProducts.filter(product => product.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  
  // Rotate through promotions
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromotion((prev) => (prev + 1) % promotionalDeals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Prevent page reload when changing filters - using React Router instead of form submission
  const updateFiltersWithoutReload = useCallback((newFilters: Record<string, any>) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Handle special case for categories
    if ('categories' in newFilters) {
      newParams.delete('category');
      newFilters.categories.forEach((cat: string) => {
        newParams.append('category', cat);
      });
      delete newFilters.categories;
    }
    
    // Handle other filter parameters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }
    });
    
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceRange, selectedCategories, activeTab]);
  
  // Update URL when categories change without causing page reload
  useEffect(() => {
    if (!categoryParam) {
      updateFiltersWithoutReload({ categories: selectedCategories });
    }
  }, [selectedCategories, categoryParam, updateFiltersWithoutReload]);
  
  // Update selectedCategories when categoryParam changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([decodeURIComponent(categoryParam)]);
    }
  }, [categoryParam]);
  
  // Update active tab based on URL
  useEffect(() => {
    if (location.pathname.includes('categories') || selectedCategories.length > 0) {
      setActiveTab('categories');
    } else {
      setActiveTab('products');
    }
  }, [location.pathname, selectedCategories]);
  
  // Filter products based on selected categories, search, and price range
  const filteredProducts = allProducts.filter(product => {
    // Filter by search query
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by categories - if no categories selected, show all products
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.some(cat => product.category === cat);
    
    // Filter by price range
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // featured
    }
  });
  
  // Get paginated products
  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  
  // Handler functions
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFiltersWithoutReload({ q: searchQuery });
  };
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  // Handle category selection (allows multiple selections)
  const toggleCategory = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };
  
  // Apply selected categories filter - Modified to prevent reload
  const handleApplyFilter = () => {
    setActiveTab('products');
    // Update the search params without navigating
    updateFiltersWithoutReload({ categories: selectedCategories });
  };
  
  // Select all categories
  const selectAllCategories = () => {
    setSelectedCategories(allCategories);
    toast.success("All categories selected");
  };
  
  // Clear all selected categories
  const clearCategoryFilters = () => {
    setSelectedCategories([]);
    toast.success("Filters cleared");
  };
  
  // Handle page change without reload
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSortBy('featured');
    setSearchParams({}, { replace: true });
    toast.success("All filters cleared");
  };
  
  // Copy promo code to clipboard
  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Promo code ${code} copied to clipboard!`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Deal Banner - Enhanced version */}
      <div className={`${promotionalDeals[activePromotion].color} mb-8 rounded-lg overflow-hidden shadow-lg`}>
        <div className="flex flex-col md:flex-row items-center justify-between p-6 text-white">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4 p-3 bg-white/20 rounded-full">
              <Percent className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{promotionalDeals[activePromotion].name}</h3>
              <p className="text-sm opacity-90">Limited time offer - Don't miss out!</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-3xl font-bold">{promotionalDeals[activePromotion].discount}</div>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 px-3 py-1 rounded font-mono">{promotionalDeals[activePromotion].code}</div>
              <Button 
                variant="secondary" 
                onClick={() => copyPromoCode(promotionalDeals[activePromotion].code)}
                className="whitespace-nowrap"
              >
                Copy Code
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white/10 px-6 py-2 text-sm text-center text-white/90">
          Use code at checkout • Free shipping on orders over $50 • Valid until end of month
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {activeTab === 'categories' ? 'Shop by Category' : 'All Products'}
        </h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Shop</span>
          {selectedCategories.length === 1 && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
              <span className="font-medium">{selectedCategories[0]}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'categories' | 'products')} className="mb-8">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="categories" className="flex items-center">
            <GridIcon className="h-4 w-4 mr-2" /> Shop by Category
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center">
            <LayoutIcon className="h-4 w-4 mr-2" /> Browse All Products
          </TabsTrigger>
        </TabsList>
        
        {/* Search Bar - Common to both tabs */}
        <div className="my-6">
          <form onSubmit={handleSearch} className="flex max-w-xl">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </form>
        </div>
        
        {/* Selected Categories Display */}
        {selectedCategories.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Selected Categories:</span>
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
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearCategoryFilters}
              >
                Clear All
              </Button>
              <Button onClick={handleApplyFilter}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        {/* Categories Tab Content */}
        <TabsContent value="categories" className="mt-4 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allCategories.map((category) => (
              <div 
                key={category} 
                className={`hover:opacity-95 transition-opacity cursor-pointer ${
                  selectedCategories.includes(category) ? 'ring-2 ring-primary rounded-lg' : ''
                }`}
                onClick={() => toggleCategory(category, !selectedCategories.includes(category))}
              >
                <Card className="overflow-hidden hover-card-animation relative h-full">
                  {selectedCategories.includes(category) && (
                    <div className="absolute top-2 right-2 z-10 bg-primary text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={categoryImages[category] || "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"} 
                      alt={category}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{category}</h3>
                      <p className="text-muted-foreground">
                        {categoryCount[category] || 0} Products
                      </p>
                    </div>
                    <Checkbox 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => toggleCategory(category, checked as boolean)}
                      onClick={(e) => e.stopPropagation()}
                    />
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
        </TabsContent>
        
        {/* Products Tab Content */}
        <TabsContent value="products" className="animate-fade-in">
          {/* Filter Controls */}
          <div className="bg-card rounded-lg shadow-sm border p-4 mb-6">
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
              {/* Sort */}
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Featured" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* View Toggle & Filter Toggle */}
              <div className="flex justify-end gap-2">
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')} className="hidden md:flex">
                  <TabsList>
                    <TabsTrigger value="grid">
                      <LayoutGrid className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      <LayoutList className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button variant="outline" onClick={toggleFilters} className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" /> Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${filtersVisible ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Mobile Filters (collapsible) */}
            {filtersVisible && (
              <div className="mt-4 border-t pt-4 md:hidden">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={500}
                    step={10}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Categories</h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-xs" onClick={selectAllCategories}>
                        Select All
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs" onClick={clearCategoryFilters}>
                        Clear
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-mobile-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => toggleCategory(category, checked as boolean)}
                        />
                        <label 
                          htmlFor={`category-mobile-${category}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category} ({categoryCount[category] || 0})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Desktop Sidebar Filters */}
            <div className="hidden md:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">Filters</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <Slider
                      defaultValue={[priceRange[0], priceRange[1]]}
                      max={500}
                      step={10}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Categories</h4>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={selectAllCategories}
                        >
                          Select All
                        </Button>
                        {selectedCategories.length > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={clearCategoryFilters}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 max-h-80 overflow-auto pr-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`desktop-category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => toggleCategory(category, checked as boolean)}
                          />
                          <label 
                            htmlFor={`desktop-category-${category}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category} ({categoryCount[category] || 0})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Clear All Filters Button */}
                  <Button 
                    variant="outline" 
                    className="w-full mt-6" 
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Display */}
            <div className="md:col-span-3">
              {/* Product Count */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
                  {Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
                </p>
                
                {/* Mobile Clear All Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAllFilters}
                  className="md:hidden"
                >
                  Clear All Filters
                </Button>
              </div>
              
              {productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-square bg-muted rounded-md"></div>
                      <div className="space-y-2 mt-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No Products Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentProducts.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="sm:w-48 h-48">
                        <img 
                          src={product.image || "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop";
                          }}
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="text-sm text-muted-foreground">{product.category}</div>
                          <Link to={`/products/${product.id}`}>
                            <h3 className="font-semibold text-lg hover:text-primary">{product.name}</h3>
                          </Link>
                          <p className="text-muted-foreground mt-2">{product.description}</p>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                          <Button>Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {sortedProducts.length > 0 && totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          aria-disabled={currentPage === 1}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                        let pageNumber = i + 1;
                        if (totalPages > 5) {
                          if (currentPage <= 3) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                          } else {
                            pageNumber = currentPage - 2 + i;
                          }
                        }
                        
                        return (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => handlePageChange(pageNumber)}
                              isActive={currentPage === pageNumber}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                          aria-disabled={currentPage === totalPages}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shop;
