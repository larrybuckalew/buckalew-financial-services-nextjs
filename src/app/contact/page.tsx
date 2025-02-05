import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Buckalew Financial Services',
  description: 'Get in touch with our expert financial advisors. We\'re here to help you with your insurance and financial planning needs.',
  keywords: ['contact', 'financial advice', 'insurance consultation']
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone',
      description: 'Speak directly with an advisor',
      details: '(844) 779-7600'
    },
    {
      icon: '✉️',
      title: 'Email',
      description: 'Send us a detailed message',
      details: 'larry@buckalewfinancialservices.com'
    },
    {
      icon: '📍',
      title: 'Office Location',
      description: 'Visit our main office',
      details: '3031 Mojave Oak Dr, Valrico FL 33594'
    }
  ];

  return (
    <div>
      {/* Hero Section with Consistent Gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">
              Contact Buckalew Financial Services
            </h1>
            <p className="text-xl mb-8 text-white/90">
              We're here to help you navigate your financial journey. Reach out to us and let's discuss your insurance needs.
            </p>
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Contact Methods Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="text-xl font-bold text-brand-primary mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-2">{method.description}</p>
              <p className="text-brand-green-light font-semibold">{method.details}</p>
            </div>
          ))}
        </section>

        <section className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-brand-primary">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-brand-primary">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-brand-primary">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-brand-primary">
                Phone Number
              </label>
              <input 
                type="tel" 
                id="phone" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div>
              <label htmlFor="service" className="block mb-2 text-brand-primary">
                Interested Service
              </label>
              <select 
                id="service" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                required
              >
                <option value="">Select a Service</option>
                <option value="medicare">Medicare Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="health">Health Insurance</option>
                <option value="financial-planning">Financial Planning</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-brand-primary">
                Your Message
              </label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-light"
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="smsConsent" 
                  className="mr-2 mt-1 accent-brand-green-light"
                  required 
                />
                <label htmlFor="smsConsent" className="text-sm text-gray-700">
                  I consent to receive automated marketing text messages at the phone number provided. 
                  Consent is not a condition of purchase. Message and data rates may apply. 
                  Message frequency varies. Reply HELP for help or STOP to cancel.
                </label>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="privacyConsent" 
                  className="mr-2 mt-1 accent-brand-green-light"
                  required 
                />
                <label htmlFor="privacyConsent" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/privacy-policy" className="text-brand-green-light hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  and authorize Buckalew Financial Services to contact me via phone, email, 
                  or text message about its products and services.
                </label>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-brand-primary text-white px-8 py-3 rounded-lg hover:bg-brand-green-light transition"
              >
                Send Message
              </button>
            </div>
            
            <div className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to our communication terms and consent to be contacted.
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}