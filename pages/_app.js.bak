import { useEffect } from 'react';
import { initErrorTracking } from '../src/lib/errorTracking';
import { initPerformanceMonitoring } from '../src/lib/performanceMonitoring';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize error tracking
    initErrorTracking();

    // Initialize performance monitoring
    const { reportWebVitals } = initPerformanceMonitoring();
  }, []);

  return <Component {...pageProps} />;
}

// Attach Web Vitals reporting
export function reportWebVitals(metric) {
  const { reportWebVitals } = initPerformanceMonitoring();
  reportWebVitals(metric);
}

export default MyApp;