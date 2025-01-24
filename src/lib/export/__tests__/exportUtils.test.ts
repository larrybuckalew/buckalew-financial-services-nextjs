import { exportToCSV, exportToExcel, exportToPDF, exportData } from '../exportUtils';
import { defaultPdfStyle, defaultExcelStyle, defaultCSVStyle } from '../exportConfig';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

// Mock file download functionality
const mockDownloadFile = jest.fn();
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

// Mock document methods
document.createElement = jest.fn().mockReturnValue({
  click: jest.fn(),
  setAttribute: jest.fn(),
  style: {},
});
document.body.appendChild = jest.fn();
document.body.removeChild = jest.fn();

describe('Export Utils', () => {
  const mockData = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CSV Export', () => {
    it('exports data to CSV format', () => {
      const spy = jest.spyOn(global, 'Blob');
      
      exportToCSV({
        filename: 'test',
        data: mockData,
        fields: ['id', 'name', 'value'],
      });

      expect(spy).toHaveBeenCalled();
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(URL.createObjectURL).toHaveBeenCalled();
    });

    it('applies CSV style options', () => {
      const customCSVStyle = {
        ...defaultCSVStyle,
        delimiter: ';',
        quoteStrings: false,
      };

      const spy = jest.spyOn(global, 'Blob');
      
      exportToCSV({
        filename: 'test',
        data: mockData,
        csvStyle: customCSVStyle,
      });

      const blobContent = spy.mock.calls[0][0][0];
      expect(blobContent).toContain(';');
    });

    it('handles data transformation', () => {
      const transformData = (data: any[]) => data.map(item => ({
        ...item,
        value: `$${item.value}`
      }));

      const spy = jest.spyOn(global, 'Blob');
      
      exportToCSV({
        filename: 'test',
        data: mockData,
        transformData,
      });

      const blobContent = spy.mock.calls[0][0][0];
      expect(blobContent).toContain('$100');
    });
  });

  describe('Excel Export', () => {
    it('exports data to Excel format', () => {
      const spy = jest.spyOn(XLSX, 'write');
      
      exportToExcel({
        filename: 'test',
        data: mockData,
        fields: ['id', 'name', 'value'],
      });

      expect(spy).toHaveBeenCalled();
      expect(document.createElement).toHaveBeenCalledWith('a');
    });

    it('applies Excel style options', () => {
      const customExcelStyle = {
        ...defaultExcelStyle,
        headerStyle: {
          ...defaultExcelStyle.headerStyle,
          font: {
            bold: true,
            color: 'FF0000',
            size: 14,
          },
        },
      };

      const spy = jest.spyOn(XLSX.utils, 'book_append_sheet');
      
      exportToExcel({
        filename: 'test',
        data: mockData,
        excelStyle: customExcelStyle,
      });

      expect(spy).toHaveBeenCalled();
    });

    it('handles column width optimization', () => {
      const customExcelStyle = {
        ...defaultExcelStyle,
        columnWidths: {
          name: 20,
          value: 10,
        },
      };

      const spy = jest.spyOn(XLSX.utils, 'book_append_sheet');
      
      exportToExcel({
        filename: 'test',
        data: mockData,
        excelStyle: customExcelStyle,
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('PDF Export', () => {
    it('exports data to PDF format', () => {
      const spy = jest.spyOn(jsPDF.prototype, 'save');
      
      exportToPDF({
        filename: 'test',
        data: mockData,
        fields: ['id', 'name', 'value'],
      });

      expect(spy).toHaveBeenCalledWith('test.pdf');
    });

    it('applies PDF style options', () => {
      const customPdfStyle = {
        ...defaultPdfStyle,
        headerColor: [0, 0, 0],
        fontSize: 12,
        margins: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      };

      const spy = jest.spyOn(jsPDF.prototype, 'setFontSize');
      
      exportToPDF({
        filename: 'test',
        data: mockData,
        pdfStyle: customPdfStyle,
      });

      expect(spy).toHaveBeenCalledWith(12);
    });

    it('adds watermark when specified', () => {
      const spy = jest.spyOn(jsPDF.prototype, 'text');
      
      exportToPDF({
        filename: 'test',
        data: mockData,
        watermark: {
          text: 'CONFIDENTIAL',
          color: [128, 128, 128],
          opacity: 0.5,
        },
      });

      expect(spy).toHaveBeenCalledWith(
        'CONFIDENTIAL',
        expect.any(Number),
        expect.any(Number),
        expect.any(Object)
      );
    });

    it('applies encryption when specified', () => {
      const spy = jest.spyOn(jsPDF.prototype, 'save');
      
      exportToPDF({
        filename: 'test',
        data: mockData,
        encryption: {
          userPassword: 'user123',
          ownerPassword: 'owner123',
          permissions: {
            printing: true,
            modifying: false,
          },
        },
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Combined Export', () => {
    it('handles multiple export formats sequentially', async () => {
      const formats = ['csv', 'excel', 'pdf'] as const;
      
      for (const format of formats) {
        await expect(exportData(format, {
          filename: 'test',
          data: mockData,
        })).resolves.not.toThrow();
      }
    });

    it('throws error for unsupported format', () => {
      expect(() => {
        // @ts-ignore - Testing invalid format
        exportData('invalid', { filename: 'test', data: mockData });
      }).toThrow('Unsupported export format: invalid');
    });
  });

  describe('Error Handling', () => {
    it('handles empty data gracefully', () => {
      expect(() => {
        exportData('csv', { filename: 'test', data: [] });
      }).not.toThrow();
    });

    it('handles missing fields', () => {
      expect(() => {
        exportData('csv', { filename: 'test', data: mockData });
      }).not.toThrow();
    });

    it('handles null and undefined values', () => {
      const dataWithNulls = [
        { id: 1, name: null, value: undefined },
        { id: 2, name: 'Test', value: null },
      ];

      expect(() => {
        exportData('csv', { filename: 'test', data: dataWithNulls });
      }).not.toThrow();
    });

    it('handles special characters in data', () => {
      const dataWithSpecialChars = [
        { id: 1, name: 'Test™', value: '€100' },
        { id: 2, name: 'Test®', value: '¥200' },
      ];

      expect(() => {
        exportData('csv', { filename: 'test', data: dataWithSpecialChars });
      }).not.toThrow();
    });
  });
});