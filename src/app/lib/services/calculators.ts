import { MortgageCalc, InvestmentCalc, RetirementCalc } from '@prisma/client';

export async function saveMortgageCalculation(data: {
  principal: number;
  interestRate: number;
  loanTerm: number;
  downPayment?: number;
}): Promise<MortgageCalc> {
  const response = await fetch('/api/calculators/mortgage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save mortgage calculation');
  }

  return response.json();
}

export async function getMortgageCalculations(): Promise<MortgageCalc[]> {
  const response = await fetch('/api/calculators/mortgage');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch mortgage calculations');
  }

  return response.json();
}

export async function saveInvestmentCalculation(data: {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  investmentLength: number;
}): Promise<InvestmentCalc & { yearlyBreakdown: any[] }> {
  const response = await fetch('/api/calculators/investment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save investment calculation');
  }

  return response.json();
}

export async function getInvestmentCalculations(): Promise<InvestmentCalc[]> {
  const response = await fetch('/api/calculators/investment');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch investment calculations');
  }

  return response.json();
}

export async function saveRetirementCalculation(data: {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
  desiredRetirementIncome: number;
}): Promise<RetirementCalc & { projectedBreakdown: any[] }> {
  const response = await fetch('/api/calculators/retirement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save retirement calculation');
  }

  return response.json();
}

export async function getRetirementCalculations(): Promise<RetirementCalc[]> {
  const response = await fetch('/api/calculators/retirement');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch retirement calculations');
  }

  return response.json();
}