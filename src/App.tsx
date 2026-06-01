
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import ProductDetails from '@/pages/ProductDetails';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import NotFound from '@/pages/NotFound';
import Categories from '@/pages/Categories';
import ProductList from '@/pages/ProductList';
import Wishlist from '@/pages/Wishlist';
import AboutUs from '@/pages/AboutUs';
import Search from '@/pages/Search';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';
import ShippingReturns from '@/pages/ShippingReturns';
import MyAccount from '@/pages/account/MyAccount';
import MyOrders from '@/pages/account/MyOrders';
import UserProfile from '@/pages/account/UserProfile';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Dashboard from '@/pages/admin/Dashboard';
import Orders from '@/pages/admin/Orders';
import ProductManagement from '@/pages/admin/ProductManagement';
import Deals from '@/pages/Deals';
import Careers from '@/pages/Careers';
import { FramerMotionProvider } from '@/providers/FramerMotionProvider';
import UserManagement from '@/pages/admin/UserManagement';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FramerMotionProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:category" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/search" element={<Search />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
              <Route path="/account/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/account/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />

              {/* Admin Routes — protected */}
              <Route path="/admin" element={<ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute requireAdmin><Orders /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute requireAdmin><ProductManagement /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requireAdmin><UserManagement /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Layout>
        </FramerMotionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
