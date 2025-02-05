'use client'

import { GatedContentForm } from '@/components/forms/GatedContentForm';
import { useState } from 'react';

export default function HMOvsPPOComparisonGuidePage() {
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
          pdfTitle: 'HMO vs PPO: Comprehensive Comparison'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        window.open('/guides/hmo-vs-ppo-comparison.pdf', '_blank');
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
          HMO vs PPO: Choosing the Right Health Insurance Plan
        </h1>

        {!formSubmitted ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Free Comparative Guide
              </h2>
              <p className="mb-4">
                Understand the key differences between HMO and PPO plans:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Cost structures compared</li>
                <li>Network flexibility</li>
                <li>Referral requirements</li>
                <li>Out-of-pocket expenses</li>
                <li>Choosing the best plan for you</li>
              </ul>
              <p className="italic text-gray-600">
                Download our expert guide to make an informed health insurance decision.
              </p>
            </div>
            <div>
              <GatedContentForm
                pdfTitle="HMO vs PPO: Comprehensive Comparison"
                pdfPath="/guides/hmo-vs-ppo-comparison.pdf"
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
              onClick={() => window.open('/guides/hmo-vs-ppo-comparison.pdf', '_blank')}
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
