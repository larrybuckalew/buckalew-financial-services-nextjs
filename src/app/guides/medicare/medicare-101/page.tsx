'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function Medicare101GuidePage() {
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
          pdfTitle: 'Medicare 101: Comprehensive Guide'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/medicare-101-comprehensive-guide.pdf', '_blank');
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
          Medicare 101: Your Complete Guide to Navigating Healthcare in Retirement
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Medicare Essentials Guide
              </h2>
              <p className="mb-4">
                Unravel the complexities of Medicare with our comprehensive guide:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Understanding Medicare Parts A, B, C, and D</li>
                <li>Eligibility requirements</li>
                <li>Enrollment process explained</li>
                <li>Cost breakdowns and options</li>
                <li>Supplemental insurance insights</li>
              </ul>
              <p className="italic text-gray-600">
                Download our expert guide to make informed Medicare decisions.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Medicare 101: Comprehensive Guide"
                pdfPath="/guides/medicare-101-comprehensive-guide.pdf"
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
              onClick={() => window.open('/guides/medicare-101-comprehensive-guide.pdf', '_blank')}
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
