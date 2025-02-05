'use client';

import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ThemeName, getTheme } from '@/utils/pdfCustomization';

interface PDFPreviewProps {
  document: React.ReactElement;
  onThemeChange?: (theme: ThemeName) => void;
  onCustomize?: (customizations: any) => void;
}

export const PDFPreview: React.FC<PDFPreviewProps> = ({
  document,
  onThemeChange,
  onCustomize
}) => {
  const [theme, setTheme] = useState<ThemeName>('default');
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    if (onThemeChange) {
      onThemeChange(newTheme);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Preview Panel */}
      <div className="flex-1 bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 h-full">
          <PDFViewer width="100%" height="100%" className="rounded-lg">
            {document}
          </PDFViewer>
        </div>
      </div>

      {/* Customization Panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Theme</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(getTheme()).map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => handleThemeChange(themeName as ThemeName)}
                  className={`px-4 py-2 rounded-lg border ${
                    theme === themeName
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Layout Options */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Layout</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={getTheme(theme).showFooterLogo}
                  onChange={(e) => {
                    if (onCustomize) {
                      onCustomize({
                        ...getTheme(theme),
                        showFooterLogo: e.target.checked
                      });
                    }
                  }}
                />
                <span className="ml-2">Show Footer Logo</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={getTheme(theme).includePageNumbers}
                  onChange={(e) => {
                    if (onCustomize) {
                      onCustomize({
                        ...getTheme(theme),
                        includePageNumbers: e.target.checked
                      });
                    }
                  }}
                />
                <span className="ml-2">Show Page Numbers</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={getTheme(theme).includeDateInHeader}
                  onChange={(e) => {
                    if (onCustomize) {
                      onCustomize({
                        ...getTheme(theme),
                        includeDateInHeader: e.target.checked
                      });
                    }
                  }}
                />
                <span className="ml-2">Show Date in Header</span>
              </label>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={getTheme(theme).companyInfo.name}
                  onChange={(e) => {
                    if (onCustomize) {
                      onCustomize({
                        ...getTheme(theme),
                        companyInfo: {
                          ...getTheme(theme).companyInfo,
                          name: e.target.value
                        }
                      });
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={getTheme(theme).companyInfo.phone}
                  onChange={(e) => {
                    if (onCustomize) {
                      onCustomize({
                        ...getTheme(theme),
                        companyInfo: {
                          ...getTheme(theme).companyInfo,
                          phone: e.target.value
                        }
                      });
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={getTheme(theme).companyInfo.email}
                  onChange={(e) => {
                    if (onCustomize) {
                      onCustomize({
                        ...getTheme(theme),
                        companyInfo: {
                          ...getTheme(theme).companyInfo,
                          email: e.target.value
                        }
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-4">
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => {
                // Generate PDF download
              }}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};