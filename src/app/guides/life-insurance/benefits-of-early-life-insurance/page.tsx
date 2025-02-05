'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function BenefitsOfEarlyLifeInsurancePage() {
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
          pdfTitle: 'Benefits of Early Life Insurance'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/benefits-of-early-life-insurance.pdf', '_blank');
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
          Why Start Life Insurance Early: Financial Planning Insights
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Strategic Guide
              </h2>
              <p className="mb-4">
                Discover the advantages of obtaining life insurance at a younger age:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Lower premium rates</li>
                <li>Extended financial protection</li>
                <li>Health condition advantages</li>
                <li>Long-term investment benefits</li>
                <li>Peace of mind for your family</li>
              </ul>
              <p className="italic text-gray-600">
                Download our guide to understand why timing matters in life insurance.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Benefits of Early Life Insurance"
                pdfPath="/guides/benefits-of-early-life-insurance.pdf"
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
              onClick={() => window.open('/guides/benefits-of-early-life-insurance.pdf', '_blank')}
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
