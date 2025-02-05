interface SocialSecurityBenefit {
  retirementAge: number;
  monthlyBenefit: number;
  totalBenefitBy90: number;
}

export class SocialSecurityCalculator {
  // Simplified calculation based on average benefits
  static estimateMonthlyBenefit(
    birthYear: number,
    lastYearIncome: number,
    retirementAge: number
  ): number {
    // Base calculation on average annual income
    const pia = this.calculatePIA(lastYearIncome);
    
    // Apply early/late retirement adjustments
    const adjustment = this.calculateAgeAdjustment(retirementAge);
    
    return pia * adjustment;
  }

  private static calculatePIA(lastYearIncome: number): number {
    // Simplified PIA calculation
    // In reality, this would use the actual bend points and AIME calculation
    if (lastYearIncome <= 12000) {
      return lastYearIncome * 0.9;
    } else if (lastYearIncome <= 72000) {
      return 10800 + (lastYearIncome - 12000) * 0.32;
    } else {
      return 30000 + (lastYearIncome - 72000) * 0.15;
    }
  }

  private static calculateAgeAdjustment(retirementAge: number): number {
    if (retirementAge < 67) { // Early retirement
      const monthsEarly = (67 - retirementAge) * 12;
      return 1 - (monthsEarly * 0.00555556); // ~5/9 of 1% per month
    } else if (retirementAge > 67) { // Delayed retirement
      const monthsDelayed = (retirementAge - 67) * 12;
      return 1 + (monthsDelayed * 0.00666667); // 8% per year
    }
    return 1; // Full retirement age
  }

  static calculateLifetimeBenefits(
    birthYear: number,
    lastYearIncome: number,
    startAge: number
  ): SocialSecurityBenefit[] {
    const benefits: SocialSecurityBenefit[] = [];
    
    // Calculate benefits for different retirement ages
    for (let age = 62; age <= 70; age++) {
      const monthlyBenefit = this.estimateMonthlyBenefit(birthYear, lastYearIncome, age);
      const yearsTo90 = 90 - age;
      const totalBenefitBy90 = monthlyBenefit * 12 * yearsTo90;
      
      benefits.push({
        retirementAge: age,
        monthlyBenefit,
        totalBenefitBy90,
      });
    }
    
    return benefits;
  }
}