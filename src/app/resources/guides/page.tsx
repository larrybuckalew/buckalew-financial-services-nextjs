'use client';

import React from 'react';
import Link from 'next/link';
import DownloadGuideForm from '@/components/forms/DownloadGuideForm';

const guides = [
  {
    id: 'understanding-life-insurance',
    name: 'Understanding Life Insurance Guide',
    description: "Learn how life insurance can protect your family's financial future. Includes types of policies, coverage options, and tips for choosing the right plan.",
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'choosing-right-policy',
    name: 'Choosing the Right Policy Guide',
    description: "A step-by-step guide to selecting the best life insurance plan for your needs. Includes comparison tools and decision-making frameworks.",
    icon: '✨'
  },
  {
    id: 'why-start-early',
    name: 'Why Start Early with Life Insurance?',
    description: "Discover the benefits of purchasing life insurance at a younger age, including lower premiums and long-term savings.",
    icon: '👶'
  },
  {
    id: 'navigating-health-insurance',
    name: 'Navigating Health Insurance Guide',
    description: "Understanding the basics of health insurance and how it works. Includes tips for choosing plans and maximizing benefits.",
    icon: '🏥'
  },
  {
    id: 'preventive-care',
    name: 'Preventive Care Guide',
    description: "Learn why preventive care is essential for long-term health and savings. Includes checklist and recommendations.",
    icon: '👨‍⚕️'
  },
  {
    id: 'medicare-basics',
    name: 'Medicare Basics Guide',
    description: "A comprehensive guide to understanding Medicare Parts A, B, C, and D. Everything you need to know about coverage and enrollment.",
    icon: '🏥'
  },
  {
    id: 'medicare-enrollment',
    name: 'Medicare Enrollment Guide',
    description: "Learn when and how to enroll in Medicare to avoid penalties and get the coverage you need.",
    icon: '📅'
  },
  {
    id: 'medicare-supplement',
    name: 'Medicare Supplement Guide',
    description: "Explore Medigap plans and other options to enhance your Medicare coverage.",
    icon: '✨'
  }
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Free Insurance Guides</h1>
            <p className="text-xl mb-8">
              Download comprehensive guides to better understand your insurance options. 
              Expert insights from Buckalew Financial Services to help you make informed decisions.
            </p>
            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]">
              <div className="p-6">
                <div className="text-4xl mb-4">{guide.icon}</div>
                <DownloadGuideForm 
                  guideName={guide.name}
                  guideDescription={guide.description}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Personalized Insurance Guidance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our insurance experts are ready to help you navigate complex insurance options and find the perfect coverage for your needs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            Buckalew Financial Services<br />
            Contact: 844-779-7600 | larry@buckalewfinancialservices.com<br />
            3031 Mojave Oak Dr, Valrico, FL 33594
          </p>
        </div>
      </section>
    </div>
  );
}