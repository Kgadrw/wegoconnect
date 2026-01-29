import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminNotificationsPage from "./pages/admin/AdminNotificationsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminInvoiceDesignPage from "./pages/admin/AdminInvoiceDesignPage";
import AdminNewsletterPage from "./pages/admin/AdminNewsletterPage";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import CartSidebar from "./components/CartSidebar";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <CurrencyProvider>
        <CartProvider>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminProductsPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminOrdersPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminNotificationsPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminSettingsPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings/invoice-design"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminInvoiceDesignPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/newsletter"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminNewsletterPage />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        </Routes>
        <CartSidebar />
        <WhatsAppButton />
        </CartProvider>
      </CurrencyProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
