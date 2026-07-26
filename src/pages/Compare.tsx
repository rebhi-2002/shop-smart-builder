import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productService, Product } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, X, Check, Minus } from 'lucide-react';
import SEO from '@/components/SEO';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';

const MAX = 4;

const Compare: React.FC = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const [selected, setSelected] = useState<string[]>([]);

  const items = useMemo(
    () => selected.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[],
    [selected, products]
  );

  const specKeys = useMemo(() => {
    const keys = new Set<string>();
    items.forEach((p) => Object.keys(p.specifications || {}).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [items]);

  const add = (id: string) => {
    if (selected.includes(id) || selected.length >= MAX) return;
    setSelected([...selected, id]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Compare Products — StyleMart"
        description="Compare up to four StyleMart products side by side: price, rating, stock and specifications."
        path="/compare"
      />

      <h1 className="text-3xl font-bold mb-2">Compare Products</h1>
      <p className="text-muted-foreground mb-6">
        Pick up to {MAX} products and see them side by side.
      </p>

      <div className="mb-8 max-w-sm">
        <Select value="" onValueChange={add} disabled={isLoading || selected.length >= MAX}>
          <SelectTrigger aria-label="Add a product to compare">
            <SelectValue placeholder={selected.length >= MAX ? 'Maximum reached' : 'Add a product…'} />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {products
              .filter((p) => !selected.includes(p.id))
              .map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && <ProductGridSkeleton count={4} />}

      {!isLoading && items.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground mb-4">No products selected yet.</p>
            <Button asChild variant="outline">
              <Link to="/products">Browse products</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-32 text-left p-3" />
                {items.map((p) => (
                  <th key={p.id} className="p-3 align-top text-left">
                    <div className="relative">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={`Remove ${p.name}`}
                        className="absolute -top-2 -right-2 h-7 w-7"
                        onClick={() => setSelected(selected.filter((id) => id !== p.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="aspect-square w-full max-w-[160px] object-cover rounded-md mb-2"
                      />
                      <Link to={`/products/${p.id}`} className="font-medium hover:text-primary">
                        {p.name}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-medium">Price</td>
                {items.map((p) => (
                  <td key={p.id} className="p-3 font-bold">${p.price.toFixed(2)}</td>
                ))}
              </tr>
              <tr className="border-t bg-muted/40">
                <td className="p-3 font-medium">Rating</td>
                {items.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                      {p.rating.toFixed(1)} ({p.reviews ?? 0})
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-3 font-medium">Category</td>
                {items.map((p) => (
                  <td key={p.id} className="p-3">{p.category}</td>
                ))}
              </tr>
              <tr className="border-t bg-muted/40">
                <td className="p-3 font-medium">Availability</td>
                {items.map((p) => (
                  <td key={p.id} className="p-3">
                    {(p.stock ?? 0) > 0 ? (
                      <Badge className="bg-success text-success-foreground hover:bg-success">In stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of stock</Badge>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-3 font-medium">Discount</td>
                {items.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.discount ? `-${p.discount}%` : <Minus className="h-4 w-4 text-muted-foreground" />}
                  </td>
                ))}
              </tr>
              {specKeys.map((key, i) => (
                <tr key={key} className={`border-t ${i % 2 === 0 ? 'bg-muted/40' : ''}`}>
                  <td className="p-3 font-medium capitalize">{key}</td>
                  {items.map((p) => (
                    <td key={p.id} className="p-3">
                      {p.specifications?.[key] ?? (
                        <Minus className="h-4 w-4 text-muted-foreground" aria-label="Not available" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t">
                <td className="p-3" />
                {items.map((p) => (
                  <td key={p.id} className="p-3">
                    <Button asChild size="sm" className="w-full">
                      <Link to={`/products/${p.id}`}>
                        <Check className="h-4 w-4 mr-1" /> View
                      </Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Compare;
