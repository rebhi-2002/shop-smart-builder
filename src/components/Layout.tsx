import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import ScrollToTop from './ScrollToTop';
import ExitIntentPopup from './ExitIntentPopup';
import ErrorBoundary from './ErrorBoundary';
import CookieConsent from './CookieConsent';
import AnalyticsTracker from './AnalyticsTracker';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <AnalyticsTracker />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
      <MobileBottomNav />
      <ExitIntentPopup />
      <CookieConsent />
    </div>
  );
};

export default Layout;
