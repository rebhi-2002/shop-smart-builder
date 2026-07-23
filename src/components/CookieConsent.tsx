import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'stylemart-cookie-consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const decide = (choice: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 md:bottom-4 z-50 px-4">
      <div className="mx-auto max-w-3xl rounded-xl border bg-background/95 backdrop-blur shadow-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Cookie className="h-6 w-6 text-primary shrink-0" />
        <p className="text-sm flex-1">
          We use cookies to enhance your browsing experience, personalize content, and analyze site traffic.
          By clicking Accept, you consent to our use of cookies.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="ghost" onClick={() => decide('declined')}>Decline</Button>
          <Button size="sm" onClick={() => decide('accepted')}>Accept</Button>
        </div>
        <button
          aria-label="Close"
          className="absolute right-2 top-2 sm:hidden text-muted-foreground"
          onClick={() => decide('declined')}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
