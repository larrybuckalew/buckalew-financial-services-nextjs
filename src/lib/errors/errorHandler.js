import { NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";
// Custom error classes
export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class ValidationError extends AppError {
    constructor(message = 'Validation failed', errors = {}) {
        super(message, 400);
        this.errors = errors;
    }
}
export class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}
export class AuthorizationError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(message, 403);
    }
}
export class ResourceNotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404);
    }
}
export class DatabaseError extends AppError {
    constructor(message = 'Database operation failed') {
        super(message, 500, false);
    }
}
// Centralized error handling middleware
export class ErrorHandler {
    static async handleError(error, req) {
        // Log error to Sentry
        this.logToSentry(error, req);
        // Handle specific error types
        if (error instanceof AppError) {
            return this.handleAppError(error);
        }
        // Handle unexpected errors
        return this.handleUnexpectedError(error);
    }
    static handleAppError(error) {
        return NextResponse.json({
            success: false,
            message: error.message,
            ...(error instanceof ValidationError && {
                errors: error.errors
            })
        }, { status: error.statusCode });
    }
    static handleUnexpectedError(error) {
        // Log unexpected errors more extensively
        console.error('Unexpected Error:', error);
        return NextResponse.json({
            success: false,
            message: 'An unexpected error occurred',
            details: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Please contact support'
        }, { status: 500 });
    }
    static logToSentry(error, req) {
        Sentry.withScope(scope => {
            // Add request information
            scope.setExtra('url', req.url);
            scope.setExtra('method', req.method);
            scope.setExtra('headers', Object.fromEntries(req.headers));
            // Capture exception
            Sentry.captureException(error);
        });
    }
    // Utility method for throwing validation errors
    static validateInput(data, schema) {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
            const errors = {};
            validationResult.error.errors.forEach(err => {
                errors[err.path.join('.')] = err.message;
            });
            throw new ValidationError('Invalid input', errors);
        }
    }
}
// Global error handler for API routes
export async function globalErrorHandler(handler) {
    return async (req) => {
        try {
            return await handler(req);
        }
        catch (error) {
            return ErrorHandler.handleError(error, req);
        }
    };
}
