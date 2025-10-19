import { z } from 'zod';
// User Registration Schema
export const userRegistrationSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Password must be less than 100 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must include uppercase, lowercase, number, and special character'),
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[a-zA-Z'-]+$/, 'First name can only contain letters, hyphens, and apostrophes'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .regex(/^[a-zA-Z'-]+$/, 'Last name can only contain letters, hyphens, and apostrophes'),
});
// Blog Post Schema
export const blogPostSchema = z.object({
    title: z.string()
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must be less than 200 characters'),
    content: z.string()
        .min(10, 'Content must be at least 10 characters')
        .max(10000, 'Content must be less than 10,000 characters'),
    tags: z.array(z.string())
        .optional(),
    status: z.enum(['draft', 'published', 'archived'])
        .default('draft'),
});
// Profile Update Schema
export const profileUpdateSchema = z.object({
    email: z.string().email('Invalid email address').optional(),
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .optional(),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .optional(),
});
// Utility function for validation
export function validateData(schema, data) {
    return schema.parse(data);
}
// Error handling for validation
export function handleValidationError(error) {
    const formattedErrors = error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
    }));
    return {
        success: false,
        errors: formattedErrors
    };
}
