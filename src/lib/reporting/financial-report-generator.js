import PDFDocument from 'pdfkit';
import SVGtoPDF from 'svg-to-pdfkit';
import blobStream from 'blob-stream';

class FinancialReportGenerator {
  constructor(userData, financialData) {
    this.userData = userData;
    this.financialData = financialData;
  }

  // Generate comprehensive financial summary
  generateSummary() {
    return {
      totalAssets: this.calculateTotalAssets(),
      totalLiabilities: this.calculateTotalLiabilities(),
      netWorth: this.calculateNetWorth(),
      assetAllocation: this.analyzeAssetAllocation(),
      performanceMetrics: this.calculatePerformanceMetrics()
    };
  }

  calculateTotalAssets() {
    return this.financialData.investments.reduce(
      (total, investment) => total + investment.value, 
      0
    );
  }

  calculateTotalLiabilities() {
    return this.financialData.debts.reduce(
      (total, debt) => total + debt.balance, 
      0
    );
  }

  calculateNetWorth() {
    return this.calculateTotalAssets() - this.calculateTotalLiabilities();
  }

  analyzeAssetAllocation() {
    const totalAssets = this.calculateTotalAssets();
    return this.financialData.investments.map(investment => ({
      category: investment.category,
      value: investment.value,
      percentage: (investment.value / totalAssets) * 100
    }));
  }

  calculatePerformanceMetrics() {
    return {
      yearToDateReturn: this.calculateYTDReturn(),
      annualizedReturn: this.calculateAnnualizedReturn(),
      riskScore: this.calculateRiskScore()
    };
  }

  calculateYTDReturn() {
    // Simplified YTD return calculation
    const startOfYearValue = this.financialData.startOfYearTotalValue;
    const currentValue = this.calculateTotalAssets();
    return ((currentValue - startOfYearValue) / startOfYearValue) * 100;
  }

  calculateAnnualizedReturn() {
    // Simplified annualized return
    const investmentPeriod = this.financialData.investmentPeriod;
    const totalReturn = this.calculateYTDReturn();
    return totalReturn / investmentPeriod;
  }

  calculateRiskScore() {
    const volatility = this.financialData.investments.reduce(
      (total, investment) => total + investment.volatility, 
      0
    ) / this.financialData.investments.length;

    if (volatility < 0.05) return 'Low Risk';
    if (volatility < 0.1) return 'Medium Risk';
    return 'High Risk';
  }

  // Generate PDF report
  async generatePDFReport() {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const stream = doc.pipe(blobStream());

      // Report Header
      doc.fontSize(25).text('Financial Performance Report', { align: 'center' });
      doc.moveDown();

      // Personal Information
      doc.fontSize(12)
        .text(`Name: ${this.userData.name}`)
        .text(`Date: ${new Date().toLocaleDateString()}`);

      doc.moveDown();

      // Financial Summary
      const summary = this.generateSummary();
      doc.fontSize(16).text('Financial Summary', { underline: true });
      doc.fontSize(12)
        .text(`Total Assets: $${summary.totalAssets.toLocaleString()}`)
        .text(`Total Liabilities: $${summary.totalLiabilities.toLocaleString()}`)
        .text(`Net Worth: $${summary.netWorth.toLocaleString()}`);

      doc.moveDown();

      // Asset Allocation
      doc.fontSize(16).text('Asset Allocation', { underline: true });
      summary.assetAllocation.forEach(asset => {
        doc.fontSize(12)
          .text(`${asset.category}: ${asset.percentage.toFixed(2)}%`);
      });

      doc.moveDown();

      // Performance Metrics
      doc.fontSize(16).text('Performance Metrics', { underline: true });
      doc.fontSize(12)
        .text(`Year-to-Date Return: ${summary.performanceMetrics.yearToDateReturn.toFixed(2)}%`)
        .text(`Annualized Return: ${summary.performanceMetrics.annualizedReturn.toFixed(2)}%`)
        .text(`Risk Score: ${summary.performanceMetrics.riskScore}`);

      doc.end();

      stream.on('finish', function() {
        resolve(stream.toBlob('application/pdf'));
      });

      stream.on('error', reject);
    });
  }

  // Generate investment recommendation
  generateRecommendations() {
    const summary = this.generateSummary();
    const recommendations = [];

    // Asset allocation recommendations
    summary.assetAllocation.forEach(asset => {
      if (asset.percentage > 35) {
        recommendations.push(`Consider diversifying from ${asset.category}`);
      }
    });

    // Performance-based recommendations
    if (summary.performanceMetrics.yearToDateReturn < 0) {
      recommendations.push('Review and potentially rebalance your portfolio');
    }

    // Risk-based recommendations
    if (summary.performanceMetrics.riskScore === 'High Risk') {
      recommendations.push('Consider moving to more stable investments');
    }

    return recommendations;
  }
}

export default FinancialReportGenerator;