import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Error types
export enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

// Custom error class
export class ApplicationError extends Error {
  type: ErrorType;
  statusCode: number;
  details?: any;

  constructor(
    message: string, 
    type: ErrorType = ErrorType.INTERNAL_SERVER_ERROR,
    statusCode: number = 500,
    details?: any
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Error response interface
interface ErrorResponse {
  error: string;
  type: ErrorType;
  details?: any;
}

// Error handling middleware
export function errorHandler(
  error: Error, 
  req: NextApiRequest, 
  res: NextApiResponse
) {
  // Default error response
  let errorResponse: ErrorResponse = {
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
  } else if (error instanceof z.ZodError) {
    errorResponse = {
      error: 'Validation failed',
      type: ErrorType.VALIDATION_ERROR,
      details: error.errors
    };
    res.status(400);
  } else if (error.name === 'UnauthorizedError') {
    errorResponse = {
      error: 'Unauthorized access',
      type: ErrorType.AUTHENTICATION_ERROR
    };
    res.status(401);
  } else {
    // Log unexpected errors
    console.error('Unhandled error:', error);
    res.status(500);
  }

  // Send error response
  res.json(errorResponse);
}

// Utility function to create specific errors
export function createError(
  message: string, 
  type: ErrorType = ErrorType.INTERNAL_SERVER_ERROR,
  statusCode: number = 500,
  details?: any
): ApplicationError {
  return new ApplicationError(message, type, statusCode, details);
}

// Logging utility
export function logError(
  error: Error, 
  context?: Record<string, any>
) {
  console.error('Error Log:', {
    message: error.message,
    name: error.name,
    stack: error.stack,
    context
  });
}
