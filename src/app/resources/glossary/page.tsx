import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Insurance Glossary | Understand Key Terms',
  description: 'Explore our comprehensive glossary of insurance terms to better understand your coverage options.',
  path: '/insurance-glossary'
});

// Glossary Data
const glossaryTerms = {
  general: [
    {
      term: "Accidental Death Benefit",
      definition: "An additional payment made to beneficiaries if the insured dies as a result of an accident."
    },
    {
      term: "Beneficiary",
      definition: "The person or entity designated to receive the proceeds of an insurance policy upon the death of the insured."
    },
    {
      term: "Claim",
      definition: "A formal request made by the insured to the insurance company for compensation or benefits under the terms of the policy."
    },
    {
      term: "Co-payment (Copay)",
      definition: "A fixed amount paid by the insured for covered services, such as doctor visits or prescriptions."
    },
    {
      term: "Deductible",
      definition: "The amount the insured must pay out-of-pocket before the insurance company begins covering costs."
    },
    {
      term: "Endorsement",
      definition: "A written agreement attached to an insurance policy that modifies its terms or adds additional coverage."
    },
    {
      term: "Grace Period",
      definition: "A period after the premium due date during which the policy remains in force without penalty."
    },
    {
      term: "In-Network Provider",
      definition: "A healthcare provider who has a contract with the insurance company to provide services at a discounted rate."
    },
    {
      term: "Premium",
      definition: "The amount paid by the insured to the insurance company to maintain coverage."
    },
    {
      term: "Underwriting",
      definition: "The process of evaluating risks and determining policy terms, conditions, and premiums."
    }
  ],
  lifeInsurance: [
    {
      term: "Cash Value",
      definition: "The savings component of a permanent life insurance policy that grows over time."
    },
    {
      term: "Death Benefit",
      definition: "The amount of money paid to beneficiaries upon the death of the insured."
    },
    {
      term: "Face Amount",
      definition: "The total amount of coverage provided by a life insurance policy."
    },
    {
      term: "Permanent Life Insurance",
      definition: "A type of life insurance that provides lifelong coverage and includes a cash value component."
    },
    {
      term: "Policy Lapse",
      definition: "When a life insurance policy is terminated due to non-payment of premiums."
    },
    {
      term: "Rider",
      definition: "An optional add-on to a life insurance policy that provides additional benefits."
    },
    {
      term: "Term Life Insurance",
      definition: "A type of life insurance that provides coverage for a specific period, such as 10, 20, or 30 years."
    },
    {
      term: "Universal Life Insurance",
      definition: "A flexible type of permanent life insurance that allows adjustments to premiums and death benefits."
    },
    {
      term: "Whole Life Insurance",
      definition: "A type of permanent life insurance with fixed premiums and guaranteed cash value growth."
    }
  ],
  healthInsurance: [
    {
      term: "Coinsurance",
      definition: "The percentage of medical costs the insured pays after meeting the deductible."
    },
    {
      term: "Explanation of Benefits (EOB)",
      definition: "A statement from the insurance company detailing what was covered and what the insured owes."
    },
    {
      term: "HMO (Health Maintenance Organization)",
      definition: "A type of health insurance plan that requires members to use in-network providers and a primary care physician."
    },
    {
      term: "Out-of-Pocket Maximum",
      definition: "The maximum amount the insured pays for covered services in a year; after this, the insurer pays 100%."
    },
    {
      term: "PPO (Preferred Provider Organization)",
      definition: "A type of health insurance plan that allows members to see out-of-network providers at a higher cost."
    },
    {
      term: "Preauthorization",
      definition: "Approval from the insurance company required before certain medical procedures or treatments."
    },
    {
      term: "Preventive Care",
      definition: "Routine healthcare services aimed at preventing illness, such as vaccinations and screenings."
    },
    {
      term: "Provider Network",
      definition: "A group of doctors, hospitals, and other healthcare providers contracted with the insurance company."
    }
  ],
  medicare: [
    {
      term: "Medicare Advantage (Part C)",
      definition: "A private insurance alternative to Original Medicare that often includes additional benefits."
    },
    {
      term: "Medicare Part A",
      definition: "Hospital insurance that covers inpatient care, skilled nursing facilities, and some home health care."
    },
    {
      term: "Medicare Part B",
      definition: "Medical insurance that covers outpatient care, doctor visits, and preventive services."
    },
    {
      term: "Medicare Part D",
      definition: "Prescription drug coverage offered through private insurers approved by Medicare."
    },
    {
      term: "Medigap",
      definition: "Supplemental insurance policies sold by private companies to cover gaps in Original Medicare."
    },
    {
      term: "Open Enrollment Period",
      definition: "The annual period when Medicare beneficiaries can enroll in or switch Medicare plans."
    },
    {
      term: "Special Enrollment Period",
      definition: "A limited time outside the Open Enrollment Period when beneficiaries can make changes to their Medicare coverage."
    }
  ]
};

export default function InsuranceGlossaryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Insurance Glossary</h1>
            <p className="text-xl mb-8">
              Understand key insurance terms to make informed decisions about your coverage.
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

      {/* Glossary Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Key Insurance Terms</h2>

          {/* General Terms */}
          <h3 className="text-2xl font-bold text-primary mb-6">General Insurance Terms</h3>
          <div className="space-y-6">
            {glossaryTerms.general.map((term, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{term.term}</h3>
                <p className="text-gray-600">{term.definition}</p>
              </div>
            ))}
          </div>

          {/* Life Insurance Terms */}
          <h3 className="text-2xl font-bold text-primary mt-12 mb-6">Life Insurance Terms</h3>
          <div className="space-y-6">
            {glossaryTerms.lifeInsurance.map((term, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{term.term}</h3>
                <p className="text-gray-600">{term.definition}</p>
              </div>
            ))}
          </div>

          {/* Health Insurance Terms */}
          <h3 className="text-2xl font-bold text-primary mt-12 mb-6">Health Insurance Terms</h3>
          <div className="space-y-6">
            {glossaryTerms.healthInsurance.map((term, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{term.term}</h3>
                <p className="text-gray-600">{term.definition}</p>
              </div>
            ))}
          </div>

          {/* Medicare Terms */}
          <h3 className="text-2xl font-bold text-primary mt-12 mb-6">Medicare Terms</h3>
          <div className="space-y-6">
            {glossaryTerms.medicare.map((term, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{term.term}</h3>
                <p className="text-gray-600">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Understanding Insurance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our advisors are here to help you navigate complex insurance terms and find the right coverage for your needs.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}