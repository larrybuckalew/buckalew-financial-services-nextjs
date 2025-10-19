import { SafeExport } from './safe-export';
export async function exportData(data, headers, filename, format = 'csv') {
    const options = { filename, headers, data };
    switch (format) {
        case 'csv':
            await SafeExport.toCSV(options);
            break;
        case 'excel':
            await SafeExport.toExcel(options);
            break;
        case 'pdf':
            await SafeExport.toPDF(options);
            break;
    }
}
