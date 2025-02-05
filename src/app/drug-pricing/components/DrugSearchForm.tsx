'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface DrugSearchFormProps {
  onSearch: (drugName: string, dosage: string, quantity: number) => Promise<void>;
  isLoading?: boolean;
}

interface Suggestion {
  name: string;
  commonDosages: string[];
}

export function DrugSearchForm({ onSearch, isLoading }: DrugSearchFormProps) {
  const [formData, setFormData] = useState({
    drugName: '',
    dosage: '',
    quantity: '30'
  });
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedDrugName = useDebounce(formData.drugName, 300);

  useEffect(() => {
    async function fetchSuggestions() {
      if (debouncedDrugName.length < 2) {
        setSuggestions([]);
        return;
      }

      // Mock API call - replace with actual API
      const mockSuggestions: Suggestion[] = [
        {
          name: `${debouncedDrugName} Generic`,
          commonDosages: ['10mg', '20mg', '40mg']
        },
        {
          name: `${debouncedDrugName} Brand`,
          commonDosages: ['25mg', '50mg', '100mg']
        }
      ];

      setSuggestions(mockSuggestions);
    }

    fetchSuggestions();
  }, [debouncedDrugName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    onSearch(formData.drugName, formData.dosage, quantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'drugName') {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setFormData(prev => ({
      ...prev,
      drugName: suggestion.name
    }));
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {/* Drug Name Input with Suggestions */}
      <div className="relative">
        <label htmlFor="drugName" className="block mb-2 text-gray-700">
          Medication Name
        </label>
        <input
          type="text"
          id="drugName"
          name="drugName"
          value={formData.drugName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Enter medication name"
          autoComplete="off"
          required
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                <span className="block text-gray-900">{suggestion.name}</span>
                <span className="text-sm text-gray-500">
                  Common dosages: {suggestion.commonDosages.join(', ')}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dosage Input */}
      <div>
        <label htmlFor="dosage" className="block mb-2 text-gray-700">
          Dosage
        </label>
        <input
          type="text"
          id="dosage"
          name="dosage"
          value={formData.dosage}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="e.g., 10mg"
          required
        />
      </div>

      {/* Quantity Input */}
      <div>
        <label htmlFor="quantity" className="block mb-2 text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
          placeholder="Number of pills/units"
          min="1"
          required
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-3 rounded-lg text-white transition
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-primary hover:bg-primary-dark'}
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
        ) : 'Compare Prices'}
      </button>
    </form>
  );
}