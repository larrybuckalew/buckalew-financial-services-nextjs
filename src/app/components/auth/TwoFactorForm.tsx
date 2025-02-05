import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

interface TwoFactorFormProps {
  email: string;
  password: string;
  callbackUrl?: string;
}

export function TwoFactorForm({ email, password, callbackUrl }: TwoFactorFormProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUsingBackupCode, setIsUsingBackupCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        code,
        isBackupCode: isUsingBackupCode,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        window.location.href = callbackUrl || result.url;
      }
    } catch (error) {
      setError('An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Two-Factor Authentication
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              {isUsingBackupCode ? 'Backup Code' : 'Authentication Code'}
            </label>
            <div className="mt-1">
              <input
                id="code"
                name="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={
                  isUsingBackupCode
                    ? 'Enter backup code'
                    : 'Enter 6-digit code'
                }
                maxLength={isUsingBackupCode ? 8 : 6}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Verify'
              )}
            </button>
          </div>

          <div className="text-sm text-center">
            <button
              type="button"
              onClick={() => setIsUsingBackupCode(!isUsingBackupCode)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isUsingBackupCode
                ? 'Use authentication code instead'
                : 'Use backup code instead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}