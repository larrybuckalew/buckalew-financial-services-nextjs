import React from 'react';
import * as Sentry from '@sentry/nextjs';
export class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        Sentry.captureException(error, {
            extra: {
                componentStack: errorInfo.componentStack,
            },
        });
    }
    render() {
        if (this.state.error) {
            return (<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <p className="text-red-700">{this.state.error.toString()}</p>
            </div>
            <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Reload Page
            </button>
          </div>
        </div>);
        }
        return this.props.children;
    }
}
