import React, { ReactNode } from 'react';
import MainNav from '@/components/navigation/MainNav';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Professional Navigation */}
      <MainNav />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Buckalew Financial Services</h3>
              <p className="text-gray-300 mb-4">
                Your trusted partner for comprehensive insurance and financial planning solutions.
              </p>
              <p className="text-sm text-gray-400">
                Licensed in Texas and surrounding states.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Insurance Services</h4>
              <ul className="space-y-2">
                <li><a href="/life-insurance" className="text-gray-300 hover:text-white">Life Insurance</a></li>
                <li><a href="/health-insurance" className="text-gray-300 hover:text-white">Health Insurance</a></li>
                <li><a href="/health-insurance/medicare" className="text-gray-300 hover:text-white">Medicare Plans</a></li>
                <li><a href="/health-insurance/aca" className="text-gray-300 hover:text-white">ACA Marketplace</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/calculators" className="text-gray-300 hover:text-white">Financial Calculators</a></li>
                <li><a href="/blog" className="text-gray-300 hover:text-white">Insurance Blog</a></li>
                <li><a href="/testimonials" className="text-gray-300 hover:text-white">Customer Reviews</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Get Started</h4>
              <div className="space-y-3">
                <a 
                  href="/quote" 
                  className="block bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700 transition-colors"
                >
                  Get Free Quote
                </a>
                <div className="text-gray-300">
                  <p className="text-sm mb-1">📧 larry@buckalewfinancialservices.com</p>
                  <p className="text-sm">📞 (844) 779-7600</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Buckalew Financial Services. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
