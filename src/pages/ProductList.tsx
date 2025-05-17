
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Filter, Search, ChevronDown, ChevronRight, LayoutGrid, LayoutList, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { productService } from '@/services/productService';
import { toast } from "sonner";
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';

// Promotional deals data
const promotionalDeals = [
  {
    name: "Summer Sale",
    discount: "20% OFF",
    code: "SUMMER20",
    color: "bg-gradient-to-r from-orange-500 to-amber-500"
  },
  {
    name: "New Customer",
    discount: "15% OFF",
    code: "WELCOME15",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500"
  },
  {
    name: "Weekend Special",
    discount: "10% OFF",
    code: "WEEKEND10",
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    name: "Flash Sale",
    discount: "25% OFF",
    code: "FLASH25",
    color: "bg-gradient-to-r from-green-500 to-emerald-500"
  },
  {
    name: "Loyalty Reward",
    discount: "Free Shipping",
    code: "LOYALTY",
    color: "bg-gradient-to-r from-red-500 to-pink-400"
  }
];

const ProductList = () => {
  const location = useLocation();
  const { category: categoryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const productsPerPage = 9;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Get categories from URL params
  const categoryParams = searchParams.getAll('category');
  
  // Initialize selected categories from URL params or category route param
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [decodeURIComponent(categoryParam)] : categoryParams.map(param => decodeURIComponent(param))
  );

  // Rotate through promotional deals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDealIndex((prevIndex) => (prevIndex + 1) % promotionalDeals.length);
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
  }, [searchQuery, priceRange, selectedCategories]);
  
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
  
  // Get all products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  // Get categories for filtering - including new ones
  const { data: fetchedCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
  
  // Add some additional categories that might not be in the API
  const categories = [...new Set([
    ...fetchedCategories,
    "Electronics",
    "Fashion",
    "Home",
    "Beauty", 
    "Books", 
    "Toys", 
    "Sports", 
    "Automotive"
  ])].sort();
  
  // Filter products based on search, category, and price
  const filteredProducts = products.filter(product => {
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
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFiltersWithoutReload({ q: searchQuery });
  };
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  // Handle category selection with checkbox (allows multiple selections) - fixed to prevent reload
  const handleCategoryToggle = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
      
    setSelectedCategories(newCategories);
  };
  
  // Select all categories
  const selectAllCategories = () => {
    setSelectedCategories(categories);
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
  
  // Handle adding product to cart
  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
      navigate('/cart');
    }
  };
  
  // Copy promo code to clipboard
  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Promo code ${code} copied to clipboard!`);
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {categoryParam ? decodeURIComponent(categoryParam) : 'All Products'}
        </h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
          {categoryParam && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
              <span className="font-medium">{decodeURIComponent(categoryParam)}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Promotional Deals Carousel */}
      <div className="mb-8 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {promotionalDeals.map((deal, index) => (
            <motion.div
              key={deal.code}
              className={`${deal.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer`}
              onClick={() => copyPromoCode(deal.code)}
              initial={{ opacity: 0.7, scale: 0.95 }}
              animate={{ 
                opacity: index === currentDealIndex ? 1 : 0.7,
                scale: index === currentDealIndex ? 1 : 0.95,
                y: index === currentDealIndex ? -5 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-medium uppercase tracking-wider">{deal.name}</p>
              <h3 className="text-2xl font-bold mt-1">{deal.discount}</h3>
              <div className="mt-3 flex items-center">
                <span className="text-xs bg-white/20 px-2 py-1 rounded">CODE: {deal.code}</span>
                <span className="ml-2 text-xs">Click to copy</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Selected Category Tags */}
      {selectedCategories.length > 0 && !categoryParam && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Filtered by:</span>
            {selectedCategories.map(category => (
              <Badge key={category} variant="outline" className="flex items-center gap-1">
                {category}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleCategoryToggle(category, false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {selectedCategories.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={clearCategoryFilters}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Search and Filters Bar */}
      <div className="bg-card rounded-lg shadow-sm border p-4 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex">
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
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-mobile-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                    />
                    <label 
                      htmlFor={`category-mobile-${category}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-8">
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
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`desktop-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                      />
                      <label 
                        htmlFor={`desktop-category-${category}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
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
        
        {/* Products Grid */}
        <div className={`md:col-span-3 lg:col-span-4 ${viewMode === 'list' ? 'space-y-4' : ''}`}>
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
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-grid">
              {currentProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => handleAddToCart(product.id)}
                />
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
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-muted-foreground mt-2">{product.description}</p>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <Button onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
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
                    // Show first page, last page, current page, and pages around current
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
    </div>
  );
};

export default ProductList;
