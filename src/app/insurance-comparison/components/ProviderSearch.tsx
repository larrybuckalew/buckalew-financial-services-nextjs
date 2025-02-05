'use client';

import { useState } from 'react';
import { InsurancePlan } from '../services/recommendationEngine';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  address: string;
  distance: string;
  rating: number;
  acceptingNewPatients: boolean;
  nextAvailable: string;
}

interface ProviderSearchProps {
  plan: InsurancePlan;
}

export function ProviderSearch({ plan }: ProviderSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [radius, setRadius] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Provider[]>([]);

  const specialties = [
    'Primary Care',
    'Cardiology',
    'Dermatology',
    'Orthopedics',
    'Pediatrics',
    'Mental Health',
    'OB/GYN'
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock results
    const mockResults: Provider[] = [
      {
        id: '1',
        name: 'Dr. Sarah Smith',
        specialty: 'Primary Care',
        address: '123 Medical Dr, City, ST 12345',
        distance: '0.8 miles',
        rating: 4.8,
        acceptingNewPatients: true,
        nextAvailable: '3 days'
      },
      {
        id: '2',
        name: 'Dr. John Doe',
        specialty: 'Primary Care',
        address: '456 Health Ave, City, ST 12345',
        distance: '1.2 miles',
        rating: 4.5,
        acceptingNewPatients: true,
        nextAvailable: '1 week'
      },
      {
        id: '3',
        name: 'City Medical Group',
        specialty: 'Primary Care',
        address: '789 Healthcare Blvd, City, ST 12345',
        distance: '2.1 miles',
        rating: 4.2,
        acceptingNewPatients: true,
        nextAvailable: '2 days'
      }
    ];

    setResults(mockResults);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Search Form */}
      <div className="p-6 border-b">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Find In-Network Providers
        </h3>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider Name or Medical Group
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Enter name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Any Specialty</option>
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Radius
              </label>
              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full px-6 py-2 rounded-lg transition
                  ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-dark'}
                `}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search Providers'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="p-6">
          <div className="space-y-6">
            {results.map((provider) => (
              <div
                key={provider.id}
                className="flex justify-between items-start border-b pb-6 last:border-b-0 last:pb-0"
              >
                <div>
                  <h4 className="font-bold text-gray-900">{provider.name}</h4>
                  <p className="text-gray-600">{provider.specialty}</p>
                  <p className="text-sm text-gray-500 mt-1">{provider.address}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-500 mr-4">
                      {provider.distance}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm text-gray-600">{provider.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    {provider.acceptingNewPatients ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Accepting New Patients
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Not Accepting New Patients
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    Next Available
                  </div>
                  <div className="font-medium text-primary">
                    {provider.nextAvailable}
                  </div>
                  <button className="mt-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                    Request Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No providers found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
}