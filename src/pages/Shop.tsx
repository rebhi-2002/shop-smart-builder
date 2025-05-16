
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

// Constants
const PRICE_RANGE = [0, 500];
const DEFAULT_CATEGORIES = ["Clothing", "Accessories", "Home & Kitchen", "Fashion", "Fitness", "Beauty", "Books", "Toys", "Sports", "Automotive"];

// Category images
const categoryImages = {
  "Clothing": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
  "Accessories": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1989&auto=format&fit=crop",
  "Home & Kitchen": "https://images.unsplash.com/photo-1545082161-9a334a53cf14?q=80&w=2070&auto=format&fit=crop",
  "Fashion": "https://images.unsplash.com/photo-1559070081-648fb00b2ed1?q=80&w=2070&auto=format&fit=crop",
  "Fitness": "https://images.unsplash.com/photo-1607008829749-c0f284a49805?q=80&w=2070&auto=format&fit=crop",
  "Beauty": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2008&auto=format&fit=crop",
  "Books": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2073&auto=format&fit=crop",
  "Toys": "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop",
  "Sports": "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop",
  "Automotive": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2069&auto=format&fit=crop"
};

// Promotional deals data
const promotionalDeals = [
  { name: "Summer Sale", discount: "20% OFF", code: "SUMMER20", color: "bg-gradient-to-r from-orange-500 to-amber-500" },
  { name: "New Customer", discount: "15% OFF", code: "WELCOME15", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { name: "Weekend Special", discount: "10% OFF", code: "WEEKEND10", color: "bg-gradient-to-r from-purple-500 to-pink-500" }
];

// Add sample products for empty categories
export const addSampleProducts = () => {
  const emptyCategoryProducts = [
    // Add products for Clothing
    {
      id: "clothing-1",
      name: "Classic T-Shirt",
      price: 19.99,
      description: "Comfortable cotton t-shirt with a modern fit",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      category: "Clothing",
      rating: 4.5
    },
    // Add product for Accessories
    {
      id: "accessories-1",
      name: "Leather Watch",
      price: 59.99,
      description: "Elegant leather watch with stainless steel case",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1989&auto=format&fit=crop",
      category: "Accessories",
      rating: 4.8
    },
    // Add product for Home & Kitchen
    {
      id: "home-kitchen-1",
      name: "Coffee Maker",
      price: 79.99,
      description: "Programmable coffee maker with thermal carafe",
      image: "https://images.unsplash.com/photo-1545082161-9a334a53cf14?q=80&w=2070&auto=format&fit=crop",
      category: "Home & Kitchen",
      rating: 4.3
    },
    // Add product for Fashion
    {
      id: "fashion-1",
      name: "Designer Sunglasses",
      price: 129.99,
      description: "UV protection sunglasses with polarized lenses",
      image: "https://images.unsplash.com/photo-1559070081-648fb00b2ed1?q=80&w=2070&auto=format&fit=crop",
      category: "Fashion",
      rating: 4.9
    },
    // Add product for Fitness
    {
      id: "fitness-1",
      name: "Yoga Mat",
      price: 29.99,
      description: "Non-slip yoga mat with carrying strap",
      image: "https://images.unsplash.com/photo-1607008829749-c0f284a49805?q=80&w=2070&auto=format&fit=crop",
      category: "Fitness",
      rating: 4.7
    },
    // Add product for Beauty
    {
      id: "beauty-1",
      name: "Skincare Set",
      price: 49.99,
      description: "Complete facial skincare routine set",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2008&auto=format&fit=crop",
      category: "Beauty",
      rating: 4.6
    },
    // Add product for Books
    {
      id: "book-1",
      name: "Bestseller Novel",
      price: 24.99,
      description: "Award-winning fiction novel, hardcover edition",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2073&auto=format&fit=crop",
      category: "Books",
      rating: 4.8
    },
    // Add product for Toys
    {
      id: "toys-1",
      name: "Educational Robot Kit",
      price: 39.99,
      description: "Build your own robot with this STEM learning kit",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop",
      category: "Toys",
      rating: 4.9
    },
    // Add product for Sports
    {
      id: "sports-1",
      name: "Basketball",
      price: 29.99,
      description: "Official size and weight basketball",
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop",
      category: "Sports",
      rating: 4.7
    },
    // Add product for Automotive
    {
      id: "automotive-1",
      name: "Car Cleaning Kit",
      price: 34.99,
      description: "Complete car wash and detailing set",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2069&auto=format&fit=crop",
      category: "Automotive",
      rating: 4.5
    }
  ];
  
  return emptyCategoryProducts;
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}

const Shop = () => {
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState<number[]>([...PRICE_RANGE]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  // Fetch data
  const { data: allProducts = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  const { data: fetchedCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
  
  // Add sample products to ensure no empty categories
  const allProductsWithSamples = React.useMemo(() => {
    const sampleProducts = addSampleProducts();
    const existingCategories = new Set(allProducts.map(p => p.category));
    
    // Only add sample products for categories that don't have products
    const filteredSamples = sampleProducts.filter(
      product => !existingCategories.has(product.category)
    );
    
    return [...allProducts, ...filteredSamples];
  }, [allProducts]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Filter products based on selected categories, search, and price range
  const filteredProducts = allProductsWithSamples.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const searchMatch = product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
    const priceMatch = product.price >= price[0] && product.price <= price[1];
    return categoryMatch && searchMatch && priceMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shop</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />

        {/* Price Range Filter */}
        <div className="w-full md:w-64">
          <h3 className="text-sm font-medium mb-2">Price Range: ${price[0]} - ${price[1]}</h3>
          <Slider
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={10}
            defaultValue={PRICE_RANGE}
            value={price}
            onValueChange={(value) => setPrice(value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_CATEGORIES.map(category => (
            <Button
              key={category}
              variant="outline"
              className={cn(
                "rounded-full",
                selectedCategories.includes(category) ? "bg-primary text-primary-foreground" : "hover:bg-secondary hover:text-secondary-foreground"
              )}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <CardTitle className="text-lg">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-24 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </CardContent>
              <CardFooter>
                <div className="h-8 bg-gray-300 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="bg-card text-card-foreground shadow-md transition-colors duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold truncate">{product.name}</CardTitle>
                <CardDescription className="text-gray-500 truncate">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-md mb-4 w-full h-32 object-cover"
                />
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <Badge variant="secondary">{product.category}</Badge>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4">
                <span className="text-xl font-bold">${product.price}</span>
                <Button onClick={() => navigate(`/product/${product.id}`)}>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
