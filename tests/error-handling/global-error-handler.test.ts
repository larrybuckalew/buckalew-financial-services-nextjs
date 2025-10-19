import { 
  ApiError, 
  globalErrorHandler, 
  validateUserInput 
} from '@/lib/error-handling/global-error-handler'
import { ErrorType } from '@/lib/logging/logger'

describe('Global Error Handling', () => {
  // Test API Error creation
  describe('ApiError', () => {
    it('should create an error with correct properties', () => {
      const error = new ApiError(
        'Test error', 
        400, 
        ErrorType.VALIDATION,
        { field: 'email' }
      )

      expect(error.message).toBe('Test error')
      expect(error.statusCode).toBe(400)
      expect(error.errorType).toBe(ErrorType.VALIDATION)
      expect(error.context).toEqual({ field: 'email' })
    })
  })

  // Test input validation
  describe('validateUserInput', () => {
    it('should throw error for missing email', () => {
      const mockReq = { body: { password: 'validPassword123' } } as any

      expect(() => validateUserInput(mockReq)).toThrow('Email is required')
    })

    it('should throw error for short password', () => {
      const mockReq = { 
        body: { 
          email: 'test@example.com', 
          password: 'short' 
        } 
      } as any

      expect(() => validateUserInput(mockReq)).toThrow('Password must be at least 8 characters')
    })

    it('should not throw error for valid input', () => {
      const mockReq = { 
        body: { 
          email: 'test@example.com', 
          password: 'validPassword123' 
        } 
      } as any

      expect(() => validateUserInput(mockReq)).not.toThrow()
    })
  })

  // Test global error handler
  describe('globalErrorHandler', () => {
    it('should handle ApiError correctly', async () => {
      const mockHandler = async () => {
        throw new ApiError('Test API error', 400, ErrorType.VALIDATION)
      }

      const mockReq = {} as any
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any

      const wrappedHandler = globalErrorHandler(mockHandler)
      await wrappedHandler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Test API error',
        type: ErrorType.VALIDATION
      })
    })

    it('should handle unexpected errors', async () => {
      const mockHandler = async () => {
        throw new Error('Unexpected error')
      }

      const mockReq = {} as any
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any

      const wrappedHandler = globalErrorHandler(mockHandler)
      await wrappedHandler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Internal Server Error',
        type: ErrorType.UNKNOWN
      })
    })
  })
})