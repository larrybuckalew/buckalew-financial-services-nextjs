// Custom Error Classes for Granular Error Handling
export class AppBaseError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // Ensures stack trace is captured correctly
        Error.captureStackTrace(this, this.constructor);
    }
}
// Authentication-specific Errors
export class AuthenticationError extends AppBaseError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}
export class MFARequiredError extends AuthenticationError {
    constructor() {
        super('Multi-Factor Authentication required');
    }
}
// Database-related Errors
export class DatabaseError extends AppBaseError {
    constructor(message = 'Database operation failed', statusCode = 500) {
        super(message, statusCode);
    }
}
export class RecordNotFoundError extends DatabaseError {
    constructor(resourceName) {
        super(`${resourceName} not found`, 404);
    }
}
// Security-related Errors
export class SecurityError extends AppBaseError {
    constructor(message = 'Security violation detected', statusCode = 403) {
        super(message, statusCode);
    }
}
export class IPBlockedError extends SecurityError {
    constructor() {
        super('Access denied: IP address blocked', 403);
    }
}
// Validation Errors
export class ValidationError extends AppBaseError {
    constructor(message = 'Validation failed', errors = {}) {
        super(message, 400);
        this.errors = errors;
    }
}
// Export Error Handler Utility
export class ErrorHandler {
    static handle(error) {
        // Centralized error handling logic
        if (error instanceof AppBaseError) {
            // Log operational errors differently
            this.logError(error, error.isOperational ? 'warn' : 'error');
        }
        else {
            // Unexpected errors
            this.logError(error, 'error');
        }
    }
    static logError(error, level = 'error') {
        // Implement logging mechanism
        console[level]({
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        // Optional: Send to monitoring service
        this.notifyMonitoringService(error);
    }
    static notifyMonitoringService(error) {
        // Implement external error reporting 
        // (e.g., Sentry, LogRocket)
    }
    // Convert errors to user-friendly format
    static toResponse(error) {
        if (error instanceof AppBaseError) {
            return {
                success: false,
                statusCode: error.statusCode,
                message: error.message,
                ...(error instanceof ValidationError && { errors: error.errors })
            };
        }
        // Generic error response
        return {
            success: false,
            statusCode: 500,
            message: 'An unexpected error occurred'
        };
    }
}
