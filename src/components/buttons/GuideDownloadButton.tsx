'use client';

import React, { useState } from 'react';
import { trackDownload } from '@/utils/analytics';
import PreviewModal from '../modals/PreviewModal';

interface GuideDownloadButtonProps {
  guide: {
    title: string;
    filename: string;
    description: string;
  };
  showPreview?: boolean;
}

const GuideDownloadButton: React.FC<GuideDownloadButtonProps> = ({ guide, showPreview = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    trackDownload({
      guide_name: guide.title,
      file_name: guide.filename,
      source_page: window.location.pathname
    });
    
    // Create download link with correct filename
    const link = document.createElement('a');
    link.href = `/guides/${guide.filename}.pdf`;
    link.download = guide.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex space-x-2">
      {showPreview && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          Preview Guide
        </button>
      )}
      
      <button
        onClick={handleDownload}
        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
      >
        <span>Download PDF</span>
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>

      {showPreview && (
        <PreviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guide={guide}
        />
      )}
    </div>
  );
};

export default GuideDownloadButton;