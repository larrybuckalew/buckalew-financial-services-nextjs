import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { defaultPdfStyle, defaultExcelStyle, defaultCSVStyle } from '../exportConfig';
import { toCSV } from '../safe-export';

// Mock file download functionality
const mockDownloadFile = jest.fn();

describe('Export Utils', () => {
  it('handles CSV export correctly', () => {
    const validData = [
      { "name": "John Doe", "age": 30, "city": "New York" },
      { "name": "Jane Smith", "age": 25, "city": "Los Angeles" }
    ];

    // Ensure valid data does not throw an error
    expect(() => {
      toCSV(validData);
    }).not.toThrow();

    const csv = toCSV(validData);

    expect(csv).toContain('John Doe');
    expect(csv).toContain('Jane Smith');
  });

  it('throws an error for invalid JSON data', () => {
    const invalidData1 = 'invalid';
    const invalidData2 = null;
    const invalidData3 = {};
    const invalidData4 = [{ "name": "John Doe", "age": 30, "city": "New York" }, "invalid"];
    const invalidData5 = [{ "name": "John Doe", "age": 30, "city": "New York" }, null];

    // Ensure invalid data throws an error
    expect(() => {
      toCSV(invalidData1);
    }).toThrow('Invalid JSON data: Data should be a non-empty array of objects');
    expect(() => {
      toCSV(invalidData2);
    }).toThrow('Invalid JSON data: Data should be