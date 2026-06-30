import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Gift } from 'lucide-react';

const STORAGE_KEY = 'exit_intent_shown_v1';
const CODE = 'WELCOME10';

const ExitIntentPopup: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      localStorage.setItem(STORAGE_KEY, '1');
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    // Mobile fallback — after 45s of scrolling/interaction
    const fallback = window.setTimeout(trigger, 45000);

    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.clearTimeout(fallback);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      toast.success(`Code ${CODE} copied!`);
    } catch {
      toast.message(`Use code ${CODE} at checkout`);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <Gift className="h-7 w-7" />
          </div>
          <DialogTitle className="text-center text-2xl">Wait! Here's 10% off</DialogTitle>
          <DialogDescription className="text-center">
            Don't leave empty-handed. Use the code below at checkout for 10% off your first order.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 border-2 border-dashed border-primary rounded-lg py-4 text-center">
          <div className="text-xs text-muted-foreground mb-1">YOUR CODE</div>
          <div className="text-2xl font-bold tracking-widest text-primary">{CODE}</div>
        </div>
        <Button onClick={copy} className="w-full h-12 text-base font-semibold">
          Copy code & keep shopping
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
