import React from 'react';
import { logMetric } from '@/lib/monitoring';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  React.useEffect(() => {
    logMetric('error_boundary_triggered', 1, {
      errorName: error.name,
      errorMessage: error.message
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h2>
          
          <div className="bg-red-50 rounded-md p-4 mb-6">
            <p className="text-sm text-red-700">{error.message}</p>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <pre className="bg-gray-50 p-4 rounded text-sm text-gray-700 mb-6 overflow-auto">
              {error.stack}
            </pre>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
            <button
              onClick={resetErrorBoundary}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}