import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export interface ExportOptions {
  filename: string;
  data: any[];
  fields?: string[];
  transformData?: (data: any[]) => any[];
  title?: string;
  orientation?: 'portrait' | 'landscape';
}

// Helper function for file downloads
const downloadFile = (blob: Blob, filename: string) => {
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
    return;
  }

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// CSV Export
export const exportToCSV = ({
  filename,
  data,
  fields,
  transformData,
}: ExportOptions): void => {
  const processedData = transformData ? transformData(data) : data;
  
  const csv = Papa.unparse(processedData, {
    fields: fields || Object.keys(processedData[0] || {}),
    delimiter: ',',
    quotes: true,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, `${filename}.csv`);
};

// Excel Export
export const exportToExcel = ({
  filename,
  data,
  fields,
  transformData,
}: ExportOptions): void => {
  const processedData = transformData ? transformData(data) : data;
  const ws = XLSX.utils.json_to_sheet(processedData);
  
  // Add column headers
  if (fields) {
    XLSX.utils.sheet_add_aoa(ws, [fields], { origin: 'A1' });
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  // Generate buffer
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  downloadFile(blob, `${filename}.xlsx`);
};

// PDF Export
export const exportToPDF = ({
  filename,
  data,
  fields,
  transformData,
  title,
  orientation = 'portrait',
}: ExportOptions): void => {
  const processedData = transformData ? transformData(data) : data;
  const doc = new jsPDF({
    orientation,
    unit: 'pt',
    format: 'a4',
  });

  // Add title if provided
  if (title) {
    doc.setFontSize(16);
    doc.text(title, 40, 40);
  }

  // Prepare data for autoTable
  const headers = fields || Object.keys(processedData[0] || {});
  const rows = processedData.map(row => headers.map(header => row[header]));

  doc.autoTable({
    head: [headers],
    body: rows,
    startY: title ? 60 : 40,
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    styles: {
      fontSize: 10,
      cellPadding: 5,
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  doc.save(`${filename}.pdf`);
};

// Combined export function
export const exportData = (
  format: 'csv' | 'excel' | 'pdf',
  options: ExportOptions
): void => {
  switch (format) {
    case 'csv':
      exportToCSV(options);
      break;
    case 'excel':
      exportToExcel(options);
      break;
    case 'pdf':
      exportToPDF(options);
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};