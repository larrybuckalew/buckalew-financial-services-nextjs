'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ResourcesNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const resourceItems = [
    {
      href: '/blog',
      title: 'Blog',
      description: 'Latest insurance insights and tips'
    },
    {
      href: '/calculators',
      title: 'Calculators',
      description: 'Insurance and retirement calculators'
    },
    {
      href: '/drug-pricing',
      title: 'Drug Pricing Tool',
      description: 'Compare medication costs'
    },
    {
      href: '/resources/educational',
      title: 'Educational Resources',
      description: 'Learn about insurance options'
    },
    {
      href: '/resources/faq',
      title: 'FAQ',
      description: 'Common insurance questions'
    }
  ];

  return (
    <div className="relative group">
      <button 
        className={`flex items-center space-x-1 text-sm font-medium ${
          resourceItems.some(item => isActive(item.href)) 
            ? 'text-blue-600' 
            : 'text-gray-700 dark:text-gray-200'
        } hover:text-blue-600 transition-colors`}
      >
        <span>Resources</span>
        <svg 
          className="w-4 h-4 transform group-hover:rotate-180 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-4 space-y-2">
          {resourceItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-3 rounded-lg ${
                isActive(item.href)
                  ? 'bg-blue-50 dark:bg-gray-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              } transition-colors`}
            >
              <p className={`text-sm font-medium ${
                isActive(item.href)
                  ? 'text-blue-600'
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {item.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesNav;