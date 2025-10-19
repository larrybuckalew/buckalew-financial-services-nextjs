"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInsuranceDropdownOpen, setIsInsuranceDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const toggleInsuranceDropdown = () => {
        setIsInsuranceDropdownOpen(!isInsuranceDropdownOpen);
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsInsuranceDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (<nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">
                Buckalew Financial
              </span>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              
              {/* Insurance Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleInsuranceDropdown} className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Insurance
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                {isInsuranceDropdownOpen && (<div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-50">
                    {/* Life Insurance Section */}
                    <div className="px-4 py-2 border-b border-gray-200">
                      <Link href="/life-insurance" className="block text-sm font-semibold text-gray-900 hover:text-blue-600" onClick={() => setIsInsuranceDropdownOpen(false)}>
                        Life Insurance
                      </Link>
                      <div className="mt-2 ml-3 space-y-1">
                        <Link href="/life-insurance/term-life" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Term Life
                        </Link>
                        <Link href="/life-insurance/whole-life" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Whole Life
                        </Link>
                        <Link href="/life-insurance/indexed-universal-life" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Universal Life
                        </Link>
                        <Link href="/life-insurance/final-expense" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Final Expense
                        </Link>
                        <Link href="/life-insurance/accidental-death" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Accidental Death
                        </Link>
                        <Link href="/life-insurance/long-term-care" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Long-Term Care
                        </Link>
                        <Link href="/life-insurance/fixed-annuities" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Fixed Annuities
                        </Link>
                      </div>
                    </div>

                    {/* Health Insurance Section */}
                    <div className="px-4 py-2">
                      <Link href="/health-insurance" className="block text-sm font-semibold text-gray-900 hover:text-blue-600" onClick={() => setIsInsuranceDropdownOpen(false)}>
                        Health Insurance
                      </Link>
                      <div className="mt-2 ml-3 space-y-1">
                        <Link href="/health-insurance/medicare" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Medicare Plans
                        </Link>
                        <Link href="/health-insurance/aca" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          ACA Plans
                        </Link>
                        <Link href="/health-insurance/dental" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Dental Insurance
                        </Link>
                        <Link href="/health-insurance/vision" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Vision Insurance
                        </Link>
                        <Link href="/health-insurance/hearing" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Hearing Insurance
                        </Link>
                        <Link href="/health-insurance/specialty-plans" className="block text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded" onClick={() => setIsInsuranceDropdownOpen(false)}>
                          Specialty Plans
                        </Link>
                      </div>
                    </div>
                  </div>)}
              </div>

              <Link href="/resources" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                Resources
              </Link>
              <Link href="/calculators" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                Calculators
              </Link>
              <Link href="/blog" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
              {user && (<Link href="/dashboard" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>)}
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            {user ? (<div className="flex items-center">
                <span className="text-white mr-4">
                  Welcome, {user.firstName}
                </span>
                <button onClick={logout} className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </button>
              </div>) : (<div className="flex space-x-4">
                <Link href="/auth/login" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link href="/auth/register" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
              </div>)}
          </div>
        </div>
      </div>
    </nav>);
};
export default Navbar;
