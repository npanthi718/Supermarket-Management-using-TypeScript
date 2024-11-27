import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Users, BarChart3, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Your Choice</h1>
        <p className="text-sm text-muted-foreground">Supermarket</p>
      </div>
      
      <div className="space-y-2">
        <Link to="/dashboard" className={cn("nav-link flex items-center gap-2", isActive("/dashboard") && "active")}>
          <BarChart3 className="w-4 h-4" />
          Dashboard
        </Link>
        <Link to="/products" className={cn("nav-link flex items-center gap-2", isActive("/products") && "active")}>
          <Package className="w-4 h-4" />
          Products
        </Link>
        <Link to="/orders" className={cn("nav-link flex items-center gap-2", isActive("/orders") && "active")}>
          <ShoppingCart className="w-4 h-4" />
          Orders
        </Link>
        <Link to="/users" className={cn("nav-link flex items-center gap-2", isActive("/users") && "active")}>
          <Users className="w-4 h-4" />
          Users
        </Link>
      </div>
      
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("logout")}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
};