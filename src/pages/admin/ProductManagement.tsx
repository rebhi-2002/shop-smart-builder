
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { productService } from '@/services/productService';
import { Product } from '@/contexts/CartContext';
import { Edit, Trash, Plus, Search, Image } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Please enter a valid image URL'),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      image: ''
    }
  });
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }
    
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [isAdmin, navigate]);
  
  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        image: editingProduct.image
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: ''
      });
    }
  }, [editingProduct, form]);
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };
  
  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would call an API to delete the product
    setProducts(products.filter(product => product.id !== productId));
    toast.success('Product deleted successfully');
  };
  
  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...data } 
          : p
      );
      setProducts(updatedProducts);
      toast.success('Product updated successfully');
    } else {
      // Add new product
      const newProduct: Product = {
        ...data,
        id: Math.random().toString(36).substring(2, 11)
      };
      setProducts([...products, newProduct]);
      toast.success('Product added successfully');
    }
    
    setIsAddProductOpen(false);
    setEditingProduct(null);
  };
  
  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;
  
  if (!isAdmin) {
    return <div className="container py-10">Please log in as admin to view this page.</div>;
  }
  
  return (
    <div className="container py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Management</CardTitle>
          <Button onClick={() => {
            setEditingProduct(null);
            setIsAddProductOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-10">Loading products...</div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded overflow-hidden bg-muted">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Sheet open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <SheetContent className="w-full max-w-md sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Product category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          placeholder="0.00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormDescription className="flex items-center gap-1 text-xs">
                        <Image className="h-3 w-3" /> Enter a valid image URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea 
                          className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Product description" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button type="submit">
                    {editingProduct ? 'Save Changes' : 'Add Product'}
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductManagement;
