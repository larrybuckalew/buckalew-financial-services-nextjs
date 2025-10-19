'use client';

import { useState, useEffect } from 'react';
import { Eye, Phone, Mail, Calendar, Filter, Download } from 'lucide-react';
import { FileUploadInput } from '@/components/quotes/FileUploadInput';

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  insuranceType: string;
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  tobacco?: string;
  healthConditions?: string;
  coverageAmount?: string;
  currentCoverage?: string;
  additionalNotes?: string;
  submittedAt: string;
}

export default function QuoteManagement() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, [filter]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('type', filter);
      }
      
      const response = await fetch(`/api/quotes?${params}`);
      if (!response.ok) throw new Error('Failed to fetch quotes');
      
      const data = await response.json();
      setQuotes(data.quotes || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatInsuranceType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
  };

  const getPriorityColor = (submittedAt: string) => {
    const hoursAgo = (Date.now() - new Date(submittedAt).getTime()) / (1000 * 60 * 60);
    if (hoursAgo < 24) return 'text-red-600 bg-red-50 border-red-200';
    if (hoursAgo < 72) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const exportQuotes = () => {
    const csv = [
      ['ID', 'Name', 'Email', 'Phone', 'Type', 'Coverage', 'Date', 'Status']
    ];
    
    quotes.forEach(quote => {
      csv.push([
        quote.id.slice(-8),
        `${quote.firstName} ${quote.lastName}`,
        quote.email,
        quote.phone,
        formatInsuranceType(quote.insuranceType),
        quote.coverageAmount || 'Not specified',
        formatDate(quote.submittedAt),
        'Pending'
      ]);
    });

    const csvContent = csv.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading quotes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={fetchQuotes}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quote Management</h2>
          <p className="text-gray-600">Manage and review insurance quote requests</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportQuotes}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          <span className="text-gray-700 font-medium">Filter by type:</span>
        </div>
        {['all', 'life', 'health', 'medicare', 'dental', 'vision'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {type === 'all' ? 'All Types' : formatInsuranceType(type)}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Quotes</p>
              <p className="text-3xl font-bold text-gray-900">{quotes.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-3xl font-bold text-red-600">
                {quotes.filter(q => {
                  const today = new Date().toDateString();
                  return new Date(q.submittedAt).toDateString() === today;
                }).length}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-3xl font-bold text-yellow-600">
                {quotes.filter(q => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(q.submittedAt) >= weekAgo;
                }).length}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Life Insurance</p>
              <p className="text-3xl font-bold text-green-600">
                {quotes.filter(q => q.insuranceType === 'life').length}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Insurance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coverage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {quote.firstName} {quote.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ZIP: {quote.zipCode}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-1" />
                        <a href={`mailto:${quote.email}`} className="hover:text-blue-600">
                          {quote.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-1" />
                        <a href={`tel:${quote.phone}`} className="hover:text-blue-600">
                          {quote.phone}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formatInsuranceType(quote.insuranceType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {quote.coverageAmount || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(quote.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(quote.submittedAt)}`}>
                      {(() => {
                        const hoursAgo = (Date.now() - new Date(quote.submittedAt).getTime()) / (1000 * 60 * 60);
                        if (hoursAgo < 24) return 'Urgent';
                        if (hoursAgo < 72) return 'High';
                        return 'Normal';
                      })()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {quotes.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No quotes found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? 'No quote requests have been submitted yet.'
                : `No quotes found for ${formatInsuranceType(filter)} insurance.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Quote Detail Modal */}
      {showModal && selectedQuote && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Quote Details - {selectedQuote.firstName} {selectedQuote.lastName}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quote Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Insurance Type</h4>
                    <p className="text-blue-700 text-lg">{formatInsuranceType(selectedQuote.insuranceType)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Coverage Amount</h4>
                    <p className="text-green-700 text-lg">{selectedQuote.coverageAmount || 'Not specified'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium">Email:</span> {selectedQuote.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedQuote.phone}</p>
                      <p><span className="font-medium">ZIP Code:</span> {selectedQuote.zipCode}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Personal Details</h4>
                    <div className="space-y-2">
                      {selectedQuote.dateOfBirth && (
                        <p><span className="font-medium">Date of Birth:</span> {formatDate(selectedQuote.dateOfBirth)}</p>
                      )}
                      {selectedQuote.gender && (
                        <p><span className="font-medium">Gender:</span> {selectedQuote.gender}</p>
                      )}
                      {selectedQuote.maritalStatus && (
                        <p><span className="font-medium">Marital Status:</span> {selectedQuote.maritalStatus}</p>
                      )}
                      {selectedQuote.tobacco && (
                        <p><span className="font-medium">Tobacco Use:</span> {selectedQuote.tobacco}</p>
                      )}
                    </div>
                  </div>
                </div>

                {selectedQuote.healthConditions && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Health Conditions</h4>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-yellow-800">{selectedQuote.healthConditions}</p>
                    </div>
                  </div>
                )}

                {selectedQuote.additionalNotes && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Additional Notes</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedQuote.additionalNotes}</p>
                    </div>
                  </div>
                )}

                {/* File Upload Section */}
                <div className="mt-6">
                  <FileUploadInput quoteId={selectedQuote.id} />
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Submitted:</span> {new Date(selectedQuote.submittedAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Quote ID:</span> {selectedQuote.id}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedQuote.email}?subject=Your Insurance Quote Request&body=Dear ${selectedQuote.firstName},%0D%0A%0D%0AThank you for your interest in ${formatInsuranceType(selectedQuote.insuranceType)} insurance.`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href={`tel:${selectedQuote.phone}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}