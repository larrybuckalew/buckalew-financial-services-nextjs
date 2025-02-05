import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { colors, spacing, fontSizes, lineHeights, borders } from '@/styles/pdfTheme';
import { ComparisonChart, BarChart, PieChart } from './components/ChartComponents';

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
  headerContent: {
    flex: 1,
    marginLeft: spacing.xl
  },
  logo: {
    width: 150,
  },
  title: {
    fontSize: fontSizes['2xl'],
    fontWeight: 700,
    color: colors.primary[700],
    marginBottom: spacing.xs
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.gray[600],
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
  planComparison: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    gap: spacing.md
  },
  planBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: spacing.lg,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200]
  },
  planTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 700,
    color: colors.primary[600],
    textAlign: 'center',
    marginBottom: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.primary[50],
    borderRadius: 4
  },
  price: {
    fontSize: fontSizes.xl,
    fontWeight: 700,
    color: colors.primary[700],
    textAlign: 'center',
    marginBottom: spacing.lg
  },
  featureList: {
    marginTop: spacing.md
  },
  feature: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    alignItems: 'center'
  },
  checkmark: {
    width: 12,
    marginRight: spacing.sm,
    color: colors.success[500]
  },
  featureText: {
    flex: 1,
    fontSize: fontSizes.sm
  },
  comparisonTable: {
    marginTop: spacing.xl,
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray[200]
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary[50],
    padding: spacing.md
  },
  tableHeaderCell: {
    flex: 1,
    color: colors.primary[700],
    fontSize: fontSizes.sm,
    fontWeight: 700,
    textAlign: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    minHeight: 40,
    alignItems: 'center'
  },
  tableCell: {
    flex: 1,
    padding: spacing.md,
    fontSize: fontSizes.sm,
    textAlign: 'center'
  },
  highlight: {
    backgroundColor: colors.primary[50],
    padding: spacing.lg,
    borderRadius: 4,
    marginBottom: spacing.lg
  },
  highlightText: {
    fontSize: fontSizes.sm,
    color: colors.primary[600],
    fontStyle: 'italic'
  },
  footer: {
    position: 'absolute',
    bottom: spacing['4xl'],
    left: spacing['4xl'],
    right: spacing['4xl'],
    borderTop: borders.thin,
    paddingTop: spacing.lg
  },
  footerText: {
    fontSize: fontSizes.xs,
    color: colors.gray[500],
    textAlign: 'center'
  }
});

interface Feature {
  name: string;
  basic: boolean | string;
  premium: boolean | string;
  elite: boolean | string;
  description?: string;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
  benefits: string[];
}

interface ComparisonData {
  basic: number;
  premium: number;
  elite: number;
}

interface ComparisonGuideProps {
  title: string;
  subtitle: string;
  plans: Plan[];
  features: Feature[];
  costComparison: Array<{
    category: string;
    basic: number;
    premium: number;
    elite: number;
  }>;
  coverageDistribution: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  notes?: string[];
}

const ComparisonGuideTemplate: React.FC<ComparisonGuideProps> = ({
  title,
  subtitle,
  plans,
  features,
  costComparison,
  coverageDistribution,
  notes
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
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Plan Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plan Options</Text>
        <View style={styles.planComparison}>
          {plans.map((plan, index) => (
            <View key={index} style={styles.planBox}>
              <Text style={styles.planTitle}>{plan.name}</Text>
              <Text style={styles.price}>{plan.price}</Text>
              <View style={styles.featureList}>
                {plan.features.map((feature, fIndex) => (
                  <View key={fIndex} style={styles.feature}>
                    <Text style={styles.checkmark}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Feature Comparison Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feature Comparison</Text>
        <View style={styles.comparisonTable}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Feature</Text>
            <Text style={styles.tableHeaderCell}>Basic</Text>
            <Text style={styles.tableHeaderCell}>Premium</Text>
            <Text style={styles.tableHeaderCell}>Elite</Text>
          </View>
          {features.map((feature, index) => (
            <View 
              key={index} 
              style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? 'white' : colors.gray[50] }
              ]}
            >
              <Text style={[styles.tableCell, { flex: 2, textAlign: 'left' }]}>
                {feature.name}
              </Text>
              <Text style={styles.tableCell}>
                {typeof feature.basic === 'boolean' ? (feature.basic ? '✓' : '—') : feature.basic}
              </Text>
              <Text style={styles.tableCell}>
                {typeof feature.premium === 'boolean' ? (feature.premium ? '✓' : '—') : feature.premium}
              </Text>
              <Text style={styles.tableCell}>
                {typeof feature.elite === 'boolean' ? (feature.elite ? '✓' : '—') : feature.elite}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cost Comparison Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cost Analysis</Text>
        <ComparisonChart
          data={costComparison}
          title="Cost Comparison by Category"
          width={500}
          height={300}
        />
      </View>

      {/* Coverage Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coverage Distribution</Text>
        <PieChart
          data={coverageDistribution}
          title="Coverage Distribution by Plan Type"
          width={300}
          height={300}
        />
      </View>

      {/* Notes */}
      {notes && notes.length > 0 && (
        <View style={styles.highlight}>
          {notes.map((note, index) => (
            <Text key={index} style={styles.highlightText}>• {note}</Text>
          ))}
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Buckalew Financial Services | 844-779-7600 | larry@buckalewfinancialservices.com
        </Text>
      </View>
    </Page>
  </Document>
);

export default ComparisonGuideTemplate;