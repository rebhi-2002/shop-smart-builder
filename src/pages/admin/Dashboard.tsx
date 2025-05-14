
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { Loader2, ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, requireAuth } = useAuth();
  
  // Authorize the user
  useEffect(() => {
    requireAuth('admin');
  }, [requireAuth]);
  
  // Fetch products for stats
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: productService.getProducts,
    enabled: !!user && isAdmin,
  });

  if (isLoadingProducts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Mock data for dashboard statistics
  const stats = {
    totalSales: 24895.50,
    orders: 142,
    customers: 87,
    averageOrderValue: 175.32,
    lowStockItems: products.filter(p => p.stock && p.stock < 10).length,
    topCategories: getTopCategories(products),
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground">
              +12 since yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <p className="text-xs text-muted-foreground">
              +5 new customers this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Order ID</th>
                  <th className="text-left py-2">Customer</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-right py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">#ORD-5392</td>
                  <td className="py-2">John Doe</td>
                  <td className="py-2 text-right">$125.99</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">#ORD-5391</td>
                  <td className="py-2">Sarah Smith</td>
                  <td className="py-2 text-right">$259.45</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">#ORD-5390</td>
                  <td className="py-2">Michael Johnson</td>
                  <td className="py-2 text-right">$89.99</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">#ORD-5389</td>
                  <td className="py-2">Emily Wilson</td>
                  <td className="py-2 text-right">$432.20</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button className="text-sm text-primary hover:underline" onClick={() => navigate('/admin/orders')}>
                View All Orders
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>Low Stock Items</span>
                <span className="font-bold">{stats.lowStockItems}</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-red-500 rounded-full" 
                  style={{ 
                    width: `${Math.min(100, (stats.lowStockItems / 10) * 100)}%` 
                  }}
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Top Categories</h4>
              <ul className="space-y-2">
                {stats.topCategories.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.count} products</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-center mt-6">
              <button className="text-sm text-primary hover:underline" onClick={() => navigate('/admin/products')}>
                Manage Products
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function to get top categories from products
function getTopCategories(products: any[]) {
  const categoryCounts: Record<string, number> = {};
  
  products.forEach(product => {
    if (product.category) {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    }
  });
  
  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export default Dashboard;
