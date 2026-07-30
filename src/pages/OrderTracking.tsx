import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Circle, Package, Truck, Home, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import { formatPrice } from '@/lib/currency';

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', id!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Order not found</h1>
        <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
        <Button asChild><Link to="/track-order">Track another order</Link></Button>
      </div>
    );
  }

  const currentIndex = Math.max(0, STATUS_STEPS.findIndex((s) => s.key === order.status));

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <SEO title={`Order ${order.order_number}`} description="Track your order status and delivery." path={`/order/${id}`} noindex />

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Order {order.order_number}</h1>
        <p className="text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between mb-6">
            {STATUS_STEPS.map((step, i) => {
              const Icon = step.icon;
              const done = i <= currentIndex;
              return (
                <div key={step.key} className="flex flex-col items-center flex-1 relative">
                  {i > 0 && (
                    <div
                      className={`absolute top-4 right-1/2 w-full h-0.5 ${
                        i <= currentIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                  <div
                    className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center ${
                      done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </div>
                  <span className="text-xs mt-2 text-center">{step.label}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-sm">
            <span>Status</span>
            <Badge>{order.status}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="font-semibold mb-4">Items</h2>
          <div className="space-y-3">
            {(order.order_items as any[])?.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.product_name} × {item.quantity}</span>
                <span className="font-medium">{formatPrice(Number(item.subtotal))}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(Number(order.total))}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button asChild variant="outline"><Link to="/products">Continue Shopping</Link></Button>
        <Button asChild><Link to="/account/orders">My Orders</Link></Button>
      </div>
    </div>
  );
};

export default OrderTracking;
