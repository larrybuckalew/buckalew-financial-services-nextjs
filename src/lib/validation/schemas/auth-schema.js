import { z } from 'zod';
export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
export const resetPasswordSchema = z.object({
    email: z.string().email(),
});
export const confirmResetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});
