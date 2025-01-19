import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    router.replace('/auth/login');
    return null;
  }

  return <>{children}</>;
}