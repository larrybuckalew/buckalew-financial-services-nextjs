'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function UnderstandingLifeInsurancePDFPage() {
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
          pdfTitle: 'Understanding Life Insurance'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        // Optional: Trigger download or redirect
        window.open('/guides/understanding-life-insurance.pdf', '_blank');
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
          Understanding Life Insurance: Protect Your Family's Financial Future
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Comprehensive Guide
              </h2>
              <p className="mb-4">
                Learn the essentials of life insurance, including:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Types of life insurance</li>
                <li>How coverage protects your family</li>
                <li>Determining the right amount of coverage</li>
                <li>Factors affecting insurance costs</li>
                <li>When to consider life insurance</li>
              </ul>
              <p className="italic text-gray-600">
                Download this free guide to gain valuable insights into life insurance.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Understanding Life Insurance"
                pdfPath="/guides/understanding-life-insurance.pdf"
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
              onClick={() => window.open('/guides/understanding-life-insurance.pdf', '_blank')}
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
