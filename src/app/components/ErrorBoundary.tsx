import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logError } from '@/lib/error/handler';

// Props interface
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// State interface
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false 
    };
  }

  // Catch errors in child components
  static getDerivedStateFromError(error: Error) {
    return { 
      hasError: true,
      error 
    };
  }

  // Log error information
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, { componentStack: errorInfo.componentStack });
    this.setState({ 
      errorInfo 
    });
  }

  // Reset error state
  resetErrorBoundary = () => {
    this.setState({ 
      hasError: false,
      error: undefined,
      errorInfo: undefined 
    });
  };

  render() {
    // If an error occurred, render fallback UI
    if (this.state.hasError) {
      // Use custom fallback or default
      const FallbackComponent = this.props.fallback || (
        <div className="error-container">
          <h1>Something went wrong</h1>
          <p>We're sorry, an unexpected error occurred.</p>
          <button onClick={this.resetErrorBoundary}>
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
        </div>
      );

      return FallbackComponent;
    }

    // Render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
