-bold mb-4">
            Get the Coverage You Need
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Speak with our Medicare experts to find the right dental, vision, and hearing 
            coverage for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Compare Coverage Options
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Get Expert Help</h3>
              <p className="text-gray-600 mb-6">
                Our Medicare specialists can help you understand your coverage options 
                and find plans that fit your needs and budget.
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
              <h3 className="text-xl font-semibold mb-4">Download Free Guide</h3>
              <p className="text-gray-600 mb-6">
                Get our comprehensive guide to Medicare dental, vision, and hearing 
                coverage options.
              </p>
              <Button className="w-full">Download Guide</Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
