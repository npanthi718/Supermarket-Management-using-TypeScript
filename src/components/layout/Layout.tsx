import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Layout = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-secondary">
        <Navbar />
        <main className="ml-64 p-8">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};