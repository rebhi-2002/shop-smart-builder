import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight, ArrowRight, RotateCcw, Star, Truck, ShieldCheck, Clock, ChevronLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { productService } from '@/services/productService';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import RecentlyViewed from '@/components/RecentlyViewed';
import useEmblaCarousel from 'embla-carousel-react';

const Index = () => {
  const [featuredCategory, setFeaturedCategory] = useState<string>('Electronics');
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
  const featuredProducts = allProducts.slice(0, 8);
  
  // Get discounted products for deals section
  const discountedProducts = allProducts
    .filter(product => product.discount && product.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 6);
  
  // Filter products by selected category for tab content
  const categoryProducts = allProducts.filter(product => 
    product.category === featuredCategory
  ).slice(0, 4);

  // Hero slider images
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop",
      title: "Summer Collection",
      description: "Discover the latest trends for summer 2025",
      buttonText: "Shop Now",
      buttonLink: "/products?category=Fashion",
      color: "from-blue-900 to-blue-700"
    },
    {
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop",
      title: "Tech Deals",
      description: "Up to 40% off on the latest gadgets",
      buttonText: "View Offers",
      buttonLink: "/deals",
      color: "from-purple-900 to-purple-700"
    },
    {
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2070&auto=format&fit=crop",
      title: "Home & Living",
      description: "Transform your space with our collection",
      buttonText: "Explore",
      buttonLink: "/products?category=Home",
      color: "from-green-900 to-green-700"
    }
  ];

  // Set up autoplay for hero carousel
  useEffect(() => {
    if (emblaApi) {
      // Clear any existing interval
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
      
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000); // Auto-scroll every 5 seconds
      
      setAutoplayInterval(interval);
      
      // Clear the interval when the component unmounts
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [emblaApi]);

  // Reset the autoplay when user manually interacts with the carousel
  const handleCarouselInteraction = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      
      const interval = setInterval(() => {
        emblaApi?.scrollNext();
      }, 5000);
      
      setAutoplayInterval(interval);
    }
  };

  // Get category images for the circles
  const getCategoryImage = (category: string) => {
    switch(category) {
      case 'Electronics':
        return "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=500&auto=format&fit=crop";
      case 'Fashion':
        return "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500&auto=format&fit=crop";
      case 'Home':
        return "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=500&auto=format&fit=crop";
      default:
        return `https://source.unsplash.com/random/100x100?${category.toLowerCase()}`;
    }
  };

  return (
    <div>
      {/* Hero Carousel Section */}
      <section className="mb-8 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {heroSlides.map((slide, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0"
                onClick={handleCarouselInteraction}
              >
                <div className={`relative bg-gradient-to-r ${slide.color} text-white h-[500px] w-full rounded-lg overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-20">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-md drop-shadow-lg">{slide.description}</p>
                    <Button asChild size="lg" className="w-fit">
                      <Link to={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white"
          onClick={() => {
            emblaApi?.scrollPrev();
            handleCarouselInteraction();
          }}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 hover:bg-white"
          onClick={() => {
            emblaApi?.scrollNext();
            handleCarouselInteraction();
          }}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        
        <div className="flex justify-center mt-4 gap-2">
          {heroSlides.map((_, index) => (
            <Button 
              key={index}
              variant="ghost" 
              size="icon" 
              className={`w-3 h-3 p-0 rounded-full ${
                emblaApi?.selectedScrollSnap() === index ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => {
                emblaApi?.scrollTo(index);
                handleCarouselInteraction();
              }}
            />
          ))}
        </div>
      </section>
      
      {/* Categories Quick Links */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((category) => (
            <Link 
              key={category} 
              to={`/categories/${category}`} 
              className="flex flex-col items-center p-4 rounded-lg hover:bg-muted transition-colors text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                <img 
                  src={getCategoryImage(category)}
                  alt={category}
                  className="w-16 h-16 object-cover"
                />
              </div>
              <span className="font-medium text-sm">{category}</span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Deals Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-shop-900 to-shop-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Flash Deals</h2>
              <p className="text-white/80">Limited time offers at amazing prices</p>
            </div>
            <Button asChild variant="outline" className="bg-white text-shop-900 hover:bg-gray-100">
              <Link to="/deals" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {discountedProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative pt-[100%]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-sm">
                      ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Carousel */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button asChild variant="ghost">
            <Link to="/products" className="flex items-center">
              View All 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <Card>
                  <CardContent className="p-0">
                    <ProductCard product={product} variant="compact" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      
      {/* Category Products Section */}
      <section className="container mx-auto px-4 py-10 bg-muted/50 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        
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
      </section>
      
      {/* Banner Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden h-80">
            <img 
              src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2070&auto=format&fit=crop" 
              alt="Electronics Sale" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex flex-col justify-center p-8">
              <h3 className="text-white text-3xl font-bold mb-2">Electronics Sale</h3>
              <p className="text-white mb-4">Up to 30% off on selected items</p>
              <Button asChild className="w-fit">
                <Link to="/products?category=Electronics">Shop Now</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-80">
            <img 
              src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop" 
              alt="Fashion Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex flex-col justify-center p-8">
              <h3 className="text-white text-3xl font-bold mb-2">New Fashion</h3>
              <p className="text-white mb-4">Check out our latest collection</p>
              <Button asChild className="w-fit">
                <Link to="/products?category=Fashion">Discover</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <Truck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground text-sm">On orders over $50</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <ShieldCheck className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Secure Payment</h3>
            <p className="text-muted-foreground text-sm">100% secure payment</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <Clock className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
            <p className="text-muted-foreground text-sm">Dedicated support</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <RotateCcw className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">Easy Returns</h3>
            <p className="text-muted-foreground text-sm">30-day return policy</p>
          </div>
        </div>
      </section>
      
      {/* Best Sellers */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Button asChild variant="ghost">
            <Link to="/products?sort=popular" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="product-grid">
          {allProducts
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 4)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
      
      {/* Recently Viewed Products */}
      <RecentlyViewed />
      
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
