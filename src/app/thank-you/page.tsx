import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-5xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Thank You for Reaching Out!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            We've received your information and will be in touch shortly. One of our 
            insurance specialists will contact you within 24 business hours.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">What's Next?</h2>
            <ul className="text-left space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                Our team will review your information
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                We'll research the best options for your needs
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">✓</span>
                We'll contact you to schedule your personalized consultation
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              While you wait, feel free to explore our educational resources:
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/blog"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Read Our Blog
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href="/resources"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Insurance Resources
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                href="/calculators"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Insurance Calculators
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-gray-600 mb-4">
              Have an immediate question?
            </p>
            <div className="flex justify-center space-x-6">
              <div>
                <p className="font-semibold text-primary">Call Us</p>
                <p>(844) 779-7600</p>
              </div>
              <div>
                <p className="font-semibold text-primary">Email Us</p>
                <p>larry@buckalewfinancialservices.com</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link 
              href="/"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}