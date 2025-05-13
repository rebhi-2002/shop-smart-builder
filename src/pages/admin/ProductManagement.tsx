
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/contexts/CartContext';
import { productService } from '@/services/productService';
import { useQuery } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

// Define a validation schema for the product form
const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  image: z.string().url('Image must be a valid URL'),
  category: z.string().min(1, 'Category is required'),
  discount: z.number().min(0).max(100).optional(),
  stock: z.number().min(0).int().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().min(0).int().optional(),
  seller: z.string().optional(),
  tags: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductManagement: React.FC = () => {
  
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get products using react-query
  const { 
    data: products = [], 
    isLoading, 
    refetch 
  } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: productService.getProducts,
  });
  
  // Get categories for the dropdown
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
  
  // Initialize form
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      discount: 0,
      stock: 100,
      rating: 0,
      reviews: 0,
      seller: '',
      tags: '',
    }
  });

  // Redirect non-admin users
  useEffect(() => {
    if (!isAdmin) {
      toast.error("Admin access required");
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  // Update form values when editing a product
  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        image: editingProduct.image,
        category: editingProduct.category,
        discount: editingProduct.discount || 0,
        stock: editingProduct.stock || 100,
        rating: editingProduct.rating || 0,
        reviews: editingProduct.reviews || 0,
        seller: editingProduct.seller || '',
        tags: editingProduct.tags ? editingProduct.tags.join(', ') : '',
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        image: '',
        category: '',
        discount: 0,
        stock: 100,
        rating: 0,
        reviews: 0,
        seller: '',
        tags: '',
      });
    }
  }, [editingProduct, form]);

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productService.deleteProduct(productId);
      refetch(); // Refresh the product list
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Delete product error:', error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    
    try {
      const productData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      };
      
      if (editingProduct) {
        // Update existing product
        await productService.updateProduct({
          id: editingProduct.id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image: productData.image,
          category: productData.category,
          discount: productData.discount,
          stock: productData.stock,
          rating: productData.rating,
          reviews: productData.reviews,
          seller: productData.seller,
          tags: productData.tags,
        });
        toast.success('Product updated successfully');
      } else {
        // Add new product
        await productService.createProduct({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image: productData.image,
          category: productData.category,
          discount: productData.discount,
          stock: productData.stock,
          rating: productData.rating,
          reviews: productData.reviews,
          seller: productData.seller,
          tags: productData.tags,
        });
        toast.success('Product added successfully');
      }
      
      // Refresh product list
      refetch();
      
      // Close dialog and reset form
      setIsAddProductOpen(false);
      setEditingProduct(null);
    } catch (error) {
      toast.error(editingProduct ? 'Failed to update product' : 'Failed to add product');
      console.error('Product submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
            Add, edit, and manage your products
          </p>
        </div>
        <Button onClick={() => setIsAddProductOpen(true)}>
          Add New Product
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Products Table */}
      <div className="border rounded-md">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2">Loading products...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.discount ? `${product.discount}%` : 'None'}</TableCell>
                  <TableCell>{product.stock || 'Unlimited'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? 'Edit the details of your product.'
                : 'Add a new product to your store.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product name" {...field} />
                    </FormControl>
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
                      <Textarea 
                        placeholder="Product description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
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
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
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
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="seller"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seller</FormLabel>
                      <FormControl>
                        <Input placeholder="Seller name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="tag1, tag2, tag3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddProductOpen(false);
                    setEditingProduct(null);
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingProduct ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>{editingProduct ? 'Update Product' : 'Add Product'}</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
