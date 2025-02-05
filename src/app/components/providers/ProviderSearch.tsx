import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  location: string;
  phone: string;
  network: string[];
}

export const ProviderSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Simulate API call to fetch providers
      const mockProviders: Provider[] = [
        {
          id: '1',
          name: 'Dr. Jane Smith',
          specialty: 'Family Medicine',
          location: 'Downtown Health Clinic',
          phone: '(555) 123-4567',
          network: ['Aetna', 'Blue Cross']
        },
        {
          id: '2',
          name: 'Dr. John Doe',
          specialty: 'Cardiology',
          location: 'Heart Center',
          phone: '(555) 987-6543',
          network: ['UnitedHealthcare', 'Cigna']
        }
      ];

      // Filter providers based on search term
      const filteredProviders = mockProviders.filter(provider => 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.location.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setProviders(filteredProviders);
    } catch (error) {
      console.error('Provider search error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="provider-search space-y-4">
      <div className="flex space-x-2">
        <Input 
          placeholder="Search providers by name, specialty, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search Providers'}
        </Button>
      </div>
      
      {providers.length > 0 && (
        <div className="provider-results">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {providers.map(provider => (
              <div 
                key={provider.id} 
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <p>Specialty: {provider.specialty}</p>
                <p>Location: {provider.location}</p>
                <p>Phone: {provider.phone}</p>
                <div className="mt-2">
                  <span className="text-sm font-medium">Networks:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {provider.network.map(net => (
                      <span 
                        key={net} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {net}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
