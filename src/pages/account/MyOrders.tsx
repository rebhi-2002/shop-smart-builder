
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

// This would be replaced by a real API call
const fetchOrders = async (): Promise<Order[]> => {
  // Simulate API request
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return [
    {
      id: 'ORD-1234',
      date: '2025-05-10',
      total: 329.97,
      status: 'delivered',
      items: [
        { id: '1', name: 'Wireless Headphones', quantity: 1, price: 249.99 },
        { id: '3', name: 'Organic Cotton T-Shirt', quantity: 1, price: 29.99 },
        { id: '5', name: 'Stainless Steel Water Bottle', quantity: 1, price: 34.99 }
      ]
    },
    {
      id: 'ORD-5678',
      date: '2025-05-01',
      total: 139.97,
      status: 'shipped',
      items: [
        { id: '7', name: 'Yoga Mat', quantity: 1, price: 49.99 },
        { id: '8', name: 'Ceramic Coffee Mug', quantity: 2, price: 24.99 }
      ]
    },
    {
      id: 'ORD-9012',
      date: '2025-04-15',
      total: 199.99,
      status: 'delivered',
      items: [
        { id: '2', name: 'Smart Watch', quantity: 1, price: 199.99 }
      ]
    }
  ];
};

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 text-white';
    case 'processing':
      return 'bg-blue-500 text-white';
    case 'shipped':
      return 'bg-purple-500 text-white';
    case 'delivered':
      return 'bg-green-500 text-white';
    case 'cancelled':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: !!user
  });

  if (!user) {
    navigate('/login', { state: { from: '/account/orders' } });
    return null;
  }
  
  return (
    <div className="container max-w-4xl py-10">
      <div className="pb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">View and track your order history</p>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-48 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle>Order #{order.id}</CardTitle>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>
                  Placed on {new Date(order.date).toLocaleDateString()} • ${order.total.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-2">
                  <p className="font-bold text-lg">Total: ${order.total.toFixed(2)}</p>
                  <Button size="sm" className="mt-2 sm:mt-0">
                    View Order Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-16">
          <CardContent>
            <div className="flex flex-col items-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-medium mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyOrders;
