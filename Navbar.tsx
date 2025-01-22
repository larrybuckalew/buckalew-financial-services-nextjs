// In AuthContext.tsx
export interface AuthContextType {
  user: User | null;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void; // Add this
}

// In Navbar.tsx
const { user, logout } = useAuth();