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

export const Medicare101Guide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Medicare 101: A Beginner's Guide</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>What is Medicare?</Text>
          <Text style={styles.paragraph}>
            Medicare is a federal health insurance program primarily designed for people 65 and older, but also covering some younger individuals with specific disabilities or conditions.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Medicare Parts Breakdown</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: '#F0F0F0' }]}>
              <Text style={styles.tableCell}>Part</Text>
              <Text style={styles.tableCell}>Coverage</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Part A</Text>
              <Text style={styles.tableCell}>Hospital Insurance (Inpatient Care)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Part B</Text>
              <Text style={styles.tableCell}>Medical Insurance (Outpatient Care)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Part C (Medicare Advantage)</Text>
              <Text style={styles.tableCell}>Alternative to Original Medicare</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Part D</Text>
              <Text style={styles.tableCell}>Prescription Drug Coverage</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Key Eligibility Requirements</Text>
          <Text style={styles.paragraph}>1. Age 65 or older</Text>
          <Text style={styles.paragraph}>2. Under 65 with specific disabilities</Text>
          <Text style={styles.paragraph}>3. Diagnosed with End-Stage Renal Disease</Text>
          <Text style={styles.paragraph}>4. Receiving Social Security Disability benefits</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Enrollment Basics</Text>
          <Text style={styles.paragraph}>• Initial Enrollment Period: 3 months before, month of, and 3 months after turning 65</Text>
          <Text style={styles.paragraph}>• General Enrollment Period: January 1 - March 31 each year</Text>
          <Text style={styles.paragraph}>• Special Enrollment Periods for specific life events</Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};