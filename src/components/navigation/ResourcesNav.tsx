import React from 'react';
import Link from 'next/link';

const resources = [
  {
    title: 'Tools & Calculators',
    items: [
      { name: 'Insurance Calculators', path: '/calculators' },
      { name: 'Drug Pricing Tool', path: '/drug-pricing' },
    ]
  },
  {
    title: 'Customer Experience',
    items: [
      { name: 'Reviews', path: '/review' },
      { name: 'Testimonials', path: '/testimonials' },
    ]
  }
];

const ResourcesNav = () => {
  return (
    <nav className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
        <span>Resources</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="p-4">
          {resources.map((section, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.path}
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ResourcesNav;