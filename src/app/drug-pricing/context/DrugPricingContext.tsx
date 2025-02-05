'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface PriceData {
  pharmacy: string;
  price: number;
  distance: string;
  availability: string;
  discountAvailable?: boolean;
  savings?: number;
}

interface PriceHistory {
  date: string;
  price: number;
  lowestPrice: number;
  averagePrice: number;
}

interface DrugPricingContextType {
  drugName: string;
  dosage: string;
  priceData: PriceData[];
  priceHistory: PriceHistory[];
  isLoading: boolean;
  error: Error | null;
  searchDrugPrices: (drugName: string, dosage: string, quantity: number) => Promise<void>;
  clearResults: () => void;
}

const DrugPricingContext = createContext<DrugPricingContextType | undefined>(undefined);

export function DrugPricingProvider({ children }: { children: React.ReactNode }) {
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchDrugPrices = useCallback(async (
    drugName: string,
    dosage: string,
    quantity: number
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock price data
      const mockPriceData: PriceData[] = [
        {
          pharmacy: "CVS Pharmacy",
          price: 45.99,
          distance: "0.8 miles",
          availability: "In Stock",
          discountAvailable: true,
          savings: 15.00
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
          availability: "Limited Stock",
          discountAvailable: true,
          savings: 10.00
        }
      ];

      // Mock price history
      const mockPriceHistory: PriceHistory[] = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          price: 45.99 + Math.random() * 10 - 5,
          lowestPrice: 40.99,
          averagePrice: 47.99
        };
      });

      setDrugName(drugName);
      setDosage(dosage);
      setPriceData(mockPriceData);
      setPriceHistory(mockPriceHistory);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch drug prices'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setDrugName('');
    setDosage('');
    setPriceData([]);
    setPriceHistory([]);
    setError(null);
  }, []);

  return (
    <DrugPricingContext.Provider
      value={{
        drugName,
        dosage,
        priceData,
        priceHistory,
        isLoading,
        error,
        searchDrugPrices,
        clearResults
      }}
    >
      {children}
    </DrugPricingContext.Provider>
  );
}

export function useDrugPricing() {
  const context = useContext(DrugPricingContext);
  if (context === undefined) {
    throw new Error('useDrugPricing must be used within a DrugPricingProvider');
  }
  return context;
}