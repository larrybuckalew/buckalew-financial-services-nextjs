'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function NavigatingHealthInsurancePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/gated-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          pdfTitle: 'Navigating Health Insurance Basics'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/navigating-health-insurance-basics.pdf', '_blank');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Submission error:', error);
      return false;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Navigating Health Insurance: Your Essential Guide
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Comprehensive Guide
              </h2>
              <p className="mb-4">
                Unlock the mysteries of health insurance with our expert insights:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Understanding health insurance basics</li>
                <li>Types of health insurance plans</li>
                <li>Key terminology explained</li>
                <li>Choosing the right coverage</li>
                <li>Maximizing your benefits</li>
              </ul>
              <p className="italic text-gray-600">
                Download our comprehensive guide to become a health insurance expert.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Navigating Health Insurance Basics"
                pdfPath="/guides/navigating-health-insurance-basics.pdf"
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Thank You for Your Interest!
            </h2>
            <p className="mb-4">
              Your PDF has been downloaded. Our team will be in touch soon.
            </p>
            <button 
              onClick={() => window.open('/guides/navigating-health-insurance-basics.pdf', '_blank')}
              className="btn-primary"
            >
              Download PDF Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
