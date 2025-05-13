
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyAccount from "./pages/account/MyAccount";
import MyOrders from "./pages/account/MyOrders";
import Categories from "./pages/Categories";
import Search from "./pages/Search";
import Deals from "./pages/Deals";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingReturns from "./pages/ShippingReturns";
import TermsConditions from "./pages/TermsConditions";
import Careers from "./pages/Careers";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import ProductManagement from "./pages/admin/ProductManagement";
import RecentlyViewedFloating from "./components/RecentlyViewedFloating";

import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:category" element={<ProductList />} />
                <Route path="/search" element={<Search />} />
                <Route path="/deals" element={<Deals />} />
                
                {/* Account */}
                <Route path="/account" element={<MyAccount />} />
                <Route path="/account/orders" element={<MyOrders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Admin */}
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/products" element={<ProductManagement />} />
                
                {/* Static Pages */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/careers" element={<Careers />} />
                
                {/* Not Found */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              
              <RecentlyViewedFloating />
            </Layout>
            <Toaster />
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
