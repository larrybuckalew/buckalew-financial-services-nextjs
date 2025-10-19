import { z } from 'zod';
// Error types
export var ErrorType;
(function (ErrorType) {
    ErrorType["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorType["AUTHENTICATION_ERROR"] = "AUTHENTICATION_ERROR";
    ErrorType["AUTHORIZATION_ERROR"] = "AUTHORIZATION_ERROR";
    ErrorType["NOT_FOUND"] = "NOT_FOUND";
    ErrorType["CONFLICT"] = "CONFLICT";
    ErrorType["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
})(ErrorType || (ErrorType = {}));
// Custom error class
export class ApplicationError extends Error {
    constructor(message, type = ErrorType.INTERNAL_SERVER_ERROR, statusCode = 500, details) {
        super(message);
        this.type = type;
        this.statusCode = statusCode;
        this.details = details;
    }
}
// Error handling middleware
export function errorHandler(error, req, res) {
    // Default error response
    let errorResponse = {
        error: 'An unexpected error occurred',
        type: ErrorType.INTERNAL_SERVER_ERROR
    };
    // Handle different error types
    if (error instanceof ApplicationError) {
        errorResponse = {
            error: error.message,
            type: error.type,
            details: error.details
        };
        res.status(error.statusCode);
    }
    else if (error instanceof z.ZodError) {
        errorResponse = {
            error: 'Validation failed',
            type: ErrorType.VALIDATION_ERROR,
            details: error.errors
        };
        res.status(400);
    }
    else if (error.name === 'UnauthorizedError') {
        errorResponse = {
            error: 'Unauthorized access',
            type: ErrorType.AUTHENTICATION_ERROR
        };
        res.status(401);
    }
    else {
        // Log unexpected errors
        console.error('Unhandled error:', error);
        res.status(500);
    }
    // Send error response
    res.json(errorResponse);
}
// Utility function to create specific errors
export function createError(message, type = ErrorType.INTERNAL_SERVER_ERROR, statusCode = 500, details) {
    return new ApplicationError(message, type, statusCode, details);
}
// Logging utility
export function logError(error, context) {
    console.error('Error Log:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        context
    });
}
