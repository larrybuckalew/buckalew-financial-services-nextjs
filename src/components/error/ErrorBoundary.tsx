import React, { Component, ErrorInfo, ReactNode } from 'react'
import * as Sentry from '@sentry/nextjs'
import { logger, ErrorType } from '@/lib/logging/logger'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to Sentry
    Sentry.captureException(error, { extra: errorInfo })

    // Log to custom logging service
    logger.logError(
      logger.createError(
        error.message, 
        ErrorType.UNKNOWN, 
        { 
          componentStack: errorInfo.componentStack,
          errorName: error.name
        }
      )
    )
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="error-boundary bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <h2 className="font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">
            An unexpected error occurred. Please try again or contact support.
          </p>
          <details className="text-sm">
            <summary>Error Details</summary>
            <pre className="bg-gray-100 p-2 rounded mt-2">
              {this.state.error?.toString()}
            </pre>
          </details>
          <button 
            onClick={this.handleRetry}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary