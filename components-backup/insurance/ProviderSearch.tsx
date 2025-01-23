import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Maps } from 'lucide-react';

interface Provider {
  name: string;
  specialty: string;
  address: string;
  distance: number;
  accepting: boolean;
  insurance: string[];
}

export default function ProviderSearch() {
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [radius, setRadius] = useState(10);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // First, geocode the location
      const geocodeResult = await maps_geocode({
        address: location
      });

      if (!geocodeResult?.results?.[0]?.geometry?.location) {
        throw new Error('Invalid location');
      }

      const { lat, lng } = geocodeResult.results[0].geometry.location;

      // Then search for places (medical facilities)
      const placesResult = await maps_search_places({
        query: `${specialty} doctor medical clinic`,
        location: { latitude: lat, longitude: lng },
        radius: radius * 1000 // Convert to meters
      });

      // Transform the results
      const transformedProviders = placesResult.results.map(place => ({
        name: place.name,
        specialty,
        address: place.formatted_address,
        distance: place.distance || 0,
        accepting: Math.random() > 0.2, // Simulated data
        insurance: ['Blue Cross', 'Aetna', 'United'].filter(() => Math.random() > 0.5)
      }));

      setProviders(transformedProviders);
    } catch (error) {
      console.error('Error searching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Maps className="w-6 h-6" />
          Provider Directory Search
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter ZIP or City"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Specialty</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Specialty</option>
                <option value="Primary Care">Primary Care</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Radius (miles)</label>
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="25">25 miles</option>
                <option value="50">50 miles</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading || !location || !specialty}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search Providers'}
          </button>

          {providers.length > 0 && (
            <div className="mt-6 space-y-4">
              {providers.map((provider, index) => (
                <div key={index} className="border rounded p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{provider.specialty}</p>
                      <p className="text-sm">{provider.address}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {provider.insurance.map((ins, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {ins}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm">{provider.distance.toFixed(1)} miles</span>
                      <p className={`text-sm ${provider.accepting ? 'text-green-600' : 'text-red-600'}`}>
                        {provider.accepting ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}