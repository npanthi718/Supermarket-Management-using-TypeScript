import { createContext, useContext, useState } from 'react';
import { User, AuthState } from '@/types/auth';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthorized: (allowedRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false
  });

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Check MD credentials
      if (email === 'head@yourchoice.com' && password === 'headsupermarket') {
        setAuthState({
          user: {
            id: 'md-1',
            email,
            role: 'md',
            name: 'Managing Director'
          },
          isLoading: false
        });
        toast({
          title: "Welcome back!",
          description: "Successfully logged in as Managing Director",
        });
        return;
      }

      // Check for employee credentials
      const employeesString = localStorage.getItem('employees');
      if (employeesString) {
        const employees = JSON.parse(employeesString);
        const employee = employees.find((emp: any) => 
          emp.email === email && emp.password === password
        );

        if (employee) {
          setAuthState({
            user: {
              id: `emp-${Date.now()}`,
              email: employee.email,
              role: employee.role,
              name: employee.name
            },
            isLoading: false
          });
          toast({
            title: "Welcome back!",
            description: `Successfully logged in as ${employee.name}`,
          });
          return;
        }
      }

      // Check for customer credentials
      const usersString = localStorage.getItem('users');
      if (usersString) {
        const users = JSON.parse(usersString);
        const user = users.find((u: any) => 
          u.email === email && u.password === password
        );

        if (user) {
          setAuthState({
            user: {
              id: user.id,
              email: user.email,
              role: user.role,
              name: user.name
            },
            isLoading: false
          });
          toast({
            title: "Welcome back!",
            description: `Successfully logged in as ${user.name}`,
          });
          return;
        }
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setAuthState({ user: null, isLoading: false });
    }
  };

  const logout = async () => {
    setAuthState({ user: null, isLoading: false });
    toast({
      title: "Logged out",
      description: "Successfully logged out",
    });
  };

  const isAuthorized = (allowedRoles: string[]) => {
    return authState.user ? allowedRoles.includes(authState.user.role) : false;
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};