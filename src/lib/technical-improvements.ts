import { useState, useEffect } from 'react';

// Error Boundary for React Components
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Uncaught error:', error, errorInfo);
    // Optionally send to Sentry or other error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert" 
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          <h2>Something went wrong.</h2>
          <p>We apologize for the inconvenience. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Custom hook for data fetching with loading and error states
export function useFetchData<T>(
  fetchFn: () => Promise<T>, 
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}

// Centralized data fetching service
export class DataFetchService {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL;
  private static defaultHeaders = {
    'Content-Type': 'application/json'
  };

  static async fetchWithCache<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    cacheDuration = 5 * 60 * 1000 // 5 minutes
  ): Promise<T> {
    const cachedData = localStorage.getItem(key);
    
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      
      if (Date.now() - timestamp < cacheDuration) {
        return data;
      }
    }

    const freshData = await fetchFn();
    
    localStorage.setItem(key, JSON.stringify({
      data: freshData,
      timestamp: Date.now()
    }));

    return freshData;
  }

  static async get<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async post<T, B>(
    endpoint: string, 
    body: B, 
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

// Performance Monitoring
export class PerformanceMonitor {
  static startTrace(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`);
    }
  }

  static endTrace(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measurements = window.performance.getEntriesByName(name);
      console.log(`Performance measurement for ${name}:`, measurements[0].duration);
    }
  }
}
