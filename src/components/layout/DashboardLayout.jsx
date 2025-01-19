import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Wallet, Settings, LogOut, Bell, Search } from 'lucide-react';
import useAuthStore from '@/store/auth';
import Input from '../ui/Input';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      href: '/dashboard' 
    },
    { 
      icon: Wallet, 
      label: 'Portfolios', 
      href: '/portfolios' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      href: '/settings' 
    }
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed left-0 top-0 bottom-0 overflow-y-auto">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">Buckalew Financial</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`
                    flex items-center p-2 rounded-md transition-colors
                    ${router.pathname === item.href 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-100 text-gray-700'}
                  `}
                >
                  <item.icon className="mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button 
                onClick={handleLogout}
                className="
                  w-full flex items-center p-2 rounded-md
                  text-red-600 hover:bg-red-50
                "
              >
                <LogOut className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Input 
                  type="text"
                  placeholder="Search transactions, portfolios..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* User and Notification Area */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell className="text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;