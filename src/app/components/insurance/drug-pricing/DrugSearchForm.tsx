import React, { useState } from 'react';

interface DrugSearchFormProps {
  onSearch: (drugName: string) => void;
}

const DrugSearchForm: React.FC<DrugSearchFormProps> = ({ onSearch }) => {
  const [drugName, setDrugName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(drugName);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex items-center border-2 border-gray-300 rounded-md">
        <input
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          placeholder="Enter drug name"
          className="w-full p-2 rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default DrugSearchForm;