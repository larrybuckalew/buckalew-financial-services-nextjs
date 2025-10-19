import React, { Component } from 'react';
import { ErrorHandler } from '@/lib/error-handler';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        // Reset error state
        this.resetErrorBoundary = () => {
            this.setState({
                hasError: false,
                error: undefined,
                errorInfo: undefined
            });
        };
        this.state = {
            hasError: false
        };
    }
    // Catch errors in child components
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    // Log error information
    componentDidCatch(error, errorInfo) {
        ErrorHandler.log(error, { componentStack: errorInfo.componentStack });
        this.setState({
            errorInfo
        });
    }
    render() {
        // If an error occurred, render fallback UI
        if (this.state.hasError) {
            // Use custom fallback or default
            const FallbackComponent = this.props.fallback || (<div className="error-container">
          <h1>Something went wrong</h1>
          <p>We're sorry, an unexpected error occurred.</p>
          <button onClick={this.resetErrorBoundary}>
            Try Again
          </button>
          {process.env.NODE_ENV === 'development' && (<details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>)}
        </div>);
            return FallbackComponent;
        }
        // Render children normally
        return this.props.children;
    }
}
export default ErrorBoundary;
