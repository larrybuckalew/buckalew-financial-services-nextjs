import { Metadata } from 'next';
import Link from 'next/link';
import GatedContentForm from '@/components/forms/GatedContentForm';

export const metadata: Metadata = {
  title: 'Insurance Guides & Resources | Buckalew Financial Services',
  description: 'Comprehensive guides and resources to help you make informed insurance decisions.',
  keywords: ['insurance guides', 'financial resources', 'insurance education']
};

const resourceGuides = [
  {
    title: 'Understanding Life Insurance',
    description: 'Learn how life insurance can protect your family\'s financial future. Includes types of policies, coverage options, and tips for choosing the right plan.',
    pdfPath: '/resources/guides/life-insurance-guide.pdf',
    category: 'Life Insurance',
    difficulty: 'Beginner'
  },
  {
    title: 'Medicare Explained',
    description: 'A comprehensive guide to understanding Medicare, including Part A, B, C, and D, enrollment periods, and choosing the right coverage.',
    pdfPath: '/resources/guides/medicare-guide.pdf',
    category: 'Medicare',
    difficulty: 'Intermediate'
  },
  {
    title: 'Health Insurance Fundamentals',
    description: 'Navigate the complex world of health insurance with this essential guide covering types of plans, key terms, and how to find the best coverage.',
    pdfPath: '/resources/guides/health-insurance-guide.pdf',
    category: 'Health Insurance',
    difficulty: 'Beginner'
  }
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Consistent Gradient */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">Insurance Guides & Resources</h1>
            <p className="text-xl mb-8 text-white/90">
              Empower yourself with expert knowledge to make informed insurance decisions
            </p>
            <Link
              href="#guides"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Explore Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Comprehensive Guides</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resourceGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded">
                      {guide.category}
                    </span>
                    <span className="text-sm ml-2 text-gray-500">
                      {guide.difficulty}
                    </span>
                  </div>
                  <GatedContentForm 
                    resourceTitle={guide.title}
                    pdfPath={guide.pdfPath}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Need Personalized Guidance?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Our expert advisors are ready to help you understand your insurance options
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition duration-300 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}