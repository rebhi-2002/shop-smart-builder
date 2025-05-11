
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Tags, 
  BarChart4, 
  Settings 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);
  
  if (!isAdmin) {
    return <div className="container py-10">Please log in as admin to view this page.</div>;
  }
  
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <span className="text-muted-foreground">Welcome, {user?.name}</span>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard 
            title="Total Orders" 
            value="128" 
            description="12% increase from last month"
            icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard 
            title="Total Customers" 
            value="832" 
            description="4% increase from last month"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard 
            title="Products" 
            value="24" 
            description="8 added this month"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        
        <h2 className="text-xl font-semibold mt-6">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2" onClick={() => navigate('/admin/products')}>
            <Package className="h-6 w-6 mb-1" />
            <div className="text-sm font-medium">Manage Products</div>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2" onClick={() => navigate('/admin/orders')}>
            <ShoppingCart className="h-6 w-6 mb-1" />
            <div className="text-sm font-medium">View Orders</div>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2" onClick={() => navigate('/admin/customers')}>
            <Users className="h-6 w-6 mb-1" />
            <div className="text-sm font-medium">Customer List</div>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center p-4 gap-2" onClick={() => navigate('/admin/categories')}>
            <Tags className="h-6 w-6 mb-1" />
            <div className="text-sm font-medium">Categories</div>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Daily sales performance for past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/20">
              <div className="text-muted-foreground">
                <BarChart4 className="h-16 w-16 mx-auto mb-2 opacity-70" />
                <p>Chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest store updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Product "Wireless Headphones" low on stock</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                <div>
                  <p className="text-sm font-medium">3 new customer reviews</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
