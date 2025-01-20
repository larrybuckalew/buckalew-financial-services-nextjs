import { z } from 'zod';

// Error tracking utility for client-side applications
export class ClientErrorTracker {
  private static REPORT_ENDPOINT = '/api/error-report';

  // Error reporting schema for client-side validation
  private static errorReportSchema = z.object({
    message: z.string(),
    stack: z.string().optional(),
    context: z.record(z.unknown()).optional(),
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    component: z.string().optional()
  });

  // Global error handler
  static init() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        this.reportError({
          message: event.message,
          stack: event.error?.stack,
          severity: 'HIGH',
          component: 'Global Window Error'
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        this.reportError({
          message: event.reason?.message || 'Unhandled Promise Rejection',
          stack: event.reason?.stack,
          severity: 'HIGH',
          component: 'Promise Rejection'
        });
      });
    }
  }

  // Report error to server
  static async reportError(errorData: {
    message: string;
    stack?: string;
    severity?: 'LOW' | 'MEDIUM' | 'HIGH';
    component?: string;
    context?: Record<string, unknown>;
  }) {
    try {
      // Validate error data
      const validatedData = this.errorReportSchema.parse(errorData);

      // Send error to server
      await fetch(this.REPORT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedData)
      });
    } catch (error) {
      // Fallback error logging if reporting fails
      console.error('Error reporting failed:', error);
    }
  }

  // React error boundary component
  static createErrorBoundary(Component: React.ComponentType, fallbackComponent?: React.ComponentType) {
    return class ErrorBoundary extends React.Component {
      state = { hasError: false };

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        ClientErrorTracker.reportError({
          message: error.message,
          stack: error.stack,
          context: errorInfo,
          severity: 'HIGH',
          component: Component.name || 'Unknown Component'
        });
      }

      render() {
        if (this.state.hasError) {
          return fallbackComponent ? <fallbackComponent /> : <h1>Something went wrong.</h1>;
        }

        return this.props.children;
      }
    };
  }
}