-5xl font-bold mb-6">
              Medicare Part D Prescription Drug Coverage
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Get help paying for your prescription medications with a Medicare Part D plan. 
              Compare plans and find coverage that fits your needs and budget.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Compare Drug Plans
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Get Plan Recommendations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <Icon className="w-12 h-12 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Stages */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Understanding Part D Coverage Stages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coverageStages.map((stage, index) => (
              <Card key={stage.name} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{stage.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{stage.description}</p>
                  <ul className="mt-auto space-y-2">
                    {stage.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Selection Help */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Find the Right Part D Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Drug Coverage Check</h3>
              <p className="text-gray-600 mb-6">
                Enter your medications to see which plans cover your prescriptions 
                at the lowest cost.
              </p>
              <Button className="w-full">Check Drug Coverage</Button>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Pharmacy Network Search</h3>
              <p className="text-gray-600 mb-6">
                Find plans that work with your preferred pharmacies, including mail-order options.
              </p>
              <Button className="w-full">Search Pharmacy Networks</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Enrollment Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Part D Enrollment Periods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Initial Enrollment
              </h3>
              <p className="text-gray-600">
                7-month period around your 65th birthday when you first become eligible 
                for Medicare.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Annual Enrollment
              </h3>
              <p className="text-gray-600">
                October 15 - December 7 each year. Change your Part D plan for the 
                following year.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                Special Enrollment
              </h3>
              <p className="text-gray-600">
                Special circumstances like moving or losing other drug coverage may 
                qualify you for enrollment.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Estimate Your Drug Costs
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Use our Medicare Part D cost calculator to estimate your annual drug costs 
              and find plans that could save you money.
            </p>
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Drug Cost Calculator</h3>
              <p className="text-gray-600 mb-6">
                Enter your medications and preferred pharmacy to see potential costs 
                under different plans.
              </p>
              <Button size="lg" className="w-full max-w-xs mx-auto">
                Calculate Drug Costs
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
              <h3 className="text-xl font-semibold mb-2">Do I need Medicare Part D?</h3>
              <p className="text-gray-600">
                If you don't have other creditable prescription drug coverage, it's 
                important to enroll in Part D when first eligible to avoid late enrollment 
                penalties.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How do drug tiers work?</h3>
              <p className="text-gray-600">
                Part D plans categorize drugs into tiers, with lower tiers having lower 
                copayments. Generic drugs are typically in lower tiers, while specialty 
                drugs are in higher tiers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What is the 'donut hole'?</h3>
              <p className="text-gray-600">
                The coverage gap (donut hole) begins when you and your plan spend a 
                certain amount on covered drugs. During this stage, you pay 25% of costs 
                until reaching catastrophic coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get Help With Your Part D Coverage
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our Medicare experts will help you compare plans and find the best coverage 
            for your medications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Compare Part D Plans
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Free Review
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
