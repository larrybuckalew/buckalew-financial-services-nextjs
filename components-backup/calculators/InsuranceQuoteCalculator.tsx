import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface QuoteFormData {
  age: number;
  coverage: number;
  term: number;
  healthStatus: string;
}

export default function InsuranceQuoteCalculator() {
  const [formData, setFormData] = useState<QuoteFormData>({
    age: 30,
    coverage: 250000,
    term: 20,
    healthStatus: 'excellent'
  });

  const calculateQuote = () => {
    const baseRate = 0.5;
    const ageMultiplier = Math.pow(1.03, formData.age - 30);
    const coverageMultiplier = formData.coverage / 100000;
    const healthMultiplier = {
      excellent: 1,
      good: 1.2,
      fair: 1.5,
      poor: 2
    }[formData.healthStatus];

    const monthlyPremium = baseRate * ageMultiplier * coverageMultiplier * healthMultiplier;
    return monthlyPremium.toFixed(2);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Insurance Quote Calculator</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Coverage Amount</label>
            <input
              type="number"
              value={formData.coverage}
              onChange={(e) => setFormData({ ...formData, coverage: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
              step="10000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Term (Years)</label>
            <select
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: parseInt(e.target.value) })}
              className="w-full p-2 border rounded"
            >
              <option value="10">10 Years</option>
              <option value="20">20 Years</option>
              <option value="30">30 Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Health Status</label>
            <select
              value={formData.healthStatus}
              onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold mb-2">Estimated Monthly Premium</h3>
            <p className="text-3xl font-bold text-blue-600">${calculateQuote()}</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}