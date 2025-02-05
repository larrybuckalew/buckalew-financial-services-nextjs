import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search } from 'lucide-react';

interface DrugPrice {
  pharmacy: string;
  price: number;
  distance: string;
  address: string;
  savings: number;
}

const DrugPriceComparison = () => {
  const [drugName, setDrugName] = useState('');
  const [dosage, setDosage] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DrugPrice[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/drug-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drugName,
          dosage,
          zipCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch drug prices');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Error fetching drug prices. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Prescription Drug Price Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Drug Name"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                className="w-full"
                data-testid="drug-name-input"
              />
              <Input
                placeholder="Dosage (e.g., 10mg)"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full"
                data-testid="dosage-input"
              />
              <Input
                placeholder="ZIP Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full"
                type="number"
                data-testid="zip-code-input"
              />
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={loading || !drugName || !dosage || !zipCode}
              className="w-full md:w-auto"
              data-testid="search-button"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin mr-2">⭮</div> Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="w-4 h-4 mr-2" /> Compare Prices
                </span>
              )}
            </Button>

            {error && (
              <Alert variant="destructive" data-testid="error-alert">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results.length > 0 && (
              <div className="mt-6" data-testid="price-results">
                <h3 className="text-lg font-semibold mb-4">Price Comparison Results</h3>
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <Card key={index} data-testid="pharmacy-card">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{result.pharmacy}</h4>
                            <p className="text-sm text-gray-600">{result.address}</p>
                            <p className="text-sm text-gray-600">{result.distance} miles away</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">${result.price.toFixed(2)}</p>
                            <p className="text-sm text-green-600">Save ${result.savings.toFixed(2)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrugPriceComparison;