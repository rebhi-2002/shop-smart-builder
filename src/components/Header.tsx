
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Heart,
  ChevronDown,
  LogOut,
  Settings,
  Package,
  Home,
  Info,
  Phone,
  HelpCircle,
  FileText,
  Truck,
  ShoppingBag,
  Grid,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationMenuProps extends React.ComponentPropsWithoutRef<typeof NavigationMenu> {}

const NavigationMenuDemo = React.forwardRef<
  React.ElementRef<typeof NavigationMenu>,
  NavigationMenuProps
>(({ className, ...props }, ref) => (
  <NavigationMenu ref={ref} className={cn("relative z-10", className)} {...props}>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-6 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components that you can copy and paste into your apps.
                    Accessible. Customizable. Open Source.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/"
                >
                  <div className="text-sm font-medium leading-none">Installation</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    How to install dependencies and structure your app.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/"
                >
                  <div className="text-sm font-medium leading-none">Re-using components</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Import components and re-use them in your app.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/"
                >
                  <div className="text-sm font-medium leading-none">Building components</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Create new components using Radix Primitives.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <li className="row-span-3">
              <NavigationMenuLink asChild>
                <a
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components that you can copy and paste into your apps.
                    Accessible. Customizable. Open Source.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/"
                >
                  <div className="text-sm font-medium leading-none">Installation</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    How to install dependencies and structure your app.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/"
                >
                  <div className="text-sm font-medium leading-none">Re-using components</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Import components and re-use them in your app.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink asChild>
                <a
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  href="/"
                >
                  <div className="text-sm font-medium leading-none">Building components</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Create new components using Radix Primitives.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
))
NavigationMenuDemo.displayName = "NavigationMenuDemo"

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Effect for scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      setIsMobileSearchOpen(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop', hasMenu: true },
    { href: '/categories', label: 'Categories' },
    { href: '/deals', label: 'Deals' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-200 bg-background',
        isScrolled ? 'shadow-md py-2' : 'py-4'
      )}
    >
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-xl">ShopApp</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full flex">
              <Input
                type="search"
                placeholder="Search for products..."
                className="rounded-r-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) =>
                  link.hasMenu ? (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuTrigger
                        className={isActive(link.href) ? 'bg-accent text-accent-foreground' : ''}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to="/shop"
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Browse All Products
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Explore our complete catalog of quality products at great prices.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/categories"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Categories</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Shop by product categories
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/deals"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Deals & Offers</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Special discounts and limited-time offers
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                to="/shop?sort=new"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">New Arrivals</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  The latest products added to our inventory
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.href}>
                      <Link to={link.href}>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            isActive(link.href) ? 'bg-accent text-accent-foreground' : ''
                          )}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" title="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" title="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 flex items-center">
                    <User className="h-5 w-5" />
                    <span className="max-w-[100px] truncate">{user.firstName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/orders" className="cursor-pointer flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/profile" className="cursor-pointer flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer flex items-center text-red-500"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(true)}
              title="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon" title="Wishlist">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" title="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" title="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    {user ? (
                      <div className="flex flex-col">
                        <h2 className="font-semibold text-lg mb-1">Hello, {user.firstName}</h2>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link to="/login">Login</Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1">
                          <Link to="/register">Register</Link>
                        </Button>
                      </div>
                    )}
                  </div>

                  <nav className="flex-1">
                    <ul className="space-y-2">
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <Home className="h-5 w-5 mr-3" />
                            Home
                          </Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/shop"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <Grid className="h-5 w-5 mr-3" />
                            Shop
                          </Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/categories"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <GridIcon className="h-5 w-5 mr-3" />
                            Categories
                          </Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/deals"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <ShoppingBag className="h-5 w-5 mr-3" />
                            Deals
                          </Link>
                        </SheetClose>
                      </li>
                      {user && (
                        <>
                          <li>
                            <SheetClose asChild>
                              <Link
                                to="/account"
                                className="flex items-center py-2 hover:text-primary"
                              >
                                <User className="h-5 w-5 mr-3" />
                                My Account
                              </Link>
                            </SheetClose>
                          </li>
                          <li>
                            <SheetClose asChild>
                              <Link
                                to="/account/orders"
                                className="flex items-center py-2 hover:text-primary"
                              >
                                <Package className="h-5 w-5 mr-3" />
                                My Orders
                              </Link>
                            </SheetClose>
                          </li>
                        </>
                      )}
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/about"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <Info className="h-5 w-5 mr-3" />
                            About Us
                          </Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/contact"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <Phone className="h-5 w-5 mr-3" />
                            Contact
                          </Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/faq"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <HelpCircle className="h-5 w-5 mr-3" />
                            FAQ
                          </Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/shipping-returns"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <Truck className="h-5 w-5 mr-3" />
                            Shipping & Returns
                          </Link>
                        </SheetClose>
                      </li>
                      <li>
                        <SheetClose asChild>
                          <Link
                            to="/terms-conditions"
                            className="flex items-center py-2 hover:text-primary"
                          >
                            <FileText className="h-5 w-5 mr-3" />
                            Terms & Conditions
                          </Link>
                        </SheetClose>
                      </li>
                    </ul>
                  </nav>

                  {user && (
                    <div className="mt-auto pt-4 border-t">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/10"
                        onClick={() => {
                          logout();
                        }}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Search Products</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <form onSubmit={handleMobileSearch} className="flex w-full mb-4">
            <Input
              type="search"
              placeholder="Search for products..."
              className="rounded-r-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <div className="overflow-auto">
            <div className="text-sm text-muted-foreground mb-2">Popular Searches:</div>
            <div className="flex flex-wrap gap-2">
              {['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Accessories'].map(
                (term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term);
                      handleMobileSearch(new Event('submit') as any);
                    }}
                  >
                    {term}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
