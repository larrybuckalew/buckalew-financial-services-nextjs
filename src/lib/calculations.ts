export const calculateMortgage = (
  principal: number,
  annualRate: number,
  years: number,
  downPayment: number = 0
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
} => {
  const P = principal - downPayment;
  const r = annualRate / 100 / 12;
  const n = years * 12;

  const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - P;

  const amortizationSchedule = [];
  let balance = P;

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    const principalPayment = monthlyPayment - interest;
    balance -= principalPayment;

    amortizationSchedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule,
  };
};

export const calculateInvestmentGrowth = (
  initialInvestment: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): {
  finalBalance: number;
  totalContributions: number;
  totalEarnings: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    contributions: number;
    earnings: number;
  }>;
} => {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;
  let balance = initialInvestment;
  let totalContributions = initialInvestment;
  const yearlyBreakdown = [];

  for (let year = 1; year <= years; year++) {
    let yearlyContributions = 0;
    let yearStartBalance = balance;

    for (let month = 1; month <= 12; month++) {
      balance += monthlyContribution;
      yearlyContributions += monthlyContribution;
      balance *= (1 + monthlyRate);
    }

    totalContributions += yearlyContributions;
    const yearlyEarnings = balance - yearStartBalance - yearlyContributions;

    yearlyBreakdown.push({
      year,
      balance,
      contributions: yearlyContributions,
      earnings: yearlyEarnings,
    });
  }

  return {
    finalBalance: balance,
    totalContributions,
    totalEarnings: balance - totalContributions,
    yearlyBreakdown,
  };
};

export const calculateRetirement = (
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  desiredRetirementIncome: number
): {
  savingsAtRetirement: number;
  monthlyRetirementIncome: number;
  savingsGap: number;
  additionalMonthlySavingsNeeded: number;
  projectedBreakdown: Array<{
    age: number;
    savings: number;
    contributions: number;
    earnings: number;
  }>;
} => {
  const yearsUntilRetirement = retirementAge - currentAge;
  const investment = calculateInvestmentGrowth(
    currentSavings,
    monthlyContribution,
    annualReturn,
    yearsUntilRetirement
  );

  // Assuming a 4% safe withdrawal rate
  const monthlyRetirementIncome = (investment.finalBalance * 0.04) / 12;
  const savingsGap = Math.max(0, (desiredRetirementIncome * 12 / 0.04) - investment.finalBalance);
  
  // Calculate additional savings needed
  const additionalMonthlySavingsNeeded = savingsGap > 0 
    ? calculateRequiredMonthlySavings(
        savingsGap,
        annualReturn,
        yearsUntilRetirement
      )
    : 0;

  return {
    savingsAtRetirement: investment.finalBalance,
    monthlyRetirementIncome,
    savingsGap,
    additionalMonthlySavingsNeeded,
    projectedBreakdown: investment.yearlyBreakdown.map(year => ({
      age: currentAge + year.year,
      savings: year.balance,
      contributions: year.contributions,
      earnings: year.earnings,
    })),
  };
};

const calculateRequiredMonthlySavings = (
  targetAmount: number,
  annualReturn: number,
  years: number
): number => {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;
  
  // Using the future value of an annuity formula solved for the payment
  const monthlyPayment = targetAmount * (monthlyRate) / 
    (Math.pow(1 + monthlyRate, months) - 1);
    
  return monthlyPayment;
};