import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);

  // Load employees from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

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
    
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    // Save to localStorage for persistence
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    
    setIsAddingEmployee(false);
    toast({
      title: "Employee account created",
      description: "Login credentials have been sent to their email.",
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Employee Management
        </CardTitle>
        <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
          <DialogTrigger asChild>
            <Button size="sm" className="hover:scale-105 transition-transform duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Add New Employee
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  className="transition-all duration-200 focus:scale-[1.01]"
                  placeholder="Enter employee's full name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="transition-all duration-200 focus:scale-[1.01]"
                  placeholder="Enter work email address"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  minLength={6}
                  className="transition-all duration-200 focus:scale-[1.01]"
                  placeholder="Minimum 6 characters"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Role</label>
                <Select name="role" required>
                  <SelectTrigger className="w-full transition-all duration-200 focus:scale-[1.01]">
                    <SelectValue placeholder="Select employee role" />
                  </SelectTrigger>
                  <SelectContent className="animate-fade-in">
                    <SelectItem value="store_manager" className="cursor-pointer hover:bg-primary/10 transition-colors">
                      Store Manager
                    </SelectItem>
                    <SelectItem value="store_keeper" className="cursor-pointer hover:bg-primary/10 transition-colors">
                      Store Keeper
                    </SelectItem>
                    <SelectItem value="cashier" className="cursor-pointer hover:bg-primary/10 transition-colors">
                      Cashier
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                className="w-full hover:scale-[1.02] transition-transform duration-200"
              >
                Create Account
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {employees.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 animate-fade-in">
            <UserPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No employees added yet</p>
            <p className="text-sm text-muted-foreground/70">Click the Add Employee button to get started</p>
          </div>
        ) : (
          <div className="animate-fade-in">
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
                  <TableRow 
                    key={index}
                    className="hover:bg-muted/50 transition-colors cursor-default"
                  >
                    <TableCell>{employee.name}</TableCell>
                    <TableCell className="capitalize">{employee.role.replace('_', ' ')}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {employee.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};