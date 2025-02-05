'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from './Navbar';

export default function MainLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-4 text-center">
          © {new Date().getFullYear()} Buckalew Financial Services
        </footer>
      </div>
    </SessionProvider>
  );
}