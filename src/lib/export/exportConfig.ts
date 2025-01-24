import { ExportOptions } from './exportUtils';

export interface PdfStyleOptions {
  headerColor?: [number, number, number];
  textColor?: [number, number, number];
  fontSize?: number;
  headerFontSize?: number;
  fontStyle?: 'normal' | 'bold' | 'italic';
  pageOrientation?: 'portrait' | 'landscape';
  margins?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  alternateRowColors?: boolean;
  alternateRowColor?: [number, number, number];
  showGridLines?: boolean;
  headerTextAlignment?: 'left' | 'center' | 'right';
  cellTextAlignment?: 'left' | 'center' | 'right';
}

export interface ExcelStyleOptions {
  headerStyle?: {
    font?: {
      bold?: boolean;
      color?: string;
      size?: number;
    };
    fill?: {
      type: 'pattern';
      pattern: 'solid';
      fgColor: string;
    };
    alignment?: {
      horizontal?: 'left' | 'center' | 'right';
      vertical?: 'top' | 'middle' | 'bottom';
    };
    border?: {
      top?: { style: 'thin' | 'medium' | 'thick'; color: string };
      right?: { style: 'thin' | 'medium' | 'thick'; color: string };
      bottom?: { style: 'thin' | 'medium' | 'thick'; color: string };
      left?: { style: 'thin' | 'medium' | 'thick'; color: string };
    };
  };
  cellStyle?: {
    font?: {
      color?: string;
      size?: number;
    };
    alignment?: {
      horizontal?: 'left' | 'center' | 'right';
      vertical?: 'top' | 'middle' | 'bottom';
    };
  };
  alternateRowStyle?: {
    fill?: {
      type: 'pattern';
      pattern: 'solid';
      fgColor: string;
    };
  };
  columnWidths?: { [key: string]: number };
  freezeHeader?: boolean;
  autoFilter?: boolean;
}

export interface CSVStyleOptions {
  delimiter?: ',' | ';' | '\t' | '|';
  quoteStrings?: boolean;
  includeHeaderRow?: boolean;
  dateFormat?: string;
  numberFormat?: {
    decimals?: number;
    thousandsSeparator?: string;
    decimalSeparator?: string;
  };
}

export interface EnhancedExportOptions extends ExportOptions {
  pdfStyle?: PdfStyleOptions;
  excelStyle?: ExcelStyleOptions;
  csvStyle?: CSVStyleOptions;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
    creationDate?: Date;
  };
  watermark?: {
    text: string;
    color?: [number, number, number];
    opacity?: number;
    fontSize?: number;
    angle?: number;
  };
  encryption?: {
    userPassword?: string;
    ownerPassword?: string;
    permissions?: {
      printing?: boolean;
      modifying?: boolean;
      copying?: boolean;
      annotating?: boolean;
    };
  };
}

export const defaultPdfStyle: PdfStyleOptions = {
  headerColor: [66, 139, 202],
  textColor: [0, 0, 0],
  fontSize: 10,
  headerFontSize: 12,
  fontStyle: 'normal',
  pageOrientation: 'portrait',
  margins: {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40,
  },
  alternateRowColors: true,
  alternateRowColor: [245, 245, 245],
  showGridLines: true,
  headerTextAlignment: 'center',
  cellTextAlignment: 'left',
};

export const defaultExcelStyle: ExcelStyleOptions = {
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
    alignment: {
      horizontal: 'center',
      vertical: 'middle',
    },
    border: {
      top: { style: 'thin', color: '000000' },
      right: { style: 'thin', color: '000000' },
      bottom: { style: 'thin', color: '000000' },
      left: { style: 'thin', color: '000000' },
    },
  },
  cellStyle: {
    font: {
      size: 11,
    },
    alignment: {
      horizontal: 'left',
      vertical: 'middle',
    },
  },
  alternateRowStyle: {
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: 'F5F5F5',
    },
  },
  freezeHeader: true,
  autoFilter: true,
};

export const defaultCSVStyle: CSVStyleOptions = {
  delimiter: ',',
  quoteStrings: true,
  includeHeaderRow: true,
  dateFormat: 'YYYY-MM-DD',
  numberFormat: {
    decimals: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
  },
};