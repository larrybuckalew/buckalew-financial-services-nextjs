'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

const SearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    // Simulated search results - replace with actual API call
    const mockResults: SearchResult[] = [
      {
        title: 'Medicare Advantage Plans',
        description: 'Learn about Medicare Advantage (Part C) plans and coverage options.',
        href: '/medicare/advantage',
        category: 'Medicare'
      },
      {
        title: 'Term Life Insurance',
        description: 'Explore term life insurance policies and rates.',
        href: '/life-insurance/term',
        category: 'Life Insurance'
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setResults(mockResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    ));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
          >
            <div className="container mx-auto px-4 pt-20">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for insurance services, resources..."
                      className="w-full pl-12 pr-12 py-4 text-lg bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Search Results */}
                  <div className="max-h-[60vh] overflow-y-auto p-4">
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : results.length > 0 ? (
                      <div className="space-y-6">
                        {results.map((result, index) => (
                          <Link
                            key={index}
                            href={result.href}
                            onClick={() => setIsOpen(false)}
                            className="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 transition-colors"
                          >
                            <p className="text-xs font-medium text-blue-600 mb-1">
                              {result.category}
                            </p>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                              {result.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {result.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery ? (
                      <p className="text-center text-gray-600 dark:text-gray-300 py-8">
                        No results found for "{searchQuery}"
                      </p>
                    ) : (
                      <div className="text-center text-gray-600 dark:text-gray-300 py-8">
                        Start typing to search
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchOverlay;