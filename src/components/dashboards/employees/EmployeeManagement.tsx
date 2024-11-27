import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  const handleAddEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmployee = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      status: 'Active'
    };
    
    setEmployees([...employees, newEmployee]);
    setIsAddingEmployee(false);
    toast({
      title: "Employee account created",
      description: "Login credentials have been sent to their email.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employee Management</CardTitle>
        <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">Name</label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <Input id="password" name="password" type="password" required minLength={6} />
              </div>
              <div className="space-y-2">
                <label htmlFor="role">Role</label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store_manager">Store Manager</SelectItem>
                    <SelectItem value="store_keeper">Store Keeper</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {employees.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No employees added yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};