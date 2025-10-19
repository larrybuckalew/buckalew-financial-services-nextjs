// src/lib/export/exportUtils.ts
import { SafeExport } from './safe-export';
export function exportData(format, options) {
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
export async function exportToCSV(options) {
    await SafeExport.toCSV({
        filename: options.filename,
        data: options.data,
        headers: options.fields
    });
}
export async function exportToExcel(options) {
    await SafeExport.toExcel({
        filename: options.filename,
        data: options.data,
        headers: options.fields
    });
}
export async function exportToPDF(options) {
    await SafeExport.toPDF({
        filename: options.filename,
        data: options.data,
        headers: options.fields
    });
}
