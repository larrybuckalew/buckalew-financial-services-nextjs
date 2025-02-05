import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Frequently Asked Questions | Life, Health, and Medicare',
  description: 'Find answers to common questions about life insurance, health insurance, and Medicare.',
  path: '/faqs'
});

// FAQ Data
const faqs = {
  lifeInsurance: [
    {
      question: "What is term life insurance?",
      answer: "Term life insurance provides coverage for a specific period, such as 10, 20, or 30 years. It pays a death benefit if the insured passes away during the term."
    },
    {
      question: "What is the difference between term and whole life insurance?",
      answer: "Term life insurance covers a specific period and has no cash value, while whole life insurance provides lifelong coverage and includes a savings component called cash value."
    },
    {
      question: "Can I convert my term life policy to permanent life insurance?",
      answer: "Yes, many term life policies offer a conversion option that allows you to switch to a permanent policy without undergoing a medical exam."
    }
  ],
  healthInsurance: [
    {
      question: "What is an HMO?",
      answer: "An HMO (Health Maintenance Organization) is a type of health insurance plan that requires members to use in-network providers and a primary care physician."
    },
    {
      question: "What does coinsurance mean?",
      answer: "Coinsurance is the percentage of medical costs you pay after meeting your deductible. For example, 20% coinsurance means you pay 20% of the bill, and the insurer pays 80%."
    },
    {
      question: "What happens if I go out-of-network?",
      answer: "If you visit an out-of-network provider, you may face higher costs or no coverage at all, depending on your plan. PPO plans typically cover some out-of-network care, while HMOs usually do not."
    }
  ],
  medicare: [
    {
      question: "What is Medicare Part A?",
      answer: "Medicare Part A covers hospital stays, skilled nursing facility care, hospice care, and some home health care services."
    },
    {
      question: "Do I need to enroll in Medicare if I'm still working?",
      answer: "If you're still working and have employer coverage, you may delay enrolling in Medicare without penalty. However, it's important to review your options carefully."
    },
    {
      question: "What is Medigap?",
      answer: "Medigap (Medicare Supplement) is private insurance that helps cover gaps in Original Medicare, such as copayments, coinsurance, and deductibles."
    }
  ]
};

export default function FAQsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated with hero-gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl mb-8">
              Find answers to common questions about life, health, and Medicare insurance.
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

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">FAQs by Category</h2>

          {/* Life Insurance FAQs */}
          <h3 className="text-2xl font-bold text-primary mb-6">Life Insurance FAQs</h3>
          <div className="space-y-4">
            {faqs.lifeInsurance.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow p-6">
                <summary className="text-xl font-bold text-primary cursor-pointer">{faq.question}</summary>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </details>
            ))}
          </div>

          {/* Health Insurance FAQs */}
          <h3 className="text-2xl font-bold text-primary mt-12 mb-6">Health Insurance FAQs</h3>
          <div className="space-y-4">
            {faqs.healthInsurance.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow p-6">
                <summary className="text-xl font-bold text-primary cursor-pointer">{faq.question}</summary>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </details>
            ))}
          </div>

          {/* Medicare FAQs */}
          <h3 className="text-2xl font-bold text-primary mt-12 mb-6">Medicare FAQs</h3>
          <div className="space-y-4">
            {faqs.medicare.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow p-6">
                <summary className="text-xl font-bold text-primary cursor-pointer">{faq.question}</summary>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team of experts is here to help you navigate your insurance options and find the best solutions for your needs.
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