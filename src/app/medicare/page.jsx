import Image from 'next/image';
import Link from 'next/link';
import { SEOUtility } from '@/lib/seo'; // Added SEOUtility import
import { PageStructure } from '../../components/layout/PageStructure'; // Re-added PageStructure import
export const metadata = SEOUtility.generatePageSEO({
    title: 'Medicare Insurance Services',
    description: 'Comprehensive Medicare guidance and coverage solutions tailored to your healthcare needs.',
    keywords: ['medicare', 'health insurance', 'senior health'],
    path: '/medicare'
});
export default function MedicarePage() {
    const coverageTypes = [
        {
            title: 'Medicare Part A',
            description: 'Hospital insurance covering inpatient care, skilled nursing, and hospice.',
            icon: '🏥'
        },
        {
            title: 'Medicare Part B',
            description: 'Medical insurance for outpatient care, preventive services, and medical supplies.',
            icon: '👨‍⚕️'
        },
        {
            title: 'Medicare Part D',
            description: 'Prescription drug coverage to help reduce medication costs.',
            icon: '💊'
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Medicare Insurance Solutions',
            subtitle: 'Navigate the complexities of Medicare with expert guidance from Buckalew Financial Services.',
            className: 'bg-primary text-white'
        }}>
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="space-y-4 mb-8">
            {[
            'Personalized Medicare Plan Recommendations',
            'Comprehensive Coverage Analysis',
            'Expert Consultation and Support'
        ].map((benefit, index) => (<div key={index} className="flex items-center space-x-3">
                <CheckIcon className="w-6 h-6 text-green-500"/>
                <span className="text-lg">{benefit}</span>
              </div>))}
          </div>
          
          <div className="flex space-x-4">
            <Link href="/quote" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
              Get Medicare Quote
            </Link>
            <Link href="/contact" className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition">
              Contact Specialist
            </Link>
          </div>
        </div>
        
        <div>
          <Image src="/images/medicare-coverage.jpg" alt="Medicare Coverage Consultation" width={600} height={400} className="rounded-lg shadow-xl" priority/>
        </div>
      </section>
      
      <section className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          Medicare Coverage Types
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {coverageTypes.map((type, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </div>))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
                question: 'When can I enroll in Medicare?',
                answer: 'You can enroll during your Initial Enrollment Period, which starts 3 months before the month you turn 65 and ends 3 months after.'
            },
            {
                question: 'What does Medicare not cover?',
                answer: 'Medicare typically does not cover long-term care, most dental care, eye exams, cosmetic surgery, acupuncture, hearing aids, and routine foot care.'
            },
            {
                question: 'How much does Medicare cost?',
                answer: 'Costs vary depending on the parts of Medicare you choose. Part A is usually free, while Part B and Part D have monthly premiums.'
            }
        ].map((faq, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>))}
        </div>
      </section>
    </PageStructure>);
}
function CheckIcon(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
    </svg>);
}
