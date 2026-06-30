
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import ScrollToTop from './ScrollToTop';
import ExitIntentPopup from './ExitIntentPopup';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <ExitIntentPopup />
    </div>
  );
};

export default Layout;
