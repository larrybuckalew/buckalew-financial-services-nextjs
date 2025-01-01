import * as Sentry from '@sentry/nextjs';

// Centralized error handling utility
class ErrorHandler {
  // Log errors to console and monitoring service
  static log(error, context = {}) {
    console.error('Error:', error);

    // Send to Sentry for tracking
    Sentry.captureException(error, {
      extra: {
        ...context,
        timestamp: new Date().toISOString()
      }
    });
  }

  // Handle API errors
  static handleApiError(error) {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';

    switch (statusCode) {
      case 400:
        return { type: 'validation', message: errorMessage };
      case 401:
        return { type: 'authentication', message: 'Unauthorized access' };
      case 403:
        return { type: 'authorization', message: 'You do not have permission' };
      case 404:
        return { type: 'notFound', message: 'Resource not found' };
      case 500:
        return { type: 'server', message: 'Internal server error' };
      default:
        return { type: 'unknown', message: errorMessage };
    }
  }

  // Create user-friendly error messages
  static getUserFriendlyMessage(errorType) {
    const errorMessages = {
      validation: 'Please check your input and try again.',
      authentication: 'Please log in to continue.',
      authorization: 'You do not have permission to perform this action.',
      notFound: 'The requested resource could not be found.',
      server: 'We are experiencing technical difficulties. Please try again later.',
      unknown: 'An unexpected error occurred. Please try again.'
    };

    return errorMessages[errorType] || errorMessages.unknown;
  }

  // Retry mechanism for failed requests
  static async retryRequest(requestFn, maxRetries = 3) {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await requestFn();
      } catch (error) {
        retries++;
        this.log(error, { retry: retries });

        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, retries) * 1000)
        );
      }
    }

    throw new Error('Max retries exceeded');
  }
}

// Global error boundary handler for React
export const GlobalErrorBoundary = {
  getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  },

  componentDidCatch(error, errorInfo) {
    // Log the error to Sentry
    Sentry.captureException(error, { extra: errorInfo });
  }
};

export default ErrorHandler;