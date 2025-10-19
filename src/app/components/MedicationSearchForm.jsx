'use client';
import { useState } from 'react';
export default function MedicationSearchForm() {
    const [medication, setMedication] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!medication)
            return;
        setLoading(true);
        try {
            const mockResults = [
                {
                    name: medication,
                    genericName: 'Generic ' + medication,
                    averagePrice: '$' + (Math.random() * 100).toFixed(2),
                    pharmacies: ['CVS', 'Walgreens', 'Rite Aid']
                }
            ];
            setResults(mockResults);
        }
        catch (error) {
            console.error('Search error:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="bg-brand-green-lighter/20 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-brand-blue mb-4">Medication Price Lookup</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex">
          <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} placeholder="Enter medication name" className="flex-grow p-2 border border-brand-blue rounded-l-lg"/>
          <button type="submit" disabled={loading} className="bg-brand-blue text-white px-4 py-2 rounded-r-lg hover:bg-brand-blue/90 transition-colors">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {results.length > 0 && (<div className="mt-4">
          <h3 className="text-xl font-semibold text-brand-blue mb-2">Search Results</h3>
          {results.map((result, index) => (<div key={index} className="bg-white p-4 rounded-lg shadow-md mb-2">
              <h4 className="font-bold text-brand-blue">{result.name}</h4>
              <p className="text-brand-green-dark">Generic: {result.genericName}</p>
              <p>Average Price: {result.averagePrice}</p>
              <p>Available at: {result.pharmacies.join(', ')}</p>
            </div>))}
        </div>)}
    </div>);
}
