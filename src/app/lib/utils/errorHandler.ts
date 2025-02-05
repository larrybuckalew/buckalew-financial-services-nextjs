export interface ErrorDetails {
  message: string;
  code?: string;
  field?: string;
}

export class AppError extends Error {
  public details: ErrorDetails;
  public statusCode: number;

  constructor(
    message: string, 
    statusCode: number = 500, 
    details: Partial<ErrorDetails> = {}
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = {
      message,
      ...details
    };
  }

  static validationError(errors: Partial<ErrorDetails>[]): AppError {
    return new AppError('Validation Failed', 400, {
      message: 'One or more fields failed validation',
      field: errors.map(e => e.field).join(', ')
    });
  }

  static authenticationError(message: string = 'Authentication failed'): AppError {
    return new AppError(message, 401);
  }

  static notFoundError(resource: string): AppError {
    return new AppError(`${resource} not found`, 404);
  }

  static forbiddenError(message: string = 'Access denied'): AppError {
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

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError('An unexpected error occurred');
}

// Logging utility
export function logError(error: unknown) {
  const processedError = handleError(error);
  console.error('Error Log:', {
    timestamp: new Date().toISOString(),
    error: processedError.toJSON()
  });
}
