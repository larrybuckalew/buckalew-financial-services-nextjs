import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Medicare Guide: Comprehensive Medicare Information',
  description: 'Your complete guide to understanding Medicare, coverage options, enrollment, and making informed healthcare decisions.',
  path: '/medicare/guide',
  keywords: ['Medicare guide', 'Medicare explained', 'Medicare enrollment', 'Medicare parts']
});

export default function MedicareGuidePage() {
  const medicareBasics = [
    {
      title: 'What is Medicare?',
      description: 'Medicare is a federal health insurance program primarily for people 65 and older, as well as some younger individuals with specific disabilities or conditions.',
      icon: '🏥'
    },
    {
      title: 'Who Qualifies?',
      description: 'Most U.S. citizens or permanent residents aged 65+ qualify. Some people under 65 with disabilities or specific health conditions may also be eligible.',
      icon: '👥'
    },
    {
      title: 'When to Enroll',
      description: 'Your initial enrollment period begins 3 months before the month you turn 65 and ends 3 months after. Missing this window can result in penalties.',
      icon: '📅'
    }
  ];

  const medicareParts = [
    {
      title: 'Part A (Hospital Insurance)',
      description: 'Covers inpatient hospital stays, skilled nursing facility care, hospice care, and some home health care. Most people don\'t pay a premium for Part A.',
      coverage: [
        'Hospital inpatient care',
        'Skilled nursing facility care',
        'Hospice care',
        'Some home health care'
      ]
    },
    {
      title: 'Part B (Medical Insurance)',
      description: 'Covers certain doctors\' services, outpatient care, medical supplies, and preventive services. Requires a monthly premium.',
      coverage: [
        'Outpatient care',
        'Preventive services',
        'Medical supplies',
        'Doctor visits',
        'Diagnostic tests and screenings'
      ]
    },
    {
      title: 'Part C (Medicare Advantage)',
      description: 'An alternative to Original Medicare, offered by private insurance companies. Combines Part A, Part B, and often Part D benefits.',
      coverage: [
        'All Part A and Part B benefits',
        'Often includes prescription drug coverage',
        'May offer additional benefits like dental and vision',
        'Typically has network restrictions'
      ]
    },
    {
      title: 'Part D (Prescription Drug Coverage)',
      description: 'Helps cover the cost of prescription drugs. Offered by private insurance companies approved by Medicare.',
      coverage: [
        'Prescription medication costs',
        'Helps lower out-of-pocket drug expenses',
        'Various plan options available',
        'Covers both generic and brand-name drugs'
      ]
    }
  ];

  const enrollmentTips = [
    {
      title: 'Initial Enrollment Period',
      description: 'A 7-month period that starts 3 months before the month you turn 65, includes your birth month, and ends 3 months after.',
      icon: '🕒'
    },
    {
      title: 'Special Enrollment Period',
      description: 'Allows you to enroll without penalties if you qualify due to specific life events or continue working with employer coverage.',
      icon: '🔄'
    },
    {
      title: 'General Enrollment Period',
      description: 'If you miss your initial enrollment, you can sign up between January 1 and March 31 each year, with coverage starting July 1.',
      icon: '📆'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Consistent Gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">Medicare Guide: Your Comprehensive Resource</h1>
            <p className="text-xl mb-8 text-white/90">
              Navigating Medicare can be complex. We're here to simplify your journey and help you make informed healthcare decisions.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Speak with a Medicare Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Medicare Basics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Medicare Basics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {medicareBasics.map((basic, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{basic.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{basic.title}</h3>
                <p className="text-gray-600">{basic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicare Parts Detailed Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Understanding Medicare Parts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {medicareParts.map((part, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-primary mb-4">{part.title}</h3>
                <p className="text-gray-600 mb-4">{part.description}</p>
                <h4 className="font-semibold text-primary mb-2">Coverage Includes:</h4>
                <ul className="space-y-2 text-gray-600">
                  {part.coverage.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-secondary mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Medicare Enrollment Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {enrollmentTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Need Personalized Medicare Guidance?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Medicare decisions can be complex. Our expert advisors are ready to help you find the perfect coverage.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Get a Medicare Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}