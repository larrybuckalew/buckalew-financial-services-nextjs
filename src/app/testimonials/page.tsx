import { Metadata } from 'next';
import Image from 'next/image';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Client Testimonials',
  description: 'See what our clients say about Buckalew Financial Services.',
  path: '/testimonials'
});

const testimonials = [
  {
    id: 1,
    name: 'John Wilson',
    role: 'Medicare Client',
    image: '/placeholder.jpg',
    quote: 'The team helped me navigate Medicare options with expertise and patience.',
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    role: 'Life Insurance Client',
    image: '/placeholder.jpg',
    quote: 'Found the perfect life insurance policy for my family\'s needs.',
  },
  {
    id: 3,
    name: 'Robert Chen',
    role: 'Health Insurance Client',
    image: '/placeholder.jpg',
    quote: 'Outstanding service and support throughout the entire process.',
  }
];

export default function TestimonialsPage() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Client Testimonials
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
            Hear from our satisfied clients about their experience with Buckalew Financial Services.
          </p>
        </div>
        <div className="mt-12">
          <div className="space-y-8 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <Image
                          className="rounded-full"
                          src="/images/placeholder.jpg"
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {testimonial.quote}
                    </p>
                    <p className="mt-5 text-sm font-medium text-gray-900">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}