  },
  {
    name: 'PPO Plans',
    description: 'Preferred Provider Organization plans offer more flexibility with provider choice',
    features: [
      'No PCP requirement',
      'No referrals needed',
      'Out-of-network coverage',
      'Higher monthly premiums',
      'More provider flexibility'
    ]
  },
  {
    name: 'EPO Plans',
    description: 'Exclusive Provider Organization plans combine HMO and PPO features',
    features: [
      'No referrals needed',
      'Network providers only',
      'Moderate premiums',
      'Emergency care coverage',
      'No out-of-network coverage'
    ]
  }
];

const essentialBenefits = [
  {
    title: 'Preventive Care',
    description: 'Annual checkups, screenings, and vaccinations',
    icon: Shield
  },
  {
    title: 'Prescription Drugs',
    description: 'Coverage for prescription medications',
    icon: Heart
  },
  {
    title: 'Emergency Services',
    description: 'Emergency room visits and ambulance services',
    icon: AlertCircle
  },
  {
    title: 'Hospitalization',
    description: 'Hospital stays and related services',
    icon: DollarSign
  },
  {
    title: 'Maternity Care',
    description: 'Pregnancy and newborn care services',
    icon: Heart
  }
];

export default function ACAPlansPage() {
  // Schema.org markup for SEO
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ACA Health Insurance Plans",
    "description": "Compare Affordable Care Act (ACA) health insurance plans including Bronze, Silver, Gold, and Platinum options",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "Buckalew Financial Services",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3031 Mojave Oak Dr",
        "addressLocality": "Valrico",
        "addressRegion": "FL",
        "postalCode": "33594",
        "addressCountry": "US"
      }
    },
    "offers": {
      "@type": "Offer",
      "category": "Health Insurance"
    }
  };

  return (
    <>
      <Head>
        <title>ACA Health Insurance Plans | Metal Tiers & Plan Types | Buckalew Financial</title>
        <meta 
          name="description" 
          content="Compare ACA health insurance plans in Tampa Bay. Expert guidance on metal tiers, plan types, and finding the right coverage for your needs." 
        />
        <meta 
          name="keywords" 
          content="ACA health plans, Marketplace insurance, Bronze plans, Silver plans, Gold plans, Platinum plans, HMO, PPO, Tampa Bay health insurance"
        />
        <link rel="canonical" href="https://buckalewfinancialservices.com/health-insurance/aca/plans" />
      </Head>

      <Schema data={pageSchema} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Understanding ACA Health Insurance Plans
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Compare different metal tiers and plan types to find the right health 
              insurance coverage for you and your family.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Compare Plans
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Get Plan Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metal Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Metal Tier Plan Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metalTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`p-6 ${tier.isPopular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {tier.isPopular && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium absolute -top-3 right-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Monthly Premium</span>
                    <span className="font-medium">{tier.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Out-of-Pocket Costs</span>
                    <span className="font-medium">{tier.outOfPocket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Insurance/You Pay</span>
                    <span className="font-medium">{tier.costSplit}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Best For:</h4>
                  <ul className="space-y-1">
                    {tier.bestFor.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Types of Health Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planTypes.map((type) => (
              <Card key={type.name} className="p-6">
                <h3 className="text-xl font-semibold mb-4">{type.name}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Essential Health Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {essentialBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="p-6 text-center">
                  <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">
              View All Essential Benefits
            </Button>
          </div>
        </div>
      </section>

      {/* Plan Comparison Tool */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Compare ACA Plans
            </h2>
            <p className="text-xl text-gray-600 text-center mb-8">
              Use our interactive tool to compare plans and find the right coverage 
              for your needs.
            </p>
            <PlanComparisonTool planType="aca" />
          </div>
        </div>
      </section>

      {/* Financial Help */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Get Help Paying for Coverage
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              You may qualify for financial assistance to help lower your monthly 
              premiums and out-of-pocket costs.
            </p>
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Subsidy Calculator</h3>
              <p className="text-gray-600 mb-6">
                Estimate your potential savings with our quick calculator.
              </p>
              <Button size="lg">
                Calculate Your Savings
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
        <div className="container mx-auto px-6">
          <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">How do metal tiers work?</h3>
              <p className="text-gray-600">
                Metal tiers (Bronze, Silver, Gold, Platinum) indicate how you and your 
                plan split costs. Bronze plans have lower monthly premiums but higher 
                out-of-pocket costs, while Platinum plans have higher premiums but lower 
                out-of-pocket costs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What are essential health benefits?</h3>
              <p className="text-gray-600">
                Essential health benefits are 10 categories of services that all ACA plans 
                must cover, including preventive care, prescription drugs, emergency 
                services, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I keep my doctor?</h3>
              <p className="text-gray-600">
                It depends on your plan type. PPO plans offer more flexibility in choosing 
                providers, while HMO plans require you to use network providers. We can 
                help you find plans that include your preferred doctors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Plan?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get expert help comparing plans and enrolling in the right coverage for 
            your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Compare Plans Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
