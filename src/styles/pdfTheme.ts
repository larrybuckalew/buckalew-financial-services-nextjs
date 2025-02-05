import { Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 }
  ]
});

export const colors = {
  primary: {
    50: '#EBF8FF',
    100: '#BEE3F8',
    500: '#3182CE',
    600: '#2B6CB0',
    700: '#2C5282',
    800: '#1A365D'
  },
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C'
  },
  success: {
    50: '#F0FFF4',
    500: '#48BB78'
  },
  warning: {
    50: '#FFFAF0',
    500: '#ED8936'
  },
  error: {
    50: '#FFF5F5',
    500: '#E53E3E'
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  '3xl': 48,
  '4xl': 64
};

export const fontSizes = {
  xs: 8,
  sm: 10,
  base: 12,
  md: 14,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36
};

export const lineHeights = {
  tight: 1.2,
  base: 1.5,
  relaxed: 1.75
};

export const borders = {
  thin: `1 solid ${colors.gray[200]}`,
  medium: `2 solid ${colors.gray[300]}`,
  thick: `3 solid ${colors.primary[500]}`
};

export const shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
};

export const layout = {
  pageMargin: spacing['4xl'],
  contentWidth: '100%',
  maxWidth: 595, // Standard A4 width in points
  headerHeight: spacing['4xl'],
  footerHeight: spacing['3xl']
};