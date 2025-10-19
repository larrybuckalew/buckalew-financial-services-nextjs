import PDFDocument from 'pdfkit';

export interface PDFGenerationOptions {
  title: string;
  data: any[];
  columns: string[];
}

export class PDFGenerator {
  static generatePDF(options: PDFGenerationOptions): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];
      
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      
      doc.fontSize(16).text(options.title, { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(12);
      options.columns.forEach((col, x) => {
        doc.text(col, 50 + x * 100, doc.y, { width: 100 });
      });
      doc.moveDown();
      
      options.data.forEach((row) => {
        options.columns.forEach((col, colIndex) => {
          doc.text(
            String(row[col] || ''), 
            50 + colIndex * 100, 
            doc.y, 
            { width: 100 }
          );
        });
        doc.moveDown();
      });
      
      doc.end();
    });
  }
}

export class PDFExportService {
  static async exportToPDF(
    data: any[], 
    filename: string, 
    columns: string[], 
    title: string
  ): Promise<Buffer> {
    return PDFGenerator.generatePDF({ 
      data, 
      columns, 
      title 
    });
  }
}
