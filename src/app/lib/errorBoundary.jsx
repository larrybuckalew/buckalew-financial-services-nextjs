import React from 'react';
import * as Sentry from '@sentry/nextjs';
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error, { extra: errorInfo });
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback || (<div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're working on fixing this issue.</p>
            <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Try again
            </button>
          </div>
        </div>);
        }
        return this.props.children;
    }
}
