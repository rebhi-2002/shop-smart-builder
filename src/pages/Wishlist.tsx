
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ChevronRight, ShoppingCart, Trash } from 'lucide-react';
import { useWishlist } from '@/hooks/useCart';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been moved to your cart.`,
      });
    }
  };
  
  const handleRemove = (productId: string) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      removeFromWishlist(productId);
      
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Wishlist</span>
        </div>
      </div>
      
      {wishlistItems.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add items to your wishlist to save them for later.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </Card>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">{wishlistItems.length} item(s)</p>
          </div>
          
          <div className="grid gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="border rounded-lg flex flex-col sm:flex-row overflow-hidden">
                <div className="w-full sm:w-48 h-48">
                  <Link to={`/products/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between">
                      <Link to={`/products/${item.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary">{item.name}</h3>
                      </Link>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemove(item.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mt-1">{item.category}</div>
                    <p className="text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      {item.discount ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => handleAddToCart(item.id)}
                      className="ml-auto"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
