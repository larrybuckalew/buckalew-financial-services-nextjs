import Head from 'next/head';
import Link from 'next/link';
import { Shield, Star, Heart, Users, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Schema from '@/components/Schema';
import InsuranceTypeCard from '@/components/insurance/InsuranceTypeCard';

const insuranceTypes = [
  {
    title: 'Individual & Family Plans',
    description: 'Comprehensive health coverage for you and your family.',
    icon: Users,
    features: [
      'Wide network of providers',
      'Prescription drug coverage',
      'Preventive care',
      'Emergency services',
      'Hospital coverage'
    ],
    link: '/health-insurance/individual-family'
  },
  {
    title: 'Medicare Plans',
    description: 'Medicare Advantage and Supplement plans for seniors.',
    icon: Shield,
    features: [
      'Medicare Advantage plans',
      'Medicare Supplement plans',
      'Prescription drug coverage',
      'Dental and vision options',
      'Hospital coverage'
    ],
    link: '/health-insurance/medicare'
  },
  {
    title: 'Dental & Vision',
    description: 'Essential coverage for dental and vision care needs.',
    icon: Heart,
    features: [
      'Routine checkups',
      'Major procedures',
      'Vision exams',
      'Glasses and contacts',
      'Preventive care'
    ],
    link: '/health-insurance/dental-vision'
  },
  {
    title: 'Short-Term Health',
    description: 'Temporary coverage for unexpected gaps in insurance.',
    icon: Clock,
    features: [
      'Immediate coverage',
      'Flexible terms',
      'Affordable rates',
      'Quick approval',
      'Basic benefits'
    ],
    link: '/health-insurance/short-term'
  },
  {
    title: 'Medicaid Plans',
    description: 'Healthcare coverage for eligible low-income individuals.',
    icon: Shield,
    features: [
      'Income-based eligibility',
      'Comprehensive coverage',
      'No or low cost',
      'Children\'s coverage',
      'Pregnancy care'
    ],
    link: '/health-insurance/medicaid'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Comprehensive Coverage',
    description: 'Get access to a wide network of healthcare providers'
  },
  {
    icon: DollarSign,
    title: 'Affordable Plans',
    description: 'Find plans that fit your budget with flexible payment options'
  },
  {
    icon: Heart,
    title: 'Quality Care',
    description: 'Access to top-rated healthcare providers and facilities'
  }
];

export default function HealthInsurancePage() {
  // Schema.org markup for SEO
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Buckalew Financial Services",
    "description": "Comprehensive health insurance solutions in Tampa Bay area",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3031 Mojave Oak Dr",
      "addressLocality": "Valrico",
      "addressRegion": "FL",
      "postalCode": "33594",
      "addressCountry": "US"
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Health Insurance",
        "description": "Various health insurance options including individual, family, Medicare, and dental plans"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Health Insurance Tampa Bay | Medicare & Individual Plans | Buckalew Financial</title>
        <meta 
          name="description" 
          content="Find affordable health insurance in Tampa Bay. Expert guidance on Medicare, individual plans, and family coverage. Get a free quote today!" 
        />
        <meta 
          name="keywords" 
          content="health insurance Tampa Bay, Medicare, individual health insurance, family health insurance, dental insurance, vision insurance, Florida health insurance"
        />
        <link rel="canonical" href="https://buckalewfinancialservices.com/health-insurance" />
      </Head>

      <Schema data={pageSchema} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Health Insurance Solutions in Tampa Bay
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Find the right health insurance coverage for you and your family with 
              our expert guidance and personalized solutions.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Your Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Benefits */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <Icon className="w-12 h-12 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Health Insurance Options
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Explore our comprehensive health insurance options designed to protect 
            you and your family.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insuranceTypes.map((type, index) => (
              <InsuranceTypeCard key={index} {...type} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Buckalew Financial for Health Insurance?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Our experienced agents help you understand your options and choose 
                  the best coverage for your needs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Local Service</h3>
                <p className="text-gray-600">
                  Based in Tampa Bay, we provide personalized service and support 
                  to our local community.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Easy Enrollment</h3>
                <p className="text-gray-600">
                  We simplify the enrollment process and help you understand your 
                  benefits.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Ongoing Support</h3>
                <p className="text-gray-600">
                  We're here to help you throughout the year with claims, questions, 
                  and changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Education */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Understanding Your Health Insurance Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Types of Plans</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• HMO (Health Maintenance Organization)</li>
                <li>• PPO (Preferred Provider Organization)</li>
                <li>• EPO (Exclusive Provider Organization)</li>
                <li>• High Deductible Health Plans (HDHP)</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Key Terms</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Premium</li>
                <li>• Deductible</li>
                <li>• Copayment</li>
                <li>• Coinsurance</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Important Dates</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Open Enrollment Period</li>
                <li>• Special Enrollment Periods</li>
                <li>• Medicare Enrollment</li>
                <li>• Plan Effective Dates</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find the Right Health Insurance?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free quote and expert guidance on the perfect plan for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Get Your Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
