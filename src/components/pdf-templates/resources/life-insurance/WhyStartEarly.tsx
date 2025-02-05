'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#3498DB'
  },
  paragraph: {
    marginBottom: 10,
    color: '#333333'
  },
  section: {
    marginBottom: 15
  }
});

export const WhyStartEarlyGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Why Start Early with Life Insurance?</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>Benefits of Early Insurance</Text>
          <Text style={styles.paragraph}>
            Starting your life insurance journey early can provide significant financial advantages and peace of mind for you and your loved ones.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Lower Premiums</Text>
          <Text style={styles.paragraph}>• Younger individuals are considered lower risk</Text>
          <Text style={styles.paragraph}>• Premiums are substantially lower in your 20s and 30s</Text>
          <Text style={styles.paragraph}>• Lock in rates before potential health changes</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Long-Term Financial Planning</Text>
          <Text style={styles.paragraph}>1. Build cash value over time</Text>
          <Text style={styles.paragraph}>2. Create a financial safety net early</Text>
          <Text style={styles.paragraph}>3. Protect future insurability</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Health Considerations</Text>
          <Text style={styles.paragraph}>• Easier to qualify when you're younger and healthier</Text>
          <Text style={styles.paragraph}>• Fewer medical examinations required</Text>
          <Text style={styles.paragraph}>• Reduced risk of being denied coverage</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Life Stage Protection</Text>
          <Text style={styles.paragraph}>
            Early life insurance provides financial protection during critical life stages:
            - Marriage
            - Starting a family
            - Buying a home
            - Career development
          </Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};