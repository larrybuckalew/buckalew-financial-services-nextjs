import React from 'react';

export default function DocumentsPage() {
  const documentTypes = [
    { name: 'Tax Returns', icon: '📄', description: 'Previous year tax documents' },
    { name: 'Investment Statements', icon: '📊', description: 'Quarterly and annual investment reports' },
    { name: 'Insurance Policies', icon: '🛡️', description: 'Current insurance coverage documents' },
    { name: 'Retirement Accounts', icon: '💰', description: '401(k), IRA, and pension documents' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Document Vault</h1>
      
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {documentTypes.map((doc, index) => (
            <div 
              key={index} 
              className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              <div className="text-4xl mr-4">{doc.icon}</div>
              <div>
                <h3 className="font-semibold">{doc.name}</h3>
                <p className="text-gray-600 text-sm">{doc.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Upload New Document
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            🔒 All documents are securely encrypted and stored.
            Your privacy and data security are our top priorities.
          </p>
        </div>
      </div>
    </div>
  );
}