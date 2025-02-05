'use client';

import { useState, useEffect } from 'react';

interface MedicareOption {
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface Resource {
  title: string;
  description: string;
  link: string;
}

interface MedicareData {
  options: MedicareOption[];
  resources: Resource[];
}

export function useMedicareData() {
  const [data, setData] = useState<MedicareData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // This would be your actual API call
        // const response = await fetch('/api/medicare');
        // const data = await response.json();
        
        const mockData: MedicareData = {
          options: [
            {
              title: 'Medicare Advantage',
              description: 'Comprehensive coverage that combines Part A and Part B benefits',
              icon: '🏥',
              link: '/medicare/advantage'
            },
            // ... other options
          ],
          resources: [
            {
              title: 'Enrollment Periods',
              description: 'Learn when you can enroll in Medicare coverage',
              link: '/medicare/enrollment'
            },
            // ... other resources
          ]
        };

        setData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}