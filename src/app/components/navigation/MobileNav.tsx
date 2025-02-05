'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const menuItems = {
    medicare: {
      title: 'Medicare',
      items: [
        { href: '/medicare/guide', label: 'Medicare Guide' },
        { href: '/medicare/part-a', label: 'Part A Coverage' },
        { href: '/medicare/part-b', label: 'Part B Coverage' },  // Updated path
        { href: '/medicare/advantage', label: 'Medicare Advantage' },
        { href: '/medicare/part-d', label: 'Prescription Drug Plans' },
        { href: '/medicare/supplement', label: 'Medicare Supplement' },
        { href: '/medicare/eligibility', label: 'Eligibility' },
        { href: '/medicare/enrollment', label: 'Enrollment' }
      ]
    },
    insurance: {
      title: 'Insurance',
      items: [
        { href: '/health-insurance', label: 'Health Insurance' },
        { href: '/life-insurance', label: 'Life Insurance' },
        { href: '/insurance', label: 'Insurance Overview' }
      ]
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.mobile-nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setActiveDropdown(null);
    }
  }, [isOpen]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleLinkClick = () => {
    onClose();
    setActiveDropdown(null);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'visible' : 'invisible'}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Mobile menu panel */}
      <div 
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-500 hover:text-brand-green-light"
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu content */}
        <div className="h-full overflow-y-auto py-16 px-4">
          <nav className="space-y-6">
            {Object.entries(menuItems).map(([key, section]) => (
              <div key={key} className="mobile-nav-dropdown">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="flex w-full items-center justify-between text-lg font-medium text-gray-900 hover:text-brand-green-light"
                  aria-expanded={activeDropdown === key}
                >
                  <span>{section.title}</span>
                  <svg
                    className={`h-5 w-5 transform transition-transform duration-200 ${
                      activeDropdown === key ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 space-y-2 pl-4"
                    >
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleLinkClick}
                          className={`block py-2 text-sm ${
                            isActive(item.href)
                              ? 'text-brand-green-dark font-medium'
                              : 'text-gray-600 hover:text-brand-green-light'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Static Links */}
            <Link
              href="/about"
              onClick={handleLinkClick}
              className={`block py-2 text-lg font-medium ${
                isActive('/about')
                  ? 'text-brand-green-dark'
                  : 'text-gray-900 hover:text-brand-green-light'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={`block py-2 text-lg font-medium ${
                isActive('/contact')
                  ? 'text-brand-green-dark'
                  : 'text-gray-900 hover:text-brand-green-light'
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;