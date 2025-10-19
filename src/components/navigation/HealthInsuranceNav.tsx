import React from 'react';
import Link from 'next/link';

const healthInsuranceProducts = [
  {
    title: 'Medicare Insurance',
    path: '/health-insurance/medicare',
    description: 'Comprehensive Medicare coverage options',
    subItems: [
      { name: 'Medicare Advantage', path: '/health-insurance/medicare/advantage' },
      { name: 'Medicare Supplement', path: '/health-insurance/medicare/supplement' },
      { name: 'Prescription Drug Plans', path: '/health-insurance/medicare#part-d' },
    ]
  },
  {
    title: 'ACA Health Plans',
    path: '/health-insurance/aca',
    description: 'Affordable Care Act compliant coverage',
    subItems: [
      { name: 'Individual Plans', path: '/health-insurance/aca#individual' },
      { name: 'Family Coverage', path: '/health-insurance/aca#family' },
      { name: 'Subsidies & Savings', path: '/health-insurance/aca#subsidies' },
    ]
  },
  {
    title: 'Dental Insurance',
    path: '/health-insurance/dental',
    description: 'Coverage for dental care and procedures',
    subItems: [
      { name: 'Preventive Care', path: '/health-insurance/dental#preventive' },
      { name: 'Major Services', path: '/health-insurance/dental#major' },
      { name: 'Orthodontic Coverage', path: '/health-insurance/dental#orthodontic' },
    ]
  },
  {
    title: 'Vision Insurance',
    path: '/health-insurance/vision',
    description: 'Plans for eye care and eyewear',
    subItems: [
      { name: 'Eye Exams', path: '/health-insurance/vision#exams' },
      { name: 'Glasses Coverage', path: '/health-insurance/vision#glasses' },
      { name: 'Contact Lenses', path: '/health-insurance/vision#contacts' },
    ]
  },
  {
    title: 'Hearing Insurance',
    path: '/health-insurance/hearing',
    description: 'Coverage for hearing tests and devices',
    subItems: [
      { name: 'Hearing Tests', path: '/health-insurance/hearing#tests' },
      { name: 'Hearing Aids', path: '/health-insurance/hearing#aids' },
      { name: 'Maintenance Coverage', path: '/health-insurance/hearing#maintenance' },
    ]
  },
  {
    title: 'Specialty Plans',
    path: '/health-insurance/specialty-plans',
    description: 'Coverage for specific health conditions',
    subItems: [
      { name: 'Cancer Insurance', path: '/health-insurance/specialty-plans#cancer' },
      { name: 'Heart/Stroke Coverage', path: '/health-insurance/specialty-plans#heart' },
      { name: 'Critical Illness Plans', path: '/health-insurance/specialty-plans#critical-illness' },
    ]
  }
];

const HealthInsuranceNav = () => {
  return (
    <nav className="relative group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
        <span>Health Insurance</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mega Menu Dropdown */}
      <div className="absolute left-0 mt-2 w-screen max-w-screen-xl bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="p-6 grid grid-cols-3 gap-6">
          {healthInsuranceProducts.map((product, index) => (
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
                href="/quote?type=health"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Get Health Insurance Quote →
              </Link>
              <Link 
                href="/contact"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Speak with an Agent →
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              Open Enrollment Help Available
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HealthInsuranceNav;