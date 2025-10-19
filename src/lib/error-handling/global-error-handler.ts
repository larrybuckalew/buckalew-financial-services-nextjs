import { NextApiRequest, NextApiResponse } from 'next'
import { logger, ErrorType } from '../logging/logger'

// Custom error class for more detailed error handling
export class ApiError extends Error {
  statusCode: number
  errorType: ErrorType
  context?: Record<string, any>

  constructor(
    message: string, 
    statusCode: number = 500, 
    errorType: ErrorType = ErrorType.UNKNOWN,
    context?: Record<string, any>
  ) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errorType = errorType
    this.context = context
  }
}

// Global error handler for API routes
export function globalErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error) {
      // Handle different types of errors
      if (error instanceof ApiError) {
        // Log and return custom API errors
        logger.logError(
          logger.createError(
            error.message, 
            error.errorType, 
            error.context
          )
        )

        return res.status(error.statusCode).json({
          error: error.message,
          type: error.errorType
        })
      } else if (error instanceof Error) {
        // Log unexpected errors
        const apiError = logger.createError(
          error.message, 
          ErrorType.UNKNOWN, 
          { 
            stack: error.stack,
            originalError: error.name 
          }
        )
        logger.logError(apiError)

        // Generic server error response
        return res.status(500).json({
          error: 'Internal Server Error',
          type: ErrorType.UNKNOWN
        })
      } else {
        // Handle non-Error thrown objects
        logger.logError(
          logger.createError(
            'Unknown error occurred', 
            ErrorType.UNKNOWN, 
            { rawError: String(error) }
          )
        )

        return res.status(500).json({
          error: 'Unexpected Error',
          type: ErrorType.UNKNOWN
        })
      }
    }
  }
}

// Higher-order function for input validation
export function validateRequest(
  validator: (req: NextApiRequest) => void
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      validator(req)
    } catch (validationError) {
      // Throw a validation error with appropriate status
      throw new ApiError(
        validationError instanceof Error 
          ? validationError.message 
          : 'Invalid request',
        400,
        ErrorType.VALIDATION
      )
    }
  }
}

// Example validation function
export function validateUserInput(req: NextApiRequest) {
  const { email, password } = req.body

  // Email validation
  if (!email) {
    throw new Error('Email is required')
  }

  // Password validation
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters')
  }
}

// Async operation retry decorator
export function retryOperation(
  maxRetries: number = 3, 
  baseDelay: number = 1000
) {
  return function(
    target: any, 
    propertyKey: string, 
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function(...args: any[]) {
      let lastError: Error | null = null

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          return await originalMethod.apply(this, args)
        } catch (error) {
          lastError = error as Error
          
          // Log retry attempts
          logger.warn(`Retry attempt ${attempt + 1} failed`, {
            method: propertyKey,
            error: lastError.message
          })

          // Exponential backoff
          const delay = baseDelay * Math.pow(2, attempt)
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }

      // If all retries fail, throw the last error
      throw new ApiError(
        lastError?.message || 'Operation failed after retries',
        500,
        ErrorType.UNKNOWN
      )
    }

    return descriptor
  }
}