import React from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, Coins, RefreshCw } from 'lucide-react';
import { PageStructure } from '../../components/layout/PageStructure'; // Import PageStructure
const calculatorTypes = [
    {
        icon: '🛡️',
        title: 'Life Insurance Calculator',
        description: 'Calculate how much life insurance coverage you need to protect your family.',
        href: '/calculators/life-insurance'
    },
    {
        icon: <Calculator className="w-12 h-12 text-primary-dark"/>,
        title: 'Retirement Calculator',
        description: 'Plan your retirement savings and see if you\'re on track.',
        href: '/calculators/retirement'
    },
    {
        icon: '❤️',
        title: 'Medicare Cost Calculator',
        description: 'Estimate your Medicare premiums and out-of-pocket costs.',
        href: '/calculators/medicare'
    },
    {
        icon: <TrendingUp className="w-12 h-12 text-primary-dark"/>,
        title: 'Investment Calculator',
        description: 'Analyze potential investment returns and growth.',
        href: '/calculators/investment'
    },
    {
        icon: <Coins className="w-12 h-12 text-primary-dark"/>,
        title: 'Loan Comparison',
        description: 'Compare loan options and calculate monthly payments.',
        href: '/calculators/loan'
    },
    {
        icon: <RefreshCw className="w-12 h-12 text-primary-dark"/>,
        title: 'Inflation Impact',
        description: 'Understand how inflation affects your financial planning.',
        href: '/calculators/inflation'
    }
];
export default function CalculatorsPage() {
    return (<PageStructure title="Financial Planning Calculators" description="Empower your financial decisions with our comprehensive suite of calculators" heroContent={{
            title: 'Financial Planning Calculators',
            subtitle: 'Empower your financial decisions with our comprehensive suite of calculators'
        }}>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {calculatorTypes.map((calculator, index) => (<div key={index} className="bg-white shadow-lg rounded-xl p-6 transform transition-all 
                       hover:-translate-y-2 hover:shadow-xl border-t-4 border-primary-dark">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">
                {typeof calculator.icon === 'string' ? calculator.icon : calculator.icon}
              </div>
              <h2 className="text-xl font-semibold text-primary-dark">
                {calculator.title}
              </h2>
            </div>
            <p className="text-gray-600 mb-6 h-20">
              {calculator.description}
            </p>
            <Link href={calculator.href} className="inline-block bg-primary-light text-primary-dark 
                         px-6 py-3 rounded-full hover:bg-primary-dark 
                         hover:text-white transition-colors">
              Calculate Now
            </Link>
          </div>))}
      </div>

      <div className="mt-16 text-center bg-gray-50 p-8 rounded-xl">
        <h3 className="text-3xl font-bold text-primary-dark mb-6">
          Need Personalized Financial Guidance?
        </h3>
        <p className="text-xl text-gray-600 mb-8">
          Our financial experts are ready to help you make informed decisions.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/quote" className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition">
            Get a Free Consultation
          </Link>
          <Link href="/contact" className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary-light transition">
            Contact Our Team
          </Link>
        </div>
      </div>
    </PageStructure>);
}
