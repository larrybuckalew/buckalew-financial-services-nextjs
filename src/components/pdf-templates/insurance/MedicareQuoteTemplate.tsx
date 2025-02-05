import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, fontSizes } from '@/styles/pdfTheme';
import { fontStyles } from '@/utils/pdfFonts';
import { LogoPlaceholder } from '../components/LogoPlaceholder';

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
    alignItems: 'flex-start',
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
    marginBottom: spacing.xl,
    borderLeft: `4px solid ${colors.primary[600]}`
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm
  },
  label: {
    width: '40%',
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
    marginBottom: spacing.xl,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200]
  },
  planTitle: {
    fontSize: fontSizes.lg,
    ...fontStyles.bold,
    color: colors.primary[600],
    marginBottom: spacing.md,
    textAlign: 'center',
    backgroundColor: colors.primary[50],
    padding: spacing.md,
    borderRadius: 4
  },
  planGrid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  benefitsSection: {
    marginTop: spacing.lg
  },
  benefitsTitle: {
    fontSize: fontSizes.md,
    ...fontStyles.bold,
    color: colors.primary[600],
    marginBottom: spacing.sm
  },
  benefitList: {
    marginLeft: spacing.md
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs
  },
  bullet: {
    width: 15,
    color: colors.primary[500]
  },
  benefitText: {
    flex: 1,
    fontSize: fontSizes.sm
  },
  costBreakdown: {
    backgroundColor: colors.success[50],
    padding: spacing.lg,
    borderRadius: 4,
    marginTop: spacing.lg
  },
  costTitle: {
    fontSize: fontSizes.md,
    ...fontStyles.bold,
    color: colors.success[700],
    marginBottom: spacing.sm
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs
  },
  costLabel: {
    color: colors.success[700]
  },
  costValue: {
    ...fontStyles.bold,
    color: colors.success[700]
  },
  comparisonTable: {
    marginTop: spacing.xl
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary[50],
    padding: spacing.md
  },
  tableHeaderCell: {
    flex: 1,
    ...fontStyles.bold,
    color: colors.primary[700],
    textAlign: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200]
  },
  tableCell: {
    flex: 1,
    padding: spacing.md,
    fontSize: fontSizes.sm,
    textAlign: 'center'
  },
  importantNotes: {
    backgroundColor: colors.gray[100],
    padding: spacing.lg,
    borderRadius: 4,
    marginTop: spacing.xl
  },
  noteTitle: {
    ...fontStyles.bold,
    color: colors.gray[700],
    marginBottom: spacing.sm
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

interface MedicarePlan {
  name: string;
  type: 'Original Medicare' | 'Medicare Advantage' | 'Medicare Supplement' | 'Part D';
  monthlyPremium: string;
  annualDeductible: string;
  coverage: Array<{
    service: string;
    coverage: string;
    notes?: string;
  }>;
  benefits: string[];
  restrictions?: string[];
}

interface MedicareQuoteTemplateProps {
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  clientInfo: {
    name: string;
    dateOfBirth: string;
    medicareNumber?: string;
    partAEffectiveDate?: string;
    partBEffectiveDate?: string;
    address: string;
    phone: string;
    email: string;
  };
  plans: MedicarePlan[];
  networkInfo?: {
    providers: string[];
    hospitals: string[];
    pharmacies: string[];
  };
  prescriptionDrugs?: Array<{
    name: string;
    tier: string;
    copay: string;
  }>;
  disclaimers: string[];
}

const MedicareQuoteTemplate: React.FC<MedicareQuoteTemplateProps> = ({
  quoteNumber,
  quoteDate,
  validUntil,
  clientInfo,
  plans,
  networkInfo,
  prescriptionDrugs,
  disclaimers
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <LogoPlaceholder />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Medicare Insurance Quote</Text>
          <Text style={styles.subtitle}>Quote #{quoteNumber}</Text>
          <Text style={styles.subtitle}>{quoteDate}</Text>
        </View>
      </View>

      {/* Client Information */}
      <View style={styles.quoteInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{clientInfo.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{clientInfo.dateOfBirth}</Text>
        </View>
        {clientInfo.medicareNumber && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Medicare Number:</Text>
            <Text style={styles.value}>{clientInfo.medicareNumber}</Text>
          </View>
        )}
        {clientInfo.partAEffectiveDate && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Part A Effective Date:</Text>
            <Text style={styles.value}>{clientInfo.partAEffectiveDate}</Text>
          </View>
        )}
        {clientInfo.partBEffectiveDate && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Part B Effective Date:</Text>
            <Text style={styles.value}>{clientInfo.partBEffectiveDate}</Text>
          </View>
        )}
      </View>

      {/* Plan Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plan Options</Text>
        {plans.map((plan, index) => (
          <View key={index} style={styles.planBox}>
            <Text style={styles.planTitle}>{plan.name}</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Plan Type:</Text>
              <Text style={styles.value}>{plan.type}</Text>
            </View>
            
            <View style={styles.costBreakdown}>
              <Text style={styles.costTitle}>Cost Information</Text>
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Monthly Premium:</Text>
                <Text style={styles.costValue}>{plan.monthlyPremium}</Text>
              </View>
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Annual Deductible:</Text>
                <Text style={styles.costValue}>{plan.annualDeductible}</Text>
              </View>
            </View>

            <View style={styles.benefitsSection}>
              <Text style={styles.benefitsTitle}>Coverage Details</Text>
              {plan.coverage.map((item, idx) => (
                <View key={idx} style={styles.infoRow}>
                  <Text style={styles.label}>{item.service}:</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.value}>{item.coverage}</Text>
                    {item.notes && (
                      <Text style={[styles.benefitText, { fontStyle: 'italic' }]}>
                        {item.notes}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.benefitsSection}>
              <Text style={styles.benefitsTitle}>Additional Benefits</Text>
              {plan.benefits.map((benefit, idx) => (
                <View key={idx} style={styles.benefitItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>

            {plan.restrictions && (
              <View style={[styles.benefitsSection, { marginTop: spacing.md }]}>
                <Text style={[styles.benefitsTitle, { color: colors.gray[700] }]}>
                  Important Notes
                </Text>
                {plan.restrictions.map((restriction, idx) => (
                  <View key={idx} style={styles.benefitItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={[styles.benefitText, { color: colors.gray[600] }]}>
                      {restriction}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Prescription Drug Coverage */}
      {prescriptionDrugs && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prescription Drug Coverage</Text>
          <View style={styles.comparisonTable}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Medication</Text>
              <Text style={styles.tableHeaderCell}>Tier</Text>
              <Text style={styles.tableHeaderCell}>Copay</Text>
            </View>
            {prescriptionDrugs.map((drug, index) => (
              <View 
                key={index} 
                style={[
                  styles.tableRow,
                  { backgroundColor: index % 2 === 0 ? 'white' : colors.gray[50] }
                ]}
              >
                <Text style={[styles.tableCell, { flex: 2, textAlign: 'left' }]}>
                  {drug.name}
                </Text>
                <Text style={styles.tableCell}>{drug.tier}</Text>
                <Text style={styles.tableCell}>{drug.copay}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Network Information */}
      {networkInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network Information</Text>
          <View style={styles.planBox}>
            <View style={styles.benefitItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>
                Participating Providers: {networkInfo.providers.join(', ')}
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>
                Network Hospitals: {networkInfo.hospitals.join(', ')}
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.benefitText}>
                Preferred Pharmacies: {networkInfo.pharmacies.join(', ')}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Important Notes and Disclaimers */}
      <View style={styles.importantNotes}>
        <Text style={styles.noteTitle}>Important Information:</Text>
        {disclaimers.map((disclaimer, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.benefitText}>{disclaimer}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Buckalew Financial Services | 844-779-7600{'\n'}
          Quote valid until {validUntil}. For full plan details, please refer to the Summary of Benefits.
        </Text>
      </View>
    </Page>
  </Document>
);

export default MedicareQuoteTemplate;