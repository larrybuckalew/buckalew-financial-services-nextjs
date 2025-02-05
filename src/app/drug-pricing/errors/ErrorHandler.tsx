'use client';

import React from 'react';
import Link from 'next/link';
import {
  NetworkError,
  ValidationError,
  APIError,
  RateLimitError,
  PharmacyNotFoundError,
  DrugNotFoundError
} from './ErrorTypes';

interface ErrorHandlerProps {
  error: Error;
  onRetry?: () => void;
  onClear?: () => void;
}

export function ErrorHandler({ error, onRetry, onClear }: ErrorHandlerProps) {
  const getErrorUI = () => {
    switch (error.constructor) {
      case NetworkError:
        return (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-yellow-800 font-bold">Connection Error</h3>
            <p className="text-yellow-700 mt-1">{error.message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200"
              >
                Try Again
              </button>
            )}
          </div>
        );

      case ValidationError:
        return (
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-red-800 font-bold">Invalid Input</h3>
            <p className="text-red-700 mt-1">{error.message}</p>
            {onClear && (
              <button
                onClick={onClear}
                className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
              >
                Clear Form
              </button>
            )}
          </div>
        );

      case RateLimitError:
        const rateLimitError = error as RateLimitError;
        return (
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-orange-800 font-bold">Too Many Requests</h3>
            <p className="text-orange-700 mt-1">
              Please try again in {rateLimitError.retryAfter} seconds.
            </p>
            <div className="mt-3">
              <Link
                href="/contact"
                className="bg-orange-100 text-orange-800 px-4 py-2 rounded hover:bg-orange-200"
              >
                Contact Support
              </Link>
            </div>
          </div>
        );

      case PharmacyNotFoundError:
        return (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-blue-800 font-bold">No Pharmacies Found</h3>
            <p className="text-blue-700 mt-1">
              We couldn't find any pharmacies in your area. Try expanding your search radius.
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200"
              >
                Search Again
              </button>
            )}
          </div>
        );

      case DrugNotFoundError:
        const drugError = error as DrugNotFoundError;
        return (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-purple-800 font-bold">Medication Not Found</h3>
            <p className="text-purple-700 mt-1">{error.message}</p>
            {drugError.suggestions && drugError.suggestions.length > 0 && (
              <div className="mt-3">
                <p className="text-purple-800 font-medium">Did you mean:</p>
                <ul className="mt-2 space-y-1">
                  {drugError.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="text-purple-700 hover:text-purple-900 cursor-pointer"
                      onClick={() => onRetry && onRetry()}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case APIError:
        const apiError = error as APIError;
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-gray-800 font-bold">Service Error</h3>
            <p className="text-gray-700 mt-1">
              {apiError.status === 503 
                ? 'Service temporarily unavailable. Please try again later.'
                : 'An error occurred while processing your request.'}
            </p>
            <div className="mt-3 space-x-4">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Try Again
                </button>
              )}
              <Link
                href="/contact"
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 inline-block"
              >
                Contact Support
              </Link>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-red-800 font-bold">Unexpected Error</h3>
            <p className="text-red-700 mt-1">
              An unexpected error occurred. Please try again or contact support.
            </p>
            <div className="mt-3 space-x-4">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200"
                >
                  Try Again
                </button>
              )}
              <Link
                href="/contact"
                className="bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 inline-block"
              >
                Contact Support
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="my-4">
      {getErrorUI()}
    </div>
  );
}