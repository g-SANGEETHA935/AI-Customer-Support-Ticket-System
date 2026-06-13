export interface User {
  id: number;
  username: string;
  email: string;
  is_staff?: boolean;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  category?: string;
  ai_suggestion?: string;
  created_at: string;
  updated_at: string;
  user?: number;
  username?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

export interface ApiError {
  detail?: string;
  message?: string;
  [key: string]: any;
}