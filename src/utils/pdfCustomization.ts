import { colors } from '@/styles/pdfTheme';

export interface PDFThemeCustomization {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    background: {
      primary: string;
      secondary: string;
      accent: string;
    };
    text: {
      primary: string;
      secondary: string;
      light: string;
    };
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  logoPosition: 'left' | 'center' | 'right';
  showFooterLogo: boolean;
  includeDateInHeader: boolean;
  includePageNumbers: boolean;
  includeWatermark: boolean;
  watermarkText?: string;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

export const defaultTheme: PDFThemeCustomization = {
  colors: colors,
  fonts: {
    primary: 'Helvetica',
    secondary: 'Helvetica',
  },
  logoPosition: 'left',
  showFooterLogo: true,
  includeDateInHeader: true,
  includePageNumbers: true,
  includeWatermark: false,
  watermarkText: 'Confidential',
  companyInfo: {
    name: 'Buckalew Financial Services',
    address: '3031 Mojave Oak Dr, Valrico, FL 33594',
    phone: '844-779-7600',
    email: 'larry@buckalewfinancialservices.com',
    website: 'www.buckalewfinancialservices.com'
  }
};

export const themes = {
  default: defaultTheme,
  modern: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#60a5fa',
    },
    logoPosition: 'center',
  },
  classic: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#1e3a8a',
      secondary: '#1e40af',
      accent: '#2563eb',
    },
    logoPosition: 'left',
  },
  professional: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '#0f766e',
      secondary: '#0d9488',
      accent: '#14b8a6',
    },
    logoPosition: 'right',
  }
} as const;

export type ThemeName = keyof typeof themes;

export const getTheme = (themeName: ThemeName = 'default'): PDFThemeCustomization => {
  return themes[themeName] || themes.default;
};