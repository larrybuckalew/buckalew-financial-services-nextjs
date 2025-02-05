import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function QuoteCalculator() {
  const [formData, setFormData] = useState({
    age: '',
    zipCode: '',
    tobacco: 'no',
    coverage: '100000'
  });

  const [quote, setQuote] = useState<number | null>(null);

  const calculateQuote = () => {
    const baseRate = 20;
    const age = parseInt(formData.age);
    const coverage = parseInt(formData.coverage);
    
    let rate = baseRate;
    rate += age > 50 ? (age - 50) * 2 : 0;
    rate *= formData.tobacco === 'yes' ? 1.5 : 1;
    rate *= coverage / 100000;

    setQuote(Math.round(rate));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Insurance Quote Calculator</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tobacco Use</label>
          <select
            value={formData.tobacco}
            onChange={(e) => setFormData({...formData, tobacco: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Coverage Amount</label>
          <select
            value={formData.coverage}
            onChange={(e) => setFormData({...formData, coverage: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="100000">$100,000</option>
            <option value="250000">$250,000</option>
            <option value="500000">$500,000</option>
            <option value="1000000">$1,000,000</option>
          </select>
        </div>

        <Button onClick={calculateQuote} className="w-full">
          Calculate Quote
        </Button>

        {quote !== null && (
          <div className="mt-4 p-4 bg-blue-50 rounded text-center">
            <p className="text-lg font-semibold">
              Estimated Monthly Premium
            </p>
            <p className="text-3xl font-bold text-blue-600">
              ${quote}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This is an estimate. Final rates may vary.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}