import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { format } from 'date-fns';

interface ReportData {
  title: string;
  subtitle?: string;
  data: any[];
  columns: string[];
}

export class PDFGenerator {
  // Generate a professional PDF report
  static async generateFinancialReport(reportData: ReportData): Promise<Uint8Array> {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Embed standard fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add a page
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Set up colors
    const primaryColor = rgb(0.1, 0.1, 0.1);
    const accentColor = rgb(0.2, 0.4, 0.8);

    // Page margins
    const margin = 50;

    // Draw title
    page.drawText(reportData.title, {
      x: margin,
      y: height - margin,
      size: 18,
      font: helveticaBoldFont,
      color: accentColor
    });

    // Draw subtitle
    if (reportData.subtitle) {
      page.drawText(reportData.subtitle, {
        x: margin,
        y: height - margin - 25,
        size: 14,
        font: helveticaFont,
        color: primaryColor
      });
    }

    // Draw generation date
    const generatedDate = format(new Date(), 'PPpp');
    page.drawText(`Generated: ${generatedDate}`, {
      x: width - margin - 150,
      y: height - margin,
      size: 10,
      font: helveticaFont,
      color: primaryColor
    });

    // Render table headers
    const tableStartY = height - margin - 100;
    const columnWidth = (width - 2 * margin) / reportData.columns.length;

    reportData.columns.forEach((column, index) => {
      page.drawText(column, {
        x: margin + index * columnWidth,
        y: tableStartY,
        size: 12,
        font: helveticaBoldFont,
        color: accentColor
      });

      // Draw header underline
      page.drawLine({
        start: { x: margin + index * columnWidth, y: tableStartY - 5 },
        end: { x: margin + (index + 1) * columnWidth, y: tableStartY - 5 },
        thickness: 1,
        color: accentColor
      });
    });

    // Render table data
    reportData.data.forEach((row, rowIndex) => {
      const rowY = tableStartY - 30 - (rowIndex * 20);
      
      reportData.columns.forEach((column, colIndex) => {
        const cellValue = row[column] || 'N/A';
        page.drawText(String(cellValue), {
          x: margin + colIndex * columnWidth,
          y: rowY,
          size: 10,
          font: helveticaFont,
          color: primaryColor
        });
      });
    });

    // Finalize PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }

  // Export various financial reports
  static async exportReports(
    reportType: 'clients' | 'policies' | 'commissions', 
    data: any[]
  ): Promise<{
    pdf: Uint8Array,
    filename: string
  }> {
    const reportConfigs = {
      'clients': {
        title: 'Client Financial Report',
        columns: ['id', 'name', 'email', 'totalPolicies']
      },
      'policies': {
        title: 'Policies Overview Report',
        columns: ['policyNumber', 'type', 'value', 'startDate']
      },
      'commissions': {
        title: 'Commission Tracking Report',
        columns: ['agent', 'policyType', 'amount', 'date']
      }
    };

    const config = reportConfigs[reportType];
    
    const pdf = await this.generateFinancialReport({
      title: config.title,
      subtitle: `Detailed ${reportType} Report`,
      columns: config.columns,
      data
    });

    return {
      pdf,
      filename: `${reportType}_report_${format(new Date(), 'yyyyMMdd')}.pdf`
    };
  }

  // Secure file download handler
  static async downloadReport(
    reportType: 'clients' | 'policies' | 'commissions'
  ): Promise<void> {
    // Fetch data from database
    const data = await this.fetchReportData(reportType);
    
    const { pdf, filename } = await this.exportReports(reportType, data);

    // Trigger download (server-side implementation)
    // This would typically involve setting appropriate headers 
    // and streaming the PDF to the client
  }

  // Fetch report data from database
  private static async fetchReportData(reportType: string): Promise<any[]> {
    // Implement database query to fetch appropriate data
    // Use QueryOptimizer from previous implementation
    return [];
  }
}

// Usage example
export async function generateClientReport() {
  try {
    const reportData = await PDFGenerator.exportReports('clients', [
      { id: 1, name: 'John Doe', email: 'john@example.com', totalPolicies: 3 },
      // More client data...
    ]);

    // Handle PDF generation and download
    return reportData;
  } catch (error) {
    console.error('Report generation failed:', error);
    throw error;
  }
}
