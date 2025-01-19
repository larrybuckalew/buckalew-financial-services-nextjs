import React from 'react';
import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata = {
  title: 'Buckalew Financial Services',
  description: 'Comprehensive financial planning and advisory services'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}