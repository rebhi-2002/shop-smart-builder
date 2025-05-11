
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  
  const cartItemCount = cartItems.length;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Search for:', searchQuery);
    // Navigate to search results page
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">ShopEase</span>
            </Link>
          </div>
          
          <nav className={`${
              isMenuOpen 
                ? "absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in" 
                : "hidden md:flex"
            } md:items-center md:space-x-6 p-4 md:p-0`}
          >
            <Link to="/" className="block py-2 md:py-0 hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="block py-2 md:py-0 hover:text-primary transition-colors">Products</Link>
            <Link to="/categories" className="block py-2 md:py-0 hover:text-primary transition-colors">Categories</Link>
            <Link to="/about" className="block py-2 md:py-0 hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="block py-2 md:py-0 hover:text-primary transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative">
              <Input 
                type="search"
                placeholder="Search products..." 
                className="w-[200px] lg:w-[300px] pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
