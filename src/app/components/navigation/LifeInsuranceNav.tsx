'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LifeInsuranceNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const menuItems = [
    { href: '/life-insurance/term', label: 'Term Life Insurance' },
    { href: '/life-insurance/whole', label: 'Whole Life Insurance' },
    { href: '/life-insurance/universal', label: 'Universal Life' },
    { href: '/life-insurance/final-expense', label: 'Final Expense' },
    { href: '/life-insurance/accidental-death', label: 'Accidental Death' },
    { href: '/life-insurance/long-term-care', label: 'Long-term Care' },
    { href: '/life-insurance/fixed-annuities', label: 'Fixed Annuities' }
  ];

  return (
    <div className="relative group">
      <button 
        className={`flex items-center space-x-1 text-sm font-medium ${
          menuItems.some(item => isActive(item.href)) 
            ? 'text-blue-600' 
            : 'text-gray-700 dark:text-gray-200'
        } hover:text-blue-600 transition-colors`}
      >
        <span>Life Insurance</span>
        <svg 
          className="w-4 h-4 transform group-hover:rotate-180 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 text-sm ${
                isActive(item.href)
                  ? 'text-blue-600 bg-blue-50 dark:bg-gray-700'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
              } transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifeInsuranceNav;