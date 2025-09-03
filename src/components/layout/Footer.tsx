import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const footerSections = {
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Reviews', href: '/review' },
        { name: 'Testimonials', href: '/testimonials' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Insurance Calculators', href: '/calculators' },
        { name: 'Drug Pricing Tool', href: '/drug-pricing' },
        { name: 'Appointments', href: '/appointments' },
        { name: 'Get a Quote', href: '/quote' },
      ]
    },
    insurance: {
      title: 'Insurance',
      links: [
        { name: 'Life Insurance', href: '/life-insurance' },
        { name: 'Health Insurance', href: '/health-insurance' },
        { name: 'Medicare Plans', href: '/health-insurance/medicare' },
        { name: 'Dental & Vision', href: '/health-insurance/dental' },
      ]
    },
    blog: { // New blog section
      title: 'Recent Blog Posts',
      links: [
        { name: 'Blog Post Title 1', href: '#' }, // Placeholder
        { name: 'Blog Post Title 2', href: '#' }, // Placeholder
        { name: 'Blog Post Title 3', href: '#' }, // Placeholder
        // This section would typically fetch dynamic data
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/legal/terms-of-service' },
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Buckalew Financial Services</h3> {/* Added business name */}
            <div className="space-y-3">
              <p>3031 Mojave Oak Dr</p>
              <p>Valrico, FL 33594</p>
              <p className="mt-4">Phone: 844-779-7600</p>
              <p>Email: larry@buckalewfinancialservices.com</p> {/* Corrected email */}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.values(footerSections).map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="https://www.facebook.com/BuckalewFinancialServices/" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/buckalewfinancialservices" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.013 6.71.06 5.487.108 4.677.293 3.963.558a5.038 5.038 0 00-1.8 1.162A5.044 5.044 0 00.555 3.715c-.266.714-.45 1.524-.498 2.747C.01 7.683 0 8.15 0 11.77s.013 4.086.06 5.305c.048 1.223.233 2.033.498 2.747a5.044 5.044 0 001.207 1.995 5.038 5.038 0 001.8 1.162c.714.265 1.524.45 2.747.498C7.683 23.99 8.15 24 11.77 24s4.086-.013 5.305-.06c1.223-.048 2.033-.233 2.747-.498a5.038 5.038 0 001.8-1.162 5.044 5.044 0 001.207-1.995c.265-.714.45-1.524.498-2.747.047-1.22.06-1.686.06-5.305s-.013-4.086-.06-5.305c-.048-1.223-.233-2.033-.498-2.747A5.044 5.044 0 0021.622 1.72a5.038 5.038 0 00-1.8-1.162C19.108.293 18.298.108 17.075.06 15.856.013 15.39 0 11.77 0zm0 2.162c3.204 0 3.584.012 4.849.07 1.17.053 1.805.249 2.227.413.56.217.96.477 1.382.899.422.422.682.822.899 1.382.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.227-.217.56-.477.96-.899 1.382-.422.422-.822.682-1.382.899-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.227-.413a3.81 3.81 0 01-1.382-.899 3.81 3.81 0 01-.899-1.382c-.164-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.053-1.17.249-1.805.413-2.227.217-.56.477-.96.899-1.382.422-.422.822-.682 1.382-.899.422-.164 1.057-.36 2.227-.413C8.433 2.175 8.813 2.162 12.017 2.162zm0 3.676a5.922 5.922 0 100 11.845 5.922 5.922 0 000-11.845zm0 9.683a3.761 3.761 0 110-7.523 3.761 3.761 0 010 7.523zm7.384-9.253a1.384 1.384 0 11-2.768 0 1.384 1.384 0 012.768 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://x.com/BuckalewLlc" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">X (formerly Twitter)</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/buckalewfinancialservices/?viewAsMember=true" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Buckalew Financial Services. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;