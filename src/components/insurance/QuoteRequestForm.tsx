import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Sentry from "@sentry/nextjs";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

import { ErrorHandler } from '@/lib/error-handler';
import { InsuranceQuoteRequest } from '@/pages/api/insurance-quote';

export const QuoteRequestForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteResult, setQuoteResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<InsuranceQuoteRequest>();

  const onSubmit = ErrorHandler.asyncHandler(async (data: InsuranceQuoteRequest) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Start performance tracing
      Sentry.startTransaction({ name: "insurance-quote-request" });

      const response = await fetch('/api/insurance-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Quote request failed');
      }

      const result = await response.json();
      setQuoteResult(result);
      
      // Track successful quote generation
      Sentry.captureMessage('Insurance Quote Generated Successfully', {
        level: 'info',
        extra: {
          coverageRange: result.coverageAmountRange,
          premiumEstimate: result.premium.adjustedPremium
        }
      });
    } catch (error) {
      // Log error to Sentry
      Sentry.captureException(error);
      
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Insurance Quote Request
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="age"
          control={control}
          rules={{ 
            required: 'Age is required', 
            min: { value: 18, message: 'Must be at least 18' },
            max: { value: 75, message: 'Must be under 75' }
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field} 
                type="number" 
                placeholder="Your Age" 
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.age.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="income"
          control={control}
          rules={{ 
            required: 'Annual Income is required', 
            min: { value: 20000, message: 'Income too low' }
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field} 
                type="number" 
                placeholder="Annual Income" 
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {errors.income && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.income.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="dependents"
          control={control}
          rules={{ 
            required: 'Number of dependents is required',
            min: { value: 0, message: 'Cannot be negative' },
            max: { value: 10, message: 'Too many dependents' }
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field} 
                type="number" 
                placeholder="Number of Dependents" 
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {errors.dependents && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dependents.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="insuranceGoals"
          control={control}
          rules={{ required: 'Please select at least one goal' }}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange([value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Insurance Goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="protection">Family Protection</SelectItem>
                <SelectItem value="wealth-building">Wealth Building</SelectItem>
                <SelectItem value="retirement">Retirement Planning</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full"
        >
          {isSubmitting ? 'Generating Quote...' : 'Get Quote'}
        </Button>
      </form>

      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {quoteResult && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Quote Result</h3>
          <p>Recommended Coverage: ${quoteResult.coverageAmountRange.max.toLocaleString()}</p>
          <p>Estimated Premium: ${quoteResult.premium.adjustedPremium.toLocaleString()}/month</p>
        </div>
      )}
    </div>
  );
};
