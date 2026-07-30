import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from '@/components/ui/sonner';
import { trackBeginCheckout } from '@/lib/analytics';
import SEO from '@/components/SEO';
import { formatMoney, formatPrice, STORE_CURRENCY, FREE_SHIPPING_THRESHOLD } from "@/lib/currency";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const isLoading = useCartStore((state) => state.isLoading);
  const getCheckoutUrl = useCartStore((state) => state.getCheckoutUrl);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
    trackBeginCheckout(subtotal, items.reduce((n, i) => n + i.quantity, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items.length === 0) return null;

  const subtotal = items.reduce((total, item) => total + parseFloat(item.price.amount) * item.quantity, 0);
  const currencyCode = items[0]?.price.currencyCode || STORE_CURRENCY;
  const shipping = subtotal >= 50 ? 0 : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleProceed = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else {
      toast.error('Checkout is not ready. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO title="Checkout" description="Review your order and complete your purchase securely with Shopify." path="/checkout" noindex />
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Secure Shopify Checkout</CardTitle>
              <CardDescription>
                Your cart is ready. Click below to complete payment through Shopify's secure checkout.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Encrypted & secure</p>
                  <p className="text-sm text-muted-foreground">All transactions are protected by Shopify's PCI-compliant infrastructure.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
                  <p className="text-sm text-muted-foreground">Shipping options are calculated in Shopify checkout.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">30-day returns</p>
                  <p className="text-sm text-muted-foreground">Not happy? Return within 30 days for a full refund.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" asChild>
            <Link to="/cart" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" /> Back to Cart
            </Link>
          </Button>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.variantId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate max-w-[70%]">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{formatMoney(parseFloat(item.price.amount) * item.quantity, currencyCode)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatMoney(subtotal, currencyCode)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatMoney(tax, currencyCode)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Estimated Total</span>
                  <span>{formatMoney(total, currencyCode)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleProceed} disabled={isLoading}>
                {isLoading ? (
                  <span className="animate-pulse">Preparing checkout…</span>
                ) : (
                  <><ExternalLink className="mr-2 h-4 w-4" /> Complete Purchase with Shopify</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
