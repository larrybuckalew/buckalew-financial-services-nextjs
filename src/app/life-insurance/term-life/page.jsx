import React from 'react';
import Link from 'next/link';
import { PageStructure } from '../../../components/layout/PageStructure';
export const metadata = {
    title: 'Term Life Insurance | Buckalew Financial',
    description: 'Affordable, straightforward life insurance protection for a specific term.',
    keywords: ['Term Life Insurance', 'Affordable Life Insurance', 'Temporary Coverage']
};
export default function TermLifePage() {
    const termLifeFeatures = [
        {
            title: 'Affordable Premiums',
            description: 'Lower cost compared to permanent life insurance options.',
            icon: '💰'
        },
        {
            title: 'Flexible Terms',
            description: 'Choose coverage periods from 10 to 30 years.',
            icon: '⏱️'
        },
        {
            title: 'High Coverage Amounts',
            description: 'Protect your family with substantial death benefits.',
            icon: '📊'
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Term Life Insurance',
            subtitle: 'Simple, affordable protection for your family during critical years.'
        }}>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            What is Term Life Insurance?
          </h2>
          <p className="text-gray-700 mb-4">
            Term life insurance provides coverage for a specific period, typically 10, 20, or 30 years. 
            If you pass away during the term, your beneficiaries receive a tax-free death benefit.
          </p>
          <p className="text-gray-700 mb-4">
            It's an affordable way to ensure your loved ones are financially protected during 
            critical life stages like raising children or paying a mortgage.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-primary mb-4">
            Key Features
          </h3>
          {termLifeFeatures.map((feature) => (<div key={feature.title} className="flex items-center mb-3">
              <span className="text-3xl mr-4">{feature.icon}</span>
              <div>
                <h4 className="font-semibold text-secondary">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/quote" className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors text-lg">
          Get a Term Life Quote
        </Link>
      </div>
    </PageStructure>);
}
