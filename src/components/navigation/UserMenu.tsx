import React from 'react';
import Link from 'next/link';

const UserMenu = () => {
  // This would normally be connected to your auth state
  const isLoggedIn = false;

  return (
    <div className="relative group">
      {!isLoggedIn ? (
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="relative">
          <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
            <span>My Account</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="py-1">
              <Link
                href="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                Dashboard
              </Link>
              <Link
                href="/appointments"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                Appointments
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                onClick={() => {/* Add logout handler */}}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;