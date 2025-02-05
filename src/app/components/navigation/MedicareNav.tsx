'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MedicareNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const sections = {
    plans: {
      title: 'Medicare Coverage',
      items: [
        { href: '/medicare/part-a', label: 'Part A (Hospital Insurance)' },
        { href: '/medicare/part-b', label: 'Part B (Medical Insurance)' },
        { href: '/medicare/advantage', label: 'Medicare Advantage (Part C)' },
        { href: '/medicare/part-d', label: 'Prescription Drug Plans (Part D)' },
        { href: '/medicare/supplement', label: 'Medicare Supplement' }
      ]
    },
    info: {
      title: 'Resources & Information',
      items: [
        { href: '/medicare/guide', label: 'Medicare Guide' },
        { href: '/medicare/eligibility', label: 'Eligibility' },
        { href: '/medicare/enrollment', label: 'Enrollment Periods' },
        { href: '/medicare/resources', label: 'Medicare Resources' }
      ]
    }
  };

  return (
    <div className="relative group">
      <button 
        className={`flex items-center space-x-1 text-sm font-medium ${
          Object.values(sections).some(section => 
            section.items.some(item => isActive(item.href))
          ) 
            ? 'text-brand-green-dark' 
            : 'text-gray-700 dark:text-gray-200'
        } hover:text-brand-green-light transition-colors`}
      >
        <span>Medicare</span>
        <svg 
          className="w-4 h-4 transform group-hover:rotate-180 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute left-0 mt-2 w-screen max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="grid grid-cols-1 gap-2 p-4">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className="space-y-2">
              <h3 className="text-sm font-semibold text-brand-primary dark:text-gray-100 px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 text-sm rounded-lg ${
                      isActive(item.href)
                        ? 'text-brand-green-dark bg-brand-green-soft/10 dark:bg-gray-700'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-brand-green-light'
                    } transition-colors`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicareNav;