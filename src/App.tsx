import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { UsersPage } from "@/pages/UsersPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<Layout />}>
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="products" 
                  element={
                    <ProtectedRoute allowedRoles={['md', 'store_manager', 'store_keeper']}>
                      <ProductsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="orders" 
                  element={
                    <ProtectedRoute allowedRoles={['md', 'store_manager', 'cashier']}>
                      <OrdersPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="users" 
                  element={
                    <ProtectedRoute allowedRoles={['md']}>
                      <UsersPage />
                    </ProtectedRoute>
                  } 
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;