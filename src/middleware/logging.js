import logger, { httpLoggerMiddleware } from '../lib/logger';

// Global error handling middleware
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path
  });

  // Respond with error
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

// Combine logging middleware
export const loggingMiddleware = [
  httpLoggerMiddleware,
  errorHandlingMiddleware
];