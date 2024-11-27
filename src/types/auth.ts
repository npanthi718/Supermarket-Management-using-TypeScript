export type UserRole = 'md' | 'store_manager' | 'store_keeper' | 'cashier' | 'delivery_boy' | 'customer';

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
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  assigned_to?: string;
}

export interface Customer extends User {
  orders: Order[];
  total_spent: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}