import { z } from 'zod';

export const mortgageCalculatorSchema = z.object({
  principal: z.number()
    .min(1000, "Loan amount must be at least $1,000")
    .max(10000000, "Loan amount cannot exceed $10,000,000"),
  interestRate: z.number()
    .min(0.1, "Interest rate must be at least 0.1%")
    .max(30, "Interest rate cannot exceed 30%"),
  loanTerm: z.number()
    .min(1, "Loan term must be at least 1 year")
    .max(50, "Loan term cannot exceed 50 years"),
  downPayment: z.number()
    .min(0, "Down payment cannot be negative")
    .optional(),
});

export const investmentCalculatorSchema = z.object({
  initialInvestment: z.number()
    .min(0, "Initial investment cannot be negative"),
  monthlyContribution: z.number()
    .min(0, "Monthly contribution cannot be negative"),
  annualReturn: z.number()
    .min(-100, "Annual return cannot be less than -100%")
    .max(100, "Annual return cannot exceed 100%"),
  investmentLength: z.number()
    .min(1, "Investment length must be at least 1 year")
    .max(50, "Investment length cannot exceed 50 years"),
});

export const retirementCalculatorSchema = z.object({
  currentAge: z.number()
    .min(18, "Current age must be at least 18")
    .max(100, "Current age cannot exceed 100"),
  retirementAge: z.number()
    .min(18, "Retirement age must be at least 18")
    .max(100, "Retirement age cannot exceed 100"),
  currentSavings: z.number()
    .min(0, "Current savings cannot be negative"),
  monthlyContribution: z.number()
    .min(0, "Monthly contribution cannot be negative"),
  annualReturn: z.number()
    .min(-100, "Annual return cannot be less than -100%")
    .max(100, "Annual return cannot exceed 100%"),
  desiredRetirementIncome: z.number()
    .min(0, "Desired retirement income cannot be negative"),
});