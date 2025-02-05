'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function ImportanceOfPreventiveCareGuidePage() {
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
          pdfTitle: 'Importance of Preventive Care'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/importance-of-preventive-care.pdf', '_blank');
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
          Preventive Care: Your Path to Long-Term Health and Savings
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Preventive Care Guide
              </h2>
              <p className="mb-4">
                Discover how preventive care can transform your health strategy:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Early disease detection</li>
                <li>Reducing long-term healthcare costs</li>
                <li>Understanding preventive screenings</li>
                <li>Wellness programs and benefits</li>
                <li>Lifestyle impact on health</li>
              </ul>
              <p className="italic text-gray-600">
                Download our comprehensive guide to proactive health management.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="Importance of Preventive Care"
                pdfPath="/guides/importance-of-preventive-care.pdf"
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
              onClick={() => window.open('/guides/importance-of-preventive-care.pdf', '_blank')}
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
