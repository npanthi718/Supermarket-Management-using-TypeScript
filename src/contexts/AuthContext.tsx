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
      // Temporary mock login for MD
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
      
      // TODO: Implement actual Supabase auth here
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