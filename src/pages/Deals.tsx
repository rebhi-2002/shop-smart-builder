
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { productService } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import RecentlyViewed from '@/components/RecentlyViewed';
import { toast } from "@/components/ui/sonner";

const Deals = () => {
  const { data: discountedProducts = [], isLoading } = useQuery({
    queryKey: ['discountedProducts'],
    queryFn: productService.getDiscountedProducts,
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deals & Special Offers</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Deals</span>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-shop-900 to-shop-700 text-white rounded-lg overflow-hidden mb-12">
        <div className="p-8 md:p-12 md:w-3/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Save Big with Our Special Discounts
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Explore our limited-time offers, flash sales, and exclusive discounts on a wide range of products.
          </p>
          <Button asChild size="lg" className="bg-white text-shop-900 hover:bg-gray-100">
            <Link to="/products?discount=true">View All Deals</Link>
          </Button>
        </div>
        <div className="hidden md:block absolute right-0 top-0 h-full w-2/5 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-shop-900/30"></div>
        </div>
      </div>
      
      {/* Current Deals */}
      <div id="deals" className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Current Deals</h2>
          <Button asChild variant="outline">
            <Link to="/products?discount=true">View All Deals</Link>
          </Button>
        </div>
        
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
        ) : discountedProducts.length > 0 ? (
          <div className="product-grid">
            {discountedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">No deals currently available</h3>
            <p className="text-muted-foreground mb-4">
              Check back soon for new deals and promotions.
            </p>
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Promo Codes Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Available Promo Codes</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-6 bg-primary/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl">WELCOME10</h3>
                <p className="text-muted-foreground">For new customers</p>
              </div>
              <div className="bg-primary text-white text-sm font-medium px-2 py-1 rounded">10% OFF</div>
            </div>
            <p className="mb-4">Get 10% off your first order when you sign up for our newsletter.</p>
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText('WELCOME10');
              toast("Code Copied", {
                description: "WELCOME10 has been copied to your clipboard."
              });
            }}>
              Copy Code
            </Button>
          </div>
          
          <div className="border rounded-lg p-6 bg-primary/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl">SUMMER20</h3>
                <p className="text-muted-foreground">Seasonal offer</p>
              </div>
              <div className="bg-primary text-white text-sm font-medium px-2 py-1 rounded">20% OFF</div>
            </div>
            <p className="mb-4">Summer special! Take 20% off select seasonal items.</p>
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText('SUMMER20');
              toast("Code Copied", {
                description: "SUMMER20 has been copied to your clipboard."
              });
            }}>
              Copy Code
            </Button>
          </div>
          
          <div className="border rounded-lg p-6 bg-primary/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl">FREESHIP</h3>
                <p className="text-muted-foreground">Limited time</p>
              </div>
              <div className="bg-primary text-white text-sm font-medium px-2 py-1 rounded">15% OFF</div>
            </div>
            <p className="mb-4">Get 15% off and free shipping on orders $75+.</p>
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText('FREESHIP');
              toast("Code Copied", {
                description: "FREESHIP has been copied to your clipboard."
              });
            }}>
              Copy Code
            </Button>
          </div>
        </div>
      </div>
      
      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
};

export default Deals;
