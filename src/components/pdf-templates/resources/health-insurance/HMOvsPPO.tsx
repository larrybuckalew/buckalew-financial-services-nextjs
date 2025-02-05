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
  },
  table: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  tableCell: {
    padding: 5,
    flex: 1
  }
});

export const HMOvsPPOGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>HMO vs. PPO: What's the Difference?</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>Understanding Health Insurance Plans</Text>
          <Text style={styles.paragraph}>
            HMO (Health Maintenance Organization) and PPO (Preferred Provider Organization) are two of the most common health insurance plan types, each with unique features and benefits.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>HMO (Health Maintenance Organization)</Text>
          <Text style={styles.paragraph}>• Lower monthly premiums</Text>
          <Text style={styles.paragraph}>• Requires primary care physician referrals</Text>
          <Text style={styles.paragraph}>• Limited network of providers</Text>
          <Text style={styles.paragraph}>• Lower out-of-pocket costs</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>PPO (Preferred Provider Organization)</Text>
          <Text style={styles.paragraph}>• Higher monthly premiums</Text>
          <Text style={styles.paragraph}>• No referrals needed</Text>
          <Text style={styles.paragraph}>• Larger network of providers</Text>
          <Text style={styles.paragraph}>• More flexibility in choosing doctors</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Comparison Chart</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: '#F0F0F0' }]}>
              <Text style={styles.tableCell}>Feature</Text>
              <Text style={styles.tableCell}>HMO</Text>
              <Text style={styles.tableCell}>PPO</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Premiums</Text>
              <Text style={styles.tableCell}>Lower</Text>
              <Text style={styles.tableCell}>Higher</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Provider Network</Text>
              <Text style={styles.tableCell}>Limited</Text>
              <Text style={styles.tableCell}>Extensive</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Referrals Required</Text>
              <Text style={styles.tableCell}>Yes</Text>
              <Text style={styles.tableCell}>No</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Out-of-Network Care</Text>
              <Text style={styles.tableCell}>Not Covered</Text>
              <Text style={styles.tableCell}>Partially Covered</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Choosing the Right Plan</Text>
          <Text style={styles.paragraph}>Consider these factors when selecting between HMO and PPO:</Text>
          <Text style={styles.paragraph}>1. Budget and Premium Costs</Text>
          <Text style={styles.paragraph}>2. Healthcare Needs and Frequency</Text>
          <Text style={styles.paragraph}>3. Preferred Healthcare Providers</Text>
          <Text style={styles.paragraph}>4. Desire for Flexibility</Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};