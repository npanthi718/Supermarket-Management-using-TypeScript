import { useAuth } from "@/contexts/AuthContext";
import { MDDashboard } from "@/components/dashboards/MDDashboard";
import { StoreManagerDashboard } from "@/components/dashboards/StoreManagerDashboard";
import { StoreKeeperDashboard } from "@/components/dashboards/StoreKeeperDashboard";
import { CashierDashboard } from "@/components/dashboards/CashierDashboard";

export const DashboardPage = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'md':
        return <MDDashboard />;
      case 'store_manager':
        return <StoreManagerDashboard />;
      case 'store_keeper':
        return <StoreKeeperDashboard />;
      case 'cashier':
        return <CashierDashboard />;
      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to view this dashboard.</p>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>
      {renderDashboard()}
    </div>
  );
};