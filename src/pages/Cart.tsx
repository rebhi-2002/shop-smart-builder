import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Minus, RefreshCcw, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, applyPromoCode, promoDiscount, activePromoCode } = useCart();
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemNameToDelete, setItemNameToDelete] = useState<string | null>(null);
  
  const openDeleteDialog = (productId: string, productName: string) => {
    setItemToDelete(productId);
    setItemNameToDelete(productName);
  };
  
  const closeDeleteDialog = () => {
    setItemToDelete(null);
    setItemNameToDelete(null);
  };
  
  const confirmRemove = () => {
    if (itemToDelete && itemNameToDelete) {
      removeFromCart(itemToDelete);
      toast.success("Item Removed", {
        description: `${itemNameToDelete} has been removed from your cart.`,
        icon: <Trash2 className="h-4 w-4 text-red-500" />
      });
      closeDeleteDialog();
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }
    
    const success = applyPromoCode(promoCode);
    if (success) {
      toast.success(`Promo code ${promoCode.toUpperCase()} applied successfully!`);
      setPromoCode('');
    } else {
      toast.error('Invalid promo code');
    }
  };
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const shipping = 0; // Free shipping
  const tax = getTotalPrice() * 0.07;
  const finalTotal = getTotalPrice() * 1.07;
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[50vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild>
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              layout
              className="w-full"
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="w-full sm:w-48 h-48">
                    <Link to={`/products/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>
                  
                  {/* Product Info */}
                  <CardContent className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <Link to={`/products/${item.id}`} className="hover:underline">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => openDeleteDialog(item.id, item.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
          
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/products" className="flex items-center">
                <RefreshCcw className="mr-2 h-4 w-4" /> Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({activePromoCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </motion.div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Promo Code</h4>
                <div className="flex">
                  <Input 
                    placeholder="Enter code" 
                    className="rounded-r-none"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button 
                    variant="secondary" 
                    className="rounded-l-none"
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </Button>
                </div>
                {activePromoCode && (
                  <p className="text-green-600 text-sm mt-1">
                    {activePromoCode} ({(promoDiscount * 100).toFixed(0)}% off) applied
                  </p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="bg-muted/30 px-6 py-4 text-sm text-muted-foreground flex flex-col items-start space-y-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure checkout
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                Free shipping on orders over $50
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                30-day returns
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!itemToDelete} onOpenChange={() => closeDeleteDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{itemNameToDelete}" from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cart;
