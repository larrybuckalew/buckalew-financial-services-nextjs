import Link from 'next/link';
import { PageStructure } from '../../components/layout/PageStructure';
export const metadata = {
    title: 'Comprehensive Health Insurance Solutions | Buckalew Financial Services',
    description: 'Tailored health insurance plans to protect you and your family. Explore Medicare, ACA, dental, vision, and specialty health coverage.',
    keywords: [
        'health insurance',
        'medical coverage',
        'family health plans',
        'Medicare',
        'ACA plans',
        'dental insurance',
        'vision insurance'
    ]
};
export default function HealthInsurancePage() {
    const coverageTypes = [
        {
            title: 'Medicare',
            description: 'Comprehensive coverage for seniors and those with disabilities.',
            icon: '🏥',
            link: '/health-insurance/medicare'
        },
        {
            title: 'ACA Plans',
            description: 'Affordable marketplace health insurance options.',
            icon: '📋',
            link: '/health-insurance/aca'
        },
        {
            title: 'Dental Insurance',
            description: 'Preventive and comprehensive dental care coverage.',
            icon: '🦷',
            link: '/health-insurance/dental'
        },
        {
            title: 'Vision Insurance',
            description: 'Eye care and eyewear coverage for all ages.',
            icon: '👁️',
            link: '/health-insurance/vision'
        },
        {
            title: 'Hearing Insurance',
            description: 'Hearing health and hearing aid coverage.',
            icon: '👂',
            link: '/health-insurance/hearing'
        },
        {
            title: 'Specialty Plans',
            description: 'Targeted coverage for specific health conditions.',
            icon: '❤️',
            link: '/health-insurance/specialty-plans'
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Comprehensive Health Insurance Solutions',
            subtitle: 'Protect your health and financial well-being with tailored insurance plans designed to meet your unique needs.'
        }}>
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        {coverageTypes.map((type, index) => (<Link key={index} href={type.link} className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">
                {type.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{type.title}</h2>
              <p className="text-gray-600">{type.description}</p>
              <div className="text-primary font-semibold group-hover:underline mt-4">
                Explore {type.title} →
              </div>
            </div>
          </Link>))}
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose Buckalew Financial Services?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
                icon: '🛡️',
                title: 'Personalized Coverage',
                description: 'Tailored insurance solutions that match your unique health needs.'
            },
            {
                icon: '💡',
                title: 'Expert Guidance',
                description: 'Professional advice to help you make informed health insurance decisions.'
            },
            {
                icon: '💰',
                title: 'Cost-Effective Plans',
                description: 'Comprehensive coverage at competitive and affordable rates.'
            }
        ].map((feature, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>))}
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Find Your Perfect Health Insurance?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Schedule a free consultation with our experts to discuss your health insurance needs 
          and discover the best coverage for you and your family.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/quote" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
            Get a Free Quote
          </Link>
          <Link href="/contact" className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition">
            Contact an Agent
          </Link>
        </div>
      </section>
    </PageStructure>);
}
