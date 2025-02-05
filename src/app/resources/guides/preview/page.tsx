'use client';

import React, { useState } from 'react';

const guides = [
  {
    title: 'Understanding Life Insurance',
    filename: 'understanding-life-insurance.pdf',
    description: "Learn how life insurance can protect your family's financial future."
  },
  {
    title: 'Choosing the Right Policy',
    filename: 'choosing-right-policy.pdf',
    description: 'A step-by-step guide to selecting the best life insurance plan for your needs.'
  },
  {
    title: 'Why Start Early?',
    filename: 'why-start-early.pdf',
    description: 'Discover the benefits of purchasing life insurance at a younger age.'
  },
  {
    title: 'Navigating Health Insurance',
    filename: 'navigating-health-insurance.pdf',
    description: 'Understanding the basics of health insurance and how it works.'
  }
];

export default function GuidePreviews() {
  const [selectedGuide, setSelectedGuide] = useState(guides[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Insurance Guide Previews</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Preview our comprehensive insurance guides before downloading.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Guide Selection Sidebar */}
        <div className="space-y-4">
          {guides.map((guide) => (
            <button
              key={guide.filename}
              onClick={() => setSelectedGuide(guide)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedGuide.filename === guide.filename
                  ? 'bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-600'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <h3 className="font-medium mb-1">{guide.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {guide.description}
              </p>
            </button>
          ))}
        </div>

        {/* PDF Preview Area */}
        <div className="md:col-span-3">
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedGuide.title}</h2>
            <p className="text-gray-600 mb-4">{selectedGuide.description}</p>
            <p>PDF preview placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}