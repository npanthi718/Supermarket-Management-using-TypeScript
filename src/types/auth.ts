export type UserRole = 'md' | 'store_manager' | 'store_keeper' | 'cashier' | 'customer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}