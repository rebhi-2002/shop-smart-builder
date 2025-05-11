
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, ChevronRight, Star, Plus, Minus } from 'lucide-react';
import { productService } from '@/services/productService';
import { useCart } from '@/hooks/useCart';
import ProductCard from '@/components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Get product details
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id || ''),
    enabled: !!id,
  });
  
  // Get products from the same category
  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  
  // Find related products (same category, excluding current product)
  const relatedProducts = product 
    ? allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to Cart",
        description: `${quantity} × ${product.name} has been added to your cart.`,
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-64"></div>
            <div className="h-6 bg-muted rounded w-96"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/products">Browse All Products</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            <Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            <Link to={`/categories/${product.category}`} className="text-muted-foreground hover:text-foreground">
              {product.category}
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            <span className="font-medium">{product.name}</span>
          </li>
        </ol>
      </nav>
      
      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="bg-muted/20 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(12 reviews)</span>
          </div>
          
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="pt-4 space-y-4">
            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              Free shipping on orders over $50
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (12)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="py-6">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="specs" className="py-6">
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-3 font-medium">Material</td>
                <td className="py-3 text-muted-foreground">Premium Quality</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Dimensions</td>
                <td className="py-3 text-muted-foreground">10 x 5 x 3 inches</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Weight</td>
                <td className="py-3 text-muted-foreground">0.5 lbs</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Color</td>
                <td className="py-3 text-muted-foreground">Multiple options</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Warranty</td>
                <td className="py-3 text-muted-foreground">1 year limited</td>
              </tr>
            </tbody>
          </table>
        </TabsContent>
        
        <TabsContent value="reviews" className="py-6">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium">Customer {i}</p>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(2023, 5 + i, 10).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Great product! Exactly what I was looking for and arrived quickly.
                  The quality exceeded my expectations and I would definitely purchase again.
                </p>
              </Card>
            ))}
            
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <Button asChild variant="ghost">
              <Link to={`/categories/${product.category}`}>
                View All
              </Link>
            </Button>
          </div>
          
          <div className="product-grid">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
