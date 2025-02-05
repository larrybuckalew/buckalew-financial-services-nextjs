import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register professional fonts
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: '/fonts/Montserrat-Regular.ttf' },
    { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/Montserrat-Light.ttf', fontWeight: 'light' },
    { src: '/fonts/Montserrat-Medium.ttf', fontWeight: 'medium' },
  ]
});

Font.register({
  family: 'Merriweather',
  fonts: [
    { src: '/fonts/Merriweather-Regular.ttf' },
    { src: '/fonts/Merriweather-Bold.ttf', fontWeight: 'bold' },
  ]
});

const colors = {
  primary: '#1a365d',    // Deep blue
  secondary: '#2c5282',  // Medium blue
  accent: '#3182ce',     // Light blue
  text: {
    primary: '#2d3748',  // Dark gray
    secondary: '#4a5568', // Medium gray
    light: '#718096',    // Light gray
  },
  background: {
    primary: '#ffffff',  // White
    secondary: '#f7fafc', // Very light gray
    accent: '#ebf8ff',   // Very light blue
  }
};

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: colors.background.primary,
    fontFamily: 'Montserrat',
  },
  coverPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: 50,
    backgroundColor: colors.background.primary,
  },
  coverContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  header: {
    marginBottom: 40,
    borderBottom: `2 solid ${colors.primary}`,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Merriweather',
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: 20,
    fontWeight: 'light',
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: colors.text.light,
    marginTop: 20,
  },
  tableOfContents: {
    marginTop: 40,
    marginBottom: 40,
    padding: 20,
    backgroundColor: colors.background.accent,
    borderRadius: 5,
  },
  tocTitle: {
    fontSize: 24,
    fontFamily: 'Merriweather',
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    borderBottom: `1 solid ${colors.primary}`,
    paddingBottom: 10,
  },
  tocItem: {
    marginBottom: 12,
    color: colors.text.secondary,
    fontSize: 14,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Merriweather',
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    paddingTop: 15,
    borderBottom: `1 solid ${colors.accent}`,
    paddingBottom: 10,
  },
  text: {
    marginBottom: 15,
    color: colors.text.primary,
    fontSize: 12,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  list: {
    marginLeft: 20,
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 8,
    fontSize: 12,
    color: colors.text.primary,
    lineHeight: 1.4,
  },
  bulletPoint: {
    color: colors.accent,
    marginRight: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTop: `1 solid ${colors.text.light}`,
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    color: colors.text.light,
    fontSize: 10,
    flex: 1,
  },
  pageNumber: {
    fontSize: 10,
    color: colors.text.light,
  },
  disclaimer: {
    fontSize: 8,
    color: colors.text.light,
    marginTop: 20,
    fontStyle: 'italic',
  },
  callout: {
    backgroundColor: colors.background.accent,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    borderLeft: `4 solid ${colors.accent}`,
  },
  calloutText: {
    color: colors.text.primary,
    fontSize: 12,
    fontStyle: 'italic',
  },
});

interface GuideTemplateProps {
  title: string;
  content: {
    sections: {
      title: string;
      content: string[];
      bullets?: string[];
      callout?: string;
    }[];
  };
}

const GuideTemplate: React.FC<GuideTemplateProps> = ({ title, content }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverContent}>
          <Image
            src="/images/logo.png"
            style={styles.logo}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            Professional Insurance Guidance{'\n'}
            You Can Trust
          </Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.contactInfo}>
            Buckalew Financial Services{'\n'}
            3031 Mojave Oak Dr, Valrico, FL 33594{'\n'}
            844-779-7600 | larry@buckalewfinancialservices.com
          </Text>
        </View>
      </Page>

      {/* Table of Contents */}
      <Page size="A4" style={styles.page}>
        <View style={styles.tableOfContents}>
          <Text style={styles.tocTitle}>Contents</Text>
          {content.sections.map((section, index) => (
            <Text key={index} style={styles.tocItem}>
              {index + 1}. {section.title}
            </Text>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.contactInfo}>Buckalew Financial Services</Text>
          <Text style={styles.pageNumber}>2</Text>
        </View>
      </Page>

      {/* Content Pages */}
      {content.sections.map((section, sectionIndex) => (
        <Page key={sectionIndex} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {sectionIndex + 1}. {section.title}
            </Text>
            
            {section.content.map((paragraph, pIndex) => (
              <Text key={pIndex} style={styles.text}>
                {paragraph}
              </Text>
            ))}
            
            {section.bullets && (
              <View style={styles.list}>
                {section.bullets.map((bullet, bIndex) => (
                  <Text key={bIndex} style={styles.listItem}>
                    <Text style={styles.bulletPoint}>•</Text> {bullet}
                  </Text>
                ))}
              </View>
            )}

            {section.callout && (
              <View style={styles.callout}>
                <Text style={styles.calloutText}>{section.callout}</Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.contactInfo}>Buckalew Financial Services</Text>
            <Text style={styles.pageNumber}>{sectionIndex + 3}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GuideTemplate;