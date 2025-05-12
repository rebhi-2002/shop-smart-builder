
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import OrdersPage from "./pages/admin/Orders";
import MyAccount from "./pages/account/MyAccount";
import MyOrders from "./pages/account/MyOrders";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import Wishlist from "./pages/Wishlist";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/:id" element={<ProductDetails />} />
                <Route path="categories" element={<Categories />} />
                <Route path="categories/:category" element={<ProductList />} />
                <Route path="search" element={<Search />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="deals" element={<Deals />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-confirmation" element={<OrderConfirmation />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="account" element={<MyAccount />} />
                <Route path="account/orders" element={<MyOrders />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/products" element={<ProductManagement />} />
                <Route path="admin/orders" element={<OrdersPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
