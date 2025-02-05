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
  coverageTable: {
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
  waitingPeriods: {
    backgroundColor: colors.gray[100],
    padding: spacing.lg,
    borderRadius: 4,
    marginTop: spacing.lg
  },
  networkInfo: {
    backgroundColor: colors.gray[100],
    padding: spacing.lg,
    borderRadius: 4,
    marginTop: spacing.lg
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

interface ServiceCoverage {
  category: string;
  service: string;
  coverage: string;
  waitingPeriod?: string;
  annualLimit?: string;
}

interface DentalPlan {
  name: string;
  type: string;
  monthlyPremium: string;
  annualDeductible: string;
  annualMaximum: string;
  preventiveCare: {
    coverage: string;
    services: string[];
  };
  basicCare: {
    coverage: string;
    services: string[];
    waitingPeriod?: string;
  };
  majorCare: {
    coverage: string;
    services: string[];
    waitingPeriod?: string;
  };
  orthodontics?: {
    coverage: string;
    lifetime_maximum?: string;
    age_limit?: string;
    waitingPeriod?: string;
  };
  additionalBenefits?: string[];
}

interface DentalInsuranceQuoteTemplateProps {
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  clientInfo: {
    name: string;
    dateOfBirth: string;
    address: string;
    phone: string;
    email: string;
    dependents?: Array<{
      name: string;
      dateOfBirth: string;
      relationship: string;
    }>;
  };
  plans: DentalPlan[];
  networkProviders?: string[];
  disclaimers: string[];
}

const DentalInsuranceQuoteTemplate: React.FC<DentalInsuranceQuoteTemplateProps> = ({
  quoteNumber,
  quoteDate,
  validUntil,
  clientInfo,
  plans,
  networkProviders,
  disclaimers
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <LogoPlaceholder />
        <View style={styles.headerContent}>
          <Text style={styles.title}>Dental Insurance Quote</Text>
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
        {clientInfo.dependents && clientInfo.dependents.length > 0 && (
          <>
            <Text style={styles.benefitsTitle}>Covered Dependents:</Text>
            {clientInfo.dependents.map((dependent, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.label}>{dependent.relationship}:</Text>
                <Text style={styles.value}>
                  {dependent.name} (DOB: {dependent.dateOfBirth})
                </Text>
              </View>
            ))}
          </>
        )}
      </View>

      {/* Plan Details */}
      {plans.map((plan, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.planBox}>
            <Text style={styles.planTitle}>{plan.name}</Text>
            
            {/* Basic Plan Information */}
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
              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Annual Maximum:</Text>
                <Text style={styles.costValue}>{plan.annualMaximum}</Text>
              </View>
            </View>

            {/* Coverage Details */}
            <View style={styles.benefitsSection}>
              <Text style={styles.benefitsTitle}>Preventive Care ({plan.preventiveCare.coverage})</Text>
              {plan.preventiveCare.services.map((service, idx) => (
                <View key={idx} style={styles.benefitItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.benefitText}>{service}</Text>
                </View>
              ))}

              <Text style={[styles.benefitsTitle, { marginTop: spacing.md }]}>
                Basic Care ({plan.basicCare.coverage})
                {plan.basicCare.waitingPeriod && ` - ${plan.basicCare.waitingPeriod} waiting period`}
              </Text>
              {plan.basicCare.services.map((service, idx) => (
                <View key={idx} style={styles.benefitItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.benefitText}>{service}</Text>
                </View>
              ))}

              <Text style={[styles.benefitsTitle, { marginTop: spacing.md }]}>
                Major Care ({plan.majorCare.coverage})
                {plan.majorCare.waitingPeriod && ` - ${plan.majorCare.waitingPeriod} waiting period`}
              </Text>
              {plan.majorCare.services.map((service, idx) => (
                <View key={idx} style={styles.benefitItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.benefitText}>{service}</Text>
                </View>
              ))}

              {plan.orthodontics && (
                <>
                  <Text style={[styles.benefitsTitle, { marginTop: spacing.md }]}>
                    Orthodontics ({plan.orthodontics.coverage})
                  </Text>
                  <View style={styles.benefitItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.benefitText}>
                      Lifetime Maximum: {plan.orthodontics.lifetime_maximum}
                    </Text>
                  </View>
                  {plan.orthodontics.age_limit && (
                    <View style={styles.benefitItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.benefitText}>
                        Age Limit: {plan.orthodontics.age_limit}
                      </Text>
                    </View>
                  )}
                  {plan.orthodontics.waitingPeriod && (
                    <View style={styles.benefitItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.benefitText}>
                        Waiting Period: {plan.orthodontics.waitingPeriod}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>

            {/* Additional Benefits */}
            {plan.additionalBenefits && plan.additionalBenefits.length > 0 && (
              <View style={styles.benefitsSection}>
                <Text style={styles.benefitsTitle}>Additional Benefits</Text>
                {plan.additionalBenefits.map((benefit, idx) => (
                  <View key={idx} style={styles.benefitItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}

      {/* Network Information */}
      {networkProviders && networkProviders.length > 0 && (
        <View style={styles.networkInfo}>
          <Text style={styles.benefitsTitle}>Network Providers</Text>
          <Text style={styles.benefitText}>
            Participating Providers: {networkProviders.join(', ')}
          </Text>
        </View>
      )}

      {/* Disclaimers */}
      <View style={styles.networkInfo}>
        <Text style={styles.benefitsTitle}>Important Information:</Text>
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
          Quote valid until {validUntil}. For complete coverage details, please refer to the plan document.
        </Text>
      </View>
    </Page>
  </Document>
);

export default DentalInsuranceQuoteTemplate;