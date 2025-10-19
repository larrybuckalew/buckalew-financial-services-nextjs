import Link from 'next/link';
import { PageStructure } from '@/components/layout/PageStructure';
export const metadata = {
    title: 'About Us | Buckalew Financial Services',
    description: 'Learn about Buckalew Financial Services - your trusted partner for comprehensive insurance and financial solutions.',
    keywords: [
        'about us',
        'insurance agency',
        'financial services',
        'Buckalew Financial',
        'insurance experts',
        'trusted advisors'
    ]
};
export default function AboutPage() {
    const teamValues = [
        {
            icon: '🤝',
            title: 'Trust & Integrity',
            description: 'We build lasting relationships based on honesty, transparency, and ethical practices.'
        },
        {
            icon: '🎯',
            title: 'Personalized Service',
            description: 'Every client receives customized solutions tailored to their unique needs and circumstances.'
        },
        {
            icon: '🏆',
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from customer service to product knowledge.'
        },
        {
            icon: '💡',
            title: 'Education First',
            description: 'We believe informed clients make better decisions. We educate before we sell.'
        }
    ];
    const services = [
        {
            category: 'Health Insurance',
            items: ['Medicare Plans', 'ACA Marketplace', 'Dental & Vision', 'Specialty Coverage']
        },
        {
            category: 'Life Insurance',
            items: ['Term Life', 'Whole Life', 'Final Expense', 'Long-term Care']
        },
        {
            category: 'Financial Planning',
            items: ['Retirement Planning', 'Investment Strategies', 'Estate Planning', 'Tax Planning']
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'About Buckalew Financial Services',
            subtitle: 'Your trusted partner in securing financial peace of mind through comprehensive insurance and financial planning solutions.'
        }}>
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded with a simple mission: to make insurance and financial planning accessible, 
                understandable, and affordable for everyone. At Buckalew Financial Services, we believe 
                that everyone deserves financial security and peace of mind.
              </p>
              <p>
                With years of experience in the insurance and financial services industry, our team 
                has helped thousands of individuals and families find the right coverage and build 
                solid financial foundations for their future.
              </p>
              <p>
                We're not just insurance agents – we're your financial advocates, working tirelessly 
                to ensure you have the protection and planning you need at every stage of life.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 mb-4">Satisfied Clients</div>
              
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600 mb-4">Years of Experience</div>
              
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Insurance Carriers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {teamValues.map((value, index) => (<div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (<div key={index} className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">{service.category}</h3>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (<li key={itemIndex} className="flex items-center">
                    <span className="text-blue-600 mr-3">✓</span>
                    {item}
                  </li>))}
              </ul>
            </div>))}
        </div>
      </section>

      <section className="mb-16 bg-blue-600 text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Buckalew Financial Services?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Always Available</h3>
            <p>Our team is here when you need us most, providing support and guidance every step of the way.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
            <p>We analyze your complete financial picture to recommend the best solutions for your unique situation.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Cost-Effective Solutions</h3>
            <p>Access to multiple carriers means we can find you the best coverage at competitive rates.</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Let us help you build a secure financial future. Contact us today for a free consultation 
          and discover how we can protect what matters most to you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/quote" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
            Get Free Quote
          </Link>
          <Link href="/contact" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-lg font-semibold">
            Contact Us
          </Link>
          <Link href="/appointments" className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold">
            Schedule Meeting
          </Link>
        </div>
      </section>
    </PageStructure>);
}
