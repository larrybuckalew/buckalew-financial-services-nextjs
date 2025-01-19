export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ValidationError) {
    return { statusCode: 400, message: error.message };
  }
  if (error instanceof DatabaseError) {
    return { statusCode: 500, message: 'Database operation failed' };
  }
  if (error instanceof AuthenticationError) {
    return { statusCode: 401, message: error.message };
  }
  return { statusCode: 500, message: 'Internal server error' };
}