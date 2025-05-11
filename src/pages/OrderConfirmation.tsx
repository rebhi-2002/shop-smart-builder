
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const orderDate = new Date().toLocaleDateString();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  return (
    <div className="container max-w-4xl mx-auto py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-xl text-muted-foreground">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Number</h3>
            <p className="text-lg font-semibold">{orderNumber}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Order Date</h3>
            <p className="text-lg font-semibold">{orderDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
            <p className="text-lg font-semibold">user@example.com</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h3>
            <p className="text-lg font-semibold">Credit Card (ending in 3456)</p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Order Status</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted"></div>
          
          <div className="relative flex items-start gap-4 pb-8">
            <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-muted"></div>
            <div className="h-16 w-16 shrink-0 rounded-full bg-green-100 flex items-center justify-center z-10">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="pt-3">
              <h3 className="font-medium">Order Confirmed</h3>
              <p className="text-muted-foreground">{orderDate}</p>
              <p className="mt-1">Your order has been received and is being processed.</p>
            </div>
          </div>
          
          <div className="relative flex items-start gap-4 pb-8">
            <div className="h-16 w-16 shrink-0 rounded-full bg-muted flex items-center justify-center z-10">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="pt-3">
              <h3 className="font-medium">Processing</h3>
              <p className="text-muted-foreground">Pending</p>
              <p className="mt-1">We're preparing your items for shipment.</p>
            </div>
          </div>
          
          <div className="relative flex items-start gap-4 pb-8">
            <div className="h-16 w-16 shrink-0 rounded-full bg-muted flex items-center justify-center z-10">
              <Truck className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="pt-3">
              <h3 className="font-medium">Shipped</h3>
              <p className="text-muted-foreground">Pending</p>
              <p className="mt-1">Your order is on its way to you.</p>
            </div>
          </div>
          
          <div className="relative flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 rounded-full bg-muted flex items-center justify-center z-10">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="pt-3">
              <h3 className="font-medium">Delivered</h3>
              <p className="text-muted-foreground">Expected by {estimatedDelivery}</p>
              <p className="mt-1">You'll receive a confirmation when delivered.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/account/orders">View Order History</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
