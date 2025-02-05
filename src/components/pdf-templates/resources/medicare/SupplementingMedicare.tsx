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

export const SupplementingMedicareGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Supplementing Medicare</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>Understanding Medicare Gaps</Text>
          <Text style={styles.paragraph}>
            Original Medicare (Parts A and B) doesn't cover everything. Medigap and other supplemental plans help fill these coverage gaps and provide additional financial protection.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>What is Medigap?</Text>
          <Text style={styles.paragraph}>• Medicare Supplement Insurance</Text>
          <Text style={styles.paragraph}>• Sold by private insurance companies</Text>
          <Text style={styles.paragraph}>• Helps pay for out-of-pocket costs in Original Medicare</Text>
          <Text style={styles.paragraph}>• Standardized plans labeled A-N</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Medigap Coverage Comparison</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: '#F0F0F0' }]}>
              <Text style={styles.tableCell}>Plan</Text>
              <Text style={styles.tableCell}>Key Benefits</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Plan F</Text>
              <Text style={styles.tableCell}>Most comprehensive coverage</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Plan G</Text>
              <Text style={styles.tableCell}>Covers almost everything except Part B deductible</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Plan N</Text>
              <Text style={styles.tableCell}>Lower premiums with some cost-sharing</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Alternative to Medigap: Medicare Advantage</Text>
          <Text style={styles.paragraph}>• All-in-one alternative to Original Medicare</Text>
          <Text style={styles.paragraph}>• Often includes prescription drug coverage</Text>
          <Text style={styles.paragraph}>• May have network restrictions</Text>
          <Text style={styles.paragraph}>• Can change plans annually</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Key Considerations</Text>
          <Text style={styles.paragraph}>1. Assess your healthcare needs</Text>
          <Text style={styles.paragraph}>2. Compare plan costs and coverage</Text>
          <Text style={styles.paragraph}>3. Consider your budget</Text>
          <Text style={styles.paragraph}>4. Best time to buy: During Medigap Open Enrollment</Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};