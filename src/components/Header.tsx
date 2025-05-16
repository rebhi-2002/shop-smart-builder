import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  Plus,
  ChevronDown,
  Grid2x2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <ScrollArea className="h-full">
              <div className="py-4">
                {/* Mobile Menu Content */}
                <div className="px-4 py-2">
                  <Link to="/" className="block py-2 hover:bg-gray-100 rounded">
                    Home
                  </Link>
                  <Link to="/shop" className="block py-2 hover:bg-gray-100 rounded">
                    Shop
                  </Link>
                  <Link to="/categories" className="block py-2 hover:bg-gray-100 rounded">
                    Categories
                  </Link>
                  <Link to="/deals" className="block py-2 hover:bg-gray-100 rounded">
                    Deals
                  </Link>
                  <Link to="/wishlist" className="block py-2 hover:bg-gray-100 rounded">
                    Wishlist
                  </Link>
                  <Link to="/faq" className="block py-2 hover:bg-gray-100 rounded">
                    Help
                  </Link>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-4 py-2">
                  <Link to="/account" className="block py-2 hover:bg-gray-100 rounded">
                    My Account
                  </Link>
                  <Link to="/account/orders" className="block py-2 hover:bg-gray-100 rounded">
                    My Orders
                  </Link>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ShopApp
        </Link>

        {/* Search Bar (Hidden on small screens) */}
        <div className="hidden md:flex items-center flex-grow mx-4">
          <Input type="search" placeholder="Search products..." className="rounded-l-md" />
          <Button variant="secondary" className="rounded-r-md">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Wishlist Icon (Hidden on small screens) */}
          <Link to="/wishlist" className="hidden md:block hover:text-gray-600">
            <Heart className="h-5 w-5" />
          </Link>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative hover:text-gray-600">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-xs">
              2
            </Badge>
          </Link>

          {/* User Avatar or Login Button */}
          <Link to="/account">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Categories Dropdown (Hidden on small screens) */}
      <div className="hidden md:flex justify-center bg-gray-50 py-2">
        <div className="flex items-center space-x-6">
          <Button variant="ghost" className="gap-2">
            <Grid2x2 className="h-4 w-4 mr-2" />
            Categories
            <ChevronDown className="h-4 w-4 ml-auto" />
          </Button>
          <Link to="/deals" className="hover:text-blue-500">
            Deals
          </Link>
          <Link to="/new-arrivals" className="hover:text-blue-500">
            New Arrivals
          </Link>
          <Link to="/trending" className="hover:text-blue-500">
            Trending
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
