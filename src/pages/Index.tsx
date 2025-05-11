
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { productService } from '@/services/productService';

const Index = () => {
  const [featuredCategory, setFeaturedCategory] = useState<string>('Electronics');
  
  // Get product categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
  
  // Get all products
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  // Get featured products (for hero section)
  const featuredProducts = allProducts.slice(0, 3);
  
  // Filter products by selected category for tab content
  const categoryProducts = allProducts.filter(product => 
    product.category === featuredCategory
  ).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-shop-900 to-shop-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">Shop the Latest Trends</h1>
              <p className="text-xl opacity-90">
                Discover quality products at affordable prices with fast shipping and excellent customer service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-shop-900 hover:bg-gray-100">
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative animate-fade-in">
              {featuredProducts.slice(0, 2).map((product, index) => (
                <div 
                  key={product.id}
                  className={`aspect-square overflow-hidden rounded-lg ${index === 0 ? 'col-span-2' : ''}`}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="ghost" className="group">
              <Link to="/products" className="flex items-center">
                View All 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Category Products Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          
          <Tabs defaultValue={featuredCategory} onValueChange={setFeaturedCategory}>
            <TabsList className="mb-8 flex flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="animate-fade-in">
                <div className="product-grid">
                  {allProducts
                    .filter(product => product.category === category)
                    .slice(0, 4)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button asChild variant="outline">
                    <Link to={`/categories/${category}`} className="flex items-center">
                      View All {category} <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Shop With Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-muted-foreground">We carefully select every product in our inventory to ensure the highest quality.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your orders delivered to your doorstep quickly with our express shipping.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Shop with confidence using our secure payment processing systems.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          
          <form className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 p-3 rounded-md text-foreground" 
              required 
            />
            <Button type="submit" className="bg-white text-primary hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
