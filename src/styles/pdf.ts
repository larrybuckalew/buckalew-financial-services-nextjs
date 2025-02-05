import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: '/fonts/Montserrat-Regular.ttf' },
    { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Montserrat-Medium.ttf', fontWeight: 'medium' },
  ]
});

Font.register({
  family: 'Merriweather',
  fonts: [
    { src: '/fonts/Merriweather-Regular.ttf' },
    { src: '/fonts/Merriweather-Bold.ttf', fontWeight: 'bold' },
  ]
});

export const colors = {
  primary: '#1a365d',      // Deep navy
  secondary: '#2c5282',    // Rich blue
  accent: '#3182ce',       // Bright blue
  success: '#48bb78',      // Green
  warning: '#ed8936',      // Orange
  error: '#e53e3e',        // Red
  text: {
    primary: '#2d3748',    // Dark gray
    secondary: '#4a5568',  // Medium gray
    light: '#718096',      // Light gray
  },
  background: {
    primary: '#ffffff',    // White
    secondary: '#f7fafc',  // Light gray
    accent: '#ebf8ff',     // Light blue
  },
  border: '#e2e8f0',       // Border gray
};

// Base styles for all PDFs
export const baseStyles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: colors.background.primary,
    fontFamily: 'Merriweather',
    fontSize: 11,
    lineHeight: 1.6,
    color: colors.text.primary,
  },
  coverPage: {
    backgroundColor: colors.background.primary,
    padding: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  coverContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 1.4,
  },
  heading1: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    marginTop: 30,
  },
  heading2: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 12,
    marginTop: 25,
  },
  heading3: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 'medium',
    color: colors.secondary,
    marginBottom: 10,
    marginTop: 20,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
    lineHeight: 1.6,
  },
  list: {
    marginLeft: 15,
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 6,
    flexDirection: 'row',
  },
  bullet: {
    width: 10,
    marginRight: 5,
  },
  callout: {
    backgroundColor: colors.background.accent,
    padding: 15,
    marginVertical: 15,
    borderRadius: 4,
    borderLeft: 3,
    borderColor: colors.accent,
  },
  calloutText: {
    color: colors.text.primary,
    fontSize: 10,
    fontStyle: 'italic',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 30,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: colors.background.secondary,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  image: {
    marginVertical: 15,
  },
  quote: {
    marginVertical: 15,
    paddingLeft: 20,
    borderLeft: 2,
    borderColor: colors.accent,
    fontStyle: 'italic',
    color: colors.text.secondary,
  },
  footnote: {
    fontSize: 8,
    color: colors.text.light,
    marginTop: 4,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    right: 50,
    color: colors.text.light,
  },
});