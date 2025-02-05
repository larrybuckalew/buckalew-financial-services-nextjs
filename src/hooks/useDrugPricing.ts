'use client';

import { useState } from 'react';

interface DrugPrice {
  pharmacy: string;
  price: number;
  distance: string;
  availability: string;
}

interface DrugPricingData {
  drugName: string;
  dosage: string;
  prices: DrugPrice[];
}

export function useDrugPricing() {
  const [data, setData] = useState<DrugPricingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchDrugPrices = async (drugName: string, dosage: string, quantity: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would be your actual API call
      // const response = await fetch(`/api/drug-prices?drug=${drugName}&dosage=${dosage}&quantity=${quantity}`);
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockData: DrugPricingData = {
        drugName,
        dosage,
        prices: [
          {
            pharmacy: "CVS Pharmacy",
            price: 45.99,
            distance: "0.8 miles",
            availability: "In Stock"
          },
          {
            pharmacy: "Walgreens",
            price: 48.99,
            distance: "1.2 miles",
            availability: "In Stock"
          },
          {
            pharmacy: "Rite Aid",
            price: 42.99,
            distance: "2.5 miles",
            availability: "Limited Stock"
          }
        ]
      };

      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch drug prices'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    searchDrugPrices
  };
}