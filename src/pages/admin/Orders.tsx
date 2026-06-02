
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MoreHorizontal, Search, Eye, RotateCw, Check, X, Trash2, Edit, Printer, ArrowDownToLine } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Order {
  id: string;            // order_number (display)
  dbId: string;          // uuid for DB ops
  customer: string;
  email: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  address: string;
  notes?: string;
  paymentMethod?: string;
}

const mockOrders: Order[] = [];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 text-white';
    case 'processing':
      return 'bg-blue-500 text-white';
    case 'shipped':
      return 'bg-purple-500 text-white';
    case 'delivered':
      return 'bg-green-500 text-white';
    case 'cancelled':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState<Order['status']>('pending');
  const [editedNotes, setEditedNotes] = useState('');
  
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('id, order_number, created_at, total, status, notes, shipping_address, guest_email, order_items(id, product_id, product_name, unit_price, quantity)')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Failed to load orders', description: error.message, variant: 'destructive' });
      return;
    }
    const mapped: Order[] = (data || []).map((o: any) => {
      const addr = o.shipping_address || {};
      return {
        id: o.order_number,
        dbId: o.id,
        customer: addr.full_name || 'Guest',
        email: addr.email || o.guest_email || '',
        date: o.created_at,
        total: Number(o.total),
        status: o.status,
        items: (o.order_items || []).map((it: any) => ({
          id: it.product_id || it.id,
          name: it.product_name,
          quantity: it.quantity,
          price: Number(it.unit_price),
        })),
        address: [addr.street, addr.city, addr.state, addr.zip].filter(Boolean).join(', '),
        notes: o.notes || '',
      };
    });
    setOrders(mapped);
  };

  useEffect(() => {
    if (isAdmin) loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const ordersPerPage = 10;

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return;
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', target.dbId);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast({ title: 'Order Status Updated', description: `Order ${orderId} has been marked as ${newStatus}.` });
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    const orderToDelete = orders.find(order => order.id === orderId);
    if (orderToDelete) {
      setSelectedOrder(orderToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDeleteOrder = async () => {
    if (!selectedOrder) return;
    // Mark as cancelled (deletes are not permitted by RLS)
    const { error } = await supabase.from('orders').update({ status: 'cancelled' }).eq('id', selectedOrder.dbId);
    if (error) {
      toast({ title: 'Cancel failed', description: error.message, variant: 'destructive' });
      return;
    }
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'cancelled' } : o));
    setIsDeleteDialogOpen(false);
    setSelectedOrder(null);
    toast({ title: 'Order Cancelled', description: `Order has been cancelled.` });
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditedStatus(order.status);
    setEditedNotes(order.notes || '');
    setIsEditDialogOpen(true);
  };

  const saveOrderChanges = async () => {
    if (!selectedOrder) return;
    const { error } = await supabase
      .from('orders')
      .update({ status: editedStatus, notes: editedNotes })
      .eq('id', selectedOrder.dbId);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    setOrders(orders.map(o =>
      o.id === selectedOrder.id ? { ...o, status: editedStatus, notes: editedNotes } : o
    ));
    setIsEditDialogOpen(false);
    toast({ title: 'Order Updated', description: `Order ${selectedOrder.id} has been updated.` });
  };


  const handleExportOrders = () => {
    toast({
      title: "Orders Exported",
      description: "All orders have been exported to CSV"
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">
            Manage and process customer orders
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2 flex">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleExportOrders}>
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            {filteredOrders.length} total orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    {order.customer}
                    <div className="text-xs text-muted-foreground hidden md:block">{order.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit Order
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast({
                            title: "Printing Order",
                            description: "Order has been sent to printer"
                          });
                        }}>
                          <Printer className="h-4 w-4 mr-2" /> Print
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'processing')}>
                          <RotateCw className="h-4 w-4 mr-2 text-blue-500" /> Mark Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'shipped')}>
                          <Check className="h-4 w-4 mr-2 text-purple-500" /> Mark Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'delivered')}>
                          <Check className="h-4 w-4 mr-2 text-green-500" /> Mark Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'cancelled')}>
                          <X className="h-4 w-4 mr-2 text-red-500" /> Cancel Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No orders found matching your search criteria.</p>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder?.date && new Date(selectedOrder.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Customer Information</h3>
                <p>{selectedOrder?.customer}</p>
                <p className="text-muted-foreground">{selectedOrder?.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-1">Shipping Address</h3>
                <p className="text-muted-foreground">{selectedOrder?.address}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-1">Payment Method</h3>
              <p className="text-muted-foreground">{selectedOrder?.paymentMethod || "Not specified"}</p>
            </div>
            
            {selectedOrder?.notes && (
              <div>
                <h3 className="text-sm font-semibold mb-1">Order Notes</h3>
                <p className="text-muted-foreground">{selectedOrder?.notes}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder?.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">${selectedOrder?.total.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">Order Status</h3>
                <Badge className={selectedOrder ? getStatusColor(selectedOrder.status) : ''}>
                  {selectedOrder?.status.charAt(0).toUpperCase()}{selectedOrder?.status.slice(1)}
                </Badge>
              </div>
              
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    toast({
                      title: "Printing Order",
                      description: "Order has been sent to printer"
                    });
                  }}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button size="sm" onClick={() => {
                  setIsDetailsOpen(false);
                  if (selectedOrder) handleEditOrder(selectedOrder);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Order Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Order Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order {selectedOrder?.id}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <p className="font-medium">Order Summary:</p>
            <p>Customer: {selectedOrder?.customer}</p>
            <p>Date: {selectedOrder?.date && new Date(selectedOrder.date).toLocaleDateString()}</p>
            <p>Total: ${selectedOrder?.total.toFixed(2)}</p>
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteOrder}>
              Delete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Order {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Update the order status and add notes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Status</label>
              <Select value={editedStatus} onValueChange={(value) => setEditedStatus(value as Order['status'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Notes</label>
              <Textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                placeholder="Add notes about this order..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveOrderChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
