// src/pages/404.tsx
import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}