
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/sonner';
import { CreditCard, Truck, Check, Shield, CreditCard as CreditCardIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code is required'),
  cardNumber: z.string().min(16, 'Card number is required').max(19),
  cardExpiry: z.string().min(5, 'Expiration date is required (MM/YY)'),
  cardCvc: z.string().min(3, 'CVC is required').max(4),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getTotalPrice, clearCart, promoDiscount, activePromoCode } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal'>('credit-card');
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = subtotal * promoDiscount;
  const shipping = 0; // Free shipping
  const tax = getTotalPrice() * 0.1;
  const finalTotal = getTotalPrice() * 1.1;
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      notes: '',
    }
  });
  
  const onSubmit = async (data: FormData) => {
    // Simulate payment processing
    setIsProcessing(true);
    
    // In a real app, this would send the data to Stripe or another payment processor
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulating successful payment
    toast.success('Payment successful! Your order is being processed.');
    clearCart();
    navigate('/order-confirmation');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart before checking out.</p>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Checkout Details</CardTitle>
              <CardDescription>Complete your order by providing your shipping and payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Truck className="mr-2 h-5 w-5" /> Shipping Information
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Special instructions for delivery or other notes" 
                              className="resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Payment Method
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Button
                        type="button"
                        variant={paymentMethod === 'credit-card' ? "default" : "outline"}
                        className="flex items-center justify-center gap-2"
                        onClick={() => setPaymentMethod('credit-card')}
                      >
                        <CreditCardIcon className="h-4 w-4" />
                        Credit Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === 'paypal' ? "default" : "outline"}
                        className="flex items-center justify-center gap-2"
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <svg 
                          className="h-4 w-6" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.4 13.5H5.6C5.3 13.5 5 13.3 4.9 13L3 6C3 5.7 3.2 5.4 3.5 5.4H5.6C5.9 5.4 6.2 5.6 6.3 5.9L8.2 12.9C8.3 13.2 8 13.5 7.4 13.5Z" fill="currentColor"/>
                          <path d="M12.9 13.5H11C10.7 13.5 10.4 13.3 10.3 13L8.4 6C8.4 5.7 8.6 5.4 8.9 5.4H11C11.3 5.4 11.6 5.6 11.7 5.9L13.6 12.9C13.6 13.2 13.3 13.5 12.9 13.5Z" fill="currentColor"/>
                          <path d="M14.3 10.1L13.7 7.2C13.5 6 14.4 4.9 15.6 4.9H21C21.3 4.9 21.6 5.2 21.5 5.5L19.2 14.8C19.1 15 18.9 15.1 18.6 15.1H15.5C14.2 15.2 13 14.2 12.8 13C12.7 11.9 13.3 10.8 14.3 10.1Z" fill="currentColor"/>
                          <path d="M11.9 10.1L11.3 7.2C11.1 6 12 4.9 13.2 4.9H18.6C18.9 4.9 19.2 5.2 19.1 5.5L16.7 14.8C16.6 15 16.4 15.1 16.1 15.1H13.1C11.7 15.2 10.6 14.2 10.4 13C10.3 11.9 10.9 10.8 11.9 10.1Z" fill="currentColor"/>
                          <path d="M6.4 10.1L5.8 7.2C5.6 6 6.5 4.9 7.7 4.9H13.1C13.4 4.9 13.7 5.2 13.6 5.5L11.3 14.8C11.2 15 11 15.1 10.7 15.1H7.6C6.3 15.2 5.1 14.2 4.9 13C4.8 11.9 5.4 10.8 6.4 10.1Z" fill="currentColor"/>
                        </svg>
                        PayPal
                      </Button>
                    </div>
                    
                    {paymentMethod === 'credit-card' && (
                      <>
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardExpiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiration Date (MM/YY)</FormLabel>
                                <FormControl>
                                  <Input placeholder="12/25" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cardCvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}
                    
                    {paymentMethod === 'paypal' && (
                      <div className="bg-muted p-4 rounded text-center">
                        <p>You will be redirected to PayPal to complete your purchase securely.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing Payment...</>
                      ) : (
                        <>Complete Order • ${finalTotal.toFixed(2)}</>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your items before completing checkout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-muted">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col border-t pt-6">
              <div className="space-y-2 w-full">
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
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-4">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center mt-4">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <span>Secure checkout powered by Stripe</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
