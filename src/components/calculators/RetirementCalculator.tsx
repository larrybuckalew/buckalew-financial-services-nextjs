'use client';

import { useState } from 'react';
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

interface FormErrors {
  [key: string]: string;
}

export default function RetirementCalculator() {
  const [formData, setFormData] = useState<FormData>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 0,
    monthlyContribution: 0,
    annualReturn: 7
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (formData.currentAge >= formData.retirementAge) {
      newErrors.retirementAge = 'Retirement age must be greater than current age';
    }
    if (formData.annualReturn < 0 || formData.annualReturn > 20) {
      newErrors.annualReturn = 'Expected return should be between 0% and 20%';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateRetirement = async () => {
    if (!validateForm()) return;

    setIsCalculating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const years = formData.retirementAge - formData.currentAge;
    const monthlyRate = formData.annualReturn / 100 / 12;
    const months = years * 12;
    
    const futureValueSavings = formData.currentSavings * Math.pow(1 + (formData.annualReturn / 100), years);
    const futureValueContributions = formData.monthlyContribution * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);

    setResult(futureValueSavings + futureValueContributions);
    setIsCalculating(false);
  };

  return (
    <Form onSubmit={(e) => { e.preventDefault(); calculateRetirement(); }}>
      <FormField
        label="Current Age"
        error={errors.currentAge}
      >
        <Input
          type="number"
          value={formData.currentAge}
          onChange={(e) => setFormData({ ...formData, currentAge: Number(e.target.value) })}
        />
      </FormField>

      <FormField
        label="Retirement Age"
        error={errors.retirementAge}
      >
        <Input
          type="number"
          value={formData.retirementAge}
          onChange={(e) => setFormData({ ...formData, retirementAge: Number(e.target.value) })}
        />
      </FormField>

      {/* Other form fields... */}

      <Button 
        type="submit" 
        className="w-full"
        disabled={isCalculating}
      >
        {isCalculating ? <LoadingSpinner /> : 'Calculate'}
      </Button>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-blue-50 rounded-md"
        >
          <h3 className="text-lg font-semibold">Estimated Retirement Savings</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </motion.div>
      )}
    </Form>
  );
}