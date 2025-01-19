class RetirementCalculator {
  constructor({
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    expectedAnnualReturn,
    inflationRate
  }) {
    this.currentAge = currentAge;
    this.retirementAge = retirementAge;
    this.currentSavings = currentSavings;
    this.monthlyContribution = monthlyContribution;
    this.expectedAnnualReturn = expectedAnnualReturn;
    this.inflationRate = inflationRate;
  }

  // Calculate future value with compound interest
  calculateFutureValue() {
    const yearsToRetirement = this.retirementAge - this.currentAge;
    const monthlyReturn = this.expectedAnnualReturn / 12 / 100;
    const totalMonths = yearsToRetirement * 12;

    // Future value of current savings
    const futureSavings = this.currentSavings * 
      Math.pow(1 + this.expectedAnnualReturn / 100, yearsToRetirement);

    // Future value of monthly contributions
    const futureContributions = this.monthlyContribution * 
      ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);

    return futureSavings + futureContributions;
  }

  // Estimate retirement income needs
  estimateRetirementIncome(desiredLifestyle = 'moderate') {
    const lifestyleMultipliers = {
      'basic': 0.7,
      'moderate': 1.0,
      'comfortable': 1.5
    };

    const annualIncomeMultiplier = lifestyleMultipliers[desiredLifestyle] || 1.0;
    const currentAnnualIncome = this.monthlyContribution * 12 * 12; // Rough estimate

    return currentAnnualIncome * annualIncomeMultiplier;
  }

  // Calculate retirement savings shortfall
  calculateSavingsShortfall(expectedRetirementYears = 30) {
    const futureValue = this.calculateFutureValue();
    const retirementIncome = this.estimateRetirementIncome();
    const annualWithdrawalNeeds = retirementIncome * expectedRetirementYears;

    // Account for inflation
    const inflationAdjustedWithdrawals = annualWithdrawalNeeds * 
      Math.pow(1 + this.inflationRate / 100, expectedRetirementYears);

    const shortfall = inflationAdjustedWithdrawals - futureValue;

    return {
      futureValue,
      retirementIncome,
      inflationAdjustedWithdrawals,
      shortfall: shortfall > 0 ? shortfall : 0,
      isOnTrack: shortfall <= 0
    };
  }

  // Recommend additional savings
  recommendAdditionalSavings() {
    const shortfallAnalysis = this.calculateSavingsShortfall();

    if (shortfallAnalysis.isOnTrack) {
      return {
        status: 'On Track',
        recommendation: 'Continue current saving strategy'
      };
    }

    const recommendedMonthlySavings = shortfallAnalysis.shortfall / 
      ((this.retirementAge - this.currentAge) * 12);

    return {
      status: 'Needs Improvement',
      shortfall: shortfallAnalysis.shortfall,
      recommendedMonthlySavings,
      recommendation: `Increase monthly savings by ${recommendedMonthlySavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
    };
  }
}

export default RetirementCalculator;