'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = {
    insurance: {
      title: 'Insurance',
      links: [
        { text: 'Life Insurance', href: '/life-insurance' },
        { text: 'Health Insurance', href: '/health-insurance' },
        { text: 'Medicare', href: '/medicare' },
        { text: 'Get a Quote', href: '/quote' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Contact', href: '/contact' },
        { text: 'Reviews', href: '/reviews' },
        { text: 'Blog', href: '/blog' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { text: 'Insurance Calculator', href: '/calculators' },
        { text: 'Drug Pricing Tool', href: '/drug-pricing' },
        { text: 'Medicare Guide', href: '/medicare/guide' },
        { text: 'FAQ', href: '/resources/faq' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '/privacy-policy' },
        { text: 'Terms of Service', href: '/terms-of-service' },
        { text: 'Accessibility', href: '/accessibility' },
        { text: 'Sitemap', href: '/sitemap' }
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(sections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-lg font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition duration-150"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300">Phone: 844-779-7600</p>
              <p className="text-gray-300">Email: larry@buckalewfinancialservices.com</p>
              <p className="text-gray-300">
                3031 Mojave Oak Dr<br />
                Valrico, FL 33594
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Office Hours</h3>
              <p className="text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-300">Saturday: By Appointment</p>
              <p className="text-gray-300">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {currentYear} Buckalew Financial Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};