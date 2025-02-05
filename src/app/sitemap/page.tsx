'use client';

import React from 'react';
import Link from 'next/link';

export default function SitemapPage() {
  const siteStructure = {
    'Main Pages': [
      { title: 'Home', href: '/' },
      { title: 'About Us', href: '/about' },
      { title: 'Contact', href: '/contact' },
      { title: 'Get a Quote', href: '/quote' }
    ],
    'Medicare': [
      { title: 'Medicare Overview', href: '/medicare' },
      { title: 'Medicare Guide', href: '/medicare/guide' },
      { title: 'Medicare Part A', href: '/medicare/part-a' },
      { title: 'Medicare Part B', href: '/medicare/part-b' },
      { title: 'Medicare Advantage (Part C)', href: '/medicare/advantage' },
      { title: 'Medicare Part D', href: '/medicare/part-d' },
      { title: 'Medicare Supplement', href: '/medicare/supplement' },
      { title: 'Medicare Eligibility', href: '/medicare/eligibility' },
      { title: 'Medicare Enrollment', href: '/medicare/enrollment' },
      { title: 'Medicare Resources', href: '/medicare/resources' }
    ],
    'Health Insurance': [
      { title: 'Health Insurance Overview', href: '/health-insurance' },
      { title: 'Individual Health', href: '/health-insurance/individual' },
      { title: 'Family Health', href: '/health-insurance/family' },
      { title: 'Dental Insurance', href: '/health-insurance/dental' },
      { title: 'Vision Insurance', href: '/health-insurance/vision' },
      { title: 'Hearing Insurance', href: '/health-insurance/hearing' },
      { title: 'ACA Plans', href: '/health-insurance/aca' },
      { title: 'Specialty Plans', href: '/health-insurance/specialty-plans' }
    ],
    'Life Insurance': [
      { title: 'Life Insurance Overview', href: '/life-insurance' },
      { title: 'Term Life', href: '/life-insurance/term' },
      { title: 'Whole Life', href: '/life-insurance/whole' },
      { title: 'Universal Life', href: '/life-insurance/universal' },
      { title: 'Final Expense', href: '/life-insurance/final-expense' },
      { title: 'Accidental Death', href: '/life-insurance/accidental-death' },
      { title: 'Long-term Care', href: '/life-insurance/long-term-care' },
      { title: 'Fixed Annuities', href: '/life-insurance/fixed-annuities' }
    ],
    'Tools & Resources': [
      { title: 'Blog', href: '/blog' },
      { title: 'Insurance Calculators', href: '/calculators' },
      { title: 'Drug Pricing Tool', href: '/drug-pricing' },
      { title: 'Educational Resources', href: '/resources/educational' },
      { title: 'FAQ', href: '/resources/faq' },
      { title: 'Insurance Glossary', href: '/resources/glossary' },
      { title: 'Testimonials', href: '/testimonials' },
      { title: 'Reviews', href: '/reviews' }
    ],
    'Account Services': [
      { title: 'My Dashboard', href: '/dashboard' },
      { title: 'My Profile', href: '/profile' },
      { title: 'Login', href: '/login' },
      { title: 'Register', href: '/register' },
      { title: 'Schedule Appointment', href: '/appointments' },
      { title: 'Account Settings', href: '/settings' }
    ],
    'Legal & Company': [
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Terms of Service', href: '/terms-of-service' },
      { title: 'Accessibility', href: '/accessibility' },
      { title: 'Sitemap', href: '/sitemap' }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Site Map</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(siteStructure).map(([category, links]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700 pb-2">
              {category}
            </h2>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Need Assistance?</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Contact Information:</h3>
          <div className="space-y-2">
            <p>Buckalew Financial Services</p>
            <p>3031 Mojave Oak Dr</p>
            <p>Valrico, FL 33594</p>
            <p>Phone: 844-779-7600</p>
            <p>Email: larry@buckalewfinancialservices.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}