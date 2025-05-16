
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutGrid, Home, Store, Tag, Heart, HelpCircle, User, Grid2x2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Store, label: 'Shop', path: '/shop' },
  { icon: Grid2x2, label: 'Categories', path: '/categories' },
  { icon: Tag, label: 'Deals', path: '/deals' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: HelpCircle, label: 'Help', path: '/faq' },
];

const userNavItems = [
  { icon: User, label: 'My Account', path: '/account' },
  { icon: LayoutGrid, label: 'My Orders', path: '/account/orders' },
];

export function AppSidebar() {
  const location = useLocation();
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === 'collapsed';
  
  // Determine if a route is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <Sidebar side="left" variant="floating">
      <SidebarHeader>
        <SidebarTrigger className="self-end" />
        {!isCollapsed && (
          <div className="flex items-center px-2 py-4">
            <span className="font-bold text-lg">ShopApp</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={isCollapsed ? item.label : undefined}
                  >
                    <Link to={item.path} className="flex items-center w-full">
                      <item.icon className="h-4 w-4 mr-2" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.path)}
                    tooltip={isCollapsed ? item.label : undefined}
                  >
                    <Link to={item.path} className="flex items-center w-full">
                      <item.icon className="h-4 w-4 mr-2" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {!isCollapsed && (
          <div className="px-4 py-2 text-xs text-muted-foreground">
            © 2025 ShopApp. All rights reserved.
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
