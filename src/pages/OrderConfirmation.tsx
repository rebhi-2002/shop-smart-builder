
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, CheckCircle, Truck, Clock, Package, CalendarClock } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, orderData } = location.state || {};
  
  useEffect(() => {
    // If no order data was provided, redirect to home
    if (!orderNumber) {
      navigate('/');
    }
  }, [orderNumber, navigate]);
  
  if (!orderNumber || !orderData) {
    return null;
  }
  
  const { customer, items, payment, date } = orderData;
  const orderDate = new Date(date);
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days delivery estimate
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Your order has been placed and is being processed.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Number</h3>
              <p className="font-semibold">{orderNumber}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Date</h3>
              <p className="font-medium">{orderDate.toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h3>
              <p className="font-medium capitalize">{payment.method}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Status</h3>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                Processing
              </span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
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
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{customer.name}</p>
                <p>{customer.address}</p>
                <p>{customer.email}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${payment.subtotal.toFixed(2)}</span>
                </div>
                
                {payment.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${payment.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{payment.shipping > 0 ? `$${payment.shipping.toFixed(2)}` : 'Free'}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${payment.tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-base pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>${payment.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 flex flex-col items-start space-y-4">
          <div>
            <h3 className="font-medium mb-2">Estimated Delivery</h3>
            <div className="flex items-center text-sm">
              <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{estimatedDelivery.toLocaleDateString()} - {new Date(estimatedDelivery.setDate(estimatedDelivery.getDate() + 2)).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="w-full pt-4">
            <h3 className="font-medium mb-4">Order Timeline</h3>
            <ol className="relative border-l border-muted-foreground/20">
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-8 ring-white">
                  <Check className="w-3 h-3 text-green-600" />
                </span>
                <h3 className="flex items-center text-sm font-semibold">Order Placed</h3>
                <time className="block text-xs font-normal text-muted-foreground">{orderDate.toLocaleString()}</time>
                <p className="text-xs mt-1">Your order has been received and is being processed.</p>
              </li>
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                  <Package className="w-3 h-3 text-blue-600" />
                </span>
                <h3 className="text-sm font-semibold">Order Processing</h3>
                <time className="block text-xs font-normal text-muted-foreground">In progress</time>
                <p className="text-xs mt-1">We're preparing your items for shipment.</p>
              </li>
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-8 ring-white">
                  <Truck className="w-3 h-3 text-muted-foreground" />
                </span>
                <h3 className="text-sm font-semibold text-muted-foreground">Shipping</h3>
                <time className="block text-xs font-normal text-muted-foreground">Pending</time>
                <p className="text-xs mt-1">Your order will be shipped soon.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -left-3 ring-8 ring-white">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                </span>
                <h3 className="text-sm font-semibold text-muted-foreground">Delivery</h3>
                <time className="block text-xs font-normal text-muted-foreground">Estimated {estimatedDelivery.toLocaleDateString()}</time>
                <p className="text-xs mt-1">Your order is expected to arrive within 5-7 business days.</p>
              </li>
            </ol>
          </div>
        </CardFooter>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link to="/products">Continue Shopping</Link>
        </Button>
        <Button asChild>
          <Link to="/account/orders">View My Orders</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
