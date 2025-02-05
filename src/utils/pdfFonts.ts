import { Font } from '@react-pdf/renderer';

// Register Helvetica as default font (it's built into PDF)
Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: {
        fontFamily: 'Helvetica'
      }
    },
    {
      src: {
        fontFamily: 'Helvetica-Bold'
      },
      fontWeight: 700
    }
  ]
});

export const fontStyles = {
  regular: {
    fontFamily: 'Helvetica',
    fontWeight: 400
  },
  bold: {
    fontFamily: 'Helvetica',
    fontWeight: 700
  }
};