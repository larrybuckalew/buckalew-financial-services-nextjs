import { NextResponse } from 'next/server';
import { withAuth } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimiter';
import { validateUserInput } from '@/lib/security/validation';
import { calculatorInputSchema } from '@/lib/security/validation';
import { cache } from '@/lib/cache/redis';

const rateLimiter = createRateLimiter({
  windowMs: 60000,
  max: 50
});

export async function POST(req: Request) {
  const authResult = await withAuth(req);
  if (authResult instanceof NextResponse) return authResult;

  const rateLimit = await rateLimiter(req);
  if (rateLimit instanceof NextResponse) return rateLimit;

  try {
    const data = await req.json();
    const validatedData = validateUserInput(calculatorInputSchema, data);

    const cacheKey = `calc:${JSON.stringify(validatedData)}`;
    const cachedResult = await cache.get(cacheKey);
    
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    const result = calculateFinancialMetrics(validatedData);
    await cache.set(cacheKey, result, { ttl: 3600 });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid calculation parameters' },
      { status: 400 }
    );
  }
}

function calculateFinancialMetrics(data: any) {
  const { principal, rate, term, paymentFrequency } = data;
  const monthlyRate = (rate / 100) / 12;
  const numberOfPayments = term * (paymentFrequency === 'monthly' ? 12 : paymentFrequency === 'quarterly' ? 4 : 1);

  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
    / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return {
    monthlyPayment,
    totalInterest: (monthlyPayment * numberOfPayments) - principal,
    totalPayment: monthlyPayment * numberOfPayments,
    amortizationSchedule: generateAmortizationSchedule(principal, monthlyRate, numberOfPayments, monthlyPayment)
  };
}

function generateAmortizationSchedule(principal: number, monthlyRate: number, numberOfPayments: number, monthlyPayment: number) {
  const schedule = [];
  let balance = principal;

  for (let payment = 1; payment <= numberOfPayments; payment++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    schedule.push({
      payment,
      principalPayment,
      interestPayment,
      balance: Math.max(0, balance)
    });
  }

  return schedule;
}