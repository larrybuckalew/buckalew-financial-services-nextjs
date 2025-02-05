import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DrugPrice {
  pharmacy: string;
  price: number;
  distance: number;
  address: string;
}

export function DrugPricingTool() {
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [quantity, setQuantity] = useState('30');
  const [zipCode, setZipCode] = useState('');
  const [results, setResults] = useState<DrugPrice[]>([]);
  const [loading, setLoading] = useState(false);

  const searchPrices = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/drug-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugName, dosage, quantity, zipCode })
      });
      
      if (!response.ok) throw new Error();
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch drug prices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Prescription Drug Price Search</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Drug Name</label>
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter medication name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dosage</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., 20mg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="30">30 pills</option>
              <option value="60">60 pills</option>
              <option value="90">90 pills</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter ZIP code"
          />
        </div>

        <Button 
          onClick={searchPrices} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Searching...' : 'Search Prices'}
        </Button>
      </div>

      {results.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Results</h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{result.pharmacy}</h4>
                    <p className="text-sm text-gray-600">{result.address}</p>
                    <p className="text-sm text-gray-600">{result.distance} miles away</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${result.price}</p>
                    <Button variant="outline" size="sm">Get Coupon</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}