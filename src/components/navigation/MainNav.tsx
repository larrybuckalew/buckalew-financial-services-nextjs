import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LifeInsuranceNav from './LifeInsuranceNav';
import HealthInsuranceNav from './HealthInsuranceNav';
import ResourcesNav from './ResourcesNav';
import UserMenu from './UserMenu';

const MainNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Buckalew Financial Services"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            {/* Insurance Hub Link */}
            <Link 
              href="/insurance"
              className="text-gray-700 hover:text-blue-600"
            >
              Insurance
            </Link>

            {/* Life Insurance Mega Menu */}
            <LifeInsuranceNav />

            {/* Health Insurance Mega Menu */}
            <HealthInsuranceNav />

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Resources</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link href="/calculators" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    Insurance Calculators
                  </Link>
                  <Link href="/drug-pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    Drug Pricing Tool
                  </Link>
                  <Link href="/testimonials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    Testimonials
                  </Link>
                  <Link href="/review" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    Reviews
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/about"
              className="text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>
            
            <Link 
              href="/contact"
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Menu - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* User Menu (Login/Register or Dashboard) */}
            <UserMenu />

            {/* Quote Button */}
            <Link
              href="/quote"
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
            
            <Link 
              href="/insurance"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Insurance
            </Link>
            
            <div className="relative">
              <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Life Insurance
              </button>
            </div>

            <div className="relative">
              <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
                Health Insurance
              </button>
            </div>

            <Link 
              href="/calculators"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Calculators
            </Link>

            <Link 
              href="/drug-pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Drug Pricing
            </Link>

            <Link 
              href="/testimonials"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Testimonials
            </Link>

            <Link 
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              About Us
            </Link>

            <Link 
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-3 space-y-2">
                <Link 
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                >
                  Sign in
                </Link>
                <Link 
                  href="/register"
                  className="block px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            </div>

            <Link
              href="/quote"
              className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 mt-4"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNav;