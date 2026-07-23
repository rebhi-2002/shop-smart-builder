import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import ScrollToTop from './ScrollToTop';
import ExitIntentPopup from './ExitIntentPopup';
import ErrorBoundary from './ErrorBoundary';
import CookieConsent from './CookieConsent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
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

