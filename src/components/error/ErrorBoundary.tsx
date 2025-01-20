import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Here you could send the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <p>An error has occurred in this component.</p>
              {this.state.error && (
                <p className="text-sm text-gray-500">
                  {this.state.error.message}
                </p>
              )}
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Try again
              </button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}