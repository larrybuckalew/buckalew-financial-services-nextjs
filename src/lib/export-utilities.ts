import { PDFExportService } from './pdf-generator';
import Papa from 'papaparse';

export class ExportUtilities {
  static async exportToCSV(data: any[], filename: string, columns: string[]): Promise<string> {
    const csv = Papa.unparse({
      fields: columns,
      data: data.map(row => columns.map(col => row[col] || ''))
    });
    return csv;
  }

  static async exportToPDF(data: any[], filename: string, columns: string[], title: string): Promise<Buffer> {
    return PDFExportService.exportToPDF(data, filename, columns, title);
  }

  static async downloadFile(content: string | Buffer, filename: string, type: 'csv' | 'pdf') {
    const blob = new Blob([content], { 
      type: type === 'csv' ? 'text/csv' : 'application/pdf' 
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
