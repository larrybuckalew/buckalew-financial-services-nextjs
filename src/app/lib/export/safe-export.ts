import ExcelJS from 'exceljs';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface ExportOptions {
  filename: string;
  headers: string[];
  data: any[];
}

export class SafeExport {
  static async toCSV(options: ExportOptions): Promise<void> {
    const csv = Papa.unparse({
      fields: options.headers,
      data: options.data
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
  }

  static async toExcel(options: ExportOptions): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(options.filename);

    worksheet.columns = options.headers.map(header => ({ 
      header, 
      key: header.toLowerCase().replace(' ', '_') 
    }));

    worksheet.addRows(options.data);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${options.filename}.xlsx`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  static async toPDF(options: ExportOptions): Promise<void> {
    const doc = new jsPDF();
    
    doc.autoTable({
      head: [options.headers],
      body: options.data
    });

    doc.save(`${options.filename}.pdf`);
  }
}
