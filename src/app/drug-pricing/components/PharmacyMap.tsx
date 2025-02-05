'use client';

import { useEffect, useState } from 'react';

interface PharmacyLocation {
  name: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  availability: string;
}

interface PharmacyMapProps {
  pharmacies: PharmacyLocation[];
  onPharmacySelect?: (pharmacy: PharmacyLocation) => void;
}

export function PharmacyMap({ pharmacies, onPharmacySelect }: PharmacyMapProps) {
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyLocation | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handlePharmacyClick = (pharmacy: PharmacyLocation) => {
    setSelectedPharmacy(pharmacy);
    if (onPharmacySelect) {
      onPharmacySelect(pharmacy);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-bold text-gray-900">Nearby Pharmacies</h3>
      </div>
      
      <div className="relative h-96">
        {/* Map placeholder - Would be replaced with actual map implementation */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Map View Coming Soon</p>
        </div>
        
        {/* Pharmacy List */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white border-l overflow-y-auto">
          {pharmacies.map((pharmacy, index) => (
            <button
              key={index}
              onClick={() => handlePharmacyClick(pharmacy)}
              className={`
                w-full text-left p-4 border-b transition-colors
                ${selectedPharmacy === pharmacy ? 'bg-blue-50' : 'hover:bg-gray-50'}
              `}
            >
              <h4 className="font-bold text-gray-900">{pharmacy.name}</h4>
              <p className="text-sm text-gray-600">{pharmacy.address}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold text-primary">
                  ${pharmacy.price.toFixed(2)}
                </span>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${pharmacy.availability === 'In Stock' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}
                `}>
                  {pharmacy.availability}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-sm text-gray-600">
          * Prices and availability may vary. Please call pharmacy to confirm.
        </p>
      </div>
    </div>
  );
}