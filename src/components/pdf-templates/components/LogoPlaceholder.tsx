import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors } from '@/styles/pdfTheme';
import { fontStyles } from '@/utils/pdfFonts';

const styles = StyleSheet.create({
  logo: {
    backgroundColor: colors.primary[50],
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  text: {
    ...fontStyles.bold,
    color: colors.primary[700],
    fontSize: 16,
  }
});

export const LogoPlaceholder = () => (
  <View style={styles.logo}>
    <Text style={styles.text}>Buckalew Financial Services</Text>
  </View>
);
