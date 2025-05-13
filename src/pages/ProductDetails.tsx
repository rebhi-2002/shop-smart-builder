
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ChevronRight, 
  CircleCheck, 
  ChevronDown, 
  Truck, 
  ShieldCheck,
  Undo 
} from 'lucide-react';
import { productService } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import { useCart, useWishlist, useRecentlyViewed } from '@/hooks/useCart';
import { Product } from '@/contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { toast } = useToast();
  
  // Get product details
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id || ''),
    enabled: !!id,
  });
  
  // Get related products
  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['relatedProducts', id],
    queryFn: () => productService.getRelatedProducts(id || ''),
    enabled: !!id,
  });
  
  // Update recently viewed on product load
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      setActiveImage(product.image);
    }
  }, [product, addToRecentlyViewed]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
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
  
  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="animate-pulse bg-muted aspect-square rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-12 bg-muted rounded w-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or may have been removed.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }
  
  // Calculate discounted price if applicable
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  const inWishlist = isInWishlist(product.id);
  const specs = product.specs || {};
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link to={`/categories/${product.category}`} className="text-muted-foreground hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium truncate">{product.name}</span>
      </div>
      
      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg mb-4">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <div 
              className={`aspect-square border rounded cursor-pointer overflow-hidden ${
                activeImage === product.image ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveImage(product.image)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* More images would go here */}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Seller & Rating */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            {product.seller && (
              <div className="flex items-center text-sm">
                <span className="text-muted-foreground mr-1">Sold by:</span>
                <span className="flex items-center font-medium">
                  {product.seller} <CircleCheck className="h-4 w-4 ml-1 text-green-500" />
                </span>
              </div>
            )}
            
            <div className="flex items-center">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4 fill-current" 
                    fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-sm ml-1">
                {product.rating?.toFixed(1)} ({product.reviews || 0} reviews)
              </span>
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-start gap-3 mb-6">
            {discountedPrice ? (
              <>
                <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                <div className="flex flex-col">
                  <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  <Badge className="bg-red-500 self-start mt-1">Save {product.discount}%</Badge>
                </div>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Quantity & Add to Cart */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="mr-4 text-sm">Quantity:</div>
              <div className="flex border rounded overflow-hidden">
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock ? quantity >= product.stock : false}
                >
                  +
                </Button>
              </div>
              {product.stock && product.stock < 10 && (
                <div className="ml-4 text-sm text-amber-600">
                  Only {product.stock} left
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              
              <Button
                variant={inWishlist ? "destructive" : "outline"}
                size="lg"
                className="sm:w-auto"
                onClick={handleWishlistToggle}
              >
                <Heart className={`mr-2 h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
          </div>
          
          {/* Benefits */}
          <div className="space-y-3 border-t border-b py-4 mb-6">
            <div className="flex items-center text-sm">
              <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-sm">
              <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>2-year warranty</span>
            </div>
            <div className="flex items-center text-sm">
              <Undo className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>30-day return policy</span>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <div className="flex items-center justify-between cursor-pointer border-b py-3" onClick={() => setActiveTab(activeTab === 'description' ? '' : 'description')}>
              <h3 className="font-medium">Description</h3>
              <ChevronDown className={`h-5 w-5 transition-transform ${activeTab === 'description' ? 'rotate-180' : ''}`} />
            </div>
            {activeTab === 'description' && (
              <div className="py-3 text-muted-foreground">
                <p>{product.description}</p>
              </div>
            )}
          </div>
          
          {/* Specifications */}
          <div className="mb-4">
            <div className="flex items-center justify-between cursor-pointer border-b py-3" onClick={() => setActiveTab(activeTab === 'specs' ? '' : 'specs')}>
              <h3 className="font-medium">Specifications</h3>
              <ChevronDown className={`h-5 w-5 transition-transform ${activeTab === 'specs' ? 'rotate-180' : ''}`} />
            </div>
            {activeTab === 'specs' && (
              <div className="py-3">
                <dl className="divide-y">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 py-2 text-sm">
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="col-span-2">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
