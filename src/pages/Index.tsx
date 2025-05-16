
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, X } from 'lucide-react';
import FeaturedProducts from '../components/FeaturedProducts';
import TrendingProducts from '../components/TrendingProducts';
import NewArrivals from '../components/NewArrivals';
import RecentlyViewed from '../components/RecentlyViewed';

// Promotional deals data
const promotionalDeals = [
  { name: "Summer Sale", discount: "20% OFF", code: "SUMMER20", color: "bg-gradient-to-r from-orange-500 to-amber-500" },
  { name: "New Customer", discount: "15% OFF", code: "WELCOME15", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { name: "Weekend Special", discount: "10% OFF", code: "WEEKEND10", color: "bg-gradient-to-r from-purple-500 to-pink-500" }
];

const Index = () => {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [activePromotion, setActivePromotion] = useState(0);

  // Copy promo code to clipboard
  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Promo code ${code} copied to clipboard!`);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Featured Deal Banner - Enhanced version */}
      {isAnnouncementVisible && (
        <div className={`${promotionalDeals[activePromotion].color} mb-8 rounded-lg overflow-hidden shadow-lg`}>
          <div className="flex flex-col md:flex-row items-center justify-between p-6 text-white">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-4 p-3 bg-white/20 rounded-full">
                <Percent className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{promotionalDeals[activePromotion].name}</h3>
                <p className="text-sm opacity-90">Limited time offer - Don't miss out!</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-3xl font-bold">{promotionalDeals[activePromotion].discount}</div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 px-3 py-1 rounded font-mono">{promotionalDeals[activePromotion].code}</div>
                <Button 
                  variant="secondary" 
                  onClick={() => copyPromoCode(promotionalDeals[activePromotion].code)}
                  className="whitespace-nowrap"
                >
                  Copy Code
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white/10 px-6 py-2 text-sm text-center text-white/90">
            <button 
              onClick={() => setIsAnnouncementVisible(false)} 
              className="absolute right-4 top-4 text-white hover:text-white/80"
              aria-label="Close announcement"
            >
              <X className="h-4 w-4" />
            </button>
            Use code at checkout • Free shipping on orders over $50 • Valid until end of month
          </div>
        </div>
      )}

      <section className="py-6">
        <h1 className="text-4xl font-bold mb-2">Welcome to ShopApp</h1>
        <p className="text-lg text-muted-foreground mb-8">Discover amazing products at great prices</p>
      </section>

      <FeaturedProducts title="Featured Products" />
      <TrendingProducts />
      <NewArrivals />
      <RecentlyViewed />
    </div>
  );
};

export default Index;
