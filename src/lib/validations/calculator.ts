import * as z from 'zod';

export const investmentCalculatorSchema = z.object({
  initialInvestment: z.number().min(0, 'Initial investment must be positive'),
  monthlyContribution: z.number().min(0, 'Monthly contribution must be non-negative'),
  annualReturn: z.number().min(0, 'Annual return must be non-negative'),
  investmentPeriod: z.number().min(1, 'Investment period must be at least 1 year')
});

export type InvestmentCalculatorInputs = z.infer<typeof investmentCalculatorSchema>;
