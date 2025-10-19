import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HeartPulse, Calculator } from 'lucide-react';
import { PageStructure } from '../components/layout/PageStructure';
import OptimizedImage from '@/components/OptimizedImage';

export default function HomePage() {
    const services = [
        {
            icon: <ShieldCheck className="w-12 h-12 text-primary-dark"/>,
            title: 'Life Insurance',
            description: 'Comprehensive life insurance solutions to protect your family\'s financial future.',
            href: '/life-insurance',
            linkText: 'Learn More',
            image: '/images/services/life-insurance.jpg' // Add your image here
        },
        {
            icon: <HeartPulse className="w-12 h-12 text-primary-dark"/>,
            title: 'Health Insurance',
            description: 'Find the right health insurance plan to keep you and your family covered.',
            href: '/health-insurance',
            linkText: 'Explore Plans',
            image: '/images/services/health-insurance.jpg' // Add your image here
        },
        {
            icon: <Calculator className="w-12 h-12 text-primary-dark"/>,
            title: 'Financial Calculators',
            description: 'Plan your financial future with our easy-to-use online tools.',
            href: '/calculators',
            linkText: 'Get Started',
            image: '/images/services/calculators.jpg' // Add your image here
        }
    ];

    return (
        <PageStructure 
            title="Buckalew Financial Services" 
            description="Your trusted partner in financial protection and planning"
            heroContent={{
                title: 'Buckalew Financial Services',
                subtitle: 'Your trusted partner in financial protection and planning',
                // Uncomment and add your hero image:
                // backgroundImage: '/images/hero/homepage-banner.jpg'
            }}
        >
            {/* Services Section */}
            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all 
                                   hover:-translate-y-2 hover:shadow-xl border-t-4 border-primary-dark"
                    >
                        {/* Optional: Uncomment to show service images */}
                        {/* <div className="h-48 bg-gray-200 relative">
                            <OptimizedImage
                                src={service.image}
                                alt={service.title}
                                fill={true}
                                objectFit="cover"
                            />
                        </div> */}
                        
                        <div className="p-8">
                            <div className="flex items-center mb-6">
                                {service.icon}
                                <h2 className="text-2xl font-semibold ml-4 text-primary-dark">
                                    {service.title}
                                </h2>
                            </div>
                            <p className="text-gray-600 mb-6 h-24">
                                {service.description}
                            </p>
                            <Link 
                                href={service.href} 
                                className="inline-block bg-primary-light text-primary-dark 
                                           px-6 py-3 rounded-full hover:bg-primary-dark 
                                           hover:text-white transition-colors"
                            >
                                {service.linkText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trust Indicators Section */}
            <section className="mt-16 bg-gray-50 py-12 px-8 rounded-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Trusted by Thousands of Families
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join over 5,000 satisfied customers who trust Buckalew Financial Services 
                        for their insurance and financial planning needs.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-3xl font-bold text-primary-dark mb-2">5,000+</div>
                        <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-3xl font-bold text-primary-dark mb-2">15+</div>
                        <div className="text-gray-600">Years Experience</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-3xl font-bold text-primary-dark mb-2">50+</div>
                        <div className="text-gray-600">Insurance Carriers</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-3xl font-bold text-primary-dark mb-2">A+</div>
                        <div className="text-gray-600">BBB Rating</div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="mt-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    What Our Customers Say
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            name: 'Sarah & Mike Johnson',
                            location: 'Young Family, Austin TX',
                            text: 'Larry helped us find the perfect life insurance policy that fits our budget. His expertise and patience made the process so easy!',
                            // image: '/images/testimonials/customer-1.jpg' // Add your image
                        },
                        {
                            name: 'Robert & Linda Chen',
                            location: 'Retirees, Dallas TX',
                            text: 'Outstanding Medicare guidance! Larry saved us thousands and found coverage that actually works for our medical needs.',
                            // image: '/images/testimonials/customer-2.jpg'
                        },
                        {
                            name: 'David Martinez',
                            location: 'Small Business Owner, Houston TX',
                            text: 'Professional, knowledgeable, and always available when we have questions. Highly recommend for anyone looking for insurance!',
                            // image: '/images/testimonials/customer-3.jpg'
                        }
                    ].map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-primary"
                        >
                            {/* Optional: Add customer photo */}
                            {/* <div className="flex items-center gap-4 mb-4">
                                <OptimizedImage
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                                <div>
                                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                                </div>
                            </div> */}
                            
                            <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                            <p className="text-gray-600 mb-4 italic">
                                "{testimonial.text}"
                            </p>
                            <div className="font-semibold text-gray-800">- {testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.location}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="mt-16 bg-primary text-white py-12 px-8 rounded-2xl">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose Buckalew Financial Services?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="text-5xl mb-4">🏆</div>
                        <h3 className="text-xl font-semibold mb-3">Award-Winning Service</h3>
                        <p className="text-blue-100">
                            Recognized for excellence in customer service and professional expertise 
                            by industry associations.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl mb-4">🤝</div>
                        <h3 className="text-xl font-semibold mb-3">Personal Relationship</h3>
                        <p className="text-blue-100">
                            You're not just a policy number. We build lasting relationships and 
                            provide ongoing support for life.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold mb-3">Best Value Promise</h3>
                        <p className="text-blue-100">
                            We shop multiple carriers to find you the best coverage at the most 
                            competitive rates available.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Ready to Protect What Matters Most?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Get your personalized insurance quote today. It's free, fast, and there's no obligation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/quote" 
                        className="bg-primary text-white px-8 py-4 rounded-lg 
                                   text-xl hover:bg-primary-dark transition-colors shadow-lg"
                    >
                        Get Your Free Quote
                    </Link>
                    <Link 
                        href="/contact" 
                        className="border-2 border-primary text-primary px-8 py-4 rounded-lg 
                                   text-xl hover:bg-primary hover:text-white transition-colors"
                    >
                        Speak with an Expert
                    </Link>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                    📞 Call us now: <span className="font-semibold">(844) 779-7600</span> | 
                    ✉️ Email: <span className="font-semibold">larry@buckalewfinancialservices.com</span>
                </p>
            </div>
        </PageStructure>
    );
}
