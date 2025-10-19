import Link from 'next/link';
import React from 'react';

export const SkipNavigation = () => {
  return (
    <Link 
      href="#main-content" 
      className="fixed top-4 left-4 z-50 bg-primary text-white px-4 py-2 rounded-lg 
                 transform -translate-y-full focus:translate-y-0 transition-transform duration-300 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Skip to Main Content
    </Link>
  );
};

export const AccessibleMainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main 
      id="main-content" 
      className="flex-grow focus:outline-none" 
      tabIndex={-1}
      aria-label="Main Content"
    >
      {children}
    </main>
  );
};
