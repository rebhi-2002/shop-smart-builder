import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import { FramerMotionProvider } from '@/providers/FramerMotionProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Index from '@/pages/Index';

const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const Cart = lazy(() => import('@/pages/Cart'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Categories = lazy(() => import('@/pages/Categories'));
const ProductList = lazy(() => import('@/pages/ProductList'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const Search = lazy(() => import('@/pages/Search'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('@/pages/TermsConditions'));
const ShippingReturns = lazy(() => import('@/pages/ShippingReturns'));
const MyAccount = lazy(() => import('@/pages/account/MyAccount'));
const MyOrders = lazy(() => import('@/pages/account/MyOrders'));
const UserProfile = lazy(() => import('@/pages/account/UserProfile'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const OrderConfirmation = lazy(() => import('@/pages/OrderConfirmation'));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const Orders = lazy(() => import('@/pages/admin/Orders'));
const ProductManagement = lazy(() => import('@/pages/admin/ProductManagement'));
const UserManagement = lazy(() => import('@/pages/admin/UserManagement'));
const Deals = lazy(() => import('@/pages/Deals'));
const Careers = lazy(() => import('@/pages/Careers'));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="container mx-auto px-4 py-16 flex justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FramerMotionProvider>
          <Layout>
            <Suspense fallback={<PageFallback />}>
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

                <Route path="/admin" element={<ProtectedRoute requireAdmin><Dashboard /></ProtectedRoute>} />
                <Route path="/admin/orders" element={<ProtectedRoute requireAdmin><Orders /></ProtectedRoute>} />
                <Route path="/admin/products" element={<ProtectedRoute requireAdmin><ProductManagement /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute requireAdmin><UserManagement /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </Layout>
        </FramerMotionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
