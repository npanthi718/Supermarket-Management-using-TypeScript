import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";

// Pages
import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { UsersPage } from "@/pages/UsersPage";

const queryClient = new QueryClient();

const App = () => {
  // TODO: Replace with actual auth check
  const isAuthenticated = false;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/users" element={<UsersPage />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            
            {/* Redirect root to dashboard or login */}
            <Route path="/" element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;