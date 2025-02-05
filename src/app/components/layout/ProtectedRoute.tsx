'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'USER' | 'ADMIN';
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = 'USER' 
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Check user role
    if (requiredRole === 'ADMIN' && user?.role !== 'ADMIN') {
      router.replace('/unauthorized');
      return;
    }
  }, [isAuthenticated, user, requiredRole, router]);

  // Render children only if authenticated and role matches
  if (!isAuthenticated || (requiredRole === 'ADMIN' && user?.role !== 'ADMIN')) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
