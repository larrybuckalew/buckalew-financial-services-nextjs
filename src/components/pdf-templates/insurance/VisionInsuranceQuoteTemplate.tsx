// ... previous content stays the same until retailers.map ...

        {retailers.map((retailer, index) => (
          <View 
            key={index}
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? 'white' : colors.gray[50] }
            ]}
          >
            <Text style={[styles.tableCell, { flex: 2, textAlign: 'left' }]}>
              {retailer.name}
            </Text>
            <Text style={styles.tableCell}>{retailer.allowance}</Text>
            <Text style={styles.tableCell}>{retailer.discount || 'N/A'}</Text>
          </View>
        ))}
      </View>

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

export default VisionInsuranceQuoteTemplate;