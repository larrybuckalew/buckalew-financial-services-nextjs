'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/loading';
import { motion } from 'framer-motion';

interface FormData {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
}

export default function RetirementCalculator() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 0,
    monthlyContribution: 0,
    annualReturn: 7
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const calculateRetirement = async () => {
    setIsCalculating(true);
    
    const years = formData.retirementAge - formData.currentAge;
    const monthlyRate = formData.annualReturn / 100 / 12;
    const months = years * 12;
    
    const futureValueSavings = formData.currentSavings * Math.pow(1 + (formData.annualReturn / 100), years);
    const futureValueContributions = formData.monthlyContribution * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);

    const finalResult = futureValueSavings + futureValueContributions;
    setResult(finalResult);

    // Save calculation if user is logged in
    if (session?.user) {
      try {
        await fetch('/api/calculations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'retirement',
            inputs: formData,
            result: finalResult,
          }),
        });
      } catch (error) {
        console.error('Failed to save calculation:', error);
      }
    }

    setIsCalculating(false);
  };

  return (
    <Form onSubmit={(e) => { e.preventDefault(); calculateRetirement(); }}>
      {/* Form fields remain the same */}
      
      {!session && (
        <p className="text-sm text-gray-500">
          Sign in to save your calculation history
        </p>
      )}
    </Form>
  );
}