import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { colors } from '@/styles/pdf';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 35,
    left: 50,
    right: 50,
    borderTop: `1 solid ${colors.border}`,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 8,
    color: colors.text.light,
    fontFamily: 'Montserrat',
    marginBottom: 2,
  },
  pageNumber: {
    fontSize: 9,
    color: colors.text.secondary,
    fontFamily: 'Montserrat',
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: 7,
    color: colors.text.light,
    fontFamily: 'Montserrat',
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: 300,
  },
  link: {
    color: colors.accent,
    textDecoration: 'none',
  }
});

interface FooterProps {
  pageNumber: number;
  totalPages: number;
  showDisclaimer?: boolean;
}

const Footer: React.FC<FooterProps> = ({ 
  pageNumber, 
  totalPages,
  showDisclaimer = true
}) => (
  <View style={styles.footer} fixed>
    <View style={styles.leftSection}>
      <Text style={styles.text}>3031 Mojave Oak Dr</Text>
      <Text style={styles.text}>Valrico, FL 33594</Text>
    </View>
    <View style={styles.centerSection}>
      <Text style={styles.pageNumber}>
        {pageNumber} of {totalPages}
      </Text>
      {showDisclaimer && (
        <Text style={styles.disclaimer}>
          This document is for informational purposes only and does not constitute financial advice.
          Please consult with a qualified professional for specific guidance.
        </Text>
      )}
    </View>
    <View style={styles.rightSection}>
      <Text style={styles.text}>844-779-7600</Text>
      <Text style={[styles.text, styles.link]}>buckalewfinancialservices.com</Text>
    </View>
  </View>
);

export default Footer;