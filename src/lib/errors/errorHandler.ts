import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from "@sentry/nextjs";

// Custom error classes
export class AppError extends Error {
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

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public errors: Record<string, string>;

  constructor(
    message: string = 'Validation failed', 
    errors: Record<string, string> = {}
  ) {
    super(message, 400);
    this.errors = errors;
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 403);
  }
}

export class ResourceNotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, false);
  }
}

// Centralized error handling middleware
export class ErrorHandler {
  static async handleError(
    error: Error, 
    req: NextRequest
  ): Promise<NextResponse> {
    // Log error to Sentry
    this.logToSentry(error, req);

    // Handle specific error types
    if (error instanceof AppError) {
      return this.handleAppError(error);
    }

    // Handle unexpected errors
    return this.handleUnexpectedError(error);
  }

  private static handleAppError(error: AppError): NextResponse {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        ...(error instanceof ValidationError && { 
          errors: error.errors 
        })
      }, 
      { status: error.statusCode }
    );
  }

  private static handleUnexpectedError(error: Error): NextResponse {
    // Log unexpected errors more extensively
    console.error('Unexpected Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'Please contact support'
      }, 
      { status: 500 }
    );
  }

  private static logToSentry(
    error: Error, 
    req: NextRequest
  ): void {
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
  static validateInput(
    data: any, 
    schema: any
  ): void {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach(err => {
        errors[err.path.join('.')] = err.message;
      });

      throw new ValidationError('Invalid input', errors);
    }
  }
}

// Global error handler for API routes
export async function globalErrorHandler(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      return ErrorHandler.handleError(error as Error, req);
    }
  };
}
