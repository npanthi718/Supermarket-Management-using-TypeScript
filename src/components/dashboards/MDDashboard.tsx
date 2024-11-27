import { useState } from "react";
import { Users, Package, ShoppingCart, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatsCard } from "./stats/StatsCard";
import { EmployeeManagement } from "./employees/EmployeeManagement";

export const MDDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<{
    title: string;
    data: any[];
    type: 'employees' | 'users' | 'orders' | 'revenue';
  } | null>(null);

  const handleStatsCardClick = (type: 'employees' | 'users' | 'orders' | 'revenue') => {
    let data: any[] = [];
    let title = '';

    switch (type) {
      case 'employees':
        // In a real app, this would fetch employee data
        title = 'Employee Details';
        break;
      case 'users':
        data = users;
        title = 'User Details';
        break;
      case 'orders':
        data = orders;
        title = 'Order Details';
        break;
      case 'revenue':
        data = orders;
        title = 'Revenue Details';
        break;
    }

    setSelectedData({ title, data, type });
  };

  const renderDetailContent = () => {
    if (!selectedData) return null;

    switch (selectedData.type) {
      case 'employees':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedData.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No employees found</TableCell>
                </TableRow>
              ) : (
                selectedData.data.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        );

      case 'users':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedData.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No users found</TableCell>
                </TableRow>
              ) : (
                selectedData.data.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        );

      case 'orders':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedData.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No orders found</TableCell>
                </TableRow>
              ) : (
                selectedData.data.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        );

      case 'revenue':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedData.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No revenue data available</TableCell>
                </TableRow>
              ) : (
                selectedData.data.map((revenue, index) => (
                  <TableRow key={index}>
                    <TableCell>{revenue.period}</TableCell>
                    <TableCell>₹{revenue.amount}</TableCell>
                    <TableCell>{revenue.orders}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Employees"
          value="0"
          icon={Users}
          onClick={() => handleStatsCardClick('employees')}
        />
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={Users}
          onClick={() => handleStatsCardClick('users')}
        />
        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingCart}
          onClick={() => handleStatsCardClick('orders')}
        />
        <StatsCard
          title="Revenue"
          value={`₹${orders.reduce((acc, order) => acc + (order?.amount || 0), 0).toLocaleString()}`}
          icon={BarChart3}
          onClick={() => handleStatsCardClick('revenue')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No users registered yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No orders placed yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>₹{order.amount}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <EmployeeManagement />

      <Dialog open={!!selectedData} onOpenChange={() => setSelectedData(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedData?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {renderDetailContent()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};