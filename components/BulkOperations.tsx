import { useState } from 'react';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface BulkOperationsProps {
  selectedItems: string[];
  onBulkDelete: (ids: string[]) => Promise<void>;
  onExportCSV: () => Promise<void>;
  type: 'users' | 'posts';
}

export function BulkOperations({ selectedItems, onBulkDelete, onExportCSV, type }: BulkOperationsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkDelete = async () => {
    if (!selectedItems.length) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} ${type}?`)) {
      return;
    }

    setIsLoading(true);
    try {
      await onBulkDelete(selectedItems);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setIsLoading(true);
    try {
      await onExportCSV();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <span className="text-sm text-gray-600">
        {selectedItems.length} {type} selected
      </span>
      
      <button
        onClick={handleBulkDelete}
        disabled={!selectedItems.length || isLoading}
        className={`px-4 py-2 rounded-md text-white ${
          selectedItems.length && !isLoading
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {isLoading ? <LoadingSpinner /> : `Delete Selected ${type}`}
      </button>

      <button
        onClick={handleExportCSV}
        disabled={isLoading}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? <LoadingSpinner /> : 'Export to CSV'}
      </button>
    </div>
  );
}