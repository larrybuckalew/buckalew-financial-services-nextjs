import * as Sentry from "@sentry/nextjs";

// Custom error classes for more specific error handling
export class InsuranceCalculationError extends Error {
  constructor(
    message: string, 
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'InsuranceCalculationError';
  }
}

export class EligibilityVerificationError extends Error {
  constructor(
    message: string, 
    public reasons?: string[]
  ) {
    super(message);
    this.name = 'EligibilityVerificationError';
  }
}

export class ErrorHandler {
  // Centralized error logging method
  static log(
    error: Error, 
    context?: Record<string, any>
  ) {
    // Log to console for local development
    console.error('Error logged:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      context
    });

    // Send to Sentry for production monitoring
    Sentry.captureException(error, {
      extra: {
        ...context,
        timestamp: new Date().toISOString()
      }
    });
  }

  // API Error Handler Middleware
  static apiErrorHandler(
    handler: (req: any, res: any) => Promise<void>
  ) {
    return async (req: any, res: any) => {
      try {
        await handler(req, res);
      } catch (error) {
        // Log the error
        this.log(error as Error, {
          path: req.url,
          method: req.method,
          body: req.body,
          query: req.query
        });

        // Determine error response based on error type
        if (error instanceof InsuranceCalculationError) {
          res.status(400).json({
            error: 'Calculation Error',
            message: error.message,
            details: error.details
          });
        } else if (error instanceof EligibilityVerificationError) {
          res.status(422).json({
            error: 'Eligibility Verification Failed',
            message: error.message,
            reasons: error.reasons
          });
        } else {
          // Generic server error for unexpected issues
          res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
          });
        }
      }
    };
  }

  // Create a wrapper for async functions to handle errors consistently
  static asyncHandler<T extends (...args: any[]) => Promise<any>>(
    fn: T
  ): T {
    return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      try {
        return await fn(...args);
      } catch (error) {
        this.log(error as Error);
        throw error;
      }
    }) as T;
  }
}

// Global error boundary for React components
export class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode }, 
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Log the error
    ErrorHandler.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Additional error logging if needed
    ErrorHandler.log(error, { componentStack: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div 
          role="alert" 
          className="error-boundary bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          <h2>Something went wrong.</h2>
          <p>We apologize for the inconvenience. Please try again later.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
