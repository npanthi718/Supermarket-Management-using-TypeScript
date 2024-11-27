import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Users, BarChart3, LogOut, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const isActive = (path: string) => location.pathname === path;

  // Define role-based menu access
  const menuAccess = {
    dashboard: ['md', 'store_manager', 'store_keeper', 'cashier', 'delivery_boy'],
    products: ['md', 'store_manager', 'store_keeper', 'customer'],
    orders: ['md', 'store_manager', 'cashier', 'delivery_boy'],
    users: ['md']
  };

  const hasAccess = (path: string) => {
    if (!user) return false;
    const route = path.replace('/', '');
    return menuAccess[route as keyof typeof menuAccess]?.includes(user.role);
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Your Choice</h1>
        <p className="text-sm text-muted-foreground">Supermarket</p>
      </div>

      <div className="mb-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={() => setSearchOpen(true)}
        >
          <Search className="w-4 h-4 mr-2" />
          Search Products...
        </Button>
      </div>
      
      <div className="space-y-2">
        {hasAccess('dashboard') && (
          <Link to="/dashboard" className={cn("nav-link flex items-center gap-2", isActive("/dashboard") && "active")}>
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </Link>
        )}
        {hasAccess('products') && (
          <Link to="/products" className={cn("nav-link flex items-center gap-2", isActive("/products") && "active")}>
            <Package className="w-4 h-4" />
            Products
          </Link>
        )}
        {hasAccess('orders') && (
          <Link to="/orders" className={cn("nav-link flex items-center gap-2", isActive("/orders") && "active")}>
            <ShoppingCart className="w-4 h-4" />
            Orders
          </Link>
        )}
        {hasAccess('users') && (
          <Link to="/users" className={cn("nav-link flex items-center gap-2", isActive("/users") && "active")}>
            <Users className="w-4 h-4" />
            Users
          </Link>
        )}
      </div>
      
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search products..." />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading="Products">
            {/* This will be populated with actual products */}
            <CommandItem>Product 1</CommandItem>
            <CommandItem>Product 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
};