'use client';

import { StandardErrorBoundary } from '@/components/errors/StandardErrorBoundary';
import Link from 'next/link';

const MedicareErrorFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Unable to Load Medicare Information
      </h2>
      <p className="text-gray-600 mb-6">
        We're having trouble loading the Medicare information. 
        You can try again or contact our support team for assistance.
      </p>
      <div className="space-y-4">
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition block w-full"
        >
          Try Again
        </button>
        <Link 
          href="/contact"
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition block w-full"
        >
          Contact Support
        </Link>
      </div>
    </div>
  </div>
);

export default function MedicareError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <StandardErrorBoundary 
      type="medicare"
      fallback={<MedicareErrorFallback />}
    >
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            {error.message || 'An error occurred while loading Medicare information.'}
          </p>
          <div className="space-y-4">
            <button
              onClick={reset}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition block w-full"
            >
              Try Again
            </button>
            <Link 
              href="/"
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition block w-full text-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </StandardErrorBoundary>
  );
}