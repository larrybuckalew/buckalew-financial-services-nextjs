'use client';

import React from 'react';
import Link from 'next/link';
import RetirementCalculator from '@/app/components/calculators/RetirementCalculator';
import LifeInsuranceCalculator from '@/app/components/calculators/LifeInsuranceCalculator';
import MedicareCostCalculator from '@/app/components/calculators/MedicareCostCalculator';
import InvestmentCalculator from '@/app/components/calculators/InvestmentCalculator';
import CollegeSavingsCalculator from '@/app/components/calculators/CollegeSavingsCalculator';
import DebtPayoffCalculator from '@/app/components/calculators/DebtPayoffCalculator';
import IncomeProtectionCalculator from '@/app/components/calculators/IncomeProtectionCalculator';
import InsurancePremiumCalculator from '@/app/components/calculators/InsurancePremiumCalculator';
import MortgageCalculator from '@/app/components/calculators/MortgageCalculator';
import SocialSecurityCalculator from '@/app/components/calculators/SocialSecurityCalculator';

const calculators = [
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement savings and estimate your future needs',
    icon: '💰',
    id: 'retirement',
    component: RetirementCalculator
  },
  {
    title: 'Life Insurance Calculator',
    description: 'Calculate how much life insurance coverage you need',
    icon: '🛡️',
    id: 'life-insurance',
    component: LifeInsuranceCalculator
  },
  {
    title: 'Medicare Cost Calculator',
    description: 'Estimate your Medicare costs and premiums',
    icon: '🏥',
    id: 'medicare',
    component: MedicareCostCalculator
  },
  {
    title: 'Investment Calculator',
    description: 'Project your investment growth over time',
    icon: '📈',
    id: 'investment',
    component: InvestmentCalculator
  },
  {
    title: 'College Savings Calculator',
    description: "Plan for your children\\'s education expenses",
    icon: '🎓',
    id: 'college',
    component: CollegeSavingsCalculator
  },
  {
    title: 'Debt Payoff Calculator',
    description: 'Create a plan to become debt-free',
    icon: '📊',
    id: 'debt',
    component: DebtPayoffCalculator
  },
  {
    title: 'Income Protection Calculator',
    description: 'Calculate how much disability insurance you need',
    icon: '💼',
    id: 'income',
    component: IncomeProtectionCalculator
  },
  {
    title: 'Insurance Premium Calculator',
    description: 'Estimate insurance premiums based on your needs',
    icon: '🏦',
    id: 'premium',
    component: InsurancePremiumCalculator
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate your monthly mortgage payments',
    icon: '🏠',
    id: 'mortgage',
    component: MortgageCalculator
  },
  {
    title: 'Social Security Calculator',
    description: 'Estimate your Social Security benefits',
    icon: '👴',
    id: 'social-security',
    component: SocialSecurityCalculator
  }
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Financial Calculators</h1>
            <p className="text-xl mb-8">
              Use our suite of financial calculators to help plan your future and make informed decisions
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calc) => (
              <div key={calc.id} className="card hover-lift">
                <div className="text-4xl mb-4">{calc.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{calc.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{calc.description}</p>
                <Link 
                  href={`#${calc.id}`}
                  className="text-secondary hover:text-secondary-dark font-medium inline-flex items-center"
                >
                  Try Calculator <span className="ml-2">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Calculator Sections */}
      <div className="space-y-16">
        {calculators.map((calc) => {
          const Calculator = calc.component;
          return (
            <section key={calc.id} id={calc.id} className="py-16 odd:bg-gray-50 dark:odd:bg-gray-800">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">{calc.title}</h2>
                <div className="max-w-4xl mx-auto">
                  <Calculator />
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Understanding Your Options?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our financial experts can help you make sense of the numbers and create a plan that works for you.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}