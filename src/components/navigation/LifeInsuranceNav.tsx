'use client';
import React from 'react';
import Link from 'next/link';

const LifeInsuranceNav = () => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-secondary">
        <span>Life Insurance</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="py-2">
          <Link href="/life-insurance/term" className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary hover:text-white">
            Term Life Insurance
          </Link>
          <Link href="/life-insurance/whole" className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary hover:text-white">
            Whole Life Insurance
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LifeInsuranceNav;