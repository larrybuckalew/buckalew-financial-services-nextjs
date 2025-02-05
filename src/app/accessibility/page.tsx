'use client';

import React from 'react';

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="mb-4">
            Buckalew Financial Services is committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone, and applying the relevant accessibility 
            standards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Measures We Take</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Text alternatives for non-text content</li>
            <li>Keyboard navigation support</li>
            <li>Clear headings and page structure</li>
            <li>Color contrast compliance</li>
            <li>Resizable text support</li>
            <li>Screen reader compatibility</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
          <p className="mb-4">
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers 
            and developers to improve accessibility for people with disabilities. It defines 
            three levels of conformance: Level A, Level AA, and Level AAA. Our website strives 
            to conform to WCAG 2.1 level AA.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
          <p className="mb-4">
            We welcome your feedback on the accessibility of our website. If you encounter any 
            accessibility barriers or have suggestions for improvement, please contact us:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p>Buckalew Financial Services</p>
            <p>3031 Mojave Oak Dr</p>
            <p>Valrico, FL 33594</p>
            <p>Phone: 844-779-7600</p>
            <p>Email: larry@buckalewfinancialservices.com</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Assessment Methods</h2>
          <p className="mb-4">
            We assess our website's accessibility through:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Regular automated testing</li>
            <li>Manual keyboard navigation testing</li>
            <li>Screen reader testing</li>
            <li>User feedback evaluation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Support</h2>
          <p className="mb-4">
            If you need assistance with any part of our website or would like to request 
            information in an alternative format, please don't hesitate to contact us. We're 
            here to help ensure that our services are accessible to everyone.
          </p>
        </section>

        <footer className="text-sm text-gray-600 dark:text-gray-400">
          <p>Last updated: February 03, 2024</p>
        </footer>
      </div>
    </div>
  );
}