import { AppError, ValidationError, ErrorLogger } from '../error-handling';
import { z } from 'zod';

describe('Error Handling', () => {
  describe('AppError', () => {
    test('creates an operational error with correct properties', () => {
      const error = new AppError('Test error', 400);

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.isOperational).toBe(true);
      expect(error.name).toBe('AppError');
    });

    test('captures stack trace', () => {
      const error = new AppError('Test error');

      expect(error.stack).toBeDefined();
    });
  });

  describe('ValidationError', () => {
    test('creates a validation error from ZodError', () => {
      const schema = z.object({
        name: z.string().min(2)
      });

      try {
        schema.parse({ name: '' });
      } catch (zodError) {
        if (zodError instanceof z.ZodError) {
          const validationError = new ValidationError(zodError);

          expect(validationError.message).toBe('Validation Error');
          expect(validationError.statusCode).toBe(400);
          expect(validationError.errors).toBe(zodError);
        }
      }
    });
  });

  describe('ErrorLogger', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('logs errors with correct format', () => {
      const error = new Error('Test error');
      ErrorLogger.log(error);

      expect(console.error).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Test error',
        name: 'Error'
      }));
    });
  });
});