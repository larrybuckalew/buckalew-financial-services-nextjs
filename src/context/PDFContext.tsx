'use client';

import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode 
} from 'react';

export interface PDFDocument {
  id: string;
  title: string;
  url: string;
  category: 'insurance' | 'guide' | 'policy';
  tags?: string[];
}

interface PDFContextType {
  documents: PDFDocument[];
  addDocument: (document: PDFDocument) => void;
  removeDocument: (id: string) => void;
  findDocument: (id: string) => PDFDocument | undefined;
}

const PDFContext = createContext<PDFContextType>({
  documents: [],
  addDocument: () => {},
  removeDocument: () => {},
  findDocument: () => undefined
});

export const PDFProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);

  const addDocument = (document: PDFDocument) => {
    setDocuments(prev => {
      // Prevent duplicates
      if (prev.some(doc => doc.id === document.id)) return prev;
      return [...prev, document];
    });
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const findDocument = (id: string) => {
    return documents.find(doc => doc.id === id);
  };

  return (
    <PDFContext.Provider value={{ 
      documents, 
      addDocument, 
      removeDocument, 
      findDocument 
    }}>
      {children}
    </PDFContext.Provider>
  );
};

export const usePDFContext = () => {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error('usePDFContext must be used within a PDFProvider');
  }
  return context;
};