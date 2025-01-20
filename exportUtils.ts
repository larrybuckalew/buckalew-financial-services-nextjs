// src/lib/export/exportUtils.ts
import { SafeExport } from './safe-export';

export function exportData(
  format: string,
  options: {
    filename: string;
    data: any[];
    fields?: string[];
  }
) {
  // Validate input before processing
  if (!options.data || options.data.length === 0) {
    console.warn('No data to export');
    return Promise.resolve();
  }

  // Explicitly handle supported formats
  switch (format) {
    case 'csv':
      return exportToCSV(options);
    case 'excel':
      return exportToExcel(options);
    case 'pdf':
      return exportToPDF(options);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

export async function exportToCSV(options: {
  filename: string;
  data: any[];
  fields?: string[];
}) {
  await SafeExport.toCSV({
    filename: options.filename,
    data: options.data,
    headers: options.fields
  });
}

export async function exportToExcel(options: {
  filename: string;
  data: any[];
  fields?: string[];
}) {
  await SafeExport.toExcel({
    filename: options.filename,
    data: options.data,
    headers: options.fields
  });
}

export async function exportToPDF(options: {
  filename: string;
  data: any[];
  fields?: string[];
}) {
  await SafeExport.toPDF({
    filename: options.filename,
    data: options.data,
    headers: options.fields
  });
}