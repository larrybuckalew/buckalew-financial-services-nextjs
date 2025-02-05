'use client';

import { StandardErrorBoundary } from '@/components/errors/StandardErrorBoundary';
import Link from 'next/link';

interface DrugPricingErrorProps {
  error?: string;
  onRetry?: () => void;
}

const DrugPricingErrorFallback = ({ error, onRetry }: DrugPricingErrorProps) => (
  <div className="min-h-[300px] flex items-center justify-center">
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Unable to Load Drug Pricing
      </h2>
      <p className="text-gray-600 mb-6">
        {error || 'We\'re having trouble loading drug pricing information. Please try again or contact support.'}
      </p>
      <div className="space-y-4">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition block w-full"
          >
            Try Again
          </button>
        )}
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

export function DrugPricingErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <StandardErrorBoundary 
      type="drug-pricing"
      fallback={<DrugPricingErrorFallback />}
    >
      {children}
    </StandardErrorBoundary>
  );
}