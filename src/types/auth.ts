export type UserRole = 'md' | 'store_manager' | 'store_keeper' | 'cashier' | 'customer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  created_at?: string;
  last_login?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Customer extends User {
  orders: Order[];
  total_spent: number;
}