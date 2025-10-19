import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Medicare Insurance: Comprehensive Coverage Guide | Buckalew Financial Services',
    description: 'Navigate Medicare with confidence. Learn about Part A, Part B, Medicare Advantage, and Medicare Supplement plans.',
    keywords: [
        'Medicare',
        'Medicare Part A',
        'Medicare Part B',
        'Medicare Advantage',
        'Medigap',
        'Senior health insurance'
    ]
};
export default function MedicarePage() {
    const medicarePlans = [
        {
            title: 'Medicare Part A',
            description: 'Hospital insurance covering inpatient care, skilled nursing, and hospice services.',
            benefits: [
                'Hospital stays',
                'Skilled nursing facility care',
                'Hospice care',
                'Some home health care'
            ]
        },
        {
            title: 'Medicare Part B',
            description: 'Medical insurance for outpatient care, preventive services, and medical supplies.',
            benefits: [
                'Doctor visits',
                'Outpatient care',
                'Preventive services',
                'Medical equipment',
                'Some prescription drugs'
            ]
        },
        {
            title: 'Medicare Advantage (Part C)',
            description: 'Comprehensive alternative to Original Medicare offered by private insurance companies.',
            benefits: [
                'Combines Part A and Part B coverage',
                'Often includes Part D prescription coverage',
                'May offer additional benefits like dental, vision, and hearing',
                'Usually has network restrictions'
            ]
        },
        {
            title: 'Medicare Supplement (Medigap)',
            description: 'Supplemental insurance to help cover out-of-pocket costs not covered by Original Medicare.',
            benefits: [
                'Covers copayments',
                'Reduces out-of-pocket expenses',
                'Provides additional coverage options',
                'Standardized plans across providers'
            ]
        }
    ];
    return (<PageStructure title="Medicare Insurance Solutions" description="Comprehensive Medicare guidance to help you navigate health coverage in your golden years." heroContent={{
            title: 'Medicare Insurance Solutions',
            subtitle: 'Comprehensive Medicare guidance to help you navigate health coverage in your golden years.',
            className: 'bg-primary text-white'
        }}>
      <section className="grid md:grid-cols-2 gap-6 mb-16">
        {medicarePlans.map((plan, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              {plan.title}
            </h2>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <h3 className="font-bold mb-2">Key Benefits:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {plan.benefits.map((benefit, benefitIndex) => (<li key={benefitIndex}>{benefit}</li>))}
            </ul>
          </div>))}
      </section>

      <section className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Medicare Enrollment Guide
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Initial Enrollment Period</h3>
            <p className="text-gray-600">
              Your first chance to sign up for Medicare begins 3 months before the month you turn 65 
              and ends 3 months after your 65th birthday.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Annual Enrollment Period</h3>
            <p className="text-gray-600">
              From October 15 to December 7 each year, you can change your Medicare coverage 
              or switch between Original Medicare and Medicare Advantage.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Special Enrollment Periods</h3>
            <p className="text-gray-600">
              Certain life events like moving, losing current coverage, or qualifying for additional assistance 
              may allow you to enroll or change plans outside standard enrollment periods.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">
          Need Medicare Guidance?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Our Medicare experts are ready to help you find the perfect coverage tailored to your needs.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/quote" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
            Get a Medicare Quote
          </Link>
          <Link href="/contact" className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition">
            Speak with a Medicare Advisor
          </Link>
        </div>
      </section>
    </PageStructure>);
}
