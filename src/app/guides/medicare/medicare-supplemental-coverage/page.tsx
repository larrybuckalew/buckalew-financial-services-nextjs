'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function MedicareSupplementalCoverageGuidePage() {
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
          pdfTitle: 'Medicare Supplemental Coverage Guide'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/medicare-supplemental-coverage.pdf', '_blank');
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
          Medicare Supplemental Coverage: Bridging the Gaps in Your Healthcare
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Supplemental Coverage Guide
              </h2>
              <p className="mb-4">
                Understand how to enhance your Medicare protection:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Medigap policy essentials</li>
                <li>Comparing supplemental plans</li>
                <li>Cost-saving strategies</li>
                <li>Prescription drug coverage</li>
                <li>Choosing the right supplemental insurance</li>
              </ul>
              <p className="italic text-gray-600">
                Download our comprehensive guide to Medicare supplemental options.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Medicare Supplemental Coverage Guide"
                pdfPath="/guides/medicare-supplemental-coverage.pdf"
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
              onClick={() => window.open('/guides/medicare-supplemental-coverage.pdf', '_blank')}
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
