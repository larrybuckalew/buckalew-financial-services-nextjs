'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Grid Layout for Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Phone: <Link href="tel:8447797600" className="hover:text-green-0 transition-colors">(844) 779-7600</Link></p>
            <p>Email: <Link href="mailto:larry@buckalewfinancialservices.com" className="hover:text-green-0 transition-colors">larry@buckalewfinancialservices.com</Link></p>
            <p>Address: <br />3031 Mojave Oak Dr, Valrico FL 33594</p>
          </div>
          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/medicare" className="hover:text-green-0 transition-colors">Medicare</Link></li>
              <li><Link href="/health-insurance" className="hover:text-green-0 transition-colors">Health Insurance</Link></li>
              <li><Link href="/life-insurance" className="hover:text-green-0 transition-colors">Life Insurance</Link></li>
            </ul>
          </div>
          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="hover:text-green-0 transition-colors">Blog</Link></li>
              <li><Link href="/calculators" className="hover:text-green-0 transition-colors">Calculators</Link></li>
              <li><Link href="/resources/drug-pricing" className="hover:text-green-0 transition-colors">Drug Pricing</Link></li>
            </ul>
          </div>
          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-green-0 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-green-0 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-green-0 text-center">
          <p>© 2025 Buckalew Financial Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
