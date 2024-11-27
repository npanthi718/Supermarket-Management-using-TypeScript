import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";

interface EmployeeFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const EmployeeForm = ({ onSubmit }: EmployeeFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 animate-fade-in">
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
          <SelectContent position="popper" className="animate-fade-in w-full">
            <SelectItem value="store_manager" className="cursor-pointer hover:bg-primary/10 transition-colors">
              Store Manager
            </SelectItem>
            <SelectItem value="store_keeper" className="cursor-pointer hover:bg-primary/10 transition-colors">
              Store Keeper
            </SelectItem>
            <SelectItem value="cashier" className="cursor-pointer hover:bg-primary/10 transition-colors">
              Cashier
            </SelectItem>
            <SelectItem value="delivery_boy" className="cursor-pointer hover:bg-primary/10 transition-colors">
              Delivery Boy
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        type="submit" 
        className="w-full hover:scale-[1.02] transition-transform duration-200"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Create Account
      </Button>
    </form>
  );
};