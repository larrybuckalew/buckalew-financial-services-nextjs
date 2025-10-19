import React from 'react';
import { ContactForm } from '@/components/common/ContactForm';
import { Phone, Mail, MapPin } from 'lucide-react';
const ContactPage = () => {
    return (<div>
      {/* Hero Section */}
      <section className="relative py-16 bg-cover bg-center text-white" style={{ backgroundImage: 'linear-gradient(to right, #3182ce, #2c5282)' }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Get in touch with Buckalew Financial Services for personalized insurance solutions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                  <p className="text-gray-600">
                    3031 Mojave Oak Dr<br />
                    Valrico, FL 33594
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:844-779-7600" className="hover:text-blue-600 transition-colors">
                      844-779-7600
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:larry@buckalewfinancialservices.com" className="hover:text-blue-600 transition-colors">
                      larry@buckalewfinancialservices.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Business Hours</h3>
              <div className="space-y-1 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: By Appointment</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>);
};
export default ContactPage;
