// Performance Monitoring and Optimization Utilities

// Web Vitals Reporting
export const reportWebVitals = (metric) => {
  if (metric.label === 'web-vital') {
    console.log(`${metric.name} - ${Math.round(metric.value)} ms`);
    
    // Optional: Send metrics to analytics service
    if (process.env.NEXT_PUBLIC_ANALYTICS_ID) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        non_interaction: true,
      });
    }
  }
};

// Lazy Loading Utility for Code Splitting
export const lazyLoadComponent = (importFn) => {
  const LazyComponent = React.lazy(importFn);
  
  return (props) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// Caching Strategy for Static Assets
export const warmUpCache = async () => {
  if (typeof window !== 'undefined' && 'caches' in window) {
    const cacheName = 'buckalew-financial-static-v1';
    const cache = await caches.open(cacheName);
    
    const staticAssets = [
      '/',
      '/login',
      '/dashboard',
      '/profile',
      '/styles/main.css',
      '/images/logo.png'
    ];
    
    await cache.addAll(staticAssets);
  }
};

// Performance Monitoring Middleware
export const performanceMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Log request performance
    console.log(`[Performance] ${req.method} ${req.url} - ${duration}ms`);
    
    // Optional: Send to monitoring service
    if (duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.url} took ${duration}ms`);
    }
  });
  
  next();
};