'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function MedicareEnrollmentTimingGuidePage() {
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
          pdfTitle: 'Medicare Enrollment Timing Guide'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/medicare-enrollment-timing.pdf', '_blank');
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
          Medicare Enrollment Timing: Avoiding Penalties and Maximizing Benefits
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Enrollment Strategy Guide
              </h2>
              <p className="mb-4">
                Master the critical timing of Medicare enrollment:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Initial Enrollment Period (IEP) details</li>
                <li>Special Enrollment Period (SEP) insights</li>
                <li>Avoiding late enrollment penalties</li>
                <li>Timing considerations for working seniors</li>
                <li>Strategic enrollment planning</li>
              </ul>
              <p className="italic text-gray-600">
                Download our expert guide to navigate Medicare enrollment seamlessly.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Medicare Enrollment Timing Guide"
                pdfPath="/guides/medicare-enrollment-timing.pdf"
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
              onClick={() => window.open('/guides/medicare-enrollment-timing.pdf', '_blank')}
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
