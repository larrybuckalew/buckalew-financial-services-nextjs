'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'

export const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  // Navigation items structure
  const navItems = {
    health: {
      title: 'Health Insurance',
      items: [
        { title: 'Individual Health', href: '/health-insurance/individual' },
        { title: 'Family Health', href: '/health-insurance/family' },
        { title: 'Dental Insurance', href: '/health-insurance/dental' },
        { title: 'Vision Insurance', href: '/health-insurance/vision' },
        { title: 'Hearing Insurance', href: '/health-insurance/hearing' },
        { title: 'ACA Plans', href: '/health-insurance/aca' },
        { title: 'Specialty Plans', href: '/health-insurance/specialty-plans' },
      ]
    },
    life: {
      title: 'Life Insurance',
      items: [
        { title: 'Term Life', href: '/life-insurance/term' },
        { title: 'Whole Life', href: '/life-insurance/whole' },
        { title: 'Universal Life', href: '/life-insurance/universal' },
        { title: 'Final Expense', href: '/life-insurance/final-expense' },
        { title: 'Accidental Death', href: '/life-insurance/accidental-death' },
        { title: 'Long-term Care', href: '/life-insurance/long-term-care' },
        { title: 'Fixed Annuities', href: '/life-insurance/fixed-annuities' },
      ]
    },
    medicare: {
      title: 'Medicare',
      items: [
        { title: 'Medicare Home', href: '/medicare' },
        { title: 'Medicare Guide', href: '/medicare/guide' },
        { title: 'Part A', href: '/medicare/part-a' },
        { title: 'Part B', href: '/medicare/part-b' },
        { title: 'Medicare Advantage', href: '/medicare/advantage' },
        { title: 'Part D', href: '/medicare/part-d' },
        { title: 'Medicare Supplement', href: '/medicare/supplement' },
        { title: 'Eligibility', href: '/medicare/eligibility' },
        { title: 'Enrollment', href: '/medicare/enrollment' },
        { title: 'Resources', href: '/medicare/resources' },
      ]
    },
    resources: {
      title: 'Resources',
      items: [
        { title: 'Blog', href: '/blog' },
        { title: 'Calculators', href: '/calculators' },
        { title: 'Educational Resources', href: '/resources/educational' },
        { title: 'FAQ', href: '/resources/faq' },
        { title: 'Insurance Glossary', href: '/resources/glossary' },
        { title: 'Drug Pricing Tool', href: '/resources/drug-pricing' },
      ]
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-primary-600 dark:text-white font-bold text-xl">
              Buckalew Financial
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/about" 
              className="text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary transition-colors"
            >
              About
            </Link>
            {Object.entries(navItems).map(([key, section]) => (
              <div key={key} className="relative group">
                <button 
                  className="text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary transition-colors flex items-center"
                  onClick={() => toggleSubmenu(key)}
                >
                  {section.title}
                  <span className="ml-1">▼</span>
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                  <div className="rounded-md ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {section.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-secondary hover:text-white transition-colors"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link 
              href="/contact" 
              className="text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-secondary p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Theme Toggle and CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-200 hover:text-secondary"
                aria-label="Toggle theme"
              >
                {mounted && theme === 'dark' ? '🌞' : '🌙'}
              </button>
            )}
            <Link 
              href="/quote" 
              className="bg-primary-600 hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <Link 
              href="/" 
              className="text-primary-600 dark:text-white font-bold text-xl"
              onClick={() => setIsOpen(false)}
            >
              Buckalew Financial
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 dark:text-gray-200 hover:text-secondary"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <Link 
              href="/about" 
              className="block text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {Object.entries(navItems).map(([key, section]) => (
              <div key={key} className="space-y-2">
                <button
                  onClick={() => toggleSubmenu(key)}
                  className="flex items-center justify-between w-full text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary py-2"
                >
                  {section.title}
                  <span className={`transform transition-transform ${openSubmenu === key ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className={`${openSubmenu === key ? 'block' : 'hidden'} pl-4 space-y-2`}>
                  {section.items.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link 
              href="/contact" 
              className="block text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-4 flex items-center justify-between">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-200 hover:text-secondary"
                  aria-label="Toggle theme"
                >
                  {mounted && theme === 'dark' ? '🌞' : '🌙'}
                </button>
              )}
              <Link 
                href="/quote" 
                className="bg-primary-600 hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};