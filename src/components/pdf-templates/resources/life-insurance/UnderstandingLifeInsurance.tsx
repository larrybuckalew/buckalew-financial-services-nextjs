'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic' }
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

export const UnderstandingLifeInsuranceGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>👨‍👩‍👧‍👦 Understanding Life Insurance</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>What is Life Insurance?</Text>
          <Text style={styles.paragraph}>
            Life insurance is a critical financial tool designed to protect your loved ones financially in the event of your unexpected passing. It provides a safety net that ensures your family can maintain their standard of living, cover outstanding debts, and meet future financial goals.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Why You Need Life Insurance</Text>
          <Text style={styles.paragraph}>1. Income Replacement: Ensures your family's financial stability if you're the primary earner.</Text>
          <Text style={styles.paragraph}>2. Debt Coverage: Helps pay off mortgages, loans, and other financial obligations.</Text>
          <Text style={styles.paragraph}>3. Future Planning: Supports long-term goals like children's education.</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Types of Life Insurance</Text>
          <Text style={styles.paragraph}>• Term Life: Provides coverage for a specific period</Text>
          <Text style={styles.paragraph}>• Whole Life: Offers lifelong coverage with a cash value component</Text>
          <Text style={styles.paragraph}>• Universal Life: Flexible premiums and death benefits</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Getting Started</Text>
          <Text style={styles.paragraph}>
            Choosing the right life insurance policy depends on your unique financial situation, family needs, and long-term goals. Consult with a financial advisor to determine the best coverage for you.
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