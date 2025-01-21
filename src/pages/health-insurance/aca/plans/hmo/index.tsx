,
    "name": "HMO Health Insurance Plans",
    "description": "Health Maintenance Organization (HMO) plans offering coordinated care through a network of providers",
    "category": "Health Insurance",
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "HMO Health Insurance",
        "description": "Network-based health insurance with coordinated care through a primary care physician"
      }
    },
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
    }
  };

  return (
    <>
      <Head>
        <title>HMO Health Insurance Plans | Network Coverage | Buckalew Financial</title>
        <meta 
          name="description" 
          content="Learn about HMO health insurance plans. Discover the benefits of coordinated care, lower premiums, and comprehensive network coverage." 
        />
        <meta 
          name="keywords" 
          content="HMO plans, health maintenance organization, network coverage, primary care physician, coordinated care, Tampa Bay health insurance"
        />
        <link rel="canonical" href="https://buckalewfinancialservices.com/health-insurance/aca/plans/hmo" />
      </Head>

      <Schema data={pageSchema} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              HMO Health Insurance Plans
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Quality healthcare through coordinated care and a network of trusted providers. 
              Enjoy lower premiums and predictable costs with an HMO plan.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Compare HMO Plans
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn More About HMOs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features of HMO Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6">{feature.description}</p>
                    <ul className="mt-auto space-y-2">
                      {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How HMO Plans Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <Card key={item.title} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <ul className="mt-auto space-y-2">
                    {item.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best For & Considerations */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Best For</h3>
              <ul className="space-y-2">
                {bestFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Key Considerations</h3>
              <ul className="space-y-2">
                {considerations.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Network Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Provider Network
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Access quality healthcare through our extensive network of doctors, 
              specialists, and facilities.
            </p>
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Find Network Providers</h3>
              <p className="text-gray-600 mb-6">
                Search our provider directory to find doctors and facilities in your area.
              </p>
              <Button size="lg">
                Search Provider Network
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" aria-labelledby="faq-heading">
        <div className="container mx-auto px-6">
          <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">What is a Primary Care Physician (PCP)?</h3>
              <p className="text-gray-600">
                A PCP is your main doctor who provides most of your care, refers you to 
                specialists when needed, and helps coordinate all your healthcare services.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do I need referrals for specialists?</h3>
              <p className="text-gray-600">
                Yes, with an HMO plan, you typically need a referral from your PCP to 
                see specialists. This helps coordinate your care and ensure you receive 
                appropriate treatments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What about emergency care?</h3>
              <p className="text-gray-600">
                Emergency care is always covered, even if you're outside your network area. 
                However, follow-up care should be provided by network providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find an HMO Plan?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Compare HMO plans and get expert help choosing the right coverage for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Compare HMO Plans
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
