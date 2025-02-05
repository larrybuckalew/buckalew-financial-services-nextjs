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

export const PreventiveCareGuide = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Preventive Care Matters</Text>
        
        <View style={styles.section}>
          <Text style={styles.title}>What is Preventive Care?</Text>
          <Text style={styles.paragraph}>
            Preventive care involves health services that help you stay healthy and catch potential health issues early, potentially saving you significant medical costs and improving your overall well-being.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Benefits of Preventive Care</Text>
          <Text style={styles.paragraph}>1. Early Detection of Health Issues</Text>
          <Text style={styles.paragraph}>2. Lower Long-Term Healthcare Costs</Text>
          <Text style={styles.paragraph}>3. Improved Quality of Life</Text>
          <Text style={styles.paragraph}>4. Reduced Risk of Serious Medical Conditions</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Essential Preventive Services</Text>
          <Text style={styles.paragraph}>• Annual Physical Exams</Text>
          <Text style={styles.paragraph}>• Vaccinations</Text>
          <Text style={styles.paragraph}>• Cancer Screenings</Text>
          <Text style={styles.paragraph}>• Blood Pressure and Cholesterol Checks</Text>
          <Text style={styles.paragraph}>• Mental Health Screenings</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.title}>Maximizing Preventive Care Coverage</Text>
          <Text style={styles.paragraph}>1. Understand Your Insurance Benefits</Text>
          <Text style={styles.paragraph}>2. Schedule Regular Check-ups</Text>
          <Text style={styles.paragraph}>3. Maintain a Healthy Lifestyle</Text>
          <Text style={styles.paragraph}>4. Keep Detailed Medical Records</Text>
        </View>
        
        <Text style={[styles.paragraph, { textAlign: 'center', marginTop: 20 }]}>
          Brought to you by Buckalew Financial Services
          Contact us at 844-779-7600
        </Text>
      </Page>
    </Document>
  );
};