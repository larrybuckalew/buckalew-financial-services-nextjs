export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  created_at: Date;
  updated_at: Date;
  last_login: Date | null;
}

export interface UserData {
  email: string;
  full_name: string;
}

export interface UserWithoutPassword extends Omit<User, 'password_hash'> {}