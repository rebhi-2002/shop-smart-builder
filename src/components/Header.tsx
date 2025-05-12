
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Search, ShoppingCart, Heart, User, 
  Menu, X, ChevronDown, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { productService } from '@/services/productService';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories
  });
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileSearchVisible(false);
    }
  };
  
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white'
    }`}>
      {/* Top Bar - Announcements & Promos */}
      <div className="bg-primary text-white text-center text-sm py-1.5">
        <div className="container mx-auto px-4">
          Free shipping on orders over $50 | Use code <span className="font-semibold">WELCOME10</span> for 10% off your first order
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Menu Button (Mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col space-y-4 mt-6">
                <SheetClose asChild>
                  <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">Home</Link>
                </SheetClose>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase">Categories</h3>
                  {categories.map(category => (
                    <SheetClose key={category} asChild>
                      <Link 
                        to={`/categories/${category}`} 
                        className="block py-1 hover:text-primary transition-colors"
                      >
                        {category}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                
                <SheetClose asChild>
                  <Link to="/products" className="hover:text-primary transition-colors">All Products</Link>
                </SheetClose>
                
                {isAuthenticated ? (
                  <>
                    <SheetClose asChild>
                      <Link to="/account" className="hover:text-primary transition-colors">My Account</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/account/orders" className="hover:text-primary transition-colors">My Orders</Link>
                    </SheetClose>
                    <Button 
                      variant="outline" 
                      onClick={logout}
                      className="justify-start px-0"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link to="/login" className="hover:text-primary transition-colors">Log In</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/register" className="hover:text-primary transition-colors">Register</Link>
                    </SheetClose>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex-shrink-0">
            ShopHub
          </Link>
          
          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full flex">
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          {/* Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search Icon (Mobile) */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
            >
              {mobileSearchVisible ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
            
            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium">Welcome, {user?.displayName || user?.email}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" /> My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account/orders" className="w-full cursor-pointer">
                        <Package className="mr-2 h-4 w-4" /> My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="w-full cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" /> Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="w-full cursor-pointer">Log In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="w-full cursor-pointer">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Mobile Search (Expandable) */}
        {mobileSearchVisible && (
          <div className="md:hidden py-3 border-t">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
                autoFocus
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
      
      {/* Navigation Bar */}
      <nav className="hidden md:block border-y">
        <div className="container mx-auto px-4">
          <ul className="flex items-center h-10">
            <li className="mr-6">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `text-sm font-medium ${isActive ? 'text-primary' : 'hover:text-primary transition-colors'}`
                }
              >
                Home
              </NavLink>
            </li>
            
            <li className="mr-6 relative group">
              <NavLink 
                to="/categories" 
                className={({ isActive }) => 
                  `text-sm font-medium flex items-center ${isActive ? 'text-primary' : 'hover:text-primary transition-colors'}`
                }
              >
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </NavLink>
              
              <div className="absolute left-0 top-full hidden group-hover:block bg-white border shadow-md rounded-md min-w-40 z-10">
                <div className="py-1">
                  {categories.map(category => (
                    <Link 
                      key={category}
                      to={`/categories/${category}`}
                      className="block px-4 py-2 text-sm hover:bg-muted"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            
            <li className="mr-6">
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `text-sm font-medium ${isActive ? 'text-primary' : 'hover:text-primary transition-colors'}`
                }
              >
                All Products
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/deals" 
                className={({ isActive }) => 
                  `text-sm font-medium ${isActive ? 'text-primary' : 'hover:text-primary transition-colors'}`
                }
              >
                Deals
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
