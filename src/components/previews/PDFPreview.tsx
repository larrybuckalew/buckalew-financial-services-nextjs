'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
              disabled={pageNumber <= 1}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
              disabled={pageNumber >= numPages}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
            >
              -
            </button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
              className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-auto max-h-[800px] flex justify-center bg-gray-100 dark:bg-gray-900">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
          error={
            <div className="text-red-500 p-8">
              Error loading PDF. Please try again later.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <a
          href={pdfUrl}
          download
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => {
            // Track download
            if (window.gtag) {
              window.gtag('event', 'download_guide', {
                guide_name: title,
                file_name: pdfUrl.split('/').pop()
              });
            }
          }}
        >
          Download PDF
        </a>
        <span className="text-sm text-gray-500">
          Click to zoom or drag to pan
        </span>
      </div>
    </div>
  );
};

export default PDFPreview;