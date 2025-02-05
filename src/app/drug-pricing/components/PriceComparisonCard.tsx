'use client';

import { useEffect, useState } from 'react';

interface PriceComparison {
  pharmacy: string;
  price: number;
  distance: string;
  availability: string;
  discountAvailable?: boolean;
  savings?: number;
}

interface PriceComparisonCardProps {
  comparison: PriceComparison;
  isLowest?: boolean;
}

export function PriceComparisonCard({ comparison, isLowest }: PriceComparisonCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        ${isLowest ? 'border-l-4 border-green-500' : ''}
        bg-white rounded-lg shadow-md hover:shadow-lg p-6
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{comparison.pharmacy}</h3>
          <p className="text-sm text-gray-500">{comparison.distance}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            ${comparison.price.toFixed(2)}
          </p>
          {comparison.savings && (
            <p className="text-sm text-green-600">
              Save ${comparison.savings.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span 
          className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${comparison.availability === 'In Stock' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'}
          `}
        >
          {comparison.availability}
        </span>

        {comparison.discountAvailable && (
          <span className="text-sm text-blue-600">
            Discount Available
          </span>
        )}
      </div>

      {isLowest && (
        <div className="mt-4 bg-green-50 text-green-700 text-sm py-2 px-3 rounded">
          Lowest Price Available
        </div>
      )}
    </div>
  );
}