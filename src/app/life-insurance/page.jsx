import React from 'react';
import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Life Insurance Options | Buckalew Financial',
    description: 'Comprehensive life insurance solutions tailored to protect your family\'s financial future.',
    keywords: ['Life Insurance', 'Term Life', 'Whole Life', 'Universal Life', 'Final Expense']
};
const lifeInsuranceTypes = [
    {
        href: '/life-insurance/term-life',
        title: 'Term Life Insurance',
        description: 'Affordable protection for a specific period.',
        icon: '⏱️'
    },
    {
        href: '/life-insurance/whole-life',
        title: 'Whole Life Insurance',
        description: 'Lifetime coverage with cash value accumulation.',
        icon: '🌟'
    },
    {
        href: '/life-insurance/indexed-universal-life',
        title: 'Universal Life Insurance',
        description: 'Flexible coverage with investment opportunities.',
        icon: '📈'
    },
    {
        href: '/life-insurance/final-expense',
        title: 'Final Expense Insurance',
        description: 'Coverage for end-of-life expenses and funeral costs.',
        icon: '🕯️'
    },
    {
        href: '/life-insurance/accidental-death',
        title: 'Accidental Death Insurance',
        description: 'Additional protection for unexpected fatal accidents.',
        icon: '🚨'
    },
    {
        href: '/life-insurance/long-term-care',
        title: 'Long-Term Care Insurance',
        description: 'Financial support for extended healthcare needs.',
        icon: '🏥'
    }
];
export default function LifeInsurancePage() {
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Life Insurance Solutions',
            subtitle: 'Protecting what matters most: your family\'s financial security and peace of mind.'
        }}>
      <div className="grid md:grid-cols-3 gap-6">
        {lifeInsuranceTypes.map((type) => (<div key={type.href} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{type.icon}</div>
            <h2 className="text-2xl font-semibold text-secondary mb-3">
              {type.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {type.description}
            </p>
            <Link href={type.href} className="text-primary hover:underline font-medium">
              Learn More →
            </Link>
          </div>))}
      </div>

      <div className="text-center mt-12">
        <Link href="/quote" className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors text-lg">
          Get a Personalized Quote
        </Link>
      </div>
    </PageStructure>);
}
