# Export Functionality Documentation

This document describes the export functionality available in the application.

## Supported Export Formats

### 1. CSV Export
- Standard CSV format
- Configurable delimiters
- Unicode support
- Custom number and date formatting

### 2. Excel Export
- XLSX format
- Styling support
- Multiple sheets
- Formula support
- Auto-filtering
- Column width optimization

### 3. PDF Export
- Customizable layouts
- Table formatting
- Header/Footer support
- Watermarking
- Password protection
- Digital signatures

## Usage Examples

### Basic Export
```typescript
import { exportData } from '@/lib/export/exportUtils';

// Export to CSV
exportData('csv', {
  filename: 'data-export',
  data: yourData,
  fields: ['field1', 'field2'],
});

// Export to Excel
exportData('excel', {
  filename: 'data-export',
  data: yourData,
  fields: ['field1', 'field2'],
});

// Export to PDF
exportData('pdf', {
  filename: 'data-export',
  data: yourData,
  fields: ['field1', 'field2'],
  title: 'Data Export Report',
});
```

### Advanced Configuration

#### Excel Styling
```typescript
import { ExcelStyleOptions } from '@/lib/export/exportConfig';

const excelStyle: ExcelStyleOptions = {
  headerStyle: {
    font: {
      bold: true,
      color: 'FFFFFF',
      size: 12,
    },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: '428BCA',
    },
  },
  freezeHeader: true,
  autoFilter: true,
};

exportData('excel', {
  filename: 'styled-export',
  data: yourData,
  excelStyle,
});
```

#### PDF Customization
```typescript
import { PdfStyleOptions } from '@/lib/export/exportConfig';

const pdfStyle: PdfStyleOptions = {
  headerColor: [66, 139, 202],
  fontSize: 10,
  headerFontSize: 12,
  alternateRowColors: true,
  watermark: {
    text: 'Confidential',
    opacity: 0.3,
    angle: -45,
  },
  encryption: {
    userPassword: 'user123',
    ownerPassword: 'owner123',
    permissions: {
      printing: true,
      modifying: false,
    },
  },
};

exportData('pdf', {
  filename: 'secure-export',
  data: yourData,
  pdfStyle,
});
```

## Features

### CSV Features
- Custom delimiters (comma, semicolon, tab)
- Quote handling
- Header row customization
- Number formatting
- Date formatting
- Unicode support

### Excel Features
- Multiple sheets
- Cell styling
  - Fonts (size, color, bold, italic)
  - Backgrounds
  - Borders
  - Alignment
- Column widths
- Row heights
- Merged cells
- Frozen panes
- Auto-filters
- Data validation
- Conditional formatting

### PDF Features
- Page layouts
- Headers and footers
- Watermarks
- Table styling
- Custom fonts
- Page numbers
- Security features
  - Passwords
  - Permissions
  - Digital signatures
- Bookmarks
- Metadata

## Best Practices

1. Data Preparation
   - Clean data before export
   - Handle null/undefined values
   - Format dates consistently
   - Validate numerical data

2. Performance
   - Use streaming for large datasets
   - Implement progress indicators
   - Consider chunking large exports
   - Clean up temporary files

3. Security
   - Sanitize data before export
   - Implement proper access controls
   - Use encryption when necessary
   - Handle sensitive data appropriately

4. User Experience
   - Provide progress feedback
   - Handle errors gracefully
   - Allow cancellation of exports
   - Maintain consistent styling

## Error Handling

The export functionality includes comprehensive error handling for:
- File system errors
- Network issues
- Data validation
- Memory limitations
- Browser compatibility

## Testing

Refer to the test files in `__tests__` directory for:
- Unit tests for export functions
- Integration tests
- Browser compatibility tests
- Error handling tests

## Examples

Check the `examples` directory for complete examples of:
- Financial reports
- Data exports
- Styled documents
- Secure exports