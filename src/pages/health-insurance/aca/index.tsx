import Head from 'next/head';
import Link from 'next/link';
import { Shield, Heart, DollarSign, CheckCircle, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Schema from '@/components/Schema';

const benefits = [
  {
    icon: Shield,
    title: 'Essential Health Benefits',
    description: 'All ACA plans cover 10 essential health benefits including preventive care, prescriptions, and more'
  },
  {
    icon: DollarSign,
    title: 'Financial Assistance',
    description: 'Premium tax credits and cost-sharing reductions to make coverage more affordable'
  },
  {
    icon: Heart,
    title: 'Pre-existing Conditions',
    description: 'Coverage guaranteed regardless of pre-existing conditions'
  }
];

const keyFeatures = [
  {
    title: 'Essential Health Benefits',
    items: [
      'Ambulatory patient services',
      'Emergency services',
      'Hospitalization',
      'Maternity and newborn care',
      'Mental health services',
      'Prescription drugs',
      'Rehabilitative services',
      'Laboratory services',
      'Preventive services',
      'Pediatric services'
    ]
  },
  {
    title: 'Financial Assistance',
    items: [
      'Premium tax credits',
      'Cost-sharing reductions',
      'Income-based subsidies',
      'Family size considerations',
      'Special enrollment periods'
    ]
  },
  {
    title: 'Plan Categories',
    items: [
      'Bronze plans',
      'Silver plans',
      'Gold plans',
      'Platinum plans',
      'Catastrophic coverage'
    ]
  }
];

export default function ACAPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "ACA Health Insurance Plans",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "Buckalew Financial Services"
    },
    "description": "Affordable Care Act health insurance plans with expert guidance and enrollment assistance",
    "serviceType": "Health Insurance",
    "areaServed": "Tampa Bay Area"
  };

  return (
    <>
      <Head>
        <title>ACA Health Insurance Plans | Affordable Care Act | Buckalew Financial</title>
        <meta 
          name="description" 
          content="Find affordable ACA health insurance plans in Tampa Bay. Expert guidance on Marketplace plans, subsidies, and enrollment. Get covered today!" 
        />
      </Head>

      <Schema data={pageSchema} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Affordable Care Act Health Insurance
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Get quality, affordable health coverage through the Health Insurance Marketplace. 
              We'll help you understand your options and find the right plan.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Get Your Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn About Subsidies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
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

      {/* Coverage Details */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Understanding Your ACA Coverage Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ACA Enrollment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Open Enrollment
              </h3>
              <p className="text-gray-600 mb-4">
                The annual Open Enrollment Period typically runs from November 1st 
                through January 15th. During this time, you can enroll in a new plan 
                or change your existing coverage.
              </p>
              <Button variant="outline" className="w-full">
                Learn More About Enrollment
              </Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                Special Enrollment
              </h3>
              <p className="text-gray-600 mb-4">
                You may qualify for a Special Enrollment Period if you've experienced 
                certain life events like losing other health coverage, moving, 
                marriage, or having a baby.
              </p>
              <Button variant="outline" className="w-full">
                Check Your Eligibility
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Help */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Making Coverage Affordable
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Most people qualify for financial assistance to help lower their 
            monthly premiums and out-of-pocket costs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Premium Tax Credits</h3>
              <p className="text-gray-600">
                Income-based financial assistance to lower your monthly premium 
                payments. Many individuals and families qualify for significant savings.
              </p>
              <Button variant="outline" className="w-full">
                Estimate Your Savings
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Cost-Sharing Reductions</h3>
              <p className="text-gray-600">
                Additional savings on out-of-pocket costs like deductibles, 
                copayments, and coinsurance for eligible individuals and families.
              </p>
              <Button variant="outline" className="w-full">
                Check Your Eligibility
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Covered?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you find the right ACA health insurance plan for your needs 
            and budget.
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