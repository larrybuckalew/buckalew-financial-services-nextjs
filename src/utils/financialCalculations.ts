export interface RetirementCalculatorInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  desiredRetirementIncome: number;
}

export interface RetirementProjection {
  age: number;
  year: number;
  savingsBalance: number;
  contributionsThisYear: number;
  interestEarned: number;
}

export class FinancialCalculator {
  static calculateCompoundInterest(
    principal: number,
    monthlyContribution: number,
    annualRate: number,
    years: number
  ): number {
    const monthlyRate = annualRate / 12 / 100;
    let balance = principal;

    for (let i = 0; i < years * 12; i++) {
      balance += monthlyContribution;
      balance *= (1 + monthlyRate);
    }

    return Math.round(balance * 100) / 100;
  }

  static calculateRetirementProjection(inputs: RetirementCalculatorInputs): RetirementProjection[] {
    const {
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      expectedReturn,
      inflationRate
    } = inputs;

    const projection: RetirementProjection[] = [];
    let currentBalance = currentSavings;
    const realReturn = ((1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1) * 100;

    for (let age = currentAge; age <= retirementAge; age++) {
      const year = new Date().getFullYear() + (age - currentAge);
      const startingBalance = currentBalance;
      const contributionsThisYear = monthlyContribution * 12;
      
      currentBalance = this.calculateCompoundInterest(
        currentBalance,
        monthlyContribution,
        realReturn,
        1
      );

      const interestEarned = currentBalance - startingBalance - contributionsThisYear;

      projection.push({
        age,
        year,
        savingsBalance: Math.round(currentBalance * 100) / 100,
        contributionsThisYear: Math.round(contributionsThisYear * 100) / 100,
        interestEarned: Math.round(interestEarned * 100) / 100
      });
    }

    return projection;
  }

  static calculateMortgagePayment(
    principal: number,
    annualRate: number,
    years: number
  ): number {
    const monthlyRate = annualRate / 12 / 100;
    const numberOfPayments = years * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return Math.round(monthlyPayment * 100) / 100;
  }

  static calculateAmortizationSchedule(
    principal: number,
    annualRate: number,
    years: number
  ): Array<{
    paymentNumber: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }> {
    const monthlyRate = annualRate / 12 / 100;
    const numberOfPayments = years * 12;
    const monthlyPayment = this.calculateMortgagePayment(principal, annualRate, years);
    const schedule = [];
    let remainingBalance = principal;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = remainingBalance * monthlyRate;
      const principalPart = monthlyPayment - interest;
      remainingBalance -= principalPart;

      schedule.push({
        paymentNumber: i,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principalPart * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        remainingBalance: Math.round(remainingBalance * 100) / 100
      });
    }

    return schedule;
  }
}