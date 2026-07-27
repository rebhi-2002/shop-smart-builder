import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, ShoppingBag, LifeBuoy } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <SEO
        title="Page Not Found — StyleMart"
        description="The page you are looking for doesn't exist. Search our catalog or head back to the StyleMart homepage."
        noindex
      />
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-muted/30 px-4 py-16">
        <div className="text-center max-w-lg w-full animate-fade-in">
          <p className="text-7xl font-bold text-primary mb-2">404</p>
          <h1 className="text-2xl font-bold mb-3">We couldn't find that page</h1>
          <p className="text-muted-foreground mb-6">
            The link may be broken or the page may have been moved. Try searching for what you need.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="flex-1"
            />
            <Button type="submit" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button asChild variant="default" className="w-full">
              <Link to="/"><Home className="h-4 w-4 mr-2" />Home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/products"><ShoppingBag className="h-4 w-4 mr-2" />Shop</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact"><LifeBuoy className="h-4 w-4 mr-2" />Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
