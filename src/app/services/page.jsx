import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HeartPulse, Calculator, Stethoscope, Eye, Smile } from 'lucide-react';
import { PageStructure } from '../../components/layout/PageStructure';
export default function ServicesPage() {
    const services = [
        {
            icon: <ShieldCheck className="w-12 h-12 text-primary-dark"/>,
            title: 'Life Insurance',
            description: 'Protect your family\'s financial future with our comprehensive life insurance solutions. We offer term life, whole life, and universal life policies.',
            href: '/life-insurance'
        },
        {
            icon: <HeartPulse className="w-12 h-12 text-primary-dark"/>,
            title: 'Health Insurance',
            description: 'Find the perfect health insurance plan for you and your family. We offer individual, family, and group health insurance plans.',
            href: '/health-insurance'
        },
        {
            icon: <Smile className="w-12 h-12 text-primary-dark"/>,
            title: 'Dental Insurance',
            description: 'Keep your smile bright with our dental insurance plans. Coverage for routine checkups, procedures, and orthodontics.',
            href: '/health-insurance/dental'
        },
        {
            icon: <Eye className="w-12 h-12 text-primary-dark"/>,
            title: 'Vision Insurance',
            description: 'Protect your vision with our comprehensive eye care coverage. Plans include eye exams, glasses, and contact lenses.',
            href: '/health-insurance/vision'
        },
        {
            icon: <Stethoscope className="w-12 h-12 text-primary-dark"/>,
            title: 'Medicare Solutions',
            description: 'Navigate Medicare with confidence. We offer Medicare Advantage, Supplement, and Prescription Drug plans.',
            href: '/health-insurance/medicare'
        },
        {
            icon: <Calculator className="w-12 h-12 text-primary-dark"/>,
            title: 'Financial Planning',
            description: 'Plan your financial future with our expert advisors. We offer retirement planning, investment advice, and more.',
            href: '/calculators'
        }
    ];
    return (<PageStructure title="Our Services" description="We offer a comprehensive range of insurance and financial services to protect what matters most to you." heroContent={{
            title: 'Our Services',
            subtitle: 'We offer a comprehensive range of insurance and financial services to protect what matters most to you.'
        }}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (<Link key={index} href={service.href} className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-3 text-primary-dark group-hover:text-primary transition-colors">
              {service.title}
            </h2>
            <p className="text-gray-600">
              {service.description}
            </p>
          </Link>))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/quote" className="inline-block bg-primary text-white px-8 py-4 rounded-lg text-xl hover:bg-primary-dark transition-colors shadow-lg">
          Get a Free Quote
        </Link>
      </div>
    </PageStructure>);
}
