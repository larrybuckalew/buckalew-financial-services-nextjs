import Link from 'next/link';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Educational Resources | Insurance Learning Center',
  description: 'Comprehensive educational guides to help you understand life, health, and Medicare insurance.',
  path: '/resources/educational'
});

const educationalResources = [
  {
    category: 'Life Insurance',
    icon: '👨‍👩‍👧‍👦',
    resources: [
      {
        title: 'Understanding Life Insurance',
        description: 'Learn how life insurance can protect your family\'s financial future.',
        link: '/guides/life-insurance/understanding-life-insurance'
      },
      {
        title: 'Choosing the Right Policy',
        description: 'A step-by-step guide to selecting the best life insurance plan for your needs.',
        link: '/guides/life-insurance/choosing-right-policy'
      },
      {
        title: 'Why Start Early?',
        description: 'Discover the benefits of purchasing life insurance at a younger age.',
        link: '/guides/life-insurance/benefits-of-early-life-insurance'
      }
    ]
  },
  {
    category: 'Health Insurance',
    icon: '🏥',
    resources: [
      {
        title: 'Navigating Health Insurance',
        description: 'Understand the basics of health insurance and how it works.',
        link: '/guides/health-insurance/navigating-health-insurance'
      },
      {
        title: 'Preventive Care Matters',
        description: 'Learn why preventive care is essential for long-term health and savings.',
        link: '/guides/health-insurance/importance-of-preventive-care'
      },
      {
        title: 'HMO vs. PPO: What\'s the Difference?',
        description: 'Compare the two most common types of health insurance plans.',
        link: '/guides/health-insurance/hmo-vs-ppo-comparison'
      }
    ]
  },
  {
    category: 'Medicare',
    icon: '👨‍👩‍👧‍👦',
    resources: [
      {
        title: 'Medicare 101',
        description: 'A beginner\'s guide to understanding Medicare Parts A, B, C, and D.',
        link: '/guides/medicare/medicare-101'
      },
      {
        title: 'When to Enroll in Medicare',
        description: 'Avoid penalties by enrolling during the right time frame.',
        link: '/guides/medicare/medicare-enrollment-timing'
      },
      {
        title: 'Supplementing Medicare',
        description: 'Explore Medigap and other options to enhance your Medicare coverage.',
        link: '/guides/medicare/medicare-supplemental-coverage'
      }
    ]
  }
];

export default function EducationalResourcesPage() {
  return (
    <div>
      {/* Hero Section with Gradient */}
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Educational Resources</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Dive deep into insurance knowledge with our comprehensive guides. 
            Learn the essentials, understand your options, and make informed decisions.
          </p>
          <Link
            href="/contact"
            className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg transition duration-300"
          >
            Speak with an Advisor
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {educationalResources.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center">
                <span className="mr-3">{category.icon}</span>
                {category.category} Resources
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.resources.map((resource, resourceIndex) => (
                  <div 
                    key={resourceIndex} 
                    className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {resource.description}
                    </p>
                    <Link 
                      href={resource.link}
                      className="text-secondary hover:text-secondary-dark font-medium inline-flex items-center"
                    >
                      Read More
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our advisors are ready to help.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition duration-300"
          >
            Speak with an Advisor
          </Link>
        </div>
      </div>
    </div>
  );
}