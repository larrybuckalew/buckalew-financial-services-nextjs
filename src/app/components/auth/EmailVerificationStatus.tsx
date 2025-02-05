import React from 'react';
import { useSession } from 'next-auth/react';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

export function EmailVerificationStatus() {
  const { data: session, status } = useSession();
  const [resendLoading, setResendLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleResendVerification = async () => {
    try {
      setResendLoading(true);
      setError('');
      setSuccess('');

      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email');
      }

      setSuccess('Verification email sent! Please check your inbox.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setResendLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Checking verification status...</span>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="rounded-lg border p-4">
      {session.user.emailVerified ? (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Email verified</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start space-x-2 text-amber-600">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Email not verified</p>
              <p className="text-sm text-gray-600">
                Please verify your email address to access all features
              </p>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600">
              {success}
            </div>
          )}

          <button
            onClick={handleResendVerification}
            disabled={resendLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {resendLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              'Resend verification email'
            )}
          </button>
        </div>
      )}
    </div>
  );
}