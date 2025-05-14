
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from "@/components/ui/sonner";
import { ShoppingCart, Heart, Share2, ChevronRight, Star, Info, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check, ChevronLeft, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { productService } from '@/services/productService';
import { useCart, useWishlist } from '@/hooks/useCart';
import { Product } from '@/contexts/CartContext';
import RelatedProducts from '@/components/RelatedProducts';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import Reviews from '@/components/Reviews';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Fetch product details
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id || ''),
  });
  
  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
      setCurrentImageIndex(0);
      setIsAddedToCart(false);
      
      // Add to recently viewed (store in local storage)
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const updatedRecentlyViewed = [
        product,
        ...recentlyViewed.filter((item: Product) => item.id !== product.id)
      ].slice(0, 6); // Keep only latest 6 items
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
    }
  }, [product]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 mx-2" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-4 mx-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button onClick={() => navigate('/products')}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </div>
    );
  }
  
  // Product images - use additional images if available, or replicate main image
  const productImages = product.additionalImages && product.additionalImages.length > 0
    ? [product.image, ...product.additionalImages]
    : [product.image, product.image, product.image, product.image];
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    // Check if required options are selected
    if ((product.colors && product.colors.length > 0 && !selectedColor) || 
        (product.sizes && product.sizes.length > 0 && !selectedSize)) {
      toast.error("Please select all required options");
      return;
    }
    
    // Create product with selected options
    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity
    };
    
    addToCart(productToAdd, quantity);
    
    // Show animation
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    
    toast("Added to Cart", {
      description: `${product.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => navigate('/cart')
      },
      icon: <ShoppingCart className="h-4 w-4 text-green-500" />
    });
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast("Removed from Wishlist", {
        description: `${product.name} has been removed from your wishlist.`,
        icon: <Heart className="h-4 w-4 text-gray-500" />
      });
    } else {
      addToWishlist(product);
      toast("Added to Wishlist", {
        description: `${product.name} has been added to your wishlist.`,
        action: {
          label: "View Wishlist",
          onClick: () => navigate('/wishlist')
        },
        icon: <Heart className="h-4 w-4 text-red-500 fill-red-500" />
      });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      })
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast("Link Copied", {
        description: "Product link copied to clipboard!",
        icon: <Share2 className="h-4 w-4 text-blue-500" />
      });
    }
  };
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <a href="/" className="text-muted-foreground hover:text-foreground">Home</a>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <a href="/products" className="text-muted-foreground hover:text-foreground">Products</a>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <a href={`/categories/${product.category}`} className="text-muted-foreground hover:text-foreground">
          {product.category}
        </a>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden border">
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <img 
                src={productImages[currentImageIndex]} 
                alt={product.name} 
                className="object-cover w-full h-full product-image-zoom"
              />
            </AspectRatio>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className={`aspect-square rounded-md overflow-hidden border cursor-pointer 
                  ${index === currentImageIndex ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          {/* Price */}
          <div className="flex items-end mt-2 mb-4">
            {discountedPrice ? (
              <>
                <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
                <Badge 
                  className="ml-2 bg-red-500 text-white px-2 py-0.5 text-sm rounded"
                >
                  {product.discount}% OFF
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-5 w-5 fill-current" 
                  fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <span className="ml-2">
              {product.rating ? product.rating.toFixed(1) : '0.0'} 
              ({product.reviews || 0} reviews)
            </span>
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground mb-6">
            {product.description}
          </p>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => {
                  // Convert color names to hex or use the value directly if it's a hex code
                  const colorValue = color.startsWith('#') 
                    ? color
                    : getColorHex(color);
                    
                  return (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full relative ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                      }`}
                      style={{ backgroundColor: colorValue }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    >
                      {selectedColor === color && (
                        <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-3 py-2 border rounded-md ${
                      selectedSize === size 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'hover:border-primary'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(1)}
                disabled={product.stock && quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
              
              {product.stock && product.stock < 10 && (
                <span className="ml-4 text-sm text-amber-600">
                  Only {product.stock} items left
                </span>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              className="flex-1" 
              size="lg" 
              onClick={handleAddToCart}
              disabled={isAddedToCart || (product.stock === 0)}
            >
              {isAddedToCart ? (
                <>
                  <Check className="mr-2 h-5 w-5" /> Added to Cart
                </>
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12"
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Product Info */}
          <div className="border rounded-md divide-y">
            {product.seller && (
              <div className="flex items-start p-3">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                <div>
                  <span className="font-medium">Sold by:</span> {product.seller}
                </div>
              </div>
            )}
            
            <div className="flex items-start p-3">
              <Truck className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <span className="font-medium">Free delivery</span>
                <div className="text-sm text-muted-foreground">Orders over $50 qualify for free shipping</div>
              </div>
            </div>
            
            <div className="flex items-start p-3">
              <RotateCcw className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <span className="font-medium">Easy returns</span>
                <div className="text-sm text-muted-foreground">30 day return policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full border-b">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="py-6">
            <div className="prose max-w-none">
              <p>{product.longDescription || product.description}</p>
              
              {/* Sample content when long description is not available */}
              {!product.longDescription && (
                <>
                  <h3>Product Features</h3>
                  <ul>
                    <li>High-quality materials ensure durability and longevity</li>
                    <li>Ergonomic design for comfort and functionality</li>
                    <li>Versatile application for various settings</li>
                    <li>Modern aesthetic that complements any environment</li>
                    <li>Easy to use and maintain</li>
                  </ul>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="py-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
                <div className="space-y-2">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 border-b py-2">
                        <span className="font-medium">{key}</span>
                        <span>{String(value)}</span>
                      </div>
                    ))
                  ) : (
                    // Sample specifications if none provided
                    <>
                      <div className="grid grid-cols-2 border-b py-2">
                        <span className="font-medium">Dimensions</span>
                        <span>10 x 5 x 2 inches</span>
                      </div>
                      <div className="grid grid-cols-2 border-b py-2">
                        <span className="font-medium">Weight</span>
                        <span>1.2 lbs</span>
                      </div>
                      <div className="grid grid-cols-2 border-b py-2">
                        <span className="font-medium">Material</span>
                        <span>Premium quality</span>
                      </div>
                      <div className="grid grid-cols-2 border-b py-2">
                        <span className="font-medium">Origin</span>
                        <span>Imported</span>
                      </div>
                      <div className="grid grid-cols-2 border-b py-2">
                        <span className="font-medium">Warranty</span>
                        <span>1 year</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Package Includes</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>1 x {product.name}</li>
                  <li>User Manual</li>
                  <li>Warranty Card</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="py-6">
            <Reviews productId={product.id} rating={product.rating || 0} reviewCount={product.reviews || 0} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <Separator className="my-12" />
      <RelatedProducts category={product.category} currentProductId={product.id} />
    </div>
  );
};

// Helper function to convert common color names to hex
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#FFFF00',
    purple: '#800080',
    pink: '#FFC0CB',
    orange: '#FFA500',
    gray: '#808080',
    brown: '#A52A2A',
    navy: '#000080',
    teal: '#008080',
    beige: '#F5F5DC',
  };
  
  return colorMap[colorName.toLowerCase()] || colorName;
}

// Missing Badge component reference
const Badge = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className || ''}`} 
      {...props}
    >
      {children}
    </span>
  );
};

export default ProductDetails;
