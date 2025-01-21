"w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Foreign travel emergency (up to plan limits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Guaranteed renewable coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Nationwide coverage with any Medicare provider</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Enrollment Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Enrollment Periods & Eligibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Medigap Open Enrollment
              </h3>
              <p className="text-gray-600 mb-4">
                Your Medigap Open Enrollment Period starts the month you turn 65 and are enrolled 
                in Medicare Part B. This 6-month period is your guaranteed right to buy any 
                Medigap policy at the best available rates.
              </p>
              <Button variant="outline" className="w-full">
                Calculate Your Enrollment Period
              </Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                Special Circumstances
              </h3>
              <p className="text-gray-600 mb-4">
                You may have guaranteed issue rights in certain situations, like losing other 
                coverage or moving out of your Medicare Advantage plan's service area.
              </p>
              <Button variant="outline" className="w-full">
                Check Your Rights
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Plan Comparison Tool */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Compare Medigap Plans Side by Side
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Use our easy comparison tool to see how different Medicare Supplement plans 
              stack up and find the right coverage for your needs.
            </p>
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Plan Comparison Tool</h3>
              <p className="text-gray-600 mb-6">
                Enter your zip code to see available plans and rates in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex-1 max-w-xs mx-auto">
                  Compare Plans Now
                </Button>
              </div>
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
              <h3 className="text-xl font-semibold mb-2">What is Medicare Supplement Insurance?</h3>
              <p className="text-gray-600">
                Medicare Supplement Insurance (Medigap) helps pay some of the healthcare costs 
                that Original Medicare doesn't cover, like copayments, coinsurance, and deductibles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">When can I buy a Medigap policy?</h3>
              <p className="text-gray-600">
                The best time to buy a Medigap policy is during your Medigap Open Enrollment 
                Period, which starts when you're 65 or older and enrolled in Medicare Part B.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Are Medigap policies standardized?</h3>
              <p className="text-gray-600">
                Yes, Medigap policies are standardized in most states. This means Plan G, 
                for example, offers the exact same coverage regardless of which insurance 
                company sells it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do I need a Medigap and a Part D plan?</h3>
              <p className="text-gray-600">
                Yes, if you want prescription drug coverage. Medicare Supplement plans don't 
                include prescription drug coverage, so you'll need a separate Part D plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Guidance */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Expert Medicare Supplement Guidance
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our licensed Medicare agents will help you understand your options and find 
            the right Medigap plan for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Download Medigap Guide
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Our Medicare experts are here to help you understand your Medigap options.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">Call: (813) 555-0123</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">Email: medicare@buckalewfinancial.com</span>
                </li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Request Information</h3>
              <p className="text-gray-600 mb-6">
                Get a free Medicare Supplement guide and rate comparison for your area.
              </p>
              <Button className="w-full">Request Free Info Pack</Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
