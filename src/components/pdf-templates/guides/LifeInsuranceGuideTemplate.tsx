import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { fontStyles } from '@/utils/pdfFonts';
import { LogoPlaceholder } from '../components/LogoPlaceholder';

const styles = StyleSheet.create({
  page: {
    paddingVertical: 35,
    paddingHorizontal: 50,
    backgroundColor: '#FFFFFF',
    ...fontStyles.regular
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  mainTitle: {
    fontSize: 24,
    color: '#1a365d',
    ...fontStyles.bold,
    marginBottom: 10,
    textAlign: 'center'
  },
  intro: {
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 20,
    color: '#4A5568',
    textAlign: 'justify'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    ...fontStyles.bold,
    color: '#2D3748',
    marginBottom: 10,
    borderBottom: '1 solid #E2E8F0',
    paddingBottom: 5
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#4A5568'
  },
  boxedContent: {
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 4,
    marginBottom: 15
  },
  importantBox: {
    backgroundColor: '#EBF8FF',
    padding: 12,
    borderRadius: 4,
    marginBottom: 15,
    borderLeft: '3 solid #3182CE'
  },
  bulletList: {
    marginLeft: 15,
    marginTop: 8,
    marginBottom: 12
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8
  },
  bullet: {
    width: 15,
    fontSize: 11,
    color: '#3182CE'
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.6,
    color: '#4A5568'
  },
  numberList: {
    marginLeft: 15,
    marginTop: 8,
    marginBottom: 12
  },
  numberItem: {
    flexDirection: 'row',
    marginBottom: 10
  },
  number: {
    width: 20,
    fontSize: 11,
    color: '#3182CE',
    ...fontStyles.bold
  },
  numberText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.6,
    color: '#4A5568'
  },
  comparisonTable: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    ...fontStyles.bold,
    fontSize: 11,
    color: '#2D3748',
    textAlign: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 10,
    color: '#4A5568',
    textAlign: 'center'
  },
  highlightBox: {
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 4,
    marginBottom: 15
  },
  highlightText: {
    fontSize: 11,
    color: '#C53030',
    lineHeight: 1.6
  },
  ctaSection: {
    backgroundColor: '#2B6CB0',
    padding: 15,
    marginTop: 20,
    borderRadius: 4,
    textAlign: 'center'
  },
  ctaTitle: {
    color: 'white',
    fontSize: 14,
    ...fontStyles.bold,
    marginBottom: 8
  },
  ctaText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 1.6
  },
  footer: {
    position: 'absolute',
    bottom: 35,
    left: 50,
    right: 50,
    borderTop: '1 solid #E2E8F0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerText: {
    fontSize: 8,
    color: '#718096'
  },
  pageNumber: {
    fontSize: 8,
    color: '#718096'
  }
});

export const LifeInsuranceGuideTemplate = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <LogoPlaceholder />
        <Text style={styles.mainTitle}>Understanding Life Insurance</Text>
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.intro}>
          Life insurance is more than just a policy—it's a promise to protect your loved ones when 
          you're no longer there to provide for them. Whether you're a parent, spouse, or caregiver, 
          life insurance ensures that your family's financial needs are met, even in your absence. 
          In this guide, we'll break down everything you need to know about life insurance, from its 
          benefits to choosing the right policy for your needs.
        </Text>
      </View>

      {/* Why Is Life Insurance Important? */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Is Life Insurance Important?</Text>
        <View style={styles.boxedContent}>
          <Text style={styles.content}>
            Life insurance provides financial security to your beneficiaries after your passing. 
            Here's why it's so crucial:
          </Text>
          <View style={styles.numberList}>
            <View style={styles.numberItem}>
              <Text style={styles.number}>1.</Text>
              <View style={styles.numberText}>
                <Text style={[styles.content, styles.bold]}>Income Replacement</Text>
                <Text style={styles.content}>
                  If you're the primary breadwinner, life insurance can replace your income and 
                  ensure your family can maintain their standard of living.
                </Text>
              </View>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.number}>2.</Text>
              <View style={styles.numberText}>
                <Text style={[styles.content, styles.bold]}>Debt Repayment</Text>
                <Text style={styles.content}>
                  Outstanding debts don't disappear when you pass away. Life insurance can help cover 
                  these expenses, preventing your loved ones from being burdened.
                </Text>
              </View>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.number}>3.</Text>
              <View style={styles.numberText}>
                <Text style={[styles.content, styles.bold]}>Education Funding</Text>
                <Text style={styles.content}>
                  For parents, life insurance can fund your children's education, ensuring they have 
                  the resources to pursue their dreams.
                </Text>
              </View>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.number}>4.</Text>
              <View style={styles.numberText}>
                <Text style={[styles.content, styles.bold]}>Funeral Costs</Text>
                <Text style={styles.content}>
                  Funerals and related expenses can be costly. Life insurance helps alleviate this 
                  financial burden for your family during an already difficult time.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* How Does Life Insurance Work? */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How Does Life Insurance Work?</Text>
        <Text style={styles.content}>
          Life insurance is a contract between you (the policyholder) and an insurance company. 
          Here's how it works:
        </Text>
        <View style={styles.importantBox}>
          <View style={styles.numberList}>
            <View style={styles.numberItem}>
              <Text style={styles.number}>1.</Text>
              <Text style={styles.numberText}>
                Premium Payments: You pay regular premiums (monthly or annually) to keep the policy active.
              </Text>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.number}>2.</Text>
              <Text style={styles.numberText}>
                Death Benefit: When you pass away, the insurance company pays a lump-sum amount (the death benefit) 
                to your beneficiaries.
              </Text>
            </View>
            <View style={styles.numberItem}>
              <Text style={styles.number}>3.</Text>
              <Text style={styles.numberText}>
                Policy Types: There are two main types of life insurance:
              </Text>
            </View>
          </View>
          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Term Life Insurance: Provides coverage for a specific period (e.g., 10, 20, or 30 years). 
                It's affordable and straightforward.
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Permanent Life Insurance: Offers lifelong coverage and includes a savings component 
                called cash value.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Policy Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choosing the Right Policy</Text>
        <View style={styles.comparisonTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Feature</Text>
            <Text style={styles.tableHeaderCell}>Term Life</Text>
            <Text style={styles.tableHeaderCell}>Permanent Life</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Duration</Text>
            <Text style={styles.tableCell}>10-30 years</Text>
            <Text style={styles.tableCell}>Lifelong</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Cost</Text>
            <Text style={styles.tableCell}>More affordable</Text>
            <Text style={styles.tableCell}>Higher premiums</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Cash Value</Text>
            <Text style={styles.tableCell}>No</Text>
            <Text style={styles.tableCell}>Yes</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Best For</Text>
            <Text style={styles.tableCell}>Temporary needs</Text>
            <Text style={styles.tableCell}>Lifelong protection</Text>
          </View>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Protect Your Family's Future?</Text>
        <Text style={styles.ctaText}>
          Contact us today for a free consultation and personalized quote.
        </Text>
        <Text style={[styles.ctaText, { marginTop: 8 }]}>
          Call: 844-779-7600 | Email: support@buckalewfinancialservices.com
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} Buckalew Financial Services. All rights reserved.
        </Text>
        <Text style={styles.pageNumber}>Page 1 of 1</Text>
      </View>
    </Page>
  </Document>
);

export default LifeInsuranceGuideTemplate;