'use client';

import React, { useState } from 'react';

interface FileUploadInputProps {
  quoteId: string;
  onUploadSuccess?: (filePath: string) => void;
  onUploadError?: (error: string) => void;
}

export function FileUploadInput({ quoteId, onUploadSuccess, onUploadError }: FileUploadInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setMessage('');
      setError('');
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setMessage('Uploading...');
    setError('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`/api/quotes/${quoteId}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('File uploaded successfully!');
        setSelectedFile(null); // Clear selected file after successful upload
        if (onUploadSuccess) {
          onUploadSuccess(data.filePath);
        }
      } else {
        setError(data.message || 'File upload failed.');
        if (onUploadError) {
          onUploadError(data.message || 'File upload failed.');
        }
      }
    } catch (err: any) {
      setError('Network error or server unreachable.');
      if (onUploadError) {
        onUploadError('Network error or server unreachable.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-3">Upload Document for Quote {quoteId}</h3>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        disabled={uploading}
      />
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-600">Selected file: {selectedFile.name}</p>
      )}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
