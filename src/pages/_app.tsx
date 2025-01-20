import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ClientErrorTracker } from '../lib/client-error-tracking';

// Initialize error tracking
ClientErrorTracker.init();

function MyApp({ Component, pageProps }: AppProps) {
  // Wrap the component with an error boundary
  const ErrorBoundaryComponent = ClientErrorTracker.createErrorBoundary(Component);

  return (
    <SessionProvider session={pageProps.session}>
      <ErrorBoundaryComponent {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;