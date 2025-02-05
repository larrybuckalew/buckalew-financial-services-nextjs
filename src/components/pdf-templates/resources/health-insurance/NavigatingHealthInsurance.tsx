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

export const NavigatingHealthInsuranceGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>🏥 Navigating Health Insurance</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>Understanding Health Insurance Basics</Text>
          <Text style={styles.paragraph}>
            Health insurance is a critical financial tool that helps protect you from high medical costs and ensures access to necessary healthcare services.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Key Components of Health Insurance</Text>
          <Text style={styles.paragraph}>1. Premium: Monthly payment to maintain coverage</Text>
          <Text style={styles.paragraph}>2. Deductible: Amount you pay before insurance kicks in</Text>
          <Text style={styles.paragraph}>3. Copayment: Fixed amount paid for specific services</Text>
          <Text style={styles.paragraph}>4. Out-of-pocket Maximum: Limit on your annual healthcare expenses</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Types of Health Insurance Plans</Text>
          <Text style={styles.paragraph}>• HMO (Health Maintenance Organization)
            - Lower costs
            - Requires primary care physician referrals</Text>
          <Text style={styles.paragraph}>• PPO (Preferred Provider Organization)
            - More flexibility
            - Higher premiums
            - Can see specialists without referrals</Text>
          <Text style={styles.paragraph}>• High-Deductible Health Plans (HDHP)
            - Lower premiums
            - Paired with Health Savings Accounts (HSAs)</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Choosing the Right Plan</Text>
          <Text style={styles.paragraph}>1. Assess your healthcare needs</Text>
          <Text style={styles.paragraph}>2. Compare plan costs and coverage</Text>
          <Text style={styles.paragraph}>3. Check network of healthcare providers</Text>
          <Text style={styles.paragraph}>4. Consider your budget and potential medical expenses</Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};