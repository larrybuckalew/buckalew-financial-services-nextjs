'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function ChoosingRightLifeInsurancePolicyPage() {
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
          pdfTitle: 'Choosing the Right Life Insurance Policy'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/choosing-right-life-insurance-policy.pdf', '_blank');
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
          Choosing the Right Life Insurance Policy: A Comprehensive Guide
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Detailed Guide
              </h2>
              <p className="mb-4">
                Navigate the complexities of life insurance with expert insights:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Compare policy types</li>
                <li>Assess your financial needs</li>
                <li>Understand policy terms</li>
                <li>Calculate optimal coverage</li>
                <li>Evaluate cost-effectiveness</li>
              </ul>
              <p className="italic text-gray-600">
                Download our comprehensive guide to make an informed decision.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Choosing the Right Life Insurance Policy"
                pdfPath="/guides/choosing-right-life-insurance-policy.pdf"
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
              onClick={() => window.open('/guides/choosing-right-life-insurance-policy.pdf', '_blank')}
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
