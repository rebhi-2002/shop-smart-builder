
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { LayoutGrid, LayoutList, Search as SearchIcon, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import { productService } from '@/services/productService';
import RecentlyViewed from '@/components/RecentlyViewed';

const PAGE_SIZE = 8;

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm(query);
  }, [query]);
  
  // Get all products
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  // Filter products based on search query
  const filteredProducts = allProducts.filter(product => {
    if (!query) return true;
    
    const searchLower = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
      (product.seller && product.seller.toLowerCase().includes(searchLower))
    );
  });
  
  // Paginate results
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-4">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium">Search</span>
      </div>
      
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Search Products</h1>
        {query && (
          <p className="text-muted-foreground mt-2">
            {filteredProducts.length} results for "{query}"
          </p>
        )}
      </div>
      
      {/* Search Form */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex max-w-xl">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none">
            <SearchIcon className="h-4 w-4 mr-2" /> Search
          </Button>
        </form>
      </div>
      
      {/* Results Display */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-medium">
            {filteredProducts.length > 0
              ? `${filteredProducts.length} products found`
              : 'No products found'}
          </h2>
        </div>
        
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')}>
          <TabsList>
            <TabsTrigger value="grid">
              <LayoutGrid className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <LayoutList className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Products Display */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-muted rounded-md"></div>
              <div className="space-y-2 mt-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No Products Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search to find what you're looking for.
          </p>
          <Button onClick={() => setSearchParams({})}>
            Clear Search
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedProducts.map((product: Product) => (
            <div key={product.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="sm:w-48 h-48">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
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
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage === 1 ? (
                  <PaginationPrevious 
                    className="pointer-events-none opacity-50"
                    onClick={() => {}}
                  />
                ) : (
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                  />
                )}
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)} 
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                {currentPage === totalPages ? (
                  <PaginationNext 
                    className="pointer-events-none opacity-50"
                    onClick={() => {}}
                  />
                ) : (
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
};

export default Search;
