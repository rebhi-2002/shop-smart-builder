import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const items = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: RotateCcw, title: '30-Day Returns', desc: 'Hassle-free returns' },
  { icon: ShieldCheck, title: 'Secure Checkout', desc: 'SSL & PCI compliant' },
  { icon: Headphones, title: '24/7 Support', desc: 'We are here to help' },
];

const TrustBar: React.FC = () => (
  <section aria-label="Customer guarantees" className="border-y bg-muted/30">
    <div className="container mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{title}</div>
            <div className="text-xs text-muted-foreground truncate">{desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBar;
