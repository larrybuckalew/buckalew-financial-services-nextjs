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
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    marginBottom: 15
  }
});

export const WhenToEnrollGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>When to Enroll in Medicare</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>Understanding Medicare Enrollment Periods</Text>
          <Text style={styles.paragraph}>
            Timing is crucial when enrolling in Medicare. Missing your enrollment window can result in penalties and gaps in healthcare coverage.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Initial Enrollment Period (IEP)</Text>
          <Text style={styles.paragraph}>• 7-month window around your 65th birthday</Text>
          <Text style={styles.paragraph}>• 3 months before the month you turn 65</Text>
          <Text style={styles.paragraph}>• Month you turn 65</Text>
          <Text style={styles.paragraph}>• 3 months after the month you turn 65</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>General Enrollment Period</Text>
          <Text style={styles.paragraph}>• January 1 - March 31 each year</Text>
          <Text style={styles.paragraph}>• For those who missed their Initial Enrollment Period</Text>
          <Text style={styles.paragraph}>• Coverage starts July 1 of the same year</Text>
        </View>
        
        <View style={styles.warningBox}>
          <Text style={[styles.paragraph, { color: '#856404' }]}>
            Warning: Late enrollment can result in permanent penalties added to your Medicare premiums!
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Special Enrollment Periods</Text>
          <Text style={styles.paragraph}>Qualify if you have:</Text>
          <Text style={styles.paragraph}>• Employer group health coverage</Text>
          <Text style={styles.paragraph}>• Significant life changes</Text>
          <Text style={styles.paragraph}>• Loss of current health coverage</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Key Recommendations</Text>
          <Text style={styles.paragraph}>1. Mark your 65th birthday on the calendar</Text>
          <Text style={styles.paragraph}>2. Start researching 3 months before turning 65</Text>
          <Text style={styles.paragraph}>3. Consult with a Medicare specialist</Text>
          <Text style={styles.paragraph}>4. Don't miss your enrollment windows</Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};