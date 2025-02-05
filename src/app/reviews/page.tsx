import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Client Reviews & Testimonials',
  description: 'Read what our clients say about their experience with Buckalew Financial Services.',
  path: '/reviews'
});

export default function Reviews() {
  const reviews = [
    {
      name: 'John D.',
      rating: 5,
      review: 'Excellent service and guidance through the Medicare enrollment process.',
      date: '2024-01-15'
    },
    {
      name: 'Sarah M.',
      rating: 5,
      review: 'Found the perfect family health insurance plan within our budget.',
      date: '2024-01-10'
    },
    {
      name: 'Robert W.',
      rating: 5,
      review: 'Professional and knowledgeable team. Highly recommend!',
      date: '2024-01-05'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Client Reviews</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold">{review.name}</h2>
              <div className="ml-4 text-yellow-400">
                {'★'.repeat(review.rating)}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{review.review}</p>
            <time className="text-sm text-gray-500">{review.date}</time>
          </div>
        ))}
      </div>
    </div>
  );
}