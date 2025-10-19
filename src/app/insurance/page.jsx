import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'Insurance Solutions | Buckalew Financial Services',
    description: 'Comprehensive insurance solutions including health, life, Medicare, and specialty coverage to protect you and your family.',
    keywords: [
        'insurance',
        'health insurance',
        'life insurance',
        'Medicare',
        'ACA plans',
        'financial protection',
        'coverage'
    ]
};
export default function InsurancePage() {
    const insuranceCategories = [
        {
            title: 'Health Insurance',
            description: 'Comprehensive health coverage including Medicare, ACA, dental, vision, and specialty plans.',
            icon: '🏥',
            link: '/health-insurance',
            features: ['Medicare Coverage', 'ACA Marketplace Plans', 'Dental & Vision', 'Specialty Plans'],
            color: 'bg-blue-50 border-blue-200'
        },
        {
            title: 'Life Insurance',
            description: 'Protect your family\'s financial future with term, whole life, and specialized life insurance.',
            icon: '🛡️',
            link: '/life-insurance',
            features: ['Term Life Insurance', 'Whole Life Insurance', 'Final Expense', 'Long-Term Care'],
            color: 'bg-green-50 border-green-200'
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Comprehensive Insurance Solutions',
            subtitle: 'Protect what matters most with tailored insurance coverage designed for your unique needs and budget.'
        }}>
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        {insuranceCategories.map((category, index) => (<div key={index} className={`${category.color} border-2 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="text-6xl mb-6 text-center">{category.icon}</div>
            <h2 className="text-3xl font-bold text-center mb-4">{category.title}</h2>
            <p className="text-gray-700 text-center mb-6">{category.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-center">Coverage Options:</h3>
              <ul className="space-y-2">
                {category.features.map((feature, idx) => (<li key={idx} className="flex items-center justify-center">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>))}
              </ul>
            </div>

            <div className="text-center">
              <Link href={category.link} className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold">
                Explore {category.title}
              </Link>
            </div>
          </div>))}
      </section>

      <section className="bg-gray-50 p-8 rounded-xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Buckalew Financial Services?
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
                icon: '👥',
                title: 'Personal Service',
                description: 'One-on-one guidance from experienced insurance professionals.'
            },
            {
                icon: '🎯',
                title: 'Tailored Solutions',
                description: 'Insurance plans customized to your specific needs and budget.'
            },
            {
                icon: '📞',
                title: 'Ongoing Support',
                description: 'Continuous assistance with claims, changes, and questions.'
            },
            {
                icon: '💰',
                title: 'Competitive Rates',
                description: 'Access to multiple carriers for the best coverage at great prices.'
            }
        ].map((benefit, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Find Your Perfect Coverage?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Get personalized insurance recommendations and quotes from multiple carriers. 
          Our experts will help you compare options and find the right coverage for your needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/quote" className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold">
            Get Free Quote
          </Link>
          <Link href="/contact" className="border-2 border-primary text-primary px-8 py-4 rounded-lg hover:bg-primary hover:text-white transition-colors text-lg font-semibold">
            Speak with an Agent
          </Link>
          <Link href="/appointments" className="bg-secondary text-white px-8 py-4 rounded-lg hover:bg-secondary-dark transition-colors text-lg font-semibold">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </PageStructure>);
}
