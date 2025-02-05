'use client';

import React from 'react';

interface ExportButtonProps {
  data: any[];
  filename: string;
  type: 'csv' | 'pdf';
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data, filename, type }) => {
  const exportToCSV = () => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',')
            ? `"${value}"`
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToPDF = () => {
    // This would require adding a PDF library like jsPDF
    // For now, we'll show an alert
    alert('PDF export feature coming soon!');
  };

  const handleExport = () => {
    if (type === 'csv') {
      exportToCSV();
    } else if (type === 'pdf') {
      exportToPDF();
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Export {type.toUpperCase()}
    </button>
  );
};