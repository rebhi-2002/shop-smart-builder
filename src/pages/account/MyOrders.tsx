
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import RecentlyViewed from '@/components/RecentlyViewed';

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
    image?: string;
  }[];
  address?: string;
  tracking?: string;
  paymentMethod?: string;
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
        { id: '1', name: 'Wireless Headphones', quantity: 1, price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070' },
        { id: '3', name: 'Organic Cotton T-Shirt', quantity: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964' },
        { id: '5', name: 'Stainless Steel Water Bottle', quantity: 1, price: 34.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974' }
      ],
      address: '123 Main St, New York, NY 10001',
      tracking: 'TRK12345678',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-5678',
      date: '2025-05-01',
      total: 139.97,
      status: 'shipped',
      items: [
        { id: '7', name: 'Yoga Mat', quantity: 1, price: 49.99, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820' },
        { id: '8', name: 'Ceramic Coffee Mug', quantity: 2, price: 24.99, image: 'https://images.unsplash.com/photo-1577937927133-3bbfa3dfd628?q=80&w=1974' }
      ],
      address: '456 Elm St, Los Angeles, CA 90001',
      tracking: 'TRK87654321',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-9012',
      date: '2025-04-15',
      total: 199.99,
      status: 'delivered',
      items: [
        { id: '2', name: 'Smart Watch', quantity: 1, price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999' }
      ],
      address: '789 Oak St, Chicago, IL 60007',
      tracking: 'TRK11223344',
      paymentMethod: 'Credit Card'
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

const getStatusStep = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 1;
    case 'processing':
      return 2;
    case 'shipped':
      return 3;
    case 'delivered':
      return 4;
    case 'cancelled':
      return 0;
    default:
      return 1;
  }
};

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: !!user
  });

  React.useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/account/orders' } });
    }
  }, [user, navigate]);

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };
  
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
                      <div className="flex items-center">
                        {item.image && (
                          <div className="w-10 h-10 rounded overflow-hidden mr-3">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-2">
                  <p className="font-bold text-lg">Total: ${order.total.toFixed(2)}</p>
                  <Button size="sm" className="mt-2 sm:mt-0" onClick={() => viewOrderDetails(order)}>
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

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder?.date && new Date(selectedOrder.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Order Status Progress */}
            {selectedOrder && selectedOrder.status !== 'cancelled' && (
              <div className="py-4">
                <h3 className="font-medium mb-4">Order Status</h3>
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs">Placed</span>
                    <span className="text-xs">Processing</span>
                    <span className="text-xs">Shipped</span>
                    <span className="text-xs">Delivered</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full w-full">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-300" 
                      style={{ width: `${(getStatusStep(selectedOrder.status) / 4) * 100}%` }} 
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className={`h-4 w-4 rounded-full ${getStatusStep(selectedOrder.status) >= 1 ? 'bg-primary' : 'bg-muted-foreground'}`} style={{ marginLeft: '-2px' }}></div>
                    <div className={`h-4 w-4 rounded-full ${getStatusStep(selectedOrder.status) >= 2 ? 'bg-primary' : 'bg-muted-foreground'}`} style={{ marginLeft: '-2px' }}></div>
                    <div className={`h-4 w-4 rounded-full ${getStatusStep(selectedOrder.status) >= 3 ? 'bg-primary' : 'bg-muted-foreground'}`} style={{ marginLeft: '-2px' }}></div>
                    <div className={`h-4 w-4 rounded-full ${getStatusStep(selectedOrder.status) >= 4 ? 'bg-primary' : 'bg-muted-foreground'}`} style={{ marginRight: '-2px' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Order Status</h3>
                <Badge className={selectedOrder ? getStatusColor(selectedOrder.status) : ''}>
                  {selectedOrder?.status.charAt(0).toUpperCase()}{selectedOrder?.status.slice(1)}
                </Badge>
                
                {selectedOrder?.tracking && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Tracking Number</p>
                    <p className="text-muted-foreground">{selectedOrder.tracking}</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Shipping Address</h3>
                <p className="text-muted-foreground">{selectedOrder?.address || 'No address provided'}</p>
                
                <div className="mt-4">
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-muted-foreground">{selectedOrder?.paymentMethod || 'Unknown payment method'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Order Items</h3>
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3">Product</th>
                      <th className="text-center p-3">Quantity</th>
                      <th className="text-right p-3">Price</th>
                      <th className="text-right p-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder?.items.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-3">
                          <div className="flex items-center">
                            {item.image && (
                              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="text-center p-3">{item.quantity}</td>
                        <td className="text-right p-3">${item.price.toFixed(2)}</td>
                        <td className="text-right p-3">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t font-medium">
                      <td colSpan={3} className="text-right p-3">Subtotal:</td>
                      <td className="text-right p-3">${selectedOrder?.total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right p-3">Shipping:</td>
                      <td className="text-right p-3">Free</td>
                    </tr>
                    <tr className="font-bold">
                      <td colSpan={3} className="text-right p-3">Total:</td>
                      <td className="text-right p-3">${selectedOrder?.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <DialogFooter className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
              {selectedOrder && ['shipped', 'processing'].includes(selectedOrder.status) && (
                <Button>Track Order</Button>
              )}
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Recently Viewed */}
      <div className="mt-10">
        <RecentlyViewed variant="minimal" />
      </div>
    </div>
  );
};

export default MyOrders;
