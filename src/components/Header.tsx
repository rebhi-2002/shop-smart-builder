
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, User, Search, Heart, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const { user, logout } = useAuth();
  
  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/categories', label: 'Categories' },
    { path: '/deals', label: 'Deals' },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      {/* Top Bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-bold text-2xl">ShopHub</span>
        </Link>
        
        {/* Search - Hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search products..." 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden md:flex items-center gap-1">
              <span className="text-sm">Hello, {user.name?.split(' ')[0] || 'User'}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="text-sm px-2"
              >
                Logout
              </Button>
              {user.role === 'admin' && (
                <Button asChild variant="ghost" size="sm" className="ml-1">
                  <Link to="/admin/dashboard">Admin</Link>
                </Button>
              )}
            </div>
          ) : (
            <Button asChild variant="ghost" size="icon" className="hidden md:flex">
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          <Button asChild variant="ghost" size="icon" className="hidden md:flex">
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size="icon" className="relative cart-icon">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="cart-badge cart-badge-pulse">{cartCount}</span>
              )}
            </Link>
          </Button>
          
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-full mt-6">
                <div className="space-y-3">
                  <form onSubmit={handleSearch} className="flex w-full mb-6">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search"
                        placeholder="Search products..." 
                        className="pl-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                  
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block py-2 text-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t my-4">
                    <Link to="/wishlist" className="flex items-center py-2">
                      <Heart className="h-5 w-5 mr-2" />
                      Wishlist
                    </Link>
                    <Link to="/orders" className="flex items-center py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                      </svg>
                      My Orders
                    </Link>
                  </div>
                  
                  {user ? (
                    <div className="pt-4 border-t mt-4">
                      <div className="text-sm mb-2">Signed in as <span className="font-bold">{user.email}</span></div>
                      {user.role === 'admin' && (
                        <Button asChild variant="outline" className="w-full mb-2">
                          <Link to="/admin/dashboard">Admin Dashboard</Link>
                        </Button>
                      )}
                      <Button onClick={handleLogout} className="w-full">Logout</Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t mt-4 space-y-2">
                      <Button asChild variant="default" className="w-full">
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/register">Register</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Main Navigation - Hidden on Mobile */}
      <nav className="hidden md:block border-t">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `inline-block py-3 border-b-2 ${
                      isActive 
                        ? 'border-primary text-primary font-medium' 
                        : 'border-transparent hover:text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
