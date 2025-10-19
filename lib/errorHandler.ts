export class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }

  static badRequest(message: string = 'Bad Request') {
    return new ApiError(message, 400)
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new ApiError(message, 401)
  }

  static forbidden(message: string = 'Forbidden') {
    return new ApiError(message, 403)
  }

  static notFound(message: string = 'Not Found') {
    return new ApiError(message, 404)
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    console.error(`[${error.name}]: ${error.message}`)
    return {
      success: false,
      message: error.message,
      statusCode: error.statusCode
    }
  }

  if (error instanceof Error) {
    console.error(`Unexpected error: ${error.message}`)
    return {
      success: false,
      message: 'An unexpected error occurred',
      statusCode: 500
    }
  }

  return {
    success: false,
    message: 'Unknown error',
    statusCode: 500
  }
}
