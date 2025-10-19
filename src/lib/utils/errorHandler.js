export class AppError extends Error {
    constructor(message, statusCode = 500, details = {}) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.details = {
            message,
            ...details
        };
    }
    static validationError(errors) {
        return new AppError('Validation Failed', 400, {
            message: 'One or more fields failed validation',
            field: errors.map(e => e.field).join(', ')
        });
    }
    static authenticationError(message = 'Authentication failed') {
        return new AppError(message, 401);
    }
    static notFoundError(resource) {
        return new AppError(`${resource} not found`, 404);
    }
    static forbiddenError(message = 'Access denied') {
        return new AppError(message, 403);
    }
    toJSON() {
        return {
            success: false,
            error: {
                message: this.message,
                ...this.details,
                statusCode: this.statusCode
            }
        };
    }
}
export function handleError(error) {
    if (error instanceof AppError) {
        return error;
    }
    if (error instanceof Error) {
        return new AppError(error.message);
    }
    return new AppError('An unexpected error occurred');
}
// Logging utility
export function logError(error) {
    const processedError = handleError(error);
    console.error('Error Log:', {
        timestamp: new Date().toISOString(),
        error: processedError.toJSON()
    });
}
