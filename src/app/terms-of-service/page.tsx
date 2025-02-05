'use client';

import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p>
            By accessing or using the services provided by Buckalew Financial Services, 
            you agree to be bound by these Terms of Service. If you disagree with any 
            part of the terms, you may not access our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description of Services</h2>
          <p>
            Buckalew Financial Services provides insurance consultation, quotes, and related 
            services. We act as an intermediary between clients and insurance providers, 
            offering guidance and recommendations based on individual needs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <p>When using our services, you agree to:</p>
          <ul className="list-disc pl-6">
            <li>Provide accurate and truthful information</li>
            <li>Keep your contact information updated</li>
            <li>Use our services in compliance with applicable laws</li>
            <li>Respect the privacy and rights of others</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy and Data Collection</h2>
          <p>
            We collect and use information as described in our Privacy Policy. By using 
            our services, you consent to our data practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p>
            The information provided on our website and through our services is for general 
            informational purposes only. While we strive to keep information current and 
            accurate, we make no representations or warranties about the completeness, 
            reliability, or accuracy of this information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users 
            of any material changes by posting the new Terms of Service on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws 
            of the State of Florida, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <p className="mb-2">For questions about these Terms of Service, please contact:</p>
            <div className="space-y-1">
              <p>Buckalew Financial Services</p>
              <p>3031 Mojave Oak Dr</p>
              <p>Valrico, FL 33594</p>
              <p>Phone: 844-779-7600</p>
              <p>Email: larry@buckalewfinancialservices.com</p>
            </div>
          </div>
        </section>

        <section className="mt-12 text-sm text-gray-600 dark:text-gray-400">
          <p>Last Updated: February 03, 2024</p>
        </section>
      </div>
    </div>
  );
}