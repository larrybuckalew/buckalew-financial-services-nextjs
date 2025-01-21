"Can I keep my doctors?</h3>
              <p className="text-gray-600">
                It depends on your plan. HMO plans require you to use network providers, 
                while PPO plans offer more flexibility with out-of-network coverage at 
                higher costs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do MA plans include drug coverage?</h3>
              <p className="text-gray-600">
                Most Medicare Advantage plans include prescription drug coverage (Part D). 
                Some plans, like Medicare Medical Savings Account plans, don't include 
                drug coverage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What if I travel frequently?</h3>
              <p className="text-gray-600">
                Most Medicare Advantage plans cover emergency care nationwide, but 
                routine care is typically limited to network providers. Some plans offer 
                travel coverage options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Get Expert Medicare Advantage Guidance
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our licensed Medicare agents are here to help you understand your options 
              and find the right Medicare Advantage plan for your needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Schedule a Consultation</h3>
                <p className="text-gray-600 mb-6">
                  Get personalized help comparing plans and understanding your options.
                </p>
                <Button className="w-full">Book Appointment</Button>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get a Plan Comparison</h3>
                <p className="text-gray-600 mb-6">
                  Compare Medicare Advantage plans available in your area.
                </p>
                <Button className="w-full">Compare Plans</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
