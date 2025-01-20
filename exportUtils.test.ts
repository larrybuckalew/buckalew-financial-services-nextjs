// src/lib/export/safe-export.ts
import ExcelJS from 'exceljs';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface ExportOptions {
  filename: string;
  headers?: string[];
  data: any[];
}

export class SafeExport {
  static async toCSV(options: ExportOptions): Promise<void> {
    // Validate input
    if (!options.data || options.data.length === 0) {
      console.warn('No data to export');
      return;
    }

    // Use dynamic headers if not provided
    const headers = options.headers || Object.keys(options.data[0]);

    // Sanitize data: remove undefined/null, convert to strings
    const sanitizedData = options.data.map(row => 
      headers.map(header => {
        const value = row[header];
        return value === undefined || value === null ? '' : String(value);
      })
    );

    try {
      const csv = Papa.unparse({
        fields: headers,
        data: sanitizedData
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${options.filename}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CSV Export Error:', error);
      throw new Error('Failed to export CSV');
    }
  }

  // ... other methods remain the same
}