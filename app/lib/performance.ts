import { useEffect, useCallback } from 'react';

// Web Vitals tracking
export const reportWebVitals = ({ id, name, label, value }) => {
  if (process.env.NODE_ENV !== 'production') return;
  
  const metric = {
    id,
    name,
    label,
    value,
    timestamp: Date.now()
  };

  // Send to analytics
  console.log('[Vitals]', metric);
};

// Component optimization hooks
export const useIntersectionObserver = (callback: () => void, element: HTMLElement | null) => {
  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, element]);
};

// Memoized data fetching
export const useMemoizedFetch = () => {
  const cache = new Map();

  return useCallback(async (url: string) => {
    if (cache.has(url)) {
      return cache.get(url);
    }

    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, data);
    return data;
  }, []);
};

// Image optimization
export const optimizeImage = (url: string, width: number, quality = 75) => {
  return `${url}?w=${width}&q=${quality}&auto=format`;
};