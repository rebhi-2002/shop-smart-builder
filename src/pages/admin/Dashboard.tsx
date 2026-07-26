import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { productService } from '@/services/productService';
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

interface OrderRow {
  id: string;
  order_number: string | null;
  status: string;
  total: number;
  created_at: string;
  customer_name: string | null;
  user_id: string | null;
}

const statusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-success text-success-foreground hover:bg-success';
    case 'shipped':
    case 'processing':
      return 'bg-primary text-primary-foreground hover:bg-primary';
    case 'cancelled':
      return 'bg-destructive text-destructive-foreground hover:bg-destructive';
    default:
      return 'bg-warning text-warning-foreground hover:bg-warning';
  }
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: productService.getProducts,
  });

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['adminDashboardOrders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, order_number, status, total, created_at, customer_name, user_id')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as OrderRow[];
    },
  });

  const paidOrders = orders.filter((o) => o.status !== 'cancelled');
  const totalSales = paidOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const avgOrderValue = paidOrders.length ? totalSales / paidOrders.length : 0;
  const customers = new Set(
    orders.map((o) => o.user_id || o.customer_name).filter(Boolean)
  ).size;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const sumBetween = (from: Date, to: Date) =>
    paidOrders
      .filter((o) => {
        const d = new Date(o.created_at);
        return d >= from && d < to;
      })
      .reduce((s, o) => s + Number(o.total || 0), 0);
  const thisMonth = sumBetween(monthStart, now);
  const lastMonth = sumBetween(prevMonthStart, monthStart);
  const growth = lastMonth ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

  const lowStock = products.filter((p) => (p.stock ?? 0) < 10);

  const topCategories = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      if (p.category) acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const statusBreakdown = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const cards = [
    {
      title: 'Total Sales',
      value: `$${totalSales.toFixed(2)}`,
      hint: lastMonth
        ? `${growth >= 0 ? '+' : ''}${growth.toFixed(0)}% vs last month`
        : 'All-time revenue',
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: orders.length.toString(),
      hint: `${statusBreakdown['pending'] || 0} pending`,
      icon: ShoppingBag,
    },
    {
      title: 'Customers',
      value: customers.toString(),
      hint: 'Unique buyers',
      icon: Users,
    },
    {
      title: 'Average Order Value',
      value: `$${avgOrderValue.toFixed(2)}`,
      hint: `${products.length} active products`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {cards.map(({ title, value, hint, icon: Icon }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{value}</div>
              )}
              <p className="text-xs text-muted-foreground">{hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No orders yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Order</th>
                      <th className="text-left py-2">Customer</th>
                      <th className="text-right py-2">Amount</th>
                      <th className="text-right py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 6).map((o) => (
                      <tr key={o.id} className="border-b">
                        <td className="py-2">
                          <Link to={`/order/${o.id}`} className="hover:text-primary">
                            {o.order_number || o.id.slice(0, 8)}
                          </Link>
                        </td>
                        <td className="py-2">{o.customer_name || '—'}</td>
                        <td className="py-2 text-right">
                          ${Number(o.total || 0).toFixed(2)}
                        </td>
                        <td className="py-2 text-right">
                          <Badge className={statusColor(o.status)}>{o.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-center mt-4">
              <button
                className="text-sm text-primary hover:underline"
                onClick={() => navigate('/admin/orders')}
              >
                View All Orders
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory & Catalog</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" aria-hidden="true" />
                  Low stock items
                </span>
                <span className="font-bold">{lowStock.length}</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-warning rounded-full"
                  style={{
                    width: `${products.length ? Math.min(100, (lowStock.length / products.length) * 100) : 0}%`,
                  }}
                />
              </div>
              {lowStock.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {lowStock.slice(0, 4).map((p) => (
                    <li key={p.id} className="flex justify-between">
                      <span className="truncate mr-2">{p.name}</span>
                      <span>{p.stock} left</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Orders by status</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusBreakdown).map(([status, count]) => (
                  <Badge key={status} variant="outline">
                    {status}: {count}
                  </Badge>
                ))}
                {Object.keys(statusBreakdown).length === 0 && (
                  <span className="text-sm text-muted-foreground">No data</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Top categories</h4>
              <ul className="space-y-2 text-sm">
                {topCategories.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">{item.count} products</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="text-sm text-primary hover:underline"
                onClick={() => navigate('/admin/products')}
              >
                Manage Products
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
