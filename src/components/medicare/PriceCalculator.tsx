import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PriceCalculator() {
  const [priceCalculator, setPriceCalculator] = useState({
    age: '',
    income: '',
    estimatedPremium: null as number | null
  });

  const calculatePremium = () => {
    const baseRate = 150;
    const age = Number(priceCalculator.age);
    const income = Number(priceCalculator.income);

    let premium = baseRate;
    if (age > 70) premium += (age - 70) * 5;
    if (income < 20000) premium -= 50;

    setPriceCalculator(prev => ({
      ...prev,
      estimatedPremium: Math.max(premium, 0)
    }));
  };

  return (
    <section className="mb-12 bg-green-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Premium Calculator</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Input 
          type="number" 
          placeholder="Your Age"
          value={priceCalculator.age}
          onChange={(e) => setPriceCalculator(prev => ({
            ...prev, 
            age: e.target.value
          }))}
        />
        <Input 
          type="number" 
          placeholder="Annual Income"
          value={priceCalculator.income}
          onChange={(e) => setPriceCalculator(prev => ({
            ...prev, 
            income: e.target.value
          }))}
        />
        <Button onClick={calculatePremium}>
          Calculate Premium
        </Button>
      </div>
      {priceCalculator.estimatedPremium !== null && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">
            Estimated Monthly Premium: ${priceCalculator.estimatedPremium.toFixed(2)}
          </p>
        </div>
      )}
    </section>
  );
}