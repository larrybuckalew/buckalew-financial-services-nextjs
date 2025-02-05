'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    imageUrl?: string;
  } | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    try {
      // Add logout logic here
      setIsOpen(false);
      // Redirect to home page or login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {user.name}
        </span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <Link
            href="/profile"
            className={`block px-4 py-2 text-sm ${
              isActive('/profile')
                ? 'text-blue-600 bg-blue-50 dark:bg-gray-700'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors`}
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            Profile
          </Link>
          <Link
            href="/dashboard"
            className={`block px-4 py-2 text-sm ${
              isActive('/dashboard')
                ? 'text-blue-600 bg-blue-50 dark:bg-gray-700'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors`}
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className={`block px-4 py-2 text-sm ${
              isActive('/settings')
                ? 'text-blue-600 bg-blue-50 dark:bg-gray-700'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors`}
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            Settings
          </Link>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;