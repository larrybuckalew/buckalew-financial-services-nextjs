import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, lineHeights, borders } from '@/styles/pdfTheme';

const styles = StyleSheet.create({
  page: {
    padding: spacing['4xl'],
    backgroundColor: colors.gray[50],
    color: colors.gray[800],
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontFamily: 'Inter'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
    paddingBottom: spacing.xl,
    borderBottom: borders.thick
  },
  logo: {
    width: 180,
    height: 'auto'
  },
  headerContent: {
    textAlign: 'right'
  },
  title: {
    fontSize: fontSizes['2xl'],
    fontWeight: 700,
    color: colors.primary[700],
    marginBottom: spacing.xs
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.gray[600]
  },
  section: {
    marginBottom: spacing.xxl
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 700,
    color: colors.primary[700],
    marginBottom: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottom: borders.thin
  },
  featureBox: {
    backgroundColor: 'white',
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200]
  },
  featureTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 600,
    color: colors.primary[600],
    marginBottom: spacing.sm
  },
  featureDescription: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.md
  },
  comparison: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.md
  },
  planColumn: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200]
  },
  planTitle: {
    fontSize: fontSizes.md,
    fontWeight: 600,
    color: colors.primary[700],
    textAlign: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottom: borders.thin
  },
  planPrice: {
    fontSize: fontSizes.xl,
    fontWeight: 700,
    color: colors.primary[600],
    textAlign: 'center',
    marginBottom: spacing.sm
  },
  featureList: {
    marginTop: spacing.md
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
    alignItems: 'center'
  },
  checkmark: {
    width: spacing.md,
    height: spacing.md,
    marginRight: spacing.sm,
    color: colors.success[500]
  },
  featureText: {
    flex: 1,
    fontSize: fontSizes.sm
  },
  highlights: {
    marginTop: spacing.xl
  },
  highlightRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.md
  },
  highlightBox: {
    flex: 1,
    backgroundColor: colors.primary[50],
    padding: spacing.lg,
    borderRadius: 4
  },
  highlightTitle: {
    fontSize: fontSizes.md,
    fontWeight: 600,
    color: colors.primary[700],
    marginBottom: spacing.sm
  },
  highlightText: {
    fontSize: fontSizes.sm,
    color: colors.primary[600]
  },
  exampleBox: {
    backgroundColor: colors.gray[100],
    padding: spacing.xl,
    borderRadius: 4,
    marginTop: spacing.xl
  },
  exampleTitle: {
    fontSize: fontSizes.md,
    fontWeight: 600,
    color: colors.gray[700],
    marginBottom: spacing.md
  },
  exampleContent: {
    fontSize: fontSizes.sm,
    color: colors.gray[600]
  },
  table: {
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary[50],
    padding: spacing.md
  },
  tableHeaderCell: {
    flex: 1,
    color: colors.primary[700],
    fontWeight: 600,
    fontSize: fontSizes.sm
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    backgroundColor: 'white'
  },
  tableCell: {
    flex: 1,
    padding: spacing.md,
    fontSize: fontSizes.sm
  },
  footer: {
    position: 'absolute',
    bottom: spacing['4xl'],
    left: spacing['4xl'],
    right: spacing['4xl'],
    borderTop: borders.thin,
    paddingTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerText: {
    fontSize: fontSizes.xs,
    color: colors.gray[500]
  },
  chart: {
    width: '100%',
    height: 200,
    marginVertical: spacing.xl,
  }
});

interface BenefitComparison {
  feature: string;
  basic: boolean;
  premium: boolean;
  elite: boolean;
}

interface PlanDetails {
  name: string;
  price: string;
  features: string[];
}

interface BenefitsGuideProps {
  title: string;
  subtitle?: string;
  introduction: string;
  keyFeatures: Array<{
    title: string;
    description: string;
  }>;
  plans: PlanDetails[];
  comparisons: BenefitComparison[];
  examples: Array<{
    title: string;
    content: string;
  }>;
  highlights: Array<{
    title: string;
    content: string;
  }>;
}

const BenefitsGuideTemplate: React.FC<BenefitsGuideProps> = ({
  title,
  subtitle,
  introduction,
  keyFeatures,
  plans,
  comparisons,
  examples,
  highlights
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          src="/images/logo.png" 
          style={styles.logo}
        />
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.featureDescription}>{introduction}</Text>
      </View>

      {/* Key Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        {keyFeatures.map((feature, index) => (
          <View key={index} style={styles.featureBox}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>

      {/* Plan Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plan Comparison</Text>
        <View style={styles.comparison}>
          {plans.map((plan, index) => (
            <View key={index} style={styles.planColumn}>
              <Text style={styles.planTitle}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <View style={styles.featureList}>
                {plan.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Text style={styles.checkmark}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Detailed Comparison Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Feature</Text>
          <Text style={styles.tableHeaderCell}>Basic</Text>
          <Text style={styles.tableHeaderCell}>Premium</Text>
          <Text style={styles.tableHeaderCell}>Elite</Text>
        </View>
        {comparisons.map((comparison, index) => (
          <View key={index} style={[
            styles.tableRow,
            { backgroundColor: index % 2 === 0 ? 'white' : colors.gray[50] }
          ]}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{comparison.feature}</Text>
            <Text style={styles.tableCell}>{comparison.basic ? '✓' : '–'}</Text>
            <Text style={styles.tableCell}>{comparison.premium ? '✓' : '–'}</Text>
            <Text style={styles.tableCell}>{comparison.elite ? '✓' : '–'}</Text>
          </View>
        ))}
      </View>

      {/* Examples */}
      {examples.map((example, index) => (
        <View key={index} style={styles.exampleBox}>
          <Text style={styles.exampleTitle}>{example.title}</Text>
          <Text style={styles.exampleContent}>{example.content}</Text>
        </View>
      ))}

      {/* Highlights */}
      <View style={styles.highlights}>
        <View style={styles.highlightRow}>
          {highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightBox}>
              <Text style={styles.highlightTitle}>{highlight.title}</Text>
              <Text style={styles.highlightText}>{highlight.content}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Buckalew Financial Services | 844-779-7600
        </Text>
        <Text style={styles.footerText}>Page 1 of 1</Text>
      </View>
    </Page>
  </Document>
);

export default BenefitsGuideTemplate;