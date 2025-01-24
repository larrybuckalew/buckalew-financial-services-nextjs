import React from 'react';
import { ChartTheme, defaultTheme, darkTheme } from '@/lib/visualization';

interface ChartControlsProps {
  chartType: 'area' | 'line' | 'bar';
  onChartTypeChange: (type: 'area' | 'line' | 'bar') => void;
  theme: ChartTheme;
  onThemeChange: (theme: ChartTheme) => void;
  onExport: () => void;
}

export default function ChartControls({
  chartType,
  onChartTypeChange,
  theme,
  onThemeChange,
  onExport,
}: ChartControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Chart Type:
        </label>
        <select
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value as 'area' | 'line' | 'bar')}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        >
          <option value="area">Area Chart</option>
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Theme:
        </label>
        <select
          value={theme === darkTheme ? 'dark' : 'light'}
          onChange={(e) => onThemeChange(e.target.value === 'dark' ? darkTheme : defaultTheme)}
          className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="flex-grow"></div>

      <button
        onClick={onExport}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Export CSV
      </button>
    </div>
  );
}