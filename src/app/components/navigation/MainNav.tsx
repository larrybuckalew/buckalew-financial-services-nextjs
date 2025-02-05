'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import MobileNav from './MobileNav';

export const MainNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navItems = {
    medicare: {
      title: 'Medicare',
      items: [
        { title: 'Medicare Guide', href: '/medicare/guide' },
        { title: 'Part A Coverage', href: '/medicare/part-a' },
        { title: 'Part B Coverage', href: '/medicare/part-b' },  // Updated path
        { title: 'Medicare Advantage', href: '/medicare/advantage' },
        { title: 'Medicare Part D', href: '/medicare/part-d' },
        { title: 'Medicare Supplement', href: '/medicare/supplement' },
        { title: 'Eligibility', href: '/medicare/eligibility' },
        { title: 'Enrollment', href: '/medicare/enrollment' },
        { title: 'Resources', href: '/medicare/resources' }
      ]
    },
    insurance: {
      title: 'Insurance',
      items: [
        { title: 'Health Insurance', href: '/health-insurance' },
        { title: 'Life Insurance', href: '/life-insurance' },
        { title: 'Insurance Overview', href: '/insurance' }
      ]
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-brand-primary hover:text-brand-green-light transition-colors">
                Buckalew Financial
              </Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {Object.entries(navItems).map(([key, section]) => (
                <div key={key} className="relative group">
                  <button 
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors
                      ${isActive(section.items[0].href) 
                        ? 'text-brand-green-dark border-b-2 border-brand-green-dark' 
                        : 'text-gray-500 hover:text-brand-green-light border-b-2 border-transparent hover:border-brand-green-light'
                      }`}
                  >
                    {section.title}
                    <svg 
                      className="ml-2 h-4 w-4 transform group-hover:rotate-180 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 text-sm ${
                          isActive(item.href)
                            ? 'text-brand-green-dark bg-gray-50'
                            : 'text-gray-700 hover:text-brand-green-light hover:bg-gray-50'
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Static Links */}
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors
                  ${isActive('/about')
                    ? 'border-brand-green-dark text-brand-green-dark'
                    : 'border-transparent text-gray-500 hover:text-brand-green-light hover:border-brand-green-light'
                  }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors
                  ${isActive('/contact')
                    ? 'border-brand-green-dark text-brand-green-dark'
                    : 'border-transparent text-gray-500 hover:text-brand-green-light hover:border-brand-green-light'
                  }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-green-light hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen}
        navItems={navItems}
      />
    </nav>
  );
};

export default MainNav;