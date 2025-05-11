
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/sonner';
import { CreditCard, Truck, Check } from 'lucide-react';

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
});

type FormData = z.infer<typeof formSchema>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
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
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Payment Information
                    </h3>
                    
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
                        <>Complete Order • ${getTotalPrice().toFixed(2)}</>
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
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-4">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center mt-4">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
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
