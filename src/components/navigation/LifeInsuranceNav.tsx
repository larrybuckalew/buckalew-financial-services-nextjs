import React from 'react';
import Link from 'next/link';

const lifeInsuranceProducts = [
  {
    title: 'Term Life Insurance',
    path: '/life-insurance/term-life',
    description: 'Affordable coverage for a specific period',
    subItems: [
      { name: '10-Year Term', path: '/life-insurance/term-life#10-year' },
      { name: '20-Year Term', path: '/life-insurance/term-life#20-year' },
      { name: '30-Year Term', path: '/life-insurance/term-life#30-year' },
    ]
  },
  {
    title: 'Whole Life Insurance',
    path: '/life-insurance/whole-life',
    description: 'Permanent coverage with cash value growth',
    subItems: [
      { name: 'Traditional Whole Life', path: '/life-insurance/whole-life#traditional' },
      { name: 'Guaranteed Issue Whole Life', path: '/life-insurance/whole-life#guaranteed' },
    ]
  },
  {
    title: 'Long Term Care',
    path: '/life-insurance/long-term-care',
    description: 'Comprehensive long-term care coverage',
    subItems: [
      { name: 'Traditional LTC', path: '/life-insurance/long-term-care#traditional' },
      { name: 'Hybrid LTC', path: '/life-insurance/long-term-care#hybrid' },
      { name: 'Asset-Based LTC', path: '/life-insurance/long-term-care#asset-based' },
    ]
  },
  {
    title: 'Accidental Death Insurance',
    path: '/life-insurance/accidental-death',
    description: 'Protection against accidental death and injuries',
    subItems: [
      { name: 'Standalone Coverage', path: '/life-insurance/accidental-death#standalone' },
      { name: 'Riders & Add-ons', path: '/life-insurance/accidental-death#riders' },
    ]
  },
  {
    title: 'Final Expense Insurance',
    path: '/life-insurance/final-expense',
    description: 'Coverage for end-of-life expenses',
    subItems: [
      { name: 'Simplified Issue', path: '/life-insurance/final-expense#simplified' },
      { name: 'Guaranteed Issue', path: '/life-insurance/final-expense#guaranteed' },
    ]
  },
  {
    title: 'Indexed Universal Life (IUL)',
    path: '/life-insurance/indexed-universal-life',
    description: 'Flexible coverage with market-linked growth',
    subItems: [
      { name: 'Growth-Oriented IUL', path: '/life-insurance/indexed-universal-life#growth' },
      { name: 'Protection-Focused IUL', path: '/life-insurance/indexed-universal-life#protection' },
    ]
  },
  {
    title: 'Fixed Annuities',
    path: '/life-insurance/fixed-annuities',
    description: 'Guaranteed retirement income',
    subItems: [
      { name: 'Immediate Annuities', path: '/life-insurance/fixed-annuities#immediate' },
      { name: 'Deferred Annuities', path: '/life-insurance/fixed-annuities#deferred' },
    ]
  }
];

const LifeInsuranceNav = () => {
  return (
    <nav className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
        <span>Life Insurance</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mega Menu Dropdown */}
      <div className="absolute left-0 mt-2 w-screen max-w-screen-xl bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="p-6 grid grid-cols-3 gap-6">
          {lifeInsuranceProducts.map((product, index) => (
            <div key={index} className="space-y-3">
              <Link 
                href={product.path}
                className="block text-lg font-semibold text-gray-900 hover:text-blue-600"
              >
                {product.title}
              </Link>
              <p className="text-sm text-gray-600">
                {product.description}
              </p>
              <ul className="space-y-2">
                {product.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link 
                      href={subItem.path}
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Links Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Link 
                href="/quote?type=life"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Get a Quick Quote →
              </Link>
              <Link 
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Speak with an Agent →
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              Call us: (800) XXX-XXXX
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LifeInsuranceNav;