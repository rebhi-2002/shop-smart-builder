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
import { toast } from "@/components/ui/sonner";
import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [productImages, setProductImages] = useState<string[]>([]);
  const [showWishlistAlert, setShowWishlistAlert] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { toast: uiToast } = useToast();
  
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
  
  // Create actual generated product images when product loads
  useEffect(() => {
    if (product) {
      // Use different image sources to create real product images
      const categoryKeywords = {
        'Electronics': ['gadget', 'tech', 'device', 'electronic'],
        'Fashion': ['clothing', 'fashion', 'style', 'apparel'],
        'Home': ['furniture', 'decor', 'interior', 'home']
      };
      
      const keywords = categoryKeywords[product.category as keyof typeof categoryKeywords] || ['product'];
      const baseKeyword = keywords[0];
      
      // Generate unique URLs for each image
      const images = [
        product.image,
        `https://source.unsplash.com/featured/?${baseKeyword},${product.name.split(' ')[0]}&sig=${product.id}1`,
        `https://source.unsplash.com/featured/?${keywords[1] || baseKeyword},${product.category}&sig=${product.id}2`,
        `https://source.unsplash.com/featured/?${keywords[2] || baseKeyword},${product.name.split(' ')[0]}&sig=${product.id}3`
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
      // Create animation effect
      const button = document.querySelector('#add-to-cart-button');
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Create the bubble element
        const bubble = document.createElement('div');
        bubble.className = 'fixed z-50 flex items-center justify-center w-12 h-12 bg-primary rounded-full text-white shadow-lg';
        bubble.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>';
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        bubble.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
        
        document.body.appendChild(bubble);
        
        // Get cart icon position
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
          const cartRect = cartIcon.getBoundingClientRect();
          const cartX = cartRect.left + cartRect.width / 2;
          const cartY = cartRect.top + cartRect.height / 2;
          
          // Animate bubble to cart
          setTimeout(() => {
            bubble.style.transform = 'scale(0.5)';
            bubble.style.left = `${cartX}px`;
            bubble.style.top = `${cartY}px`;
            
            // Remove bubble after animation
            setTimeout(() => {
              bubble.style.transform = 'scale(0)';
              setTimeout(() => {
                document.body.removeChild(bubble);
              }, 200);
            }, 500);
          }, 10);
        }
      }
      
      addToCart(product, quantity);
      
      toast("Added to Cart", {
        description: `${quantity} × ${product.name} has been added to your cart.`,
        action: {
          label: "View Cart",
          onClick: () => window.location.href = "/cart"
        },
        icon: <ShoppingCart className="h-4 w-4 text-green-500" />
      });
    }
  };
  
  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      setShowWishlistAlert(true);
    } else {
      addToWishlist(product);
      
      toast("Added to Wishlist", {
        description: `${product.name} has been added to your wishlist.`,
        action: {
          label: "View Wishlist",
          onClick: () => window.location.href = "/wishlist"
        },
        icon: <Heart className="h-4 w-4 text-red-500 fill-red-500" />
      });
    }
  };
  
  const confirmRemoveFromWishlist = () => {
    if (product) {
      removeFromWishlist(product.id);
      setShowWishlistAlert(false);
      
      toast("Removed from Wishlist", {
        description: `${product.name} has been removed from your wishlist.`,
        icon: <Heart className="h-4 w-4 text-gray-500" />
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-lg mb-4 bg-muted/20">
              <motion.img 
                key={activeImage}
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </AspectRatio>
          </motion.div>
          
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <motion.div 
                key={index}
                className={`aspect-square border rounded cursor-pointer overflow-hidden ${
                  activeImage === img ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveImage(img)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={img} 
                  alt={`${product.name} - Image ${index + 1}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = product.image;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <motion.h1 
            className="text-3xl font-bold mb-2" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {product.name}
          </motion.h1>
          
          {/* Seller & Rating */}
          <motion.div 
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
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
          </motion.div>
          
          {/* Price */}
          <motion.div 
            className="flex items-start gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
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
          </motion.div>
          
          {/* Quantity & Add to Cart */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
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
              <motion.div 
                className="flex-1" 
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  id="add-to-cart-button"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </motion.div>
              
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  variant={inWishlist ? "destructive" : "outline"}
                  size="lg"
                  className="sm:w-auto w-full"
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`mr-2 h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Benefits */}
          <motion.div 
            className="space-y-3 border-t border-b py-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
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
          </motion.div>
          
          {/* Product details tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
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
          </motion.div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
      
      {/* Recently Viewed */}
      <RecentlyViewed />
      
      {/* Wishlist Confirmation Dialog */}
      <AlertDialog open={showWishlistAlert} onOpenChange={setShowWishlistAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Wishlist?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{product.name}" from your wishlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveFromWishlist} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductDetails;
