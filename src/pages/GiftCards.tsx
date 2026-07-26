import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Gift, Mail, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';

const AMOUNTS = [25, 50, 100, 200];

const GiftCards: React.FC = () => {
  const [amount, setAmount] = useState(50);
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient) {
      toast.error('Please enter the recipient email');
      return;
    }
    toast.success(`$${amount} gift card queued for ${recipient}`);
    setRecipient('');
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Gift Cards — StyleMart"
        description="Send a StyleMart digital gift card by email. Choose an amount, add a message, delivered instantly."
        path="/gift-cards"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">StyleMart Gift Cards</h1>
        <p className="text-muted-foreground mb-8">
          The easiest gift to get right. Delivered by email, never expires.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <CardContent className="p-8 flex flex-col justify-between h-full min-h-[240px]">
              <Gift className="h-10 w-10" aria-hidden="true" />
              <div>
                <p className="text-sm opacity-90">StyleMart Gift Card</p>
                <p className="text-4xl font-bold">${amount}</p>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="mb-2 block">Amount</Label>
              <div className="flex flex-wrap gap-2">
                {AMOUNTS.map((a) => (
                  <Button
                    key={a}
                    type="button"
                    variant={a === amount ? 'default' : 'outline'}
                    onClick={() => setAmount(a)}
                    className="min-w-[72px]"
                  >
                    ${a}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="recipient" className="mb-2 block">Recipient email</Label>
              <Input
                id="recipient"
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="friend@example.com"
              />
            </div>

            <div>
              <Label htmlFor="message" className="mb-2 block">Message (optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy birthday!"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Continue to checkout
            </Button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mt-12">
          {[
            { icon: Mail, title: 'Instant delivery', text: 'Sent by email within minutes.' },
            { icon: ShieldCheck, title: 'Never expires', text: 'Use it whenever you like.' },
            { icon: Gift, title: 'Any product', text: 'Redeemable across the whole store.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3 items-start">
              <Icon className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
