
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
