import Link from 'next/link';
import { PageStructure } from '../../../components/layout/PageStructure';
export const metadata = {
    title: 'ACA Health Insurance Plans: Affordable Coverage | Buckalew Financial Services',
    description: 'Comprehensive guide to Affordable Care Act (ACA) health insurance plans. Find affordable coverage, understand subsidies, and explore individual and family options.',
    keywords: [
        'ACA plans',
        'Affordable Care Act',
        'health insurance marketplace',
        'health insurance subsidies',
        'individual health insurance',
        'family health insurance'
    ]
};
export default function ACAPlansPage() {
    const planFeatures = [
        {
            title: 'Individual Plans',
            description: 'Tailored health insurance for individuals not covered by employer-sponsored plans.',
            benefits: [
                'Comprehensive medical coverage',
                'Essential health benefits guaranteed',
                'No discrimination for pre-existing conditions',
                'Preventive care at no additional cost'
            ]
        },
        {
            title: 'Family Plans',
            description: 'Comprehensive health coverage designed to protect your entire family\'s health needs.',
            benefits: [
                'Coverage for all family members',
                'Children can stay on plan until age 26',
                'Maternity and pediatric care included',
                'Flexible plan options'
            ]
        },
        {
            title: 'Financial Assistance',
            description: 'Subsidies and tax credits to make health insurance more affordable.',
            benefits: [
                'Premium tax credits',
                'Cost-sharing reductions',
                'Income-based financial help',
                'Medicaid expansion options'
            ]
        }
    ];
    const subsidyTiers = [
        {
            income: 'Under $14,580 (individual)',
            coverage: 'Medicaid or Free Marketplace Plan',
            subsidyLevel: 'Full Coverage'
        },
        {
            income: '$14,580 - $29,160',
            coverage: 'Significant Premium Subsidies',
            subsidyLevel: 'High Subsidy'
        },
        {
            income: '$29,160 - $58,320',
            coverage: 'Moderate Premium Subsidies',
            subsidyLevel: 'Moderate Subsidy'
        },
        {
            income: 'Over $58,320',
            coverage: 'Limited or No Subsidies',
            subsidyLevel: 'Low/No Subsidy'
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Affordable Care Act (ACA) Health Insurance',
            subtitle: 'Comprehensive, affordable health coverage options designed to protect you and your family\'s health and financial well-being.'
        }}>
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {planFeatures.map((feature, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {feature.title}
            </h2>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <h3 className="font-bold mb-2">Key Benefits:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {feature.benefits.map((benefit, benefitIndex) => (<li key={benefitIndex}>{benefit}</li>))}
            </ul>
          </div>))}
      </section>

      <section className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Financial Assistance Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Income Level</th>
                <th className="p-4 text-left">Coverage Options</th>
                <th className="p-4 text-left">Subsidy Level</th>
              </tr>
            </thead>
            <tbody>
              {subsidyTiers.map((tier, index) => (<tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">{tier.income}</td>
                  <td className="p-4">{tier.coverage}</td>
                  <td className="p-4">{tier.subsidyLevel}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">
          Find Your Perfect ACA Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Our experts can help you navigate the marketplace, understand your options, 
          and find a plan that fits your budget and health needs.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/quote" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
            Get a Free ACA Quote
          </Link>
          <Link href="/contact" className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition">
            Speak with an ACA Advisor
          </Link>
        </div>
      </section>
    </PageStructure>);
}
