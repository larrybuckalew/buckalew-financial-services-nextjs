import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Pills } from 'lucide-react';

interface Drug {
  name: string;
  tier: number;
  category: string;
  priorAuth: boolean;
  quantity: string;
  alternatives: string[];
}

export default function DrugFormularySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [planType, setPlanType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Drug[]>([]);

  const searchDrugs = async () => {
    setLoading(true);
    try {
      // Use KV store to cache drug formulary data
      const kvId = process.env.KV_NAMESPACE_ID;
      if (!kvId) throw new Error('KV namespace not configured');

      let formularyData = await kv_get({
        namespaceId: kvId,
        key: `drug_formulary_${planType}`
      });

      if (!formularyData) {
        // Simulate API call to fetch drug data
        const mockData = generateMockDrugData();
        await kv_put({
          namespaceId: kvId,
          key: `drug_formulary_${planType}`,
          value: JSON.stringify(mockData),
          expirationTtl: 86400 // 24 hours
        });
        formularyData = JSON.stringify(mockData);
      }

      const drugs = JSON.parse(formularyData);
      const filtered = drugs.filter((drug: Drug) =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setResults(filtered);
    } catch (error) {
      console.error('Error searching drug formulary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const timer = setTimeout(searchDrugs, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [searchTerm, planType]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Pills className="w-6 h-6" />
          Drug Formulary Search
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Drug Name</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter drug name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Plan Type</label>
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="all">All Plans</option>
                <option value="hmo">HMO Plans</option>
                <option value="ppo">PPO Plans</option>
                <option value="medicare">Medicare Plans</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="text-center py-4">
              <span className="text-gray-600">Searching formulary...</span>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              {results.map((drug, index) => (
                <div key={index} className="border rounded p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{drug.name}</h3>
                      <p className="text-sm text-gray-600">{drug.category}</p>
                      <p className="text-sm">Quantity Limit: {drug.quantity}</p>
                      {drug.alternatives.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Generic Alternatives:</p>
                          <ul className="text-sm text-gray-600">
                            {drug.alternatives.map((alt, i) => (
                              <li key={i}>{alt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 rounded text-sm font-medium
                        ${drug.tier === 1 ? 'bg-green-100 text-green-800' :
                          drug.tier === 2 ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}">
                        Tier {drug.tier}
                      </span>
                      {drug.priorAuth && (
                        <p className="text-sm text-orange-600 mt-1">
                          Prior Authorization Required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchTerm.length >= 3 && results.length === 0 && !loading && (
            <div className="text-center py-4">
              <p className="text-gray-600">No drugs found matching your search criteria.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function generateMockDrugData(): Drug[] {
  return [
    {
      name: 'Metformin',
      tier: 1,
      category: 'Diabetes',
      priorAuth: false,
      quantity: '60 tablets/30 days',
      alternatives: []
    },
    {
      name: 'Lipitor',
      tier: 2,
      category: 'Cholesterol',
      priorAuth: false,
      quantity: '30 tablets/30 days',
      alternatives: ['Atorvastatin']
    },
    // Add more mock data as needed
  ];
}