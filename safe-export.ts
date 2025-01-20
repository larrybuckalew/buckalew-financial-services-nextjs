import Papa from 'papaparse';

export function toCSV(data: any) {
  if (!Array.isArray(data) || data.length === 0 || !data.every(item => typeof item === 'object' && item !== null)) {
    throw new Error('Invalid JSON data: Data should be a non-empty array of objects');
  }
  try {
    return Papa.unparse(data);
  } catch (error) {
    throw new Error('Error during CSV conversion');
  }
}
