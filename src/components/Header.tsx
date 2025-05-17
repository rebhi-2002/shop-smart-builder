
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, User, Search, Heart, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-accent/90 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          <span className="font-medium">FREE SHIPPING</span> on orders over $50 | Use code <span className="font-bold">WELCOME10</span> for 10% off your first order!
        </div>
      </div>
      
      {/* Top Bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-bold text-2xl">StyleMart</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex gap-2 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:inline-block">
                    {user.name?.split(' ')[0] || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                
                {user.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/products">Products</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/orders">Orders</Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                    <Link to="/account/orders" className="flex items-center py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                      </svg>
                      My Orders
                    </Link>
                  </div>
                  
                  {user ? (
                    <div className="pt-4 border-t mt-4">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      
                      <Link to="/account/profile" className="flex items-center py-2">
                        <User className="h-5 w-5 mr-2" />
                        My Profile
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link to="/admin" className="flex items-center py-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="3" y1="9" x2="21" y2="9"></line>
                            <line x1="9" y1="21" x2="9" y2="9"></line>
                          </svg>
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t mt-4">
                      <Button asChild className="w-full mb-2">
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/register">Create Account</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="border-t border-b hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `py-3 inline-block font-medium hover:text-primary transition-colors ${
                      isActive ? 'text-primary border-b-2 border-primary' : ''
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
