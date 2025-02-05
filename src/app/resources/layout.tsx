'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Guides & Resources', href: '/resources/guides' },
    { name: 'Educational Content', href: '/resources/educational' },
    { name: 'Insurance Calculator', href: '/calculators' },
    { name: 'Drug Pricing Tool', href: '/drug-pricing' },
    { name: 'FAQ', href: '/resources/faq' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto">
          <nav className="flex overflow-x-auto py-4">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium ${
                  pathname === tab.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}