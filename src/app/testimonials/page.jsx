import { SEOUtility } from '@/lib/seo';
import { PageStructure } from '../../components/layout/PageStructure'; // Import PageStructure
export const metadata = SEOUtility.generatePageSEO({
    title: 'Client Testimonials',
    description: 'Real stories from satisfied Buckalew Financial Services clients',
    keywords: ['testimonials', 'client stories', 'success stories'],
    path: '/testimonials'
});
export default function TestimonialsPage() {
    const testimonials = [
        {
            name: 'Robert Thompson',
            age: 65,
            location: 'Phoenix, AZ',
            service: 'Medicare Consultation',
            quote: 'Navigating Medicare seemed overwhelming until I met the team at Buckalew. They broke down every detail and helped me choose a plan that perfectly fit my needs.',
            image: '/images/testimonial-1.jpg'
        },
        {
            name: 'Maria González',
            age: 42,
            location: 'Miami, FL',
            service: 'Life Insurance Planning',
            quote: "As a working mother, protecting my family's future is paramount. Buckalew Financial Services helped me create a comprehensive life insurance strategy that gives me peace of mind.",
            image: '/images/testimonial-2.jpg'
        },
        {
            name: 'David Kim',
            age: 55,
            location: 'Seattle, WA',
            service: 'Retirement Planning',
            quote: "Their financial advisors are not just number-crunchers, they're true partners. They helped me optimize my retirement strategy and showed me options I never knew existed.",
            image: '/images/testimonial-3.jpg'
        }
    ];
    return (<PageStructure title={metadata.title} description={metadata.description} heroContent={{
            title: 'Client Success Stories',
            subtitle: 'Real stories from satisfied Buckalew Financial Services clients'
        }}>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition group">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-cover bg-center mr-4 group-hover:scale-110 transition" style={{
                backgroundImage: `url(${testimonial.image})`,
                backgroundPosition: 'center'
            }}/>
              <div>
                <h2 className="text-xl font-semibold">{testimonial.name}</h2>
                <p className="text-sm text-gray-600">
                  {testimonial.age} years old, {testimonial.location}
                </p>
              </div>
            </div>
            
            <blockquote className="italic text-gray-600 mb-4">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="text-sm font-medium text-primary">
              Service: {testimonial.service}
            </div>
          </div>))}
      </div>

      <section className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-6">
          Your Story Could Be Next
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          We're committed to helping individuals and families achieve their financial goals. 
          Let us be part of your financial journey.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/contact" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
            Contact Us
          </a>
          <a href="/quote" className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary-light transition">
            Get a Free Quote
          </a>
        </div>
      </section>
    </PageStructure>);
}
