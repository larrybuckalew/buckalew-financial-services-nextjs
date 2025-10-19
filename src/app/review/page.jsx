import { generatePageMetadata } from '@/lib/seo';
export const metadata = generatePageMetadata({
    title: 'Customer Reviews',
    description: 'See what our clients say about Buckalew Financial Services',
    keywords: ['reviews', 'testimonials', 'customer feedback'],
    path: '/review'
});
export default function ReviewPage() {
    const reviews = [
        {
            name: 'Sarah Johnson',
            rating: 5,
            text: 'Buckalew Financial Services helped me find the perfect Medicare plan. Highly recommended!',
            service: 'Medicare'
        },
        {
            name: 'Michael Rodriguez',
            rating: 4,
            text: 'Great life insurance options and professional advice. They truly care about their clients.',
            service: 'Life Insurance'
        },
        {
            name: 'Emily Chen',
            rating: 5,
            text: 'Comprehensive health insurance guidance. They made a complex process simple.',
            service: 'Health Insurance'
        }
    ];
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (<span key={index} className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>));
    };
    return (<div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">
        Customer Reviews
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {reviews.map((review, index) => (<div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{review.name}</h2>
              <div className="flex">
                {renderStars(review.rating)}
              </div>
            </div>
            <p className="text-gray-600 mb-2">{review.text}</p>
            <div className="text-sm text-primary font-medium">
              Service: {review.service}
            </div>
          </div>))}
      </div>

      <section className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Share Your Experience
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          We value your feedback. If you've worked with Buckalew Financial Services, 
          we'd love to hear about your experience.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
          Write a Review
        </button>
      </section>
    </div>);
}
