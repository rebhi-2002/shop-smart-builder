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
import RecentlyViewed from '@/components/RecentlyViewed';
import { useCart, useWishlist, useRecentlyViewed } from '@/hooks/useCart';
import { Product } from '@/contexts/CartContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Slider } from '@/components/ui/slider';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [productImages, setProductImages] = useState<string[]>([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { toast } = useToast();
  
  // Get product details
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id || ''),
    enabled: !!id,
  });
  
  // Get related products
  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['relatedProducts', id],
    queryFn: () => productService.getRelatedProducts(id || ''),
    enabled: !!id,
  });
  
  // Generate and set product images when product loads
  useEffect(() => {
    if (product) {
      // Create unique image URLs for this product using its ID for cache-busting
      const images = [
        product.image,
        `https://source.unsplash.com/random/600x600?${product.category.toLowerCase()}&id=${product.id}&v=1`,
        `https://source.unsplash.com/random/600x600?${product.category.toLowerCase()}&id=${product.id}&v=2`,
        `https://source.unsplash.com/random/600x600?${product.category.toLowerCase()}&id=${product.id}&v=3`
      ];
      
      setProductImages(images);
      setActiveImage(images[0]);
      addToRecentlyViewed(product);
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
  
  // Sample specifications based on product category
  const getProductSpecs = (product: Product) => {
    const baseSpecs = {
      Brand: product.seller || 'Generic',
      'Model Number': `${product.category.substring(0, 3)}-${Math.floor(Math.random() * 1000)}`,
      'Warranty': '2 years limited',
    };
    
    if (product.category === 'Electronics') {
      return {
        ...baseSpecs,
        'Dimensions': '10 x 5 x 2 inches',
        'Weight': '1.2 lbs',
        'Battery Life': '12 hours',
        'Connectivity': 'Bluetooth 5.0, USB-C',
        'Material': 'Aluminum and plastic',
        'Color': 'Silver/Black',
      };
    } else if (product.category === 'Fashion') {
      return {
        ...baseSpecs,
        'Material': '100% Cotton',
        'Care': 'Machine washable',
        'Origin': 'Imported',
        'Fit': 'Regular fit',
        'Color': 'Multiple options',
        'Size': 'S, M, L, XL available',
      };
    } else if (product.category === 'Home') {
      return {
        ...baseSpecs,
        'Material': 'Eco-friendly',
        'Dimensions': 'Various sizes available',
        'Care': 'Wipe clean with damp cloth',
        'Assembly': 'Required',
        'Style': 'Contemporary',
        'Color': 'Multiple options',
      };
    }
    
    return baseSpecs;
  };
  
  const specs = product.specs || getProductSpecs(product);
  
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
          <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-lg mb-4 bg-muted/20">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <div 
                key={index}
                className={`aspect-square border rounded cursor-pointer overflow-hidden ${
                  activeImage === img ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveImage(img)}
              >
                <img 
                  src={img} 
                  alt={`${product.name} - Image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
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
          
          {/* Product details tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            
            <TabsContent value="specs" className="py-4">
              <dl className="divide-y">
                {Object.entries(specs).length > 0 ? (
                  Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 py-2 text-sm">
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="col-span-2">{String(value)}</dd>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-muted-foreground">
                    <p>No specifications available for this product.</p>
                  </div>
                )}
              </dl>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-4">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{product.rating?.toFixed(1) || '0.0'}</div>
                    <div className="flex justify-center my-2 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-current" 
                          fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Based on {product.reviews || 0} reviews</div>
                  </div>
                  
                  <div className="flex-1 space-y-2 w-full">
                    {[5, 4, 3, 2, 1].map((star) => {
                      // Calculate percentage for each star rating (mock data)
                      const percent = star === 5 ? 60 :
                                     star === 4 ? 25 :
                                     star === 3 ? 10 :
                                     star === 2 ? 4 :
                                     1;
                      return (
                        <div key={star} className="flex items-center gap-4">
                          <div className="flex items-center w-16">
                            <span className="text-sm mr-1">{star}</span>
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          </div>
                          <div className="w-full max-w-md">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-amber-400" 
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground w-10">{percent}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <Button variant="outline" className="w-full">Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
      
      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
};

export default ProductDetails;
