'use client';

import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function TestContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">SUCCESS!</h1>
          <p className="mb-4">Google OAuth is working!</p>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="font-bold">{session.user.name}</p>
            <p className="text-sm text-gray-600">{session.user.email}</p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🔐 Google OAuth Test
        </h1>
        
        <button
          onClick={() => {
            console.log('Clicking Google sign in...');
            signIn('google', { callbackUrl: '/google-test' });
          }}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 hover:border-blue-500"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-lg font-semibold text-gray-700">
            Sign in with Google
          </span>
        </button>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold mb-2">✓ What should happen:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Google popup opens</li>
            <li>Choose your account</li>
            <li>See green success message</li>
          </ol>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-center">
          <p>Session Status: <strong>{status}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default function GoogleTestPage() {
  return (
    <SessionProvider>
      <TestContent />
    </SessionProvider>
  );
}
