import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Search } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import SEO from '@/components/SEO';

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      toast.error('Please enter your order number');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .eq('order_number', orderNumber.trim())
      .maybeSingle();
    setLoading(false);
    if (error || !data) {
      toast.error('Order not found. Please check your order number.');
      return;
    }
    navigate(`/order/${data.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <SEO title="Track Your Order" description="Enter your order number to track shipping and delivery status." path="/track-order" />
      <div className="text-center mb-8">
        <Package className="h-12 w-12 text-primary mx-auto mb-3" />
        <h1 className="text-3xl font-bold">Track Your Order</h1>
        <p className="text-muted-foreground mt-2">
          Enter your order number to see the latest status
        </p>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Order Number</label>
              <Input
                placeholder="e.g. ORD-12345"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email (optional)</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              {loading ? 'Searching...' : 'Track Order'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackOrder;
