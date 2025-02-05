'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: string | File | Uint8Array;
  initialPage?: number;
  onDocumentLoadSuccess?: (pdf: any) => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({
  file, 
  initialPage = 1,
  onDocumentLoadSuccess
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(initialPage);

  function onDocumentLoad(pdf: any) {
    setNumPages(pdf.numPages);
    if (onDocumentLoadSuccess) {
      onDocumentLoadSuccess(pdf);
    }
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="pdf-viewer-container">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoad}
        className="pdf-document"
      >
        <Page 
          pageNumber={pageNumber} 
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>
      
      <div className="pdf-navigation">
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <div className="pdf-controls">
          <button 
            type="button" 
            disabled={pageNumber <= 1} 
            onClick={previousPage}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <button 
            type="button" 
            disabled={pageNumber >= (numPages || 1)} 
            onClick={nextPage}
            className="btn btn-secondary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};