import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes } from '@/styles/pdfTheme';
import { fontStyles } from '@/utils/pdfFonts';
import { LogoPlaceholder } from './components/LogoPlaceholder';

const styles = StyleSheet.create({
  page: {
    padding: spacing['4xl'],
    backgroundColor: 'white',
    color: colors.gray[800],
    fontSize: fontSizes.base,
    lineHeight: 1.5,
    ...fontStyles.regular
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
    paddingBottom: spacing.xl,
    borderBottom: `2px solid ${colors.primary[600]}`
  },
  headerContent: {
    flex: 1,
    marginLeft: spacing.xl
  },
  title: {
    fontSize: fontSizes['2xl'],
    ...fontStyles.bold,
    color: colors.primary[700],
    marginBottom: spacing.xs
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.gray[600]
  },
  quoteInfo: {
    backgroundColor: colors.primary[50],
    padding: spacing.xl,
    borderRadius: 4,
    marginBottom: spacing.xl
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm
  },
  label: {
    width: '35%',
    ...fontStyles.bold,
    color: colors.gray[700]
  },
  value: {
    flex: 1,
    color: colors.gray[800]
  },
  section: {
    marginBottom: spacing.xxl
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    ...fontStyles.bold,
    color: colors.primary[700],
    marginBottom: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottom: `1px solid ${colors.gray[200]}`
  },
  planBox: {
    backgroundColor: colors.gray[50],
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200]
  },
  planTitle: {
    fontSize: fontSizes.lg,
    ...fontStyles.bold,
    color: colors.primary[600],
    marginBottom: spacing.md
  },
  featureList: {
    marginTop: spacing.md
  },
  feature: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    alignItems: 'center'
  },
  featureText: {
    flex: 1,
    fontSize: fontSizes.sm
  },
  checkmark: {
    width: 12,
    marginRight: spacing.sm,
    color: colors.success[500]
  },
  pricing: {
    backgroundColor: colors.success[50],
    padding: spacing.md,
    borderRadius: 4,
    marginTop: spacing.md
  },
  priceText: {
    ...fontStyles.bold,
    fontSize: fontSizes.lg,
    color: colors.success[700],
    textAlign: 'center'
  },
  notes: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.gray[50],
    borderRadius: 4
  },
  noteTitle: {
    ...fontStyles.bold,
    marginBottom: spacing.sm,
    color: colors.gray[700]
  },
  noteText: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs
  },
  footer: {
    position: 'absolute',
    bottom: spacing['4xl'],
    left: spacing['4xl'],
    right: spacing['4xl'],
    borderTop: `1px solid ${colors.gray[200]}`,
    paddingTop: spacing.lg
  },
  footerText: {
    fontSize: fontSizes.xs,
    color: colors.gray[500],
    textAlign: 'center'
  }
});

interface QuoteTemplateProps {
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  clientName: string;
  clientInfo: {
    email: string;
    phone: string;
    address: string;
  };
  plans: Array<{
    name: string;
    carrier: string;
    type: string;
    coverage: string;
    premium: string;
    deductible: string;
    benefits: string[];
  }>;
  notes?: string[];
}

const QuoteTemplate: React.FC<QuoteTemplateProps> = ({
  quoteNumber,
  quoteDate,
  validUntil,
  clientName,
  clientInfo,
  plans,
  notes = []
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <LogoPlaceholder />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Insurance Quote</Text>
          <Text style={styles.subtitle}>Quote #{quoteNumber}</Text>
          <Text style={styles.subtitle}>{quoteDate}</Text>
        </View>
      </View>

      {/* Client Information */}
      <View style={styles.quoteInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Client Name:</Text>
          <Text style={styles.value}>{clientName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{clientInfo.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{clientInfo.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{clientInfo.address}</Text>
        </View>
      </View>

      {/* Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insurance Plans</Text>
        {plans.map((plan, index) => (
          <View key={index} style={styles.planBox}>
            <Text style={styles.planTitle}>{plan.name}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Insurance Carrier:</Text>
              <Text style={styles.value}>{plan.carrier}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Plan Type:</Text>
              <Text style={styles.value}>{plan.type}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Coverage Amount:</Text>
              <Text style={styles.value}>{plan.coverage}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Deductible:</Text>
              <Text style={styles.value}>{plan.deductible}</Text>
            </View>
            
            <View style={styles.pricing}>
              <Text style={styles.priceText}>Monthly Premium: {plan.premium}</Text>
            </View>

            <View style={styles.featureList}>
              {plan.benefits.map((benefit, idx) => (
                <View key={idx} style={styles.feature}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Notes */}
      <View style={styles.notes}>
        <Text style={styles.noteTitle}>Important Notes:</Text>
        {notes.map((note, index) => (
          <Text key={index} style={styles.noteText}>• {note}</Text>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Buckalew Financial Services | 844-779-7600 | Valid until {validUntil}
        </Text>
      </View>
    </Page>
  </Document>
);

export default QuoteTemplate;