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
  planGrid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  planBox: {
    flex: 1,
    backgroundColor: colors.gray[50],
    padding: spacing.lg,
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
  costRow: {
    marginTop: spacing.lg,
    backgroundColor: colors.success[50],
    padding: spacing.md,
    borderRadius: 4
  },
  costLabel: {
    ...fontStyles.bold,
    color: colors.success[700],
    marginBottom: spacing.xs
  },
  costValue: {
    fontSize: fontSizes.xl,
    ...fontStyles.bold,
    color: colors.success[700],
    textAlign: 'center'
  },
  benefitsSection: {
    marginTop: spacing.lg,
  },
  benefitsTitle: {
    ...fontStyles.bold,
    color: colors.primary[600],
    marginBottom: spacing.sm
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
  comparisonTable: {
    marginTop: spacing.xl,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary[50],
    padding: spacing.md,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  tableHeaderCell: {
    flex: 1,
    ...fontStyles.bold,
    color: colors.primary[700],
    textAlign: 'center',
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
  networkInfo: {
    backgroundColor: colors.gray[100],
    padding: spacing.lg,
    borderRadius: 4,
    marginTop: spacing.xl
  },
  networkTitle: {
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

interface CoverageDetail {
  category: string;
  inNetwork: string;
  outNetwork: string;
}

interface Plan {
  name: string;
  type: string;
  premium: string;
  deductible: string;
  outOfPocket: string;
  benefits: string[];
  coverage: CoverageDetail[];
}

interface HealthInsuranceQuoteTemplateProps {
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  clientInfo: {
    name: string;
    age: number;
    gender: string;
    address: string;
    county: string;
    phone: string;
    email: string;
    dependents?: Array<{
      name: string;
      age: number;
      relationship: string;
    }>;
  };
  plans: Plan[];
  networkDetails: {
    providers: string[];
    hospitals: string[];
    pharmacies: string[];
  };
  disclaimers: string[];
}

const HealthInsuranceQuoteTemplate: React.FC<HealthInsuranceQuoteTemplateProps> = ({
  quoteNumber,
  quoteDate,
  validUntil,
  clientInfo,
  plans,
  networkDetails,
  disclaimers
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <LogoPlaceholder />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Health Insurance Quote</Text>
          <Text style={styles.subtitle}>Quote #{quoteNumber}</Text>
          <Text style={styles.subtitle}>{quoteDate}</Text>
        </View>
      </View>

      {/* Client Information */}
      <View style={styles.quoteInfo}>
        <Text style={styles.sectionTitle}>Client Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{clientInfo.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{clientInfo.age}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{clientInfo.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>County:</Text>
          <Text style={styles.value}>{clientInfo.county}</Text>
        </View>
        {clientInfo.dependents && clientInfo.dependents.length > 0 && (
          <>
            <Text style={styles.benefitsTitle}>Covered Dependents:</Text>
            {clientInfo.dependents.map((dependent, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.label}>{dependent.relationship}:</Text>
                <Text style={styles.value}>
                  {dependent.name} (Age: {dependent.age})
                </Text>
              </View>
            ))}
          </>
        )}
      </View>

      {/* Plan Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Plans</Text>
        <View style={styles.planGrid}>
          {plans.map((plan, index) => (
            <View key={index} style={styles.planBox}>
              <Text style={styles.planTitle}>{plan.name}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Plan Type:</Text>
                <Text style={styles.value}>{plan.type}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Deductible:</Text>
                <Text style={styles.value}>{plan.deductible}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Out of Pocket Max:</Text>
                <Text style={styles.value}>{plan.outOfPocket}</Text>
              </View>

              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Monthly Premium</Text>
                <Text style={styles.costValue}>{plan.premium}</Text>
              </View>

              <View style={styles.benefitsSection}>
                <Text style={styles.benefitsTitle}>Key Benefits</Text>
                {plan.benefits.map((benefit, idx) => (
                  <View key={idx} style={styles.benefitItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Coverage Details Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coverage Details</Text>
        <View style={styles.comparisonTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Service</Text>
            <Text style={styles.tableHeaderCell}>In-Network</Text>
            <Text style={styles.tableHeaderCell}>Out-of-Network</Text>
          </View>
          {plans[0].coverage.map((detail, index) => (
            <View 
              key={index} 
              style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? 'white' : colors.gray[50] }
              ]}
            >
              <Text style={[styles.tableCell, { flex: 2, textAlign: 'left' }]}>
                {detail.category}
              </Text>
              <Text style={styles.tableCell}>{detail.inNetwork}</Text>
              <Text style={styles.tableCell}>{detail.outNetwork}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Network Information */}
      <View style={styles.networkInfo}>
        <Text style={styles.networkTitle}>Network Information</Text>
        <View style={styles.benefitItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.benefitText}>
            Top Providers: {networkDetails.providers.join(', ')}
          </Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.benefitText}>
            Hospitals: {networkDetails.hospitals.join(', ')}
          </Text>
        </View>
        <View style={styles.benefitItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.benefitText}>
            Pharmacies: {networkDetails.pharmacies.join(', ')}
          </Text>
        </View>
      </View>

      {/* Footer with disclaimers */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {disclaimers.map((disclaimer, index) => (
            `${disclaimer}${index < disclaimers.length - 1 ? ' | ' : ''}`
          ))}
          {'\n'}Quote valid until {validUntil}
        </Text>
      </View>
    </Page>
  </Document>
);

export default HealthInsuranceQuoteTemplate;