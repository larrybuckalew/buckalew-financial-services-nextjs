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

export const ChoosingRightPolicyGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Choosing the Right Policy</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>Understanding Policy Options</Text>
          <Text style={styles.paragraph}>
            Selecting the right life insurance policy is a crucial decision that depends on your unique financial situation, family needs, and long-term goals.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Key Factors to Consider</Text>
          <Text style={styles.paragraph}>1. Coverage Amount: Determine how much financial protection your family needs</Text>
          <Text style={styles.paragraph}>2. Policy Duration: Decide between term and permanent life insurance</Text>
          <Text style={styles.paragraph}>3. Budget: Balance coverage with affordable premiums</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Policy Comparison</Text>
          <Text style={styles.paragraph}>• Term Life Insurance
            - Lower premiums
            - Fixed coverage period
            - Best for specific financial obligations</Text>
          <Text style={styles.paragraph}>• Whole Life Insurance
            - Lifelong coverage
            - Builds cash value
            - Higher premiums
            - Provides investment component</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Steps to Choose</Text>
          <Text style={styles.paragraph}>1. Assess your financial responsibilities</Text>
          <Text style={styles.paragraph}>2. Calculate necessary coverage</Text>
          <Text style={styles.paragraph}>3. Compare quotes from multiple providers</Text>
          <Text style={styles.paragraph}>4. Consult with a financial advisor</Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};