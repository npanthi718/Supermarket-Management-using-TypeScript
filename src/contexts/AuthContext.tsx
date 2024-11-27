import { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthorized: (allowedRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true
  });

  // TODO: Replace with actual Supabase auth
  const login = async (email: string, password: string) => {
    // Temporary mock login
    setAuthState({
      user: {
        id: '1',
        email,
        role: 'md',
        name: 'Admin'
      },
      isLoading: false
    });
  };

  const logout = async () => {
    setAuthState({ user: null, isLoading: false });
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