// Custom Error Classes for Granular Error Handling

export class AppBaseError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(
    message: string, 
    statusCode: number = 500, 
    isOperational: boolean = true
  ) {
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
  constructor(message: string = 'Authentication failed') {
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
  constructor(
    message: string = 'Database operation failed', 
    statusCode: number = 500
  ) {
    super(message, statusCode);
  }
}

export class RecordNotFoundError extends DatabaseError {
  constructor(resourceName: string) {
    super(`${resourceName} not found`, 404);
  }
}

// Security-related Errors
export class SecurityError extends AppBaseError {
  constructor(
    message: string = 'Security violation detected', 
    statusCode: number = 403
  ) {
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
  public errors: Record<string, string>;

  constructor(
    message: string = 'Validation failed', 
    errors: Record<string, string> = {}
  ) {
    super(message, 400);
    this.errors = errors;
  }
}

// Export Error Handler Utility
export class ErrorHandler {
  static handle(error: Error) {
    // Centralized error handling logic
    if (error instanceof AppBaseError) {
      // Log operational errors differently
      this.logError(error, error.isOperational ? 'warn' : 'error');
    } else {
      // Unexpected errors
      this.logError(error, 'error');
    }
  }

  private static logError(
    error: Error, 
    level: 'error' | 'warn' = 'error'
  ) {
    // Implement logging mechanism
    console[level]({
      message: error.message,
      name: error.name,
      stack: error.stack
    });

    // Optional: Send to monitoring service
    this.notifyMonitoringService(error);
  }

  private static notifyMonitoringService(error: Error) {
    // Implement external error reporting 
    // (e.g., Sentry, LogRocket)
  }

  // Convert errors to user-friendly format
  static toResponse(error: Error) {
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
