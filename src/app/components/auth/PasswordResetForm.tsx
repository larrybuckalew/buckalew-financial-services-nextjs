import React, { useState } from 'react';
import { z } from 'zod';
import { PasswordService } from '@/services/passwordService';

// Password validation schema
const passwordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[!@#$%^&*()]/, 'Password must contain a special character')
});

const PasswordResetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [stage, setStage] = useState<'request' | 'reset'>('request');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/password-reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setStage('reset');
      } else {
        setError(data.message || 'Failed to request password reset');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    try {
      passwordSchema.parse({ password: newPassword });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
        return;
      }
    }

    try {
      const response = await fetch('/api/auth/password-reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: resetToken, 
          newPassword 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  if (success) {
    return (
      <div className="text-center text-green-600">
        <h2>Password Reset Successful</h2>
        <p>You can now log in with your new password.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {stage === 'request' ? (
        <form onSubmit={handlePasswordResetRequest}>
          <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
          
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Request Password Reset
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset}>
          <h2 className="text-2xl font-bold mb-4">Create New Password</h2>
          
          <div className="mb-4">
            <label 
              htmlFor="reset-token" 
              className="block mb-2"
            >
              Reset Token
            </label>
            <input
              type="text"
              id="reset-token"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter reset token"
              required
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="new-password" 
              className="block mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="confirm-password" 
              className="block mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default PasswordResetForm;
