import React from 'react';
import { logMetric } from '@/lib/monitoring';

interface State {
  online: boolean;
}

export class NetworkErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = {
      online: typeof navigator !== 'undefined' ? navigator.onLine : true
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.setState({ online: true });
    logMetric('network_status_change', 1, { status: 'online' });
  };

  handleOffline = () => {
    this.setState({ online: false });
    logMetric('network_status_change', 1, { status: 'offline' });
  };

  render() {
    if (!this.state.online) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                You're offline
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Please check your internet connection and try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}