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
  policyCard: {
    backgroundColor: colors.primary[50],
    padding: spacing.xl,
    borderRadius: 4,
    marginBottom: spacing.xl,
    borderLeft: `4px solid ${colors.primary[600]}`
  },
  statusBadge: {
    backgroundColor: colors.success[50],
    color: colors.success[700],
    padding: spacing.sm,
    borderRadius: 4,
    ...fontStyles.bold,
    alignSelf: 'flex-start',
    marginBottom: spacing.md
  },
  policyInfo: {
    backgroundColor: colors.gray[50],
    padding: spacing.xl,
    borderRadius: 4,
    marginBottom: spacing.xl
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
  infoBlock: {
    marginBottom: spacing.lg
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
  benefitsSection: {
    backgroundColor: colors.gray[50],
    padding: spacing.xl,
    borderRadius: 4,
    marginBottom: spacing.xl
  },
  benefitTitle: {
    fontSize: fontSizes.lg,
    ...fontStyles.bold,
    color: colors.primary[600],
    marginBottom: spacing.md
  },
  benefitDescription: {
    color: colors.gray[600],
    marginBottom: spacing.md
  },
  bulletList: {
    marginLeft: spacing.lg
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: spacing.xs
  },
  bullet: {
    width: 15,
    color: colors.primary[500]
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.sm
  },
  premiumCard: {
    backgroundColor: colors.success[50],
    padding: spacing.xl,
    borderRadius: 4,
    marginBottom: spacing.xl
  },
  premiumTitle: {
    fontSize: fontSizes.lg,
    ...fontStyles.bold,
    color: colors.success[700],
    marginBottom: spacing.md
  },
  premiumInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm
  },
  premiumLabel: {
    ...fontStyles.bold,
    color: colors.gray[700]
  },
  premiumValue: {
    fontSize: fontSizes.xl,
    ...fontStyles.bold,
    color: colors.success[700]
  },
  importantNotes: {
    backgroundColor: colors.gray[50],
    padding: spacing.xl,
    borderRadius: 4,
    marginBottom: spacing.xl
  },
  noteTitle: {
    ...fontStyles.bold,
    color: colors.gray[700],
    marginBottom: spacing.md
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

interface PolicySummaryTemplateProps {
  policyNumber: string;
  status: 'Active' | 'Pending' | 'Expired';
  effectiveDate: string;
  expirationDate: string;
  policyHolder: {
    name: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
  };
  coverage: {
    type: string;
    amount: string;
    details: Array<{
      label: string;
      value: string;
    }>;
  };
  beneficiaries: Array<{
    name: string;
    relationship: string;
    percentage: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    items: string[];
  }>;
  premium: {
    amount: string;
    frequency: string;
    nextDue: string;
    paymentMethod: string;
  };
  riders: Array<{
    name: string;
    coverage: string;
    premium: string;
  }>;
  exclusions: string[];
  notes: string[];
}

const PolicySummaryTemplate: React.FC<PolicySummaryTemplateProps> = ({
  policyNumber,
  status,
  effectiveDate,
  expirationDate,
  policyHolder,
  coverage,
  beneficiaries,
  benefits,
  premium,
  riders,
  exclusions,
  notes
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <LogoPlaceholder />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Policy Summary</Text>
          <Text style={styles.subtitle}>Policy #{policyNumber}</Text>
        </View>
      </View>

      {/* Policy Status Card */}
      <View style={styles.policyCard}>
        <Text style={styles.statusBadge}>{status}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Effective Date:</Text>
          <Text style={styles.value}>{effectiveDate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Expiration Date:</Text>
          <Text style={styles.value}>{expirationDate}</Text>
        </View>
      </View>

      {/* Policyholder Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Policyholder Information</Text>
        <View style={styles.policyInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{policyHolder.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>{policyHolder.dob}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{policyHolder.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{policyHolder.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{policyHolder.email}</Text>
          </View>
        </View>
      </View>

      {/* Coverage Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coverage Details</Text>
        <View style={styles.policyInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Coverage Type:</Text>
            <Text style={styles.value}>{coverage.type}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Coverage Amount:</Text>
            <Text style={styles.value}>{coverage.amount}</Text>
          </View>
          {coverage.details.map((detail, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.label}>{detail.label}:</Text>
              <Text style={styles.value}>{detail.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Beneficiaries */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beneficiaries</Text>
        <View style={styles.policyInfo}>
          {beneficiaries.map((beneficiary, index) => (
            <View key={index} style={styles.infoBlock}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{beneficiary.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Relationship:</Text>
                <Text style={styles.value}>{beneficiary.relationship}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Percentage:</Text>
                <Text style={styles.value}>{beneficiary.percentage}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Premium Information */}
      <View style={styles.premiumCard}>
        <Text style={styles.premiumTitle}>Premium Information</Text>
        <View style={styles.premiumInfo}>
          <Text style={styles.premiumLabel}>{premium.frequency} Premium:</Text>
          <Text style={styles.premiumValue}>{premium.amount}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Next Due Date:</Text>
          <Text style={styles.value}>{premium.nextDue}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{premium.paymentMethod}</Text>
        </View>
      </View>

      {/* Benefits */}
      {benefits.map((benefit, index) => (
        <View key={index} style={styles.benefitsSection}>
          <Text style={styles.benefitTitle}>{benefit.title}</Text>
          <Text style={styles.benefitDescription}>{benefit.description}</Text>
          <View style={styles.bulletList}>
            {benefit.items.map((item, idx) => (
              <View key={idx} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Riders */}
      {riders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policy Riders</Text>
          <View style={styles.policyInfo}>
            {riders.map((rider, index) => (
              <View key={index} style={styles.infoBlock}>
                <Text style={styles.benefitTitle}>{rider.name}</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Coverage:</Text>
                  <Text style={styles.value}>{rider.coverage}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Additional Premium:</Text>
                  <Text style={styles.value}>{rider.premium}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Exclusions */}
      {exclusions.length > 0 && (
        <View style={styles.importantNotes}>
          <Text style={styles.noteTitle}>Policy Exclusions:</Text>
          {exclusions.map((exclusion, index) => (
            <Text key={index} style={styles.noteText}>• {exclusion}</Text>
          ))}
        </View>
      )}

      {/* Important Notes */}
      {notes.length > 0 && (
        <View style={styles.importantNotes}>
          <Text style={styles.noteTitle}>Important Notes:</Text>
          {notes.map((note, index) => (
            <Text key={index} style={styles.noteText}>• {note}</Text>
          ))}
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Contact us: 844-779-7600 | support@buckalewfinancialservices.com{'\n'}
          This document is a summary of your policy. Please refer to your policy contract for complete details.
        </Text>
      </View>
    </Page>
  </Document>
);

export default PolicySummaryTemplate;