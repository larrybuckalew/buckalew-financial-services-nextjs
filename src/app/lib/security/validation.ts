import { z } from 'zod';
import { sanitizeHtml } from './sanitize';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  name: z.string().min(2).transform(val => sanitizeHtml(val)),
});

export const financialDataSchema = z.object({
  amount: z.number().positive(),
  description: z.string().max(500).transform(val => sanitizeHtml(val)),
  category: z.enum(['income', 'expense', 'investment']),
  date: z.date(),
});

export const calculatorInputSchema = z.object({
  principal: z.number().positive(),
  rate: z.number().min(0).max(100),
  term: z.number().positive().int(),
  paymentFrequency: z.enum(['monthly', 'quarterly', 'annually']),
});

export function validateUserInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw error;
  }
}